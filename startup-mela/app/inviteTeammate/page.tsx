// components/InviteTeammate.tsx
"use client"
import { useState } from "react";

interface InviteProps {
  teamSize: number;
  onComplete: (codes: string[]) => void;
}

export default function InviteTeammate({ teamSize, onComplete }: InviteProps) {
  const [codes, setCodes] = useState<string[]>(Array(teamSize - 1).fill(""));

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
  };

  return (
    <div className="flex flex-col gap-4 bg-[#1f1f1f] p-6 rounded-2xl border border-white/10">
      <h3 className="text-white font-bold">Add Teammates ({teamSize - 1} required)</h3>
      {codes.map((code, i) => (
        <input
          key={i}
          className="bg-black border border-white/10 p-2 rounded text-white"
          placeholder={`Enter Teammate ${i + 1} Unique Code`}
          value={code}
          onChange={(e) => handleChange(i, e.target.value)}
        />
      ))}
      <button 
        onClick={() => onComplete(codes)}
        className="bg-yellow-500 p-2 rounded font-bold"
      >
        Confirm and Purchase
      </button>
    </div>
  );
}