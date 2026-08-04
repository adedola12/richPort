// src/pages/TabStudioProject.jsx
// Tabstudio — Brand Identity Case Study
//
// Layout follows the Cyrclo case-study template: centred masthead, a meta
// card row, a full-bleed cover, then alternating blocks of a STICKY text
// column against a stack of images. Type is Lexend at regular weight and
// large scale; hierarchy comes from size and value, not weight.
//
// Colour discipline: the page is monochrome. The lime gradient is a touch —
// section numerals, the short rule under each heading, the pull quote mark,
// the decision tags and exactly one filled button. Everything else is white,
// grey, or the client's own palette where it appears as content.

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import BrandGallery from "../components/ProjectPage/BrandGallery";
import GuidelineCarousel from "../components/ProjectPage/GuidelineCarousel";
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

/* ── the portfolio's lime, used as a gradient and kept to roughly a tenth
      of the page. G stays as the flat token the shared components expect. ── */
const LIME_A = "#7BF003";
const LIME_B = "#3E7B00";
const GRAD = `linear-gradient(135deg, ${LIME_A} 0%, ${LIME_B} 100%)`;
const G = LIME_A;

const gradText = {
  backgroundImage: GRAD,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

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
   toward the top. Reverses cleanly when scrolling back up. */
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

/* ─── atoms ─── */

/* Numeral in the gradient, label in grey. The numeral is one of the few
   places green is spent. */
const Eyebrow = ({ n, t }) => (
  <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em]">
    <span style={gradText}>{n}</span>
    <span className="h-px w-6 bg-white/15" />
    <span className="text-white/40">{t}</span>
  </p>
);

/* Two-tone heading: the tail drops to grey. No bold, ever. */
const H2 = ({ lead, tail }) => (
  <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white text-balance">
    {lead} <span className="text-white/35">{tail}</span>
  </h2>
);

const Rule = () => (
  <div className="mb-9 mt-6 h-[2px] w-16 rounded-full" style={{ background: GRAD }} />
);

const Body = ({ children }) => (
  <div className="max-w-[46ch] space-y-5 text-[15px] leading-[1.75] text-white/55 sm:text-base">{children}</div>
);

const Frame = ({ src, alt, ratio = "16/9", position = "center" }) => (
  <div className="w-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02]" style={{ aspectRatio: ratio }}>
    <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: position }} />
  </div>
);

/* Alternating block: a sticky text column beside a stack of images.
   `flip` puts the images first on desktop and leaves the reading order
   text-first on mobile, where the column un-sticks. */
const Block = ({ flip = false, text, media }) => (
  <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
    <Reveal className={flip ? "lg:order-2" : ""}>
      <div className="lg:sticky lg:top-28">{text}</div>
    </Reveal>
    <Reveal className={flip ? "lg:order-1" : ""}>
      <div className="flex flex-col gap-6">{media}</div>
    </Reveal>
  </div>
);

/* The one filled button on the page. Carries a blurred sheen that sweeps
   across on hover, clipped by the pill. */
const PillButton = ({ to, children, filled = false }) => (
  <Link
    to={to}
    className={`group relative isolate inline-flex h-16 items-center justify-center overflow-hidden rounded-full px-12 text-[15px] font-medium transition-colors duration-300 ${
      filled ? "text-[#07090C]" : "text-white"
    }`}
    style={
      filled
        ? { background: GRAD }
        : { borderTop: `1px solid ${LIME_A}55`, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)" }
    }
  >
    <span className="relative z-10">{children}</span>
    {!filled && (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[40%] top-[-5%] -z-10 h-[110%] w-20 opacity-0 blur-[8px] transition-all duration-700 ease-out group-hover:translate-x-[340%] group-hover:opacity-60"
        style={{ background: LIME_A }}
      />
    )}
  </Link>
);

const Divider = () => <div className="h-px w-full bg-white/[0.08]" />;

/* ─── page ─── */

const TabStudioProject = () => (
  <div className="page-lexend relative min-h-screen bg-[#07090C] text-white">
    <PageMeta
      title="Tabstudio — Brand Identity"
      description="Brand identity case study for Tabstudio, a video media agency founded by three creatives. One mark that reads as a play button on the surface and spells T, A and B underneath."
      url="/projects/tabstudio"
    />

    <div className="relative z-10">

      {/* ══════════════ MASTHEAD ══════════════ */}
      <header className="px-5 pt-40 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <FadeUp>
              <span
                className="mb-8 inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ border: `1px solid ${LIME_A}33`, background: `${LIME_A}0A` }}
              >
                <span style={gradText}>Brand Identity</span>
              </span>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h1 className="text-[clamp(3.25rem,11vw,7rem)] font-normal leading-[0.95] tracking-[-0.04em] text-white">
                Tabstudio
              </h1>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="mt-7 max-w-[560px] text-[16px] leading-[1.7] text-white/50 sm:text-[17px]">
                Three founders, a video media agency, and a name carrying two ideas at once.
                The mark that came out of it reads as a play button on the surface and quietly
                spells T, A and B underneath.
              </p>
            </FadeUp>
          </div>

          {/* meta row — four cards, top-lit, exactly the Cyrclo grid */}
          <FadeUp delay={0.2}>
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "Client", v: "Tab Studio" },
                { k: "Industry", v: "Video & Motion" },
                { k: "Role", v: "Sole Brand Designer" },
                { k: "Scope", v: "Full Identity System" },
              ].map(({ k, v }) => (
                <div
                  key={k}
                  className="flex flex-col items-center gap-1.5 rounded-[1.25rem] border-t border-white/[0.14] bg-white/[0.03] px-6 py-7 text-center"
                >
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/30">{k}</span>
                  <span className="text-[15px] text-white">{v}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* cover */}
          <FadeUp delay={0.26}>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/[0.08]">
              <img
                src={imgStationeryDark}
                alt="The full Tabstudio stationery suite photographed on a dark surface"
                className="h-full w-full object-cover"
                style={{ aspectRatio: "16/8" }}
              />
            </div>
          </FadeUp>
        </div>
      </header>

      {/* ══════════════ THE SHORT VERSION ══════════════ */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="mx-auto max-w-[860px] rounded-[2rem] border-t border-white/[0.14] bg-white/[0.03] p-8 sm:p-12">
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
                The short version
              </p>
              <p className="text-[17px] leading-[1.7] text-white/70 sm:text-[19px]">
                Three founders started a video agency and needed a face for it. I gave them one
                mark that works like a coin: look at it straight and it is a play button, turn it
                and it spells their initials. That single idea grew into a five colour system, a
                48 page guideline, and a modern, scalable identity the team can run without me.
                Here is how it happened.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ 01 — THE CLIENT ══════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Block
            text={
              <>
                <Eyebrow n="01" t="The client" />
                <H2 lead="A video agency named after" tail="its own habits" />
                <Rule />
                <Body>
                  <p>
                    Tab Studio is a video media agency. Editing, animation, motion graphics, that
                    whole lane. Three founders came together to build it, and the name carries two
                    ideas at once: their initials, T, A and B, and the tabs you keep open when you
                    are deep in work, jumping between projects.
                  </p>
                  <p>
                    They serve startups, creators, media teams and tech brands, and they wanted an
                    identity that felt like a real creative studio. Something modern and scalable
                    that could hold its own in the African creative economy and signal what they do
                    without spelling it out.
                  </p>
                </Body>
              </>
            }
            media={
              <>
                <Frame src={imgCardNotebook} alt="Tabstudio business card resting on a branded notebook" ratio="4/3" />
                <Frame src={imgBizCard} alt="The Tabstudio business card set" ratio="4/3" />
              </>
            }
          />
        </div>
      </section>

      {/* ══════════════ 02 — THE CHALLENGE ══════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Block
            flip
            text={
              <>
                <Eyebrow n="02" t="The challenge" />
                <H2 lead="The problem was not taste." tail="It was translation." />
                <Rule />
                <Body>
                  <p>
                    Tab Studio came to me as three founders and a name, not a brand yet. And that
                    name was already doing a lot of work. It held their initials, T, A and B, and
                    it held the way they actually operate, tabs open, moving between projects. My
                    job was to take all of that, the video craft, the multitasking, the three
                    people behind it, and press it into one mark. Say it in a single shape, and
                    say it without being literal.
                  </p>
                  <p>
                    That is a harder brief than it sounds. Most of this project was not drawing,
                    it was searching. Round after round of directions, geometric, fluid, symbolic,
                    typographic, until one shape finally carried everything at once.
                  </p>
                </Body>
              </>
            }
            media={
              <>
                <Frame src={imgWindowPoster} alt="Street window poster carrying the Tabstudio mark" ratio="4/3" />
                <Frame src={imgBuildingWall} alt="Building wall branding with the studio tagline" ratio="4/3" />
              </>
            }
          />
        </div>
      </section>

      {/* ══════════════ 03 — THE IDEA ══════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Block
            text={
              <>
                <Eyebrow n="03" t="The idea" />
                <H2 lead="A mark you keep" tail="discovering" />
                <Rule />
                <Body>
                  <p>
                    The breakthrough was a rounded triangle. At first glance it is a play button,
                    and for a video studio that is the entire world. It is the symbol every story
                    sits under, the click that starts everything. That alone would have made a
                    clean logo. It is not where I stopped.
                  </p>
                  <p>
                    Sit with the shape and it keeps giving. The triangle reads as forward motion,
                    then as a human figure leaning in, and then, from the right angle, the form
                    resolves into T, A and B. The founders are signed into their own mark without a
                    single letter spelled out loud. Someone glances and sees play. Someone leans in
                    and finds the name. In a creative industry, the people who look twice are
                    exactly the people worth rewarding.
                  </p>
                  <p>
                    The geometry is doing quiet work too. A triangle is the most stable shape there
                    is, which is the promise sitting under the creativity: ideas here do not just
                    spark, they get built. The rounded corners keep it human instead of clinical.
                    Structured execution, wrapped in a shape that still feels warm.
                  </p>
                </Body>
              </>
            }
            media={
              <>
                <div className="overflow-hidden rounded-[2rem] border border-white/[0.08]">
                  <img
                    src={imgRationale}
                    alt="The Tabstudio logo rationale showing the play icon, forward movement, a human avatar, and the letters T, a and b, all read from one mark"
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
                <p className="max-w-[46ch] text-[14px] leading-relaxed text-white/35">
                  The rationale spread from the guideline. One mark, six ways to read it: play,
                  forward movement, a human figure, then T, a and b.
                </p>
              </>
            }
          />

          {/* pull quote — the second place green is spent */}
          <Reveal>
            <figure className="mx-auto mt-24 max-w-[900px] text-center">
              <span className="block text-[64px] leading-none" style={gradText} aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-[clamp(1.6rem,4vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.03em] text-white text-balance">
                The studio where creativity <span className="text-white/35">becomes clarity.</span>
              </blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-[0.3em] text-white/30">
                The voice, in one line
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ 04 — THE SYSTEM ══════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="max-w-[720px]">
              <Eyebrow n="04" t="The system" />
              <H2 lead="Five colours with" tail="assigned jobs" />
              <Rule />
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-14 max-w-[46ch] space-y-5 text-[15px] leading-[1.75] text-white/55 sm:text-base">
              <p>
                I will be honest, I did not start here. My first instinct was an orange direction,
                warm and loud. The founders kept pulling toward a deep, considered green, and
                instead of defending my pitch, I went looking for whether they were onto something.
                They were.
              </p>
              <p>
                Green is not just a nice colour. Think about what it actually signals: growth,
                success, fresh beginnings, something alive and built to last. For a young studio
                whose whole promise is helping clients grow and stay relevant as trends shift, that
                is not decoration, it is the thesis. So I built a palette where every colour has a
                job. Nothing sits in it by accident.
              </p>
            </div>
          </Reveal>

          {/* the client's palette — the only large area of colour on the page,
              and it belongs to them, not to the page chrome */}
          <Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {SWATCHES.map(({ hex, name, role, dark }) => (
                <div key={hex} className="overflow-hidden rounded-[1.25rem] border border-white/[0.08]">
                  <div className="flex h-28 items-end p-4 sm:h-36" style={{ background: hex }}>
                    <span className="text-[11px] font-medium tracking-wide" style={{ color: dark ? "#07090C" : "#ffffff" }}>
                      {hex}
                    </span>
                  </div>
                  <div className="bg-white/[0.02] p-4">
                    <p className="mb-1 text-[13px] text-white">{name}</p>
                    <p className="text-[12px] leading-[1.5] text-white/35">{role}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-white/25">Names, roles and values from the official guideline.</p>
          </Reveal>

          {/* typography — sticky text against the two guideline spreads */}
          <div className="mt-24">
            <Block
              flip
              text={
                <>
                  <Eyebrow n="04.2" t="Typography" />
                  <H2 lead="Cal Sans leads," tail="Urbanist supports" />
                  <Rule />
                  <Body>
                    <p>
                      Cal Sans carries the display work. Its geometric structure gives the brand a
                      clean, contemporary presence, but the smooth curves and balanced proportions
                      keep it from feeling cold, which matters, because Tab Studio is warm and
                      human, not corporate. It holds its weight at large sizes without shouting.
                    </p>
                    <p>
                      Urbanist does the quiet, heavy lifting underneath: body copy, captions, UI
                      labels, motion graphics. Readable everywhere from a phone screen to a printed
                      poster. Cal Sans for the moments that need presence, Urbanist for everything
                      that simply needs to work.
                    </p>
                  </Body>
                </>
              }
              media={
                <div className="grid grid-cols-2 gap-4">
                  <Frame src={gpCal} alt="Cal Sans, the primary display typeface, from the Tabstudio guideline" ratio="210/297" position="top" />
                  <Frame src={gpUrb} alt="Urbanist, the secondary typeface, from the Tabstudio guideline" ratio="210/297" position="top" />
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* ══════════════ 05 — IN THE WILD ══════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="max-w-[720px]">
              <Eyebrow n="05" t="In the wild" />
              <H2 lead="A brand is not real until" tail="you can hold it" />
              <Rule />
              <p className="mb-16 max-w-[46ch] text-[15px] leading-[1.75] text-white/55 sm:text-base">
                Mockups are the stress test. If an identity only works on a slide, it does not work.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-16 sm:gap-24">
            {[
              {
                img: imgBillboard,
                alt: "Open a New Tab launch billboard",
                title: "On the street",
                body: "The launch line went where launch lines belong, twenty feet up. Open a New Tab works as an ad because it works as an idea first. It is the name, the metaphor and the invitation in four words.",
              },
              {
                img: imgIdCards,
                alt: "Staff ID cards on lanyards in the brand colours",
                title: "Inside the studio",
                body: "Identity starts with the people making the work. ID cards and lanyards mean the brand is not just something Tab Studio sells. It is something the team wears into every meeting.",
              },
              {
                img: imgTees,
                alt: "Team t-shirts carrying the outlined mark",
                title: "On the team",
                body: "The outlined mark wraps the apparel so the clothes feel designed, not just printed. Merch people actually want to wear does more marketing than most ads.",
              },
            ].map(({ img, alt, title, body }, i) => (
              <Reveal key={title}>
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <div className={`lg:col-span-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <p className="mb-3 text-[20px] text-white">{title}</p>
                    <p className="text-[15px] leading-[1.75] text-white/50 sm:text-base">{body}</p>
                  </div>
                  <div className={`lg:col-span-8 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Frame src={img} alt={alt} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 06 — DECISIONS ══════════════ */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="max-w-[720px]">
              <Eyebrow n="06" t="Decisions" />
              <H2 lead="Three calls that" tail="shaped it" />
              <Rule />
              <p className="mb-14 max-w-[46ch] text-[15px] leading-[1.75] text-white/55 sm:text-base">
                Every identity is a series of small choices. These are the three that mattered most.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                q: "The mark had to earn a second look",
                a: "A video agency logo that is only a play button is a cliche. A monogram that is only initials says nothing about the work. Weaving one into the other gave the mark a surface read for everyone and a hidden read for the curious. Depth without noise.",
              },
              {
                q: "Trusting the client's instinct, then proving it",
                a: "I pitched orange. They pulled toward green. Rather than defend my idea, I went and found the reasoning behind theirs, growth, success, longevity, and it held up. So I committed fully and built a tight system around that one green instead of hedging with extra colours.",
              },
              {
                q: "Selling the idea, not just the shape",
                a: "I did not hand over a logo file and hope. I built a presentation that walked the founders through the play button, the motion, and the hidden initials, one layer at a time. The story earned the buy in. The shape only confirmed it.",
              },
            ].map(({ q, a }, i) => (
              <Reveal key={q}>
                <div className="flex h-full flex-col gap-4 rounded-[1.5rem] border-t border-white/[0.14] bg-white/[0.03] p-7">
                  <span
                    className="w-fit rounded-md px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em]"
                    style={{ background: `${LIME_A}14` }}
                  >
                    <span style={gradText}>Decision 0{i + 1}</span>
                  </span>
                  <p className="text-[16px] leading-snug text-white">{q}</p>
                  <p className="flex-1 text-[14px] leading-[1.7] text-white/45 sm:text-[15px]">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ 07 — INSIDE THE GUIDELINE ══════════════ */}
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
          { src: gp48, alt: "Closing spread" },
        ]}
      />

      {/* ══════════════ 08 — GALLERY ══════════════ */}
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

      {/* ══════════════ 09 — WHAT IT DID ══════════════ */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <Eyebrow n="09" t="What it did" />
            <H2 lead="The coin still" tail="flips" />
            <Rule />
            <div className="space-y-5 text-[16px] leading-[1.8] text-white/60 sm:text-[17px]">
              <p>
                The founders loved it, and the mark became the foundation for the full identity:
                the logo system, the green palette, the guideline, and the merch. Tab Studio now
                walks into the African creative economy looking like what it actually is, a studio
                with structure under its creativity.
              </p>
              <p>
                It is one of the projects I am proudest of, mostly because of that coin. Same icon,
                different angles. You get T, A and B, and it still reads as play. When a mark can
                hold that much meaning and stay that simple, the rest of the system almost designs
                itself.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 flex flex-col items-center gap-6 rounded-[2rem] border-t border-white/[0.14] bg-white/[0.03] p-10 text-center sm:p-14">
              <p className="max-w-[30ch] text-[clamp(1.4rem,3vw,2rem)] font-normal leading-[1.2] tracking-[-0.02em] text-white">
                Your brand could be the next case study here.
              </p>
              <p className="max-w-[46ch] text-[15px] leading-[1.7] text-white/45">
                Every project like this starts the same way: pick a plan, answer a short
                questionnaire, and we begin.
              </p>
              <PillButton to="/rate-details" filled>
                See the plans
              </PillButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════ NEXT CASE STUDY ══════════════ */}
      <div className="px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <Divider />
        </div>
      </div>

      <section className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/30">Explore more</p>
          </Reveal>
          <Reveal>
            <h2 className="text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.04em] text-white">
              Next Case <span className="text-white/35">Study</span>
            </h2>
          </Reveal>
          <Reveal>
            <div className="pt-4">
              <PillButton to="/projects/verde-luxe">Verde Luxe</PillButton>
            </div>
          </Reveal>
        </div>
      </section>

      <BuildSection />
    </div>
  </div>
);

export default TabStudioProject;
