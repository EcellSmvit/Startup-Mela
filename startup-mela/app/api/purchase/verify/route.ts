import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      purchaseId,
    } = await req.json();

    // 🔐 Create expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    // ❌ Invalid signature
    if (expectedSignature !== razorpay_signature) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    // ✅ Update purchase status + get passId
    const purchase = await prisma.purchase.update({
      where: { id: purchaseId },
      data: { purchaseStatus: "COMPLETED" },
      include: { pass: true }, // needed for passId
    });

    // ✅ Increment sold ONLY AFTER SUCCESSFUL PAYMENT
    await prisma.pass.update({
      where: { id: purchase.passId },
      data: {
        sold: { increment: 1 },
      },
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