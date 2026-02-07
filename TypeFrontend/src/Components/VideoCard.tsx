import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface VideoProps{
    variant:"video1" | "video2" | "video3";
    url:string;
}

const variantVideoClasses ={
    "video1":"-rotate-6",
    "video2":"rotate-6",
    "video3":"-rotate-12",
}

const defaultvideoCard = "absolute z-10 w-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded"

function VideoCard({variant,url}:VideoProps) {

    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger:{
              trigger:sectionRef.current,
              start: "top top", 
              end: "+=1200", 
            //   pin:true,
              scrub:3,
              
              // markers: true,
            }
          });
          tl.to(videoRef.current, { scale:3, duration: 1, rotate:0, ease: "power3.out"},0)
          tl.to(videoRef.current, { y: 600, duration: 1, ease: "power3.out" },0)
          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
    }, []);


  return (
    <div>
        <video ref={videoRef} className={variantVideoClasses[variant]+" "+defaultvideoCard} src={url} 
        autoPlay
        muted
        loop>
        </video>
    </div>
  )
}

export default VideoCard