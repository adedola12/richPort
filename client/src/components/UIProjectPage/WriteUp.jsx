import React, { useMemo } from "react";
import UserImg from "./UserImg";

const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeStr = (v) => (v == null ? "" : String(v));

/**
 * Ensures bullets/numbering render properly even with Tailwind preflight.
 */
const RTE_CSS = `
  .adlm-rte { white-space: normal; }
  .adlm-rte ul { 
    list-style-type: disc !important; 
    list-style-position: outside !important;
    padding-left: 1.35rem !important; 
    margin: .55rem 0 !important; 
  }
  .adlm-rte ol { 
    list-style-type: decimal !important; 
    list-style-position: outside !important;
    padding-left: 1.35rem !important; 
    margin: .55rem 0 !important; 
  }
  .adlm-rte li { 
    display: list-item !important; 
    margin: .25rem 0 !important; 
  }
  .adlm-rte a { text-decoration: underline; }
  .adlm-rte blockquote {
    border-left: 3px solid rgba(255,255,255,.18);
    padding-left: .85rem;
    margin: .55rem 0;
    color: rgba(255,255,255,.75);
  }
  .adlm-rte p { margin: .45rem 0; }
`;

function cx(...cls) {
  return cls.filter(Boolean).join(" ");
}

/**
 * ✅ Images now "auto-fit" the given area:
 * - container controls size (responsive)
 * - img uses object-cover so it never stretches
 * - aspectRatio ensures consistent framing like Figma
 */
function BlockImages({ images = [] }) {
  const list = safeArr(images).filter(Boolean);
  if (!list.length) return null;

  // Single large hero-style image (like figma)
  if (list.length === 1) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <div
          className={cx(
            "w-full",
            "aspect-[4/5] sm:aspect-auto sm:h-[300px] md:h-[420px] lg:h-[480px]",
          )}
        >
          <img
            src={list[0]}
            alt="block"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    );
  }

  // Multiple images → responsive grid
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {list.map((u) => (
        <div
          key={u}
          className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
        >
          <div
            className="w-full h-[180px] sm:h-[220px] md:h-[260px]"
            style={{ aspectRatio: "4 / 3" }}
          >
            <img
              src={u}
              alt="block"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentBlock({ block }) {
  const b = block || {};
  if (b.enabled === false) return null;

  const headlineOn = b.headlineEnabled !== false && safeStr(b.headline).trim();
  const bodyOn = b.bodyEnabled !== false && safeStr(b.body).trim();
  const imagesOn =
    b.imagesEnabled !== false && safeArr(b.images).filter(Boolean).length;

  const layout = safeStr(b.layout || "wide"); // wide | half | grid
  const textSide = safeStr(b.textSide || "left"); // left | right (used in half)

  if (!headlineOn && !bodyOn && !imagesOn) return null;

  const Title = headlineOn ? (
    <h3 className="text-[22px] sm:text-[28px] md:text-[32px] font-semibold text-white">
      {b.headline}
    </h3>
  ) : null;

  const Body = bodyOn ? (
    <div
      className="adlm-rte text-[15px] sm:text-base md:text-lg leading-7 sm:leading-8 md:leading-9 text-white/80"
      dangerouslySetInnerHTML={{ __html: b.body }}
    />
  ) : null;

  const Images = imagesOn ? (
    <div className="pt-3">
      <BlockImages images={b.images} />
    </div>
  ) : null;

  /**
   * ✅ GRID layout: already stacked (text then images)
   */
  if (layout === "grid") {
    return (
      <section className="space-y-5">
        {Title}
        {Body}
        {Images}
      </section>
    );
  }

  /**
   * ✅ HALF layout: optional side-by-side on md+
   * (kept for flexibility)
   */
  if (layout === "half") {
    return (
      <section
        className={cx(
          "grid gap-6 md:grid-cols-2 items-start",
          textSide === "right" &&
            "md:[&_.blk-text]:order-2 md:[&_.blk-img]:order-1",
        )}
      >
        <div className="blk-text space-y-4">
          {Title}
          {Body}
        </div>

        <div className="blk-img">{Images}</div>
      </section>
    );
  }

  /**
   * ✅ WIDE layout (default): NOW MATCHES FIGMA
   * Text first, big image UNDER the text (stacked)
   */
  return (
    <section className="space-y-5">
      {Title}
      {Body}
      {Images}
    </section>
  );
}

function PersonasSection({ cards }) {
  const list = safeArr(cards).filter((c) => c && c.enabled !== false);
  if (!list.length) return null;

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-[22px] sm:text-[26px] md:text-[28px] font-semibold text-white">
          User Personas
        </h3>
        <p className="text-sm text-white/55">
          Who this experience was designed for.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => {
          const name = safeStr(p.name).trim();
          const subtitle = safeStr(p.subtitle).trim();
          const img = safeStr(p.img).trim();
          const about = safeStr(p.about).trim();

          return (
            <div
              key={`${name}-${i}`}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 space-y-3"
            >
              {img ? (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <div
                    className="w-full h-44 sm:h-48"
                    style={{ aspectRatio: "4 / 3" }}
                  >
                    <img
                      src={img}
                      alt={name || "persona"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ) : null}

              {name ? (
                <div className="space-y-0.5">
                  <div className="text-sm font-semibold text-white">
                    {name}
                  </div>
                  {subtitle ? (
                    <div className="text-xs text-white/60">
                      {subtitle}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {about ? (
                <div
                  className="adlm-rte text-xs leading-6 text-white/75"
                  dangerouslySetInnerHTML={{ __html: about }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

const WriteUp = ({ project }) => {
  const blocks = useMemo(() => {
    return safeArr(project?.writeUp?.blocks)
      .map((b) => (b && typeof b === "object" ? b : null))
      .filter(Boolean);
  }, [project]);

  const personas = useMemo(() => {
    return safeArr(project?.writeUp?.idealUsers?.cards).filter(Boolean);
  }, [project]);

  const topBlocks = useMemo(() => {
    return blocks.filter(
      (b) => (b.placement || "beforePersonas") !== "afterPersonas",
    );
  }, [blocks]);

  const bottomBlocks = useMemo(() => {
    return blocks.filter(
      (b) => (b.placement || "beforePersonas") === "afterPersonas",
    );
  }, [blocks]);

  const hasAny =
    topBlocks.some((b) => b.enabled !== false) ||
    bottomBlocks.some((b) => b.enabled !== false) ||
    personas.some((c) => c && c.enabled !== false);

  if (!hasAny) return null;

  return (
    <section className="pb-24">
      <style>{RTE_CSS}</style>

      {/* ✅ A bit wider so the big image feels like Figma */}
      <div className="mx-auto w-full max-w-6xl px-4 md:px-0 space-y-16">
        {/* ✅ CONTENT ABOVE USER PERSONAS */}
        {topBlocks.map((b, idx) => (
          <ContentBlock key={b.id || `top-${idx}`} block={b} />
        ))}

        {/* ✅ USER PERSONA SECTION */}
        {/* <PersonasSection cards={personas} /> */}
        <UserImg
          users={personas}
          title="User Personas"
          caption="Who this experience was designed for."
        />

        {/* ✅ CONTENT BELOW USER PERSONAS */}
        {bottomBlocks.map((b, idx) => (
          <ContentBlock key={b.id || `bottom-${idx}`} block={b} />
        ))}
      </div>
    </section>
  );
};

export default WriteUp;
