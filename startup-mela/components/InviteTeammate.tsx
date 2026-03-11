"use client";

import { useState } from "react";

export default function InviteTeammate() {
  const [code, setCode] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: code.toUpperCase().trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus({ type: "success", msg: "Successfully joined the team!" });
      setCode("");
    } catch (error) {
      console.error("failed to fetch Teammates", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#2a2a2a] bg-[#171716] p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-2">Join a Squad</h3>
      <p className="text-sm text-zinc-400 mb-6">
        Enter a leader <span className="text-yellow-500 font-mono">uniqueUserCode</span> to join their competition team.
      </p>

      <form onSubmit={handleJoinTeam} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="e.g. US123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-[#2a2a2a] rounded-md text-yellow-500 font-mono text-center tracking-widest focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-zinc-600"
            required
            maxLength={8}
          />
        </div>
        
        {/* Native HTML Button with Tailwind Styling */}
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-800 disabled:cursor-not-allowed text-black font-bold rounded-md transition-all active:scale-[0.98]"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </span>
          ) : "Join Team"}
        </button>
      </form>

      {/* Custom Inline Status Notification */}
      {status && (
        <div className={`mt-4 p-3 rounded-md text-sm text-center border ${
          status.type === "success" 
            ? "bg-green-500/10 border-green-500/50 text-green-400" 
            : "bg-red-500/10 border-red-500/50 text-red-400"
        }`}>
          {status.msg}
        </div>
      )}
    </div>
  );
}