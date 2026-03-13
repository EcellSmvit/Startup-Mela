import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(){
    const session = await auth();
    if (!session || !session.user?.id) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userInfo = await prisma.userDetails.findUnique({
        where: { userId: session.user.id }
    })
    return Response.json(userInfo)
}


export async function POST(req:Request){
    const session = await auth();

    if(!session || !session.user?.id){
        return Response.json({error:"Unauthorized"},{status:401})
    }

    try{
    const {USN,mobilenumber,collegename,year} = await req.json();

    if (!USN || !mobilenumber || !collegename || !year) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const details = await prisma?.userDetails.create({
        data:{
            USN: USN,
            mobilenumber: mobilenumber,
            collegename:collegename,
            year:year,
            userId:session.user.id
        }
    })

    return Response.json(details)
    } catch(error:any){
        console.error("DEBUG: Prisma Error Details ->", error);
        if (error.code === 'P2002') {
            return Response.json({ error: "USN already registered" }, { status: 400 });
        }
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}