import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(){
    const session = await auth();
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const userDetails = await prisma.userDetails.findUnique({
        where: { userId: session.user.id }
    });
    if (!userDetails) return Response.json([]);


const passes = await prisma.pass.findMany({
        where: {
            forSmvit: userDetails.isSmvit
        }
    });
    
    return Response.json(passes);
}


export async function POST(req:Request){
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const {title,description,price,limit,forSmvit,teamSize,requiresEvent} = await req.json()

    const pass = await prisma.pass.create({
        data:{title,description,price,limit,teamSize:teamSize || 1,forSmvit,requiresEvent: requiresEvent || false}
    })

    return Response.json(pass)
}