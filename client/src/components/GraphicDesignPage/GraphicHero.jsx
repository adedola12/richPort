// src/components/GraphicDesignPage/GraphicHero.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function GraphicHero({ data }) {
  const navigate = useNavigate();

  const t = data?.heroBgTweak || {};
  const fit = t.fit || "cover";
  const scale = typeof t.scale === "number" ? t.scale : 1;
  const posX = typeof t.posX === "number" ? t.posX : 58;
  const posY = typeof t.posY === "number" ? t.posY : 22;
  const tx = typeof t.translateX === "number" ? t.translateX : 0;
  const ty = typeof t.translateY === "number" ? t.translateY : 0;
  const opacity = typeof t.opacity === "number" ? t.opacity : 0.99;

  return (
    <section
      className="
        relative w-full overflow-hidden
        bg-[#070707]
        pt-24
        pb-10 sm:pb-12
        min-h-[520px] md:min-h-[560px]
      "
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={data?.heroBg}
          alt=""
          draggable="false"
          className={[
            "absolute inset-0 h-full w-full",
            fit === "contain" ? "object-contain" : "object-cover",
          ].join(" ")}
          style={{
            objectPosition: `${posX}% ${posY}%`,
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            opacity,
          }}
        />

        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_115%_at_55%_35%,transparent_0%,rgba(0,0,0,0.88)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.55)_55%,rgba(7,7,7,1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.90)_42%,rgba(0,0,0,0.62)_60%,transparent_80%)]" />
        <div className="absolute -right-[18%] top-[10%] h-[520px] w-[520px] rounded-full bg-lime-500/10 blur-[170px]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#070707]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-10">
        <div className="max-w-[820px]">
          {/* Back button */}
          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="
              inline-flex items-center justify-center
              rounded-full border border-white/12 bg-white/[0.05]
              px-4 py-2 backdrop-blur-md
              shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
              transition hover:bg-white/[0.08] hover:border-white/20
            "
          >
            <span className="text-xs leading-5 text-white/75">
              {data?.backLabel || "Back"}
            </span>
          </motion.button>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
            className="
              mt-5 font-['Outfit'] font-semibold tracking-[-0.05em]
              text-transparent bg-clip-text
              bg-[linear-gradient(180deg,#F4F4F4_0%,#CFCFCF_45%,#7B7B7B_100%)]
              drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]
              text-[clamp(40px,5.6vw,64px)]
              leading-[1.02]
            "
          >
            {data?.titleTop || "Flyers & Social Media"} <br />
            {data?.titleBottom || "Designs"}
          </motion.h1>

          {/* Subtitle — increased opacity and font size */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.35 }}
            className="
              mt-4 max-w-[560px]
             
              text-white/65
              tracking-[-0.6px]
              text-[16px] leading-[26px]
              sm:text-[17px] sm:leading-[27px]
              md:text-[18px] md:leading-[28px]
            "
          >
            {data?.subtitle || ""}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
