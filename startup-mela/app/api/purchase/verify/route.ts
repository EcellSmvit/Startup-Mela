import  crypto  from "crypto"
import prisma from "@/lib/prisma"


export async function POST(req:Request){
    const{razorpay_order_id,razorpay_payment_id,razorpay_signature,purchaseId} = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature === razorpay_signature){
        await prisma.purchase.update({
            where:{id:purchaseId},
            data:{purchaseStatus:"COMPLETED"}
        });

        return Response.json({success:true});
    }
    return Response.json({error:"Invalid signature"},{status:400})
}