import React, { useState } from "react";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import abtImg from "../../assets/abtImg.jpg";

const HERO_BG_Y = "25%";

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1],
      delay: 0.1,
    },
  },
};

const AboutHero = () => {
  const [subtextReady, setSubtextReady] = useState(false);
  return (
    <section className="relative w-full bg-black">
      {/* Full viewport height hero */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background image */}
        <img
          src={abtImg}
          alt="Richard Enoch"
          className="
            absolute inset-0 h-full w-full
            object-cover
            grayscale
            brightness-[0.55]
          "
          style={{
            objectPosition: `center ${HERO_BG_Y}`,
          }}
        />

        {/* Dark bottom fade */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-b
            from-transparent via-black/50 to-black/95
          "
        />

        {/* CONTENT OVERLAY — positioned bottom-right */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-end px-4 lg:px-6">
          <motion.div
            className="ml-auto mb-16 flex max-w-[521px] flex-col items-end gap-4 text-right sm:mb-20 lg:mb-24"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            {/* pill */}
            <motion.div
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur"
              variants={pillVariants}
            >
              <span className="text-xs font-semibold tracking-tight text-white">
                About
              </span>
            </motion.div>

            {/* heading */}
            <TypingText
              as="h1"
              text="Richard Enoch"
              delay={0.25}
              onComplete={() => setSubtextReady(true)}
              className="
                font-['Outfit']
                text-4xl sm:text-5xl md:text-6xl lg:text-[64px]
                font-semibold
                leading-tight lg:leading-[1.05]
                tracking-[-0.05em]
                text-white
              "
            />

            {/* subtitle */}
            <TypingText
              as="p"
              text="This is expected to be my portfolio, but I prefer seeing it as me walking you through the creative side of this guy."
              startWhen={subtextReady}
              delay={0}
              className="
               
                text-[15px] sm:text-[17px] lg:text-[18px]
                font-semibold
                leading-5
                text-white
                max-w-[470px]
              "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
