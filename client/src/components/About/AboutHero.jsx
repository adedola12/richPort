// src/components/About/AboutHero.jsx
import React from "react";
import abtImg from "../../assets/abtImg.jpg";

// 0% = top of the image, 50% = center, 100% = bottom
// Increase this value to show more of the bottom part of the image.
const HERO_BG_Y = "25%";

const AboutHero = () => {
  return (
    <section className="relative w-full bg-black">
      {/* HERO WRAPPER */}
      <div className="relative h-[520px] sm:h-[600px] lg:h-[720px] overflow-hidden">
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

        {/* Dark bottom fade so text is readable */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-b
            from-transparent via-black/50 to-black/95
          "
        />

        {/* CONTENT OVERLAY */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-end px-4 lg:px-6">
          <div className="ml-auto mb-14 flex max-w-xl flex-col items-end gap-4 text-right sm:mb-16 lg:mb-20">
            {/* small pill */}
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
              <span className="font-['Mont'] text-xs font-semibold tracking-tight text-white">
                About
              </span>
            </div>

            {/* main heading */}
            <h1
              className="
                font-['Outfit'] 
                text-3xl sm:text-4xl md:text-5xl lg:text-[52px]
                font-semibold
                leading-tight lg:leading-[1.15]
                text-white
              "
            >
              Richard Enoch
            </h1>

            {/* sub text */}
            <p
              className="
                font-['Mont']
                text-sm sm:text-base lg:text-lg
                font-semibold
                leading-6
                text-white
                max-w-[480px]
              "
            >
              This is expected to be my portfolio, but I prefer seeing it as me
              walking you through the creative side of this guy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
