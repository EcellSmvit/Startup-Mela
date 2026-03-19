"use client";

import Button from "../button";

export default function Herosection() {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      
      {/* 🔥 Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute z-20 flex items-center justify-between w-full p-4">
        <img
        className="w-[12vw] "
        src="https://ik.imagekit.io/es6xialea/Logo.svg"
        alt=""
      />
      <Button
      variant="primary"
      text="Register"
      link="/signup"
      />
      </div>
      

      <div className="relative z-10 flex items-center pl-4 justify-center w-full h-screen flex-col gap-4">
        <h1 className="text-8xl font-black uppercase flex flex-row">
          <span className="text-white">Pitch.</span>
          <span className="text-[#014E87]">Validate.</span>
          <span className="text-white">Connect.</span>
        </h1>
        <div>

        </div>
      </div>
        
    </div>
  );
}