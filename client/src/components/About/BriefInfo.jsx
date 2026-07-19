import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import { useNavigate } from "react-router-dom";
import {
  Download01Icon,
  Linkedin01Icon,
  TwitterIcon,
  InstagramIcon,
} from "hugeicons-react";

// swap these imports for your real images
import ownImg from "../../assets/ownImg.webp";
import ownImg1 from "../../assets/ownImg1.jpg";
import ownImg2 from "../../assets/ownImg2.webp";

/* --- CARD DATA --------------------------------------------------------- */

const cardData = [
  { src: ownImg, name: "", role: "" },
  { src: ownImg1, name: "", role: "" },
  { src: ownImg2, name: "", role: "" },
];

/* --- 3D CAROUSEL CARD STACK -------------------------------------------- */

function CardStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Bring a clicked card to the front
  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  const handleDetour = () => {
    navigate("/projects");
  };

  const angleStep = 360 / cardData.length;
  const radius = 380; // distance from center in 3D space

  return (
    <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] md:max-w-[520px]">
      {/* Reserve vertical space so layout doesn't jump */}
      <div className="h-[420px] sm:h-[460px] md:h-[520px]" />

      {/* 3D carousel container (pushed slightly down from the title) */}
      <div
        className="absolute inset-x-0 top-6 sm:top-8 md:top-10 flex items-center justify-center z-10"
        style={{
          perspective: "1400px",
        }}
      >
        <div
          className="
            relative
            h-[340px] w-[300px]
            sm:h-[380px] sm:w-[340px]
            md:h-[420px] md:w-[380px]
          "
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {cardData.map((card, index) => {
            // Compute angle relative to the active card
            let angle = angleStep * (index - currentIndex);

            // Normalize angle to [-180, 180]
            if (angle > 180) angle -= 360;
            if (angle < -180) angle += 360;

            const rad = (angle * Math.PI) / 180;

            // Depth factor (1 = front, -1 = back)
            const depth = Math.cos(rad);

            // Scale + opacity based on depth
            const scale = 0.8 + 0.2 * ((depth + 1) / 2); // ~0.8 to 1.0
            const opacity = 0.3 + 0.7 * ((depth + 1) / 2); // ~0.3 to 1.0

            const translateZ = radius * depth; // move closer/farther

            return (
              <figure
                key={index}
                className="
                  absolute left-1/2 top-1/2
                  rounded-2xl overflow-hidden
                  bg-black/60
                  cursor-pointer
                "
                style={{
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transform: `
                    translate(-50%, -50%)
                    rotateY(${angle}deg)
                    translateZ(${translateZ}px)
                    scale(${scale})
                  `,
                  opacity,
                  boxShadow: `
                    inset 0 0 0 2px rgba(132,255,0,.9),
                    0 0 28px rgba(132,255,0,.45),
                    0 0 60px rgba(132,255,0,.28)
                  `,
                  transition:
                    "transform 1s cubic-bezier(0.2,0.8,0.2,1), opacity 0.9s ease-out",
                  zIndex: Math.round(depth * 100),
                }}
                onClick={() => handleCardClick(index)}
              >
                <img
                  src={card.src}
                  alt={card.name || `Gallery card ${index + 1}`}
                  className="h-full w-full object-cover"
                  style={{
                    filter:
                      depth > 0.6 ? "none" : "grayscale(45%) brightness(0.9)",
                  }}
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

                {/* caption placeholder */}
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-3 sm:p-4 text-center text-[11px] sm:text-xs text-gray-200" />
              </figure>
            );
          })}
        </div>
      </div>

      {/* "Take a quick detour" button under stack - now safely clear of cards */}
      <div className="mt-12 flex justify-center relative z-20">
        <button
          type="button"
          onClick={handleDetour}
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
          <TypingText
            as="h3"
            text="How about a brief"
            delay={0.1}
            className="text-xs sm:text-sm tracking-[0.18em] text-white/80 uppercase"
          />

          <div
            className="mt-2 text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-[-0.04em]"
          >
            <TypingText as="span" text="brief introduction" delay={0.3} />
          </div>
        </div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* LEFT TEXT BLOCK – TypingText paragraphs */}
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-[26rem] space-y-6 text-center">
              <TypingText
                as="p"
                delay={0.2}
                wordStep={0.03}
                text="Design, for me, is simply giving life to the many ideas constantly buzzing in my head. I love to draw, play with colors, and explore the endless possibilities that come from starting with a blank canvas."
                className="text-[13px] leading-relaxed text-gray-200 sm:text-sm"
              />
              <TypingText
                as="p"
                delay={0.4}
                wordStep={0.03}
                text={`I'm a multidisciplinary designer, and I've been on this roller coaster for about 6 years now. My style has always been "Well, I think I can, so let's try," and that mindset has helped me pick up skills across different design niches.`}
                className="text-[13px] leading-relaxed text-gray-200 sm:text-sm"
              />
              <TypingText
                as="p"
                delay={0.6}
                wordStep={0.03}
                text="Over the years, I've had the chance to bring brands to life, collaborate with national organizations both locally and internationally, and just enjoy the process of creating."
                className="text-[13px] leading-relaxed text-gray-200 sm:text-sm"
              />
            </div>
          </div>

          {/* CENTER 3D CARD CAROUSEL */}
          <div className="flex justify-center lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.35,
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <CardStack />
            </motion.div>
          </div>

          {/* RIGHT TEXT + BUTTONS – TypingText + footer-style icons */}
          <div className="lg:col-span-4">
            <motion.div
              className="rounded-xl bg-black/30 p-4 sm:p-5 md:p-6 backdrop-blur-[1px]"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,.10), 0 0 24px rgba(0,0,0,.35)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 0.61, 0.36, 1],
                delay: 0.5,
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="space-y-4">
                <TypingText
                  as="p"
                  delay={0.2}
                  wordStep={0.03}
                  text={`I've also worked across different teams, building my soft skills and doing my best to make sure my designs solve real problems—because at the end of the day, isn't that what design is all about?`}
                  className="text-[13px] leading-relaxed text-gray-200 sm:text-sm"
                />
                <TypingText
                  as="p"
                  delay={0.4}
                  wordStep={0.03}
                  text="And since I find the construction industry super fascinating (I studied Quantity Surveying, by the way), I like to think I'm discovering my purpose in connecting design and construction…"
                  className="text-[13px] leading-relaxed text-gray-200 sm:text-sm"
                />
                <TypingText
                  as="p"
                  delay={0.6}
                  wordStep={0.03}
                  text="or maybe it's the other way around."
                  className="text-[13px] leading-relaxed text-gray-200 sm:text-sm"
                />
              </div>

              {/* actions row */}
              <div className="mt-10 flex items-center gap-3 sm:mt-16">
                {/* Download resume */}
                <a
                  href="https://drive.google.com/file/d/1WZFaZYB2xLCnCZPqQ9197EK4kB36UXmt/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
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
                  <Download01Icon size={16} className="text-lime-400 transition-colors group-hover:text-black" />
                  Download Resume
                </a>

                {/* Social icons – same style & links as footer */}
                <div className="ml-auto flex items-center gap-2.5">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/richardenoch/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="
                      flex items-center justify-center
                      w-9 h-9
                      rounded-md
                      border border-neutral-700
                      bg-gradient-to-b from-neutral-900 to-neutral-800
                      hover:border-lime-400 hover:shadow-[0_0_14px_rgba(132,204,22,0.7)]
                      transition
                    "
                  >
                    <span
                      className="
                        flex items-center justify-center
                        w-6 h-6
                        rounded-full
                        bg-gradient-to-b from-lime-400 to-lime-600
                      "
                    >
                      <Linkedin01Icon size={18} className="text-black" />
                    </span>
                  </a>

                  {/* Twitter / X */}
                  <a
                    href="https://x.com/richardenoch_"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                    className="
                      flex items-center justify-center
                      w-9 h-9
                      rounded-md
                      border border-neutral-700
                      bg-gradient-to-b from-neutral-900 to-neutral-800
                      hover:border-lime-400 hover:shadow-[0_0_14px_rgba(132,204,22,0.7)]
                      transition
                    "
                  >
                    <span
                      className="
                        flex items-center justify-center
                        w-6 h-6
                        rounded-full
                        bg-gradient-to-b from-lime-400 to-lime-600
                      "
                    >
                      <TwitterIcon size={18} className="text-black" />
                    </span>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/therichardenoch"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="
                      flex items-center justify-center
                      w-9 h-9
                      rounded-md
                      border border-neutral-700
                      bg-gradient-to-b from-neutral-900 to-neutral-800
                      hover:border-lime-400 hover:shadow-[0_0_14px_rgba(132,204,22,0.7)]
                      transition
                    "
                  >
                    <span
                      className="
                        flex items-center justify-center
                        w-6 h-6
                        rounded-full
                        bg-gradient-to-b from-lime-400 to-lime-600
                      "
                    >
                      <InstagramIcon size={18} className="text-black" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BriefInfo;
