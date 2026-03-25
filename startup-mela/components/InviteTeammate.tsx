"use client";

import { useState } from "react";

// List of available events for the dropdown
const VALID_EVENTS = [
  "The Investor's Dilemma",
  "REBOOTX",
  "Startup Survival Game",
  "IPL Auction"
];

interface InviteProps {
  // Pass object now includes requiresEvent from schema
  pass: {
    id: string;
    teamSize: number;
    requiresEvent: boolean;
    price: number;
  };
  // Updated signature to accept an array of strings for events
  onComplete: (codes: string[], events: string[]) => void;
  isLoading?: boolean;
}

export default function InviteTeammate({
  pass,
  onComplete,
  isLoading,
}: InviteProps) {
  const teamSize = pass.teamSize || 1;
  const requiredTeammates = Math.max(0, teamSize - 1);
  
  const [codes, setCodes] = useState<string[]>(
    Array(requiredTeammates).fill("")
  );
  
  // State to manage multiple event selections
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.trim();
    setCodes(newCodes);
  };

  const handleEventToggle = (event: string) => {
    if (selectedEvents.includes(event)) {
      // Deselect if already selected
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
      // Select if less than 2 are selected
      if (selectedEvents.length < 2) {
        setSelectedEvents([...selectedEvents, event]);
      }
    }
  };

  const filledCodesCount = codes.filter((code) => code.length > 0).length;
  
  // Validation Logic:
  // 1. All teammate codes must be filled
  // 2. IF pass.requiresEvent is true, exactly TWO events MUST be selected
  const isTeammatesComplete = filledCodesCount === requiredTeammates;
  const isEventComplete = !pass.requiresEvent || selectedEvents.length === 2;
  const isComplete = isTeammatesComplete && isEventComplete;

  // Helper to render event selection as clickable badges/chips
  const renderEventSelector = () => {
    if (!pass.requiresEvent) return null;

    return (
      <div className="flex flex-col gap-3 mb-4 text-left animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="flex justify-between items-center ml-1">
          <label className="text-white/60 text-xs font-medium uppercase tracking-wider">
            Select Two Events <span className="text-red-500">*</span>
          </label>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">
            {selectedEvents.length}/2 selected
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {VALID_EVENTS.map((event) => {
            const isSelected = selectedEvents.includes(event);
            const isDisabled = !isSelected && selectedEvents.length >= 2;
            
            return (
              <button
                key={event}
                type="button"
                onClick={() => handleEventToggle(event)}
                disabled={isDisabled}
                className={`w-full p-3 rounded-xl border text-sm text-left transition-all duration-200 ${
                  isSelected 
                    ? "bg-[#014E87]/40 border-[#014E87] text-white shadow-[0_0_15px_rgba(1,78,135,0.2)]" 
                    : "bg-black/40 border-white/10 text-white/50 hover:border-white/20"
                } ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  {event}
                  {isSelected && (
                    <span className="bg-white text-[#014E87] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_0_30px_rgba(1,78,135,0.1)]">
      {/* Background Glow Effect */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>

      <div className="relative z-10">
        <h3 className="text-white font-bold text-lg mb-2">
          {requiredTeammates === 0 ? "Solo Pass Details" : "Team Pass Details"}
        </h3>
        
        {/* Event Selection UI */}
        {renderEventSelector()}

        {/* Teammate Inputs (Only if teamSize > 1) */}
        {requiredTeammates > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="text-white/60 text-xs font-medium uppercase tracking-wider ml-1">
                Add Teammate Codes
              </label>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">
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
          </div>
        )}

        <button
          onClick={() => onComplete(codes, selectedEvents)}
          disabled={!isComplete || isLoading}
          className="mt-6 w-full py-4 rounded-xl bg-[#014E87] text-white font-bold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-[#014E87]/30 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            `Pay ₹${pass.price}`
          )}
        </button>

        {/* Error Messages */}
        {!isComplete && !isLoading && (
          <p className="mt-3 text-[11px] text-red-400 text-center font-medium animate-pulse">
            {pass.requiresEvent && selectedEvents.length < 2
              ? `⚠ Please select ${2 - selectedEvents.length} more event(s)` 
              : "⚠ Please fill all teammate codes"}
          </p>
        )}
      </div>
    </div>
  );
}