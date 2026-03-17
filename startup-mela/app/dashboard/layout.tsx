import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
// REMOVED: import prisma from "@/lib/prisma"; (No longer needed here)

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Keep the authentication check to ensure only logged-in users access the dashboard
  if (!session?.user?.id) {
    redirect("/signup");
  }

  // REMOVED: The prisma.userDetails.findUnique query
  // REMOVED: The redirect to "/userdetails"

  return <>{children}</>;
}