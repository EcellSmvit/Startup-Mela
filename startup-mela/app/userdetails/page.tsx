"use client"

import InputField from "@/components/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function UserDetails() {
    const [formData, setFormData] = useState({
        USN: "",
        mobilenumber: "",
        collegename: "",
        year: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        // Basic validation
        if (!formData.USN.trim() || !formData.mobilenumber.trim() || !formData.collegename.trim() || !formData.year.trim()) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/userdetails", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                let message = "Something went wrong";
                try {
                    const data = await res.json();
                    message = data.error || message;
                } catch { }
                setError(message);
            }
        } catch (err) {
            console.error(err);
            setError("Network error. Please check your connection.")
        }
        setLoading(false)
    }

useEffect(() => {
        const checkExisting = async () => {
            try {
                const res = await fetch("/api/userdetails");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.userId) {
                        router.push("/dashboard");
                        return;
                    }
                }
            } catch (err) {
                console.error("Error checking user details", err);
            } finally {
                setIsChecking(false);
            }
        };
        checkExisting();
    }, [router]);
if (isChecking) return <div>Loading...</div>;
    return (
        <div className="bg-[#171716] w-screen min-h-screen flex items-center justify-center text-white px-4">
            <div className="w-full max-w-xl bg-[#1f1f1f] border border-[#2a2a2a] rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Complete Your Profile
                    </h1>
                    <p className="text-sm text-gray-400">
                        We need a few more details to set up your account
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm mb-6 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Top Row: USN and Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">USN / Roll No</label>
                            <InputField
                                variant="primary"
                                type="text"
                                placeholder="e.g. 1MV23CS000"
                                onChange={(e) => setFormData({ ...formData, USN: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Phone Number</label>
                            <InputField
                                variant="primary"
                                type="number"
                                placeholder="10-digit number"
                                onChange={(e) => setFormData({ ...formData, mobilenumber: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Middle Row: College Name */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">College / Institution</label>
                        <InputField
                            variant="primary"
                            type="text"
                            placeholder="Enter your full college name"
                            onChange={(e) => setFormData({ ...formData, collegename: e.target.value })}
                        />
                    </div>

                    {/* Bottom Row: Academic Year */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Current Year</label>
                        <InputField
                            variant="primary"
                            type="text"
                            placeholder="e.g. 2nd Year"
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-full py-4 rounded-2xl bg-yellow-500 text-black font-bold text-sm uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-yellow-500/10"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Finalize Registration"
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-6 border-t border-[#2a2a2a] text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter leading-relaxed">
                        Secure registration • Powered by E-Cell SMVIT
                    </p>
                </div>
            </div>
        </div>
    )
}