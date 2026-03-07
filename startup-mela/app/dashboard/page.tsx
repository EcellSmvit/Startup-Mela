"use client"

import AdminButton from "@/components/adminButton";
import Button from "@/components/button";
import Pass from "@/components/pass";
import PurchaseInfo from "@/components/purchaseDetails";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="bg-[#171716] w-screen h-screen text-white flex items-center justify-center text-lg tracking-wide">
        Loading please wait...
      </div>
    );
  }

  return (
    <div className="bg-[#171716] min-h-screen w-screen text-white relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500 opacity-10 blur-[200px] pointer-events-none"></div>

      {status === "authenticated" && (
        <>
        
          {/* HEADER */}
          <div className="flex items-center justify-between px-10 py-6 border-b border-[#2a2a2a] backdrop-blur-md">

            <h1 className="text-2xl font-semibold tracking-wide">
              Startup <span className="text-yellow-500">Mela</span>
            </h1>

            <div className="flex items-center gap-4">
              <AdminButton/>

              <Button
                variant="warning"
                text="Logout"
                onClick={() => signOut()}
              />
            </div>

          </div>


          {/* MAIN AREA */}
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

            {/* WELCOME + PURCHASE SECTION */}
            <div className="grid md:grid-cols-2 gap-12 items-start">

              {/* Welcome */}
              <div>

                <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                  Welcome{" "}
                  <span className="text-yellow-500 italic">
                    {session.user?.name}
                  </span>
                </h1>

                <p className="text-[#a1a1a1] mt-4 text-sm md:text-base max-w-xl">
                  Access and manage your Startup Mela passes. Explore events,
                  track your entries, and enjoy the experience.
                </p>

              </div>
            </div>
              <div className="flex gap-6 flex-row items-center justify-center">

                <PurchaseInfo/>

              </div>
            <div className="flex flex-wrap gap-8 justify-center">

              <Pass/>

            </div>

          </div>

        </>
      )}

    </div>
  );
}