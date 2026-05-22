---
name: richport-design
description: Use this skill to generate well-branded interfaces and assets for RichPort (Richard Enoch's design portfolio), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# RichPort Design Skill

Read the `README.md` file within this skill, and explore the other available files.

## What's in the box

- `README.md` — full design system: brand voice, content fundamentals, visual foundations, iconography, and an index of every file.
- `colors_and_type.css` — drop-in CSS custom properties for color, type, motion, radii, shadows, spacing. Includes `.btn-lime`, `.btn-ghost`, `.eyebrow-pill`, `.card-project`, and other small utility primitives.
- `assets/` — logos, partner marks, portrait photography, project mockups, brand glow assets, ~22 tool icons. Use these instead of inventing new visuals.
- `preview/` — 29 self-contained HTML cards. Each card stands alone as a visual reference for one concept (a swatch group, type specimen, button row, etc). These double as ready-made specimens you can lift into mocks.
- `ui_kits/portfolio/` — a working interactive recreation of the live portfolio at richardenoch.com. Use as a reference for component composition.

## How to use this

If creating visual artifacts (slides, mocks, throwaway prototypes, single-page sites), copy the assets you need from `assets/` and reference `colors_and_type.css` directly. The CSS variables are the canonical tokens — never invent new colors or spacings. Look at the relevant `preview/` card for any concept you're applying.

If working on production code that needs to match the RichPort look:
- Pull palette + type tokens from `colors_and_type.css`.
- Mirror component anatomy from `ui_kits/portfolio/` (Nav, Hero, ProjectGrid, ProjectDetail, RateCard, etc.).
- Read the **Voice and tone** section in the README before writing copy.

If the user invokes this skill without other guidance, ask them what they want to build or design, ask some clarifying questions (audience, surface, length, fidelity), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## The brand in one paragraph

Dark studio canvas (`#050505` / `#0B0B0B`), single lime accent (`#84CC16` with a brighter `#89FF00` for tag outlines), **Outfit** across every role (display, body, UI, eyebrow — weight + size + tracking carry the hierarchy). Tight, visually-compact type: 1.05 line on display, 1.5 on body, −0.02 to −0.05em letter-spacing. Eyebrow pill above every section title. Lime radial glows behind every section. Cards with `28 px` radii on a warm desaturated gradient that flips to a neon-lime border on hover. Buttons either gradient lime with black text or white-outline ghost — never colored otherwise. No emoji. Animation is one cubic-bezier curve, no bounces. Voice is first-person, warm, conversational.

## Things to avoid

- Bluish-purple gradients of any kind.
- Emoji as decoration (one `IconFire` from Heroicons is the closest the system gets, and only on a "Recommended" pricing pill).
- Cards that lean on a colored left-border accent.
- Inventing icons via raw SVG when `assets/icons/` has 22 + the favicon mark, or when react-icons / Lucide can supply them.
- Light backgrounds. The system is dark-only.
- Multiple bright accents. Lime is the only chromatic colour; everything else is a near-black, a neutral grey, or white.

## Substitutions flagged

- **Single-font system.** Outfit covers every role. The source codebase referenced four sans families plus a script wordmark; they were collapsed onto Outfit for a tighter, more disciplined voice. If you ever need to restore the original multi-family setup, the imports + `--font-*` variables are the only edit points.
- **Custom logo pending.** The wordmark is currently set in Outfit Medium at clamp(20–28 px) with −0.04em tracking. Drop the real logo into `assets/` and replace the `.nav-wordmark` / `.footer-wordmark` content when ready.
