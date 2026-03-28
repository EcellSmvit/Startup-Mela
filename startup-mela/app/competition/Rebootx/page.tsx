"use client";

import Button from "@/components/button";

export default function Rebootx(){
    return(

            <div className="w-full min-h-screen bg-black relative overflow-hidden px-6 py-20">
              <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:22px_22px]"></div>
              <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#014E87]/20 blur-[160px] rounded-full"></div>
              <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-14">
                <div className="text-center flex flex-col gap-4">
                  <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wide">
                    REBOOTX
                  </h1>
        
                  <p className="text-[#014E87] text-lg md:text-xl font-semibold">
                    Reviving Failures Through Innovation.
                  </p>
        
                  <h2 className="text-yellow-400 font-bold text-2xl md:text-3xl">
                    Prize Pool: ₹22,000
                  </h2>
        
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <Button variant="primary" text="Register for This Competition"  link="/dashboard"/>
                    <Button variant="secondary" text="Form Link" />
                  </div>
                </div>
                <div className="max-w-3xl mx-auto text-center text-white/70 leading-relaxed">
                  You receive a case study of a real business that failed and thirty minutes to go through it. Your job is to find out exactly where things went wrong and why not on the surface, but the actual root cause. Then you build a revival plan around it, one that uses technology in a way that actually makes sense. Every team pitches their solution to the judges, five minutes to present, two minutes of questions. The judges are not just looking at your idea. They want to know if your solution could work in the real world.
                </div>
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
                      Duration: 2.5 Hours
                    </p>
        
                    <div className="flex flex-col gap-4 text-white/70 text-sm">
        
                      <div>
                        <p className="text-white font-medium">
                          Round 1: Case Analysis (30 min)
                        </p>
                        <p>
                          Receive a failed business case. Identify root causes using SWOT analysis, the 5 Whys, and Customer Insight Mapping.
                        </p>
                      </div>
        
                      <div>
                        <p className="text-white font-medium">
                          Round 2: Revival Pitch (110 min)
                        </p>
                        <p>
                          A 5-minute consulting pitch to the judges, including a technology-driven solution. Followed by a 2-minute Q&A.
                        </p>
                      </div>
        
                    </div>
                  </div>
                  <div className="relative">
                    <div className="rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex flex-col gap-4 h-full">
                      <h3 className="text-white text-xl font-semibold">
                        Judged On
                      </h3>
        
                      <div className="flex flex-wrap gap-3">
                        {[
                          "Problem Understanding",
                          "Root Cause Analysis",
                          "Innovation",
                          "Tech Integration",
                          "Communication",
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