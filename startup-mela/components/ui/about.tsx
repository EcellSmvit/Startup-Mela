"use client";
export default function AboutSection() {
  return (
    <div className="w-full bg-black relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:26px_26px]"></div>
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#014E87]/20 blur-[140px] rounded-full"></div>
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-20">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wide">
            About
          </h1>
          <p className="text-white/50 text-sm md:text-base">
            Building a culture of innovation and execution
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <span className="text-[#014E87] text-xs tracking-[0.3em] uppercase">
              E-Cell SMVIT
            </span>
            <h2 className="text-white text-2xl md:text-3xl font-semibold leading-snug">
              Creating a space where ideas evolve into real ventures
            </h2>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              We are the Entrepreneurship Cell of Sir M. Visvesvaraya Institute of Technology, Bengaluru — building a space where students can explore, experiment and create.
            </p>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Since 2021, we have been shaping a culture of entrepreneurship through competitions, industry engagement and hands-on opportunities that help ideas grow beyond classrooms.
            </p>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Our focus is to equip students with the mindset, network and real-world exposure needed to build ventures that matter.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[#014E87] text-xs tracking-[0.3em] uppercase">
              Startup Mela
            </span>
            <h2 className="text-white text-2xl md:text-3xl font-semibold leading-snug">
              Two days built for builders, founders and future leaders
            </h2>

            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Startup Mela is a two-day entrepreneurship event organised by E-Cell SMVIT.
            </p>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              It brings together student builders, investors and industry mentors for competitions, startup exhibitions, speaker sessions and panel discussions.
            </p>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              Whether you are competing, showcasing or connecting — Startup Mela is built for one purpose:
              <span className="text-white font-medium"> turning ambition into action.</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="px-6 py-3 text-sm tracking-[0.3em] uppercase text-white/40 border border-white/10 rounded-full backdrop-blur-xl bg-white/5">
            Innovate • Build • Scale
          </div>
        </div>

      </div>
    </div>
  );
}