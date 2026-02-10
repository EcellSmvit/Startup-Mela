import { useRef, useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseProps {
  imgSrc: string;
  alt: string;
  sectionRef: RefObject<HTMLDivElement | null>;
  imgRef: RefObject<HTMLImageElement | null>;
  title: string;
  btnTitle: string;
  titleRef: RefObject<HTMLHeadingElement | null>;
  btnRef: RefObject<HTMLButtonElement | null>;
}

const ShowcaseSection: React.FC<ShowcaseProps> = ({
  imgSrc,
  alt,
  sectionRef,
  imgRef,
  title,
  btnTitle,
  titleRef,
  btnRef,
}) => (
  <div
    ref={sectionRef}
    className="w-screen h-screen flex items-center justify-center relative"
  >
    <img
      ref={imgRef}
      className="rounded-md w-1/2 h-1/2 brightness-40"
      src={imgSrc}
      alt={alt}
    />
    <div className="w-1/2 h-1/2 absolute  rounded-md flex flex-col items-center justify-center gap-8">
      <h1
        ref={titleRef}
        className="font-sans text-[#eeeeee] font-bold text-7xl drop-shadow-lg tracking-wide  px-6 py-2 opacity-0"
        style={{ letterSpacing: "0.06em", transition: "opacity 0.4s" }}
      >
        {title}
      </h1>
      <button
        ref={btnRef}
        className="font-sans p-3 px-8 font-bold rounded-3xl border-2 border-[#eeeeee] text-[#eeeeee] bg-transparent transition-colors duration-200
                   hover:bg-[#92F090] hover:text-[#222831] shadow-md hover:shadow-lg opacity-0"
        style={{ transition: "opacity 0.4s" }}
      >
        {btnTitle}
      </button>
    </div>
  </div>
);

function useGsapSection(
  sectionRef: RefObject<HTMLDivElement | null>, 
  imgRef: RefObject<HTMLImageElement | null>,
  titleRef: RefObject<HTMLHeadingElement | null>,
  btnRef: RefObject<HTMLButtonElement | null>
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const anim = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom bottom",
          scrub: 5,
          // markers: true,
        },
      });

      anim
        .to(imgRef.current, { scale: 1.5, duration: 1, ease: "power3.out" }, 0)
        .to(
          titleRef.current,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          0 // Align title fade-in with image scale start
        )
        .to(
          btnRef.current,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          0 // Button fades in at the same time as title
        );
    });

    return () => ctx.revert();
  }, [sectionRef, imgRef, titleRef, btnRef]);
}

function EventSection() {
  const showcases = [
    {
      imgSrc: "https://ik.imagekit.io/jwt52yyie/sundown.png",
      alt: "showcase",
      title: "Sundown",
      btnTitle: "Click Me",
    },
    {
      imgSrc: "https://ik.imagekit.io/jwt52yyie/Brave.png",
      alt: "showcase",
      title: "Brave",
      btnTitle: "Explore",
    },
    {
      imgSrc: "https://ik.imagekit.io/jwt52yyie/wethinkOne.png?updatedAt=1770652945899",
      alt: "showcase",
      title: "WeThinkOne",
      btnTitle: "Explore",
    },
  ];

  const sectionRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];
  const imgRefs = [
    useRef<HTMLImageElement | null>(null),
    useRef<HTMLImageElement | null>(null),
    useRef<HTMLImageElement | null>(null),
  ];
  const titleRefs = [
    useRef<HTMLHeadingElement | null>(null),
    useRef<HTMLHeadingElement | null>(null),
    useRef<HTMLHeadingElement | null>(null),
  ];
  const btnRefs = [
    useRef<HTMLButtonElement | null>(null),
    useRef<HTMLButtonElement | null>(null),
    useRef<HTMLButtonElement | null>(null),
  ];

  showcases.forEach((_, i) => useGsapSection(sectionRefs[i], imgRefs[i], titleRefs[i], btnRefs[i]));

  return (
    <div
      className="relative w-screen h-[320vh] overflow-hidden bg-[#222831] m-0 p-0"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="font-black text-[#eeeeee] font-sans flex items-center justify-center flex-col">
        <p className="text-3xl">Project</p>
        <p className="text-9xl">ShowCase</p>
      </div>

      {showcases.map((sc, i) => (
        <ShowcaseSection
          key={i}
          imgSrc={sc.imgSrc}
          alt={sc.alt}
          sectionRef={sectionRefs[i]}
          imgRef={imgRefs[i]}
          title={sc.title}
          btnTitle={sc.btnTitle}
          titleRef={titleRefs[i]}
          btnRef={btnRefs[i]}
        />
      ))}
    </div>
  );
}

export default EventSection;
