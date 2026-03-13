"use client"

import { useEffect, useState } from "react";

interface UserInfo {
    USN: string;
    mobilenumber: number;
    collegename: string;
    year: string;
}

export default function Userdetails() {
    const [userInformation, setUserinformation] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <div className="text-white animate-pulse">Loading info...</div>;
    if (!userInformation) return null;

    return (
        <div className="bg-[#1f1f1f] border border-[#2a2a2a] p-6 rounded-2xl shadow-lg">
            <h3 className="text-yellow-500 font-semibold mb-4 border-b border-[#2a2a2a] pb-2">User Profile</h3>
            <div className="space-y-3 text-sm">
                <p><span className="text-gray-400">USN:</span> {userInformation.USN}</p>
                <p><span className="text-gray-400">College:</span> {userInformation.collegename}</p>
                <p><span className="text-gray-400">Year:</span> {userInformation.year}</p>
                <p><span className="text-gray-400">Mobile:</span> {userInformation.mobilenumber}</p>
            </div>
        </div>
    );
}