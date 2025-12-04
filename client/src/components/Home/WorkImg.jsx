import React from "react";

import wi1 from "../../assets/workImg/WI1.png";
import wi2 from "../../assets/workImg/WI2.jpg";
import wi3 from "../../assets/workImg/WI3.jpg";
import wi4 from "../../assets/workImg/WI4.jpg";
import wi5 from "../../assets/workImg/WI5.png";

const cards = [wi1, wi2, wi3, wi4, wi5];

const WorkImg = () => {
  return (
    // full-width band, clipped sides, brought above other sections with z-20
    <section className="relative z-20 w-full overflow-hidden bg-[#050505] py-16">
      {/* Green glow behind cards */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-lime-500/18 blur-[180px]" />
        <div className="absolute right-[-80px] bottom-[-40px] h-96 w-96 rounded-full bg-lime-500/25 blur-[220px]" />
      </div>

      {/* Centered content wrapper */}
      <div className="relative mx-auto max-w-[1440px] px-4">
        {/* ---------- MOBILE / TABLET (1–2 per row) ---------- */}
        <div className="flex flex-wrap justify-center gap-6 lg:hidden">
          {cards.map((src, index) => (
            <div
              key={index}
              className="
                group
                w-full           /* 1 card per row on very small screens */
                sm:w-1/2         /* 2 cards per row from ~640px */
                max-w-sm
                h-[260px] sm:h-[300px] md:h-[320px]
                rounded-2xl
                px-3.5 pt-3.5
                bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800
                border border-neutral-700
                shadow-[0_0_22px_rgba(0,0,0,0.75)]
              "
            >
              <div className="h-full w-full overflow-hidden rounded-xl border border-lime-400">
                <img
                  src={src}
                  alt={`Selected work ${index + 1}`}
                  className="
                    h-full w-full object-cover
                    grayscale
                    transition duration-500 ease-out
                    group-hover:grayscale-0
                    group-hover:scale-[1.02]
                  "
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---------- DESKTOP (carousel band, first & last cut in) ---------- */}
        <div className="hidden lg:flex justify-center gap-16 -mx-24">
          {cards.map((src, index) => (
            <div
              key={index}
              className="
                group
                flex-none
                w-[260px]
                h-[340px]
                rounded-2xl
                px-3.5 pt-3.5
                bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800
                border border-neutral-700
                shadow-[0_0_22px_rgba(0,0,0,0.75)]
              "
            >
              <div className="h-full w-full overflow-hidden rounded-xl border border-lime-400">
                <img
                  src={src}
                  alt={`Selected work ${index + 1}`}
                  className="
                    h-full w-full object-cover
                    grayscale
                    transition duration-500 ease-out
                    group-hover:grayscale-0
                    group-hover:scale-[1.02]
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkImg;
