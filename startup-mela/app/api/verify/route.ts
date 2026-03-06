import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(req: Request) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { uniqueCode } = await req.json();

  const purchase = await prisma.purchase.findUnique({
    where: { uniqueCode }
  });

  if (!purchase) {
    return Response.json({ error: "Pass not found" }, { status: 404 });
  }

  if (purchase.verified) {
    return Response.json(
      { message: "Pass already verified" },
      { status: 400 }
    );
  }

  const verifiedPurchase = await prisma.purchase.update({
    where: { uniqueCode },
    data: { verified: true }
  });

  return Response.json({
    message: "Pass verified successfully",
    data: verifiedPurchase
  });
}