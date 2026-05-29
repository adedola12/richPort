// src/components/About/ShortIntro.jsx
import React from "react";
import { motion } from "framer-motion";

const ShortIntro = () => {
  return (
    <section className="w-full bg-[#050505]">
      <div className="mx-auto max-w-[961px] px-4 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">

        {/* Heading */}
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

        {/* Bio — Option A */}
        <motion.p
          className="mt-5 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.12 }}
        >
          I&apos;m a <span className="text-white font-medium">visual designer and product thinker</span> with
          6 years of professional experience across brand identity, UI/UX, and construction technology.
          I&apos;m drawn to work that demands both{" "}
          <span className="text-white font-medium">precision and restraint</span> — design that carries weight
          without announcing itself. I design because I have a sincere drive to solve problems beautifully:
          given a clear brief, I make it look like it couldn&apos;t have been done any other way.
        </motion.p>

        <motion.p
          className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.22 }}
        >
          I&apos;m also a trained Quantity Surveyor — which means when I&apos;m designing for the built
          environment, I already speak the language.{" "}
          <span className="text-lime-400 font-medium">I build things I design.</span>{" "}
          This portfolio was designed and coded by me.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="mt-12 mb-10 h-px w-full bg-white/8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* How I Work */}
        <motion.p
          className="text-[10px] font-bold tracking-[0.25em] uppercase text-lime-400 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          How I Work
        </motion.p>

        <motion.p
          className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300 max-w-[720px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
        >
          I work best when the problem is defined and execution is the mandate.
          Give me a clear brief and I will make it look like it couldn&apos;t have been done any other way.
          I can also think from first principles — systems, flows, decisions from scratch —
          but that takes longer, and I&apos;d rather be honest about that than overpromise.
          Most of the best work I&apos;ve done happened when someone trusted me with a specific problem
          and gave me the room to solve it on my own terms.
        </motion.p>

      </div>
    </section>
  );
};

export default ShortIntro;
