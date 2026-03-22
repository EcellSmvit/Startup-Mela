import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { randomBytes } from "crypto"
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session || !session.user?.id)
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    
    const userId = session.user.id
    const { passId, friendCode, teammateCodes } = await req.json()
    const pass = await prisma.pass.findUnique({
      where: { id: passId }
    })

    if (!pass) return Response.json({ error: "Pass not found" }, { status: 404 })
    if (pass.sold >= pass.limit) return Response.json({ error: "Pass Sold Out" }, { status: 400 })

      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(pass.price * 100),
        currency:"INR",
        receipt:`receipt_${Date.now()}`
      })

    let friend = null

    if (friendCode) {
      friend = await prisma.user.findUnique({
        where: { uniqueUserCode: friendCode }
      })

      if (!friend) {
        return Response.json({ error: "Invalid friend code." }, { status: 404 })
      }

      if (friend.id === userId) {
        return Response.json({ error: "You cannot refer yourself." }, { status: 400 })
      }
    }
    const requiredTeammates = (pass.teamSize || 1) - 1
    let teammateConnect: { id: string }[] = []

    if (requiredTeammates > 0) {
      if (!teammateCodes || teammateCodes.length !== requiredTeammates) {
        return Response.json(
          { error: `Exactly ${requiredTeammates} teammate(s) required.` },
          { status: 400 }
        )
      }
      const uniqueCodes = new Set(teammateCodes)
      if (uniqueCodes.size !== teammateCodes.length) {
        return Response.json(
          { error: "Duplicate teammate codes not allowed." },
          { status: 400 }
        )
      }
      if (teammateCodes.includes(session.user.uniqueUserCode)) {
        return Response.json(
          { error: "You cannot add yourself as teammate." },
          { status: 400 }
        )
      }
      if (friendCode && teammateCodes.includes(friendCode)) {
        return Response.json(
          { error: "Friend cannot be a teammate." },
          { status: 400 }
        )
      }

      const teammates = await prisma.user.findMany({
        where: {
          uniqueUserCode: { in: teammateCodes }
        }
      })

      if (teammates.length !== requiredTeammates) {
        return Response.json(
          { error: "Invalid teammate codes." },
          { status: 400 }
        )
      }

      teammateConnect = teammates.map(t => ({ id: t.id }))
    }
    const uniqueCode = `MV${randomBytes(4).toString("hex").toUpperCase()}`
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        passId,
        uniqueCode,
        referredBy: friend?.id,
        purchaseStatus:"PENDING",
        teammates: {
          connect: teammateConnect
        }
      }
    })
    // await prisma.pass.update({
    //   where: { id: passId },
    //   data: { sold: { increment: 1 } }
    // })

    return Response.json({
      orderId:razorpayOrder.id,
      amount: razorpayOrder.amount,
      purchaseId: purchase.id
    })

  } catch (error) {
    console.error("PURCHASE_POST_ERROR:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const purchases = await prisma.purchase.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        pass: {
          select: {
            title: true,
            price: true
          }
        },
        teammates: {
          select: {
            name: true,
            uniqueUserCode: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return Response.json(purchases)

  } catch (error) {
    console.error("PURCHASE_GET_ERROR:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}