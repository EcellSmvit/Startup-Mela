"use client";
import { signIn } from "next-auth/react";
import Button from "@/components/button";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="primary"
        text="Sign in with Google"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      />
    </div>
  );
}