"use client"

import AdminButton from "@/components/adminButton";
import Button from "@/components/button";
import Pass from "@/components/pass";
import PurchaseInfo from "@/components/purchaseDetails";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {

  const { data: session, status } = useSession();
  const uniqueCode = session?.user?.uniqueUserCode;

  if (status === "loading") {
    return (
      <div className="bg-[#171716] w-screen h-screen text-white flex items-center justify-center text-lg tracking-wide">
        Loading please wait...
      </div>
    );
  }

  return (
    <div className="bg-[#171716] min-h-screen w-screen text-white overflow-x-hidden">

      {/* glow background */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500 opacity-10 blur-[200px] pointer-events-none"></div>

      {status === "authenticated" && (
        <>
          {/* HEADER */}
          <header className="flex items-center justify-between px-10 py-6 border-b border-[#2a2a2a]">

            <h1 className="text-2xl font-semibold tracking-wide">
              Startup <span className="text-yellow-500">Mela</span>
            </h1>

            <div className="flex items-center gap-4">

              {uniqueCode && (
                <div className="px-4 py-2 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
                  <p className="text-lg font-mono font-bold">{uniqueCode}</p>
                </div>
              )}

              <AdminButton />

              <Button
                variant="warning"
                text="Logout"
                onClick={() => signOut({ callbackUrl: "/" })}
              />

            </div>

          </header>

          {/* MAIN CONTENT */}
          <main className="max-w-7xl mx-auto px-6 py-12 space-y-14">

            {/* TOP SECTION */}
            <section className="grid md:grid-cols-2 gap-10 items-center">

              {/* Welcome */}
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                  Welcome{" "}
                  <span className="text-yellow-500 italic">
                    {session.user?.name}
                  </span>
                </h1>

                <p className="text-gray-400 mt-4 max-w-md">
                  Manage your Startup Mela passes, view purchase details and
                  explore available passes for the event.
                </p>
              </div>
              {/* Purchase Info */}
              <div className="flex justify-center md:justify-end">
                <PurchaseInfo />
              </div>

            </section>

            {/* PASSES */}
            <section>

              <h2 className="text-2xl font-semibold mb-6 text-center">
                Available Passes
              </h2>

              <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
                <Pass />
              </div>

            </section>

          </main>
        </>
      )}

    </div>
  );
}