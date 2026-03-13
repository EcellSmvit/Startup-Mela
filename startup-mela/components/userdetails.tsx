"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserInfo {
    USN: string;
    mobilenumber: string;
    collegename: string;
    year: string;
}

export default function Userdetails() {
    const [userInformation, setUserinformation] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const uniqueCode = session?.user?.uniqueUserCode;

    useEffect(() => {
        const fetchuserDetails = async () => {
            try {
                const res = await fetch("/api/userdetails");
                if (res.ok) {
                    const data = await res.json();
                    setUserinformation(data);
                }
            } catch (error) {
                console.error("failed to fetch user details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchuserDetails();
    }, []);

    if (loading) return (
        <div className="bg-[#1f1f1f] border border-[#2a2a2a] p-6 rounded-2xl shadow-lg w-full max-w-sm animate-pulse">
            <div className="h-6 bg-[#2a2a2a] rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
                <div className="h-4 bg-[#2a2a2a] rounded w-full"></div>
                <div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div>
            </div>
        </div>
    );

    if (!userInformation) return null;

    return (
        <div className="bg-[#1f1f1f] border border-[#2a2a2a] p-6 rounded-2xl shadow-xl w-full max-w-sm transition-all hover:border-yellow-500/30">
            <div className="flex items-center justify-between mb-4 border-b border-[#2a2a2a] pb-3">
                <h3 className="text-yellow-500 font-bold tracking-tight uppercase text-xs">
                    User Profile
                </h3>
                <span className="bg-yellow-500/10 text-yellow-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                    Verified
                </span>
            </div>
            
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">

                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">University ID</span>
                    <p className="text-white font-medium uppercase">{userInformation.USN}</p>
                </div>
                {uniqueCode && (
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                            Unique Code
                        </span>
                        <p className="text-yellow-500 font-medium">{uniqueCode}</p>
                    </div>    
                    )}
            </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Year</span>
                        <p className="text-white font-medium uppercase">{userInformation.year}</p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Contact</span>
                        <p className="text-white font-medium">{userInformation.mobilenumber}</p>
                    </div>
                    
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Institution</span>
                    <p className="text-white font-medium truncate uppercase">{userInformation.collegename}</p>
                </div>
            </div>
        </div>
    );
}