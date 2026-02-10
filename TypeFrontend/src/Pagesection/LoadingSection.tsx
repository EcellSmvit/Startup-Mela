import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function LoadingSection() {
  const langRef = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        langRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -900,
          duration: 0.6,
          ease: "power3.in",
          stagger: 0.1, // smooth sequential animation
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex items-center justify-center text-2xl text-white">
      <div className="absolute w-screen h-screen flex z-30 top-0">
        {[0, 1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            ref={el => { langRef.current[i] = el; }}
            className="w-1/5 h-screen bg-[#F49F0B]"
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingSection;
