// src/components/About/ShortIntro.jsx
import React from "react";
import { motion } from "framer-motion";

const ShortIntro = () => {
  return (
    <section className="w-full bg-[#050505]">
      <div className="mx-auto max-w-[961px] px-4 pt-16 sm:pt-20 lg:pt-24">
        {/* Heading — left-aligned, matching Figma */}
        <motion.h2
          className="
            text-[28px] sm:text-[34px] lg:text-[40px]
            font-['Outfit'] font-medium
            leading-tight
            tracking-[-0.05em]
            bg-gradient-to-b from-white via-white to-neutral-300
            bg-clip-text text-transparent
          "
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Short introduction
        </motion.h2>

        {/* Bio paragraph */}
        <motion.p
          className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-neutral-200 text-justify"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
        >
          I&apos;m a Brand and Product Designer who loves turning ideas into clear,
          engaging, and user-friendly digital experiences. I enjoy building strong
          brand identities and thoughtful product designs—from cohesive design
          systems and intuitive wireframes to polished, high-fidelity prototypes
          and marketing assets that connect with people across platforms.
          {"\n\n"}
          I&apos;m driven by curiosity and design thinking, using UX research and
          real insights to shape solutions that make sense for both users and
          businesses. I thrive in collaborative environments, working closely with
          cross-functional teams to create scalable, consistent designs that
          improve processes, elevate brands, and leave users genuinely satisfied.
        </motion.p>
      </div>
    </section>
  );
};

export default ShortIntro;
