# RichPort — Design System

A design system distilled from **Richard Enoch's portfolio website** ([richardenoch.vercel.app](https://richardenoch.vercel.app)). It documents the tokens, components, type system, iconography, and content voice used across the live product so design agents can produce on-brand artifacts — landing pages, case studies, decks, prototypes — without reinventing the look each time.

## Sources

| Source | Location | Notes |
|---|---|---|
| Codebase | `richPort-main/` (read-only, mounted) | Vite + React 19 + Tailwind v4 + Framer Motion. Live data fetched from an Express/Mongo backend on Render. |
| GitHub | <https://github.com/adedola12/richPort> | Same repo, public. Explore further if more depth is needed. |
| Live site | <https://richardenoch.vercel.app> | Production frontend. |
| Backend | <https://richport-1oer.onrender.com> | Express API, mostly powers admin CMS and the rate enquiry form. |
| Internal docs | `richPort-main/CLAUDE.md`, `richPort-main/HANDOFF.md` | Engineering-side handoff. The 1000-line HANDOFF.md is the single richest reference. |

> The reader is **not assumed** to have access to those paths — everything that mattered visually has been distilled into this folder. Pointers are kept in case deeper investigation is useful.

---

## 1 · What this product is

**RichPort** is the personal portfolio of **Richard Enoch**, a Lagos-based multidisciplinary designer (UI/UX, brand identity, graphic, publication). The site is one product surface with several content categories:

| Section | What it shows |
|---|---|
| **Home** (`/`) | Hero, partner logos, project grid (filterable by category), "let's build" CTA, design process, about blurb |
| **About** (`/about`) | Bio, journey timeline, work experience, tools and competencies |
| **Projects** (`/projects`) | All brand/identity case studies. Each links to a detail page. |
| **Project detail** (`/projects/:slug`) | Long-form case study: hero, write-up, mid image, gallery, conclusion, "other projects" |
| **Graphic Design** (`/graphic-design`) | Image-heavy gallery (16–50 images per project) |
| **UI/UX detail** (`/ui-projects/:slug`) | Persona-driven case study with research, flows, screens |
| **Rate Card** (`/rate-details`) | Pricing tiers + comparison table + enquiry form |
| **Admin** (`/admin`) | Password-gated CMS for editing everything above |

A single designer's portfolio means the **product surface is the brand**. The visual system serves to make the work feel premium, calm, intentional — a dark studio backdrop with one signature colour the eye keeps returning to.

---

## 2 · Content fundamentals

### Voice and tone

Richard writes as himself — **first person, conversational, warm**, never marketing-speak. Sentences contemplate, sometimes mid-thought ("…or maybe it's the other way around."). He is happy to digress and to volunteer personal context (studied Quantity Surveying, six years in design, finds construction fascinating). The page does not posture; it leans into the human behind the work.

**Pronouns:** I/me for self, you for the reader, we never. CTAs in the rate form address "us" ("Why are you contacting us?") — that one cluster reads as the only place the voice shifts to a quasi-team register.

**Casing:** Sentence case for nearly everything. Title Case appears only in nav labels, button labels, and category names ("Brand Identity Designs", "Get Started"). Display headings keep sentence case — "Crafting Stunning Experiences," "Custom design solutions for your requirements."

### Specific copy patterns

- **Eyebrow pills** state availability or context, never the topic of the section: *"Open for Projects"*, *"Available for New Projects"*, *"Hi there, I'm…"*, *"Services / Work"*, *"Process"*.
- **Display headings** are short, slightly declarative, often broken into two gradient-clipped lines: *"Crafting Stunning Experiences, / One Pixel at a Time."*, *"Let's Build Something / Amazing Together."*, *"Custom design solutions for your requirements."*
- **Subtext** is one warm sentence that explains rather than sells: *"Hi, I'm a multi-disciplinary designer who transforms ideas into seamless, user-centered solutions."*
- **Project descriptions** are 1–2 sentences, descriptive not boastful: *"Designing a student-focused savings and budgeting platform for life after school."*
- **Buttons** are 2–3 words, plain: *View Works*, *About Me*, *View Project*, *Get Started*, *Contact*, *View Resume*, *Submit*.
- **Empty / error states** stay friendly: *"No projects found in this category yet."*, *"Our rate categories are currently unavailable. Please check back soon or contact Richard directly for a custom quote."*

### Emoji and ornaments

**No emoji.** None on the live site. Icons are used instead — `react-icons` (Feather + Font Awesome + Heroicons) for UI affordances, and PNG/SVG brand icons for the tools row on the About page. Unicode mathematical symbols are not used as decoration.

### Vibe in one paragraph

Quiet confidence with a punch of neon. Dark room, careful lighting, one bright accent. The copy never raises its voice; the visual system does the talking through gradients and glows. Reading the site feels like sitting down with the designer over coffee — not flipping through an agency deck.

---

## 3 · Visual foundations

### Palette

- **Surfaces** are near-black, never pure black except for tag-text and CTA-text. The two canvases in rotation are `#050505` (sections) and `#0B0B0B` (app root + card insides). One brighter raised surface — `#111318` — is used for form cards and pricing card interiors.
- **Borders** are warm dark greys (`#202020`–`#2b2c30`) when describing card edges, and `rgba(255,255,255,0.10)` when describing a glass pill or nav bar. Inputs get a flat `#242424` under-line.
- **Text** is a five-step neutral ramp: `#FFFFFF` → `#E5E5E5` → `#D4D4D4` → `#A3A3A3` → `#98989A`. The codebase uses Tailwind's `neutral-200`/`300`/`400` for those positions almost exclusively.
- **The accent** is one lime that spans Tailwind's `lime-300` → `lime-700`, plus one brighter neon hex `#89FF00` used specifically on project-card hover borders and tag chip outlines. Hover glows always come from this lime — never blue, purple, or red.
- **Supports**: a single `indigo-500/700` gradient is used once, on the "Premium Choice" pricing pill. A `slate-500/800` gradient is used once, on the non-featured plan CTA. Otherwise lime is the only colour.

### Type system

**One typeface: Outfit, weights 100–900.** Display, body, eyebrow, button, price, nav, wordmark — every role is Outfit. Weight + size + tracking carries the hierarchy. Source codebase originally referenced four faces (Outfit, Lexend, Mont, Gabarito) and a script font (Zialothus) for the wordmark; this system collapses all of them onto Outfit for a tighter, more disciplined typographic voice.

#### Scale (standard, tight)

| Role | Size | Weight | Line | Tracking |
|---|---|---|---|---|
| Display | clamp(40–72 px) | 600 | 1.05 | −0.05em |
| H1 | clamp(36–64 px) | 600 | 1.10 | −0.05em |
| H2 | clamp(28–48 px) | 600 | 1.20 | −0.04em |
| H3 | clamp(22–30 px) | 600 | 1.35 | −0.02em |
| H4 | clamp(18–22 px) | 500 | 1.35 | −0.02em |
| Lead | 18 px | 400 | 1.35 | −0.02em |
| Body | 16 px | 400 | 1.50 | −0.02em |
| Body sm | 14 px | 400 | 1.50 | −0.02em |
| Caption | 13 px | 300 | 1.20 | −0.02em |
| Eyebrow | 11 px | 600 | 1.00 | 0.18em (caps) |
| Button | 14 px | 700 | 1.00 | −0.02em |
| Price | 48 px | 800 | 1.00 | −0.02em |

The scale is **tight but never cramped** — 1.5 line-height on body, 1.35 on lead and H3+, 1.2 and below for display. Letter-spacing sits at −0.02em throughout (Outfit's default optical spacing is slightly loose at large sizes; the negative tracking pulls it back to a deliberate, compact rhythm). All sizes use `clamp()` so they scale fluidly from 320 px viewports up to 1440+.

`html { font-size: 16px }` — the rem base is the browser default. The earlier 20px bump from the source was dropped; the new clamps do the legibility work instead.

### Spacing

The visible scale is the Tailwind default (4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 px) with two specific section verticals: **`py-16 lg:py-24`** (the page rhythm) and **`py-20 lg:py-24`** (the about/services rhythm). Max content widths cluster at `1200px`, `1377px`, and `1457px`. Cards typically sit at 533 px tall (project) or 181 px tall (process step).

### Backgrounds

- **No flat brand colour fills.** The page is always near-black.
- **No repeating patterns or grain.**
- **Two image-as-background moments only**: the Hero (`ProjectHero.png` cover-fit, darkened 0.65→0.92 vertical gradient, lime radial spots punched through the corners) and the "Let's Build" CTA card (`Container.png` swirl with a black gradient over it). Both images are used at low opacity behind a black wash.
- **Lime radial glows are everywhere**. Big soft blurred circles (`h-72 w-72 rounded-full bg-lime-500/15 blur-[200px]`) sit absolutely-positioned behind almost every section. They function as ambient lighting; the user reads them as warmth, not as graphics.
- **Card backgrounds**: warm desaturated gradient (`linear-gradient(112.73deg, rgba(72,73,77,0.28), rgba(128,97,96,0.224), rgba(166,133,131,0.07))`) — barely-there, suggests material thickness without being noisy. The tab bars use the same gradient at 168°.

### Animation

- **Framer Motion** is the only motion library. The easing curve `cubic-bezier(0.22, 0.61, 0.36, 1)` (a soft custom out-curve) is reused everywhere — page transitions, card reveals, image scales, hero text.
- **Page transitions**: opacity 0→1, y 16→0, blur 4px→0px, **550 ms** duration.
- **Section reveals**: scroll-triggered (`whileInView`), y 24–32→0, opacity 0→1, **600–700 ms**, stagger of `~100 ms`. Always `viewport={{ once: true }}` so users don't re-trigger.
- **Typing text**: hero headings type out character by character through a custom `TypingText` component. Sequential chaining — pill → line 1 → line 2 → subtext.
- **No bounces, no overshoots, no springs.** Always damped.
- **No autoplaying loops.** A 0.7-second fade is the longest atomic animation.

### Hover & press states

- **Lime CTAs**: hover lightens (`from-lime-300 to-lime-500`) and intensifies the glow shadow. Press is `active:scale-[.98]`.
- **Ghost CTAs**: hover fills with `bg-white/10` (or white at full opacity, flipping the text black, on the "View More" pattern).
- **Cards**: hover `translate-y-[-4px]`, border swaps from `neutral-700` → `#89ff00` (neon), shadow becomes `0 0 35px rgba(137,255,0,0.12)`. Card preview image also `scale-[1.03]` on group-hover.
- **Process step cards**: smaller `translate-y-[-3px]`, lime border, smaller glow.
- **Social icons**: hover adds `rgba(132,204,22,0.7)` glow ring and `translate-y-[-2px]`.
- **Images**: hero portrait is **grayscale**, hover removes grayscale and `scale-[1.02]`.
- **Tags & pills**: subtle background tint shift only — no transforms.

### Borders, corners, dividers

- **Corner radii** cluster in three buckets:
  - **Pills** — fully round (`9999px`) for eyebrows, badges, capsules.
  - **Tags / small chips** — `6–10 px`.
  - **Cards & buttons** — `12 px` (button), `14–22 px` (small cards), `28–32 px` (project & pricing cards).
- **Borders** are always 1 px and use the colour ramp above. No 2 px borders, no double borders. Some elements (featured pricing card) use a **3 px gradient padding trick** instead.
- **Dividers** are a single `1px` line in `neutral-800` (`#262626`) — used in the footer and beside the rate form.

### Shadows

Two shadow families:

1. **Dark drop shadows** — `0 0 40px rgba(0,0,0,0.85)`, `0 24px 80px rgba(0,0,0,0.90)`. Used on nav, cards over images, pricing cards' outer halo. Always pure black; never colored.
2. **Lime glow shadows** — `0 0 18–30px rgba(132,204,22,0.45–0.80)`. Used exclusively on lime CTAs, social icons, and lime-borders on hover.

Inner shadows are reserved: `shadow-inner shadow-black/40` on the active rate-card tab, `inset 0 0 0 1px rgba(255,255,255,0.15)` rim on the active design-system tab. No multi-stop neumorphic stacks.

### Layout rules

- **Fixed nav** at the top (`fixed top-0 z-50`) on a glass gradient bar — emerald-tinted left, white-tinted center, sky-tinted right, all under a heavy backdrop blur. This is the single non-black surface persistently on screen.
- **Footer** is static, bordered top, no glass.
- **Content** is centered, max-widths from 1200–1457 px, side padding `px-4 lg:px-6` standard.
- **Grids**: 2 columns at md+ for the project card grid; 4 columns at lg+ for the process steps; 3 columns for pricing.
- **Section spacing**: every section is its own `<section>` with `py-16` / `py-20` / `py-24` rhythm — no inter-section overlap.

### Transparency and blur

- **Backdrop blur** is on for: nav (`backdrop-blur-2xl`), eyebrow pills (`backdrop-blur`), the tab bar in the project grid (`backdrop-blur-[12.5px]`), the rate-card tab bar (`backdrop-blur-md`), the mobile drawer overlay (`backdrop-blur-2xl`).
- **Translucent fills**: `rgba(255,255,255,0.05)` for default pill, `rgba(255,255,255,0.10)` for hover, `rgba(255,255,255,0.15)` for active state.
- The only opaque-glass moment is the nav. Everywhere else the blur sits on near-black, so the perceived effect is "softer black", not "milk-on-glass".

### Imagery treatment

- **Portraits and journey images** are presented in **black & white** by default (`grayscale`), with color reveal on hover. This is a deliberate motif — the bright moment in any image is the lime accent next to it, not the photo's saturation.
- **Project preview thumbnails** are color, never grayscaled — full bleed inside the rounded card, with the card's lime hover ring providing the only chromatic change.
- **Partner logos** are grayscaled with hover-to-color. White or near-white logos on the dark canvas.
- **Backgrounds for hero images** are darkened, contrasted (`brightness-[0.8] contrast-[1.08] saturate-[1.05]`) so type stays readable.

### What this system is _not_

- **No bluish-purple gradients.** The one indigo gradient is a single pricing pill.
- **No emoji.**
- **No skeuomorphic shadows, drop-shadows on text (except the project hero `drop-shadow-[0_10px_24px_rgba(0,0,0,0.65)]`), or gloss.**
- **No "rounded corners with a colored left border" cards.**
- **No bright background panels.** The accent only ever appears as edge-glow, fill on a button, or text colour.
- **No grain, noise, or texture overlays.**

---

## 4 · Iconography

### Approach

Two icon vocabularies, used for clearly separated purposes:

1. **UI affordance icons** — outlined, single-weight strokes, monochrome. Drawn from `react-icons`:
   - `react-icons/fi` (Feather) — `FiUser` (admin), `FiCheck` (checkbox)
   - `react-icons/fa` (Font Awesome 5) — `FaLinkedinIn`, `FaTwitter`, `FaInstagram`, `FaEnvelope`, `FaPhone`, `FaDownload`, `FaSearch`, `FaRegLightbulb`, `FaPencilRuler`, `FaFlask`
   - `react-icons/hi` (Heroicons) — `HiFire` (recommended pricing badge)
   - These render in **lime** for emphasis or **white** for default. No two-tone, no fill+stroke combinations.

2. **Tool / brand icons** — full-color PNG and SVG logos shown in the About → Tools section. These represent specific products (Figma, Photoshop, Notion, Slack, Adobe XD, …) and are kept at their native brand colours. They sit on the dark canvas without any container, separated by generous gaps; hover lifts them and adds a lime glow drop-shadow.
   - All 40+ tool icons live in `richPort-main/client/src/assets/icons/` in the source repo. A selection is mirrored under `assets/icons/` here.
   - Mix of PNG and SVG. The codebase has an `index.js` aggregator that exports them as a flat object.

### Recommended for new designs

| Need | What to use |
|---|---|
| Outline UI icons (nav, form, state) | **`react-icons` (Feather preferred)** for parity. If working in pure HTML without React, use Lucide via CDN (`https://unpkg.com/lucide-static/icons/...`) — same Feather lineage, identical visual weight. |
| Brand / product logos | Pull from `assets/icons/` or simpleicons.org. Always full color, never tinted. |
| Solid emphasis icons (badge, badge, achievement) | Heroicons solid via CDN (`@heroicons/react/24/solid`) or `react-icons/hi` — restricted to single dots of interest, never as a row. |

### Logo / wordmark

The wordmark is currently set in **Outfit Medium** at clamp(20–28 px) with −0.04em tracking, until a custom logo asset is provided. The favicon mark (`my.svg`, mirrored at `assets/logo-mark.svg`) — a hand-drawn lowercase "re" signature — remains. **A custom logo will replace the text wordmark as soon as it lands**; swap by adding the SVG/PNG to `assets/` and replacing the `.nav-wordmark` / `.footer-wordmark` content in the UI kit.

### Substitutions flagged

- **The source codebase referenced four sans-serif families plus a script wordmark face.** We collapsed all of them onto **Outfit** as requested. Outfit handles every role through weight + size + tracking. If a future revision wants the original three-family voice back, restore the imports in `colors_and_type.css` and reassign `--font-display`, `--font-body`, `--font-ui`, `--font-nav` to the relevant families.
- **Logo asset pending.** The wordmark is currently set in Outfit Medium. Drop a real SVG/PNG into `assets/` and replace the `.nav-wordmark` / `.footer-wordmark` content when ready.

---

## 5 · Index of this folder

```
.
├── README.md                — this file
├── SKILL.md                 — packaged as an Agent Skill
├── colors_and_type.css      — CSS custom properties for color, type, motion, radii
│
├── assets/                  — visual material lifted from the codebase
│   ├── logo-mark.svg        — "re" signature, used as favicon
│   ├── portrait.jpg         — Richard's profile photo
│   ├── about.jpg            — about-page hero photograph
│   ├── project-hero-bg.png  — home hero background
│   ├── container-swirl.png  — "Let's Build" CTA background
│   ├── grid-bg.png          — grid texture (sparingly used)
│   ├── graphics-hero.png    — graphic-design landing photograph
│   ├── plan-diamond.png     — diamond icon used on pricing cards
│   ├── ui-mock-{hero,main,feature,flow}.* — case study screen mockups
│   ├── persona-{daniel,chinedu,tolu}.jpg  — persona portraits
│   ├── work-{1..5}.*        — work-experience thumbnails
│   ├── bookrion-*.jpg       — Bookrion brand case study assets
│   ├── journey.jpg          — timeline fallback image
│   ├── partners/            — 7 partner logos (greyscaled in use)
│   └── icons/               — tool / product PNG+SVG icons (~22 selected)
│
├── preview/                 — 16:9 cards rendered into the Design System tab
│   ├── colors-*.html        — palette cards (one per group)
│   ├── type-*.html          — type specimens
│   ├── tokens-*.html        — radii, shadows, spacing, motion
│   ├── component-*.html     — buttons, pills, tags, fields, cards
│   ├── brand-*.html         — logo, glows, iconography
│   └── ui-kit-portfolio.html — full UI kit preview (linked card)
│
└── ui_kits/
    └── portfolio/           — high-fidelity recreation of the live site
        ├── README.md
        ├── index.html       — interactive multi-screen prototype
        ├── styles.css       — co-located styles + Tailwind-like setup
        └── components.jsx   — Nav, Hero, ProjectCard, Pill, etc. as React components
```

### Where to start

- For tokens → `colors_and_type.css`
- For brand voice → §2 above
- For visual look → §3 above
- For working components → `ui_kits/portfolio/`
- For drop-in cards in mocks → `preview/` files double as ready-made specimens

---

## 6 · Future iteration

If you have access to the live source repo (<https://github.com/adedola12/richPort>), pulling in the full case-study detail pages (`ProjectPage.jsx`, `UIProjectPage.jsx`) would round out the component coverage — the current UI kit prioritises the home, about, and rate surfaces because those exhibit the broadest range of patterns.

The **custom logo** asset will replace the text wordmark once provided. Drop it in `assets/` and update the two `.wordmark` references in the UI kit + brand cards.
