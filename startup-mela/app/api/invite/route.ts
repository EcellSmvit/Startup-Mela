import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { error } from "console";


export async function POST(req:Request){
    const session = await auth();

    if(!session || !session.user?.id){
        return Response.json({error:"Unauthorized"},{status:401});

    }
    try{
        const { inviteCode } = await req.json();

        if(!inviteCode){
            return Response.json({error:"Invite Code is required"},{status:400});
        }

        const leader = await prisma.user.findUnique({
            where:{uniqueUserCode:inviteCode},
        });

        if(!leader){
            return Response.json({error:"Invalid invite code. User not found."},{status:404});
        }

        if(leader.id === session.user.id){
            return Response.json({error:"Invalid invite code. User not found."},{status:404});
        }

        const currentUser = await prisma.user.findUnique({
            where:{id:session.user.id},
            select:{ leaderId :true}
        });
        if (currentUser?.leaderId) {
            return Response.json({ error: "You are already part of a team" }, { status: 400 });
        }

        await prisma.user.update({
            where:{id:session.user.id},
            data:{
                leaderId:leader.id
            }
        });
        return Response.json({ message: "Successfully joined the team!" });
    }catch(error){
        console.error("Invite Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}