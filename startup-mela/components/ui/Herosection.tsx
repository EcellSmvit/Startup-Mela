"use client";

import Button from "../button";

export default function Herosection() {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
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
        <img
          className="w-[12vw]"
          src="https://ik.imagekit.io/es6xialea/Logo.svg"
          alt="logo"
        />
        <Button variant="primary" text="Register" link="/signup" />
      </div>
      <div className="relative z-30 flex items-center justify-center w-full h-screen flex-col gap-6 text-center px-4 pointer-events-none">
        
        <h1 className="text-5xl md:text-7xl font-black uppercase flex flex-wrap justify-center leading-tight">
          <span className="text-white">Innovate.&nbsp;</span>
          <span className="text-[#014E87]">Connect.&nbsp;</span>
          <span className="text-white">Elevate.</span>
        </h1>
        <p className="text-white font-bold">SMVIT’s biggest startup event - 2 days of competitions, mentor/investor meets, speaker sessions and startup exposure.</p>
        <div className="relative z-20 pointer-events-auto flex items-center justify-center gap-4">
          <Button variant="primary" text="Register Now" link="/signup" />
          <Button variant="secondary" text="View Competitions" link="/signup" />
        </div>
        <h2 className="text-white uppercase font-semibold text-sm md:text-xl bg-[#014E87] p-2">
          2 Days  |  4 Competitions  |  Rs. 80,000 in Prizes  |  Open to All Colleges
        </h2>

      </div>

    </div>
  );
}