"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InputField from "@/components/input";
import Button from "@/components/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="bg-[#171716] w-screen h-screen text-[#ececec] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#262626] h-1/2 w-1/4 rounded-2xl flex items-center justify-center flex-col gap-4 p-4">
        <h1>Login</h1>
        {error && <p>{error}</p>}
        
        <InputField
          variant="primary"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          variant="primary"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
        variant="primary"
        text="Sign In"
        type="submit"
        />
        <p>Don&apos;t have an account? <Link href="/dashboard">Sign up</Link>
        </p>
      </form>
    </div>
  );
}