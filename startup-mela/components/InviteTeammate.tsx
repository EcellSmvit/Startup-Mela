"use client";

import { useState } from "react";

const VALID_EVENTS = [
  "REBOOTX",
  "Startup Survival Game",
  // "IPL Auction"
];

interface InviteProps {
  pass: {
    id: string;
    teamSize: number;
    requiresEvent: boolean;
    price: number;
  };
  onComplete: (codes: string[], events: string[]) => void;
  isLoading?: boolean;
}

export default function InviteTeammate({
  pass,
  onComplete,
  isLoading,
}: InviteProps) {
  const teamSize = pass.teamSize || 1;
  const totalTeammatesSlots = Math.max(0, teamSize - 1);

  const optionalCount = teamSize > 2 ? 1 : 0;
  const mandatoryCount = totalTeammatesSlots - optionalCount;

  const [codes, setCodes] = useState<string[]>(
    Array(totalTeammatesSlots).fill("")
  );
  
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
  const handleChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.trim();
    setCodes(newCodes);
  };

  const handleEventToggle = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
    } else {
        setSelectedEvents([event]);
    }
  };

  const mandatoryCodesFilled = codes
    .slice(0, mandatoryCount)
    .every(code => code.length > 0);
    
  const isTeammatesComplete = mandatoryCodesFilled;
  const isEventComplete = !pass.requiresEvent || selectedEvents.length === 1;
  const isComplete = isTeammatesComplete && isEventComplete;

  const renderEventSelector = () => {
    if (!pass.requiresEvent) return null;
    return (
      <div className="flex flex-col gap-3 mb-4 text-left animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="flex justify-between items-center ml-1">
          <label className="text-white/60 text-xs font-medium uppercase tracking-wider">
            Select One Events <span className="text-red-500">*</span>
          </label>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">
            {selectedEvents.length}/1 selected
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {VALID_EVENTS.map((event) => {
            const isSelected = selectedEvents.includes(event);
            const isDisabled = false;
            return (
              <button
                key={event}
                type="button"
                onClick={() => handleEventToggle(event)}
                disabled={isDisabled}
                className={`w-full p-3 rounded-xl border text-sm text-left transition-all duration-200 ${
                  isSelected 
                    ? "bg-[#014E87]/40 border-[#014E87] text-white" 
                    : "bg-black/40 border-white/10 text-white/50"
                } ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  {event}
                  {isSelected && <span className="bg-white text-[#014E87] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">✓</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6">
      <div className="relative z-10">
        <h3 className="text-white font-bold text-lg mb-2">
          {totalTeammatesSlots === 0 ? "Solo Pass Details" : "Team Pass Details"}
        </h3>
        
        {renderEventSelector()}

        {totalTeammatesSlots > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <label className="text-white/60 text-xs font-medium uppercase tracking-wider ml-1">
                Teammate Codes
              </label>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">
                {mandatoryCount} Mandatory, {optionalCount} Optional
              </span>
            </div>
            
            <div className="flex flex-col gap-3">
              {codes.map((code, i) => {
                const isOptional = i >= mandatoryCount;
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <input
                      className={`bg-black/60 border p-3 rounded-xl text-white placeholder:text-white/40 outline-none transition-all ${
                        isOptional ? "border-white/5" : "border-white/10 focus:border-[#014E87]"
                      }`}
                      placeholder={`Teammate ${i + 1} Code ${isOptional ? "(Optional)" : ""}`}
                      value={code}
                      onChange={(e) => handleChange(i, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            const finalCodes = codes.filter(c => c.length > 0);
            onComplete(finalCodes, selectedEvents);
          }}
          disabled={!isComplete || isLoading}
          className="mt-6 w-full py-4 rounded-xl bg-[#014E87] text-white font-bold disabled:opacity-50"
        >
          {isLoading ? "Processing..." : `Pay ₹${pass.price}`}
        </button>

        {!isComplete && !isLoading && (
          <p className="mt-3 text-[11px] text-red-400 text-center font-medium">
            {pass.requiresEvent && selectedEvents.length < 2
              ? `⚠ Please select ${1 - selectedEvents.length} more event(s)` 
              : `⚠ Please fill the ${mandatoryCount} mandatory teammate code(s)`}
          </p>
        )}
      </div>
    </div>
  );
}