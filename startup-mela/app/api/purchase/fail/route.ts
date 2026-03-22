import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request){
    try{
        const session = await auth();
        if(!session?.user?.id) return Response.json({error:"Unauthorized"}, {status: 401});

        const { purchaseId } = await req.json();
        await prisma.purchase.update({
            where:{ id: purchaseId ,userId: session.user.id },
            data:{ purchaseStatus: "CANCELLED" }
        });

        return Response.json({ success: true });
    
    } catch(error){
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}