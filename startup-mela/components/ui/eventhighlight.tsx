import Eventcard from "../eventCard";

export default function EventHighlights() {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(1, 78, 135, 0.4) 0.5px, transparent 0.5px),
            linear-gradient(to bottom, rgba(1, 78, 135, 0.4) 0.5px, transparent 0.5px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      <div className="relative z-10 flex justify-center pt-10">
        <span className="font-black text-4xl uppercase bg-[#014E87] px-4 py-2 text-white">
          Event Highlights
        </span>
      </div>
      <div className="relative z-10 w-full px-6 py-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          
          <Eventcard
            eventType="Competitions"
            eventDetails="Four business competitions across strategy, consulting, investment and live auctions. Rs. 80,000 in prize money across all events."
          />

          <Eventcard
            eventType="Startup Exhibition"
            eventDetails="Startups from across the city exhibiting on campus across both days. Meet founders, explore products and find opportunities you would not find in a classroom"
          />

          <Eventcard
            eventType="Investor and Mentor"
            eventDetails="A closed-door session connecting startups directly with investors."
          />

          <Eventcard
            eventType="Speaker Sessions"
            eventDetails="Sessions by founders and industry leaders covering what actually matters when building a startup."
          />
          <Eventcard
            eventType="Panel Discussions"
            eventDetails="Open-format panels with mentors and founders, followed by live audience Q&A."
          />
          <Eventcard
            eventType="Startup Ecosystem Access"
            eventDetails="Two days of direct access to the people, ideas and conversations that do not happen inside a college campus."
          />
        </div>
      </div>
    </div>
  );
}