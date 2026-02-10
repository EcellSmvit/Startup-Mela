import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FooterSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    const section = sectionRef.current;

    // if (!el || !section) return;

    gsap.to(el, {
      x: "-50%",
      duration: 50,
      ease: "linear",
      repeat: -1,
    });

    
    const bgAnim = gsap.to(section, {
      backgroundColor: "#4E46E4",
      ease: "power3.inOut",
      duration:2,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        
        scrub: true
      }
    });

    return () => {
      bgAnim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-[#222831] m-0 p-0 flex items-center justify-center flex-col"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="overflow-hidden whitespace-nowrap flex items-center w-full justify-center h-72">
        <div
          ref={marqueeRef}
          className="flex gap-20 text-9xl font-black text-[#eeeeee] font-sans w-max">
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
              <span>Design That Matters -</span>
        </div>
      </div>
      <div className="w-[90%] h-1/2 bg-[#393E46] rounded-4xl font-sans">
        <div className="flex flex-col items-center justify-center h-full py-8">
          <div className="flex flex-col md:flex-row w-full items-center justify-between gap-8 px-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-[#eeeeee] mb-2 font-sans">Let's Connect</h2>
              <p className="text-[#bdbdbd] text-lg">Feel free to reach out for collaborations or just a friendly hello 👋</p>
            </div>
            <div className="flex gap-6">
              <a
                href="mailto:kumarbikesh803@gmail.com"
                className="text-[#92F090] hover:text-[#eeeeee] transition-colors duration-200 text-2xl"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i> Email
              </a>
              <a
                href="https://www.linkedin.com/in/bikesh-kumar07/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#479CEA] hover:text-[#eeeeee] transition-colors duration-200 text-2xl"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a
                href="https://github.com/Bikesh-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#eeeeee] hover:text-[#4F46E5] transition-colors duration-200 text-2xl"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i> GitHub
              </a>
            </div>
          </div>
          <div className="border-t border-[#4F46E5] w-full my-8"></div>
          <div className="text-center text-[#bdbdbd] text-sm">
            &copy; {new Date().getFullYear()} BIKESH KUMAR. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
