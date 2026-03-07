"use client"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/components/button"
import InputField from "@/components/input"

function VerifyOtpContent() {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: { "Content-Type": "application/json" },
    })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      const data = await res.json()
      setError(data.error || "Verification failed")
    }
  }

  return (
    <div className="bg-[#171716] w-screen h-screen text-[#ececec] flex items-center justify-center">
      <form onSubmit={handleVerify} className="bg-[#262626] w-[380px] rounded-3xl flex flex-col gap-6 p-10 border border-[#333]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Check your email</h1>
          <p className="text-sm text-gray-400">Sent to {email}</p>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <InputField variant="primary" type="text" placeholder="6-digit code" onChange={(e) => setOtp(e.target.value)} />
        <Button variant="primary" text="Verify Account" type="submit" />
      </form>
    </div>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  )
}