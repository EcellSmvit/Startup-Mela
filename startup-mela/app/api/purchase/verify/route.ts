import prisma from "@/lib/prisma";
import { Cashfree } from "cashfree-pg";

export async function POST(req: Request) {
  try {
    const { orderId, purchaseId } = await req.json();

    // Fetch order details from Cashfree
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    
    // Validate if any successful payment exists for this order
    const isPaid = response.data.some((p: any) => p.payment_status === "SUCCESS");

    if (!isPaid) {
      return Response.json({ error: "Payment not completed" }, { status: 400 });
    }

    await prisma.$transaction(async(tx) => {
      const purchase = await tx.purchase.update({
        where: { id: purchaseId },
        data: { purchaseStatus: "COMPLETED" },
      });

      await tx.pass.update({
        where: { id: purchase.passId },
        data: { sold: { increment: 1 } }
      });
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("VERIFY_ERROR:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}