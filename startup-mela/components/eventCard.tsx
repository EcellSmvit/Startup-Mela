interface CardProps {
  eventType: string;
  eventName: string;
  eventDetails: string;
  buttonText: string;
  eventCat: string;
}

export default function Eventcard({
  eventType,
  eventName,
  eventDetails,
  buttonText,
  eventCat,
}: CardProps) {
  return (

    
    <div className="group relative w-full max-w-sm">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="relative h-full rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 group-hover:scale-[1.04] group-hover:border-[#014E87]/40">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#014E87] to-transparent opacity-70"></div>
        <span className="text-xs font-semibold text-[#014E87] bg-[#014E87]/10 px-3 py-1 rounded-full w-fit border border-[#014E87]/20 tracking-wide">
          {eventType}
        </span>
        <h2 className="mt-4 text-xl font-bold text-white leading-snug transition group-hover:text-[#014E87]">
          {eventName}
        </h2>
        <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-3">
          {eventDetails}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <button className="relative overflow-hidden text-sm font-medium text-white px-5 py-2 rounded-lg bg-[#014E87] transition-all duration-300 hover:bg-[#0163aa] shadow-md hover:shadow-[#014E87]/40">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></span>
            
            <span className="relative z-10">{buttonText}</span>
          </button>
          <span className="text-xs text-gray-500 group-hover:text-[#014E87] transition">
            {eventCat}
          </span>
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
    </div>
  );
}