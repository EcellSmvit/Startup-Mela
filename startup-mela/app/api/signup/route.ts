import prisma from '@/lib/prisma'
import { randomBytes } from "crypto"

export async function POST(req:Request){
    const{name , email } = await req.json()

    const uniqueUserCode = `US${randomBytes(3).toString("hex").toUpperCase()}`
    try{
    const user = await prisma.user.create({
        data:{
            name,
            email,
            uniqueUserCode,
        }
    })
    }catch(error){
        return Response.json({ error: "User already exists or email failed" }, { status: 400 })
    }
}