"use client"
import { useEffect, useState } from "react";
import Button from "./button";

interface Pass {
  id: string;
  title: string;
  description: string;
  limit: number;
  sold: number;
  price: number;
}

export default function Pass() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBuy = async (passId: string) => {
    setLoadingId(passId);

    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Purchase successful! Check your dashboard for the pass code.");
        window.location.reload();
      } else {
        alert(data.error || "Purchase Failed");
      }
    } catch (error) {
      alert("An error occurred during purchase.");
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    const getPasses = async () => {
      try {
        const response = await fetch("/api/passes");
        const data = await response.json();
        setPasses(data);
      } catch (error) {
        console.error("Failed to fetch passes", error);
      } finally {
        setLoading(false);
      }
    };

    getPasses();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center p-20 text-lg animate-pulse">
        Loading passes...
      </div>
    );
  }

  return (
    <div className=" bg-[#171716] flex items-center justify-center px-10">
      
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">

        {passes.map((pass: Pass) => {

          const slotsLeft = pass.limit - pass.sold;
          const soldOut = slotsLeft <= 0;

          return (
            <div
              key={pass.id}
              className="relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 to-purple-500/40 hover:scale-[1.03] transition-all duration-300"
            >
              
              <div className="bg-[#262626] rounded-3xl p-8 h-full flex flex-col justify-between backdrop-blur-xl border border-white/5">

                {/* TOP */}
                <div className="flex flex-col gap-4">

                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {pass.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {pass.description}
                  </p>

                  <div className="flex items-center justify-between bg-black/30 px-4 py-3 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-sm">
                      Slots Remaining
                    </span>

                    <span className={`font-semibold ${
                      soldOut ? "text-red-400" : "text-green-400"
                    }`}>
                      {soldOut ? "Sold Out" : slotsLeft}
                    </span>
                  </div>
                </div>

                {/* BOTTOM */}
                <div className="flex items-center justify-between mt-8">

                  <div className="flex flex-col">
                    <span className="text-gray-500 text-sm">Price</span>
                    <span className="text-3xl font-bold text-white">
                      ₹{pass.price}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    text={
                      soldOut
                        ? "Sold Out"
                        : loadingId === pass.id
                        ? "Processing..."
                        : "Buy Pass"
                    }
                    onClick={() => handleBuy(pass.id)}
                    // disabled={soldOut || loadingId !== null}
                  />

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}