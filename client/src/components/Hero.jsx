import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505]">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-lime-500/25 blur-[160px]" />
      <div className="pointer-events-none absolute right-[-6rem] top-20 h-80 w-80 rounded-full bg-lime-500/30 blur-[180px]" />

      <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
        {/* Small pill */}
        <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
          <span className="text-[11px] font-semibold tracking-tight text-neutral-50/90 font-['Mont']">
            Open for Projects
          </span>
        </div>

        {/* Heading */}
        <h1
          className="
            mt-8 max-w-6xl
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px]
            font-semibold font-['Outfit']
            leading-tight lg:leading-[1.1] xl:leading-[72px]
            bg-gradient-to-b from-white via-white to-neutral-400
            bg-clip-text text-transparent
          "
        >
          Crafting Stunning Experiences,
          <br className="hidden sm:block" />
          One Pixel at a Time.
        </h1>

        {/* Subtext */}
        <p className="mt-5 max-w-xl text-sm sm:text-base md:text-lg font-semibold font-['Mont'] leading-6 text-neutral-300">
          Hi, I&apos;m a multi-disciplinary designer who transforms ideas into
          seamless, user-centered solutions.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center">
          <button
            className="
              inline-flex h-10 items-center justify-center
              rounded-lg border border-white/80
              px-6 py-2
              text-xs sm:text-sm font-normal font-['Lexend'] text-white
              hover:bg-white/10 transition
            "
          >
            View Works
          </button>

          <button
            className="
              inline-flex h-10 items-center justify-center
              rounded-lg
              bg-gradient-to-b from-lime-400 to-lime-600
              px-6 py-2
              text-xs sm:text-sm font-bold font-['Lexend'] text-black
              shadow-[0_0_18px_rgba(132,204,22,0.6)]
              hover:from-lime-300 hover:to-lime-500 transition
            "
          >
            About Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
