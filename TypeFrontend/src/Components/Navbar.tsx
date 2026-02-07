function Navbar() {
  return (
    <nav className="w-screen flex items-center justify-between px-8 py-4 text-[#eeeeee]">
      <div>
        <h1 className="text-5xl">BK</h1>
      </div>
      <div className="flex items-center gap-6">
        <button className="font-sans px-6 py-2 rounded border border-[#eeeeee] transition-all duration-300 ease-in-out hover:bg-[#393e46] hover:scale-105 active:scale-95">
          Download Resume
        </button>
        <button className="font-sans px-6 py-2 rounded bg-[#eeeeee] text-[#222831] transition-all duration-300 ease-in-out hover:bg-[#92F090] hover:scale-105 active:scale-95">
          Contact
        </button>
      </div>
    </nav>
  );
}

export default Navbar