// app/complete-profile/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
  const [formData, setFormData] = useState({
    usn: "",
    mobile: "",
    isSmvit: "true",
    otherCollege: "",
    year: ""
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/user/details", {
      method: "POST",
      body: JSON.stringify({
        usn: formData.usn,
        mobileNumber: formData.mobile,
        isSmvit: formData.isSmvit === "true",
        collegeName: formData.otherCollege,
        year: formData.year
      }),
    });

    if (res.ok) {
      // Force session refresh or redirect
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-[#171716] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-[#1f1f1f] p-8 rounded-xl border border-white/10 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
        
        <input type="text" placeholder="USN" required className="w-full p-3 bg-black border border-white/10 rounded" 
          onChange={(e) => setFormData({...formData, usn: e.target.value})} />
        
        <input type="text" placeholder="Mobile Number" required className="w-full p-3 bg-black border border-white/10 rounded" 
          onChange={(e) => setFormData({...formData, mobile: e.target.value})} />

        <div className="flex gap-4 text-white">
          <label><input type="radio" name="college" value="true" checked={formData.isSmvit === "true"} 
            onChange={(e) => setFormData({...formData, isSmvit: e.target.value})} /> SMVIT Student</label>
          <label><input type="radio" name="college" value="false" 
            onChange={(e) => setFormData({...formData, isSmvit: e.target.value})} /> Other</label>
        </div>

        {formData.isSmvit === "false" && (
          <input type="text" placeholder="College Name" required className="w-full p-3 bg-black border border-white/10 rounded" 
            onChange={(e) => setFormData({...formData, otherCollege: e.target.value})} />
        )}

        <select required className="w-full p-3 bg-black border border-white/10 rounded text-white" 
          onChange={(e) => setFormData({...formData, year: e.target.value})}>
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <button type="submit" className="w-full py-3 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400">
          Save & Continue
        </button>
      </form>
    </div>
  );
}