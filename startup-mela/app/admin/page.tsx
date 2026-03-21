"use client"

import Button from "@/components/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInformation {
    id: string;
    name: string;
    email: string;
    role: string;
    uniqueUserCode: string; // Added field
    mobile: string | null;   // Added field
    emailVerified: Date | null; // Added field
    purchases: {
        uniqueCode: string;
        verified: boolean;
        purchaseStatus: string;
    }[];
}

export default function AdminPages() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserInformation[]>([])
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        const getuserInformation = async () => {
            try {
                const response = await fetch("/api/stats");
                const data = await response.json();
                setUserDetails(data)
            } catch (error) {
                console.error("fail to fetch user details", error);
            } finally {
                setLoading(false);
            }
        };
        getuserInformation();
    }, [])

    if (loading) {
        return (
            <div className="bg-[#171716] w-screen h-screen text-white flex items-center justify-center text-lg">
                Loading please wait...
            </div>
        );
    }

    if (status !== "authenticated" || session?.user?.role !== "ADMIN") {
        return null;
    }

    return (
        <div className="min-h-screen min-w-full bg-black text-[#ececec] p-8">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold tracking-wide">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Button variant="secondary" text="Passes" onClick={() => router.push("/admin/createpass")}/>
                    <Button variant="primary" text="Verify" onClick={() => router.push("/admin/verify")}/>
                    <Button variant="warning" text="Logout" onClick={() => signOut()} />
                </div>
            </div>

            <div className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#262626] text-gray-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left">User Details</th>
                                <th className="px-6 py-4 text-left">Codes & Contact</th>
                                <th className="px-6 py-4 text-left">Role</th>
                                <th className="px-6 py-4 text-left">Purchases</th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDetails.map((item) => (
                                <tr key={item.id} className="border-t border-[#2d2d2d] hover:bg-[#232323] transition">
                                    {/* User Details */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-white">{item.name || "N/A"}</span>
                                            <span className="text-xs text-gray-400">{item.email}</span>
                                            <span className="text-[10px] mt-1 text-yellow-500/70">
                                                {item.emailVerified ? "✓ Email Verified" : "✗ Unverified"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Codes & Contact */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-mono text-blue-400">ID: {item.uniqueUserCode}</span>
                                            <span className="text-xs text-gray-300">Mob: {item.mobile || "N/A"}</span>
                                        </div>
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-[#2d2d2d] text-gray-300'}`}>
                                            {item.role}
                                        </span>
                                    </td>

                                    {/* Purchases */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            {item.purchases.length > 0 ? item.purchases.map((p, i) => (
                                                <span key={i} className="px-2 py-1 bg-[#2d2d2d] rounded text-[10px] w-fit">
                                                    {p.uniqueCode}
                                                </span>
                                            )) : <span className="text-gray-600 text-xs">No Purchases</span>}
                                        </div>
                                    </td>

                                    {/* Purchase Status */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            {item.purchases.map((p, i) => (
                                                <div key={i} className="flex gap-2 text-[10px]">
                                                    <span className={`px-2 py-1 rounded ${p.verified ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                                                        {p.verified ? "VERIFIED" : "PENDING"}
                                                    </span>
                                                    <span className="px-2 py-1 rounded bg-[#333] text-gray-300">
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
    );
}