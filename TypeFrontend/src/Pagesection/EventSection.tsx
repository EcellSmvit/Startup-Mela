function EventSection() {
  return (
    <div
    className="relative w-screen h-[350vh] overflow-hidden bg-[#222831] m-0 p-0 "
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="font-black text-[#eeeeee] font-sans flex items-center justify-center flex-col">
        <p className="text-3xl">Project</p>
        <p className="text-9xl">ShowCase</p>
      </div>
    </div>
  )
}

export default EventSection