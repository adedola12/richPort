import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import Button from "../ui/Button";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const BuildSection = () => {
  const navigate = useNavigate();
  const [subtextReady, setSubtextReady] = useState(false);

  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* Main card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-zinc-700 bg-[#050505] shadow-[0_0_40px_rgba(0,0,0,0.85)]"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {/* Background loop video */}
          <video
            src="/background-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          />

          {/* Dark overlay to keep text readable */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center gap-4 px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-32 lg:py-20">
            {/* Pill */}
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
              <TypingText
                as="span"
                text="Available for New Projects"
                delay={0.2}
                onComplete={() => setSubtextReady(true)}
                className="text-xs font-semibold tracking-tight text-white"
              />
            </div>

            {/* Heading */}
            <h2
              className="
                max-w-[720px]
                font-['Outfit'] font-semibold
                text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]
                leading-[1.05] lg:leading-[0.95]
                tracking-[-0.05em]
              "
            >
              <span
                className="
                  block
                  bg-gradient-to-b from-white via-[#f3f3f3] to-[#bfbfbf]
                  bg-clip-text text-transparent
                "
              >
                Let&apos;s Get to Work!
              </span>
            </h2>

            {/* Subtitle — two lines */}
            <p className="max-w-[600px] text-[19px] sm:text-[22px] font-normal leading-[1.25] text-neutral-200">
              <span className="block">You have the vision. I have the craft. All that&apos;s</span>
              <span className="block">left is the conversation.</span>
            </p>

            {/* CTA button – navigates to /rate-details */}
            <Button
              variant="primary"
              size="md"
              className="mt-2"
              onClick={() => navigate("/contact")}
            >
              Send a Message
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuildSection;
