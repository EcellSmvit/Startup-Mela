"use client";

import AdminButton from "@/components/adminButton";
import Button from "@/components/button";
import Pass from "@/components/pass";
import PurchaseInfo from "@/components/purchaseDetails";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="bg-[#171716] min-h-screen w-full text-white overflow-x-hidden">

      <header className="flex items-center justify-end px-10 py-6">
        <div className="flex items-center gap-4">
          <AdminButton />
          <Button
            variant="warning"
            text="Logout"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-14">

        <section className="grid md:grid-cols-2 gap-10 items-center">
          <PurchaseInfo />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Available Passes
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
            <Pass />
          </div>
        </section>

      </main>
    </div>
  );
}