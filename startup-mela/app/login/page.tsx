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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    if (!email || !password) {
      return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#171716] w-screen h-screen text-[#ececec] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#262626] w-[380px] rounded-3xl flex flex-col gap-6 p-10 shadow-2xl border border-[#333]"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-sm text-gray-400">Login to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
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
        </div>

        <Button
          variant="primary"
          text={loading ? "Signing in..." : "Sign In"}
          type="submit"
        />

        <p className="text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-yellow-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}