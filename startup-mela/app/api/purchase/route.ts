import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { randomBytes } from "crypto"

export async function POST(req: Request) {
  const session = await auth()

  if (!session || !session.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  const userId = session.user.id
  const { passId } = await req.json()
  const uniqueCode = `MV${randomBytes(2).toString("hex").toUpperCase()}`

  try {
    const purchase = await prisma.$transaction(async (tx) => {
      const currentPass = await tx.pass.findUnique({
        where: { id: passId },
      });
      if (!currentPass || currentPass.sold >= currentPass.limit) {
        throw new Error("Pass Sold Out");
      }
      const newPurchase = await tx.purchase.create({
        data: {
          userId,
          passId,
          uniqueCode
        }
      });
      await tx.pass.update({
        where: { id: passId },
        data: { sold: { increment: 1 } }
      });

      return newPurchase;
    });

    return Response.json(purchase);

  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Pass Sold Out") {
      return Response.json({ error: "Pass Sold Out" }, { status: 400 });
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  const session = await auth();

  if (!session || !session.user?.id) 
    return Response.json({ error: "Unauthorized" }, { status: 401 })

  const userId = session.user.id

  const purchaseDetails = await prisma.purchase.findMany({
    where: {
      userId: userId
    },
    select: {
      uniqueCode: true,
      pass: {
        select: {
          title: true,
          price: true
        }
      }
    }
  })

  if (!purchaseDetails) {
    return Response.json({ error: "Purchase not found" }, { status: 404 })
  }

  return Response.json(purchaseDetails)
}