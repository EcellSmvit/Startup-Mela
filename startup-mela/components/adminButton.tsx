"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "./button";

export default function AdminButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user?.role !== "ADMIN") return null;

  return (
    <Button
              variant="primary"
              text="Admin Panel"
              onClick={() => router.push("/admin")}
    />
  );
}