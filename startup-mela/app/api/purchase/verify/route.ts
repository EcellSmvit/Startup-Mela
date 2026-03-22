import prisma from "@/lib/prisma";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      purchaseId,
    } = await req.json();

    const isValid = validatePaymentVerification(
  { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
  razorpay_signature,
  process.env.RAZORPAY_KEY_SECRET!
);

if (!isValid) {
  return Response.json({ error: "Invalid signature" }, { status: 400 });
}

    await prisma.$transaction(async(tx) => {
      const purchase = await tx.purchase.update({
        where:{ id: purchaseId },
        data:{ purchaseStatus: "COMPLETED" },
      });

      await tx.pass.update({
        where: { id: purchase.passId },
        data:{
          sold: { increment: 1 },
        }
      })
    })


    return Response.json({ success: true });

  } catch (error) {
    console.error("VERIFY_ERROR:", error);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}