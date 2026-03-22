"use client";

import { useEffect, useState } from "react";
import Button from "./button";
import InviteTeammate from "./InviteTeammate";

declare global {
  interface Window {
    Razorpay: any;
  }
}
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
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount, 
        currency: "INR",
        name: "Startup Mela",
        description: `Purchase for ${selectedPass.title}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/purchase/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              purchaseId: orderData.purchaseId,
            }),
          });

          if (verifyRes.ok) {
            alert("Payment Successful! Check your dashboard for details.");
            window.location.reload();
          } else {
            const errorData = await verifyRes.json();
            alert(errorData.error || "Payment verification failed.");
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#014E87",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
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