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

  const { passId } = await req.json()

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

  const uniqueCode = `MV${randomBytes(2).toString("hex").toUpperCase()}`

  const purchase = await prisma.purchase.create({
    data: {
      userId,
      passId,
      uniqueCode
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