export default function Competition() {
  return (
    <div className="w-auto h-screen bg-black">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden bg-black/70 backdrop-blur-xl border border-white/10 shadow-lg hover:scale-[1.02] transition duration-300">
      <div className="h-48 w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559526324-593bc073d938"
          alt="Startup Survival Game"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between">

        <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full w-fit">
          Competition
        </span>

        <h2 className="mt-3 text-xl font-bold text-white leading-tight">
          Startup Survival Game
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Run a startup. Face unexpected crises. Make decisions under pressure and survive the chaos.
        </p>

        <div className="mt-5 flex items-center justify-between">
          <button className="text-sm font-medium text-white bg-[#6D4DFE] hover:bg-indigo-500 transition px-4 py-2 rounded-lg">
            Register
          </button>

          <span className="text-xs text-gray-500">
            High Intensity
          </span>
        </div>

      </div>
    </div>
    </div>

  );
}