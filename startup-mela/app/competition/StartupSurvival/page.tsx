"use client";

import Button from "@/components/button";

export default function StartupSurvival() {
  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden px-6 py-20">

      {/* 🔲 Grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:22px_22px]"></div>

      {/* 🔥 Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#014E87]/20 blur-[160px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-14">

        {/* 🔝 HEADER */}
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wide">
            Startup Survival Game
          </h1>

          <p className="text-[#014E87] text-lg md:text-xl font-semibold">
            Run a startup. Face a crisis. Survive.
          </p>

          <h2 className="text-yellow-400 font-bold text-2xl md:text-3xl">
            Prize Pool: ₹22,000
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button variant="primary" text="Register for This Competition" link="/dashboard" />
            <Button variant="secondary" text="Form Link" />
          </div>
        </div>

        {/* 📄 DESCRIPTION */}
        <div className="max-w-3xl mx-auto text-center text-white/70 leading-relaxed">
          A startup simulation where your team becomes the executive board of a company and makes real decisions under uncertainty. Each member takes on roles such as CEO, CFO, CMO and CTO - building strategy and responding to sudden crises while testing collaboration, critical thinking and decision-making under pressure.
        </div>

        {/* 💰 PRIZE BREAKDOWN */}
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-white text-xl font-semibold tracking-wide">
            Prize Breakdown
          </h3>

          <div className="flex gap-6 flex-wrap justify-center">
            {[
              { title: "1st Place", amt: "₹10,000" },
              { title: "2nd Place", amt: "₹7,000" },
              { title: "3rd Place", amt: "₹5,000" },
            ].map((p, i) => (
              <div
                key={i}
                className="px-6 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center min-w-[140px]"
              >
                <p className="text-white/60 text-sm">{p.title}</p>
                <p className="text-white font-semibold text-lg">{p.amt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 FORMAT */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="flex flex-col gap-4">

            <h3 className="text-white text-xl font-semibold">
              Format
            </h3>

            <p className="text-white/60 text-sm">
              Duration: 2 Hours • Max 15 Teams • Top 5 to Finals
            </p>

            <div className="flex flex-col gap-4 text-white/70 text-sm">

              <div>
                <p className="text-white font-medium">
                  Round 1: Boardroom Strategy Sprint (40 min)
                </p>
                <p>
                  Teams build a complete startup strategy and adapt to a surprise crisis in real time. Top 5 advance.
                </p>
              </div>

              <div>
                <p className="text-white font-medium">
                  Round 2: Survival Boardroom Arena (40 min)
                </p>
                <p>
                  Finalists respond to a new crisis and present strategies followed by rapid-fire questioning.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">

            {/* Glass Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex flex-col gap-4 h-full">

              <h3 className="text-white text-xl font-semibold">
                Judged On
              </h3>

              <div className="flex flex-wrap gap-3">
                {[
                  "Problem Solving",
                  "Strategic Thinking",
                  "Creativity",
                  "Adaptability",
                  "Execution",
                ].map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs border border-white/20 text-white/70 rounded-full bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}