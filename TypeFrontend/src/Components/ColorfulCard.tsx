import { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

interface CardProps{
    variant:"card1" | "card2" | "card3" | "card4";
    text:string;
}

const variantClasses ={
    "card1":"bg-[#F59E0B] top-20 left-32 -rotate-6",
    "card2":"bg-[#14B8A6] top-40 right-40 rotate-3",
    "card3":"bg-[#2563EB] bottom-44 right-56 rotate-6",
    "card4":"bg-[#4F46E5] bottom-32 left-44 -rotate-9"
}

const defaultCardstyle = "w-56 h-16 absolute rounded-2xl border-b-8 border-white flex items-center justify-center shadow-2xl";
const defaulttextStyle = "font-sans text-white font-bold text-2xl"

function ColorfulCard({variant,text}:CardProps) {
    const boxRef = useRef(null);

    useEffect(()=>{
        const draggable = Draggable.create(boxRef.current,{
            type: "x,y",
            inertia: true,
        })
        return () => {
            draggable.forEach((d) => d.kill());
          };
    },[])

  return (
    <div ref={boxRef} className={variantClasses[variant]+" "+defaultCardstyle}>
        <p className={defaulttextStyle}>{text}</p>
    </div>
  )
}

export default ColorfulCard