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
  Loader2 
} from "lucide-react";

export default function CompleteProfile() {
  const { update, data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    usn: "",
    mobile: "",
    isSmvit: "true",
    otherCollege: "",
    year: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if details are already present
  useEffect(() => {
    if (status === "authenticated" && session?.user?.hasDetails) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  const validateForm = () => {
    if (!formData.usn.trim()) return "USN is required";
    if (!/^[0-9]{10}$/.test(formData.mobile)) return "Enter a valid 10-digit mobile number";
    if (!formData.year) return "Select your year";
    if (formData.isSmvit === "false" && !formData.otherCollege.trim()) return "College name is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usn: formData.usn,
          mobileNumber: formData.mobile,
          isSmvit: formData.isSmvit === "true",
          collegeName: formData.isSmvit === "true" 
            ? "Sir M. Visvesvaraya Institute of Technology" 
            : formData.otherCollege,
          year: formData.year
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }
      await update();
      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-zinc-200 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-md p-8 rounded-3xl shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              Finish Setup <Rocket className="w-6 h-6 text-yellow-500" />
            </h1>
            <p className="text-sm text-zinc-500">Provide your details to access the dashboard.</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <div className="space-y-4">
            {/* USN */}
            <div className="relative group">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="text"
                placeholder="USN (e.g., 1MV21CS001)"
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all placeholder:text-zinc-600"
                onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
              />
            </div>

            {/* Mobile */}
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
              <input
                type="tel"
                placeholder="10-Digit Mobile Number"
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all placeholder:text-zinc-600"
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
            </div>

            {/* College Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-800/50 rounded-xl border border-zinc-700">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isSmvit: "true" })}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.isSmvit === "true" 
                  ? "bg-yellow-500 text-black shadow-md" 
                  : "text-zinc-400 hover:text-white"
                }`}
              >
                SMVIT Student
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isSmvit: "false" })}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.isSmvit === "false" 
                  ? "bg-yellow-500 text-black shadow-md" 
                  : "text-zinc-400 hover:text-white"
                }`}
              >
                Other College
              </button>
            </div>

            {/* Other College Input */}
            {formData.isSmvit === "false" && (
              <div className="relative group animate-in slide-in-from-top-2 duration-200">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-yellow-500" />
                <input
                  type="text"
                  placeholder="Enter College Name"
                  className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all placeholder:text-zinc-600"
                  onChange={(e) => setFormData({ ...formData, otherCollege: e.target.value })}
                />
              </div>
            )}

            {/* Year Select */}
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-yellow-500 pointer-events-none" />
              <select
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 outline-none transition-all appearance-none text-zinc-300"
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              >
                <option value="">Select Academic Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Details...
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