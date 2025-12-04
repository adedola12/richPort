// src/components/About/BriefInfo.jsx
import React, { useState } from "react";
import {
  FaDownload,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

// swap these imports for your real images
import ownImg from "../../assets/ownImg.png";
import ownImg1 from "../../assets/ownImg1.jpg";
import ownImg2 from "../../assets/ownImg2.png";

/* --- CARD STACK --------------------------------------------------------- */

const cardData = [
  { src: ownImg, name: "Samson Faboyo", role: "Design Lead" },
  { src: ownImg1, name: "Samson Agbeke", role: "Design Manager" },
  { src: ownImg2, name: "Adebayo Faboyo", role: "Design Ideator" },
];

function CardStack() {
  // 0 = front, 1 = middle, 2 = back
  const [order, setOrder] = useState([0, 1, 2]);

  const rotate = () => {
    setOrder((prev) => {
      const a = [...prev];
      // move last to the front
      a.unshift(a.pop());
      return a;
    });
  };

  // visual slots – positions for front / left / right cards
  const posStyles = (slot) => {
    if (slot === 0) {
      // front
      return {
        cls: "z-30 scale-100 rotate-0 left-1/2 -translate-x-1/2 top-0",
        fx: "",
      };
    }
    if (slot === 1) {
      // left / behind
      return {
        cls: "z-20 scale-[0.95] -rotate-[5.5deg] left-[41%] -translate-x-1/2 top-6",
        fx: "grayscale-[55%] brightness-90",
      };
    }
    // right / behind
    return {
      cls: "z-10 scale-[0.92] rotate-[6deg] left-[59%] -translate-x-1/2 top-8",
      fx: "grayscale-[55%] brightness-90",
    };
  };

  return (
    <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[400px] md:max-w-[420px]">
      {/* stage height so layout doesn't jump when animating */}
      <div className="h-[360px] sm:h-[400px] md:h-[440px]" />

      {order.map((cardIndex, slot) => {
        const { src, name, role } = cardData[cardIndex];
        const { cls, fx } = posStyles(slot);
        const clickable = slot !== 0;

        return (
          <figure
            key={`${cardIndex}-${slot}`}
            className={`
              absolute ${cls}
              w-[250px] h-[340px] sm:w-[280px] sm:h-[380px] md:w-[320px] md:h-[430px]
              rounded-2xl overflow-hidden
              bg-black/50
              transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
              ${clickable ? "cursor-pointer" : "cursor-default"}
            `}
            style={{
              // neon lime outline + glow
              boxShadow: `
                inset 0 0 0 2px rgba(132,255,0,.95),
                0 0 28px rgba(132,255,0,.45),
                0 0 60px rgba(132,255,0,.28)
              `,
            }}
            onClick={() => clickable && rotate()}
          >
            <img
              src={src}
              alt={name}
              className={`h-full w-full object-cover ${fx}`}
            />

            {/* edge fade so card "melts" into background */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                WebkitMaskImage:
                  "radial-gradient(92% 88% at 50% 55%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 96%)",
                maskImage:
                  "radial-gradient(92% 88% at 50% 55%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 96%)",
              }}
            />

            {/* name / role label */}
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-3 sm:p-4 text-center text-[11px] sm:text-xs text-gray-200">
              <div className="font-semibold">{name}</div>
              <div className="opacity-80">{role}</div>
            </figcaption>
          </figure>
        );
      })}

      {/* "Take a quick detour" button under stack */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={rotate}
          className="
            rounded-full bg-lime-400 px-6 py-2 text-sm font-semibold text-black
            shadow-[0_0_20px_rgba(132,255,0,.45)]
            transition-all
            hover:shadow-[0_0_35px_rgba(132,255,0,.55)]
            hover:-translate-y-0.5 active:translate-y-0
          "
        >
          Take a quick detour!
        </button>
      </div>
    </div>
  );
}

/* --- BRIEF INFO SECTION -------------------------------------------------- */

const BriefInfo = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505]">
      {/* soft green wash behind section */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 45%, rgba(132,255,0,0.16), rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:py-20 lg:py-24">
        {/* title */}
        <div className="mb-12 text-center">
          <h3 className="text-xs sm:text-sm tracking-[0.18em] text-white/80 uppercase">
            How about a brief
          </h3>
          <p
            className="mt-2 text-3xl sm:text-4xl md:text-5xl text-white"
            style={{ fontFamily: "Zialothus, 'Great Vibes', cursive" }}
          >
            brief introduction
          </p>
        </div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* LEFT TEXT BLOCK */}
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-[26rem] space-y-6 text-center text-[13px] leading-relaxed text-gray-200 sm:text-sm">
              <p>
                Design, for me, is simply giving life to the many ideas
                constantly buzzing in my head. I love to draw, play with colors,
                and explore the endless possibilities that come from starting
                with a blank canvas.
              </p>
              <p>
                I&apos;m a multidisciplinary designer, and I&apos;ve been on
                this roller coaster for about 6 years now. My style has always
                been &quot;Well, I think I can, so let&apos;s try,&quot; and
                that mindset has helped me pick up skills across different
                design niches.
              </p>
              <p>
                Over the years, I&apos;ve had the chance to bring brands to
                life, collaborate with national organizations both locally and
                internationally, and just enjoy the process of creating.
              </p>
            </div>
          </div>

          {/* CENTER CARD STACK */}
          <div className="flex justify-center lg:col-span-4">
            <CardStack />
          </div>

          {/* RIGHT TEXT + BUTTONS */}
          <div className="lg:col-span-4">
            <div
              className="rounded-xl bg-black/30 p-4 sm:p-5 md:p-6 backdrop-blur-[1px]"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,.10), 0 0 24px rgba(0,0,0,.35)",
              }}
            >
              <div className="space-y-4 text-[13px] leading-relaxed text-gray-200 sm:text-sm">
                <p>
                  I&apos;ve also worked across different teams, building my soft
                  skills and doing my best to make sure my designs solve real
                  problems—because at the end of the day, isn&apos;t that what
                  design is all about?
                </p>
                <p>
                  And since I find the construction industry super fascinating
                  (I studied Quantity Surveying, by the way), I like to think
                  I&apos;m discovering my purpose in connecting design and
                  construction…
                </p>
                <p>or maybe it&apos;s the other way around.</p>
              </div>

              {/* actions row */}
              <div className="mt-10 flex items-center gap-3 sm:mt-16">
                {/* Download resume */}
                <a
                  href="#"
                  className="
                    group inline-flex items-center gap-2 rounded-full
                    border border-lime-400 px-4 py-2 text-xs font-medium text-lime-400
                    shadow-[0_0_20px_rgba(132,255,0,.25)]
                    transition-all
                    hover:bg-lime-400 hover:text-black
                    hover:shadow-[0_0_30px_rgba(132,255,0,.45)]
                    hover:-translate-y-0.5 active:translate-y-0
                  "
                >
                  <FaDownload className="text-lime-400 transition-colors group-hover:text-black" />
                  Download Resume
                </a>

                {/* Social icons */}
                <div className="ml-auto flex items-center gap-2">
                  {[FaLinkedinIn, FaFacebookF, FaTwitter].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-md border border-white/15 bg-black/40 text-white/80
                        transition-all
                        hover:bg-lime-400 hover:text-black
                        hover:-translate-y-0.5 active:translate-y-0
                        focus:outline-none focus:ring-2 focus:ring-lime-400/70
                      "
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BriefInfo;
