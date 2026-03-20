"use client";

import { useEffect, useState } from "react";

interface ProfileCardProps {
  user: {
    name: string;
    uniqueUserCode: string;
  };
  userDetails: {
    usn: string;
    college: string;
    year: string;
    branch: string;
  };
}

export default function ProfileCard() {
  const [userDetails, setUserDetails] = useState<ProfileCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch("/api/details");
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Failed to fetch userDetails", error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[40vh] text-gray-400 text-lg">
        Loading User Details...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-wrap gap-6 justify-center p-6">
      {userDetails.map((item) => (
        <div
          key={item.user.uniqueUserCode}
          className="w-[320px] p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:scale-105 transition-all duration-300"
        >
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold text-white mb-4">
            {item.user.name?.charAt(0).toUpperCase()}
          </div>

          {/* Name */}
          <h2 className="text-xl font-semibold text-white">
            {item.user.name}
          </h2>

          {/* Unique Code */}
          <p className="text-sm text-gray-400 mb-3">
            ID: {item.user.uniqueUserCode}
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/10 my-3" />

          {/* Details */}
          <div className="text-sm text-gray-300 space-y-1">
            <p><span className="text-gray-500">USN:</span> {item.userDetails.usn}</p>
            <p><span className="text-gray-500">College:</span> {item.userDetails.college}</p>
            <p><span className="text-gray-500">Year:</span> {item.userDetails.year}</p>
            <p><span className="text-gray-500">Branch:</span> {item.userDetails.branch}</p>
          </div>

          {/* Button */}
          <button className="mt-4 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition">
            View Profile
          </button>
        </div>
      ))}
    </div>
  );
}