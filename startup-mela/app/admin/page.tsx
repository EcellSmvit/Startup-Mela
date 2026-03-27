"use client";

import Button from "@/components/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInformation {
  id: string;
  name: string | null;
  email: string;
  role: string;
  uniqueUserCode: string | null;
  emailVerified: Date | null;
  userDetails?: {
    usn: string;
    mobileNumber: string;
    collegeName: string;
    year: string;
    selectedEvents: string[];
  } | null;
  purchases: {
    uniqueCode: string;
    verified: boolean;
    purchaseStatus: string;
    pass: {
      title: string;
    };
    teammates: {
      name: string | null;
      email: string;
    }[];
  }[];
}

export default function AdminPages() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserInformation[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInformation | null>(null);
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
      {/* 🔲 Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:26px_26px]"></div>

      {/* 🔥 Glow Effect */}
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
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/50 uppercase text-xs tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left">User (Tap for Details)</th>
                  <th className="px-6 py-4 text-left">Code</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    {/* User - Tappable area */}
                    <td 
                      className="px-6 py-4 cursor-pointer group"
                      onClick={() => setSelectedUser(item)}
                    >
                      <div className="flex flex-col">
                        <span className="text-white font-medium group-hover:text-[#014E87] transition-colors">
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

                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-[#014E87]">
                        {item.uniqueUserCode || "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-3 py-1 rounded-full ${
                        item.role === "ADMIN"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-white/10 text-white/60"
                      }`}>
                        {item.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {item.purchases.length > 0 ? (
                          item.purchases.map((p, i) => (
                            <div key={i} className="flex gap-2 text-[10px]">
                              <span className={`px-2 py-1 rounded ${
                                p.verified ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                              }`}>
                                {p.verified ? "VERIFIED" : "PENDING"}
                              </span>
                              <span className="px-2 py-1 rounded bg-white/10 text-white/60">
                                {p.pass.title}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-white/30 text-xs">No Purchases</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔍 Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              User Details: {selectedUser.name}
            </h2>

            {/* Profile Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Email</p>
                <p className="text-sm">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">USN</p>
                <p className="text-sm">{selectedUser.userDetails?.usn || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Mobile</p>
                <p className="text-sm">{selectedUser.userDetails?.mobileNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">College</p>
                <p className="text-sm">{selectedUser.userDetails?.collegeName || "N/A"}</p>
              </div>
            </div>

            {/* Purchases & Teammates Section */}
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#014E87]"></span>
              Purchased Passes & Teams
            </h3>
            
            <div className="space-y-4">
              {selectedUser.purchases.length > 0 ? (
                selectedUser.purchases.map((purchase, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-[#014E87]">{purchase.pass.title}</span>
                      <span className="text-xs font-mono px-2 py-1 bg-black/40 rounded border border-white/10">
                        {purchase.uniqueCode}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-[10px] uppercase text-white/30 mb-2">Teammates</p>
                      {purchase.teammates.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {purchase.teammates.map((tm, tIdx) => (
                            <div key={tIdx} className="flex justify-between items-center text-xs p-2 bg-black/20 rounded">
                              <span className="text-white/80">{tm.name || "Unnamed Teammate"}</span>
                              <span className="text-white/40">{tm.email}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs italic text-white/20">Solo Entry / No teammates added</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/40 text-sm italic">No purchase history found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}