import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/signup");
  }

  const details = await prisma.userDetails.findUnique({
    where: { userId: session.user.id },
  });

  if (!details) {
    redirect("/userdetails");
  }

  return <>{children}</>;
}