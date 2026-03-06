import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(){
    const passes = await prisma.pass.findMany()
    return Response.json(passes)
}


export async function POST(req:Request){
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const {title,description,price,limit} = await req.json()

    const pass = await prisma.pass.create({
        data:{title,description,price,limit}
    })

    return Response.json(pass)
}