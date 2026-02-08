import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const imageUrls = [
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%204.57.31%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%204.56.36%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%204.48.00%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%204.52.35%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%205.00.29%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%205.02.57%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%205.05.09%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%205.06.52%20AM.jpeg",
  "https://ik.imagekit.io/jwt52yyie/WhatsApp%20Image%202026-02-08%20at%205.10.24%20AM.jpeg"
];

function About() {
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const split = SplitText.create(textRef.current, {
      type: "words, chars",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          duration: 0.5,
          x: 100,
          autoAlpha: 0,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      },
    });
    return () => {
      split.revert();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      const yVal = 300 + i * 10;
      gsap.fromTo(
        img,
        { y: yVal },
        {
          y: -yVal,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.2,
          }
        }
      );
    });
  }, []);

  return (
    <div ref={sectionRef} className="w-screen flex items-center justify-center p-8">
      <div className="w-1/2 p-4 flex items-center justify-end flex-col gap-8">
        <h1 className="font-sans text-[#222831] font-bold text-5xl bg-[#FFB0C2] p-2 ">
          ABOUT
        </h1>
        <p
          className="font-sans text-white text-2xl text-justify font-medium"
          ref={textRef}
        >
          Startup Mela is the flagship entrepreneurial event of the E-Cell, Sir M. Visvesvaraya Institute of Technology (SMVIT), designed to inspire innovation, connect young founders with mentors and investors, and provide a platform to showcase ideas and startups.It brings together students, entrepreneurs, and industry experts through pitches, workshops, speaker sessions, and networking creating a launchpad for future innovators and ventures.
        </p>
      </div>
      <div className="w-1/2 h-84 overflow-hidden flex items-center justify-center gap-2">
        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <img
            src={imageUrls[0]}
            alt=""
            ref={el => { imageRefs.current[0] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
          <img
            src={imageUrls[1]}
            alt=""
            ref={el => { imageRefs.current[1] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
          <img
            src={imageUrls[2]}
            alt=""
            ref={el => { imageRefs.current[2] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <img
            src={imageUrls[3]}
            alt=""
            ref={el => { imageRefs.current[3] = el; }}
            className="rounded-lg shadow-lg object-fill"
          />
          <img
            src={imageUrls[4]}
            alt=""
            ref={el => { imageRefs.current[4] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
          <img
            src={imageUrls[5]}
            alt=""
            ref={el => { imageRefs.current[5] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <img
            src={imageUrls[6]}
            alt=""
            ref={el => { imageRefs.current[6] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
          <img
            src={imageUrls[7]}
            alt=""
            ref={el => { imageRefs.current[7] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
          <img
            src={imageUrls[8]}
            alt=""
            ref={el => { imageRefs.current[8] = el; }}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default About;