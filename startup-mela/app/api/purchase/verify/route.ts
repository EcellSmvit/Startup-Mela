// app/api/purchase/verify/route.ts
import prisma from "@/lib/prisma";
import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
);

export async function POST(req: Request) {
  try {
    const { orderId, purchaseId } = await req.json();

    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
      include: { pass: true } // Include pass to get the ID for incrementing
    });

    if (!purchase || purchase.paymentId !== orderId) {
      return Response.json({ error: "Invalid purchase record" }, { status: 400 });
    }

    // Fetch payment status from Cashfree
    const response = await cashfree.PGOrderFetchPayments(orderId);
    const payments = Array.isArray(response?.data) ? response.data : [];
    const isPaid = payments.some(
  (p: any) => p.payment_status === "SUCCESS"
);

    if (!isPaid) {
      return Response.json({ error: "Payment not completed" }, { status: 400 });
    }

await prisma.$transaction(async (tx) => {
  const latestPurchase = await tx.purchase.findUnique({
    where: { id: purchaseId },
  });

  if (!latestPurchase || latestPurchase.purchaseStatus === "COMPLETED") return;

  await tx.purchase.update({
    where: { id: purchaseId },
    data: { purchaseStatus: "COMPLETED" },
  });

  await tx.pass.update({
    where: { id: latestPurchase.passId },
    data: { sold: { increment: 1 } },
  });
});
  console.log("PAYMENT RESPONSE:", response);
    return Response.json({ success: true });
  } catch (error: any) {
    console.error("VERIFY_ERROR:", error.response?.data || error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}