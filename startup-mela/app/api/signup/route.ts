import prisma from '@/lib/prisma'
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"

export async function POST(req:Request){
    const{name , email , password } = await req.json()
    const hashed = await bcrypt.hash(password,10)

    const uniqueUserCode = `US${randomBytes(3).toString("hex").toUpperCase()}`
    try{
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashed,
            uniqueUserCode,
        }
    })
    }catch(error){
        return Response.json({ error: "User already exists or email failed" }, { status: 400 })
    }
}