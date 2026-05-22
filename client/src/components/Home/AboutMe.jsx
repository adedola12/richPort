// src/components/Home/AboutMe.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import TypingText from "../common/TypingText";
import myImg from "../../assets/myImg.jpg";
import {
  FaDownload,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const AboutMe = () => {
  const [nameReady, setNameReady] = useState(false);
  const [leftDone, setLeftDone] = useState(false);
  const [rightDone, setRightDone] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-20 lg:py-24">
      {/* soft green glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-lime-500/15 blur-[180px]" />
        <div className="absolute right-[-80px] bottom-[-40px] h-96 w-96 rounded-full bg-lime-500/20 blur-[220px]" />
      </div>

      <div className="relative mx-auto max-w-[1377px] px-4 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-[minmax(0,455px)_auto_minmax(0,455px)] lg:items-start lg:gap-14">
          {/* ---- LEFT TEXT BLOCK ---- */}
          <div className="flex flex-col items-start gap-4 text-left lg:pt-[84px]">
            {/* pill */}
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
              <TypingText
                as="span"
                text="Hi there, I'm…"
                delay={0.1}
                wordStep={0.09}
                onComplete={() => setNameReady(true)}
                className="text-xs font-semibold tracking-tight text-white"
              />
            </div>

            {/* Name heading */}
            <h2
              className="
                text-3xl sm:text-4xl lg:text-5xl xl:text-[56px]
                font-['Outfit'] font-medium
                leading-tight lg:leading-[1.1]
                tracking-[-0.05em]
                text-white mb-[-9px] lg:mb-[-18px]
              "
            >
              <TypingText
                as="span"
                text="Richard Enoch"
                startWhen={nameReady}
                delay={0}
                wordStep={0.1}
                onComplete={() => setLeftDone(true)}
                className="inline-block"
              />
            </h2>

            {/* Left paragraphs */}
            <TypingText
              as="p"
              startWhen={leftDone}
              delay={0}
              wordStep={0.03}
              onComplete={() => setRightDone(true)}
              text={`Design, for me, is simply giving life to the many ideas constantly buzzing in my head. I love to draw, play with colors, and explore the endless possibilities that come from starting with a blank canvas.

I'm a multidisciplinary designer, and I've been on this roller coaster for about 6 years now. Over the years, I've had the chance to bring brands to life, collaborate with national organizations both locally and internationally, and just enjoy the process of creating.`}
              className="mt-2 text-[15px] sm:text-[16px] leading-[1.65] text-neutral-200 whitespace-pre-line"
            />
          </div>

          {/* ---- CENTER IMAGE ---- */}
          <motion.div
            className="relative my-4 flex items-center justify-center lg:my-0"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
              delay: 0.4,
            }}
          >
            <div className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full bg-lime-500/30 blur-[140px] sm:h-80 sm:w-80" />

            {/* Figma: 350×468 image card with subtle border */}
            <div
              className="
                group relative
                h-[380px] w-[270px] sm:h-[430px] sm:w-[310px] lg:h-[468px] lg:w-[350px] lg:mt-15
                overflow-hidden rounded-xl
                border border-lime-400/70
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
          </motion.div>

          {/* ---- RIGHT TEXT + CTAs ---- */}
          <div className="flex flex-col items-start gap-12 text-left lg:pt-[133px]">
            <TypingText
              as="p"
              startWhen={rightDone}
              delay={0}
              wordStep={0.03}
              text={`I've also worked across different teams, building my soft skills and doing my best to make sure my designs solve real problems—because at the end of the day, isn't that what design is all about?

And since I find the construction industry super fascinating (I studied Quantity Surveying, by the way), I like to think I'm discovering my purpose in connecting design and construction…

or maybe it's the other way around.`}
              className="text-[15px] sm:text-[16px] leading-[1.65] text-neutral-200 whitespace-pre-line"
            />

            {/* View Resume button + social icons — Figma style */}
            <div className="flex items-center gap-2 lg:mt-[-40px] mt-[-20px]">
              {/* Resume button — Figma: outlined lime with download icon */}
              <a
                href="https://drive.google.com/file/d/1w5qINYx_2s5n-84u1TT-318FajFoRQmh/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="
                  group inline-flex items-center gap-2 rounded-[12px]
                  border border-lime-400 px-5 py-2.5
                  text-[13px] font-medium text-lime-400
                  shadow-[0_0_20px_rgba(132,255,0,.2)]
                  transition-all
                  hover:bg-lime-400 hover:text-black
                  hover:shadow-[0_0_30px_rgba(132,255,0,.45)]
                  hover:-translate-y-0.5 active:translate-y-0
                "
              >
                <FaDownload className="text-[11px] text-lime-400 transition-colors group-hover:text-black" />
                View Resume
              </a>

              {/* Social icons — Figma: circular lime-bordered */}
              {[
                {
                  href: "https://www.linkedin.com/in/richardenoch/",
                  label: "LinkedIn",
                  Icon: FaLinkedinIn,
                },
                {
                  href: "https://x.com/richardenoch_",
                  label: "Twitter",
                  Icon: FaTwitter,
                },
                {
                  href: "https://www.instagram.com/therichardenoch",
                  label: "Instagram",
                  Icon: FaInstagram,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="
                    flex items-center justify-center
                    w-[39px] h-[39px] rounded-[6px]
                    border border-lime-400
                    bg-gradient-to-b from-lime-400 to-lime-600
                    transition
                    hover:shadow-[0_0_14px_rgba(132,204,22,0.7)]
                    hover:-translate-y-0.5
                  "
                >
                  <Icon className="text-black text-[15px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
