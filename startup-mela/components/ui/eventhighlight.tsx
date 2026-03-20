import Eventcard from "../eventCard";

export default function EventHighlights() {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      <div className="relative z-10 flex justify-center pt-10">
        <span className="font-black text-4xl uppercase bg-[#014E87] px-4 py-2 text-white rounded-md shadow-lg">
          Event Highlights
        </span>
      </div>
      <div className="relative z-10 w-full px-6 py-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          
          <Eventcard
            eventType="Competition"
            eventName="Live Pitch Competition"
            eventDetails="Pitch to a jury of real investors across structured rounds."
            buttonText="Register"
            eventCat="Startup Event"
          />

          <Eventcard
            eventType="Exhibition"
            eventName="Startup Exhibition Stalls"
            eventDetails="Showcase your product to students, mentors, and VCs all day."
            buttonText="Register"
            eventCat="Startup Event"
          />

          <Eventcard
            eventType="VC Meet"
            eventName="Invite-Only VC Meet"
            eventDetails="A closed-door session connecting startups directly with investors."
            buttonText="Register"
            eventCat="Startup Event"
          />

          <Eventcard
            eventType="Speaker Sessions"
            eventName="Speaker Sessions"
            eventDetails="Two parallel sessions per day on fundraising, product, and growth."
            buttonText="Register"
            eventCat="Startup Event"
          />

        </div>
      </div>
    </div>
  );
}