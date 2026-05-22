# RichPort Portfolio — UI Kit

A high-fidelity recreation of [richardenoch.com / rich-port.vercel.app](https://rich-port.vercel.app) as a single click-through prototype. Built from the source repo at `richPort-main/client/src/`, with the tokens, components, and motion lifted directly. Bundled assets live in `../../assets/`.

## Run it

Open `index.html` in any browser. No build step — React + Babel are loaded from CDN; JSX is transpiled in the browser. Asset paths are relative; copy the whole folder to keep them working.

## Screens

The prototype routes between five screens via an in-app router (no react-router; one `useState`). Each screen below maps to a route in the live product:

| Screen | Route in live product | Components on screen |
|---|---|---|
| **Home** | `/` | `Nav` · `Hero` · `Partners` · `ProjectGrid` (filter tabs) · `Process` · `AboutMe` · `BuildCTA` · `Footer` |
| **About** | `/about` | `Nav` · `AboutMe` · Competencies pills + Tools row · `Footer` |
| **Projects** | `/projects` | `Nav` · `ProjectGrid` (full-height) · `Footer` |
| **Project detail** | `/projects/:slug` | `Nav` · `ProjectDetail` (hero pill, title, meta block, hero image, write-up) · `Footer` |
| **Rate Card** | `/rate-details` | `Nav` · `RateCard` (category tabs, 3-up pricing, comparison CTA) · `RateForm` (underline inputs, checkbox grid, budget slider) · `Footer` |

Admin sign-in (`/admin-auth`) is acknowledged but not implemented; the icon-button in the nav routes to a placeholder.

## Component map

```
Icons.jsx       — All inline SVG icons used. Mirrors react-icons shapes.
Data.jsx        — PROJECTS, TABS, PARTNERS, PROCESS_STEPS (mirrors backend shape).
Nav.jsx         — Fixed glass top bar with emerald→white→sky gradient.
Hero.jsx        — Full-bleed photo hero, sequential reveal of pill→headline→sub→buttons.
Sections.jsx    — Partners, Process, AboutMe, BuildCTA, Footer.
ProjectGrid.jsx — Filter tab bar + 2-up project card grid.
ProjectDetail.jsx — Case-study layout (hero, meta, image, body, CTA).
RateCard.jsx    — Category tabs, 3 pricing cards with featured center, full enquiry form.
App.jsx         — Routes + page transition + screen labels.
styles.css      — All page-level styles; imports `../../colors_and_type.css`.
```

## What lines up pixel-perfect

- **Colors** — surfaces, lime ramp, accent supports come straight from the codebase (every hex in `colors_and_type.css` was traced back to its Tailwind class or inline value).
- **Type families** — Outfit, Lexend, Gabarito, Great Vibes loaded as in the original. Manrope substitutes for Mont, with the same weights.
- **Spacing & layout** — section padding (`py-16 / py-20 / py-24`), max widths (1200 / 1377 / 1457 px), card heights (533 px project, 181 px process) preserved.
- **Motion** — single `cubic-bezier(.22,.61,.36,1)` curve, 550 ms page transition with opacity + y + blur.
- **Component anatomy** — eyebrow pills, project card layout, pricing card 3-cell, underline inputs all read 1:1 against the source.

## What's a deliberate trade-off

- **TypingText is simplified.** The source has a per-word stagger via a custom component. Here it's a four-step `setTimeout` fade with the same end visuals.
- **Framer Motion is not used.** All animation is plain CSS transitions + `@keyframes`. The easing curve is identical.
- **Routing.** Live product uses React Router v7; this is one `useState`. The structure is intentionally easy to swap.
- **Backend.** Live data fetches (`/api/projects`, `/api/ui-projects`, `/api/graphic-projects`, `/api/rates`) replaced with the static `Data.jsx` and `RATE_CATEGORIES` in `RateCard.jsx`.
- **Admin tabs** intentionally omitted — they aren't part of the public visual system.
- **Project detail** is a single layout; the source has separate `ProjectPage` (brand) and `UIProjectPage` (UX with personas, flows, etc.) layouts.

## Reusing components

All Babel scripts export their components to `window` at the bottom of each file. To pull a component into a new HTML mock:

```html
<link rel="stylesheet" href="path/to/colors_and_type.css">
<link rel="stylesheet" href="path/to/styles.css">

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="…"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="…"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="…"></script>

<script type="text/babel" src="Icons.jsx"></script>
<script type="text/babel" src="Data.jsx"></script>
<!-- include only what you need -->
<script type="text/babel" src="Nav.jsx"></script>
<script type="text/babel" src="Hero.jsx"></script>

<script type="text/babel">
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.Fragment>
      <Nav active="home" onNavigate={() => {}} />
      <Hero onPrimary={() => {}} onSecondary={() => {}} />
    </React.Fragment>
  );
</script>
```
