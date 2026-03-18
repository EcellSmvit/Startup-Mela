"use client"
import { useState } from "react";

interface InviteProps {
  teamSize: number;
  // onComplete now handles the array of teammate codes
  onComplete: (codes: string[]) => void;
  isLoading?: boolean;
}

export default function InviteTeammate({ teamSize, onComplete, isLoading }: InviteProps) {
  // If teamSize is 1 (Solo), we don't need teammate codes. 
  // Requirement is teamSize - 1.
  const requiredTeammates = Math.max(0, teamSize - 1);
  const [codes, setCodes] = useState<string[]>(Array(requiredTeammates).fill(""));

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.trim();
    setCodes(newCodes);
  };

  const isComplete = codes.every(code => code.length > 0);

  if (requiredTeammates === 0) {
    return (
      <div className="p-6 bg-[#1f1f1f] rounded-2xl border border-white/10 text-center">
        <p className="text-white mb-4">Solo Pass Selected</p>
        <button 
          onClick={() => onComplete([])}
          disabled={isLoading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 p-2 rounded font-bold text-black transition-colors"
        >
          {isLoading ? "Processing..." : "Proceed to Purchase"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-bold">Add Teammates</h3>
        <span className="text-xs text-gray-400">{requiredTeammates} codes required</span>
      </div>
      
      {codes.map((code, i) => (
        <div key={i} className="flex flex-col gap-1">
          <input
            className="bg-black border border-white/10 p-3 rounded text-white focus:border-yellow-500 outline-none transition-all"
            placeholder={`Enter Teammate ${i + 1} Unique Code`}
            value={code}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}

      <button 
        onClick={() => onComplete(codes)}
        disabled={!isComplete || isLoading}
        className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 p-3 rounded font-bold text-black mt-2 transition-colors"
      >
        {isLoading ? "Verifying..." : "Confirm and Purchase"}
      </button>
      
      {!isComplete && (
        <p className="text-xs text-red-400 text-center">Please fill all teammate codes</p>
      )}
    </div>
  );
}