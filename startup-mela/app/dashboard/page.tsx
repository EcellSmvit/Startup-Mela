"use client"

import Button from "@/components/button";
import Pass from "@/components/pass";
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
    <div className="bg-[#171716] min-h-screen text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500 opacity-10 blur-[200px] pointer-events-none"></div>

      {status === "authenticated" && (
        <>

          {/* Navbar */}
          <div className="flex items-center justify-between px-10 py-6 border-b border-[#2a2a2a] backdrop-blur-md">

            <h1 className="text-2xl font-semibold tracking-wide">
              Startup <span className="text-yellow-500">Mela</span>
            </h1>

            <Button
              variant="warning"
              text="Logout"
              onClick={() => signOut()}
            />

          </div>


          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center mt-16 px-4">

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Welcome{" "}
              <span className="text-yellow-500 italic">
                {session.user?.name}
              </span>
            </h1>

            <p className="text-[#a1a1a1] mt-3 text-sm md:text-base max-w-xl">
              Access and manage your Startup Mela passes. Explore events,
              track your entries, and enjoy the experience.
            </p>

          </div>


          {/* Pass Section */}
          <div className="flex justify-center mt-16 px-6 pb-20">

            <div className="
            w-full
            max-w-6xl
            bg-[#1c1c1b]
            border border-[#2a2a2a]
            rounded-[28px]
            p-10
            backdrop-blur-xl
            shadow-[0_0_40px_rgba(0,0,0,0.6)]
            ">

              <Pass />

            </div>

          </div>

        </>
      )}
    </div>
  );
}