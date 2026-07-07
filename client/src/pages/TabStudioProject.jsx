// src/pages/TabStudioProject.jsx
// Tabstudio — Brand Identity Case Study
// Template page for brand identity projects: outcome first, then the
// client, the problem, the idea, the system, the proof.

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import BrandGallery from "../components/ProjectPage/BrandGallery";
import GuidelineCarousel from "../components/ProjectPage/GuidelineCarousel";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

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
import imgLanyards from "../assets/TabStudio/TS_3.jpg";
import imgWristStack from "../assets/TabStudio/TS_5.jpg";
import imgWristSpread from "../assets/TabStudio/TS_6.jpg";
import imgWindowAlt from "../assets/TabStudio/TS_7.jpg";
import imgRationale from "../assets/TabStudio/logo-rationale.webp";

/* ── guideline spreads (curated from the 48-page document) ── */
import tg01 from "../assets/TabStudio/guideline/g01.webp";
import tg05 from "../assets/TabStudio/guideline/g05.webp";
import tg07 from "../assets/TabStudio/guideline/g07.webp";
import tg09 from "../assets/TabStudio/guideline/g09.webp";
import tg13 from "../assets/TabStudio/guideline/g13.webp";
import tg15 from "../assets/TabStudio/guideline/g15.webp";
import tg18 from "../assets/TabStudio/guideline/g18.webp";
import tg19 from "../assets/TabStudio/guideline/g19.webp";
import tg23 from "../assets/TabStudio/guideline/g23.webp";
import tg29 from "../assets/TabStudio/guideline/g29.webp";
import tg36 from "../assets/TabStudio/guideline/g36.webp";
import tg44 from "../assets/TabStudio/guideline/g44.webp";
import tg47 from "../assets/TabStudio/guideline/g47.webp";
import tg48 from "../assets/TabStudio/guideline/g48.webp";

/* ── official brand colours, from the guideline (page 15, Color Usage) ── */
const GREEN = "#07D06F"; // Vibrant Green — primary accent
const NAVY = "#024553";  // Deep Navy — core brand colour
const LIME = "#B0E507";  // Citrus Lime — energy highlight
const INK = "#171614";   // Jet Black — anchor & contrast
const ICE = "#EAF4F6";   // Ice Blue — support & balance

/* ─── animation primitives ─── */
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

const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: GREEN }}>
    {n} — {t}
  </p>
);

const H2 = ({ white, accent }) => (
  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.08] tracking-[-0.02em]">
    <span className="text-white">{white} </span>
    <span style={{ color: GREEN }}>{accent}</span>
  </h2>
);

const Frame = ({ src, alt, ratio = "16/9", className = "" }) => (
  <div className={`w-full rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-center" />
  </div>
);

const TabStudioProject = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white overflow-x-hidden font-['Outfit']">
    <PageMeta
      title="Tabstudio — Brand Identity"
      description="Brand identity case study for Tabstudio, a video media agency founded by three creatives. One mark that reads as a play button on the surface and spells T, A and B underneath."
      url="/projects/tabstudio"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: `${NAVY}55` }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: `${GREEN}10` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative w-full min-h-[78vh] flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={imgStationeryDark}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(7,9,12,0.5) 0%, rgba(7,9,12,0.4) 35%, rgba(7,9,12,0.94) 70%, #07090C 100%)" }}
          />
        </div>

        <div className="relative z-10 mt-auto px-4 sm:px-8 pt-28 pb-16">
          <div className="max-w-[820px] mx-auto flex flex-col items-center text-center">
            <FadeUp>
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-7"
                style={{ borderColor: `${GREEN}44`, color: GREEN, background: `${GREEN}0D` }}>
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
                and quietly spells <span style={{ color: GREEN }}>T, A and B</span> underneath.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ SNAPSHOT + THE SHORT VERSION ══ */}
      <section className="py-14 sm:py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-12">
              {[
                { label: "CLIENT", value: "Tab Studio" },
                { label: "INDUSTRY", value: "Video & Motion", accent: true },
                { label: "ROLE", value: "Sole Brand Designer" },
                { label: "SCOPE", value: "Identity to Website" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="sm:px-8 first:pl-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                  <p className="text-lg sm:text-xl font-bold" style={accent ? { color: GREEN } : {}}>{value}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="rounded-2xl border p-7 sm:p-9" style={{ borderColor: `${GREEN}30`, background: `${GREEN}07` }}>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: GREEN }}>The short version</p>
              <p className="text-[16px] sm:text-[18px] leading-[1.7] text-white/70">
                Three founders started a video agency and needed a face for it.
                I gave them one mark that works like a coin: look at it straight and it is a play button,
                turn it and it spells their initials. That idea grew into a five colour system,
                a 48 page guideline, and everything through to the website. Here is how it happened.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 01 — THE CLIENT ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeUp>
              <SLabel n="01" t="THE CLIENT" />
              <H2 white="A video agency named after" accent="its own habits" />
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GREEN }} />
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>Tab Studio is a video media agency. Editing, animation, motion graphics, that whole lane. Three founders came together to build it, and the name carries two ideas at once: their initials, T, A and B, and the tabs you keep open when you are deep in work, jumping between projects.</p>
                <p>What they wanted was an identity that felt like a real creative studio. Something that could hold its own in the African creative economy and signal what they do without spelling it out.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.1} className="h-full">
              <Frame src={imgCardNotebook} alt="Tabstudio business card resting on a branded notebook" ratio="4/3" className="h-full" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 02 — THE PROBLEM ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="02" t="THE CHALLENGE" />
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.08] tracking-[-0.02em]">
              <span className="text-white">The problem was not taste.</span><br />
              <span style={{ color: "#E05252" }}>It was translation.</span>
            </h2>
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
              <p>I had a name loaded with meaning and a firm with a clear personality, and the job was to compress all of it into one mark. The video work. The multitasking idea. The three founders. All in a single shape, without going literal.</p>
              <p>Honestly, most of this project was the hunt for the cleanest way to say all of that at once. Round after round of directions until the shape finally clicked.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 03 — THE IDEA ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="03" t="THE IDEA" />
            <H2 white="One icon that reads" accent="three ways" />
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GREEN }} />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-10">
              <p>The mark starts as a rounded triangle, which your eye instantly reads as a play button. Everything video lives under that symbol. It is where every story starts.</p>
              <p>But turn it, look closer, and the same shape resolves into T, A and B. The founders' initials are woven in as a quiet signature rather than a literal spell-out. People who look once see play. People who look twice find the name. That double read is the whole logo.</p>
              <p>The triangular form brings stability and structure, and the rounded edges keep it friendly and human. Which is Tab Studio in one sentence: structured execution wrapped around human-centered creativity.</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={imgRationale} alt="The Tabstudio logo rationale: play icon, forward movement, human avatar, and the letters T, a and b, all read from one mark" loading="lazy" className="w-full h-auto" />
            </div>
            <p className="mt-4 text-[14px] text-white/40 leading-relaxed max-w-[640px]">
              The rationale spread from the guideline. Same icon, different angles: play, forward movement, a human avatar, then T, a and b.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-14 text-center py-8">
              <p className="text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">The voice, in one line</p>
              <p className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[-0.02em] leading-tight">
                <span className="text-white">"The studio where creativity</span>{" "}
                <span style={{ color: GREEN }}>becomes clarity."</span>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 04 — THE SYSTEM ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="04" t="THE SYSTEM" />
            <H2 white="Five colours with" accent="assigned jobs" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[680px] mb-12">
              Fun fact: I originally pitched an orange direction. The client kept pulling toward a deep, moody green, the Diary of a CEO kind of green. They were right, and once we committed I made sure we committed properly. Every colour in the system has one defined job, so the green always leads.
            </p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              {[
                { hex: GREEN, name: "Vibrant Green", role: "Primary accent. Growth, creativity, fresh beginnings.", dark: true },
                { hex: NAVY, name: "Deep Navy", role: "The core. Trust, structure, strategic focus.", dark: false },
                { hex: LIME, name: "Citrus Lime", role: "Energy highlight, used with restraint.", dark: true },
                { hex: INK, name: "Jet Black", role: "Anchor and contrast for type and grids.", dark: false },
                { hex: ICE, name: "Ice Blue", role: "Calm, balance, breathing space.", dark: true },
              ].map(({ hex, name, role, dark }) => (
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
            <p className="text-[11px] text-white/25 mb-14">Names, roles and values from the official guideline.</p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeUp delay={0.08} className="h-full">
              <Frame src={imgBizCard} alt="Tabstudio business cards on deep navy" ratio="4/3" className="h-full" />
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-3">TYPOGRAPHY</p>
              <p className="text-[18px] font-semibold text-white mb-4">Col Sans and Urbanist</p>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>Col Sans leads the display work. It carries clarity and warmth at the same time, which is exactly the balance the brand voice asks for. Urbanist handles the supporting text, versatile enough for anything from captions to long paragraphs.</p>
                <p>Together with the colour rules and the background interaction system in the guideline, any collaborator can put a Tabstudio layout together and it will still feel like the same studio.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 05 — IN THE WILD ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="05" t="IN THE WILD" />
            <H2 white="A brand is not real until" accent="you can hold it" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[620px] mb-14">
              Mockups are the stress test. If an identity only works on a slide, it does not work.
            </p>
          </FadeUp>

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
              <FadeUp key={title}>
                <div className="flex flex-col gap-5">
                  <div className="max-w-[560px]">
                    <p className="text-[17px] font-semibold text-white mb-2">{title}</p>
                    <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/50">{body}</p>
                  </div>
                  <Frame src={img} alt={`${title}. Tabstudio brand application`} />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 06 — DECISIONS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="06" t="DECISIONS" />
            <H2 white="Three calls I" accent="stood by" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[560px] mb-12">
              Every identity is a series of small arguments. These are the three that shaped this one.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                q: "The mark had to earn a second look",
                a: "A video agency logo that is just a play button is a cliche. A monogram that is just initials says nothing about the work. Weaving one into the other gave the mark a surface read for everyone and a hidden read for the curious. Depth without noise.",
              },
              {
                q: "Losing the colour argument, then winning it",
                a: "I pitched orange. The client pulled toward that deep, moody green, and they were right. But once we committed, I fought to keep the palette tight and let that one green carry the brand, instead of drifting back or piling on extra colours. Discipline is what makes a colour feel owned.",
              },
              {
                q: "Selling the idea, not just the shape",
                a: "I did not hand over a logo file and hope. I built a presentation that walked the founders through the play button, the movement, and the hidden initials, step by step. The story earned the buy-in. The shape just confirmed it.",
              },
            ].map(({ q, a }, i) => (
              <FadeUp key={q} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 h-full flex flex-col gap-3">
                  <span className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase w-fit" style={{ background: `${GREEN}15`, color: GREEN }}>
                    Decision 0{i + 1}
                  </span>
                  <p className="text-[15px] font-semibold text-white leading-snug">{q}</p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 flex-1">{a}</p>
                </div>
              </FadeUp>
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
        description="Voice, logo system, colour rules, typography and usage, all written down so the brand survives without me in the room. A curated selection of spreads below."
        color={GREEN}
        slides={[
          { src: tg01, alt: "Cover. Defining the visual foundation of Tabstudio" },
          { src: tg05, alt: "Brand overview" },
          { src: tg07, alt: "Brand tone and voice" },
          { src: tg09, alt: "Logo rationale" },
          { src: tg13, alt: "Primary logo" },
          { src: tg15, alt: "Icon mark" },
          { src: tg18, alt: "Colour rationale" },
          { src: tg19, alt: "Colour usage and the official palette" },
          { src: tg23, alt: "Typography. Col Sans" },
          { src: tg29, alt: "Text and colour pairing" },
          { src: tg36, alt: "Brand in use" },
          { src: tg44, alt: "Brand in use, applications" },
          { src: tg47, alt: "Closing note" },
          { src: tg48, alt: "Back cover" },
        ]}
      />

      {/* ══ 08 — GALLERY ══ */}
      <BrandGallery
        n="08"
        label="THE FULL SET"
        white="Everything the project"
        accent="produced"
        description="Every application designed for Tab Studio, in one place. Tap any piece to view it full size."
        color={GREEN}
        images={[
          { src: imgBuildingWall, alt: "Building wall branding with the studio tagline", label: "BUILDING WALL" },
          { src: imgBillboard, alt: "Open a New Tab launch billboard", label: "BILLBOARD" },
          { src: imgWindowPoster, alt: "Street window poster", label: "WINDOW POSTER" },
          { src: imgBizCard, alt: "Business card set", label: "BUSINESS CARDS" },
          { src: imgCardNotebook, alt: "Business card on branded notebook", label: "CARD & NOTEBOOK" },
          { src: imgStationeryDark, alt: "Full stationery suite on dark", label: "STATIONERY" },
          { src: imgIdCards, alt: "Staff ID cards on lanyards", label: "ID CARDS" },
          { src: imgLanyards, alt: "Lanyard set", label: "LANYARDS" },
          { src: imgTees, alt: "Team t-shirts with the outlined mark", label: "T-SHIRTS" },
          { src: imgSweatshirt, alt: "Mint sweatshirt", label: "SWEATSHIRT" },
          { src: imgWristbands, alt: "Wristbands in the brand colours", label: "WRISTBANDS" },
          { src: imgWristStack, alt: "Wristbands stacked", label: "WRISTBANDS II" },
          { src: imgWristSpread, alt: "Wristbands spread", label: "WRISTBANDS III" },
          { src: imgTote, alt: "Tote bag with the studio tagline", label: "TOTE BAG" },
          { src: imgNotebook, alt: "Navy branded notebook", label: "NOTEBOOK" },
          { src: imgWindowAlt, alt: "Window poster, alternate angle", label: "WINDOW II" },
        ]}
      />

      {/* ══ 09 — WHAT IT DID ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <SLabel n="09" t="WHAT IT DID" />
            <H2 white="The coin still" accent="flips" />
            <div className="mt-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/60">
              <p>The founders loved it, and the mark became the foundation for everything after: the full identity, the guideline, the merch, and eventually the website. Tab Studio now walks into the African creative economy looking like what it actually is, a studio with structure under its creativity.</p>
              <p>It is one of the projects I am proudest of, mostly because of that coin. Same icon, different angles. You get T, A and B, and it still reads as play. When a mark can hold that much meaning and still stay simple, the rest of the system almost designs itself.</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-12 rounded-2xl border p-7 sm:p-9 text-center" style={{ borderColor: `${GREEN}30`, background: `${GREEN}07` }}>
              <p className="text-[17px] sm:text-[19px] font-semibold text-white mb-2">Your brand could be the next case study here.</p>
              <p className="text-[14px] text-white/50 mb-6">Every project like this starts the same way: pick a plan, answer a short questionnaire, and we begin.</p>
              <Link
                to="/rate-details"
                className="inline-block rounded-xl bg-gradient-to-b from-lime-400 to-lime-600 px-7 py-3 text-[14px] font-bold text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] transition hover:from-lime-300 hover:to-lime-500 hover:-translate-y-0.5 active:scale-95"
              >
                See the plans
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <OtherProj currentSlug="tabstudio" currentKind="default" />
      <BuildSection />
    </div>
  </div>
);

export default TabStudioProject;
