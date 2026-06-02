# NIQS — Case Study Content & Build Spec

> **For Claude Code:** This document specifies a new hardcoded case study page at `client/src/pages/NiqsProject.jsx`. It mirrors the architecture and visual system of `SavedupProject.jsx` (the established UI/UX case study template), with selective borrowing from `YDpayPage.jsx` for sections that benefit from YDPay's typographic density (specifically: Key Decisions FAQ-style, Information Architecture grid, Color palette grid).

> **Status framing:** NIQS is a real, signed institutional partnership (MoU between NIQS National Secretariat and ADLM Studio, February 2026). Richard's role on this project was **design lead on the ₦2.5M Design Package** — the developer side (₦1.2M MERN build) is separate and out of scope for this case study. The case study covers brand guideline redesign, UI/UX design for the public website + member portal + admin dashboard, social media templates, and the Flyer Design Engine.

> **Accent color:** Use the same lime `GR = "#a3e635"` as Savedup. NIQS brand uses navy `#000066` and gold `#D9B650` — those appear *inside* the mockup screenshots and color-palette renders once visuals exist. Portfolio chrome stays in the portfolio's lime accent for consistency across all case studies.

> **Image policy:** All images are placeholders. Render dark placeholder blocks with captions describing what each visual will be. Once Richard has Figma mockups, he'll upload to Cloudinary and replace placeholder src values.

---

## Section 00 — Hero

**Structure:** Same as Savedup hero. Back-pill + "UI / UX Case Study · Institutional" eyebrow chip + headline + subtitle + hero image frame.

**Back pill label:** `← Back`

**Eyebrow chip label:** `UI / UX Case Study · Institutional Redesign`

**Headline (gradient silver, same treatment as Savedup):**
> NIQS

**Subtitle:**
> A full digital identity rebuild for Nigeria's premier professional body for Quantity Surveyors — brand system, website, member portal, admin dashboard, and a self-serve design engine.

**Hero image placeholder:**
- Description: A wide composition showing the NIQS digital ecosystem at a glance. Either (a) a layered desktop mockup with the website behind, portal in the foreground, and the brand guideline open beside it; OR (b) a navy-and-gold hero composition featuring the NIQS emblem, redesigned wordmark, and a key website screen. Final composition deferred to Figma design phase.
- Aspect: 16/9 or 4/3, full-width inside a `max-h-[60vh]` rounded card identical to Savedup's hero image frame.
- Placeholder src: `null` — render a dark placeholder block with caption *"NIQS — Hero composition (Figma TBD)"*.

---

## Section 01 — The Brief

**Structure:** Same as Savedup section 01. Stats row at top (4 columns), then two-column body (left: project overview, right: MY ROLE card).

**Stats row (4 chips):**
| Column | Label | Value |
|---|---|---|
| 1 | CLIENT | NIQS National Secretariat |
| 2 | TIMELINE | Feb – May 2026 |
| 3 | SCOPE | Design Package (lime accent) |
| 4 | STATUS | In Production |

**Eyebrow:** `01 — THE BRIEF`
**Heading:** `A 56-year institution,` (white) + `rebuilt for 2026` (lime)
**Lime divider line below heading.**

**Body — left column (three paragraphs):**

Paragraph 1:
> The Nigerian Institute of Quantity Surveyors (NIQS) is the foremost professional and regulatory body for quantity surveyors in Nigeria — founded in 1969, granted statutory authority by Decree No. 31 of 1986, and home to over 10,000 members across all 37 states. After more than half a century of growth, its digital presence had fallen behind the institution's stature.

Paragraph 2:
> ADLM Studio was appointed Official Technical Partner to deliver a full digital transformation: a new brand guideline, a custom-coded MERN website to replace the legacy WordPress/PHP system, a member portal, an admin dashboard, a digital library, and a self-serve flyer design engine for the secretariat. I led the design side of this partnership — owning every pixel from the brand system to the portal interface.

Paragraph 3:
> The brief was institutional in tone but operational in spirit: respect 56 years of heritage, retain the heraldic logo and navy-gold palette, but rebuild the entire digital experience so that members, regulators, and the public meet NIQS the way they should — as a serious, modern, technology-forward institute.

**Deliverables chips (under the body paragraphs):**
- Brand Guideline Redesign
- Public Website UI/UX
- Member Portal UI/UX
- Admin Dashboard UI/UX
- Digital Library UI
- Social Media Templates
- Flyer Design Engine (Admin Tool)

**Right column — MY ROLE card:**

> **Creative Lead · ADLM Studio**
>
> I led the design side of the NIQS Digital Transformation partnership, owning:
>
> - Brand guideline redesign (~60 pages)
> - Public website design (desktop + mobile, 20+ screens)
> - Member portal design
> - Admin dashboard design
> - Digital library design
> - Social media template system
> - Flyer Design Engine — a self-serve design tool inside the admin panel
> - Design system & component library
> - Developer handover

---

## Section 02 — The Problem

**Structure:** Same as Savedup section 02. Two-column grid — left: heading + intro + 4 problem cards (red accent treatment), right: tilt-frame image.

**Eyebrow:** `02 — THE PROBLEM`
**Heading:** `What didn't` (white) + `match the institution` (red accent `#E05252`)
**Red divider line below heading.**

**Intro paragraph:**
> The 2020 brand work served NIQS for a season, but five years of institutional growth, digital expansion, and member service evolution had outpaced it. Four core problems shaped this redesign:

**Four problem cards (red-tinted, identical treatment to Savedup):**

**01 — A brand system stuck in 2020**
The 2020 guideline was a static PDF reference rather than a working system. It defined logo usage and colour but lacked typography rules, spacing rules, photography treatment specs, or any modern UI patterns. Every new piece of NIQS communication required redrawing the wheel.

**02 — A legacy website that didn't scale**
The old WordPress/PHP site relied on plugin-based scaling and didn't support institutional-grade role-based access. Member portal, admin workflows, and a proper digital library could not be built on it. Performance and security had aged.

**03 — Every flyer needed a designer**
The secretariat produced announcements, event notices, and recognitions weekly — but every single one required a designer to open Photoshop or Canva, fight the layout, export, and hand back. No design literacy on the secretariat side. The volume was unsustainable.

**04 — Inconsistent communications**
Without a templates system or a content discipline, NIQS chapters across all 37 states produced communications in wildly different styles. The national brand and the chapter brand didn't look like one institution.

**Right-column image placeholder (TiltFrame, aspect 4/5):**
- Description: A split visual — left side the 2020 NIQS materials (Annual Report cover, Staff Handbook, the old WordPress homepage screenshot); right side the new 2026 NIQS materials (new brand guideline cover, new website hero, portal dashboard). Caption inside: *"56 years of institutional heritage. A new digital chapter."*
- Placeholder src: `null` — render dark placeholder block.

---

## Section 03 — Research & Insights

**Structure:** Same as Savedup section 03 — heading + intro + two-column layout: left = competitive comparison table, right = stacked insight panels.

**Eyebrow:** `03 — RESEARCH & INSIGHTS`
**Heading:** `Benchmarking the` (white) + `institutional standard` (lime)

**Intro paragraph:**
> Research combined a teardown of the legacy NIQS site, a competitive scan of peer professional bodies (NSE — Nigerian Society of Engineers, NIA — Nigerian Institute of Architects, RICS — Royal Institution of Chartered Surveyors), and structural analysis of how a modern professional institute should serve members, regulators, and the public.

**LEFT — Competitive Advantage table (same structure as Savedup):**

Comparison: NIQS (new) vs. legacy NIQS site, NSE, NIA, RICS UK.

| Capability | NIQS (New) | NIQS (Legacy) | NSE / NIA | RICS UK |
|---|:-:|:-:|:-:|:-:|
| Modern responsive website | ✅ | ❌ | ⚠️ | ✅ |
| Custom-coded backend (no WordPress) | ✅ | ❌ | ❌ | ✅ |
| Member portal with dashboard | ✅ | ❌ | ⚠️ | ✅ |
| Role-based access (Admin / Staff / Member) | ✅ | ❌ | ❌ | ✅ |
| Integrated digital library | ✅ | ❌ | ❌ | ✅ |
| Self-serve design tool for staff | ✅ | ❌ | ❌ | ❌ |
| Modern brand guideline (working system) | ✅ | ❌ | ⚠️ | ✅ |
| Editorial typography (display + body system) | ✅ | ❌ | ❌ | ✅ |
| Mobile-first public site | ✅ | ❌ | ⚠️ | ✅ |

**RIGHT — Insight panels (two stacked):**

**Panel 1 — Institution Scale (donut chart, key stat):**
- Donut: lime arc representing the institutional footprint.
- Center text: `10,000+`
- Side text: *"members across 37 state chapters and the FCT. The redesigned digital infrastructure is built to serve every one of them — not just the National Secretariat."*

**Panel 2 — Communications Volume (horizontal bars):**
- Weekly announcements/recognitions: ~12 per week (lime)
- Events per year: ~40 (blue `#60A5FA`)
- Chapter communications per month: ~150+ (violet `#A78BFA`)
- Caption: *"Volume that no central design team could sustainably hand-produce. The Flyer Design Engine exists to solve this."*

---

## Section 04 — Hero Image Band (full-width visual break)

**Structure:** Same as Savedup's gap-band sections. Full-width framed image.

**Image placeholder:**
- Description: A cinematic shot — either the new NIQS website home page in a desktop browser frame, OR a curated grid showing the brand guideline open across multiple chapters (logo + color + typography). Lime border glow same as Savedup's hero band.
- Aspect: full-width, `height: 55vh`, rounded.
- Placeholder src: `null` — dark placeholder, caption *"NIQS — Visual band (Figma TBD)"*.

---

## Section 05 — The New Brand System

**Structure:** Borrow YDPay's section 03 treatment (Design Language). Eyebrow + heading + intro, then color palette grid, then typography card.

**Eyebrow:** `05 — BRAND SYSTEM`
**Heading:** `Heritage, made` (white) + `operational` (lime)

**Intro paragraph:**
> The 2020 brand established the NIQS heraldic identity — eagle, shield, navy, gold, "The professional construction cost managers." That heritage is non-negotiable. The redesign retained every heraldic element and rebuilt the system around it: typography that didn't exist before, a working colour scale, photography treatment specs, and a logo system with four official lockup configurations.

### 5.1 — Colour Palette

**Heading inside subsection:** *Navy & Gold — refined into a working system*

**Color palette grid (full-width, 5 swatches in same treatment as YDPay section 03):**

| Swatch | Color | Name | Usage |
|---|---|---|---|
| 1 | `#000066` | NIQS Navy | Primary institutional voice · headers · navy backplates · official surfaces |
| 2 | `#D9B650` | NIQS Gold | Accent · eyebrows · em-treated nouns in headings · gold rules · CTA highlights |
| 3 | `#F6F7FB` | Off-White | Secondary surface · alternating section backgrounds · card backgrounds |
| 4 | `#1A1A2E` | Navy Deep | Hero overlays · chapter opener backgrounds · photography darkening |
| 5 | `#FAFAFA` | True White | Document/page background · content cards · clean surfaces |

**Caption under grid:**
> The redesign retained the 2020 navy (`#000066`) and gold (`#D9B650`) as official primaries — non-negotiable. The work added a tonal **scale** beneath each colour (13% / 34% / 65% opacity surfaces, dividers, hover states) so designers no longer guess at "lighter navy" or "softer gold." The institution finally has a working palette, not just two colours.

### 5.2 — Typography

**Heading inside subsection:** *Two typefaces. One institutional. One editorial.*

**Typography card showing the type pairing (same treatment as YDPay):**

> **DISPLAY · Bricolage Grotesque**
> Weights: 800 / 700 / 600
> Used for: Hero · H1 · H2 · Key numerics · em-treated gold accents
> Source: Google Fonts
>
> *Bricolage Grotesque is the NIQS display typeface. Its slightly playful "g" and "a" characters soften the institutional formality without undermining it — making NIQS feel modern and editorial while remaining authoritative.*

> **BODY · Sora**
> Weights: 700 / 600 / 400 / 300
> Used for: All body copy · UI labels · Buttons · Navigation · Forms · Metadata
> Source: Google Fonts
>
> *Sora carries all body copy. Its generous x-height and uniform stroke width make it highly legible at small sizes — important for the data-dense tables and member notices that characterise NIQS communications.*

**Caption under typography card:**
> The 2020 guideline did not specify typography. The new system locks two typefaces: one for institutional voice, one for operational clarity. Both are free, web-served, and load across every NIQS touchpoint — print, document, web, portal, flyer engine.

### 5.3 — Photography Treatment

**Specs block, three rules (same treatment as YDPay design-language sub-blocks):**

- **Hero — Behind text:** `brightness(0.22) saturate(0.8)` + navy gradient overlay. Photography is *under* the type, never competing.
- **Card images:** 100% brightness, natural tones. Slow zoom on hover (`scale(1.04)` over 350ms).
- **Portrait crops:** `object-fit: cover · object-position: top` — head always in frame.

**Caption:**
> The 2020 system applied photography ad-hoc — sometimes a blue gradient, sometimes a full overlay, sometimes raw. The new spec ensures every photograph across NIQS communications is treated identically.

### 5.4 — Inside the Guideline

**Heading inside subsection:** *The full system, 60 pages, one source of truth*

**Intro paragraph:**
> The complete brand guideline spans ~60 pages across 12 chapters — Brand Story, Personality & Voice, Logo & Mark, Colour, Typography, Imagery, Stationery, Digital, and Brand Voice & Copy. A selection of spreads below; the full document is the operating manual every NIQS chapter, staff member, and third-party vendor designs from.

**Guideline spread gallery (horizontal scroll strip OR responsive grid):**

Build this as a gallery of guideline-spread thumbnails. On desktop: a responsive grid (3 columns) of TiltFrame images. On mobile: a horizontal scroll strip. Each thumbnail opens in the existing Lightbox. Each is a placeholder until Richard adds the real spread exports.

Nine spreads to feature (each a TiltFrame placeholder, aspect 3/4 portrait to match document pages):

1. **Cover** — navy cover with NIQS emblem + "Brand Guideline" title
2. **Brand Story** — the "Who We Are" spread with the 1969 founding + stat strip (1969 · 4,000+ · 37 · 15+)
3. **History Timeline** — five decades, 1969 → 2025
4. **Logo & Mark** — the heraldic emblem on light + dark backplates
5. **Logo Lockups** — the four official configurations (horizontal/vertical × light/dark)
6. **Colour Palette** — navy `#000066` + gold `#D9B650` with HEX/RGB/CMYK + the tonal scales
7. **Typography** — Bricolage Grotesque + Sora specimen spread
8. **Imagery Direction** — photography do's/don'ts + treatment specs
9. **Stationery** — letterhead + business card application spread

**Caption under gallery:**
> Tap any spread to view it full-size. The 2020 guideline was a static reference; this is a working system — every rule specified, every application shown, every chapter aligned.

---

## Section 06 — Public Website Walkthrough

**Structure:** Same as Savedup section 05 (Core Features). Eyebrow + heading + intro, then alternating left/right feature blocks (text card + TiltFrame image).

**Eyebrow:** `06 — PUBLIC WEBSITE`
**Heading:** `From institutional` (white) + `directory to digital flagship` (lime)

**Intro paragraph:**
> The public website is the first impression NIQS makes — for prospective members, regulators, corporate partners, journalists, and the public. The redesign moved it from a 2020-era institutional directory into a modern editorial platform that respects the institution's authority and shows up the way it should on every device.

**Five feature blocks (alternating left/right):**

**SCREEN 01 — Home & Hero**
The home page leads with *"Advancing Nigeria's Built Environment"* — gold-accented headline over a deep navy hero, paired with a curated five-image strip of construction, conferences, and professionals. A statistics row below the fold anchors the institution's scale: 10,000+ members, 4,000+ corporate QS, 37 chapters, 56 years, 15+ international agreements. Visitors meet NIQS at full presence before they scroll.

*Image placeholder:* Desktop browser mockup of NIQS home page hero. Aspect 16/9.

**SCREEN 02 — About & Heritage**
Eight sub-sections under About Us — President's office, National Executive Council, National Policy Committee, Past Presidents, State Chapters, WAQSN, YQSF, and Reciprocity Agreements. Each receives editorial treatment: large portrait, contextual sub-heading, accompanying bio or scope statement. Past Presidents becomes a timeline, not a list. The institution finally tells its own story.

*Image placeholder:* Desktop mockup showing the About / President page. Aspect 16/9.

**SCREEN 03 — Membership & Public Search**
Membership routes split cleanly: *Requirements & Registration* for the public, *Member Portal / Induction Letter / Upgrade Letter* behind the lock for authenticated users. A public "Search QS or QS Firm" lookup lets regulators, employers, and clients verify professional standing without needing to log in. Trust by design.

*Image placeholder:* Mobile mockup of the Membership page with the public QS search interface. Aspect 16/9.

**SCREEN 04 — Exams, Events & News**
A dedicated Exams section (Examinations · Published Results · Interview / TPC / Logbook results behind login). A live event calendar (Annual QS Conference, TPC/GDE Examinations, Chapter CPD Seminars). A news feed with editorial card treatment. The site no longer "has" content — it *is* a living publication.

*Image placeholder:* Desktop mockup of the Events + News combined view. Aspect 16/9.

**SCREEN 05 — Brand Materials, Jobs & Contact**
Brand Materials is a public download surface (logos, official assets). Jobs is an aggregated board. Contact provides the secretariat's direct line. Smaller surfaces, but treated with the same editorial polish as the marquee pages — a sign that the institution doesn't have "minor" pages.

*Image placeholder:* Three small phone mockups side-by-side: Brand Materials, Jobs, Contact. Aspect 16/9.

---

## Section 07 — Member Portal & Admin Dashboard

**Structure:** Same as Savedup section 08 (User Flows). Two-column grid — left: SLabel + heading + intro + bullet list, right: TiltFrame image.

**Eyebrow:** `07 — PORTAL & ADMIN`
**Heading:** `Built for the` (white) + `people who run NIQS` (lime)
**Lime divider line below heading.**

**Body paragraphs:**

> The public website is the front door. The portal and admin dashboard are where the institution actually operates day-to-day — and they are designed to a different bar: clarity over flourish, density over decoration, repeated use over first-impression.

> A NIQS staff member who logs into the admin dashboard isn't looking for a hero treatment. They're trying to publish an announcement, approve a membership upgrade, upload a CPD recording, or export a chapter list to Excel before a 4pm deadline. The interface respects that.

**Bullet list (4 items):**
- **Member portal** — secure login, profile dashboard (membership category, chapter, status, dates), members-only digital library access, CPD records, event registrations
- **Admin dashboard** — member database (search/filter/edit/export), events creation, news/publications publishing, library uploads with access controls, staff accounts with role-based permissions
- **Role-based access** — three tiers (Admin / Staff / Member) governing every screen, every action, every dataset
- **Digital library** — public-facing section (press releases, public publications, newsletters) and members-only section (CPD recordings, NIQS templates, standards, searchable catalogue with tags)

**Right-column image placeholder (TiltFrame, aspect 4/5):**
- Description: A vertical composite showing the admin dashboard on desktop + the member portal on mobile. Lime accent glow same as Savedup section 08.
- Placeholder src: `null`.

---

## Section 08 — The Flyer Design Engine (HIGHLIGHT FEATURE)

**Structure:** Single-column FadeUp section with custom treatment. This is the unique standout of the project — a self-serve design tool inside the admin panel that lets NIQS staff produce on-brand communications without a designer. Give it space and visual weight.

**Eyebrow:** `08 — FLYER DESIGN ENGINE`
**Heading:** `The design tool that` (white) + `replaced the designer` (lime)

**Intro paragraph:**
> The Flyer Design Engine is the single most-used output of this project. Built into the admin panel, it lets any NIQS staff member produce on-brand announcements, recognitions, event notices, and press updates by editing details on pre-designed templates — no Photoshop, no Canva, no designer required. Every output is wired to the brand system: colours, typography, logo placement, and approved photography treatments are locked. Staff can't break the brand even if they try.

**Three-column "How it Works" grid (same treatment as YDPay's color palette grid):**

**Card 1 — Template Library** (lime accent)
> Pre-designed templates for the recurring communication types — Announcements, Events, Recognitions, Press Updates. Each template is built from the brand system, so its typography, palette, and logo placement are already correct.

**Card 2 — Detail Editing** (blue accent `#60A5FA`)
> Staff edit only the editable fields — title, body copy, date, image, signatory. Every other element (font, colour, layout, logo) is locked. The brand cannot drift.

**Card 3 — Export** (gold accent `#D9B650`)
> One-click export to print-ready PDF or social-ready PNG. Output lands in the staff member's downloads in seconds. From idea to publishable artifact: under a minute.

**Outcome block (full-width, lime accent — same treatment as YDPay's "delivery card"):**

> **The operational impact**
>
> Before: every flyer required a designer. ~12 flyers per week at the National Secretariat alone, plus chapter-level requests. The volume bottlenecked design output and starved the secretariat of timely communications.
>
> After: staff produce on-brand flyers in under a minute. The design team focuses on higher-order work (new templates, brand evolution, custom campaigns) instead of redrawing the same recognition flyer for the fortieth time.

**Image placeholder (full-width below the outcome block):**
- Description: Animated GIF or static composite showing the Flyer Engine in use — staff selects a template, edits fields, clicks export, downloads PDF. Could also be a 3-frame storyboard: empty template → mid-edit → exported flyer.
- Aspect: full-width, 16/9 or 4/3, rounded.
- Placeholder src: `null`.

---

## Section 09 — Information Architecture

**Structure:** Same treatment as YDPay's section 07 (IA grid). Cards showing every top-level area of the platform.

**Eyebrow:** `09 — INFORMATION ARCHITECTURE`
**Heading:** `The full digital` (white) + `ecosystem` (lime)

**Intro:**
> Three surfaces, three audiences, one connected system. Public website serves the world; member portal serves the membership; admin dashboard serves the secretariat. Every screen, every flow, organised below.

**Grid of 9 IA cards (3-column desktop, color-dot treatment same as YDPay):**

| Card | Color | Section | Pages / Screens |
|---|---|---|---|
| 1 | lime | **Home** | Hero, Stats, Services, News, Events, Quote, CTA |
| 2 | blue `#3B82F6` | **About NIQS** | About, President, Council, NPC, Past Presidents, Chapters, WAQSN, YQSF, Reciprocity, Brand Materials |
| 3 | yellow `#F59E0B` | **Membership** | Requirements, QS Search, Portal (🔒), Induction Letter (🔒), Upgrade Letter (🔒) |
| 4 | violet `#A78BFA` | **Exams** | Examinations, Published Results, Interview (🔒), TPC/GDE (🔒), Logbook (🔒) |
| 5 | pink `#EC4899` | **Research & Devt** | Workshops, Webinars, Publications, Journal |
| 6 | cyan `#06B6D4` | **News** | Latest News, Events Calendar, QS Connect, Article Template |
| 7 | orange `#F97316` | **Jobs / Payment / Contact** | Jobs board, Payment portal (🔒), Secretariat contact |
| 8 | gray | **Member Portal** *(authenticated)* | Dashboard, Profile, Membership Status, Library Access, Event Registrations, CPD Records |
| 9 | gold `#D9B650` | **Admin Dashboard** *(staff only)* | Member DB, Events, News, Library Uploads, Staff Accounts, Flyer Engine, Audit Logs |

**Footer info chip below grid (same as YDPay's "info" footer):**
> ℹ️ *The full IA map covering all 7 public sections, 5 portal screens, and 9 admin modules is available as a separate Figma frame in the design handover.*

---

## Section 10 — Key Design Decisions (FAQ-style, borrowed from YDPay)

**Structure:** Borrow YDPay's section 06 treatment. `StaggerGrid` of question-and-answer cards. Number badge + question + answer.

**Eyebrow:** `10 — KEY DESIGN DECISIONS`
**Heading:** `The principled` (white) + `calls behind the rebuild` (lime)

**Intro:**
> Every redesign is a series of "why this, not that?" choices. These are the principled calls behind the NIQS rebuild — and the inherited elements that were deliberately preserved.

**Six decision cards (FAQ structure):**

**DECISION 01 — Why retain the 2020 logo and palette?**
The heraldic eagle, the shield, the navy, the gold — these carry 56 years of institutional weight. NIQS members recognise the mark on a wall in Abuja from across the room. A redesign that erased that heritage would be vandalism, not stewardship. The work was to rebuild the *system* around the mark, not replace the mark.

**DECISION 02 — Why Bricolage Grotesque + Sora instead of traditional serifs?**
Institutional bodies default to serifs (Garamond, Caslon, Times) to signal heritage. NIQS already has heritage — it doesn't need to perform it through typography. Bricolage Grotesque carries the modern editorial voice the institution wants to project today, while its slightly playful "g" and "a" keep the typography from feeling cold. Sora handles dense UI at small sizes without the legibility hit serifs take in tables and forms.

**DECISION 03 — Why a custom-coded MERN system instead of WordPress?**
WordPress with plugins reached its ceiling for NIQS years ago — role-based access, member portal logic, library permissions, CPD records, and admin workflows are not what plugin-based architectures do well. Custom MERN means the institution owns its stack, scales on its terms, and can integrate new modules (payments, certifications, automation) without fighting a CMS designed for blogs.

**DECISION 04 — Why a separate member portal instead of "member pages" on the public site?**
Members are not visitors. A member is logging in to *act* — check status, register for events, download CPD certificates, update their profile. A separate portal lets that surface be designed for repeated, focused use without compromising the public site's editorial polish. Role-based access (Admin / Staff / Member) is enforced in the data model, not just the UI.

**DECISION 05 — Why build the Flyer Design Engine instead of just providing Photoshop templates?**
Photoshop templates require a designer (or a comfortable Canva user) to operate. The secretariat is not staffed for that — and shouldn't need to be. The Flyer Engine flips the model: the design system becomes a UI, and any staff member becomes a competent operator. The brand cannot be broken because the brand is encoded into the tool. This is the single highest-leverage decision in the project.

**DECISION 06 — Why a 60-page brand guideline when a 30-page version would have been faster?**
NIQS operates across 37 state chapters, has 10,000+ members, runs annual conferences, produces publications, signs international agreements, and communicates publicly through media. Every one of those touchpoints needs a brand reference — and the 2020 guideline didn't cover most of them. The 60-page guideline isn't decorative; it's the operating manual for an institution at this scale.

---

## Section 11 — Testing & Iteration

**Structure:** Same as Savedup section 09 (Testing). Two-column grid — left: TiltFrame image, right: SLabel + heading + body + iteration card.

**Eyebrow:** `11 — TESTING & ITERATION`
**Heading:** `What the` (white) + `reviews surfaced` (lime)

**Body paragraphs:**

> Designs went through formal stakeholder review with the NIQS National Secretariat — primary approver and backup approver, with 48–72 hour design review windows defined in the MoU. Two revision cycles per major deliverable.

> Three iteration themes shaped the final designs.

**Iteration card (key revisions):**

> **Key revision areas**
> - **Hero treatment for the home page** — earlier drafts leaned too "tech startup," not enough "institutional body." The final hero darkens the photography heavily, lets the typography carry the weight, and adds the statistics row to anchor the institution's scale immediately.
> - **Council & past-presidents layouts** — initially designed as uniform grids; revised into editorial portrait treatments with proper context, because every name in those lists carries institutional weight that a grid flattens.
> - **Flyer Engine field controls** — earlier versions exposed too many editable fields (font choice, colour pickers) which broke the "you cannot break the brand" guarantee. Final version locks everything except the content the staff member actually needs to change.

**Left-column image placeholder (TiltFrame, aspect 4/5):**
- Description: Before/after comparison — earlier draft of the home hero vs. the final version, with annotation arrows. Or a Figma file thumbnail showing version history.
- Placeholder src: `null`.

---

## Section 12 — Impact

**Structure:** Same as Savedup section 10 (Impact). Heading + intro + StaggerGrid of metric cards (left column) + TiltFrame image (right).

**Eyebrow:** `12 — IMPACT`
**Heading:** `Measuring the` (white) + `transformation` (lime)

**Intro:**
> The success of this project is measured by what the institution can now do that it couldn't before — and by the operational time the design system gives back to the secretariat.

**Five impact cards:**

| Metric | Color | Description |
|---|---|---|
| **Self-serve communications** | lime | Secretariat staff produce on-brand flyers in under a minute. Eliminates the designer-bottleneck for the ~12 weekly recurring outputs. |
| **Member-portal access** | blue `#60A5FA` | First time NIQS members can log in and self-serve membership status, CPD records, event registrations, and digital library access. |
| **Brand consistency across 37 chapters** | violet `#A78BFA` | Working brand guideline + templates pack gives every state chapter a single source of truth. National and chapter communications now read as one institution. |
| **Institutional-grade digital presence** | yellow `#F59E0B` | The first impression NIQS makes on regulators, partners, and the public now matches the institution's stature. |
| **A scalable design system** | pink `#EC4899` | Every future NIQS digital product — new modules, integrations, sub-platforms — inherits a working system rather than starting from scratch. |

**Right-column image placeholder (TiltFrame, min-height 300px):**
- Description: A composite showing the full digital ecosystem — website, portal, admin, flyer engine, brand guideline — arranged like a system diagram or product family shot.
- Placeholder src: `null`.

---

## Section 13 — Reflection & Learnings

**Structure:** Same as Savedup section 11. Single FadeUp card with body + author chip at the bottom.

**Eyebrow:** `13 — LEARNINGS`
**Heading:** `Reflection &` (white) + `learnings` (lime)

**Body (3 paragraphs):**

> NIQS reinforced something I'd been circling for a while: a brand redesign for an institution is fundamentally different from a brand redesign for a startup. Institutions have weight that the design must protect — fifty-six years of recognition, of letterhead, of certificate stamps, of conference programmes — and the work is to *update without erasing*. Every choice on this project was filtered through that lens.

> The Flyer Design Engine was the clearest reminder that the most useful design work is sometimes invisible. A brand guideline lives on a designer's shelf; a templates pack lives in a designer's folder. A design *engine* lives inside the workflow of the people the institution actually depends on day-to-day. The leverage on that decision will compound for years.

> This was also the largest single-client engagement of my career so far — a signed MoU, a six-figure naira budget, an institutional approval workflow, a developer partnership, and a real handover. It reinforced that the design discipline scales when it's paired with the infrastructure to deliver it. ADLM Studio is built around that pairing, and NIQS is the first full institutional expression of what that partnership can produce.

**Author chip at bottom (same treatment as Savedup):**

> **Richard Enoch** — *Creative Lead, ADLM Studio · NIQS Digital Transformation · 2026*

---

## Section 14 — Footer Components (reuse existing)

- `<OtherProj currentSlug="niqs" currentKind="ui" />`
- `<BuildSection />`

---

# CLAUDE CODE BUILD PROMPT

> Paste the prompt below into Claude Code to generate `client/src/pages/NiqsProject.jsx`.

---

```
I want you to create a new hardcoded UI/UX case study page for the NIQS project. It must follow the exact same architecture and visual system as SavedupProject.jsx (the established UI/UX case study template) — same component scaffolding, same FadeUp/SlideIn/StaggerGrid animation primitives, same SLabel/H2/TiltFrame components, same lime accent color (GR = "#a3e635").

The page must live at: client/src/pages/NiqsProject.jsx
The route must be: /ui-projects/niqs
Register the route in main.jsx (or wherever the router is configured) without breaking any existing route.

The case study content is fully specified in Niqs_CaseStudy.md (in the project root). Read it in full and build the page following its section structure EXACTLY — 14 sections numbered 00 through 14, in order:

00. Hero
01. The Brief
02. The Problem
03. Research & Insights
04. Hero Image Band (full-width visual break)
05. The New Brand System (with 4 sub-sections: Colour, Typography, Photography Treatment, AND a 9-spread guideline gallery)
06. Public Website Walkthrough
07. Member Portal & Admin Dashboard
08. The Flyer Design Engine — HIGHLIGHT FEATURE, give it visual weight
09. Information Architecture (borrow YDPay's section 07 IA grid treatment)
10. Key Design Decisions (FAQ-style, borrow YDPay's section 06 treatment)
11. Testing & Iteration
12. Impact
13. Reflection & Learnings
14. Footer (OtherProj + BuildSection)

CRITICAL RULES:

1. Match Savedup's visual system. Reuse its FadeUp, SlideIn, StaggerGrid, SLabel, H2, TiltFrame components exactly. Where a section in the markdown says "borrow YDPay treatment," look up that section in YDpayPage.jsx and replicate the component pattern (color palette grid, FAQ-style decision cards, IA color-dot grid).

2. ALL images are placeholders. Do not use any Cloudinary URLs. Wherever the markdown says "image placeholder," render a dark placeholder block:
   - Same outer treatment as TiltFrame (border, rounded corners, aspect ratio specified in markdown)
   - Inside the placeholder: a centered caption in muted white text describing what the image will be (e.g. "NIQS — Hero composition (Figma TBD)")
   - Use bg-white/[0.02] or bg-[#0A0D12] for the placeholder fill
   - Keep the TiltFrame's tilt-on-hover effect even on placeholders — Richard will replace src values later

3. The lightbox lightboxing logic from Savedup (Lightbox component + openLightbox handler) — since images are placeholders, wire the placeholders to console.log("Image placeholder clicked — replace src in code") instead of opening the lightbox. When Richard adds real image URLs, the lightbox will work automatically.

4. The eyebrow chip at the top of the hero must read "UI / UX Case Study · Institutional Redesign" — the "· Institutional Redesign" is intentional and signals to recruiters this is heavyweight institutional work.

5. Section 05 (The New Brand System) has FOUR sub-sections (Colour, Typography, Photography Treatment, and an "Inside the Guideline" gallery of 9 spread placeholders). Build them as visually distinct sub-blocks within the section, not as separate top-level sections. Use clear sub-headings. The guideline gallery (5.4) should be a responsive grid of TiltFrame placeholders on desktop (3 columns) and a horizontal scroll strip on mobile — each placeholder opens the Lightbox, each is portrait aspect 3/4 to match document pages.

6. Section 08 (The Flyer Design Engine) is the HIGHLIGHT feature. Give it more visual weight than other sections — full-width outcome block at the bottom with lime accent (same treatment as YDPay's "Complete & Ready" delivery card).

7. The color palette in section 05 should show real swatches of NIQS navy (#000066), gold (#D9B650), off-white (#F6F7FB), navy deep (#1A1A2E), and true white (#FAFAFA). These are NOT the portfolio's lime accent — they are NIQS brand colors being displayed *as content* of the case study.

8. Slug for the OtherProj component at the footer: "niqs", currentKind: "ui".

9. Do NOT modify any other file beyond:
   - The new NiqsProject.jsx
   - The router file (only to add the /ui-projects/niqs route)

When done, report:
- File path of the new component
- The new route URL
- A list of all image placeholders with their descriptions (Richard will use this list to create Figma designs)
- Any sections where the markdown's specification was ambiguous and you made a judgment call

Do not deploy or commit. Just create the file and route.
```

---

# IMAGE PLACEHOLDER INVENTORY

For Richard's Figma design phase. Once mockups exist, upload to Cloudinary and replace placeholder srcs in the component.

| # | Section | Description | Aspect |
|---|---|---|---|
| 1 | 00 — Hero | Wordmark/emblem composition OR layered ecosystem mockup (website + portal + brand guideline) | 16/9, 60vh max |
| 2 | 02 — Problem | Before/after split: 2020 NIQS materials (Annual Report, Staff Handbook, old website) vs. new 2026 materials | 4/5 (TiltFrame) |
| 3 | 04 — Hero band | Desktop browser mockup of new NIQS home page OR brand guideline open across multiple chapters | full-width, 55vh |
| 3a–3i | 05.4 — Guideline Gallery | 9 brand-guideline spreads: Cover, Brand Story, History Timeline, Logo & Mark, Logo Lockups, Colour Palette, Typography, Imagery Direction, Stationery | 3/4 portrait each (TiltFrame) |
| 4 | 06.1 — Home & Hero | Desktop mockup of NIQS home page hero section | 16/9 |
| 5 | 06.2 — About & Heritage | Desktop mockup of About / President page | 16/9 |
| 6 | 06.3 — Membership & Public Search | Mobile mockup of Membership page with QS search interface | 16/9 |
| 7 | 06.4 — Exams, Events & News | Desktop mockup of Events + News combined view | 16/9 |
| 8 | 06.5 — Brand Materials / Jobs / Contact | Three phone mockups side-by-side | 16/9 |
| 9 | 07 — Portal & Admin | Vertical composite: admin dashboard (desktop) + member portal (mobile) | 4/5 (TiltFrame) |
| 10 | 08 — Flyer Design Engine | Animated GIF or 3-frame storyboard: select template → edit → export | full-width 16/9 |
| 11 | 11 — Testing | Before/after comparison of home hero, with annotation arrows | 4/5 (TiltFrame) |
| 12 | 12 — Impact | Product family shot — website + portal + admin + flyer engine + brand guideline arranged as ecosystem | min-height 300px (TiltFrame) |

**Total: 21 unique visual assets needed** (12 mockups/composites + 9 brand-guideline spreads).

---

# KEY FACTS FOR CONSISTENCY

To prevent Claude Code from inventing details when building the page, here are the locked facts:

- **NIQS founded:** 1969
- **Statutory authority:** Decree No. 31 of 1986 (CAP Q1, LFN 2004)
- **Members:** 10,000+ total · 4,000+ corporate-qualified practitioners
- **Reach:** 37 state chapters + FCT
- **International reciprocity:** 15+ agreements including CIQS (Canadian Institute of Quantity Surveyors, signed 2024)
- **MoU date:** February 2026
- **MoU parties:** NIQS National Secretariat ↔ ADLM Studio
- **ADLM founder:** QS Adedolapo Quasim (Founder / Team Lead) — NOT Richard. Richard is **Creative Lead at ADLM Studio**.
- **Richard's role on NIQS:** design lead on the Design Package portion (₦2.5M out of ₦3.7M total fixed cost). The ₦1.2M backend coding was a separate developer scope.
- **Display typeface:** Bricolage Grotesque (Google Fonts) — weights 800 / 700 / 600
- **Body typeface:** Sora (Google Fonts) — weights 700 / 600 / 400 / 300
- **Primary navy:** `#000066`
- **Primary gold:** `#D9B650`
- **Off-white:** `#F6F7FB`
- **Navy deep:** `#1A1A2E`
- **True white:** `#FAFAFA`
- **Website tagline (hero):** *"Advancing Nigeria's Built Environment"* (Environment in gold)
- **Brand tagline (institutional):** *"The professional construction cost managers."*
- **President's name (for cite):** QS Aminu M. Bashir, FNIQS, FICEN
- **Brand guideline length:** ~60 pages, 12 chapters
- **Website pages:** ~20 public-facing screens across 7 top-level nav categories
- **Legacy stack:** WordPress + PHP
- **New stack:** MERN (React + Node + Express + MongoDB) — designed by Richard, built by separate developer scope
- **Project status:** In production, target completion end of May 2026
