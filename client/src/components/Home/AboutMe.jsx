import React from "react";
import myImg from "../../assets/myImg.jpg";

const AboutMe = () => {
  return (
    <section className="relative w-full bg-[#050505] py-20 lg:py-24 overflow-hidden">
      {/* soft green glow behind the whole section */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-lime-500/15 blur-[180px]" />
        <div className="absolute right-[-80px] bottom-[-40px] h-96 w-96 rounded-full bg-lime-500/20 blur-[220px]" />
      </div>

      {/* content wrapper */}
      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-8">
        {/* 3-column layout on desktop, stacked on mobile */}
        <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-[minmax(0,1.3fr)_auto_minmax(0,1.3fr)] lg:items-center lg:gap-16">
          {/* LEFT TEXT BLOCK */}
          <div className="flex flex-col items-start gap-4 text-left">
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
              <span className="text-xs font-semibold tracking-tight text-white font-['Mont']">
                Hi there, I&apos;m…
              </span>
            </div>

            <h2
              className="
                text-3xl sm:text-4xl lg:text-5xl xl:text-[52px]
                font-medium font-['Outfit']
                leading-tight lg:leading-[1.1]
                text-white
              "
            >
              Richard Enoch
            </h2>

            <p className="mt-2 text-sm sm:text-[15px] leading-6 text-neutral-100 font-['Lexend']">
              Design, for me, is simply giving life to the many ideas constantly
              buzzing in my head. I love to draw, play with colors, and explore
              the endless possibilities that come from starting with a blank
              canvas.
              <br />
              <br />
              I&apos;m a multidisciplinary designer, and I&apos;ve been on this
              roller coaster for about 6 years now.
              <br />
              <br />
              Over the years, I&apos;ve had the chance to bring brands to life,
              collaborate with national organizations both locally and
              internationally, and just enjoy the process of creating.
            </p>
          </div>

          {/* CENTER IMAGE CARD + LOCAL GLOW */}
          <div className="my-4 lg:my-0 flex items-center justify-center relative">
            {/* soft green glow right behind the portrait */}
            <div className="pointer-events-none absolute -z-10 h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-lime-500/30 blur-[140px]" />

            <div
              className="
                group relative
                h-[320px] w-[230px] sm:h-[360px] sm:w-[260px] lg:h-[380px] lg:w-[270px]
                overflow-hidden rounded-xl border-[3px] border-white/90
                bg-black shadow-[0_0_40px_rgba(0,0,0,0.65)]
              "
            >
              <img
                src={myImg}
                alt="Richard Enoch"
                className="
                  absolute inset-0 h-full w-full object-cover
                  grayscale
                  transition duration-500 ease-out
                  group-hover:grayscale-0 group-hover:scale-[1.02]
                "
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent via-black/70 to-black" />
            </div>
          </div>

          {/* RIGHT TEXT + CTAS */}
          <div className="flex flex-col items-start gap-8 text-left">
            <p className="text-sm sm:text-[15px] leading-6 text-neutral-100 font-['Lexend']">
              I&apos;ve also worked across different teams, building my soft
              skills and doing my best to make sure my designs solve real
              problems—because at the end of the day, isn&apos;t that what
              design is all about?
              <br />
              <br />
              And since I find the construction industry super fascinating (I
              studied Quantity Surveying, by the way), I like to think I&apos;m
              discovering my purpose in connecting design and construction…
              <br />
              <br />
              Or maybe it&apos;s the other way around.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                className="
                  inline-flex items-center gap-2
                  rounded-lg border border-lime-500
                  px-5 py-2.5
                  text-xs font-extrabold font-['Mont']
                  text-lime-400
                  bg-transparent
                  hover:bg-lime-500/10
                  transition
                "
              >
                <span className="inline-block h-3.5 w-3.5 rounded-[4px] bg-lime-500" />
                <span>View Resume</span>
              </button>

              <div className="flex items-center gap-2">
                <div className="inline-flex flex-col items-start gap-1.5 rounded bg-gradient-to-b from-neutral-800 to-neutral-800/0 p-2 outline outline-[0.55px] outline-offset-[-0.55px] outline-zinc-800">
                  <span className="h-3 w-3 rounded-[3px] bg-gradient-to-b from-lime-500 to-lime-700" />
                </div>
                <div className="inline-flex flex-col items-start gap-1.5 rounded bg-gradient-to-b from-neutral-800 to-neutral-800/0 p-2 outline outline-[0.55px] outline-offset-[-0.55px] outline-zinc-800">
                  <span className="h-3 w-3 rounded-[3px] bg-gradient-to-b from-lime-500 to-lime-700" />
                </div>
                <div className="inline-flex flex-col items-start gap-1.5 rounded bg-gradient-to-b from-neutral-800 to-neutral-800/0 p-2 outline outline-[0.55px] outline-offset-[-0.55px] outline-zinc-800">
                  <span className="h-3 w-3 rounded-[3px] bg-gradient-to-b from-lime-500 to-lime-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
