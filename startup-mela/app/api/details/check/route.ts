import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ hasDetails: false });
  }

  const details = await prisma.userDetails.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ hasDetails: !!details });
}