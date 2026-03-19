// app/api/user/details/route.ts
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const { usn, mobileNumber, isSmvit, collegeName, year } = await req.json();

    // Check if details already exist to prevent changes
    const existing = await prisma.userDetails.findUnique({
      where: { userId: session.user.id }
    });

   if (existing) {
  return NextResponse.json(
    { error: "Details already set" }, 
    { status: 400 }
  ); 
}

    await prisma.userDetails.create({
      data: {
        usn,
        mobileNumber,
        isSmvit,
        collegeName: isSmvit ? "Sir M. Visvesvaraya Institute of Technology" : collegeName,
        year,
        userId: session.user.id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile save error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}