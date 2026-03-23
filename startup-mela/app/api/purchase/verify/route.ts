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

    // 1. Validate purchase exists and matches the order
    const purchase = await prisma.purchase.findUnique({
      where: { id: purchaseId },
    });

    if (!purchase || purchase.paymentId !== orderId) {
      return Response.json({ error: "Invalid purchase record" }, { status: 400 });
    }

    // 2. Fetch payment details from Cashfree
    const response = await cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    const payments = response.data || [];

    const isPaid = payments.some(
      (p: any) => p.payment_status === "SUCCESS"
    );

    if (!isPaid) {
      return Response.json({ error: "Payment not completed" }, { status: 400 });
    }

    // 3. Atomic transaction to update status and increment sold count
    await prisma.$transaction(async (tx) => {
      // Update Purchase Status to COMPLETED
      await tx.purchase.update({
        where: { id: purchaseId },
        data: { purchaseStatus: "COMPLETED" },
      });

      // Increment the 'sold' count on the Pass model
      await tx.pass.update({
        where: { id: purchase.passId },
        data: { sold: { increment: 1 } },
      });
    });

    return Response.json({ success: true });

  } catch (error: any) {
    console.error("VERIFY_ERROR:", error.response?.data || error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}