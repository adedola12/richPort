// src/components/Home/WorkExp.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";

const PROJECTS_URL = API_BASE ? `${API_BASE}/api/projects` : "/api/projects";
const UI_WORKEXP_URL = API_BASE
  ? `${API_BASE}/api/ui-projects/work-experience`
  : "/api/ui-projects/work-experience";

/* ---------------- Helpers ---------------- */

const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (v && Array.isArray(v.items)) return v.items;
  return [];
};

const safeTime = (val, fallback = 0) => {
  if (!val) return fallback;
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? fallback : d.getTime();
};

const formatDateRange = (start, end) => {
  const opts = { year: "numeric", month: "short" };
  const toStr = (val) => {
    if (!val) return "";
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, opts);
  };
  const startStr = toStr(start);
  const endStr = toStr(end);
  if (!startStr && !endStr) return "";
  if (startStr && !endStr) return `${startStr} – Present`;
  if (!startStr && endStr) return endStr;
  return `${startStr} – ${endStr}`;
};

/* ---------------- Static fallback data ---------------- */

const STATIC_EXPERIENCES = [
  {
    kind: "static", id: "ydpay-static",
    companyName: "YDPay",
    roleText: "Creative Designer (Multidisciplinary)",
    dateRangeLabel: "Feb 2026 – Present",
    startTime: new Date("2026-02-01").getTime(),
    endTime: Number.MAX_SAFE_INTEGER,
    bullets: [
      "Lead end-to-end creative output across UI/UX, product design, social media, motion, print, and publication design.",
      "Delivered a full UI/UX redesign covering 96 screens across 14 user flows.",
      "Designed SpinPop — a gamification feature with a dedicated wallet and Games Lobby.",
    ],
  },
  {
    kind: "static", id: "whitespace-static",
    companyName: "Whitespace Creatorverse",
    roleText: "Creative Designer",
    dateRangeLabel: "Feb 2026 – Present",
    startTime: new Date("2026-02-01").getTime(),
    endTime: Number.MAX_SAFE_INTEGER,
    bullets: [
      "Deliver multidisciplinary design across brand identity, UI/UX, web, and content design for clients spanning fintech, wellness, and creative economy sectors.",
      "Translate client briefs and brand strategy into distinctive visual systems that scale across print, digital, and social platforms.",
      "Develop and deliver full brand guidance documents.",
    ],
  },
  {
    kind: "static", id: "adlm-static",
    companyName: "ADLM Studio",
    roleText: "Creative Lead",
    dateRangeLabel: "Feb 2022 – Present",
    startTime: new Date("2022-02-01").getTime(),
    endTime: Number.MAX_SAFE_INTEGER,
    bullets: [
      "Lead creative direction for the studio — owning brand identity, product UI, marketing collateral, and client deliverables.",
      "Lead product design for Quiv — a BIM-powered quantity take-off tool — from concept through prototype iterations.",
      "Built an AI-integrated design workflow on Windows from scratch.",
    ],
  },
  {
    kind: "static", id: "bookrion-static",
    companyName: "Book Rion",
    roleText: "UI/UX & Brand Designer",
    dateRangeLabel: "Jul 2025 – Mar 2026",
    startTime: new Date("2025-07-01").getTime(),
    endTime: new Date("2026-03-01").getTime(),
    bullets: [
      "Designed and maintained the interface system across BookRion's web and mobile platforms.",
      "Shaped the brand identity system including logo design, typography, color palettes, and visual tokens.",
      "Collaborated cross-functionally with product managers, engineers, and business objectives.",
    ],
  },
];

/* ---------------- Normalizers ---------------- */

const normalizeDefaultProject = (p) => {
  const start = p.projectStartDate || p.startDate || null;
  const end = p.projectEndDate || p.endDate || null;
  return {
    kind: "default",
    id: p._id || p.id || p.slug,
    companyName: p.clientName || p.name || "",
    roleText: p.myRole || "",
    startDate: start,
    endDate: end,
    dateRangeLabel: formatDateRange(start, end),
    bullets: Array.isArray(p.workExperience) ? p.workExperience : [],
    endTime: end
      ? safeTime(end, Number.MAX_SAFE_INTEGER)
      : Number.MAX_SAFE_INTEGER,
    startTime: start ? safeTime(start, 0) : safeTime(p.createdAt, 0),
  };
};

const normalizeUiProject = (p) => {
  const wem = p.workExperienceMeta || {};
  const start = wem.startDate || null;
  const end = wem.endDate || null;
  const fallbackLabel = p?.hero?.dateLabel || p?.hero?.timelineLabel || "";
  return {
    kind: "ui",
    id: p._id || p.id || p.slug,
    companyName: wem.clientName || p.name || "",
    roleText: wem.myRole || p?.hero?.roleTitle || "",
    startDate: start,
    endDate: end,
    dateRangeLabel: formatDateRange(start, end) || fallbackLabel,
    bullets: Array.isArray(p.workExperience) ? p.workExperience : [],
    endTime: end
      ? safeTime(end, Number.MAX_SAFE_INTEGER)
      : Number.MAX_SAFE_INTEGER,
    startTime: start
      ? safeTime(start, safeTime(p.createdAt, 0))
      : safeTime(p.createdAt, 0),
  };
};

const WorkExp = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setStatus({ loading: true, error: "" });
        const [projRes, uiRes] = await Promise.allSettled([
          fetch(PROJECTS_URL),
          fetch(UI_WORKEXP_URL),
        ]);

        let defaultProjectsRaw = [];
        let uiProjectsRaw = [];

        if (projRes.status === "fulfilled" && projRes.value.ok) {
          defaultProjectsRaw = toArray(await projRes.value.json());
        }
        if (uiRes.status === "fulfilled" && uiRes.value.ok) {
          uiProjectsRaw = toArray(await uiRes.value.json());
        }

        const defaultExp = defaultProjectsRaw
          .filter(
            (p) =>
              p.showInWorkExperience !== false &&
              Array.isArray(p.workExperience) &&
              p.workExperience.length > 0,
          )
          .map(normalizeDefaultProject);

        const uiExp = uiProjectsRaw
          .filter(
            (p) =>
              p.showInWorkExperience !== false &&
              Array.isArray(p.workExperience) &&
              p.workExperience.length > 0,
          )
          .map(normalizeUiProject);

        const apiEntries = [...defaultExp, ...uiExp];
        const apiNames = new Set(apiEntries.map((e) => e.companyName.toLowerCase().trim()));
        const staticFiltered = STATIC_EXPERIENCES.filter(
          (e) => !apiNames.has(e.companyName.toLowerCase().trim()),
        );

        const merged = [...apiEntries, ...staticFiltered]
          .sort((a, b) => {
            if (b.endTime !== a.endTime) return b.endTime - a.endTime;
            return b.startTime - a.startTime;
          })
          .slice(0, 3)
          .map((x) => ({
            ...x,
            bullets: Array.isArray(x.bullets) ? x.bullets.slice(0, 3) : [],
          }));

        if (!cancelled) {
          setItems(merged);
          setStatus({ loading: false, error: "" });
        }
      } catch (err) {
        console.error("WorkExp load error:", err);
        if (!cancelled) {
          const fallback = [...STATIC_EXPERIENCES]
            .sort((a, b) => {
              if (b.endTime !== a.endTime) return b.endTime - a.endTime;
              return b.startTime - a.startTime;
            })
            .slice(0, 3);
          setItems(fallback);
          setStatus({ loading: false, error: "" });
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      <div className="relative mx-auto max-w-[1271px] px-4 lg:px-6">
        {/* Section heading — large, left-aligned per Figma */}
        <motion.h2
          className="
            text-3xl sm:text-4xl md:text-[44px] lg:text-[54px]
            font-['Outfit'] font-semibold
            leading-tight lg:leading-[1.15]
            tracking-[-0.05em]
            bg-gradient-to-b from-white via-white to-neutral-300
            bg-clip-text text-transparent
          "
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Work Experience
        </motion.h2>

        {/* Main container — Figma: bordered box with px-[62px] inner padding */}
        <motion.div
          className="
            mt-8
            rounded-[24px]
            border border-neutral-800
            px-4 py-8 sm:px-10 sm:py-12 lg:px-[62px] lg:py-[52px]
          "
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {status.loading ? (
            <p className="text-sm text-neutral-300">
              Loading work experience…
            </p>
          ) : status.error ? (
            <p className="text-sm text-red-400">
              {status.error}
            </p>
          ) : items.length === 0 ? (
            <p className="text-sm text-neutral-300">
              No work experience entries yet.
            </p>
          ) : (
            <>
              <div className="space-y-0">
                {items.map((exp, index) => {
                  const key = exp.id || `${exp.kind}-${index}`;
                  const isLast = index === items.length - 1;

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.1 }}
                    >
                      <div className="py-6 first:pt-0">
                        {/* Top row: company + role left, date right */}
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3
                              className="font-['Outfit'] font-medium text-xl sm:text-2xl lg:text-[31px] leading-[1] tracking-[-1px] mt-7 bg-clip-text text-transparent"
                              style={{
                                backgroundImage:
                                  "linear-gradient(179deg, rgb(255,255,255) 5%, rgb(118,116,116) 103%)",
                              }}
                            >
                              {exp.companyName || "—"}
                            </h3>
                            {exp.roleText && (
                              <p className="mt-2 text-xs sm:text-sm text-neutral-400">
                                {exp.roleText}
                              </p>
                            )}
                          </div>

                          {exp.dateRangeLabel && (
                            <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-neutral-400 whitespace-nowrap">
                              {exp.dateRangeLabel}
                            </p>
                          )}
                        </div>

                        {/* Description text — Figma shows paragraph, not bullets */}
                        {exp.bullets.length > 0 && (
                          <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-neutral-300">
                            {exp.bullets.join(" ")}
                          </p>
                        )}
                      </div>

                      {/* Divider line */}
                      {!isLast && <div className="h-px bg-neutral-800" />}
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA button */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <a
                  href="/about"
                  className="
                    inline-flex items-center justify-center
                    rounded-lg border border-white/80
                    px-8 py-3
                    text-xs sm:text-sm font-normal text-white
                    hover:bg-white hover:text-black transition
                  "
                >
                  View full resume
                </a>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExp;
