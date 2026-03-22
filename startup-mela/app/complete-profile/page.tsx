"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Rocket,
  GraduationCap,
  Phone,
  School,
  Calendar,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function CompleteProfile() {
  const { update, data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    usn: "",
    mobile: "",
    isSmvit: "true",
    otherCollege: "",
    year: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.hasDetails) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const validateForm = () => {
    if (!formData.usn.trim()) return "USN is required";
    if (!/^[0-9]{10}$/.test(formData.mobile)) return "Enter valid mobile";
    if (!formData.year) return "Select your year";
    if (formData.isSmvit === "false" && !formData.otherCollege.trim())
      return "College name is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);

      const res = await fetch("/api/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usn: formData.usn,
          mobileNumber: formData.mobile,
          isSmvit: formData.isSmvit === "true",
          collegeName:
            formData.isSmvit === "true"
              ? "Sir M. Visvesvaraya Institute of Technology"
              : formData.otherCollege,
          year: formData.year,
        }),
      });

      if (!res.ok) throw new Error("Something went wrong");

      await update();
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#014E87] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-6 text-white">

      {/* 🔲 Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:26px_26px]"></div>

      {/* 🔥 Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#014E87]/20 blur-[140px] rounded-full"></div>

      <div className="w-full max-w-md relative z-10">

        {/* 🧊 Card */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl space-y-6 shadow-[0_0_40px_rgba(1,78,135,0.1)]"
        >

          {/* Glow Border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
              Finish Setup <Rocket className="w-6 h-6 text-[#014E87]" />
            </h1>
            <p className="text-sm text-white/50">
              Complete your profile to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-4">

            {/* USN */}
            <div className="relative group">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#014E87]" />
              <input
                type="text"
                placeholder="USN"
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#014E87] outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, usn: e.target.value })
                }
              />
            </div>

            {/* Mobile */}
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#014E87]" />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#014E87]"
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>

            {/* Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
              {["true", "false"].map((val, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isSmvit: val })
                  }
                  className={`py-2 rounded-lg text-sm ${
                    formData.isSmvit === val
                      ? "bg-[#014E87] text-white"
                      : "text-white/50"
                  }`}
                >
                  {val === "true" ? "SMVIT" : "Other"}
                </button>
              ))}
            </div>

            {/* Other College */}
            {formData.isSmvit === "false" && (
              <input
                type="text"
                placeholder="College Name"
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#014E87]"
                onChange={(e) =>
                  setFormData({ ...formData, otherCollege: e.target.value })
                }
              />
            )}

            {/* Year */}
            <select
              className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-[#014E87]"
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#014E87] hover:opacity-90 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save & Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}