import { useState } from "react";

interface HorizCardProps {
  variant: "Horizcard1" | "Horizcard2" | "Horizcard3" | "Horizcard4";
  texth1: string;
  textp: string;
}

const variantClassesHori = {
  Horizcard1: "bg-[#93F190] top-48",
  Horizcard2: "bg-[#FFB0C2] top-10 left-[20%]",
  Horizcard3: "bg-[#FF9001] bottom-10 left-1/2",
  Horizcard4: "bg-[#15B8A7] top-1/2 right-[10%]",
};

const defaultstyle =
  "w-96 absolute rounded-2xl transition-all duration-400 overflow-hidden cursor-pointer flex items-center justify-between flex-col";
const defaulth1style =
  "text-2xl font-sans text-black text-center font-medium mt-2";
const defaultpstyle =
  "transition-opacity duration-300 text-sm p-4 text-center font-sans break-words whitespace-normal text-black font-normal";

function Horizontalcards({ variant, texth1, textp }: HorizCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <div
        className={
          `${variantClassesHori[variant]} ${defaultstyle} ${
            hovered ? "h-52" : "h-14"
          }`
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h1 className={defaulth1style}>{texth1}</h1>
        <p
          className={
            `${defaultpstyle} ${hovered ? "opacity-100 mt-2 " : "opacity-0 mt-0"}`
          }
          style={{ wordBreak: "break-word" }}
        >
          {textp}
        </p>
      </div>
    </div>
  );
}

export default Horizontalcards;