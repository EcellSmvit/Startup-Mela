import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const {email,otp} = await req.json()

    const user = await prisma.user.findUnique({where :{email}})

    if(!user || user.otp !== otp || (user.otpExpiry && new Date() > user.otpExpiry)){
        return Response.json({error:"Invalid or expired OTP"},{status:400})
    }

    await prisma.user.update({
        where:{email},
        data:{
            isVerified:true,
            otp:null,
            otpExpiry:null
        }
    })

    return Response.json({success:true})
}