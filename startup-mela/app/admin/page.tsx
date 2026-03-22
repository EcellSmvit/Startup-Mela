"use client";

import Button from "@/components/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInformation {
  id: string;
  name: string;
  email: string;
  role: string;
  uniqueUserCode: string;
  mobile: string | null;
  emailVerified: Date | null;
  purchases: {
    uniqueCode: string;
    verified: boolean;
    purchaseStatus: string;
  }[];
}

export default function AdminPages() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserInformation[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getuserInformation = async () => {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("fail to fetch user details", error);
      } finally {
        setLoading(false);
      }
    };
    getuserInformation();
  }, []);

  if (loading) {
    return (
      <div className="bg-black w-screen h-screen text-white flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (status !== "authenticated" || session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden px-6 py-10 text-white">

      {/* 🔲 Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:26px_26px]"></div>

      {/* 🔥 Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#014E87]/20 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10">

        {/* 🔝 Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            Admin Dashboard
          </h1>

          <div className="flex gap-3">
            <Button variant="secondary" text="Passes" onClick={() => router.push("/admin/createpass")} />
            <Button variant="primary" text="Verify" onClick={() => router.push("/admin/verify")} />
            <Button variant="warning" text="Logout" onClick={() => signOut()} />
          </div>
        </div>

        {/* 🧊 Glass Table */}
        <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(1,78,135,0.1)]">

          {/* Glow Border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="text-white/50 uppercase text-xs tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Code</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Purchases</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {userDetails.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >

                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">
                          {item.name || "N/A"}
                        </span>
                        <span className="text-xs text-white/40">
                          {item.email}
                        </span>
                        <span className={`text-[10px] mt-1 ${item.emailVerified ? "text-green-400" : "text-red-400"}`}>
                          {item.emailVerified ? "✓ Verified" : "✗ Unverified"}
                        </span>
                      </div>
                    </td>

                    {/* Code */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono text-[#014E87]">
                          {item.uniqueUserCode}
                        </span>
                        <span className="text-xs text-white/50">
                          {item.mobile || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-3 py-1 rounded-full ${
                        item.role === "ADMIN"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-white/10 text-white/60"
                      }`}>
                        {item.role}
                      </span>
                    </td>

                    {/* Purchases */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {item.purchases.length > 0 ? (
                          item.purchases.map((p, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-[10px] rounded-md bg-white/10 border border-white/10"
                            >
                              {p.uniqueCode}
                            </span>
                          ))
                        ) : (
                          <span className="text-white/30 text-xs">
                            No Purchases
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {item.purchases.map((p, i) => (
                          <div key={i} className="flex gap-2 text-[10px]">
                            <span className={`px-2 py-1 rounded ${
                              p.verified
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                            }`}>
                              {p.verified ? "VERIFIED" : "PENDING"}
                            </span>
                            <span className="px-2 py-1 rounded bg-white/10 text-white/60">
                              {p.purchaseStatus}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}