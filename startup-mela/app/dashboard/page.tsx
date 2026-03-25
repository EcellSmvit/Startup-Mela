"use client";

import AdminButton from "@/components/adminButton";
import Button from "@/components/button";
import Pass from "@/components/pass";
import ProfileCard from "@/components/profileCard";
import PurchaseInfo from "@/components/purchaseDetails";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session ,status} = useSession();
  const router = useRouter();

useEffect(() => {
  if (status === "loading") return;

  if (status === "unauthenticated") {
    router.push("/signup");
    return;
  }

  const checkDetails = async () => {
    const res = await fetch("/api/details/check");
    const data = await res.json();

    if (!data.hasDetails) {
      router.push("/complete-profile");
    }
  };

  checkDetails();
}, [status]);

  return (
    <div className="bg-black min-h-screen w-full text-white overflow-x-hidden">
      <header className="flex items-center justify-between px-10 py-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome, {session?.user?.name || "Innovator"}!
          </h1>
          <p className="text-gray-400 text-sm font-mono mt-1">
            User ID: {session?.user?.uniqueUserCode || "Loading..."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <AdminButton />
          <Button
            variant="secondary"
            text="Logout"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <span className="grid lg:grid-cols-3 gap-10 mb-16">
          <ProfileCard/>
          <PurchaseInfo />
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-semibold border-l-4 border-[#014E87] pl-4">
              Available Passes
            </h2>
              <Pass />
          </section>
        </div>

      </main>
    </div>
  );
}