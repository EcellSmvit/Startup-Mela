"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 1. Move the search logic into a sub-component
function VerifyPayment() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const orderId = searchParams.get("order_id");
  const purchaseId = searchParams.get("purchase_id");

  useEffect(() => {
    const verify = async () => {
      if (!orderId || !purchaseId) {
        console.error("Missing orderId or purchaseId");
        return;
      }

      try {
        const res = await fetch("/api/purchase/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, purchaseId }),
        });

        if (res.ok) {
          router.push("/dashboard?success=true");
        } else {
          router.push("/dashboard?error=payment_failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        router.push("/dashboard?error=verification_error");
      }
    };

    verify();
  }, [orderId, purchaseId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      <p className="text-white text-lg">
        Verifying your payment, please do not close the window...
      </p>
    </div>
  );
}

// 2. Main page export wrapped in Suspense
export default function PurchaseStatus() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen text-white">
          Loading...
        </div>
      }
    >
      <VerifyPayment />
    </Suspense>
  );
}