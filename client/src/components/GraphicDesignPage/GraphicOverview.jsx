// src/components/GraphicDesignPage/GraphicOverview.jsx
import React from "react";
import { motion } from "framer-motion";

export default function GraphicOverview({ data }) {
  return (
    <section className="relative bg-[#070707]">
      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-8 py-12 sm:py-14">
        <div className="mx-auto max-w-[920px]">
          <div className="grid items-center gap-10 md:gap-12 md:grid-cols-[1fr_320px]">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <h2 className="font-['Outfit'] text-[28px] sm:text-[32px] font-semibold text-white">
                {data?.overviewTitle || "Overview"}
              </h2>

              <div className="mt-5 space-y-5">
                {(data?.overviewText || []).map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 0.61, 0.36, 1],
                      delay: 0.1 + idx * 0.1,
                    }}
                    className="
                     
                      text-[15px] sm:text-[16px]
                      leading-[1.7] text-white/65
                      max-w-[540px]
                    "
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Overview image */}
            <motion.div
              className="flex md:justify-end"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
            >
              <div
                className="
                  relative overflow-hidden
                  rounded-3xl border border-white/10
                  bg-white/[0.03]
                  shadow-[0_28px_90px_rgba(0,0,0,0.55)]
                  p-3
                  w-[240px] sm:w-[280px]
                "
              >
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_120%_at_50%_25%,rgba(255,255,255,0.07)_0%,transparent_60%)]" />

                <img
                  src={data?.overviewImage}
                  alt="Overview"
                  className="w-full rounded-2xl object-cover"
                  draggable="false"
                />

                <div className="pointer-events-none absolute inset-3 rounded-2xl border border-white/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
