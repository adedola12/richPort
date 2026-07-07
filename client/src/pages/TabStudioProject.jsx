// src/pages/TabStudioProject.jsx
// Tabstudio — Brand Identity Case Study
// Template page for brand identity projects: outcome first, then the
// client, the problem, the idea, the system, the proof.

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import BrandGallery from "../components/ProjectPage/BrandGallery";
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

/* ── brand colours, sampled from the shipped artwork ── */
const TEAL = "#23535F";
const MINT = "#BBECD4";
const LIME = "#A4CA45";

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
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: LIME }}>
    {n} — {t}
  </p>
);

const H2 = ({ white, accent }) => (
  <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em]">
    <span className="text-white">{white} </span>
    <span style={{ color: LIME }}>{accent}</span>
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
      description="Brand identity case study for Tabstudio. A creative studio with a name full of meaning and no identity to carry it. Two weeks, one designer, one idea: open a new tab."
      url="/projects/tabstudio"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: `${TEAL}30` }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]" style={{ background: `${LIME}0E` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative w-full min-h-[80vh] flex flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={imgBuildingWall}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(7,9,12,0.55) 0%, rgba(7,9,12,0.35) 35%, rgba(7,9,12,0.93) 68%, #07090C 100%)" }}
          />
        </div>

        <div className="relative z-10 mt-auto px-4 sm:px-8 pt-28 pb-16">
          <div className="max-w-[820px] mx-auto flex flex-col items-center text-center">
            <FadeUp>
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold mb-7"
                style={{ borderColor: `${LIME}44`, color: LIME, background: `${LIME}0D` }}>
                Brand Identity Case Study
              </span>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="text-6xl sm:text-7xl lg:text-[88px] font-bold leading-none tracking-[-0.04em] mb-5"
                style={{ background: "linear-gradient(180deg, #ffffff 0%, #9a9a9a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Tabstudio
              </h1>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p className="text-[16px] sm:text-[18px] leading-[1.65] text-white/65 max-w-[560px]">
                A creative studio with a name full of meaning and no identity to carry it.
                Two weeks, one designer, one idea: <span style={{ color: LIME }}>open a new tab.</span>
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
                { label: "CLIENT", value: "Tabstudio" },
                { label: "TIMELINE", value: "2 Weeks", accent: true },
                { label: "ROLE", value: "Sole Brand Designer" },
                { label: "SCOPE", value: "Full Identity System" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="sm:px-8 first:pl-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                  <p className="text-lg sm:text-xl font-bold" style={accent ? { color: LIME } : {}}>{value}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="rounded-2xl border p-7 sm:p-9" style={{ borderColor: `${LIME}30`, background: `${LIME}07` }}>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: LIME }}>The short version</p>
              <p className="text-[16px] sm:text-[18px] leading-[1.7] text-white/70">
                Tabstudio came with a name and nothing else. No mark, no colours, no voice.
                Two weeks later it had all three, plus a thirty page guideline the team can run without me.
                One continuous line became a logo, a layout system, and a launch campaign.
                The thinking is below. The proof is all over this page.
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
              <H2 white="A studio that sells" accent="clarity" />
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: LIME }} />
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>Tabstudio is a creative studio built for startups, creators, media teams and tech brands. Their pitch is simple: bring us your scattered ideas and we will hand you back something clear.</p>
                <p>They are genuinely good at that. The problem was that nothing about how they looked said so. And their clients are founders and creators, people who judge design for a living. The identity had to hold up under a trained eye, not just a friendly one.</p>
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
            <SLabel n="02" t="THE PROBLEM" />
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em]">
              <span className="text-white">Every studio says it is creative.</span><br />
              <span style={{ color: "#E05252" }}>Few look like they mean it.</span>
            </h2>
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full bg-[#E05252]" />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
              <p>The early Tabstudio visuals were the familiar kind of generic. Borrowed gradients, no system, a slightly different personality on every surface. Nothing was wrong enough to point at, and nothing was right enough to remember.</p>
              <p>For most companies that is survivable. For a studio whose whole promise is turning creative chaos into clarity, it is fatal. You cannot sell order while showing up scattered. So the brief underneath the brief was this: make the identity itself the first proof of what Tabstudio does.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 03 — THE IDEA ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="03" t="THE IDEA" />
            <H2 white="The answer was inside" accent="the name" />
            <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: LIME }} />
            <div className="max-w-[720px] space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 mb-12">
              <p>A tab. The thing you open when you want to start something new. Every project a client brings to Tabstudio is exactly that, a blank tab waiting to become something. The whole brand was built on that single instruction.</p>
              <p>The mark follows the same logic. It is one continuous line that folds into a tab shape. One stroke, no decoration. A studio that promises clarity should have a mark you can draw without lifting your pen. That keyline became the entire visual language. It runs across the business cards, wraps around the apparel, and carves out the layouts on posters and billboards.</p>
              <p>Getting there was the hard part. The logo stage ate the biggest share of the two weeks, round after round of geometric, fluid and typographic directions before the line finally clicked. It earned that time. Everything after the mark moved fast because the mark was right.</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="rounded-2xl overflow-hidden border border-white/8 relative" style={{ aspectRatio: "16/8" }}>
              <img src={imgBillboard} alt="Tabstudio launch billboard on a city building reading Open a New Tab" loading="lazy" className="w-full h-full object-cover object-center" />
            </div>
            <p className="mt-4 text-[14px] text-white/40 leading-relaxed max-w-[640px]">
              The launch line went where launch lines belong, twenty feet up. "Open a New Tab" works as an ad because it works as an idea first.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-16 text-center py-10">
              <p className="text-[13px] tracking-[0.25em] uppercase text-white/30 mb-4">The voice, in one line</p>
              <p className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.02em] leading-tight">
                <span className="text-white">"The studio where creativity</span>{" "}
                <span style={{ color: LIME }}>becomes clarity."</span>
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
            <H2 white="Three colours," accent="one line" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[620px] mb-12">
              The palette is small on purpose. A brand that stands for clarity has no business owning nine colours.
            </p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { hex: TEAL, name: "Deep Teal", note: "The senior voice. It carries the weight so everything else can stay light.", dark: false },
                { hex: MINT, name: "Soft Mint", note: "The clean page. Warmer than white, so even an empty layout feels considered.", dark: true },
                { hex: LIME, name: "Lime", note: "The spark. Used in small doses, exactly where the eye should land.", dark: true },
              ].map(({ hex, name, note, dark }) => (
                <div key={hex} className="rounded-2xl overflow-hidden border border-white/8">
                  <div className="h-28 flex items-end p-4" style={{ background: hex }}>
                    <span className="text-[11px] font-mono font-bold" style={{ color: dark ? "#0b0b0b" : "#ffffff" }}>{hex}</span>
                  </div>
                  <div className="p-4 bg-white/[0.02]">
                    <p className="text-[14px] font-semibold text-white mb-1">{name}</p>
                    <p className="text-[13px] leading-[1.6] text-white/45">{note}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/25 mb-14">Values sampled from the shipped artwork.</p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeUp delay={0.08} className="h-full">
              <Frame src={imgBizCard} alt="Tabstudio business cards showing the continuous keyline motif" ratio="4/3" className="h-full" />
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-3">THE KEYLINE</p>
              <p className="text-[18px] font-semibold text-white mb-4">One stroke, everywhere</p>
              <div className="space-y-4 text-[15px] sm:text-[16px] leading-[1.7] text-white/55">
                <p>The line from the logo is not locked inside the logo. It travels. On a business card it frames the corner. On a tee it wraps the shoulder like a route on a map. On a billboard it carves the layout in half.</p>
                <p>That is what makes the system scalable. New applications do not need new ideas, they need the same line applied with intent. Anyone on the team can extend the brand tomorrow and it will still look like Tabstudio.</p>
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
              Mockups are not decoration. They are the stress test. If an identity only works on a slide, it does not work.
            </p>
          </FadeUp>

          <div className="space-y-16">
            {[
              {
                img: imgIdCards,
                title: "Inside the studio",
                body: "Identity starts with the people making the work. ID cards and lanyards mean the brand is not just something Tabstudio sells, it is something the team wears into every meeting.",
              },
              {
                img: imgTees,
                title: "On the team",
                body: "The keyline wraps the apparel so the clothes feel designed, not just printed. Merch people actually want to wear does more marketing than most ads.",
              },
              {
                img: imgWindowPoster,
                title: "On the street",
                body: "Posters and window placements run the same system as everything else. Same line, same three colours, instantly the same studio.",
              },
            ].map(({ img, title, body }) => (
              <FadeUp key={title}>
                <div className="flex flex-col gap-5">
                  <div className="max-w-[560px]">
                    <p className="text-[17px] font-semibold text-white mb-2">{title}</p>
                    <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/50">{body}</p>
                  </div>
                  <Frame src={img} alt={`${title} — Tabstudio brand application`} />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 06 — THREE CALLS I STOOD BY ══ */}
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
                q: "Why one continuous line?",
                a: "Logos live hard lives. They get redrawn by interns, squeezed into favicons and stitched onto wristbands. A single stroke survives all of it. Simplicity here was not a style choice, it was insurance.",
              },
              {
                q: "Why mint instead of white?",
                a: "White would have been safe and forgettable. The soft mint gives every layout a temperature, so even a plain page feels intentional. It also makes the deep teal read richer than it ever would against pure white.",
              },
              {
                q: "Why a 30 page guideline for a small studio?",
                a: "Because of who the client is. A studio shipping work daily, with collaborators rotating in and out. The guideline is the team member that never sleeps, never guesses, and never freelances the brand.",
              },
            ].map(({ q, a }, i) => (
              <FadeUp key={q} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 h-full flex flex-col gap-3">
                  <span className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase w-fit" style={{ background: `${LIME}15`, color: LIME }}>
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

      {/* ══ 07 — GALLERY ══ */}
      <BrandGallery
        n="07"
        label="THE FULL SET"
        white="Everything the project"
        accent="produced"
        description="Every application designed during the two weeks, in one place. Tap any piece to view it full size."
        color={LIME}
        images={[
          { src: imgBuildingWall, alt: "Building wall branding with the studio tagline", label: "BUILDING WALL" },
          { src: imgBillboard, alt: "Open a New Tab launch billboard", label: "BILLBOARD" },
          { src: imgWindowPoster, alt: "Street window poster", label: "WINDOW POSTER" },
          { src: imgBizCard, alt: "Business card set", label: "BUSINESS CARDS" },
          { src: imgCardNotebook, alt: "Business card on branded notebook", label: "CARD & NOTEBOOK" },
          { src: imgStationeryDark, alt: "Full stationery suite on dark", label: "STATIONERY" },
          { src: imgIdCards, alt: "Staff ID cards on lanyards", label: "ID CARDS" },
          { src: imgLanyards, alt: "Lanyard set", label: "LANYARDS" },
          { src: imgTees, alt: "Team t-shirts with the keyline motif", label: "T-SHIRTS" },
          { src: imgSweatshirt, alt: "Mint sweatshirt", label: "SWEATSHIRT" },
          { src: imgWristbands, alt: "Wristbands in all three brand colours", label: "WRISTBANDS" },
          { src: imgWristStack, alt: "Wristbands stacked", label: "WRISTBANDS II" },
          { src: imgWristSpread, alt: "Wristbands spread", label: "WRISTBANDS III" },
          { src: imgTote, alt: "Mint tote bag with tagline", label: "TOTE BAG" },
          { src: imgNotebook, alt: "Teal branded notebook", label: "NOTEBOOK" },
          { src: imgWindowAlt, alt: "Window poster, alternate angle", label: "WINDOW II" },
        ]}
      />

      {/* ══ 08 — WHAT IT DID ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <SLabel n="08" t="WHAT IT DID" />
            <H2 white="A young brand with an" accent="old brand's discipline" />
            <div className="mt-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-white/60">
              <p>Tabstudio now shows up like the studio it always was. One mark, three colours, a line you can follow across every surface, and a thirty page guideline that keeps it that way when I am not in the room.</p>
              <p>Two weeks is a short window for an identity, and honestly, that was the best thing about this project. A tight deadline forces honesty. You cannot decorate your way out of a weak idea when there is no time to hide, so the idea has to be right before anything gets drawn. The mark took the biggest share of the schedule and it earned every day of it. Everything after moved fast because the foundation was true.</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-12 rounded-2xl border p-7 sm:p-9 text-center" style={{ borderColor: `${LIME}30`, background: `${LIME}07` }}>
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
