"use client"

import Button from "@/components/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserInformation{
    id:string;
    name:string;
    email:string;
    role:string;
    purchases:{
        uniqueCode : string;
        verified:string;
        purchaseStatus:string;
    }[];
    pass:{
        title:string
    }[];
}

export default function AdminPages(){

    const [userDetails,setUserDetails] = useState<UserInformation[]>([])
    const [loading, setLoading] = useState(true);

    const { data: session, status } = useSession();

    useEffect(() =>{
        const getuserInformation = async() =>{
            try{
                const response = await fetch("/api/stats",{
                    method:"GET",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();
                setUserDetails(data)
            } catch(error){
                console.error("fail to fetch user details",error);
            }finally{
                setLoading(false);
            }
        };

        getuserInformation();
    },[])

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

    return(
        <div className="min-h-screen bg-[#171716] text-[#ececec] p-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold tracking-wide">
                    Admin Dashboard
                </h1>

                <div className="flex items-center gap-4">
                    <Button
                        variant="secondary"
                        text="Create Passes"
                    />
                    <Button
                        variant="primary"
                        text="Verify User"
                    />
                    <Button
                        variant="warning"
                        text="Logout"
                        onClick={() => signOut()}
                    />
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {userDetails.map((item) =>(
                    <div
                        key={item.id}
                        className="bg-[#1f1f1f] border border-[#2d2d2d] rounded-2xl p-6 hover:border-yellow-500 transition"
                    >

                        {/* User Info */}
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">
                                {item.name}
                            </h2>

                            <p className="text-sm text-gray-400">
                                {item.email}
                            </p>

                            <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-[#2d2d2d]">
                                {item.role}
                            </span>
                        </div>

                        {/* Purchases */}
                        <div className="space-y-3">
                            {item.purchases.map((purchase, index) => (
                                <div
                                    key={index}
                                    className="bg-[#262626] rounded-lg p-3 text-sm flex flex-col gap-1"
                                >
                                    <span className="text-gray-300">
                                        Code: {purchase.uniqueCode}
                                    </span>

                                    <div className="flex gap-3 text-xs">
                                        <span className="px-2 py-1 rounded bg-[#333]">
                                            Verified: {purchase.verified}
                                        </span>

                                        <span className="px-2 py-1 rounded bg-[#333]">
                                            Status: {purchase.purchaseStatus}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}