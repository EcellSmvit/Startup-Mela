function Navbar() {
  return (
    <nav className="w-screen flex items-center justify-between px-8 py-4 text-[#eeeeee] font-sans">
      <div className="flex-shrink-0">
        <img
          className="h-14 w-auto transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95" 
          src="https://ik.imagekit.io/es6xialea/logowithoutname_FRoJAY4ve?updatedAt=1755297005039"
          alt="Logo"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="px-6 py-2 rounded border border-[#eeeeee] transition-all duration-300 ease-in-out hover:bg-[#393e46] hover:scale-105 active:scale-95">
          Explore
        </button>
        <button className="px-6 py-2 rounded bg-[#eeeeee] text-[#222831] transition-all duration-300 ease-in-out hover:bg-[#92F090] hover:scale-105 active:scale-95">
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar