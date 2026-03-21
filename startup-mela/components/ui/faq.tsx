"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Can I participate in more than one competition?",
    a: "Yes, a team can register for one competition per day. Within two days, you can participate in two different competitions.",
  },
  {
    q: "Do I need a startup to attend?",
    a: "No. The competitions are open to anyone. You do not need a startup to register or participate.",
  },
  {
    q: "What happens if a team member drops out before the event?",
    a: "You can still participate as long as your team has at least 3 members. Contact us if you need to make changes after registration.",
  },
  {
    q: "Do all participants get certificates?",
    a: "Yes. All registered participants receive E-certificates of participation.",
  },
  {
    q: "How many members can be in a team?",
    a: "Each team must have a minimum of 3 and a maximum of 4 members. Solo registrations are not allowed.",
  },
  {
    q: "What is the entry fee?",
    a: "₹750 for one-day pass. ₹1000 for two-day pass.",
  },
  {
    q: "Where is the event?",
    a: "Startup Mela is a fully offline event held at Sir M. Visvesvaraya Institute of Technology.",
  },
  {
    q: "What do winners get?",
    a: "Each competition has its own prize pool. Visit individual competition pages for exact prize details.",
  },
  {
    q: "Can students from other colleges participate?",
    a: "Yes. Startup Mela is open to students from all colleges, not just SMVIT.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden px-6 py-20">

      {/* 🔲 Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:22px_22px]"></div>

      {/* 🔥 Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#014E87]/20 blur-[140px] rounded-full"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-10">

        {/* 🔝 Heading */}
        <div className="text-center flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase">
            FAQs
          </h1>
          <p className="text-white/60">
            Everything you need to know before participating
          </p>
        </div>

        {/* ❓ FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className="group cursor-pointer rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 transition-all duration-300 hover:border-[#014E87]/40"
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium text-sm md:text-base">
                  {faq.q}
                </h3>

                <span className="text-[#014E87] text-xl">
                  {active === i ? "−" : "+"}
                </span>
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  active === i ? "max-h-40 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-white/60 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}