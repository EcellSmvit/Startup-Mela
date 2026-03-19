"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
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

  // 🔍 Validation
  const validateForm = () => {
    if (!formData.usn.trim()) return "USN is required";

    if (!/^[0-9]{10}$/.test(formData.mobile))
      return "Enter valid 10-digit mobile number";

    if (!formData.year) return "Select your year";

    if (formData.isSmvit === "false" && !formData.otherCollege.trim())
      return "Enter your college name";

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usn: formData.usn,
          mobileNumber: formData.mobile,
          isSmvit: formData.isSmvit === "true",
          collegeName: formData.otherCollege,
          year: formData.year
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      router.push("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#171716] to-black flex items-center justify-center p-4 text-white">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">
          Complete Profile 🚀
        </h2>

        {/* ❌ Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-sm">
            {error}
          </div>
        )}

        {/* USN */}
        <input
          type="text"
          placeholder="USN"
          className="w-full p-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) =>
            setFormData({ ...formData, usn: e.target.value })
          }
        />

        {/* Mobile */}
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full p-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) =>
            setFormData({ ...formData, mobile: e.target.value })
          }
        />

        {/* College Type */}
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="college"
              value="true"
              checked={formData.isSmvit === "true"}
              onChange={(e) =>
                setFormData({ ...formData, isSmvit: e.target.value })
              }
            />
            SMVIT Student
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="college"
              value="false"
              onChange={(e) =>
                setFormData({ ...formData, isSmvit: e.target.value })
              }
            />
            Other College
          </label>
        </div>

        {/* Other College */}
        {formData.isSmvit === "false" && (
          <input
            type="text"
            placeholder="College Name"
            className="w-full p-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                otherCollege: e.target.value
              })
            }
          />
        )}

        {/* Year */}
        <select
          className="w-full p-3 bg-black/60 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-bold rounded-lg transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-400"
          }`}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
}