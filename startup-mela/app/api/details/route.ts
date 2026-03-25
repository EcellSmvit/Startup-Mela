import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { usn, mobileNumber, isSmvit, collegeName, year, name, selectedEvent } = await req.json();

  
    if (!usn || !mobileNumber || !year) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.userDetails.findUnique({
      where: { userId: session.user.id },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Details already set" },
        { status: 400 }
      );
    }

    await prisma.userDetails.create({
      data: {
        usn: usn.trim().toUpperCase(),
        mobileNumber,
        name: name?.trim() || undefined,
        isSmvit: Boolean(isSmvit),
        collegeName: isSmvit
          ? "Sir M. Visvesvaraya Institute of Technology"
          : collegeName || "Other",
        year: String(year),
        userId: session.user.id,
        selectedEvent: selectedEvent || null,
      },
    });

    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "USN already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save details" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { userDetails: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}