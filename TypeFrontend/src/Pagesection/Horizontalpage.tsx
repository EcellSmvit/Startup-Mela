import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Horizontalcards from "../Components/Horizontalcards";
// import Imagecard from "../Components/Imagecard";

gsap.registerPlugin(ScrollTrigger);

function HorizontalPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const ctx = gsap.context(() => {
      const totalScroll = text.scrollWidth - window.innerWidth;

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
        // background color animation
        .fromTo(
          section,
          { backgroundColor: "#222831" },
          { backgroundColor: "#4F46E5", duration: 5 }
        )
        .to(section, { duration: 4 })
        .to(section, {
          backgroundColor: "#222831",
          ease:"power3.out",
          duration: 1,
        })
        .fromTo(
          text,
          { x: totalScroll },
          { x: -totalScroll, ease: "none", duration: 4 },
          0
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-[#222831] "
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      <div
        ref={textRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap font-bold text-[#eeeeee] text-[18vw] mr-9"
      >
        CONNECT WITH ME
        <Horizontalcards
          variant="Horizcard1"
          texth1="Frontend Developer"
          textp="Engage in an intensive 2-day workshop designed to empower students with practical entrepreneurial skills, networking opportunities, and hands-on activities. Participants will collaborate on startup ideas, attend brainstorming sessions, and receive mentorship from experienced founders and industry experts."
        />
        <Horizontalcards
          variant="Horizcard2"
          texth1="Backend Developer"
          textp="Showcase your innovative ideas at our flagship startup competition! Pitch your concepts before a panel of judges, compete for exciting prizes, and gain invaluable feedback. The competition fosters creativity, teamwork, and a spirit of friendly rivalry among aspiring entrepreneurs."
        />
        <Horizontalcards
          variant="Horizcard3"
          texth1="3D and animation"
          textp="Be inspired by renowned entrepreneurs, venture capitalists, and business leaders as they share their journeys, insights, and lessons learned. Get a chance to interact, ask questions, and gain unique perspectives on building a successful startup in today’s world."
        />
        <Horizontalcards
          variant="Horizcard4"
          texth1="DSA With JAVA"
          textp="Experience a vibrant blend of music, dance, and traditions with our cultural program. Unwind after a day of innovation and networking while celebrating the spirit of entrepreneurship and community with performances, art displays, and interactive activities."
        />
        {/* <Imagecard/> */}
      </div>
    </section>
  );
}

export default HorizontalPage;
