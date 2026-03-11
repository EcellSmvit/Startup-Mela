import prisma from '@/lib/prisma'
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer";

export async function POST(req:Request){
    const{name , email , password , Mobnumber} = await req.json()
    const hashed = await bcrypt.hash(password,10)

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
    try{
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashed,
            Mobnumber: parseInt(Mobnumber),
            otp,
            otpExpiry,
            isVerified: false
        }
    })

    const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Startup Mela - Verify Your Email",
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Welcome to Startup Mela!</h2>
                    <p>Your verification code is:</p>
                    <h1 style="color: #eab308; letter-spacing: 5px;">${otp}</h1>
                    <p>This code expires in 10 minutes.</p>
                </div>
            `,
        })

    const { password: _, ...userWithoutPassword } = user;
    return Response.json({ user: userWithoutPassword, message: "OTP sent successfully" })
    }catch(error){
        return Response.json({ error: "User already exists or email failed" }, { status: 400 })
    }
}