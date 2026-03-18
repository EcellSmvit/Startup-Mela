import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { randomBytes } from "crypto"

export async function POST(req: Request) {
  const session = await auth()

  if (!session || !session.user?.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  
  const userId = session.user.id

  const { passId, friendCode, teammateCodes } = await req.json() // teammateCodes is string[]

  // 1. Basic Validations
  if (!friendCode) {
    return Response.json({ error: "Friend code is required" }, { status: 400 })
  }

  const friend = await prisma.user.findUnique({
    where: { uniqueUserCode: friendCode }
  })

  if (!friend) {
    return Response.json({ error: "Invalid friend code." }, { status: 404 })
  }

  const pass = await prisma.pass.findUnique({
    where: { id: passId }
  })

  if (!pass) return Response.json({ error: "Pass not found" }, { status: 404 })
  if (pass.sold >= pass.limit) return Response.json({ error: "Pass Sold Out" }, { status: 400 })

  // 2. Teammate Logic: teamSize includes the buyer, so we need (teamSize - 1) teammate codes
  const requiredTeammates = (pass.teamSize || 1) - 1;
  
  if (requiredTeammates > 0) {
    if (!teammateCodes || teammateCodes.length !== requiredTeammates) {
      return Response.json({ error: `Exactly ${requiredTeammates} teammate(s) required.` }, { status: 400 });
    }

    // Verify all teammate codes exist and are not the buyer
    const teammates = await prisma.user.findMany({
      where: {
        uniqueUserCode: { in: teammateCodes },
        NOT: { id: userId }
      }
    });

    if (teammates.length !== requiredTeammates) {
      return Response.json({ error: "One or more teammate codes are invalid or duplicates." }, { status: 400 });
    }

    // 3. Create Purchase with Teammates
    const uniqueCode = `MV${randomBytes(2).toString("hex").toUpperCase()}`
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        passId,
        uniqueCode,
        referredBy: friend.id,
        teammates: {
          connect: teammates.map(t => ({ id: t.id }))
        }
      }
    })

    await prisma.pass.update({
      where: { id: passId },
      data: { sold: { increment: 1 } }
    })

    return Response.json(purchase)
  }

  // Fallback for single person passes
  const uniqueCode = `MV${randomBytes(2).toString("hex").toUpperCase()}`
  const purchase = await prisma.purchase.create({
    data: {
      userId,
      passId,
      uniqueCode,
      referredBy: friend.id,
    }
  })

  await prisma.pass.update({
    where: { id: passId },
    data: { sold: { increment: 1 } }
  })

  return Response.json(purchase)
}


export async function GET(req: Request) {
  const session = await auth();

  if (!session || !session.user?.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  
  const userId = session.user.id

  const purchaseDetails = await prisma.purchase.findMany({
    where: { userId: userId },
    select: {
      uniqueCode: true,
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
    }
  })

  return Response.json(purchaseDetails)
}