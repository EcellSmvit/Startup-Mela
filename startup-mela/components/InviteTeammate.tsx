"use client";
import { useState } from "react";

interface InviteProps {
  teamSize: number;
  onComplete: (codes: string[]) => void;
  isLoading?: boolean;
}

export default function InviteTeammate({
  teamSize,
  onComplete,
  isLoading,
}: InviteProps) {
  const requiredTeammates = Math.max(0, teamSize - 1);
  const [codes, setCodes] = useState<string[]>(
    Array(requiredTeammates).fill("")
  );

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.trim();
    setCodes(newCodes);
  };

  const isComplete = codes.every((code) => code.length > 0);
  if (requiredTeammates === 0) {
    return (
      <div className="relative rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 text-center shadow-[0_0_30px_rgba(1,78,135,0.1)] z-20">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>

        <p className="text-white text-lg font-medium mb-4">
          Solo Pass Selected
        </p>

        <button
          onClick={() => onComplete([])}
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-[#014E87] text-white font-semibold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#014E87]/30"
        >
          {isLoading ? "Processing..." : "Proceed to Purchase"}
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_0_30px_rgba(1,78,135,0.1)] ">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold tracking-wide">
          Add Teammates
        </h3>
        <span className="text-xs text-white/40 tracking-wide">
          {requiredTeammates} required
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {codes.map((code, i) => (
          <input
            key={i}
            className="bg-black/60 border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:border-[#014E87] focus:ring-1 focus:ring-[#014E87]/40 outline-none transition-all"
            placeholder={`Teammate ${i + 1} Code`}
            value={code}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>
      <button
        onClick={() => onComplete(codes)}
        disabled={!isComplete || isLoading}
        className="mt-2 py-3 rounded-xl bg-[#014E87] text-white font-semibold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#014E87]/30"
      >
        {isLoading ? "Verifying..." : "Confirm & Purchase"}
      </button>
      {!isComplete && (
        <p className="text-xs text-red-400 text-center">
          Please fill all teammate codes
        </p>
      )}
    </div>
  );
}