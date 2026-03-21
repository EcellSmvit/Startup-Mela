"use client";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden px-6 py-20 z-20">
      <div className="absolute inset-0 opacity-[0.04] 
        bg-[linear-gradient(45deg,white_1px,transparent_1px),
            linear-gradient(-45deg,white_1px,transparent_1px)] 
        bg-[size:24px_24px]"></div>
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#014E87]/20 blur-[160px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-16">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase">
            Contact Us
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Whether you have a question about registrations, want to bring your startup, or are interested in sponsoring the event, we will get back to you within 24 hours.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-8">
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <p className="text-white/50 text-sm">General Email</p>
              <p className="text-white font-medium mt-1">
                ecellsmvit@gmail.com
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-4">
              <h3 className="text-white font-semibold text-lg">
                Contact Details
              </h3>

              {[
                { role: "Events Head", name: "Bhoomi", contact: "9008708350" },
                { role: "Corporate Relations / Startups Head", name: "Satvik Gupta", contact: "7338620007" },
                { role: "Technical Head", name: "Bikesh Kumar", contact: "7903897660" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-white/70">
                  <div>
                    <p className="text-white">{item.role}</p>
                    <p className="text-white/50 text-xs">{item.name}</p>
                  </div>
                  <p>{item.contact}</p>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-3">
              <h3 className="text-white font-semibold">Social Media</h3>

              <a
                href="https://linktr.ee/ecellsmvit"
                target="_blank"
                className="text-white/70 hover:text-[#014E87] transition"
              >
                Linktree
              </a>

              <p className="text-white/70">
                WhatsApp: Satvik - <span className="text-white">7338620007</span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-4">

            <h3 className="text-white font-semibold text-lg">
              Send a Message
            </h3>
            <input
              type="text"
              placeholder="Full Name"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#014E87]"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#014E87]"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#014E87]"
            />

            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#014E87]">
              <option>General</option>
              <option>Registration</option>
              <option>Sponsorship</option>
              <option>Startup Stall</option>
              <option>Other</option>
            </select>

            <textarea
              placeholder="Message"
              rows={4}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#014E87]"
            />

            <button className="mt-2 bg-[#014E87] text-white py-2 rounded-lg hover:opacity-90 transition">
              Send Message
            </button>
          </div>
        </div>

        {/* 📍 VENUE */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col gap-4">

          <h3 className="text-white font-semibold text-lg">
            Venue
          </h3>

          <p className="text-white/70 text-sm">
            Sir M. Visvesvaraya Institute of Technology <br />
            International Airport Road, Hunasamaranahalli, Yelahanka, Bengaluru, Karnataka 562157
          </p>

          <a
            href="https://share.google/I29QxIFvIrkDhSIj9"
            target="_blank"
            className="text-[#014E87] text-sm hover:underline"
          >
            View on Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}