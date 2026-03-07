"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/button";
import InputField from "@/components/input";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-[#171716] w-screen h-screen text-[#ececec] flex items-center justify-center">
      
      <form
        onSubmit={handleSubmit}
        className="bg-[#262626] w-[380px] rounded-3xl flex flex-col gap-6 p-10 shadow-2xl border border-[#333]"
      >
        
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <p className="text-sm text-gray-400">
            Sign up to get started
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <InputField
            variant="primary"
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <InputField
            variant="primary"
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <InputField
            variant="primary"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <Button
          variant="primary"
          text="Signup"
          type="submit"
        />

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}