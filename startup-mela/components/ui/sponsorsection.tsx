"use client";
import Image from "next/image";

const sponsors = [
  { name: "Sponsor 1", logo: "https://ik.imagekit.io/es6xialea/Group%20216.svg" },
  { name: "Sponsor 2", logo: "https://ik.imagekit.io/es6xialea/PW.svg" },
  { name: "Sponsor 3", logo: "https://ik.imagekit.io/es6xialea/Green%20computer.svg" },
  { name: "Sponsor 4", logo: "https://ik.imagekit.io/es6xialea/Reap%20Benefit%20Logo_For%20Light%20background%201%20(1).svg" },
  { name: "Sponsor 5", logo: "https://ik.imagekit.io/es6xialea/WhatsApp%20Image%202026-03-26%20at%2011.48.02%20PM%201.svg" },
  { name: "Sponsor 6", logo: "https://ik.imagekit.io/es6xialea/Group%20217.svg" },
  { name: "Sponsor 7", logo: "https://ik.imagekit.io/es6xialea/Rectangle%20256.jpg.jpeg" },
];

export default function SponsorSection() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden bg-black flex flex-col items-center">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#014E87]/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="text-center flex flex-col items-center gap-3 mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wide drop-shadow-lg">
            Our Partners
          </h2>
          <div className="h-[2.5px] w-28 bg-gradient-to-r from-[#014E87] via-[#2e92d9] to-[#014E87] rounded-full shadow-[0_0_15px_#014E87]" />
          <p className="text-[#35b4ff] text-lg md:text-xl font-bold tracking-[0.3em] uppercase mt-3 drop-shadow">
            Empowering Innovation
          </p>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-12 gap-x-8 items-center justify-items-center w-full">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center w-36 h-36 sm:w-40 sm:h-40 transition-transform duration-400 hover:scale-105 hover:drop-shadow-[0_4px_32px_#014e8766]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/1 to-transparent rounded-xl border border-white/10 group-hover:border-[#35b4ff]/40 group-hover:bg-[#014E87]/10 shadow-[0_3px_24px_#014e8720] transition-all"></div>
                <div className="relative w-full h-full flex items-center justify-center z-10">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain drop-shadow-lg p-5 transition-all duration-300 filter  group-hover:grayscale-0"
                  />
                </div>
                {/* Fancy Shine Effect */}
                <span className="absolute left-1/2 top-2 -translate-x-1/2 w-2/3 h-1/4 bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-full blur-[8px] opacity-40 group-hover:opacity-80 pointer-events-none"></span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <div className="px-7 py-3 text-base tracking-[0.25em] uppercase font-medium text-white/60 border border-white/15 rounded-full backdrop-blur-2xl bg-white/10 shadow-[0_1px_15px_#014E8744] transition-all hover:bg-blue-950/25 hover:border-[#35b4ff]/30">
            Support • Collaborate • Grow
          </div>
        </div>
      </div>
    </section>
  );
}