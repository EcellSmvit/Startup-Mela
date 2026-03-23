"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PurchaseStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const verify = async () => {
      if (!orderId) return;
      
      const res = await fetch("/api/purchase/verify", {
        method: "POST",
        body: JSON.stringify({ orderId })
      });

      if (res.ok) {
        router.push("/dashboard?success=true");
      } else {
        router.push("/dashboard?error=payment_failed");
      }
    };
    verify();
  }, [orderId]);

  return <div>Verifying your payment, please do not close the window...</div>;
}