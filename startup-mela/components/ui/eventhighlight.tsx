import Eventcard from "../eventCard";

export default function EventHighlights() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-row flex-wrap items-center justify-center p-6 gap-8">
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
  );
}