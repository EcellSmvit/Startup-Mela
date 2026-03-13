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
      uniqueUserCode:true,
      role: true,
      purchases: {
        select: {
          uniqueCode: true,
          verified: true,
          purchaseStatus: true,
          pass: {
            select: {
              title: true,
            }
          }
        }
      }
    }
  });

  return Response.json(users);
}