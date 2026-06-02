# Snotes — Case Study Content & Build Spec

> **For Claude Code:** This document specifies a new hardcoded case study page at `client/src/pages/SnotesProject.jsx`. It mirrors the structure and visual system of `SavedupProject.jsx` (the established UI/UX case study template), with selective borrowing from `YDpayPage.jsx` for sections that benefit from YDPay's typographic density (specifically: Key Decisions FAQ-style, Information Architecture grid). Snotes is a **concept-stage product**, so sections that depend on shipped screens use **clearly marked image placeholders** for Richard to fill once Figma designs are ready.

> **Image policy:** Every visual is a placeholder until Richard creates Figma mockups. Each placeholder includes a description of what the image should show. Do NOT use Cloudinary URLs — leave placeholder image src values as `null` or as relative paths Richard will populate (e.g. `/snotes/hero.png`).

> **Accent color:** Use the same lime `GR = "#a3e635"` as Savedup. Snotes branding uses a quiet violet (`#5B47C9`) in concept docs, but for portfolio consistency the page accent stays lime — Snotes' violet appears only inside mockup screenshots once they exist.

---

## Section 00 — Hero

**Structure:** Same as Savedup hero. Back-pill + "UI / UX Case Study · Concept" eyebrow chip + headline + subtitle + hero image frame.

**Back pill label:** `← Back`

**Eyebrow chip label:** `UI / UX Case Study · Concept`
*(Note: append "· Concept" so recruiters immediately know this is strategy work, not a shipped product. Important context.)*

**Headline (gradient silver, same treatment as Savedup):**
> Snotes

**Subtitle:**
> A focused mobile sermon note-taking app — built quietly, for people who want to actually live what they hear.

**Hero image placeholder:**
- Description: A single hero composition. Either (a) a stylised lock-up of the Snotes wordmark on a dark background with a violet glow, OR (b) a single phone mockup in capture mode showing a note with scripture chips inline. **Final choice deferred to Figma design phase.**
- Aspect: ~16/9 or 4/3, full-width inside a `max-h-[60vh]` rounded card identical to Savedup's hero image frame.
- Placeholder src: `null` — render a dark placeholder block with caption text *"Snotes — Hero composition (Figma TBD)"*.

---

## Section 01 — The Brief

**Structure:** Same as Savedup section 01. Stats row at top (4 columns), then two-column body (left: project overview, right: MY ROLE card).

**Stats row (4 chips):**
| Column | Label | Value |
|---|---|---|
| 1 | TIMELINE | V1 in 4 weeks |
| 2 | DATE | Concept · 2026 |
| 3 | PLATFORM | Android (V1) |
| 4 | STATUS | In Pre-Build (lime accent) |

**Eyebrow:** `01 — THE BRIEF`
**Heading:** `Overview of` (white) + `the concept` (lime)
**Lime divider line below heading.**

**Body — left column (two paragraphs):**

Paragraph 1:
> Snotes is a mobile sermon note-taking app conceived as a personal product first, with a structured path to broader release. Most churchgoers use the default Notes app on their phone to capture sermon notes — a tool built for grocery lists, not for the rhythm of a teaching that weaves scripture, exhortation, and personal conviction. Snotes treats scripture as structured data, action points as first-class commitments, and AI as an ambient companion — not a productivity tool, not a Bible study app, not a social network.

Paragraph 2:
> I'm building Snotes the same way I built my personal Life & Work OS — first for me, then for the people who pray for me, then (eventually) for the people I've never met who carry the same Bible to church on Sunday. This case study captures the strategy and conceptual phase before design and build.

**Deliverables chips (under the body paragraphs):**
- Product Strategy
- Three-Phase Rollout Plan
- UX Principles
- Information Architecture
- Technical Architecture
- Concept Documentation
- (Design & Build — Upcoming)

**Right column — MY ROLE card:**

> **Founder · Product Strategy · UX Architect**
>
> I led Snotes from problem identification to product strategy and concept architecture, owning:
>
> - Problem framing & user research (myself as primary subject)
> - Three-phase product strategy (V1 / V2 / V3)
> - UX principles & design posture
> - Information architecture
> - Technical architecture & API stack decisions
> - Concept documentation (~10,000 words across three docs)
> - Brand & visual direction (in progress)

---

## Section 02 — The Problem

**Structure:** Same as Savedup section 02. Two-column grid — left: heading + intro + 4 problem cards (red accent treatment), right: tilt-frame image.

**Eyebrow:** `02 — THE PROBLEM`
**Heading:** `What's the` (white) + `problem?` (red accent `#E05252`)
**Red divider line below heading.**

**Intro paragraph:**
> Sermon notes are taken in the wrong place. The result is predictable — notes get lost, scripture references stay as plain text, action points die in untitled lists, and reflection rarely happens. Four core problems, mapped from personal use:

**Four problem cards (red-tinted, identical treatment to Savedup):**

**01 — Notes are unstructured**
Default Notes apps don't understand the anatomy of a sermon — service type, minister, anchor scriptures, body, action points. Everything is plain text, lost among grocery lists and reminders.

**02 — Scripture is treated as text**
Bible references like "John 3:16" sit as plain characters. No autocomplete, no inline expansion, no aggregation. The most important content in a sermon note is the least functional.

**03 — Action points die in the list**
The whole point of a sermon is application — but action points get buried inside the note where they were written, with no cross-note view, no state tracking, no follow-up.

**04 — Reflection never happens**
Notes get saved and forgotten. No nudge to revisit, no prompt to reflect, no way to know if last month's conviction is still active.

**Right-column image placeholder (TiltFrame, aspect 4/5):**
- Description: A split visual — left side a chaotic phone Notes app screen (sermon notes intermingled with shopping lists, untitled "Note 47"); right side a structured Snotes note showing metadata, scripture chips, action points. Caption inside the image: *"Same notes. Two different experiences."*
- Placeholder src: `null` — render dark placeholder block.

---

## Section 03 — Research & Insights

**Structure:** Same as Savedup section 03. Heading + intro, then a two-column layout: left = competitive comparison table, right = stacked insight panels (donut chart + feature coverage bars).

**Eyebrow:** `03 — RESEARCH & INSIGHTS`
**Heading:** `What the` (white) + `landscape showed` (lime)

**Intro paragraph:**
> Research combined personal use, market scanning of existing tools, and structural analysis of the sermon note-taking experience. The conclusion was clear: nothing on the market solves this specific use case well.

**LEFT — Competitive Advantage table (same structure as Savedup):**

Comparison: Snotes vs. YouVersion Notes, Logos, Evernote/Notion.

| Feature | Snotes | YouVersion | Logos | Evernote |
|---|:-:|:-:|:-:|:-:|
| Built for sermon note-taking | ✅ | ❌ | ❌ | ❌ |
| Inline scripture autocomplete | ✅ | ❌ | ❌ | ❌ |
| Auto-populated anchor scriptures | ✅ | ❌ | ❌ | ❌ |
| Action points as first-class entity | ✅ | ❌ | ❌ | ❌ |
| Service-aware reminders & focus mode | ✅ | ❌ | ❌ | ❌ |
| AI-driven reflection prompts | ✅ | ❌ | ❌ | ❌ |
| Offline scripture handling | ✅ | ✅ | ✅ | ❌ |
| Multi-translation support | ✅ | ✅ | ✅ | ❌ |
| Designed for the pew (not the study) | ✅ | ❌ | ❌ | ❌ |

**RIGHT — Insight panels (two stacked):**

**Panel 1 — Problem Validation (donut chart, 100% Richard):**
- Donut: 100% lime arc (the full circle, animated).
- Center text: `100%`
- Side text: *"of personal sermon notes — over six months of services — captured on the default phone Notes app. Not one was reopened after the week it was written."*

**Panel 2 — Market Coverage (horizontal bars):**
- Snotes: **100%** (lime)
- YouVersion: ~25% (blue `#60A5FA`)
- Logos: ~15% (violet `#A78BFA`)
- Evernote: ~10% (gray)
- Caption: *"Feature coverage across the nine pillars defined for sermon note-taking."*

---

## Section 04 — Hero Image Band (full-width visual break)

**Structure:** Same as Savedup's gap-band sections. Full-width framed Cloudinary image, but here a placeholder.

**Image placeholder:**
- Description: A wide cinematic shot. Either a worship-service scene with a person taking notes on their phone (warm, soft, real), OR a dramatic Snotes home-screen mockup with the wordmark featured. Lime border glow same as Savedup's hero band.
- Aspect: full-width, `height: 55vh`, rounded.
- Placeholder src: `null` — dark placeholder, caption *"Snotes — Visual band (Figma TBD)"*.

---

## Section 05 — Core Features

**Structure:** Same as Savedup section 05. Eyebrow + heading + intro, then alternating left/right feature blocks (text card + TiltFrame image).

**Eyebrow:** `05 — CORE FEATURES`
**Heading:** `Four wedges, one` (white) + `quiet companion` (lime)

**Intro paragraph:**
> Snotes is built around four wedges that, together, no existing tool combines. Each one resolves a specific problem the default Notes app can't solve.

**Five feature blocks (alternating left/right image placement):**

**FEATURE 01 — Inline Scripture Autocomplete**
Type "John 3:16" and a suggestion chip appears just above the cursor. Accept it, and the reference becomes a styled, tappable scripture chip. Tap the chip later to open the full verse — switch translations, render inline, or insert a snippet. Scripture is no longer plain text. It's structured data, recognised even offline.

*Image placeholder:* Phone mockup, capture mode, scripture autocomplete chip rising above cursor. Annotated callouts pointing to the detected pattern and the suggestion. Aspect 16/9.

**FEATURE 02 — Anchor Scriptures Auto-Populate**
Every accepted scripture chip auto-appends to the note's Anchor Scriptures list, deduplicated, with zero manual maintenance. The user gets a clean reference index for every sermon, automatically.

*Image placeholder:* Phone mockup showing a note's top header with an auto-populated anchor scriptures section listing five references. Aspect 16/9.

**FEATURE 03 — Action Points as a First-Class Entity**
Highlight any line in a note → mark it as an Action. Action points live in their own cross-note collection with three states: **Open**, **In Progress**, **Completed**. The sermon's purpose — application — finally has a place to live. AI gently follows up on long-open items: *"You wrote 'forgive my brother' three weeks ago. Anything to update?"*

*Image placeholder:* Phone mockup, action points tab showing items grouped by state, with parent-sermon context (minister, date) under each. Aspect 16/9.

**FEATURE 04 — Service-Aware Ambient AI**
Snotes knows your weekly service rhythm. It gently reminds before service, protects attention during (via Focus Mode and Do Not Disturb), and walks alongside afterward with a thoughtful cadence: three hours, next morning, three days, seven days. Never speaks during the service. Always dismissable.

*Image placeholder:* Phone mockup sequence — 3 cards stacked or side-by-side: pre-service reminder notification, in-service focus indicator, post-service reflection prompt. Aspect 16/9.

**FEATURE 05 — Degrade Gracefully, Restore Intelligently**
Network drops mid-service? Snotes keeps going. Reference-shape detection works against a local KJV cache. When the network returns, the app retroactively scans the note and converts recognised references into formatted chips. *Inspired by how Grammarly behaves when Wi-Fi drops in Google Docs — work continues, intelligence catches up.*

*Image placeholder:* Visual diagram or split phone view showing offline note-taking on one side and online retroactive tagging on the other. Aspect 16/9.

---

## Section 06 — User Personas

**Structure:** Same as Savedup section 06. Heading + intro + the existing `PersonaSection` accordion component (3 personas).

**Eyebrow:** `06 — USER PERSONAS`
**Heading:** `Who this was` (white) + `designed for` (lime)

**Intro paragraph:**
> Three distinct believer archetypes shaped every product decision — from feature priority to the AI's tone of voice.

**Persona 1 — Richard**
*"The Pentecostal Note-Taker"*
> Richard is a 26-year-old Christian designer in Lagos, Nigeria. A graduate of the School of Ministry at the Segun Obadje Teaching Ministry, he attends Sunday Service, Bible Study, and occasional conferences. He takes notes on his phone every Sunday but can never find them again. His action points die in untitled notes. He wants a tool that respects his rhythm — quiet during service, gently attentive after.

**Persona 2 — Tosin**
*"The Reflective Believer"*
> Tosin is a 24-year-old young professional in Lagos who attends church weekly with her partner. She values revisiting what she's heard and journaling reflections on it, but the existing Notes app makes that hopeless. She wants a private space to capture sermons and a way to share thoughtfully with her partner — without it becoming social media.

**Persona 3 — Pastor Daniel**
*"The Teaching Minister"* *(V4 candidate)*
> Pastor Daniel is a 38-year-old minister leading a small Pentecostal church in Ibadan. He'd love for his congregation to have a structured way to capture his teachings — and eventually, a way for him to publish sermon notes branded for his church that members can subscribe to. He represents the V4 horizon, not the V1 user, but his needs shape long-term architecture.

**Image placeholders (3) — to be displayed inside the PersonaSection component:**
- Persona 1: Stylised portrait of a young Nigerian man with a Bible/phone, looking thoughtful.
- Persona 2: Stylised portrait of a young Nigerian woman, journaling.
- Persona 3: Stylised portrait of a Nigerian pastor in a small church setting.
- Placeholder src: `null` for each — render dark placeholder blocks inside the accordion panels.

---

## Section 07 — Who It's For

**Structure:** Same as Savedup section 07. Heading + intro + 3-card grid of audience segments + shared-challenges chip strip.

**Eyebrow:** `07 — TARGET USERS`
**Heading:** `Who uses` (white) + `Snotes?` (lime)

**Intro:**
> Snotes is built for African Pentecostal and charismatic believers — Nigeria first, then West Africa, then the broader English-speaking Christian world.

**Three audience cards:**

**Card 1 — Young Adult Believers** (lime accent)
*Smartphone-first churchgoers, 22–35, attending at least one weekly service. The V1 and V2 primary audience.*

**Card 2 — Married Couples** (blue accent `#60A5FA`)
*Spouses who attend church together and want shared visibility into each other's notes — the V2 spouse-mode audience.*

**Card 3 — Small Groups & Ministry Teams** (violet `#A78BFA`)
*Bible study groups, ministry teams, and church leadership circles who want to share what they've heard with people who already pray for them.*

**Shared challenges chip strip (under cards):**
- Notes lost in default app
- No structure for sermon context
- Action points never revisited
- Difficulty staying engaged across weeks
- Sermon reflection rarely happens

---

## Section 08 — Product Phases (the V1 / V2 / V3 progression — SNOTES-SPECIFIC SECTION)

**Structure:** This section is unique to Snotes. Use the same component scaffolding as Savedup's section 08 (two-column with left: SLabel + heading + intro + bullet list, right: TiltFrame image), but the body is the three-phase progression.

**Eyebrow:** `08 — PRODUCT STRATEGY`
**Heading:** `Three phases.` (white) + `One product.` (lime)
**Lime divider line below heading.**

**Intro (two paragraphs):**

Para 1:
> Snotes is structured to earn the right to scale. Each version answers a distinct question. V1 doesn't try to be V3. The product matures alongside the people using it.

Para 2 — pull quote (italic, with a lime left border, same treatment as YDPay's executive summary blockquote):
> *"V1 is for you. V2 is for the people who pray for you. V3 is for the people you've never met but who carry the same Bible to church on Sunday."*

**Bullet list (3 items):**

- **V1 — Snotes for One** *(Android · ~1 month build · personal use)*
  A personal journal. One user, one device, no accounts, local-first. The minimum useful product to replace the default Notes app for sermon note-taking. Tests one question: *Does this work for me?*

- **V2 — Snotes for the Close Circle** *(Android · 1.5-month closed beta · 3–4 invited users)*
  Adds identity, sync, and small trusted Circles — spouse, small group, ministry team. "Connective, not social" is the governing principle: no feed, no public counts, no streaks. Action points stay private. Tests: *Does this work for us?*

- **V3 — Snotes for the Church** *(Android + iOS + Web · public release · Naira-first pricing)*
  Open release on Play Store and App Store. Freemium model: public-domain translations and core features free; licensed translations (NKJV, NIV, AMP), multi-device sync, and Circles paid. Tests: *Does this work for the Church?*

**Right-column image placeholder (TiltFrame, aspect 4/5):**
- Description: A vertical infographic — three stacked panels (V1 / V2 / V3) showing each version's user count, platform icons, key unlocked features, and lime accent dot. Visual progression: solo → small group → public.
- Placeholder src: `null`.

---

## Section 09 — Scripture Architecture (SNOTES-SPECIFIC SECTION — borrows YDPay IA grid treatment)

**Structure:** Borrow YDPay's Information Architecture section (YDpayPage.jsx section 07). A heading + intro + a `StaggerGrid` of color-coded cards showing the three-layer Bible API stack.

**Eyebrow:** `09 — SCRIPTURE ARCHITECTURE`
**Heading:** `How scripture` (white) + `actually works` (lime)

**Intro:**
> A three-tier layered approach to Bible content. Ensures every user has a translation that matches their context, the network never breaks the experience, and the architecture is already structured for a future commercial transition.

**Grid of three layer cards (full-width, 3 columns on desktop, stacked on mobile, same treatment as YDPay's IA grid):**

**Card 1 — Layer 1 · Offline Cache** (lime accent dot)
- Translation: KJV (King James Version)
- Source: Local SQLite cache, ~5MB
- Offline: Yes
- Usage: Autocomplete baseline, always-available fallback, retroactive tagging when network returns.

**Card 2 — Layer 2 · Primary API** (blue accent dot `#3B82F6`)
- Translations: NKJV, NIV, AMP
- Source: API.Bible (Starter — non-commercial, V1/V2)
- Offline: No
- Usage: Default translations for V1, used in scripture popups.

**Card 3 — Layer 3 · Public-Domain Fallback** (yellow accent dot `#F59E0B`)
- Translations: BSB, WEB
- Source: HelloAO Free Use Bible API (MIT licensed)
- Offline: No (cacheable)
- Usage: Redundancy when Layer 2 unavailable.

**Footer info chip below grid (same as YDPay's "info" footer):**
> ℹ️ *V3 transitions to API.Bible Pro (commercial license) for NKJV/NIV/AMP/MSG with FUMS reporting integrated. V1 architecture is already structured for this transition — no rewrite needed.*

---

## Section 10 — Information Architecture

**Structure:** Same treatment as YDPay's section 07 (IA grid). 6 cards showing the core V1 entities and their relationships.

**Eyebrow:** `10 — INFORMATION ARCHITECTURE`
**Heading:** `The V1` (white) + `data model` (lime)

**Intro:**
> A snapshot of the V1 information model. V2 adds Accounts, Circles, and Shares. V3 adds Subscriptions and Localisation.

**Grid of 6 IA cards (2–3 columns, same color-dot treatment as YDPay):**

| Card | Color | Entity | Fields | Notes |
|---|---|---|---|---|
| 1 | lime | **Note** | id, service_id, minister, date, body, anchor_scriptures[] | The core artifact |
| 2 | blue `#3B82F6` | **Service** | id, name, day_of_week, start_time, end_time, location | Powers reminders & focus mode |
| 3 | violet `#A78BFA` | **Scripture Chip** | reference, translation, expanded_state | Inline element inside Note.body |
| 4 | yellow `#F59E0B` | **Action Point** | id, note_id, text, state (Open/In-Progress/Done) | Cross-note queryable; never auto-shared |
| 5 | pink `#EC4899` | **Reflection** | id, note_id, prompt, response, timestamp | AI-initiated; appended to note |
| 6 | gray | **Settings** | user_name, church, translation_default, dnd_permission | One-time onboarding + editable |

---

## Section 11 — Key Design Decisions (FAQ-style, borrowed from YDPay)

**Structure:** Borrow YDPay's section 06 treatment (`StaggerGrid` of question-and-answer cards). Each card has a number badge, a question (the *why*), and a short answer. Two-column grid on desktop, single-column on mobile.

**Eyebrow:** `11 — KEY DESIGN DECISIONS`
**Heading:** `The principled` (white) + `calls behind Snotes` (lime)

**Intro:**
> Every product is a series of "why this, not that?" choices. These are the principled calls behind Snotes — and the anti-patterns deliberately excluded.

**Six decision cards (FAQ structure):**

**DECISION 01 — Why a dedicated app, not a feature inside YouVersion or Notion?**
Sermon note-taking is a peculiar use case — constant interleaving of scripture with personal reflection, action points as first-class commitments, weekly service rhythm. YouVersion treats notes as an afterthought inside a Bible app. Notion treats them as generic documents. Neither understands the anatomy of a sermon. A dedicated app earns the right to make every choice in service of one experience.

**DECISION 02 — Why Android-only for V1 and V2?**
My primary device is Android. Halving build effort by skipping iOS in early phases is intentional — V1 and V2 exist to validate the experience, not to maximise distribution. iOS comes in V3 when the product earns the platform expansion.

**DECISION 03 — Why "ambient, not assertive" for AI?**
The phone is the enemy of presence. AI that speaks during a service is hostile to the moment it's meant to deepen. So Claude is silent during the service window, gentle around it, and never demands attention. Reverence by design, not by accident.

**DECISION 04 — Why "connective, not social" for V2 sharing?**
Sharing sermon notes with people who already pray for you is good. A public feed of who's the most spiritual is not. V2 closes off five drift paths: opt-in sharing per artifact, action points always private, no metrics, no algorithmic surfacing, no public reaction counts. Snotes can quietly lose its soul at any version transition — V2's job is to hold the line.

**DECISION 05 — Why hardcode the bright lines (no ads, no data sales, no gamification)?**
Engagement-driven monetisation models eventually push products toward dark patterns. By writing "no ads, no data sales, no gamification" into the product's DNA before launch, we remove the option to drift later under revenue pressure. The bright lines hold even at 100,000 users.

**DECISION 06 — Why a three-layer Bible API stack?**
A single API source means a single point of failure. The three-layer stack (offline KJV cache → API.Bible licensed → HelloAO public-domain fallback) gives users the translations they actually want without legal exposure for personal use, while keeping the architecture structured for commercial transition in V3 without a rewrite.

---

## Section 12 — Business Model (Concept) — SNOTES-SPECIFIC, ABRIDGED

**Structure:** Single-column FadeUp section. Heading + 3-tier pricing/value layout. Same card treatments as YDPay's executive summary blocks.

**Eyebrow:** `12 — BUSINESS MODEL`
**Heading:** `Freemium, with` (white) + `bright lines` (lime)

**Intro:**
> Snotes' V3 business model is freemium, naira-first, with a small set of paid features that respect the product's soul.

**Two-column block:**

**LEFT — Free Tier card (white accent, default treatment):**
> **Free — Always**
> - Unlimited notes
> - Public-domain translations (KJV, BSB, WEB)
> - Scripture autocomplete
> - Action points (no limit)
> - Service-aware reminders
> - Focus mode
> - Single-device cloud backup
> - Limited AI reflection prompts (3 per note)

**RIGHT — Snotes Plus card (lime accent, "delivery card" treatment from YDPay):**
> **Snotes Plus — Paid**
> - Licensed translations (NKJV, NIV, AMP, MSG, ESV)
> - Multi-device sync
> - Circles & selective sharing
> - Spouse mode
> - Unlimited AI reflections
> - Priority support

**Below the two cards — Bright Lines strip:**

> **Permanent non-goals — no exceptions, at any user count:**
> No ads · No data sales (including aggregated) · No gamification · No public feed · No AI sermon generation

---

## Section 13 — What's Next

**Structure:** Same as Savedup section 09 (Testing). Two-column grid — left: SLabel + heading + body + bullet list, right: TiltFrame image.

**Eyebrow:** `13 — WHAT'S NEXT`
**Heading:** `From concept` (white) + `to first build` (lime)
**Lime divider line below heading.**

**Body paragraphs:**

> The concept phase is complete. Three concept documents (V1, V2, V3) totalling ~10,000 words of structured product thinking sit behind this page. The next deliverables are already in motion.

> V1 build begins next quarter. Design first — visual identity, UI system, key flow mockups — then engineering. Snotes ships when it's quietly excellent. Not before.

**Bullet list (5 items):**
- **Marketing strategy** — channels, positioning, go-to-market for Nigerian Pentecostal/charismatic communities
- **Project timeline** — V1 → V2 → V3 calendar with milestones
- **Financial projection** — running costs, monetisation model, naira/USD scenarios, break-even analysis
- **Product architecture** — data model, sync strategy, AI prompt design
- **V1 PRDs** — technical requirements and engineering specs

**Right-column image placeholder (TiltFrame, aspect 4/5):**
- Description: A roadmap visualisation — horizontal phase timeline (Concept → Architecture → V1 Build → V1 Testing → V2 → V3), with current position marked. Or a Figma file thumbnail showing wireframes in progress.
- Placeholder src: `null`.

---

## Section 14 — Reflection & Learnings

**Structure:** Same as Savedup section 11. Single FadeUp card with body + author chip at the bottom.

**Eyebrow:** `14 — LEARNINGS`
**Heading:** `Reflection &` (white) + `learnings` (lime)

**Body (3 paragraphs):**

> Snotes reinforced something I'd been circling for a while: the best products are built quietly, for one user, before they're built for everyone. The temptation in product strategy is to design for the public release first — to imagine the V3 audience and reverse-engineer the V1 from there. That path produces a product trying to be everything to everyone, and pleasing no one.

> Building Snotes "the same way I built Opus — first for me, perhaps later for others" is the philosophical anchor. It forces honest decisions. If V1 doesn't actually work for me, V2 has no reason to exist. If V2 doesn't deepen relationships in my closest circle, V3 has no soul to scale. The phased rollout isn't a feature list — it's an integrity check.

> This case study also reinforced that **product strategy is design**. Choosing what *not* to build is craft. Drawing the bright lines (no ads, no data sales, no gamification) before launch is the most consequential design decision Snotes will ever make — because it removes the option to drift under future pressure. Visual design comes next; the strategy makes the visuals possible.

**Author chip at bottom (same treatment as Savedup):**

> **Richard Enoch** — *Founder & Product Designer · Snotes Case Study · 2026*

---

## Section 15 — Footer Components (reuse existing)

- `<OtherProj currentSlug="snotes" currentKind="ui" />`
- `<BuildSection />`

---

# CLAUDE CODE BUILD PROMPT

> Paste the prompt below into Claude Code to generate `client/src/pages/SnotesProject.jsx`.

---

```
I want you to create a new hardcoded UI/UX case study page for the Snotes project. It must follow the exact same architecture and visual system as SavedupProject.jsx (the established UI/UX case study template) — same component scaffolding, same FadeUp/SlideIn/StaggerGrid animation primitives, same SLabel/H2/TiltFrame components, same lime accent color (GR = "#a3e635").

The page must live at: client/src/pages/SnotesProject.jsx
The route must be: /ui-projects/snotes
Register the route in main.jsx (or wherever the router is configured) without breaking any existing route.

The case study content is fully specified in a markdown document I will provide separately (Snotes_CaseStudy.md). Read it in full and build the page following its section structure EXACTLY — 15 sections numbered 00 through 15, in order:

00. Hero
01. The Brief
02. The Problem
03. Research & Insights
04. Hero Image Band (full-width visual break)
05. Core Features
06. User Personas
07. Who It's For
08. Product Phases (V1/V2/V3) — SNOTES-SPECIFIC
09. Scripture Architecture — SNOTES-SPECIFIC, borrow YDPay IA grid treatment
10. Information Architecture
11. Key Design Decisions (FAQ-style, borrow YDPay's section 06 treatment from YDpayPage.jsx)
12. Business Model — SNOTES-SPECIFIC, abridged
13. What's Next
14. Reflection & Learnings
15. Footer (OtherProj + BuildSection)

CRITICAL RULES:

1. Match Savedup's visual system. Reuse its FadeUp, SlideIn, StaggerGrid, SLabel, H2, TiltFrame, PersonaSection components exactly. Where a section in the markdown says "borrow YDPay treatment," look up that section in YDpayPage.jsx and replicate the component pattern.

2. ALL images are placeholders. Do not use any Cloudinary URLs. Wherever the markdown says "image placeholder," render a dark placeholder block:
   - Same outer treatment as TiltFrame (border, rounded corners, aspect ratio specified in markdown)
   - Inside the placeholder: a centered caption in muted white text describing what the image will be (e.g. "Snotes — Hero composition (Figma TBD)")
   - Use a CSS background like bg-white/[0.02] or bg-[#0A0D12] for the placeholder fill
   - Keep the TiltFrame's tilt-on-hover effect even on placeholders — Richard will replace src values later

3. The PersonaSection (for section 06) should keep the same accordion structure as Savedup, but with 3 Snotes personas (Richard / Tosin / Pastor Daniel) and dark placeholder blocks instead of persona images.

4. The competitive comparison table (section 03) compares Snotes vs. YouVersion / Logos / Evernote (NOT PiggyVest / Cowrywise). Use the same table treatment as Savedup.

5. Sections marked SNOTES-SPECIFIC (08, 09, 12) do not exist in Savedup or YDPay verbatim — build them using the markdown's specified treatment (which references the closest analogous section in either reference file).

6. Slug for the OtherProj component at the footer: "snotes", currentKind: "ui".

7. The eyebrow chip at the top of the hero must read "UI / UX Case Study · Concept" — the "· Concept" is intentional and signals to recruiters this is concept-stage work, not a shipped product.

8. Use the lightbox lightboxing logic from Savedup (Lightbox component + openLightbox handler) — but since images are placeholders, wire the placeholders to log a console message "Image placeholder clicked — replace src in code" instead of opening the lightbox. When Richard adds real image URLs later, the lightbox will work automatically.

9. Do NOT modify any other file beyond:
   - The new SnotesProject.jsx
   - The router file (only to add the /ui-projects/snotes route)

When done, report:
- File path of the new component
- The new route URL
- A list of all image placeholders with their descriptions (Richard will use this list to create Figma designs)
- Any sections where the markdown's specification was ambiguous and you made a judgment call

Do not deploy or commit. Just create the file and route.
```

---

# IMAGE PLACEHOLDER INVENTORY

For your Figma design phase. Once mockups exist, upload to Cloudinary and replace placeholder srcs in the component.

| # | Section | Description | Aspect |
|---|---|---|---|
| 1 | 00 — Hero | Wordmark lockup OR single phone in capture mode with scripture chips inline | 16/9, 60vh max |
| 2 | 02 — Problem | Split visual: chaotic phone Notes app vs. structured Snotes note | 4/5 (TiltFrame) |
| 3 | 04 — Hero band | Cinematic shot — service scene with note-taker OR dramatic Snotes home screen | full-width, 55vh |
| 4 | 05.1 — Feature 1 | Phone mockup: scripture autocomplete chip rising above cursor | 16/9 |
| 5 | 05.2 — Feature 2 | Phone mockup: auto-populated anchor scriptures at top of note | 16/9 |
| 6 | 05.3 — Feature 3 | Phone mockup: action points cross-note view with sermon context | 16/9 |
| 7 | 05.4 — Feature 4 | Phone mockup sequence: pre-service / in-service / post-service notifications | 16/9 |
| 8 | 05.5 — Feature 5 | Visual diagram: offline note-taking + online retroactive tagging | 16/9 |
| 9 | 06.1 — Persona 1 | Stylised portrait: young Nigerian man with Bible/phone, thoughtful | accordion |
| 10 | 06.2 — Persona 2 | Stylised portrait: young Nigerian woman journaling | accordion |
| 11 | 06.3 — Persona 3 | Stylised portrait: Nigerian pastor in small church | accordion |
| 12 | 08 — Phases | Vertical infographic: V1/V2/V3 stacked panels with feature progression | 4/5 (TiltFrame) |
| 13 | 13 — What's Next | Roadmap visualisation OR Figma file thumbnail with wireframes | 4/5 (TiltFrame) |

**Total: ~13 unique visual assets needed** (vs. ~25–30 in the first draft — leaner because we're leaning on text density and structure for impact, not screen volume).
