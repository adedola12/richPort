import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";
const apiUrl = (path) => (API_BASE ? `${API_BASE}${path}` : path);

const PROJECTS_URL = apiUrl("/api/projects");
const UI_WORKEXP_URL = apiUrl("/api/ui-projects/work-experience");

/* ---------- Helpers ---------- */
const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (v && Array.isArray(v.items)) return v.items;
  return [];
};

const formatMonthYear = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
};

const makeDurationLabel = (start, end, fallbackTimeline) => {
  if (!start && !end) return fallbackTimeline || "";
  const from = formatMonthYear(start);
  const to = end ? formatMonthYear(end) : "Present";
  if (!from && !to) return fallbackTimeline || "";
  if (!from) return to;
  return `${from} – ${to}`;
};

const safeTime = (val, fallback = 0) => {
  if (!val) return fallback;
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? fallback : d.getTime();
};

/* ---------- Normalizers ---------- */
const normalizeDefaultProject = (p) => {
  const start = p.projectStartDate || p.startDate || null;
  const end = p.projectEndDate || p.endDate || null;
  return {
    kind: "default",
    id: p._id || p.id || p.slug,
    name: p.clientName || p.name || "",
    role: p.myRole || "",
    durationLabel: makeDurationLabel(start, end, p.heroMeta?.timeline),
    workExperience: Array.isArray(p.workExperience) ? p.workExperience : [],
    startTime: safeTime(start, safeTime(p.createdAt, 0)),
    endTime: end
      ? safeTime(end, Number.MAX_SAFE_INTEGER)
      : Number.MAX_SAFE_INTEGER,
  };
};

const normalizeUiProject = (p) => {
  const wem = p.workExperienceMeta || {};
  const start = wem.startDate || null;
  const end = wem.endDate || null;
  return {
    kind: "ui",
    id: p._id || p.id || p.slug,
    name: wem.clientName || p.name || "",
    role: wem.myRole || p.hero?.roleTitle || "",
    durationLabel: makeDurationLabel(
      start,
      end,
      p.hero?.dateLabel || p.hero?.timelineLabel,
    ),
    workExperience: Array.isArray(p.workExperience) ? p.workExperience : [],
    startTime: safeTime(start, safeTime(p.createdAt, 0)),
    endTime: end
      ? safeTime(end, Number.MAX_SAFE_INTEGER)
      : Number.MAX_SAFE_INTEGER,
  };
};

const STATIC_EXPERIENCES = [
  {
    kind: "static", id: "ydpay-static",
    name: "YDPay",
    role: "Creative Designer (Multidisciplinary)",
    durationLabel: "Feb 2026 – Present",
    startTime: new Date("2026-02-01").getTime(),
    endTime: Number.MAX_SAFE_INTEGER,
    workExperience: [
      "Lead end-to-end creative output across UI/UX, product design, social media, motion, print, and publication design — owning the visual language across all customer-facing touchpoints.",
      "Delivered a full UI/UX redesign covering 96 screens across 14 user flows, including new onboarding, wallet, and game surfaces.",
      "Designed SpinPop — a gamification feature with a dedicated wallet and Games Lobby — and shipped the referral dashboard system using a custom typographic and color framework.",
      "Produced motion design assets and the full marketing campaign for the YDPay × AFC Free Fire Tournament, expanding brand reach into gaming communities.",
      "Use AI-assisted workflows (Claude Code, Figma MCPs, Magic UI) to accelerate prototyping and component generation across the design-to-build pipeline.",
    ],
  },
  {
    kind: "static", id: "whitespace-static",
    name: "Whitespace Creatorverse",
    role: "Creative Designer",
    durationLabel: "Feb 2026 – Present",
    startTime: new Date("2026-02-01").getTime(),
    endTime: Number.MAX_SAFE_INTEGER,
    workExperience: [
      "Deliver multidisciplinary design across brand identity, UI/UX, web, and content design for clients spanning fintech, wellness, and creative economy sectors.",
      "Translate client briefs and brand strategy into distinctive visual systems that scale across print, digital, and social platforms.",
      "Develop and deliver full brand guidance documents.",
      "Design and prototype digital products and digital strategies in collaboration with developers and digital strategists, ensuring craft consistency and quality across all deliverables.",
      "Document design systems, craft language, brand frameworks, and storytelling frameworks across deliverables.",
    ],
  },
  {
    kind: "static", id: "adlm-static",
    name: "ADLM Studio",
    role: "Creative Lead",
    durationLabel: "Feb 2022 – Present",
    startTime: new Date("2022-02-01").getTime(),
    endTime: Number.MAX_SAFE_INTEGER,
    workExperience: [
      "Lead creative direction for the studio — owning brand identity, product UI, marketing collateral, and client deliverables across multi-disciplinary projects.",
      "Define and maintain studio design standards, brand guidelines, and component libraries used across every client engagement.",
      "Lead product design for Quiv — a BIM-powered quantity take-off tool — from concept through prototype iterations (v3→v4), informed by deep market research into BIM tool adoption in Lagos.",
      "Built an AI-integrated design workflow on Windows from scratch — Claude Code, Figma and Magic UI MCPs, and a Figma↔HTML↔Figma loop deployed to Vercel — to compress design and build cycles for studio projects.",
      "Collaborate with engineers and developers to align design intent with technical implementation, accelerating handoff and reducing rework.",
    ],
  },
  {
    kind: "static", id: "bookrion-static",
    name: "Book Rion",
    role: "UI/UX & Brand Designer",
    durationLabel: "Jul 2025 – Mar 2026",
    startTime: new Date("2025-07-01").getTime(),
    endTime: new Date("2026-03-01").getTime(),
    workExperience: [
      "Designed and maintained the interface system across BookRion's web and mobile platforms, Young Prince Bookstore, and Young Lions Portal — ensuring consistency and usability across all platforms.",
      "Shaped the brand identity system including logo design, typography, color palettes, and visual tokens — to strengthen brand recognition across all audience segments.",
      "Collaborated cross-functionally with product managers, engineers, and business objectives.",
    ],
  },
];

const WorkExp = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
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
              (p.showInWorkExperience === undefined ||
                p.showInWorkExperience) &&
              Array.isArray(p.workExperience) &&
              p.workExperience.length > 0,
          )
          .map(normalizeDefaultProject);

        const uiExp = uiProjectsRaw
          .filter(
            (p) =>
              (p.showInWorkExperience === undefined ||
                p.showInWorkExperience) &&
              Array.isArray(p.workExperience) &&
              p.workExperience.length > 0,
          )
          .map(normalizeUiProject);

        const apiNames = new Set(
          [...defaultExp, ...uiExp].map((e) => e.name.toLowerCase().trim())
        );
        const staticFiltered = STATIC_EXPERIENCES.filter(
          (e) => !apiNames.has(e.name.toLowerCase().trim())
        );

        const merged = [...defaultExp, ...uiExp, ...staticFiltered].sort((a, b) => {
          if (b.endTime !== a.endTime) return b.endTime - a.endTime;
          return b.startTime - a.startTime;
        });

        if (!cancelled) setExperiences(merged);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Unable to load work experience.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#050505] py-16">
        <div className="mx-auto max-w-[961px] px-4">
          <p className="text-xs text-neutral-400">
            Loading work experience…
          </p>
        </div>
      </section>
    );
  }

  const list = error || experiences.length === 0
    ? [...STATIC_EXPERIENCES].sort((a, b) =>
        b.endTime !== a.endTime ? b.endTime - a.endTime : b.startTime - a.startTime
      )
    : experiences;

  return (
    <section id="work-experience" className="w-full bg-[#050505] py-12 md:py-16">
      <div className="mx-auto max-w-[961px] px-4">
        <motion.h2
          className="text-[28px] sm:text-[34px] lg:text-[40px] font-['Outfit'] font-medium leading-tight tracking-[-0.05em] bg-gradient-to-b from-white via-white to-neutral-300 bg-clip-text text-transparent mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Work Experience
        </motion.h2>

        <div className="pl-4 sm:pl-[30px] space-y-0">
          {list.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.1 }}
            >
              <div className="grid gap-6 md:grid-cols-[420px_1fr] py-8 first:pt-0">
                <div>
                  <h3
                    className="font-['Outfit'] font-medium text-[24px] sm:text-[28px] lg:text-[40px] leading-tight tracking-tight bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(179deg, rgb(255,255,255) 5%, rgb(118,116,116) 103%)" }}
                  >
                    {exp.name}
                  </h3>
                  {exp.role && (
                    <p className="mt-3 text-[15px] sm:text-[16px] text-neutral-300">{exp.role}</p>
                  )}
                  {exp.durationLabel && (
                    <p className="mt-2 text-[12px] sm:text-[13px] text-[#89ff00] tracking-wide">{exp.durationLabel}</p>
                  )}
                </div>
                <ul className="list-disc list-outside pl-5 space-y-2.5 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-neutral-300">
                  {exp.workExperience.map((item, idx) => (
                    <li key={idx} className="text-justify">{item}</li>
                  ))}
                </ul>
              </div>
              {index < list.length - 1 && (
                <div className="h-px bg-neutral-800 mt-2 mb-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExp;
