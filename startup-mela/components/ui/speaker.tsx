export default function SpeakerComingSoon() {
  return (
    <section className="relative w-full py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-black to-black"></div>

      {/* 🔲 Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:28px_28px]"></div>


      <div className="absolute w-[400px] h-[400px] bg-[#014E87]/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      {/* 💎 Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Title */}
        <h2 className="text-4xl md:text-4xl font-bold text-white uppercase">
          Speaker Sessions
        </h2>

        {/* Accent Line */}
        <div className="mt-3 h-[2px] w-20 bg-[#014E87] rounded-full shadow-[0_0_12px_#014E87]"></div>

        {/* Coming Soon */}
        <p className="mt-6 text-lg md:text-xl text-[#014E87] font-semibold">
          Coming Soon
        </p>

        {/* Subtext */}
        <p className="mt-2 text-gray-400 text-sm md:text-base max-w-md">
          Stay tuned for exciting speakers and insightful sessions.
        </p>

      </div>
    </section>
  );
}