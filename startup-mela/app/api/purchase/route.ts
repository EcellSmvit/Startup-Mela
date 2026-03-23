import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { randomBytes } from "crypto"
import { Cashfree , CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
);

interface CashfreeOrderRequest {
  order_amount: number;
  order_currency: string;
  order_id?: string;
  customer_details: {
    customer_id: string;
    customer_name?: string;
    customer_email: string;
    customer_phone: string;
  };
  order_meta?: {
    return_url: string;
  };
  order_note?: string;
}

export async function POST(req: Request) {
  try {
    console.log("ENV CHECK:", {
      appId: process.env.CASHFREE_APP_ID,
      secret: process.env.CASHFREE_SECRET_KEY,
      env: process.env.CASHFREE_ENV,
    });
    const session = await auth()

    if (!session || !session.user?.id)
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    
    const userId = session.user.id
    const { passId, friendCode, teammateCodes } = await req.json()
    const pass = await prisma.pass.findUnique({
      where: { id: passId }
    })

    const userWithDetails = await prisma.userDetails.findUnique({
      where: { id: userId },
    })

    if (!pass) return Response.json({ error: "Pass not found" }, { status: 404 })
    if (pass.sold >= pass.limit) return Response.json({ error: "Pass Sold Out" }, { status: 400 })

      const orderRequest :CashfreeOrderRequest = {
        order_amount: pass.price,
        order_currency: "INR",
        order_id: `order_${Date.now()}_${userId.slice(-4)}`,
        customer_details:{
          customer_id: userId,
          customer_phone: userWithDetails?.mobileNumber || "9999999999",
          customer_email: session.user.email || ""
        },
        order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}`
      }
      }
            const cfResponse =  cashfree.PGCreateOrder(orderRequest);
            const orderData = cfResponse.data
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
        paymentId: orderData.order_id,
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
      paymentSessionId: orderData.payment_session_id,
      orderId: orderData.order_id,
      purchaseId: purchase.id
    })

  } catch (error) {
   console.error("CASHFREE FULL ERROR:", error.response?.data || error);
    return Response.json({ error: "Payment initiation failed" }, { status: 500 })
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
        userId: session.user.id,
        purchaseStatus: "COMPLETED",
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