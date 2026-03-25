"use client";
import { useState } from "react";

// List of available events for the dropdown
const VALID_EVENTS = [
  "The Investor's Dilemma",
  "REBOOTX",
  "Startup Survival Game"
];

interface InviteProps {
  teamSize: number;
  // Updated onComplete to include the selected event name
  onComplete: (codes: string[], event: string) => void;
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
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.trim();
    setCodes(newCodes);
  };

  const filledCodesCount = codes.filter((code) => code.length > 0).length;
  // Validation: Required teammates codes must be filled and an event must be selected
  const isComplete = filledCodesCount === requiredTeammates && selectedEvent !== "";

  // Helper to render the event selection dropdown
  const EventSelector = () => (
    <div className="flex flex-col gap-2 mb-4 text-left">
      <label className="text-white/60 text-xs font-medium uppercase tracking-wider ml-1">
        Select Your Event
      </label>
      <select
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
        className="w-full bg-black/60 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#014E87] focus:ring-1 focus:ring-[#014E87]/40 transition-all appearance-none cursor-pointer"
      >
        <option value="" disabled className="bg-[#121212]">-- Choose an Event --</option>
        {VALID_EVENTS.map((event) => (
          <option key={event} value={event} className="bg-[#121212]">
            {event}
          </option>
        ))}
      </select>
    </div>
  );

  // Layout for Solo Pass (Team Size 1)
  if (requiredTeammates === 0) {
    return (
      <div className="relative rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 text-center shadow-[0_0_30px_rgba(1,78,135,0.1)] z-20">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>

        <p className="text-white text-lg font-medium mb-4">Solo Pass Selected</p>
        
        <EventSelector />

        <button
          onClick={() => onComplete([], selectedEvent)}
          disabled={isLoading || !selectedEvent}
          className="w-full py-3 rounded-xl bg-[#014E87] text-white font-semibold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#014E87]/30"
        >
          {isLoading ? "Processing..." : "Proceed to Purchase"}
        </button>
      </div>
    );
  }

  // Layout for Teams (Team Size > 1)
  return (
    <div className="relative flex flex-col gap-5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_0_30px_rgba(1,78,135,0.1)] ">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>
      
      <EventSelector />

      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold tracking-wide">Add Teammates</h3>
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
        onClick={() => onComplete(codes, selectedEvent)}
        disabled={!isComplete || isLoading}
        className="mt-2 py-3 rounded-xl bg-[#014E87] text-white font-semibold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-[#014E87]/30"
      >
        {isLoading ? "Verifying..." : "Confirm & Purchase"}
      </button>
      
      {!isComplete && (
        <p className="text-xs text-red-400 text-center">
          {selectedEvent === "" ? "Please select an event" : "Please fill all teammate codes"}
        </p>
      )}
    </div>
  );
}