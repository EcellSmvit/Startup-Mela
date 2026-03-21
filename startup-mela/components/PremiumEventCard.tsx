"use client";
import { useRouter } from "next/navigation";
interface EventCardProps {
  title: string;
  description: string;
  category: string;
  type: string;
  phase: string;
  image: string;
  link: string;
}

export default function PremiumEventCard({
  title,
  description,
  category,
  type,
  phase,
  image,
  link,
}: EventCardProps) {
  const router = useRouter();
  return (
    <div className="relative w-[350px] h-[500px] rounded-2xl overflow-hidden group">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-125 transition duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
      <div className="absolute inset-0 rounded-2xl border border-white/10 " />
      <div className="absolute top-5 left-1/2 -translate-x-1/2">
        <span className="px-4 py-1 text-xs tracking-widest border border-white/30 text-white/80 backdrop-blur-md">
          {category.toUpperCase()}
        </span>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90">
        <p className="text-xs tracking-[0.4em] text-white/40">
          {type.toUpperCase()}
        </p>
      </div>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-0 p-6 text-white">
        
        <h2 className="text-2xl font-semibold tracking-wide">
          {title}
        </h2>

        <p className="text-sm text-white/60 mt-2 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between mt-6">
          
          <div>
            <p className="text-xs text-white/40">PRIZE POOL</p>
            <p className="text-lg font-semibold text-orange-300">
              {phase}
            </p>
          </div>

          <button onClick={() => router.push(link)} className="px-5 py-2 border border-white/30 text-sm tracking-wide hover:bg-white hover:text-black transition">
            EXPLORE NOW
          </button>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)]" />
    </div>
  );
}