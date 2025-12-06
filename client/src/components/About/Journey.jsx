import React, { useEffect, useRef, useState } from "react";
import JImg from "../../assets/journey/JImg.jpg"; // fallback placeholder

const MAX_JOURNEY_ITEMS = 5;

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";
const PUBLIC_JOURNEY_URL = API_BASE ? `${API_BASE}/api/journey` : "";

/* ===== Single timeline item ===== */
const JourneyItem = ({ item, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const imageLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const imgSrc = item.imageUrl || JImg;
  const yearLabel =
    item.year != null ? String(item.year) : item.yearText || "----";

  return (
    <div
      ref={ref}
      className={`
        relative
        md:grid md:grid-cols-2 md:items-center
        md:gap-10 lg:gap-16
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
      `}
    >
      {/* CENTER YEAR OVER TIMELINE (desktop / tablet) */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          hidden md:flex
          -translate-x-1/2 -translate-y-1/2
          flex-col items-center z-30
        "
      >
        <span className="mb-2 rounded-full border border-white/18 bg-white/6 px-4 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/85">
          Year
        </span>

        <span
          className="
            font-['Outfit']
            text-6xl lg:text-7xl xl:text-[80px]
            font-semibold leading-none
            bg-gradient-to-b from-white via-white to-neutral-400
            bg-clip-text text-transparent
            drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]
          "
        >
          {yearLabel}
        </span>
      </div>

      {/* TIMELINE DOT */}
      <div className="pointer-events-none hidden md:block absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-400 bg-[#050505] shadow-[0_0_12px_rgba(190,242,100,0.6)]" />

      {/* IMAGE CARD */}
      <div
        className={`
          order-1 mb-6 max-w-[380px] mx-auto md:mb-0
          ${
            imageLeft
              ? "md:order-1 md:ml-auto md:mr-4"
              : "md:order-2 md:mr-auto md:ml-4"
          }
        `}
      >
        <div
          className="
            relative overflow-hidden rounded-[12px]
            border border-white/25
            bg-gradient-to-br from-neutral-600/30 via-stone-500/20 to-stone-400/5
            shadow-[0_0_28px_rgba(0,0,0,0.75)]
            z-10
          "
        >
          <div className="absolute left-3 top-3 z-20 inline-flex items-center rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-medium text-white/85">
            {item.title}
          </div>

          <img
            src={imgSrc}
            alt={item.title}
            className="h-[230px] w-full object-cover grayscale"
          />
        </div>
      </div>

      {/* TEXT BLOCK + MOBILE YEAR */}
      <div
        className={
          imageLeft
            ? "md:order-2 md:pl-24 md:pr-4 md:text-left"
            : "md:order-1 md:pr-24 md:pl-4 md:text-right"
        }
      >
        <div className="flex flex-col gap-4 max-w-[520px]">
          {/* Mobile year */}
          <div className="mb-1 flex items-center gap-3 md:hidden">
            <span className="rounded-full border border-white/18 bg-white/6 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/85">
              Year
            </span>
            <span
              className="
                font-['Outfit']
                text-3xl sm:text-4xl
                font-semibold leading-none
                bg-gradient-to-b from-white via-white to-neutral-400
                bg-clip-text text-transparent
              "
            >
              {yearLabel}
            </span>
          </div>

          <div className="space-y-3 font-['Lexend'] text-sm leading-6 text-neutral-200 sm:text-[15px]">
            {(item.description || []).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== Wrapper ===== */
const Journey = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const fetchJourney = async () => {
      if (!PUBLIC_JOURNEY_URL) {
        setItems([]);
        setStatus({ loading: false, error: "" });
        return;
      }

      try {
        setStatus({ loading: true, error: "" });
        const res = await fetch(PUBLIC_JOURNEY_URL, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch journey entries");
        const data = await res.json();

        const normalized = (Array.isArray(data) ? data : []).map((item) => ({
          id: item.id || item._id,
          year: item.year,
          title: item.title,
          description: Array.isArray(item.description)
            ? item.description
            : typeof item.description === "string"
            ? item.description.split(/\r?\n/).filter(Boolean)
            : [],
          imageUrl: item.imageUrl || null,
        }));

        setItems(normalized.slice(0, MAX_JOURNEY_ITEMS));
        setStatus({ loading: false, error: "" });
      } catch (err) {
        console.error("Journey fetch error:", err);
        setStatus({
          loading: false,
          error: "Unable to load journey timeline at the moment.",
        });
      }
    };

    fetchJourney();
  }, []);

  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <p className="text-center text-xs font-medium text-white/75 sm:text-sm">
          Here are a few things I&apos;ve done over the years...
        </p>

        <div className="relative mt-12">
          {/* Central vertical timeline */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/40 via-white/15 to-transparent md:block" />

          {status.loading ? (
            <p className="text-center text-sm text-neutral-300 font-['Lexend']">
              Loading journey…
            </p>
          ) : status.error ? (
            <p className="text-center text-sm text-red-400 font-['Lexend']">
              {status.error}
            </p>
          ) : items.length === 0 ? (
            <p className="text-center text-sm text-neutral-300 font-['Lexend']">
              Journey entries coming soon.
            </p>
          ) : (
            <div className="space-y-16 lg:space-y-20">
              {items.map((item, index) => (
                <JourneyItem key={item.id || index} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Journey;
