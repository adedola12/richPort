// src/components/Home/BuildSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import containerImg from "../../assets/Container.png";

const BuildSection = () => {
  const navigate = useNavigate();

  const handleRateClick = () => {
    navigate("/rate-details");
  };

  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* Main card */}
        <div
          className="
            relative overflow-hidden
            rounded-3xl border border-zinc-700
            bg-[#050505]
            shadow-[0_0_40px_rgba(0,0,0,0.85)]
          "
        >
          {/* Background swirl image */}
          <img
            src={containerImg}
            alt=""
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0 h-full w-full
              object-cover
              opacity-70
            "
          />

          {/* Dark overlay to keep text readable */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center gap-6 px-6 py-12 text-center sm:px-10 sm:py-16 lg:px-32 lg:py-20">
            {/* Pill */}
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
              <span className="font-['Mont'] text-xs font-semibold tracking-tight text-white">
                Available for New Projects
              </span>
            </div>

            {/* Heading with strong gradient */}
            <h2
              className="
                max-w-[720px]
                font-['Outfit'] font-semibold
                text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem]
                leading-tight lg:leading-[1.12]
                space-y-1
              "
            >
              <span
                className="
                  block
                  bg-gradient-to-b from-white via-[#f3f3f3] to-[#bfbfbf]
                  bg-clip-text text-transparent
                "
              >
                Let&apos;s Build Something
              </span>
              <span
                className="
                  block
                  bg-gradient-to-b from-white via-[#f5f5f5] to-[#b0b0b0]
                  bg-clip-text text-transparent
                "
              >
                Amazing Together.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="max-w-[520px] font-['Lexend'] text-sm font-normal leading-6 text-neutral-200 sm:text-base">
              Have a question or an exciting project in mind? I&apos;d love to
              hear from you. Let&apos;s create user experiences that make a
              difference.
            </p>

            {/* CTA button – navigates to /rate-details */}
            <button
              type="button"
              onClick={handleRateClick}
              className="
                mt-2 inline-flex items-center justify-center
                rounded-md
                bg-gradient-to-b from-lime-400 to-lime-600
                px-8 py-3
                font-['Mont'] text-sm sm:text-base font-extrabold
                text-zinc-900
                shadow-[0_0_22px_rgba(190,242,100,0.6)]
                transition
                hover:brightness-110 hover:shadow-[0_0_30px_rgba(190,242,100,0.8)]
              "
            >
              Check out my rate card
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildSection;
