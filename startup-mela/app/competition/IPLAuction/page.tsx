"use client";

import Button from "@/components/button";

export default function IplAuction(){
    return(
        <div className="w-full min-h-screen bg-black relative overflow-hidden px-6 py-20">
                              <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:22px_22px]"></div>
                              <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#014E87]/20 blur-[160px] rounded-full"></div>
                              <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-14">
                                <div className="text-center flex flex-col gap-4">
                                  
                                  <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wide">
                                    IPL Auction
                                  </h1>
                                  <p className=" text-red-300 font-mono text-xs w-full p-4 ">* No Real Money Involved .This IPL Auction is a simulated experience. No real-money betting or gambling is allowed.</p>
                                  <p className="text-[#014E87] text-lg md:text-xl font-semibold">
                                    Where strategy meets adrenaline.
                                  </p>
                        
                                  <h2 className="text-yellow-400 font-bold text-2xl md:text-3xl">
                                    Prize Pool: ₹14,000
                                  </h2>
                        
                                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                                    <Button variant="primary" text="Register for This Competition" />
                                    <Button variant="secondary" text="Form Link" />
                                  </div>
                                </div>
                                <div className="max-w-3xl mx-auto text-center text-white/70 leading-relaxed">
                                  An elimination round stands between you and the finale, surviving both to earn your spot. Then you walk into a live IPL style auction with Rs. 100 Crore in virtual capital and a pool of players to bid on across roles such as batsmen, bowlers and all rounders. You have seconds to decide a player’s value and whether you want them more than the team next to you. When the bidding closes you present your squad and defend every decision in front of a panel of judges. 
                                </div>
                                <div className="flex flex-col items-center gap-6">
                                  <h3 className="text-white text-xl font-semibold tracking-wide">
                                    Prize Breakdown
                                  </h3>
                        
                                  <div className="flex gap-6 flex-wrap justify-center">
                                    {[
                                      { title: "1st Place", amt: "₹6,000" },
                                      { title: "2nd Place", amt: "₹4,500" },
                                      { title: "3rd Place", amt: "₹3,500" },
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
                                      Duration: 1 hrs 40 min
                                    </p>
                        
                                    <div className="flex flex-col gap-4 text-white/70 text-sm">
                        
                                      <div>
                                        <p className="text-white font-medium">
                                          Round 1: Rapid Fire Combat (30 min)
                                        </p>
                                        <p>
                                          MCQ based quiz covering IPL cricket knowledge and auction fundamentals under time pressure. Top teams advance.
                                        </p>
                                      </div>
                        
                                      <div>
                                        <p className="text-white font-medium">
                                          Round 2: Grand Live Auction (70 min)
                                        </p>
                                        <p>
                                          Enter a live IPL style auction with a fixed budget of Rs. 100 Crore. Build a balanced squad by bidding on players across roles. Manage your funds, think strategically and compete in real time. Then present and justify your final team to the judges.
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
                                          "Bidding Strategy",
                                          "Team Composition",
                                          "Budget Management",
                                          "Decision Making",
                                          "Justification Quality",
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