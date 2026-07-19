// src/pages/TabStudioProject.jsx
// Tabstudio — Brand Identity Case Study
// Template page for brand identity projects: outcome first, then the
// client, the problem, the idea, the system, the proof.

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BrandGallery from "../components/ProjectPage/BrandGallery";
import GuidelineCarousel from "../components/ProjectPage/GuidelineCarousel";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";
import { buttonClasses } from "../components/ui";

/* ── artwork ── */
import imgBuildingWall from "../assets/TabStudio/building-wall.webp";
import imgBillboard from "../assets/TabStudio/billboard.webp";
import imgWindowPoster from "../assets/TabStudio/window-poster.webp";
import imgBizCard from "../assets/TabStudio/biz-card.webp";
import imgCardNotebook from "../assets/TabStudio/card-notebook.webp";
import imgStationeryDark from "../assets/TabStudio/stationery-dark.webp";
import imgIdCards from "../assets/TabStudio/id-cards.webp";
import imgTees from "../assets/TabStudio/tees.webp";
import imgSweatshirt from "../assets/TabStudio/sweatshirt.webp";
import imgWristbands from "../assets/TabStudio/wristbands.webp";
import imgTote from "../assets/TabStudio/tote.webp";
import imgNotebook from "../assets/TabStudio/notebook.webp";
import imgWindowAlt from "../assets/TabStudio/TS_7.jpg";
import imgRationale from "../assets/TabStudio/logo-rationale.webp";

/* ── guideline spreads (verified pages from the 48-page document) ── */
import gp01 from "../assets/TabStudio/guideline/p01.webp";
import gp07 from "../assets/TabStudio/guideline/p07.webp";
import gp09 from "../assets/TabStudio/guideline/p09.webp";
import gp11 from "../assets/TabStudio/guideline/p11.webp";
import gp15 from "../assets/TabStudio/guideline/p15.webp";
import gp19 from "../assets/TabStudio/guideline/p19.webp";
import gp20 from "../assets/TabStudio/guideline/p20.webp";
import gpCal from "../assets/TabStudio/guideline/p28.webp"; // Cal Sans
import gpUrb from "../assets/TabStudio/guideline/p29.webp"; // Urbanist
import gp35 from "../assets/TabStudio/guideline/p35.webp";
import gp41 from "../assets/TabStudio/guideline/p41.webp";
import gp45 from "../assets/TabStudio/guideline/p45.webp";
import gp48 from "../assets/TabStudio/guideline/p48.webp";

/* Portfolio accent (lime) drives the page's labels, headings and CTAs. */
const G = "#a3e635";

/* Tabstudio's own brand colours, from the guideline, shown as swatches only. */
const SWATCHES = [
  { hex: "#07D06F", name: "Vibrant Green", role: "Primary accent. Growth, creativity, fresh beginnings.", dark: true },
  { hex: "#024553", name: "Deep Navy", role: "The core. Trust, structure, strategic focus.", dark: false },
  { hex: "#B0E507", name: "Citrus Lime", role: "Energy highlight, used with restraint.", dark: true },
  { hex: "#171614", name: "Jet Black", role: "Anchor and contrast for type and grids.", dark: false },
  { hex: "#EAF4F6", name: "Ice Blue", role: "Calm, balance, breathing space.", dark: true },
];

/* ─── hero intro animation (plays once on load) ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/* ─── bidirectional scroll reveal ───
   Fades and lifts in as the block enters from below, and out as it leaves
   toward the top. Reverses cleanly when scrolling back up, so blocks reveal
   from whichever edge they cross. A wide flat middle keeps them steady while
   centred in the viewport. */
const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [46, 0, 0, -46]);
  const filter = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]);
  return (
    <motion.div ref={ref} className={className} style={{ opacity, y, filter }}>
      {children}
    </motion.div>
  );
};

const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: G }}>
    {n} — {t}
  </p>
);

const H2 = ({ white, accent }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.08] tracking-[-0.02em]">
    <span className="text-white">{white} </span>
    <span style={{ color: G }}>{accent}</span>
  </h2>
);

const Frame = ({ src, alt, ratio = "16/9", className = "" }) => (
  <div className={`w-full rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-center" />
  </div>
);

const TabStudioProject = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white font-['Outfit']">
    <PageMeta
      title="Tabstudio — Brand Identity"
      description="Brand identity case study for Tabstudio, a video media agency founded by three creatives. One mark that reads as a play button on the surface and spells T, A and B underneath."
      url="/projects/tabstudio"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: "#02455355" }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: `${G}10` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative w-full min-h-[78vh] flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img src={imgStationeryDark} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(7,9,12,0.5) 0%, rgba(7,9,12,0.4) 35%, rgba(7,9,12,0.94) 70%, #07090C 100%)" }}
          />
        </div>

        <div className="relative z-10 mt-auto px-4 sm:px-8 pt-28 pb-16">
          <div className="max-w-[820px] mx-auto flex flex-col items-center text-center">
            <FadeUp>
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-7"
                style={{ borderColor: `${G}44`, color: G, background: `${G}0D` }}>
                Brand Identity Case Study
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-semibold leading-none tracking-[-0.03em] mb-5"
                style={{ background: "linear-gradient(180deg, #ffffff 0%, #9a9a9a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Tabstudio
              </h1>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-white/65 max-w-[600px]">
                Three founders, a video media agency, and a name carrying two ideas at once.
                The mark that came out of it reads as a play button on the surface
                and quietly spells <span style={{ color: G }}>T, A and B</span> underneath.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ SNAPSHOT + THE SHORT VERSION ══ */}
      <section className="py-14 sm:py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-12">
              {[
                { label: "CLIENT", value: "Tab Studio" },
                { label: "INDUSTRY", value: "Video & Motion", accent: true },
                { label: "ROLE", value: "Sole Brand Designer" },
                { label: "SCOPE", value: "Full Identity System" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="sm:px-8 first:pl-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                  <p className="text-lg sm:text-xl font-bold" style={accent ? { color: G } : {}}>{value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border p-7 sm:p-9" style={{ borderColor: `${G}30`, background: `${G}07` }}>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: G }}>The short version</p>
              <p className="text-[16px] sm:text-[18px] leading-[1.7] text-white/70">
                Three founders started a video agency and needed a face for it.
                I gave them one mark that works like a coin: look at it straight and it is a play button,
                turn it and it spells their initials. That single idea grew into a five colour system,
                a 48 page guideline, and a modern, scalable identity the team can run without me.
                Here is how it happened.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 01 — THE CLIENT ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <Reveal>
              <SLabel n="01" t="THE CLIENT" />
              <H2 white="A video agency named after" accent="its own habits" />
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>Tab Studio is a video media agency. Editing, animation, motion graphics, that whole lane. Three founders came together to build it, and the name carries two ideas at once: their initials, T, A and B, and the tabs you keep open when you are deep in work, jumping between projects.</p>
                <p>They serve startups, creators, media teams and tech brands, and they wanted an identity that felt like a real creative studio. Something modern and scalable that could hold its own in the African creative economy and signal what they do without spelling it out.</p>
              </div>
            </Reveal>
            <Reveal className="h-full">
              <Frame src={imgCardNotebook} alt="Tabstudio business card resting on a branded notebook" ratio="4/3" className="h-full" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 02 — THE CHALLENGE ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="02" t="THE CHALLENGE" />
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.08] tracking-[-0.02em]">
              <span className="text-white">The problem was not taste.</span><br />
              <span style={{ color: "#E05252" }}>It was translation.</span>
            </h2>
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
              <p>Tab Studio came to me as three founders and a name, not a brand yet. And that name was already doing a lot of work. It held their initials, T, A and B, and it held the way they actually operate, tabs open, moving between projects. My job was to take all of that, the video craft, the multitasking, the three people behind it, and press it into one mark. Say it in a single shape, and say it without being literal.</p>
              <p>That is a harder brief than it sounds. Most of this project was not drawing, it was searching. Round after round of directions, geometric, fluid, symbolic, typographic, until one shape finally carried everything at once.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 03 — THE IDEA ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="03" t="THE IDEA" />
            <H2 white="A mark you keep" accent="discovering" />
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: G }} />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>The breakthrough was a rounded triangle. At first glance it is a play button, and for a video studio that is the entire world. It is the symbol every story sits under, the click that starts everything. That alone would have made a clean logo. It is not where I stopped.</p>
              <p>Sit with the shape and it keeps giving. The triangle reads as forward motion, then as a human figure leaning in, and then, from the right angle, the form resolves into T, A and B. The founders are signed into their own mark without a single letter spelled out loud. Someone glances and sees play. Someone leans in and finds the name. In a creative industry, the people who look twice are exactly the people worth rewarding.</p>
              <p>The geometry is doing quiet work too. A triangle is the most stable shape there is, which is the promise sitting under the creativity: ideas here do not just spark, they get built. The rounded corners keep it human instead of clinical. Structured execution, wrapped in a shape that still feels warm. That is Tab Studio, held in one mark.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={imgRationale} alt="The Tabstudio logo rationale showing the play icon, forward movement, a human avatar, and the letters T, a and b, all read from one mark" loading="lazy" className="w-full h-auto" />
            </div>
            <p className="mt-4 text-[14px] text-white/40 leading-relaxed max-w-[640px]">
              The rationale spread from the guideline. One mark, six ways to read it: play, forward movement, a human figure, then T, a and b.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-14 text-center py-8">
              <p className="text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">The voice, in one line</p>
              <p className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[-0.02em] leading-tight">
                <span className="text-white">"The studio where creativity</span>{" "}
                <span style={{ color: G }}>becomes clarity."</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 04 — THE SYSTEM ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="04" t="THE SYSTEM" />
            <H2 white="Five colours with" accent="assigned jobs" />
            <div className="mt-6 max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-12">
              <p>I will be honest, I did not start here. My first instinct was an orange direction, warm and loud. The founders kept pulling toward a deep, considered green, and instead of defending my pitch, I went looking for whether they were onto something. They were.</p>
              <p>Green is not just a nice colour. Think about what it actually signals: growth, success, fresh beginnings, something alive and built to last. For a young studio whose whole promise is helping clients grow and stay relevant as trends shift, that is not decoration, it is the thesis. Once I could see the reasoning, the palette stopped being a preference and turned into a system.</p>
              <p>So I built one where every colour has a job. Nothing sits in the palette by accident.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              {SWATCHES.map(({ hex, name, role, dark }) => (
                <div key={hex} className="rounded-2xl overflow-hidden border border-white/8">
                  <div className="h-20 sm:h-24 flex items-end p-3" style={{ background: hex }}>
                    <span className="text-[10px] font-mono font-bold" style={{ color: dark ? "#0b0b0b" : "#ffffff" }}>{hex}</span>
                  </div>
                  <div className="p-3 bg-white/[0.02]">
                    <p className="text-[12px] font-semibold text-white mb-1">{name}</p>
                    <p className="text-[11px] leading-[1.5] text-white/40">{role}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/25 mb-16">Names, roles and values from the official guideline.</p>
          </Reveal>

          {/* Typography */}
          <Reveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-3">TYPOGRAPHY</p>
            <p className="text-[20px] sm:text-[22px] font-semibold text-white mb-5">Cal Sans leads, Urbanist supports</p>
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>Cal Sans carries the display work. Its geometric structure gives the brand a clean, contemporary presence, but the smooth curves and balanced proportions keep it from feeling cold, which matters, because Tab Studio is warm and human, not corporate. It holds its weight at large sizes without shouting, so titles and statements land with just enough personality.</p>
              <p>Urbanist does the quiet, heavy lifting underneath: body copy, captions, UI labels, motion graphics. Clean, modern and endlessly versatile, readable everywhere from a phone screen to a printed poster. Cal Sans for the moments that need presence, Urbanist for everything that simply needs to work. Together they give the studio a voice that is modern, cohesive, and unmistakably its own.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/8" style={{ aspectRatio: "210 / 297" }}>
                <img src={gpCal} alt="Cal Sans, the primary display typeface, from the Tabstudio guideline" loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/8" style={{ aspectRatio: "210 / 297" }}>
                <img src={gpUrb} alt="Urbanist, the secondary typeface, from the Tabstudio guideline" loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 05 — IN THE WILD ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="05" t="IN THE WILD" />
            <H2 white="A brand is not real until" accent="you can hold it" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[620px] mb-14">
              Mockups are the stress test. If an identity only works on a slide, it does not work.
            </p>
          </Reveal>

          <div className="space-y-16">
            {[
              {
                img: imgBillboard,
                title: "On the street",
                body: "The launch line went where launch lines belong, twenty feet up. Open a New Tab works as an ad because it works as an idea first. It is the name, the metaphor and the invitation in four words.",
              },
              {
                img: imgIdCards,
                title: "Inside the studio",
                body: "Identity starts with the people making the work. ID cards and lanyards mean the brand is not just something Tab Studio sells. It is something the team wears into every meeting.",
              },
              {
                img: imgTees,
                title: "On the team",
                body: "The outlined mark wraps the apparel so the clothes feel designed, not just printed. Merch people actually want to wear does more marketing than most ads.",
              },
            ].map(({ img, title, body }) => (
              <Reveal key={title}>
                <div className="flex flex-col gap-5">
                  <div className="max-w-[560px]">
                    <p className="text-[17px] font-semibold text-white mb-2">{title}</p>
                    <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/50">{body}</p>
                  </div>
                  <Frame src={img} alt={`${title}. Tabstudio brand application`} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 06 — DECISIONS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <SLabel n="06" t="DECISIONS" />
            <H2 white="Three calls that" accent="shaped it" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[560px] mb-12">
              Every identity is a series of small choices. These are the three that mattered most here.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                q: "The mark had to earn a second look",
                a: "A video agency logo that is only a play button is a cliche. A monogram that is only initials says nothing about the work. Weaving one into the other gave the mark a surface read for everyone and a hidden read for the curious. Depth without noise.",
              },
              {
                q: "Trusting the client's instinct, then proving it",
                a: "I pitched orange. They pulled toward green. Rather than defend my idea, I went and found the reasoning behind theirs, growth, success, longevity, and it held up. So I committed fully and built a tight system around that one green instead of hedging with extra colours. The best call I made here was knowing when the client was right.",
              },
              {
                q: "Selling the idea, not just the shape",
                a: "I did not hand over a logo file and hope. I built a presentation that walked the founders through the play button, the motion, and the hidden initials, one layer at a time. The story earned the buy in. The shape only confirmed it.",
              },
            ].map(({ q, a }, i) => (
              <Reveal key={q}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 h-full flex flex-col gap-3">
                  <span className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase w-fit" style={{ background: `${G}15`, color: G }}>
                    Decision 0{i + 1}
                  </span>
                  <p className="text-[15px] font-semibold text-white leading-snug">{q}</p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 flex-1">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 07 — INSIDE THE GUIDELINE ══ */}
      <GuidelineCarousel
        n="07"
        label="INSIDE THE GUIDELINE"
        white="48 pages,"
        accent="documented"
        description="Voice, logo system, colour rules, typography and usage, all written down so the brand survives without me in the room. Scroll through the spreads, or skip ahead to the rest of the project."
        color={G}
        orientation="portrait"
        skipLabel="Skip to gallery"
        slides={[
          { src: gp01, alt: "Cover. Defining the visual foundation of Tabstudio" },
          { src: gp07, alt: "Brand tone and voice" },
          { src: gp09, alt: "Logo rationale" },
          { src: gp11, alt: "Logo spacing and clear space" },
          { src: gp15, alt: "The icon mark" },
          { src: gp19, alt: "Colour rationale" },
          { src: gp20, alt: "Colour usage and the official palette" },
          { src: gpCal, alt: "Typography. Cal Sans" },
          { src: gpUrb, alt: "Typography. Urbanist" },
          { src: gp35, alt: "Brand in use. Apparel" },
          { src: gp45, alt: "Brand in use. Stationery" },
          { src: gp41, alt: "Brand in use. Open a New Tab billboard" },
        ]}
      />

      {/* ══ 08 — GALLERY ══ */}
      <BrandGallery
        n="08"
        label="THE FULL SET"
        white="Everything the project"
        accent="produced"
        description="Every application designed for Tab Studio, in one place. Tap any piece to view it full size."
        color={G}
        images={[
          { src: imgBuildingWall, alt: "Building wall branding with the studio tagline", label: "BUILDING WALL" },
          { src: imgBillboard, alt: "Open a New Tab launch billboard", label: "BILLBOARD" },
          { src: imgWindowPoster, alt: "Street window poster", label: "WINDOW POSTER" },
          { src: imgBizCard, alt: "Business card set", label: "BUSINESS CARDS" },
          { src: imgCardNotebook, alt: "Business card on branded notebook", label: "CARD & NOTEBOOK" },
          { src: imgStationeryDark, alt: "Full stationery suite on dark", label: "STATIONERY" },
          { src: imgIdCards, alt: "Staff ID cards on lanyards", label: "ID CARDS" },
          { src: imgTees, alt: "Team t-shirts with the outlined mark", label: "T-SHIRTS" },
          { src: imgSweatshirt, alt: "Branded sweatshirt", label: "SWEATSHIRT" },
          { src: imgWristbands, alt: "Wristbands in the brand colours", label: "WRISTBANDS" },
          { src: imgTote, alt: "Tote bag with the studio tagline", label: "TOTE BAG" },
          { src: imgNotebook, alt: "Navy branded notebook", label: "NOTEBOOK" },
          { src: imgWindowAlt, alt: "Window poster, alternate angle", label: "WINDOW II" },
        ]}
      />

      {/* ══ 09 — WHAT IT DID ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <SLabel n="09" t="WHAT IT DID" />
            <H2 white="The coin still" accent="flips" />
            <div className="mt-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/60">
              <p>The founders loved it, and the mark became the foundation for the full identity: the logo system, the green palette, the guideline, and the merch. Tab Studio now walks into the African creative economy looking like what it actually is, a studio with structure under its creativity.</p>
              <p>It is one of the projects I am proudest of, mostly because of that coin. Same icon, different angles. You get T, A and B, and it still reads as play. When a mark can hold that much meaning and stay that simple, the rest of the system almost designs itself.</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-12 rounded-2xl border p-7 sm:p-9 text-center" style={{ borderColor: `${G}30`, background: `${G}07` }}>
              <p className="text-[17px] sm:text-[19px] font-semibold text-white mb-2">Your brand could be the next case study here.</p>
              <p className="text-[14px] text-white/50 mb-6">Every project like this starts the same way: pick a plan, answer a short questionnaire, and we begin.</p>
              <Link
                to="/rate-details"
                className={buttonClasses("primary", "md")}
              >
                See the plans
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <OtherProj currentSlug="tabstudio" currentKind="default" />
      <BuildSection />
    </div>
  </div>
);

export default TabStudioProject;
