"use client";

import { useEffect, useState } from "react";
import Button from "./button";
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
      // 1. Initialize Cashfree SDK
      const cashfree = await load({
        mode: "sandbox", // Change to "production" for live site
      });

      // 2. Call your backend to create an order
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

      // 3. Trigger Cashfree Checkout using paymentSessionId
      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        redirectTarget: "_self", // Redirects in the same tab
      };

      // This will redirect the user to Cashfree's secure payment page.
      // After payment, they will be sent to the return_url defined in your API.
      await cashfree.checkout(checkoutOptions);

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

        <div className="bg-[#262626] border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-2">
            Checkout: {selectedPass.title}
          </h2>
          <p className="text-gray-400 text-sm">Amount: ₹{selectedPass.price}</p>
        </div>

        <InviteTeammate
          teamSize={selectedPass.teamSize}
          onComplete={handleFinalPurchase}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {passes.map((pass) => {
          const slotsLeft = pass.limit - pass.sold;
          const soldOut = slotsLeft <= 0;

          return (
            <div
              key={pass.id}
              className="w-full min-w-[280px] max-w-[380px] mx-auto relative rounded-3xl p-[1px] bg-gradient-to-br from-yellow-500/40 to-orange-500/40 hover:scale-[1.03] transition-all duration-300"
            >
              <div className="bg-[#262626] rounded-3xl p-8 h-full flex flex-col justify-between border border-white/5">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {pass.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {pass.description}
                  </p>
                  <p className="text-gray-400 text-sm font-medium">
                    👥 Team Size: {pass.teamSize}
                  </p>

                  <div className="flex items-center justify-between bg-black/30 px-4 py-3 rounded-xl border border-white/5">
                    <span className="text-gray-400 text-sm">Slots Remaining</span>
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
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="text-3xl font-bold text-white">
                      ₹{pass.price}
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    text={
                      loadingId === pass.id
                        ? "Processing..."
                        : soldOut
                        ? "Sold Out"
                        : "Buy Pass"
                    }
                    onClick={() => setSelectedPass(pass)}
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