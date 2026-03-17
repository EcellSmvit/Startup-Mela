import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/signup");
  }
  const userDetails = await prisma.userDetails.findUnique({
    where: { userId: session.user.id },
  });

  if (!userDetails) {
    redirect("/userdetails");
  }

  return <section>{children}</section>;
}