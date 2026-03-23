"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PurchaseStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const purchaseId = searchParams.get("purchase_id");

  useEffect(() => {
    const verify = async () => {
      if (!orderId || !purchaseId) return;
      
      const res = await fetch("/api/purchase/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, purchaseId })
      });

      if (res.ok) {
        router.push("/dashboard?success=true");
      } else {
        router.push("/dashboard?error=payment_failed");
      }
    };
    verify();
  }, [orderId, purchaseId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      Verifying your payment, please do not close the window...
    </div>
  );
}