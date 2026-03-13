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
    purchases: {
        uniqueCode: string;
        verified: string;
        purchaseStatus: string;
    }[];
    pass: {
        title: string;
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
                const response = await fetch("/api/stats", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

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
            <div className="bg-[#171716] w-screen h-screen text-white flex items-center justify-center text-lg tracking-wide">
                Loading please wait...
            </div>
        );
    }

    if (status !== "authenticated" || session?.user?.role !== "ADMIN") {
        return null;
    }

    return (
        <div className="min-h-screen min-w-screen bg-[#171716] text-[#ececec] p-8">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-md sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide text-center sm:text-left">
                   Dashboard
                </h1>

                <div className="flex items-center gap-4">
                    <Button variant="secondary" text="Passes" onClick={() => router.push("/admin/createpass")}/>
                    <Button variant="primary" text="Verify" onClick={() => router.push("/admin/verify")}/>
                    <Button
                        variant="warning"
                        text="Logout"
                        onClick={() => signOut()}
                    />
                </div>
            </div>


            <div className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-2xl overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">
                        <thead className="bg-[#262626] text-gray-400 uppercase text-xs tracking-wider">

                            <tr>
                                <th className="px-6 py-4 text-left">User</th>
                                <th className="px-6 py-4 text-left">Role</th>
                                <th className="px-6 py-4 text-left">Purchases</th>
                                <th className="px-6 py-4 text-left">Status</th>
                            </tr>

                        </thead>
                        <tbody>

                            {userDetails.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-t border-[#2d2d2d] hover:bg-[#232323] transition"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {item.name}
                                            </span>

                                            <span className="text-xs text-gray-400">
                                                {item.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">

                                        <span className="text-xs px-3 py-1 rounded-full bg-[#2d2d2d]">
                                            {item.role}
                                        </span>

                                    </td>


                                    {/* Purchases */}
                                    <td className="px-6 py-4 space-y-2">

                                        {item.purchases.map((purchase, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center gap-3 text-xs"
                                            >

                                                <span className="px-2 py-1 bg-[#2d2d2d] rounded">
                                                    {purchase.uniqueCode}
                                                </span>

                                            </div>

                                        ))}

                                    </td>


                                    {/* Status */}
                                    <td className="px-6 py-4 space-y-2">

                                        {item.purchases.map((purchase, index) => (

                                            <div key={index} className="flex gap-2 text-xs">

                                                <span className="px-2 py-1 rounded bg-[#333]">
                                                    Verified: {purchase.verified ? "True" : "False"}
                                                </span>

                                                <span className="px-2 py-1 rounded bg-[#333]">
                                                    {purchase.purchaseStatus}
                                                </span>

                                            </div>

                                        ))}

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