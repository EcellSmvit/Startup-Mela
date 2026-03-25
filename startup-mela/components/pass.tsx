"use client";

import { useEffect, useState } from "react";
import InviteTeammate from "./InviteTeammate";
//@ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

interface Pass {
  id: string;
  title: string;
  description: string;
  limit: number;
  sold: number;
  price: number;
  teamSize: number;
  requiresEvent: boolean;
}

export default function Pass() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedPass, setSelectedPass] = useState<Pass | null>(null);
  const [friendCode, setFriendCode] = useState("");

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const res = await fetch("/api/passes");
        const data = await res.json();
        setPasses(data);
      } catch (error) {
        console.error("Failed to fetch passes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPasses();
  }, []);

  const handleFinalPurchase = async (teammateCodes: string[]) => {
    if (!selectedPass) return;

    setLoadingId(selectedPass.id);

    try {
      const cashfree = await load({
        mode: "production",
      });

      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passId: selectedPass.id,
          teammateCodes,
          friendCode,
        }),
      });

      const orderData = await res.json();

      if (!res.ok) {
        alert(orderData.error || "Failed to initialize purchase");
        return;
      }

      await cashfree.checkout({
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_self",
      });

    } catch (error) {
      console.error("Purchase error:", error);
      alert("Something went wrong during purchase.");
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 text-lg animate-pulse">
        Loading passes...
      </div>
    );
  }

  if (selectedPass) {
    return (
      <div className="w-full max-w-2xl mx-auto py-10">
        <button
          onClick={() => setSelectedPass(null)}
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
        >
          ← Back to Passes
        </button>

        <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Checkout: {selectedPass.title}
          </h2>
          <p className="text-gray-400 text-sm">
            Amount: ₹{selectedPass.price}
          </p>
        </div>

        <InviteTeammate
          pass={selectedPass}
          // teamSize={selectedPass.teamSize}
          onComplete={handleFinalPurchase}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 place-items-center">
        {passes.map((pass) => {
          const slotsLeft = pass.limit - pass.sold;
          const soldOut = slotsLeft <= 0;

          return (
            <div
              key={pass.id}
              className="group w-full min-w-[280px] max-w-[380px] mx-auto relative"
            >
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#014E87]/40 via-transparent to-[#014E87]/40 blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative h-full rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-between transition-all duration-300 group-hover:scale-[1.05] group-hover:border-[#014E87]/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#014E87] to-transparent"></div>
                <div className="flex flex-col gap-4">

                  <h2 className="text-2xl font-bold text-white group-hover:text-[#014E87] transition">
                    {pass.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed ">
                    {pass.description}
                  </p>

                  <p className="text-sm text-gray-400">
                     Team Size:{" "}
                    <span className="text-white font-medium">
                      {pass.teamSize}
                    </span>
                  </p>

                  <div className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-sm">
                      Slots Left
                    </span>
                    <span
                      className={`font-semibold ${
                        soldOut ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {soldOut ? "Sold Out" : slotsLeft}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8">

                  <div>
                    <p className="text-gray-500 text-xs">Price</p>
                    <p className="text-3xl font-bold text-white group-hover:text-[#014E87] transition">
                      ₹{pass.price}
                    </p>
                  </div>

                  <button
                    disabled={soldOut}
                    onClick={() => setSelectedPass(pass)}
                    className="relative overflow-hidden text-sm font-medium text-white px-5 py-2 rounded-lg bg-[#014E87] transition-all duration-300 hover:bg-[#0163aa] shadow-md hover:shadow-[#014E87]/40 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></span>

                    <span className="relative z-10">
                      {loadingId === pass.id
                        ? "Processing..."
                        : soldOut
                        ? "Sold Out"
                        : "Buy Pass"}
                    </span>
                  </button>
                </div>
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}