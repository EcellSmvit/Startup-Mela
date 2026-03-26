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
            eventDetails="Four competitions in strategy, consulting, investment & auctions - ₹80,000 in prizes."
          />

          <Eventcard
            eventType="Startup Exhibition"
            eventDetails="City startups on campus for two days-meet founders, explore, and discover beyond the classroom.
"
          />

          <Eventcard
            eventType="Mentor Connect"
            eventDetails="An open session connecting startups directly with investors."
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
            eventType="Startup Ecosystem"
            eventDetails="Two days of access to people, ideas, and conversations beyond campus."
          />
        </div>
      </div>
    </div>
  );
}