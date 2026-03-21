"use client";

export default function SchedulePage() {
  const day1 = [
    { time: "10:00 – 11:30 AM", title: "Opening Ceremony" },
    { time: "11:30 – 12:30 PM", title: "Panel Discussion" },
    { time: "12:30 – 12:45 PM", title: "Break" },
    { time: "12:45 – 3:00 PM", title: "Startup Survival Game + REBOOTX" },
    { time: "3:00 – 3:30 PM", title: "Lunch" },
    { time: "3:30 – 4:30 PM", title: "Speaker Sessions" },
    { time: "4:30 – 5:30 PM", title: "Prize Distribution" },
  ];

  const day2 = [
    { time: "10:00 AM – 12:00 PM", title: "Panel Discussion" },
    { time: "12:00 – 1:00 PM", title: "Break" },
    { time: "1:00 – 2:00 PM", title: "Speaker Sessions" },
    { time: "2:00 – 2:15 PM", title: "Break" },
    { time: "2:15 – 4:45 PM", title: "Investor's Dilemma + IPL Auction: Business War Room" },
    { time: "4:15 – 6:45 PM", title: "Results & Closing Ceremony" },
  ];

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden px-6 py-20">

      {/* 🔲 Grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:22px_22px]"></div>

      {/* 🔥 Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#014E87]/20 blur-[160px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-16">

        {/* 🔝 HEADER */}
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase">
            Event Schedule
          </h1>

          <p className="text-white/60">
            Two days. Every slot planned.
          </p>

          <p className="text-[#014E87] text-sm tracking-wide">
            Dates: TBD
          </p>
        </div>

        {/* 📅 DAYS */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* DAY 1 */}
          <div className="relative">

            {/* Glass Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-6">

              <h2 className="text-white text-xl font-semibold">
                Day 1 — [Date]
              </h2>

              <div className="flex flex-col gap-4">
                {day1.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">

                    {/* Timeline Dot */}
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-[#014E87] rounded-full mt-2"></div>
                      {i !== day1.length - 1 && (
                        <div className="w-[1px] h-full bg-white/10"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <p className="text-xs text-white/40">
                        {item.time}
                      </p>
                      <p className="text-white/80 group-hover:text-white transition">
                        {item.title}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DAY 2 */}
          <div className="relative">

            {/* Glass Card */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-6">

              <h2 className="text-white text-xl font-semibold">
                Day 2 — [Date]
              </h2>

              <div className="flex flex-col gap-4">
                {day2.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">

                    {/* Timeline Dot */}
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 bg-[#014E87] rounded-full mt-2"></div>
                      {i !== day2.length - 1 && (
                        <div className="w-[1px] h-full bg-white/10"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <p className="text-xs text-white/40">
                        {item.time}
                      </p>
                      <p className="text-white/80 group-hover:text-white transition">
                        {item.title}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}