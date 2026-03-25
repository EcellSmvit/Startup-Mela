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
    const session = await auth()
    if (!session || !session.user?.id)
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    
    const userId = session.user.id
    const { passId, friendCode, teammateCodes,selectedEvent } = await req.json()
    const pass = await prisma.pass.findUnique({
      where: { id: passId }
    })

    const userWithDetails = await prisma.userDetails.findUnique({
      where: { userId: userId },
    })

    if (!pass) return Response.json({ error: "Pass not found" }, { status: 404 });
    if (pass.requiresEvent && !selectedEvent) {
      return Response.json({ error: "Please select an event for this pass." }, { status: 400 });
    
    }

    if (selectedEvent) {
      await prisma.userDetails.update({
        where: { userId: userId },
        data: { selectedEvent: selectedEvent } //
      });
    }

    if (pass.sold >= pass.limit) return Response.json({ error: "Pass Sold Out" }, { status: 400 })


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
    const maxTeammates = (pass.teamSize || 1) - 1;
    const providedTeammates = teammateCodes ? teammateCodes.filter((code: string) => code.trim() !== "") : [];
    let teammateConnect: { id: string }[] = []

    if (maxTeammates > 0) {
      if (providedTeammates.length > maxTeammates) {
        return Response.json(
          { error: `Maximum ${maxTeammates} teammate(s) allowed.` },
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

if (providedTeammates.length > 0) {
    const teammates = await prisma.user.findMany({
      where: {
        uniqueUserCode: { in: providedTeammates }
      }
    });

    if (teammates.length !== providedTeammates.length) {
      return Response.json(
        { error: "One or more teammate codes are invalid." },
        { status: 400 }
      );
    }
    teammateConnect = teammates.map(t => ({ id: t.id }));
  }
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

          const orderRequest :CashfreeOrderRequest = {
        order_amount: pass.price,
        order_currency: "INR",
        order_id: `order_${Date.now()}_${userId.slice(-4)}`,
        customer_details:{
          customer_id: userId,
          customer_phone: userWithDetails?.mobileNumber || "9876543210",
          customer_email: session.user.email || ""
        },
        order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/purchase/status?order_id={order_id}&purchase_id=${purchase.id}`
      }
      }


            const cfResponse = await cashfree.PGCreateOrder(orderRequest);

            if (!cfResponse || !cfResponse.data || !cfResponse.data.order_id) {

  
  return Response.json(
    { error: "Payment gateway error. Try again." },
    { status: 500 }
  );
}


            const orderData = cfResponse.data
await prisma.purchase.update({
  where: { id: purchase.id },
  data: { paymentId: orderData.order_id }
});
    return Response.json({
      paymentSessionId: orderData.payment_session_id,
      orderId: orderData.order_id,
      purchaseId: purchase.id
    })
    
  } catch (error) {
   console.error("CASHFREE FULL ERROR:", error);
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