import prisma from "@/lib/prisma";

export async function GET(){
    const passes = await prisma.pass.findMany()
    return Response.json(passes)
}


export async function POST(req:Request){
    const {title,description,price} = await req.json()

    const pass = await prisma.pass.create({
        data:{title,description,price}
    })

    return Response.json(pass)
}