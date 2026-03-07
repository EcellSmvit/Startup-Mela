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
        return <div className="text-white text-center p-10">Loading passes...</div>;
    }

    return (
        <div className="flex flex-wrap gap-6 p-10 justify-center">
            {passes.map((pass: Pass) => (
                <div 
                    key={pass.id} 
                    className="bg-[#ececec] w-1/3 h-2/3 rounded-4xl p-7 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                    <div className="flex flex-col gap-5">
                        <h1 className="text-4xl font-bold text-[#262626] tracking-tight">
                            {pass.title}
                        </h1>
                        <p className="text-[#262626]/80 text-sm leading-relaxed">
                            {pass.description}
                        </p>
                        <div className="bg-[#262626]/5 rounded-2xl px-4 py-3 flex items-center justify-between">
                            <span className="text-[#262626] font-medium">
                                Slots left
                            </span>
                            <span className="text-lg font-semibold text-[#262626]">
                                {pass.limit - pass.sold}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <h1 className="text-4xl font-bold text-[#262626]">
                            ₹{pass.price}
                        </h1>
                        <Button
                            variant="primary"
                            text={loadingId === pass.id ? "Processing..." : "Buy Now"}
                            onClick={() => handleBuy(pass.id)}
                            // disabled={loadingId !== null || (pass.limit - pass.sold) <= 0}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}