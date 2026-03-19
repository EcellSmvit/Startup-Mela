"use client";

import { useEffect, useState } from "react";

interface PurchaseDetailsProps {
  uniqueCode: string;
  pass: {
    title: string;
    price: number;
  };
  teammates: {
    name: string | null;
    uniqueUserCode: string;
  }[];
}

export default function PurchaseInfo() {
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetailsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPurchaseDetails = async () => {
      try {
        const response = await fetch("/api/purchase");
        const data = await response.json();
        setPurchaseDetails(data);
      } catch (error) {
        console.error("failed to fetch purchaseDetails", error);
      } finally {
        setLoading(false);
      }
    };

    getPurchaseDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[40vh] text-gray-400 text-lg">
        Loading Purchase Details...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-wrap gap-8 p-8 justify-center">
      {purchaseDetails.map((item) => (
        <div
          key={item.uniqueCode}
          className="
          relative w-[320px] rounded-2xl p-[1px]
          bg-gradient-to-br from-yellow-500/30 via-purple-500/20 to-transparent
          hover:from-yellow-400/50 hover:via-purple-500/40
          transition-all duration-300
        "
        >
          {/* Glass Card */}
          <div
            className="
            bg-[#111111]/80 backdrop-blur-xl rounded-2xl p-6
            border border-white/10
            hover:shadow-[0_10px_40px_rgba(255,215,0,0.15)]
            transition-all duration-300 hover:-translate-y-1
          "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Pass Code
              </div>
              <div className="text-[10px] bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-full">
                ACTIVE
              </div>
            </div>

            <div className="text-lg font-semibold text-yellow-400 mb-3 tracking-wide">
              {item.uniqueCode}
            </div>

            <div className="h-[1px] bg-white/10 my-3" />

            {/* Pass Info */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Pass Type</span>
              <span className="text-xl font-bold text-white">
                {item.pass.title}
              </span>
              <span className="text-[#6D4DFE] font-semibold text-lg">
                ₹{item.pass.price}
              </span>
            </div>

            {/* Teammates */}
            {item.teammates?.length > 0 && (
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                  Team Members
                </div>

                <div className="flex flex-col gap-3">
                  {item.teammates.map((tm) => (
                    <div
                      key={tm.uniqueUserCode}
                      className="
                      flex justify-between items-center
                      bg-white/5 hover:bg-white/10
                      p-3 rounded-xl border border-white/10
                      transition-all duration-200
                    "
                    >
                      <div>
                        <div className="text-sm text-white font-medium">
                          {tm.name || "User"}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {tm.uniqueUserCode}
                        </div>
                      </div>

                      {/* Avatar Circle */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-purple-500 flex items-center justify-center text-black text-xs font-bold">
                        {tm.name?.charAt(0) || "U"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}