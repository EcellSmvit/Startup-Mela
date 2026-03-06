import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      purchases: {
        select: {
          id: true,
          uniqueCode: true,
          verified: true,
          PurchaseStatus: true,
          pass: {
            select: {
              id: true,
              title: true,
              price: true
            }
          }
        }
      }
    }
  });

  return Response.json(users);
}