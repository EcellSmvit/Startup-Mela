"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="bg-[#171716] w-screen min-h-screen flex flex-col items-center justify-center text-white px-4">
      <div className="w-full max-w-md bg-[#1f1f1f] border border-[#2a2a2a] rounded-2xl p-10 shadow-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-center text-white">
          Welcome
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Sign in to access your Startup Mela dashboard
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/userdetails" })}
          className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white text-black font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          <span>Continue with Google</span>
        </button>
        <p className="text-xs text-gray-500 text-center mt-8 max-w-[280px]">
          By signing in, you agree to our terms and will be redirected to complete your profile if necessary.
        </p>
      </div>
      <div className="mt-8 text-yellow-500/50 text-xs font-mono uppercase tracking-widest">
        E-Cell SMVIT • Startup Mela 2026
      </div>
    </div>
  );
}