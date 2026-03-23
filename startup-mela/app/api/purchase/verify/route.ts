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
    });

    // CRITICAL: Ensure the ID from the URL matches our DB record
    if (!purchase || purchase.paymentId !== orderId) {
      console.error("Mismatch:", { db: purchase?.paymentId, received: orderId });
      return Response.json({ error: "Invalid purchase record" }, { status: 400 });
    }

    // Fetch payments from Cashfree using the verified orderId
    const response = await cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    const payments = response.data || [];

    const isPaid = payments.some((p: any) => p.payment_status === "SUCCESS");

    if (!isPaid) {
      return Response.json({ error: "Payment not completed" }, { status: 400 });
    }

    // Update DB to COMPLETED
    await prisma.$transaction(async (tx) => {
      await tx.purchase.update({
        where: { id: purchaseId },
        data: { purchaseStatus: "COMPLETED" },
      });
      // ... increment sold count
    });

    return Response.json({ success: true });
  } catch (error: any) {
    // This will now catch 'order_not_found' if the IDs still don't match
    console.error("VERIFY_ERROR:", error.response?.data || error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}