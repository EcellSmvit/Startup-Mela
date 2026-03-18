import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { randomBytes } from "crypto"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session || !session.user?.id)
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    
    const userId = session.user.id
    const { passId, friendCode, teammateCodes } = await req.json()

    // 1. Validate Pass
    const pass = await prisma.pass.findUnique({
      where: { id: passId }
    })

    if (!pass) return Response.json({ error: "Pass not found" }, { status: 404 })
    if (pass.sold >= pass.limit) return Response.json({ error: "Pass Sold Out" }, { status: 400 })

    // 2. Handle Friend Code (OPTIONAL)
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

    // 3. Teammate Logic
    const requiredTeammates = (pass.teamSize || 1) - 1
    let teammateConnect: { id: string }[] = []

    if (requiredTeammates > 0) {
      if (!teammateCodes || teammateCodes.length !== requiredTeammates) {
        return Response.json(
          { error: `Exactly ${requiredTeammates} teammate(s) required.` },
          { status: 400 }
        )
      }

      // ❌ Duplicate check
      const uniqueCodes = new Set(teammateCodes)
      if (uniqueCodes.size !== teammateCodes.length) {
        return Response.json(
          { error: "Duplicate teammate codes not allowed." },
          { status: 400 }
        )
      }

      // ❌ Prevent self
      if (teammateCodes.includes(session.user.uniqueUserCode)) {
        return Response.json(
          { error: "You cannot add yourself as teammate." },
          { status: 400 }
        )
      }

      // ❌ Prevent friend as teammate
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

    // 4. Generate Strong Unique Code
    const uniqueCode = `MV${randomBytes(4).toString("hex").toUpperCase()}`

    // 5. Create Purchase
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        passId,
        uniqueCode,
        referredBy: friend?.id,
        teammates: {
          connect: teammateConnect
        }
      }
    })

    // 6. Update Sold Count
    await prisma.pass.update({
      where: { id: passId },
      data: { sold: { increment: 1 } }
    })

    return Response.json(purchase)

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