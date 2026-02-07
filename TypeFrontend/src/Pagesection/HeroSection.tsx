import ColorfulCard from '../Components/ColorfulCard'
import Navbar from '../Components/Navbar'
import VideoCard from '../Components/VideoCard'
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sidebar from '../Components/Sidebar';
gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
    const textRef = useRef(null);
    const rightRef = useRef(null)
    const sectionRef = useRef(null);

    useEffect(()=>{
        const tl = gsap.timeline({
          scrollTrigger:{
            trigger:sectionRef.current,
            start: "top top", 
            end: "+=1200", 
            // pin:true,
            scrub:1,
            pinType: "fixed",
            // markers: true,
          }
        });
        tl.to(textRef.current, { x: -100, duration: 1, ease: "power3.out" })
        .to(rightRef.current, { x: 100, ease: "power3.out" }, "<")
        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
      },[])
    
 

  return (
    <div ref={sectionRef} className='bg-[#222831] w-screen h-screen flex items-center justify-center flex-col relative'
    style={{
      backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.35) 1px, transparent 0)",
      backgroundSize: "40px 40px",
    }}>
     
         <Navbar/>
        <Sidebar/>
        <div className='flex items-center justify-center flex-col'>
          <h1 ref={textRef} className='text-[11rem] text-[#EEEEEE] font-bold '>BIK<span className='z-20 relative leading-none'>E</span>SH</h1>
          <h1 ref={rightRef} className='text-[11rem] text-[#EEEEEE] font-bold'>KU<span className='z-20 relative'>M</span>AR</h1>
        </div>
        <ColorfulCard variant='card1' text='Entrepreneur'/>
        <ColorfulCard variant='card2' text='Tech'/>
        <ColorfulCard variant='card3' text='Innovation'/>
        <ColorfulCard variant='card4' text='Collaboration'/>
        <VideoCard  variant='video1' url='https://ik.imagekit.io/jwt52yyie/linkedinprofile.png?updatedAt=1770500826510'/>
        <h1 className='font-sans text-[#222831] font-bold text-2xl p-2 bg-[#92F090]'>27-28 March 2026</h1>
           
        
    </div>
  )
}

export default HeroSection