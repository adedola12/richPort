import React from "react";
import containerImg from "../../assets/Container.png";

const RateCTA = () => {
  return (
    <section className="relative w-full bg-[#050505]">
      <div
        className="
          relative w-full overflow-hidden
          h-[200px] sm:h-[230px] md:h-[260px] lg:h-[280px]
        "
      >
        <img
          src={containerImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

        <div className="relative flex h-full flex-col items-center justify-center gap-4 px-4 text-center sm:gap-5">
          <h2
            className="
              max-w-[880px]
              text-white
              font-semibold
              text-[2.2rem] sm:text-[2.6rem] md:text-[2.8rem] lg:text-[3rem]
              leading-tight
            "
            style={{ fontFamily: "Zialothus, 'Great Vibes', cursive" }}
          >
            Ready to get started?
          </h2>

          <p className="max-w-[640px] font-['Mont'] text-xs sm:text-sm md:text-base font-semibold leading-6 text-neutral-200">
            Let’s work together, I promise I&apos;m a lot of fun to work with.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RateCTA;
