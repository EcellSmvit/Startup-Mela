"use client";

import InputField from "@/components/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Createpass() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    limit: 0,
    teamSize: 1,
    forSmvit: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) return setError("Pass title is required");
    if (!formData.description.trim()) return setError("Description is required");
    if (formData.price <= 0) return setError("Price must be greater than 0");
    if (formData.limit <= 0) return setError("Limit must be greater than 0");
    if (formData.teamSize <= 0) return setError("Team size must be greater than 0");

    setLoading(true);

    try {
      const res = await fetch("/api/passes", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) router.push("/dashboard");
      else {
        let message = "Something went wrong";
        try {
          const data = await res.json();
          message = data.error || message;
        } catch {}
        setError(message);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen text-white bg-black relative overflow-hidden flex items-center justify-center px-4">

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:26px_26px]"></div>

      {/* Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#014E87]/20 blur-[140px] rounded-full"></div>

      {/* Glass Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 flex flex-col gap-6 shadow-[0_0_40px_rgba(1,78,135,0.1)]">

        {/*  Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Create Pass
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Create a new event pass with pricing & limits
          </p>
        </div>

        {/*  Error */}
        {error && (
          <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
            {error}
          </p>
        )}

        {/*  Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Inputs */}
          <div className="flex flex-col gap-4">

            <InputField
              variant="primary"
              type="text"
              placeholder="Pass Title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description (Supports Markdown: **bold**, \n for new lines, - for bullets)"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#014E87] min-h-[120px]"
              onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                variant="primary"
                type="number"
                placeholder="Team Size"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    teamSize: Number(e.target.value),
                  })
                }
              />

              <InputField
                variant="primary"
                type="number"
                placeholder="Limit"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    limit: Number(e.target.value),
                  })
                }
              />
            </div>

            <InputField
              variant="primary"
              type="number"
              placeholder="Price (₹)"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: Number(e.target.value),
                })
              }
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer text-sm text-white/70">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#014E87]"
              checked={formData.forSmvit}
              onChange={(e) =>
                setFormData({ ...formData, forSmvit: e.target.checked })
              }
            />
            SMVIT students only
          </label>

          {/* 🚀 Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 rounded-xl bg-[#014E87] text-white font-semibold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-[#014E87]/30"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating...
              </>
            ) : (
              "Create Pass"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-white/40 text-center">
          Pass will appear on dashboard after creation.
        </p>
      </div>
    </div>
  );
}