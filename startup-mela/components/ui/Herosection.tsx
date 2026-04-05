"use client";

import Button from "../button";

export default function Herosection() {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#014E87]/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[300px] bg-[#014E87]/10 blur-[120px] rounded-full"></div>
      <div className="absolute inset-0 z-0 grid grid-cols-40 grid-rows-24">
        {[...Array(1000)].map((_, i) => (
          <div
            key={i}
            className="
              border border-white/5
              bg-transparent
              hover:bg-[#014E87]/40
              transition-all duration-300
            "
          />
        ))}
      </div>
      <div className="absolute z-20 flex items-center justify-between w-full p-4 pointer-events-auto">
        {/* <img
          className="w-[35vw]"
          src="https://ik.imagekit.io/es6xialea/Group%201.svg"
          alt="logo"
        /> */}
        <img
          className="w-[20vw]"
          src="https://ik.imagekit.io/es6xialea/StartupmekaXecellXsmvit.svg"
          alt="logo"
        />
<span className="text-white uppercase font-medium 
                text-lg sm:text-sm md:text-2xl lg:text-3xl xl:text-4xl 
                text-center leading-snug">
  <span className="block sm:hidden">SIRMVIT</span>
  <   span className="hidden sm:block">Sir M. Visvesvaraya Institute of Technology</span>
    </span>
    <span>
    <Button variant="primary" text="Register" link="/signup" />
    </span>
        
      </div>

      {/* Content */}
      <div className="relative z-30 flex items-center justify-center w-full h-screen flex-col gap-6 text-center px-4 pointer-events-none">
        
        <h1 className="text-5xl md:text-7xl font-black uppercase flex flex-wrap justify-center leading-tight  p-2">
          <span className="text-white ">Innovate.&nbsp;</span>
          <span className="text-[#014E87] bg-white">Connect.</span>
          <span className="text-white  "> &nbsp; Elevate.</span>
        </h1>

        <p className="text-white font-medium max-w-3xl text-xl">
          SMVIT’s Biggest Startup Event - 2 Days Of Competitions, Mentor/Investor Meets, Speaker Sessions and Startup Exposure.
        </p>

        <div className="relative z-20 pointer-events-auto flex items-center justify-center gap-4">
          <Button variant="primary" text="Register Now" link="/signup" />
          <Button variant="secondary" text="Competitions" link="#competitions" />
        </div>

        <h2 className="text-white uppercase font-semibold text-sm md:text-xl bg-[#014E87] px-4 py-2 tracking-wide">
          2 Days  |  4 Competitions  |  Rs. 80,000 in Prizes  |  Open to All Colleges
        </h2>
      </div>
    </div>
  );
}