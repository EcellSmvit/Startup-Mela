"use client"

import { useEffect, useState } from "react";

// Updated interface to include teammate details fetched from the API
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
        const response = await fetch("/api/purchase", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

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
    <div className="w-full flex flex-wrap gap-6 p-6 justify-center">
      {purchaseDetails.map((item) => (
        <div
          key={item.uniqueCode}
          className="w-[300px] bg-[#1f1f1f] border border-white/10 rounded-2xl p-6 
          shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 
          hover:-translate-y-1"
        >
          <div className="flex flex-col gap-3">
            
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              Pass Code
            </div>

            <div className="text-lg font-semibold text-yellow-400">
              {item.uniqueCode}
            </div>

            <div className="h-[1px] bg-white/10 my-2" />

            <div className="text-sm text-gray-400">Pass Type</div>

            <div className="text-xl font-bold text-white">
              {item.pass.title}
            </div>

            <div className="text-yellow-400 font-semibold text-lg">
              ₹{item.pass.price}
            </div>

            {/* Teammates Section: Only displays if there are teammates assigned */}
            {item.teammates && item.teammates.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Teammates
                </div>
                <div className="flex flex-col gap-2">
                  {item.teammates.map((tm) => (
                    <div 
                      key={tm.uniqueUserCode} 
                      className="bg-black/20 p-2 rounded-lg border border-white/5"
                    >
                      <div className="text-sm text-white font-medium">
                        {tm.name || "User"}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        ID: {tm.uniqueUserCode}
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