import Button from '../button';

export default function Herosection() {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(109, 77, 254, 0.7) 0%, transparent 55%),
          radial-gradient(circle at 50% 100%, rgba(129, 102, 255, 0.5) 0%, transparent 65%),
          radial-gradient(circle at 50% 100%, rgba(180, 170, 255, 0.35) 0%, transparent 80%)
        `,
        filter: "blur(20px)"
      }}
    />
    <div
      className="absolute inset-0 z-10 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, #ffffff 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
        backgroundSize: "20px 30px",
        WebkitMaskImage:
          "radial-gradient(ellipse 40% 60% at 50% 100%, #000 60%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 40% 60% at 50% 100%, #000 60%, transparent 100%)",
      }}
    />
      <div className='flex items-center justify-center flex-col w-screen h-screen relative z-10 text-[#ececec] gap-4'>
        <h1 className='font-black text-9xl uppercase'>Startup Mela 2026</h1>
        <h1 className='font-bold text-4xl uppercase'>Pitch. Validate. Connect.</h1>
        <h1 className='font-medium text-md'>SMVIT biggest student startup event - 2 days of competitions, VC meets, speaker sessions, and real startup exposure.
        </h1>
        <div className='flex items-center justify-center gap-8'>
          <Button
          link='/signup'
          variant='primary'
          text='Register Now'
          />
          <Button
          variant='secondary'
          text='Explore Events'
          />
        </div>
      </div>
    </div>
  );
}
