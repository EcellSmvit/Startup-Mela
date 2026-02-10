import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Horizontalcards from "../Components/Horizontalcards";
import Imagecard from "../Components/ImageCard";

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
      className="relative w-screen h-screen overflow-hidden bg-[#222831]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
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
          textp="Frontend developer passionate about building modern, responsive, and high-performance web applications using React.js, Next.js, TypeScript, Tailwind CSS, and GSAP. I enjoy turning innovative ideas into smooth, user-focused digital experiences while continuously learning new technologies."
        />
        <Horizontalcards
          variant="Horizcard2"
          texth1="Backend Developer"
          textp="Backend developer focused on building secure, scalable, and efficient server-side applications using Node.js, Express.js, MongoDB, and REST APIs. I enjoy designing robust architectures, handling authentication, and powering seamless digital experiences behind the scenes."
        />
        <Horizontalcards
          variant="Horizcard3"
          texth1="3D and animation"
          textp="Creative developer focused on immersive 3D visuals and smooth web animations using Three.js, GSAP, and modern web technologies. I enjoy crafting interactive, visually engaging experiences that bring ideas and digital products to life."
        />
        <Horizontalcards
          variant="Horizcard4"
          texth1="DSA With JAVA"
          textp="Strong foundation in Data Structures and Algorithms using Java, focused on problem-solving, optimization, and writing efficient, scalable code. I enjoy tackling complex challenges and continuously improving logical thinking for real-world software development."
        />
        <Imagecard variant="Img1" url="https://ik.imagekit.io/jwt52yyie/html.png"/>
        <Imagecard variant="Img2" url="https://ik.imagekit.io/jwt52yyie/css.png"/>
        <Imagecard variant="Img3" url="https://ik.imagekit.io/jwt52yyie/javascript.png"/>
        <Imagecard variant="Img4" url="https://ik.imagekit.io/jwt52yyie/nodejs.png"/>
        <Imagecard variant="Img5" url="https://ik.imagekit.io/jwt52yyie/git.png"/>
        <Imagecard variant="Img6" url="https://ik.imagekit.io/jwt52yyie/react.png"/>
        <Imagecard variant="Img7" url="https://ik.imagekit.io/jwt52yyie/mongo-db.png"/>
        <Imagecard variant="Img8" url="https://ik.imagekit.io/jwt52yyie/typescript.png"/>
        <Imagecard variant="Img9" url="https://ik.imagekit.io/jwt52yyie/java.png"/>
      </div>
    </section>
  );
}

export default HorizontalPage;
