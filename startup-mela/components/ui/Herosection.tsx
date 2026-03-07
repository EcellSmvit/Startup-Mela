import Button from '../button';

export default function Herosection() {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 100%, rgba(255, 99, 71, 0.6) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(255, 215, 0, 0.4) 0%, transparent 70%),
          radial-gradient(circle at 50% 100%, rgba(60, 179, 113, 0.3) 0%, transparent 80%)`,
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
      <div className="relative z-10 w-screen h-screen flex items-center justify-center flex-col gap-8">
        <div className='flex items-center justify-center'>
          <h1 className=" text-8xl text-[#ececec] font-bold">
            Dream.{" "}
            Dominate.
          </h1>
        </div>
        <p className="text-[#ececec] text-2xl font-medium">
          Showcase your innovation to investors who believe in{" "}
          <span className="bg-gradient-to-t from-yellow-300 to-yellow-700 bg-clip-text text-transparent font-medium">
            bold ideas.
          </span>{" "}
        </p>
        <Button
        link='/signup'
        variant='primary'
        text="Regsiter now"
        />
        <p className="text-[#ececec] text-3xl font-bold">27 - 28 March 2026</p>
      </div>
    </div>
  );
}
