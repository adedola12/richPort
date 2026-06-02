# SESSION_LOG.md

Single catch-up document for the next session. Read this first — then check the reference docs below for detail.

**Date:** 2026-06-01  
**Session type:** UI polish, new case study page, NIQS integration, portfolio audit

---

## Reference documents (read before duplicating anything)

| File | What it covers |
|---|---|
| `HANDOFF.md` | Full codebase map — routing, models, API endpoints, deployment, design system, working conventions |
| `Snotes_CaseStudy.md` | Content + build spec for `SnotesProject.jsx` — all 13 images are Figma TBD |
| `Niqs_CaseStudy.md` | Content + build spec for `NiqsUIProject.jsx` — all images are Figma TBD |
| `PORTFOLIO_AUDIT.html` | Critical honest audit of the portfolio (styled HTML, senior-recruiter perspective) |
| `SESSION_PROGRESS.html` | Previous session progress log — NIQS structural decisions, earlier session context |
| `PORTFOLIO_ROADMAP.html` | Longer-term roadmap for the portfolio |

---

## What was completed this session

### NIQS integration — ProjectGrid
- `STATIC_BRAND_PROJECTS` emptied (was `[]` already; all brand projects now from DB)
- NIQS added as a `kind: "ui"` entry in `STATIC_UI_PROJECTS` with `categories: ["Product UI/UX Designs", "Brand Identity Designs"]`
- Filter logic updated so `kind: "ui"` items with matching categories appear in non-UI tabs (e.g. Brand Identity tab now shows NIQS)
- Brand Identity tab order enforced: **TabStudio → NIQS → VerdeLuxe → BookRion → Cleanstead**
  - Achieved via `BRAND_SLUG_ORDER` array + sort on `mappedDefaultProjects` (DB projects come in unknown API order)
  - NIQS UI item injected between `firstBrand` (TabStudio) and `restBrand` in the `combined` useMemo
- `NIQS_THUMB` uses `/NIQSEmblemDark.png` (the 3D dark emblem PNG, not the SVG logo)
- **Bug fixed:** `NIQS_THUMB` was declared below where it was used inside `STATIC_UI_PROJECTS` — temporal dead zone error. Moved declaration to before the array.

### NIQS public assets
Files added to `client/public/`:
- `NIQSEmblemDark.png` — 3D heraldic emblem on dark background (hero bg, thumbnail)
- `NIQSEmblemLight.png` — 3D heraldic emblem on light background
- `NIQSHorizontal.svg` — horizontal lockup (wordmark + emblem)
- `NIQSColor.svg` — full-color official logo (used in hero and brief card)

### NiqsUIProject.jsx — full hero + layout redesign
- **Hero:** Full-width `min-h-[82vh]` with `/NIQSEmblemDark.png` as background
- **Hover effect:** `scale(1.06)` zoom on hover (CSS transition, no crossfade — dark emblem only, single image)
- **Gradient overlay:** `linear-gradient(to bottom, rgba(7,9,12,0.4) 0%, rgba(7,9,12,0.35) 30%, rgba(7,9,12,0.92) 55%, #07090C 100%)` — transparent window shifted upward so the emblem is visible higher up the frame
- **Back button:** Changed from `<Link to="/ui-projects">` to `<button onClick={handleBack}>` using `navigate(-1)` with fallback to `"/projects"`. Reason: `/ui-projects` was showing "No UI projects found" error (that page fetches from DB; NIQS is static-only)
- **Hero content:** Centered, `/NIQSColor.svg` logo, eyebrow chip "UI / UX Case Study · Institutional Redesign"
- **Section 01 brief:** Right column has MY ROLE card + NIQS logo card (navy `#000066` background, full-color logo)
- **Deliverables:** Single-line `overflow-x-auto` scrollable row with `shrink-0` chips (not wrapping)
- **Section 06 website screens:** Expanded to `max-w-[1300px]`, TiltFrame at `aspectRatio: "16/9", maxHeight: "70vh"`
- **Section 14 gallery:** 12-slot desktop bento (5-row CSS grid, 12 columns). Row 1 = 3 uneven slots (5+4+3). Slot 5 (row 2) split into two even lengths. Mobile: 2-column grid. All slots are dark placeholders pending Figma.

### PickACard (Home — featured cards)
- Card 3 replaced with NIQS: `tag: "Brand & Digital"`, `title: "NIQS"`, `subtitle: "Institutional Redesign"`, `href: "/ui-projects/niqs"`, `accent: "#D9B650"`, `img: "/NIQSEmblemDark.png"`
- Removed unused imports `uiThumb` and `wi4`

### Portfolio audit
- `PORTFOLIO_AUDIT.html` created at project root
- Styled HTML document — same color theme as portfolio (`#07090C` bg, lime `#a3e635` accent, Outfit font)
- 8 sections: Positioning, Audience Fit (30–90s), Project Selection, Case Study Depth, Narrative Coherence, Weaknesses & Blind Spots, Interview Questions, Honest Verdict

---

## Key decisions made and reasoning

| Decision | Reasoning |
|---|---|
| NIQS dual-tab via single entry + category array | Avoids two separate entries pointing to the same page; single source of truth; filter logic checks category match for UI items in non-UI tabs |
| `navigate(-1)` for back button | Hardcoded `/ui-projects` showed "No UI projects found" — that page is DB-driven; NIQS is static. History back is always correct regardless of entry path |
| Single dark emblem, zoom only (no crossfade) | User changed request mid-session: "leave it alone on the dark emblem, just slightly zoomed in on hover." Simpler, less distracting |
| Gradient transparent window shifted up | User wanted to see more of the emblem before the dark fade. Moved near-solid opacity from 72% to 55% of the frame height |
| `BRAND_SLUG_ORDER` constant | DB API returns projects in unknown order. Deterministic sort array is the cleanest fix that doesn't require any DB changes |
| `STATIC_BRAND_PROJECTS = []` | All brand projects now live in MongoDB. The static array is kept as an injection point (empty) in case static overrides are needed later |

---

## What's still pending / in-progress

### Figma mockups needed (everything is placeholder)

| Page | Placeholder count | What's needed |
|---|---|---|
| `NiqsUIProject.jsx` | All 12 bento slots + Section 06 screen | Figma: website, portal, admin dashboard, brand guideline spreads |
| `SnotesProject.jsx` | 13 image slots | Figma: app screens (capture mode, history, scripture chips, AI summary) |
| `QuivProject.jsx` | 9 screenshot slots | Can grab from `extra/Quiv/Quiv_Measure_v4.html` (HTML prototype exists) |
| `NIQSProject.jsx` (brand case study) | Gallery spreads | Can screenshot from `extra/NIQS Brand Guideline.html` |

### Other pending work
- **About page** — hero headline copy not yet reviewed
- **Mobile aspect ratio sweep** — images should consistently use square / near-square / 4:5 across all sections on mobile (noted but not implemented as a code change)
- **"I built this portfolio" credit** — footer or About page, confirmed direction, not written yet
- **Load performance** — `loading="lazy"` sweep, Cloudinary `q_auto,f_auto`, `React.lazy()` for heavy pages
- **LinkedIn bio / CV summary line** — copy direction confirmed, not written
- **Contact page** — `/contact` route exists in Nav but no page component exists

### Portfolio audit action items (from `PORTFOLIO_AUDIT.html`)
- Rewrite About page copy to emphasise QS-to-design crossover
- Differentiate the brand case study templates (TabStudio, VerdeLuxe, BookRion are visually identical)
- Add quantified outcomes to case studies where possible
- Rate card framing review

---

## Open questions for next session

1. **Quiv screenshots** — do you want to pull them from the HTML prototype now, or wait until there are proper Figma mockups?
2. **NIQS brand guideline screenshots** — same question re: `extra/NIQS Brand Guideline.html`
3. **NiqsUIProject.jsx vs NIQSProject.jsx** — currently two separate pages. `NiqsUIProject.jsx` (`/ui-projects/niqs`) is the polished one. `NIQSProject.jsx` (`/projects/niqs`) is the older brand case study that was deactivated from the Brand Identity tab. Should the old one be deleted, redirected, or kept for the brand-only view?
4. **Portfolio audit** — which findings do you want to act on first? (Copy, structure, or case study visuals?)

---

## Current state of the codebase

### What's working
- Home: hero, ProjectGrid (all tabs + filtering), PickACard fan animation, all sections
- All hardcoded brand case studies: NIQS, TabStudio, VerdeLuxe, BookRion, Cleanstead
- All hardcoded UI/UX case studies: YDpay, Savedup, Snotes, Quiv, **NiqsUIProject** (structure done, images placeholder)
- Graphic design pages: ADLMStudio, Whitespace, YDpay Designs, Website Design, Presentation Design
- Routing, auth, admin dashboard, rate enquiry form all functional
- NIQS shows in both UI/UX and Brand Identity tabs, routes to `/ui-projects/niqs`

### What's placeholder / incomplete
- Every image in `NiqsUIProject.jsx`, `SnotesProject.jsx`, `QuivProject.jsx` is a dark placeholder block
- `NIQSProject.jsx` (brand case study at `/projects/niqs`) is older and no longer linked from the main grid — effectively dormant

### Modified files not yet committed
```
client/src/components/About/ShortIntro.jsx
client/src/components/Home/ProjectGrid.jsx
client/src/main.jsx
client/src/pages/About.jsx
client/src/pages/BookRionProject.jsx
client/src/pages/VerdeLuxeProject.jsx
client/src/pages/YDpayPage.jsx
```
New untracked:
```
client/src/pages/QuivProject.jsx
PORTFOLIO_ROADMAP.html
PORTFOLIO_AUDIT.html
SESSION_LOG.md (this file)
extra/  (source assets — not shipped to client)
```
