"use client";

import AdminButton from "@/components/adminButton";
import Button from "@/components/button";
import Pass from "@/components/pass";
import PurchaseInfo from "@/components/purchaseDetails";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#171716] min-h-screen w-full text-white overflow-x-hidden">
      <header className="flex items-center justify-between px-10 py-6 border-b border-white/5">
        {/* Welcome Message */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Welcome, {session?.user?.name || "Innovator"}!
          </h1>
          <p className="text-gray-400 text-sm font-mono mt-1">
            User ID: {session?.user?.uniqueUserCode || "Loading..."}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <AdminButton />
          <Button
            variant="warning"
            text="Logout"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Left Side: Available Passes (Takes up 2/3 of space) */}
          <section className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-semibold border-l-4 border-yellow-500 pl-4">
              Available Passes
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              <Pass />
            </div>
          </section>

          {/* Right Side: Purchase Details (Takes up 1/3 of space) */}
          <aside className="space-y-8">
            <h2 className="text-xl font-semibold border-l-4 border-purple-500 pl-4">
              Your Subscriptions
            </h2>
            <div className="sticky top-6">
               <PurchaseInfo />
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}