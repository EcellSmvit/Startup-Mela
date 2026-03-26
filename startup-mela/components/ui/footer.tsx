"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:22px_22px] "></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#014E87] to-transparent opacity-80"></div>
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#014E87]/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 flex flex-col gap-10 overflow-hidden">
          <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#014E87]/40 via-transparent to-[#014E87]/40 opacity-40 blur-xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="flex flex-col gap-3">
              <img
                className="w-56 opacity-90 hover:opacity-100 transition"
                src="https://ik.imagekit.io/es6xialea/Logo.svg"
                alt="logo"
              />

              <p className="text-white text-lg">
                E-Cell SMVIT
              </p>

              <p className="text-white/80 text-md max-w-xs leading-relaxed">
                Sir M. Visvesvaraya Institute Of Technology
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <p className="text-white/80 font-medium tracking-wide text-lg">
                CONTACT
              </p>

              <p className="text-white/60 hover:text-white transition cursor-pointer text-lg">
                ecellsmvit@gmail.com
              </p>

              <p className="text-white/60 text-lg">
                Satvik Gupta - <span className="text-white">7338620007</span>
              </p>

              <p className="text-white/60 text-lg">
                Bhoomi Nayak - <span className="text-white">9008708350</span>
              </p>
            </div>
            <div className="flex flex-col gap-3 text-lg">
              <p className="text-white/80 font-medium tracking-wide">
                SOCIALS
              </p>

              <a
                href="https://www.instagram.com/ecell_smvit"
                target="_blank"
                className="text-white/60 hover:text-[#014E87] transition flex items-center gap-2 group"
              >
                Instagram
                
              </a>

              <a
                href="https://www.linkedin.com/company/e-cell-sirmvit"
                target="_blank"
                className="text-white/60 hover:text-[#014E87] transition flex items-center gap-2 group"
              >
                LinkedIn
                
              </a>
                            <a
                href="https://www.ecellsmvit.in/"
                target="_blank"
                className="text-white/60 hover:text-[#014E87] transition flex items-center gap-2 group"
              >
                Website
                
              </a>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">

            <p className="hover:text-white transition">
              © E-Cell SMVIT. All Rights Reserved.
            </p>

            <p className="tracking-[0.3em] text-white/80">
              INNOVATE • CONNECT • ELEVATE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}