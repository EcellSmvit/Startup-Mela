import { useEffect, useRef } from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import About from '../Components/About'

gsap.registerPlugin(ScrollTrigger)

function NextSection() {
  const textRefs = useRef<Array<HTMLSpanElement | null>>([])
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500",
          // pin: true,
          scrub: 0.1,
        }
      })

      tl.fromTo(
        textRefs.current,
        { opacity: 0.2},
        { opacity: 1, y: 0, stagger: 1, ease: "power2.out" }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const words = [
    "Designing",
    "Ideas ",
    "into ",
    "Reality"
  ]
  // #222831
  return (
    
    <div ref={sectionRef} className='bg-[#222831] w-screen h-[200vh] flex flex-col items-end justify-end'
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.35) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}>
      <h1 className='font-sans text-[8rem] font-black text-[#eeeeee] text-center p-4 '>
        {words.map((word, idx) => (
          <span
            key={idx}
            ref={el => { textRefs.current[idx] = el }}
            style={{ display: 'inline-block',marginRight:"0.8rem"}}
          >
            {word}
          </span>
        ))}
      </h1>
      <About/>
    </div>
  )
}

export default NextSection