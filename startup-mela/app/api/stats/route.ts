import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req:Response){
    const session = await auth();

    if(!session || session.user.role !=="ADMIN"){
        return Response.json({error:"Unauthorized"},{status:401})
    }

    const userDetails = await prisma.user.findMany()
    return Response.json(userDetails)
}