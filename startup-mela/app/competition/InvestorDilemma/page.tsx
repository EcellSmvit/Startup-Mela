"use client";

import Button from "@/components/button";

export default function InvestorDilemma(){
    return(
        <div className="w-full min-h-screen bg-black relative overflow-hidden px-6 py-20">
                      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:22px_22px]"></div>
                      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#014E87]/20 blur-[160px] rounded-full"></div>
                      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-14">
                        <div className="text-center flex flex-col gap-4">
                          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wide">
                            The Investor Dilemma
                          </h1>
                
                          <p className="text-[#014E87] text-lg md:text-xl font-semibold">
                            Not every shiny startup deserves your money.
                          </p>
                
                          <h2 className="text-yellow-400 font-bold text-2xl md:text-3xl">
                            Prize Pool: ₹22,000
                          </h2>
                
                          <div className="flex flex-wrap justify-center gap-4 mt-4">
                            <Button variant="primary" text="Register for This Competition" />
                            <Button variant="secondary" text="Form Link" />
                          </div>
                        </div>
                        <div className="max-w-3xl mx-auto text-center text-white/70 leading-relaxed">
                          You are handed four startup dossiers covering financials business models risk profiles and growth potential. Your job is to allocate ₹100 Crore across all four and every rupee has to be accounted for. Too much in one place means you are overexposed. Too little means you have left money on the table. Once your portfolio is built you present it to the judges and then the cross questioning begins. Every allocation you made, every risk you took, you explain it, defend it and own it.
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
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="flex flex-col gap-4">
                
                            <h3 className="text-white text-xl font-semibold">
                              Format
                            </h3>
                
                            <p className="text-white/60 text-sm">
                              Duration: 2 hrs 45 min
                            </p>
                
                            <div className="flex flex-col gap-4 text-white/70 text-sm">
                
                              <div>
                                <p className="text-white font-medium">
                                  Round 1: Portfolio Construction (75 min)
                                </p>
                                <p>
                                  Receive four startup dossiers. Allocate Rs. 100 Crore across all four, minimum 10% and maximum 50% per startup. Submit an allocation table and a 1-page investment thesis. Top 5 advance.
                                </p>
                              </div>
                
                              <div>
                                <p className="text-white font-medium">
                                  Round 2: Investment Defense (85 min)
                                </p>
                                <p>
                                  5-minute portfolio presentation followed by 7 minutes of direct cross-questioning on every decision.
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
                                  "Capital Allocation Strategy",
                                  "Risk Diversification",
                                  "Investment Logic",
                                  "Defense Under Pressure",
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
    )
}