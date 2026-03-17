import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { randomBytes } from "crypto"

export async function POST(req: Request) {
  const session = await auth()

  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  const userId = session.user.id
  
  if (!userId)
    return Response.json({ error: "User not found" }, { status: 401 })

  const { passId, friendCode } = await req.json()

  if (!friendCode) {
    return Response.json({ error: "Friend code is required" }, { status: 400 })
  }

  const friend = await prisma.user.findUnique({
    where: { uniqueUserCode: friendCode }
  })

  if (!friend) {
    return Response.json({ error: "Invalid friend code. User not found." }, { status: 404 })
  }

  if (friend.id === userId) {
    return Response.json({ error: "You cannot use your own code." }, { status: 400 })
  }


  const pass = await prisma.pass.findUnique({
    where: { id: passId },
    select: {
      id: true,
      title: true,
      price: true,
      sold: true,
      limit: true
    }
  })

  if (!pass)
    return Response.json({ error: "Pass not found" }, { status: 404 })

  if (pass.sold >= pass.limit) {
    return Response.json(
      { error: "Pass Sold Out" },
      { status: 400 }
    )
  }

  const userExists = await prisma.user.findUnique({
  where: { id: userId }
})

if (!userExists) {
  return Response.json({ error: "Session user does not exist in database. Please log out and back in." }, { status: 400 })
}


  const uniqueCode = `MV${randomBytes(2).toString("hex").toUpperCase()}`
  const purchase = await prisma.purchase.create({
    data: {
      userId,
      passId,
      uniqueCode,
      referredBy: friend.id
    }
  })
  await prisma.pass.update({
    where: { id: passId },
    data: {
      sold: {
        increment: 1
      }
    }
  })
  return Response.json(purchase)
}


export async function GET(req: Request){
  const session = await auth();

  if(!session) 
    return Response.json({error: "Unauthorized"},{status:401})
  const userId = session.user.id

  if(!userId)
    return Response.json({error:"User not found"},{status:401})

  const purchaseDetails = await prisma.purchase.findMany({
    where: {
      userId: userId
    },
    select:{
      uniqueCode: true,
      pass: {
        select:{
          title: true,
          price: true
        }
      }
    }
  })
  if(!purchaseDetails)    return Response.json({error: "Purchase not found"},{status:404})

  return Response.json(purchaseDetails)

}