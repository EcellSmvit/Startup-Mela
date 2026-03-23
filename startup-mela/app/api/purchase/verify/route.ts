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

    // 🔒 Validate purchase
    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
    });

    if (!purchase || purchase.paymentId !== orderId) {
      return Response.json({ error: "Invalid purchase" }, { status: 400 });
    }

    // 💳 Fetch payment
    const response = await cashfree.PGOrderFetchPayments(
  "2023-08-01",
  orderId
);

    const payments = response.data || [];

    const isPaid = payments.some(
      (p: any) => p.payment_status === "SUCCESS"
    );

    if (!isPaid) {
      return Response.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }
    await prisma.$transaction(async (tx) => {
      const updatedPurchase = await tx.purchase.update({
        where: { id: purchaseId },
        data: { purchaseStatus: "COMPLETED" },
      });

      await tx.pass.update({
        where: { id: updatedPurchase.passId },
        data: { sold: { increment: 1 } },
      });
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("VERIFY_ERROR:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}