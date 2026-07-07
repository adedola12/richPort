import React from "react";
import { motion } from "framer-motion";
import ProjHero from "../../assets/ProjectHero.webp";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 0.61, 0.36, 1] },
});

const Hero = () => (
  <section className="relative w-full overflow-hidden bg-[#050505]">
    {/* BACKGROUND LAYER — looping showreel, poster shows until it loads */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover object-top"
        src="/hero-loop.mp4"
        poster={ProjHero}
        autoPlay
        muted
        loop
        playsInline
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,1) 70%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-10 h-56 w-[55%] max-w-[600px] rounded-full bg-lime-500/15 blur-[120px]" />
    </div>

    {/* CONTENT */}
    <div className="relative z-10 flex h-screen min-h-[600px] flex-col items-center justify-end pb-20 px-4 text-center">

      {/* pill */}
      <motion.div className="relative inline-flex rounded-full" {...fadeUp(0.25)}>
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            padding: "1.5px",
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 73%, rgba(132,204,22,0.15) 78%, rgba(132,204,22,0.6) 82%, #84cc16 84%, #e8ffb0 85.5%, #84cc16 87%, rgba(132,204,22,0.6) 89%, rgba(132,204,22,0.15) 93%, transparent 97%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            filter: "blur(0.4px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative inline-flex items-center justify-center rounded-full bg-white/5 px-4 py-1.5 backdrop-blur">
          <span className="text-[11px] font-semibold tracking-tight text-neutral-50/90">
            Open for Projects
          </span>
        </div>
      </motion.div>

      {/* heading */}
      <motion.h1
        className="mt-3 max-w-3xl font-['Outfit'] font-semibold text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] leading-[0.95] tracking-[-0.04em] bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent"
        {...fadeUp(0.6)}
      >
        The Work Speaks
      </motion.h1>

      {/* subtitle */}
      <motion.p
        className="mt-3 text-[19px] sm:text-[21px] leading-[1.6] text-neutral-400 max-w-sm"
        {...fadeUp(0.9)}
      >
        Pull up a chair, listen closely. It&apos;s been busy.
      </motion.p>

      {/* scroll indicator */}
      <motion.div
        className="mt-10 flex flex-col items-center gap-1.5 cursor-default select-none"
        {...fadeUp(1.2)}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-medium">Scroll</span>
        <div className="relative h-9 w-[1.5px] overflow-hidden rounded-full bg-neutral-700">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-lime-400"
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
            style={{ height: "45%" }}
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;
