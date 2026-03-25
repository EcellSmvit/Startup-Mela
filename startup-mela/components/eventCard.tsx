"use client";

interface CardProps {
  eventType: string;
  eventDetails: string;
}

export default function Eventcard({
  eventType,
  eventDetails,
}: CardProps) {
  return (
    <div className="group relative w-full max-w-sm h-[420px] rounded-2xl overflow-hidden z-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-[#014E87]/20" />
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#014E87]/40 via-transparent to-[#014E87]/40 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative h-full rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:scale-[1.04] group-hover:border-[#014E87]">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:18px_18px]"></div>
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1 text-[12px] tracking-widest border border-white/30 text-white/80 backdrop-blur-md">
            {eventType.toUpperCase()}
          </span>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90">
          <p className="text-[10px] tracking-[0.4em] text-white/30">
            STARTUPMELA
          </p>
        </div>

        <div className="flex flex-col gap-3 relative z-10 mt-auto">

          <h2 className="text-2xl font-semibold text-white tracking-wide uppercase">
            {eventType}
          </h2>

          <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
            {eventDetails}
          </p>

        </div>
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#014E87] to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#014E87]/70 to-transparent opacity-60"></div>
      </div>
    </div>
  );
}