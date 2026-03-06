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
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-[#171716] w-screen h-screen text-[#ececec] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#262626] h-1/2 w-1/4 rounded-2xl flex items-center justify-center flex-col gap-4 p-4">
        <h1>Create Account</h1>
        {error && <p>{error}</p>}
        
        <input
          className="w-[90%] border border-[#ececec] py-2 px-2 rounded-2xl"
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <InputField
        variant="primary"
        placeholder="enter password"
        type="password"
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <input
          className="w-[90%] border border-[#ececec] py-2 px-2 rounded-2xl"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="w-[90%] border border-[#ececec] py-2 px-2 rounded-2xl"
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <Button
        variant="primary"
        text="Signup"
        type="submit"
        />
        <p>
          Already have an account? <Link href="/login" className="text-yellow-500">Login</Link>
        </p>
      </form>
    </div>
  );
}