"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:26px_26px]"></div>
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#014E87]/20 blur-[140px] rounded-full"></div>
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-10 flex flex-col items-center shadow-[0_0_40px_rgba(1,78,135,0.1)]">
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#014E87]/30 via-transparent to-[#014E87]/30 blur-xl opacity-40 pointer-events-none"></div>
        <img
          className="w-40 mb-6 opacity-90"
          src="https://ik.imagekit.io/es6xialea/Logo.svg"
          alt="logo"
        />
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Welcome
        </h1>

        <p className="text-sm text-white/50 text-center mt-2 mb-8">
          Sign in to access your Startup Mela dashboard
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-4 px-6 py-4 rounded-xl bg-white text-black font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <p className="text-xs text-white/40 text-center mt-8 max-w-[280px] leading-relaxed">
          By signing in, you agree to our terms and will be redirected to complete your profile if necessary.
        </p>
        <div className="mt-8 text-[#014E87] text-[10px] tracking-[0.3em] uppercase">
          E-Cell SMVIT • Startup Mela 2026
        </div>
      </div>
    </div>
  );
}