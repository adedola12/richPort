// src/pages/YDpayPage.jsx
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Shield01Icon, FlashIcon, PaintBrush01Icon, RulerIcon } from "hugeicons-react";
import OtherProj from "../components/ProjectPage/OtherProj";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

import iphone12 from "../assets/YDpay/iphone12pro.png";
import iphone15 from "../assets/YDpay/iphone15pro.png";
import iphone16 from "../assets/YDpay/iphone16pro.png";
import mockup13 from "../assets/YDpay/mockup13.png";
import heroBg from "../assets/YDpay/HeroBackground.png";
import heroMain from "../assets/YDpay/HeroMain.png";
import ydpayLogo from "../assets/YDpay/ydpayLogo.svg";

// Screen exports
import scrTwoFactorAuth      from "../assets/YDpay/screens/two-factor-auth.png";
import scrEnterMpin          from "../assets/YDpay/screens/enter-mpin.png";
import scrDashboardCrypto    from "../assets/YDpay/screens/dashboard-crypto.png";
import scrSignUp             from "../assets/YDpay/screens/sign-up.png";
import scrEnterDetails       from "../assets/YDpay/screens/enter-details.png";
import scrAccountCreated     from "../assets/YDpay/screens/account-created.png";
import scrDepositMethodSelect from "../assets/YDpay/screens/deposit-method-select.png";
import scrTransferDetails    from "../assets/YDpay/screens/transfer-details.png";
import scrDepositSuccess     from "../assets/YDpay/screens/deposit-successful.png";
import scrWithdraw           from "../assets/YDpay/screens/withdraw.png";
import scrWithdrawForm       from "../assets/YDpay/screens/withdraw-form.png";
import scrSentInstantly      from "../assets/YDpay/screens/sent-instantly.png";
import scrReceiveAsset       from "../assets/YDpay/screens/receive-asset-select.png";
import scrWithdrawReview     from "../assets/YDpay/screens/withdraw-review.png";
import scrTradeSuccess       from "../assets/YDpay/screens/trade-success.png";
import scrSentInstantly2     from "../assets/YDpay/screens/sent-instantly-2.png";
import scrReceiveNetwork     from "../assets/YDpay/screens/receive-network-select.png";
import scrReceiveEth         from "../assets/YDpay/screens/receive-eth.png";

const GR = "#01BA4B";

/* ─── shared animation ─── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/* ─── slide from left / right ─── */
const SlideIn = ({ children, direction = "left", delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: direction === "left" ? -40 : 40, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: direction === "left" ? -40 : 40, filter: "blur(6px)" }}
      transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

/* ─── staggered card grid ─── */
const StaggerGrid = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(4px)" },
      visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    }}
    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/* ─── section eyebrow ─── */
const SLabel = ({ n, t }) => (
  <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5" style={{ color: GR }}>
    {n} — {t}
  </p>
);

/* ─── two-tone heading ─── */
const H2 = ({ white, accent, accentColor = GR }) => (
  <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.03em]">
    <span className="text-white">{white} </span>
    <span style={{ color: accentColor }}>{accent}</span>
  </h2>
);

/* ─── phone frame ─── */
const Phone = ({ label, src }) => (
  <div className="relative flex flex-col aspect-[9/19] w-full rounded-[18px] border border-white/10 bg-[#0C1015] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.7)]">
    {src ? (
      <img src={src} alt={label} className="w-full h-full object-cover object-top" loading="lazy" />
    ) : (
      <>
        <div className="flex items-center justify-between px-3 pt-2">
          <span className="text-[7px] text-white/40">9:41</span>
          <div className="w-4 h-[3px] rounded-full bg-white/20" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-2 pb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: `${GR}18`, border: `1px solid ${GR}44` }}>
            <span className="text-[9px] font-black" style={{ color: GR }}>yd</span>
          </div>
          {label && <p className="text-[6px] text-white/25 text-center leading-tight px-1">{label}</p>}
        </div>
        <div className="h-5 flex items-center justify-center">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>
      </>
    )}
  </div>
);

/* ─── phone grid: top row of cols, optional second row ─── */
const PhoneGrid = ({ screens, cols = 4 }) => {
  const norm = (s) => typeof s === "string" ? { label: s, src: null } : s;
  const top = screens.slice(0, cols).map(norm);
  const bot = screens.slice(cols).map(norm);
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {top.map((s, i) => <Phone key={i} label={s.label} src={s.src} />)}
      </div>
      {bot.length > 0 && (
        <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(bot.length, cols)}, 1fr)` }}>
          {bot.map((s, i) => <Phone key={i} label={s.label} src={s.src} />)}
        </div>
      )}
    </div>
  );
};

/* ─── flow section block ─── */
const FlowBlock = ({ badge, badgeColor = GR, num, title, count, description, screens, children }) => (
  <div className="py-16 sm:py-20 border-t border-white/5">
    <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-end">
      {/* left */}
      <SlideIn direction="left">
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase border mb-6"
          style={{ borderColor: `${badgeColor}44`, color: badgeColor, background: `${badgeColor}0D` }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: badgeColor }} />
          {badge}
        </span>
        <div className="text-[80px] sm:text-[100px] font-black leading-none opacity-[0.06] text-white select-none -mt-2 mb-2">
          {num}
        </div>
        <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-[-0.02em]">{title}</h3>
        <p className="text-xs font-semibold mt-2 mb-4" style={{ color: GR }}>{count}</p>
        <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55 mb-5">{description}</p>
        {screens && (
          <ul className="space-y-1">
            {screens.map(([id, name]) => (
              <li key={id} className="flex items-start gap-3 text-[13px] text-white/45">
                <span className="font-mono text-[10px] text-white/25 mt-0.5 w-8 shrink-0">{id}</span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        )}
      </SlideIn>
      {/* right */}
      <SlideIn direction="right" delay={0.1}>{children}</SlideIn>
    </div>
  </div>
);

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
const YDpayPage = () => (
  <div className="relative min-h-screen bg-[#07090C] text-white overflow-x-hidden font-['Outfit']">
    <PageMeta
      title="YDpay Mobile Redesign"
      description="A full mobile redesign of the YDpay fintech app — dark UI, trust-first design language, and a streamlined 4-action home experience."
      url="/ui-projects/ydpay-mobile-redesign"
    />

    {/* ambient glows */}
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{ background: `${GR}0D` }} />
      <div className="absolute -right-60 top-1/2 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ background: `${GR}09` }} />
    </div>

    <div className="relative z-10">

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
        {/* background image with fade overlay */}
        <div className="pointer-events-none absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,1) 70%)" }} />
        </div>

        {/* glow beneath mockup */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[38%] h-48 w-[65%] max-w-[640px] rounded-full blur-[90px] z-10"
          style={{ background: "rgba(132,204,22,0.45)" }} />

        {/* phone mockup */}
        <motion.img
          src={heroMain}
          alt="YDpay app mockup"
          className="relative z-10 mt-8 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[72%] max-w-[980px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] pointer-events-none select-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
        />

        {/* back to portfolio pill */}
        <motion.div className="relative z-10 mt-1"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
          <Link to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2 text-[12px] text-white/70 hover:bg-white/10 transition backdrop-blur-md">
            ← Back to Portfolio
          </Link>
        </motion.div>

        {/* headline — silver gradient + thin silver outline */}
        <motion.div className="relative z-10 mt-[10px] px-4 text-center"
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1], delay: 0.3 }}>
          <h1
            className="text-5xl sm:text-6xl lg:text-[72px] font-semibold leading-[0.92] tracking-[-0.03em]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paintOrder: "stroke fill",
              WebkitTextStroke: "1px rgba(180,180,180,0.35)",
            }}
          >
            Mobile App<br />Redesign Casestudy
          </h1>
        </motion.div>

        {/* body subtitle */}
        <motion.p
          className="relative z-10 mt-[25px] text-[15px] sm:text-[16px] leading-[1.65] text-white/60 max-w-[520px] text-center px-4"
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.45 }}>
          Complete UX/UI redesign — 96 screens across 14 flows, built for trust, speed, and a premium crypto experience.
        </motion.p>

        {/* ydpay logo */}
        <motion.div
          className="relative z-10 mt-8 flex items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <img src={ydpayLogo} alt="ydpay" className="h-8 w-auto object-contain" />
        </motion.div>
      </section>

      {/* ══ THE BRIEF ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5 bg-[#07090C]">
        <div className="max-w-[1100px] mx-auto">
          {/* stats row */}
          <FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/8 mb-14">
              {[
                { label: "CLIENT", value: "YDPay" },
                { label: "TIMELINE", value: "2 weeks" },
                { label: "SCREENS", value: "96+", accent: true },
                { label: "USER FLOWS", value: "14" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="sm:px-8 first:pl-0">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">{label}</p>
                  <p className={`text-xl sm:text-2xl font-bold ${accent ? "" : "text-white"}`}
                    style={accent ? { color: GR } : {}}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <FadeUp>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">DELIVERABLES</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {["96+ Screens", "14 Flows", "10 User Journeys", "1 Design System"].map(t => (
                  <span key={t} className="rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                    style={{ borderColor: `${GR}44`, color: GR, background: `${GR}0D` }}>{t}</span>
                ))}
              </div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">MY ROLE</p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/55">
                Contracted UI Designer — responsible for UX audit, high-fidelity redesign, and new feature design: SpinPop (gamification), Refer'm'earn (referral flow), and admin dashboards for both. Full ownership of all 96 screens from IA to developer-ready Figma spec.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="rounded-2xl overflow-hidden border border-white/8">
                <img src={mockup13} alt="YDpay billboard" className="w-full object-cover" loading="lazy" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 01 — EXECUTIVE SUMMARY ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <div className="mt-0 grid lg:grid-cols-[1fr_340px] gap-12 lg:items-end">
            <FadeUp delay={0.1}>
              <SLabel n="01" t="EXECUTIVE SUMMARY" />
              {/* custom heading: "redesigned" green, "& why" white */}
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-[-0.03em]">
                <span className="text-white">What was</span><br />
                <span style={{ color: GR }}>redesigned</span>
                <span className="text-white"> &amp; why</span>
              </h2>
              {/* green divider */}
              <div className="mt-5 mb-8 h-[2px] w-16 rounded-full" style={{ background: GR }} />
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/60 mb-5">
                YDPay required a ground-up redesign to transform it from a functional prototype into a <strong className="text-white font-semibold">premium, trust-first crypto finance app</strong>. The previous design lacked a unified visual language, had no clear information hierarchy, and created friction at every money-movement interaction.
              </p>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/60 mb-8">
                This redesign covers every screen a user touches — from first launch through KYC, daily trading, withdrawals, and account management — creating a cohesive, scalable design system built on Onest typography, a green-on-dark brand palette, and a clean 4-action dashboard model.
              </p>
              {/* bullet rows */}
              <ul className="space-y-3">
                {[
                  { dot: GR, title: "Unified visual language", desc: "one design system, zero visual inconsistencies across 96 screens" },
                  { dot: GR, title: "Frictionless money movement", desc: "Deposit, Withdraw, Send, Receive as 4 clear top-level actions" },
                  { dot: GR, title: "Trust-first security model", desc: "OTP gating on all outbound transactions, biometric fast-login, KYC tier system" },
                  { dot: "#EAB308", title: "Developer-ready precision", desc: "every screen spec'd at 393×844px, Onest font weights, exact hex values, spacing grid" },
                ].map(({ dot, title, desc }) => (
                  <li key={title}
                    className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.025] px-4 py-3">
                    <span className="mt-[6px] w-2 h-2 rounded-full shrink-0" style={{ background: dot }} />
                    <p className="text-[14px] sm:text-[15px] leading-[1.6] text-white/60">
                      <span className="text-white font-semibold">{title}</span>
                      {" – "}{desc}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.2} className="flex flex-col gap-4">
              {/* scope panel */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-4">PROJECT SCOPE</p>
                <div className="divide-y divide-white/5">
                  {[
                    { label: "Total screens", value: "96", accent: true },
                    { label: "User flows", value: "14", accent: true },
                    { label: "User journeys mapped", value: "10", accent: false },
                    { label: "Design system tokens", value: "1", accent: false },
                    { label: "Canvas dimensions", value: "393 × 844 px", accent: false, small: true },
                  ].map(({ label, value, accent, small }) => (
                    <div key={label} className="flex items-center justify-between py-2.5">
                      <span className="text-[13px] text-white/45">{label}</span>
                      <span className={`font-bold ${small ? "text-[13px] text-white/60" : "text-[20px]"}`}
                        style={accent ? { color: GR } : { color: "#fff" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* flows covered */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-3">FLOWS COVERED</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "Authentication", color: "#01BA4B" },
                    { label: "Onboarding",     color: "#A78BFA" },
                    { label: "Dashboard",      color: "#22D3EE" },
                    { label: "Deposit",        color: "#F97316" },
                    { label: "Withdraw",       color: "#F87171" },
                    { label: "Send External",  color: "#01BA4B" },
                    { label: "Send Internal",  color: "#EAB308" },
                    { label: "Receive",        color: "#34D399" },
                    { label: "Trade",          color: "#60A5FA" },
                    { label: "Market",         color: "#9CA3AF" },
                    { label: "Cards",          color: "#818CF8" },
                    { label: "Profile",        color: "#C084FC" },
                    { label: "Transactions",   color: "#FB923C" },
                  ].map(({ label, color }) => (
                    <span key={label}
                      className="rounded-full text-[10px] font-medium px-2.5 py-0.5 border"
                      style={{ borderColor: `${color}55`, color, background: `${color}12` }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* delivery */}
              <div className="rounded-2xl border p-5" style={{ borderColor: `${GR}44`, background: `${GR}0D` }}>
                <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: GR }}>DELIVERY</p>
                <p className="text-xl font-bold text-white mb-2">Design Delivered</p>
                <p className="text-[13px] leading-[1.6] text-white/50">All 96 screens delivered in Figma with developer-ready specs and component documentation. Partial implementation adopted by client — core flows shipped, new features pending.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ 02 — PROBLEMS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="02" t="KNOWN PAIN" />
            <H2 white="Problems with the" accent="old design" accentColor="#E05252" />
          </FadeUp>

          <StaggerGrid className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                n: "01", title: "Inconsistent Visual Language",
                body: "The app had little flow, inconsistent styling, with no clear color purpose throughout. Different button styles, arbitrary font choices, and unstructured spacing were common throughout the product interface.",
                result: "Users couldn't establish trust or familiarity with the app's interaction patterns.",
              },
              {
                n: "02", title: "No Clear Dashboard Hierarchy",
                body: "The home screen prioritized secondary info above primary tasks. Balance, transfers, and portfolio data were buried under promotional or tertiary content, making core tasks hard to find.",
                result: "Users took longer to complete basic transactions because priority actions weren't visible at a glance.",
              },
              {
                n: "03", title: "Navigation Confusion",
                body: "Overlapping tap zones, unclear icon labels, and a bottom nav that served double-duty as both navigation and actions made interactions error-prone, especially on smaller devices.",
                result: "Users frequently missed taps, triggered wrong actions, or got lost between screens.",
              },
              {
                n: "04", title: "Font & Scale Inconsistencies",
                body: "Headings, labels, and body copy used mismatched sizes, weights, and line heights, creating a layout that felt unpolished and made it difficult to scan or understand content at a glance.",
                result: "Key data like prices, account balances, and CTAs didn't have proper visual weight to command attention.",
              },
              {
                n: "05", title: "No Security UX Layer",
                body: "Security prompts like PIN entry, biometric access, and KYC verification were not branded or integrated into the visual system — they felt like third-party pop-ups rather than native flows.",
                result: "Trust signals were absent. Users felt uncertain when completing sensitive transactions.",
              },
              {
                n: "06", title: "Cluttered Information Architecture",
                body: "Features were grouped by availability rather than by user intent or usage frequency, resulting in tab structures that made exploring the app confusing and non-intuitive.",
                result: "Power users had to hunt for features they used daily, reducing retention and satisfaction.",
              },
            ].map(({ n, title, body, result }) => (
              <StaggerItem key={n}>
                <div className="rounded-2xl border border-[#E0525222] bg-[#1A0A0A] p-5 h-full flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-white leading-snug">{title}</h3>
                    <span className="shrink-0 w-6 h-6 rounded-full border border-[#E0525244] flex items-center justify-center text-[10px] font-bold text-[#E05252]">{n}</span>
                  </div>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 flex-1">{body}</p>
                  <div className="border-t border-[#E0525218] pt-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#E05252] mb-1">AS A RESULT</p>
                    <p className="text-[13px] leading-[1.65] text-[#E05252]/70">{result}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ══ IPHONE 15 SPOTLIGHT ══ */}
      <section className="py-10 sm:py-16 px-3 sm:px-6">
        <FadeUp className="max-w-[1100px] mx-auto">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/8 aspect-[4/5] sm:aspect-[16/9]">
            <img src={iphone15} alt="YDpay dashboard" className="w-full h-full object-cover object-center" loading="lazy" />
          </div>
        </FadeUp>
      </section>

      {/* ══ 03 — DESIGN LANGUAGE ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="03" t="BRAND REDESIGN" />
            <H2 white="The new design" accent="language" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[580px]">
              The redesign establishes a <strong className="text-white">premium, trust-first visual system</strong> — dark backgrounds that signal security, a signature green that communicates growth and confidence, clean white UI elements that provide clarity, and a 4-action home system.
            </p>
          </FadeUp>

          {/* color palette */}
          <FadeUp delay={0.1} className="mt-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-5">COLOR PALETTE</p>
            <StaggerGrid className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { hex: "#05CB74", name: "YDPay Green",    desc: "All CTAs · Success states · Active indicators · Brand elements · Confirmed transactions" },
                { hex: "#171B1E", name: "Deep Surface",   desc: "App background · Dark headers · Navigation bars · Card backgrounds in dark mode" },
                { hex: "#FAFAFA", name: "Surface White",  desc: "Content cards · Form backgrounds · White sheet layers · Elevated UI panels" },
                { hex: "#FFCC00", name: "Accent Yellow",  desc: "Warnings · KYC fee badges · Pending states · Highlight callouts" },
                { hex: "#0C0D0F", name: "True Dark",      desc: "Document / page background · Full-screen auth views · Splash and loading screens" },
              ].map(({ hex, name, desc }) => (
                <StaggerItem key={hex}>
                  <div className="flex flex-col rounded-xl overflow-hidden border border-white/8 bg-white/[0.02]">
                    <div className="h-20 sm:h-24 w-full" style={{ background: hex }} />
                    <div className="p-3 flex flex-col gap-1">
                      <p className="text-[11px] font-mono font-semibold" style={{ color: GR }}>{hex}</p>
                      <p className="text-[12px] font-semibold text-white">{name}</p>
                      <p className="text-[10px] leading-[1.5] text-white/35">{desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </FadeUp>

          {/* typography + phone mockup */}
          <FadeUp delay={0.15} className="mt-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-5">TYPOGRAPHY — ONEST FAMILY</p>
            <div className="relative">
              {/* type scale card — full width */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
                {[
                  { label: "DISPLAY / HERO", spec: "96px · 900 · 1px", el: <p className="text-[52px] sm:text-[64px] font-black leading-none tracking-tight text-white">YDPay</p> },
                  { label: "HEADING H1",     spec: "40px · 800 · 1.1px", el: <p className="text-[32px] font-bold text-white leading-tight">Send Money</p> },
                  { label: "HEADING H2",     spec: "28px · 800 · 1px", el: <p className="text-[22px] font-bold text-white leading-tight">Dashboard Overview</p> },
                  { label: "BODY LARGE",     spec: "16px · 400 · 1.6px", el: <p className="text-[15px] text-white/60 leading-relaxed max-w-[340px]">Your balance is updated in real time. Tap any asset to view details and manage your holdings.</p> },
                  { label: "BODY / LABEL",   spec: "13px · 500 · 0.2px", el: <p className="text-[13px] text-white/50">Review your transaction before confirming. Fees are included in the total shown.</p> },
                  { label: "CAPTION / TAG",  spec: "11px · 700 · 110px UL", el: <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">TRANSACTION HISTORY · FILTER</p> },
                ].map(({ label, spec, el }, i) => (
                  <div key={label} className={`flex gap-6 px-6 py-4 ${i > 0 ? "border-t border-white/5" : ""}`}>
                    <div className="w-32 shrink-0 pt-1">
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-white/30">{label}</p>
                      <p className="text-[9px] text-white/20 mt-0.5">{spec}</p>
                    </div>
                    <div className="flex-1">{el}</div>
                  </div>
                ))}
              </div>

              {/* iPhone 16 Pro — absolutely overlaid on the right */}
              <div className="hidden lg:block absolute -right-24 top-0 w-[480px] pointer-events-none">
                <img src={iphone16} alt="YDpay screens" className="w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]" loading="lazy" />
              </div>
            </div>
          </FadeUp>

          {/* core design principles */}
          <FadeUp delay={0.2} className="mt-12">
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/35 mb-5">CORE DESIGN PRINCIPLES</p>
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <Shield01Icon size={28} color={GR} />,
                  title: "Trust First",
                  desc: "Dark backgrounds signal security. Green confirms success. Every money-out action requires explicit user confirmation.",
                },
                {
                  icon: <FlashIcon size={28} color="#EAB308" />,
                  title: "Speed of Clarity",
                  desc: "One primary action per screen. No hunting. The user always knows what to tap next without reading labels.",
                },
                {
                  icon: <PaintBrush01Icon size={28} color="#A78BFA" />,
                  title: "Premium Feel",
                  desc: "Generous whitespace, smooth gradients, Onest's geometric letterforms. Feels like a fintech product worth trusting with real money.",
                },
                {
                  icon: <RulerIcon size={28} color="#60A5FA" />,
                  title: "System Thinking",
                  desc: "Every screen is a component of a system. Spacing, color, and typography follow shared tokens — no one-offs.",
                },
              ].map(({ icon, title, desc }) => (
                <StaggerItem key={title}>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 flex flex-col gap-3">
                    <div>{icon}</div>
                    <p className="text-[15px] font-bold text-white">{title}</p>
                    <p className="text-[13px] leading-[1.65] text-white/50">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </FadeUp>
        </div>
      </section>

      {/* ══ IPHONE 12 ══ */}
      <section className="py-10 sm:py-14 px-3 sm:px-6">
        <FadeUp className="max-w-[1100px] mx-auto">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 shadow-[0_0_60px_rgba(1,186,75,0.15)]"
            style={{ borderColor: `${GR}55` }}>
            <img src={iphone12} alt="YDpay two phones" className="w-full object-cover" loading="lazy" />
          </div>
        </FadeUp>
      </section>

      {/* ══ 04 — FLOW WALKTHROUGH ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="04" t="SCREEN BY SCREEN" />
            <H2 white="Flow" accent="walkthrough" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[520px]">
              Every flow, every screen — what it does, why it exists, and how it fits in the user journey.
            </p>
          </FadeUp>

          {/* Flow 01 */}
          <FlowBlock
            badge="Flow 01 · Authentication" num="01"
            title="Login & Password Reset" count="7 screens"
            description="The full authentication suite — email/password log-in, biometric fast-login, account lockout with reset flow, and a 4-screen forgot-password journey ending in a success confirmation."
            screens={[["L1","Sign In Entry"],["L2","Biometric Prompt"],["L3","Error / Account Locked"],["L4","Forgot Password"],["L5","Resend OTP Verification"],["L6","Create New Password"],["L7","Password Reset Success"]]}
          >
            <PhoneGrid screens={[
              { label: "2FA Security",    src: scrTwoFactorAuth },
              { label: "Enter MPIN",      src: scrEnterMpin },
              { label: "Dashboard",       src: scrDashboardCrypto },
            ]} cols={3} />
          </FlowBlock>

          {/* Flow 02 */}
          <FlowBlock
            badge="Flow 02 · Onboarding" badgeColor="#F59E0B" num="02"
            title="Sign up & KYC Verification" count="14 screens"
            description="New user registration from welcome screen through email OTP, account creation (Tier 0), and the optional 4-step KYC upgrade flow (Tier 1) — plus Google SSO path."
            screens={[["O1","Welcome / Sign Up"],["O2","Enter Details"],["O3","Age Gate Error"],["O4","Email OTP Verification"],["O5","Account Created (Tier 0)"],["O6–O10","KYC Steps 1–4"],["O11","Verification Processing"],["O12","KYC Approved (Tier 1)"],["O13–O14","Google SSO Path"]]}
          >
            <PhoneGrid screens={[
              { label: "Welcome",         src: scrSignUp },
              { label: "Your Details",    src: scrEnterDetails },
              { label: "Account Created", src: scrAccountCreated },
            ]} cols={3} />
          </FlowBlock>

          {/* Flow 03 */}
          <FlowBlock
            badge="Flow 03 · Dashboard" badgeColor="#3B82F6" num="03"
            title="Home Dashboard" count="2 screens"
            description="Two dashboard variants — a minimal V1 and a full-featured V2 with the 4-action model (Deposit, Withdraw, Send, Receive), portfolio balance, and recent transactions."
            screens={[["O1","Dashboard V1 — Minimal"],["O2","Dashboard V2 — Full Actions"]]}
          >
            <div className="rounded-2xl overflow-hidden border border-white/8">
              <img src={iphone15} alt="Dashboard" className="w-full object-cover" loading="lazy" />
            </div>
          </FlowBlock>
        </div>
      </section>

      {/* ══ 05 — MONEY MOVEMENT ARCHITECTURE ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="05" t="ARCHITECTURE" />
            <H2 white="Money movement" accent="architecture" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[560px]">
              The core design decision: four top-level actions that cover every way money moves through YDPay, with zero ambiguity about which to use.
            </p>
          </FadeUp>

          {/* 4 actions */}
          <FadeUp delay={0.1} className="mt-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "↓", label: "Deposit", color: GR, desc: "Fiat money IN from bank transfer or card payment. Requires verified account.", otp: false },
                { icon: "↑", label: "Withdraw", color: "#F59E0B", desc: "Fiat money OUT to a Nigerian bank account. Requires review and destination.", otp: true },
                { icon: "→", label: "Send", color: "#3B82F6", desc: "Crypto OUT — splits into two tabs: External Wallet (on-chain) or YDPay User (internal, free).", otp: true },
                { icon: "↙", label: "Receive", color: "#EAB308", desc: "Crypto IN via QR code or wallet address. Select asset, select network, share.", otp: false },
              ].map(({ icon, label, color, desc, otp }) => (
                <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 flex flex-col gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black"
                    style={{ background: `${color}20`, color }}>
                    {icon}
                  </div>
                  <p className="font-bold text-white">{label}</p>
                  <p className="text-[13px] leading-[1.65] text-white/50 flex-1">{desc}</p>
                  <div className={`rounded-md px-2 py-1 text-[9px] font-bold tracking-widest uppercase w-fit ${otp ? "bg-[#EF444420] text-[#EF4444]" : "bg-[#01BA4B15] text-[#01BA4B]"}`}>
                    {otp ? "OTP REQUIRED" : "NO OTP REQUIRED"}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* send two-tab model */}
          <FadeUp delay={0.15} className="mt-8">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-5">SEND — TWO TAB MODEL</p>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm font-bold text-white mb-2">External Wallet</p>
                  <p className="text-[14px] leading-[1.65] text-white/50">On-chain transfer to any crypto wallet address. Gas fee applies. Network selector shown. TX hash on completion.</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-2" style={{ color: GR }}>YDPay User</p>
                  <p className="text-[14px] leading-[1.65] text-white/50">Instant zero-fee transfer between YDPay accounts. Zero fees. Settled immediately. No network selection needed.</p>
                </div>
              </div>
              <div className="border-t border-white/6 pt-5">
                <p className="text-[11px] leading-[1.65] text-white/40">
                  <strong className="text-white/70">Why tabs?</strong> Previous designs had separate nav items for "Send" and "Transfer" — users didn't know which to use. Tabs keep both paths within one flow entry point, with clear labels that explain the difference.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* KYC tiers */}
          <FadeUp delay={0.2} className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { tier: "TIER 0", label: "Basic Access", color: "#F59E0B", desc: "Browse only. Can browse markets, receive crypto and deposit. Send and Withdraw are limited or require upgrade prompt shown on Dashboard." },
                { tier: "TIER 1", label: "Full Access", color: GR, desc: "Address proof & ID, biometric-verified. Full access to all 14 flows with no transaction limits. Required for all money-out operations." },
              ].map(({ tier, label, color, desc }) => (
                <div key={tier} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <span className="inline-block rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest mb-3"
                    style={{ background: `${color}20`, color }}>{tier}</span>
                  <p className="text-sm font-bold text-white mb-2">{label}</p>
                  <p className="text-[14px] leading-[1.65] text-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ 04 — FLOW WALKTHROUGH (continued) ══ */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          {/* Flow 04 */}
          <FlowBlock
            badge="Flow 04 · Deposit" badgeColor="#EF4444" num="04"
            title="Deposit Fiat In" count="7 screens"
            description="Full deposit funnel — method selection (bank transfer or card), amount entry with quick chips, fee preview, payment execution, processing state, and success confirmation."
            screens={[["D1","Method Select"],["D2","Enter Amount"],["D3","Review Transfer"],["D4","Bank Payment Details"],["D5","Card Payment Form"],["D6","Processing"],["D7","Deposit Success"]]}
          >
            <PhoneGrid screens={[
              { label: "Choose Method",   src: scrDepositMethodSelect },
              { label: "Bank Details",    src: scrTransferDetails },
              { label: "Deposit Success", src: scrDepositSuccess },
            ]} cols={3} />
          </FlowBlock>

          {/* Flow 05 */}
          <FlowBlock
            badge="Flow 05 · Withdraw" badgeColor="#F59E0B" num="05"
            title="Withdraw Fiat OUT" count="7 screens"
            description="Cash-out to bank account — destination selection from saved accounts, new bank account addition (with account name verification against Zenith Bank), review, OTP auth, and success."
            screens={[["D1","Destination Select"],["D2","Add Bank Account"],["D3","Enter Amount"],["D4","Review Withdrawal"],["D5","PIN / OTP Verification"],["D6","Processing"],["D7","Withdrawal Success"]]}
          >
            <PhoneGrid screens={[
              { label: "Choose Destination", src: scrWithdraw },
              { label: "Fill Details",       src: scrWithdrawForm },
              { label: "Sent!",              src: scrSentInstantly },
            ]} cols={3} />
          </FlowBlock>

          {/* Flow 06 */}
          <FlowBlock
            badge="Flow 06 · Send External" num="06"
            title="Send Crypto External Wallet" count="6 screens"
            description="On-chain transfer to any external wallet — address entry (paste or QR), amount in crypto or fiat, network selector with gas fee preview, review, and transaction hash on success."
            screens={[["SE1","Entry / Tab Select"],["SE2","Recipient Address"],["SE3","Enter Amount"],["SE4","Network Select"],["SE5","Review Transaction"],["SE6","Send Success / TX Hash"]]}
          >
            <PhoneGrid screens={[
              { label: "Select Asset",   src: scrReceiveAsset },
              { label: "Review & PIN",   src: scrWithdrawReview },
              { label: "TX Hash",        src: scrTradeSuccess },
            ]} cols={3} />
          </FlowBlock>

          {/* Flow 07 */}
          <FlowBlock
            badge="Flow 07 · Send Internal" badgeColor="#06B6D4" num="07"
            title="Send to YDPay User" count="4 screens"
            description="Instant, zero-fee transfer between YDPay users — search by username or phone number, select asset and amount, review with trust card showing recipient avatar, instant success."
            screens={[["SI1","Recipient Search"],["SI2","Asset + Amount"],["SI3","Review Transfer"],["SI4","Sent Instantly!"]]}
          >
            <PhoneGrid screens={[
              { label: "Recipient + Amount", src: scrWithdrawForm },
              { label: "Review & PIN",       src: scrWithdrawReview },
              { label: "Sent Instantly!",    src: scrSentInstantly2 },
            ]} cols={3} />
          </FlowBlock>

          {/* Flow 08 */}
          <FlowBlock
            badge="Flow 08 · Receive" badgeColor="#EAB308" num="08"
            title="Receive Crypto IN" count="3 screens"
            description="Three-step receive flow — select asset, select network (with network mismatch warning), display QR code with copyable wallet address and share functionality."
            screens={[["R1","Asset Select"],["R2","Network Select"],["R3","QR Code + Address"]]}
          >
            <PhoneGrid screens={[
              { label: "Select Asset",   src: scrReceiveNetwork },
              { label: "Select Network", src: scrReceiveAsset },
              { label: "QR Code",        src: scrReceiveEth },
            ]} cols={3} />
          </FlowBlock>
        </div>
      </section>

      {/* ══ 06 — KEY DESIGN DECISIONS ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="06" t="DESIGN RATIONALE" />
            <H2 white="Key design" accent="decisions" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[480px]">
              Every major design choice has a clear reason. Here are the six decisions that most shaped the final product.
            </p>
          </FadeUp>

          <StaggerGrid className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              {
                n: "DECISION 01",
                q: "Why dark header + white content card?",
                a: "Dark backgrounds are associated with security, premium, and focus — the header (dark) is where you orient and navigate. The white card is where you think, read, and act. The contrast creates a clear visual hierarchy without needing additional UI chrome. Users always know which \"zone\" they're in.",
              },
              {
                n: "DECISION 02",
                q: "Why 4 action buttons on Dashboard instead of 5 or 6?",
                a: "Previous designs had 5–7 action items. Research shows users scan 4 items comfortably without cognitive load. Deposit, Withdraw, Send, Receive covers 100% of money movement use cases. 'Trade' lives in the bottom nav — it's a browsing action, not an urgent action. 4 is the optimal number.",
              },
              {
                n: "DECISION 03",
                q: "Why does Send have two tabs (External / YDPay)?",
                a: "On-chain sends and internal transfers are fundamentally different: different fees, different confirmation times, different risk levels. Merging them into one screen created confusion and errors. Tabs present the choice upfront and keep each path clean and focused, without requiring users to understand the technical distinction.",
              },
              {
                n: "DECISION 04",
                q: "Why OTP only on outbound transactions, not on Deposit or Receive?",
                a: "OTP adds friction. Friction is only justified when there's real financial risk. Money coming in (Deposit, Receive) has no risk — an attacker can't drain your account by depositing into it. Money going out (Withdraw, Send) has maximum risk. Applying OTP selectively maximises security while minimising unnecessary friction on low-risk actions.",
              },
              {
                n: "DECISION 05",
                q: "Why a two-tier KYC system?",
                a: "Full KYC upfront drives abandonment. Tier 0 (email only) lets users explore the app, see their portfolio, and deposit — building investment before asking for personal documents. Only when they want to send or withdraw (high value actions) is Tier 1 required. This matches the mental model: \"I'll verify when I have something to lose.\"",
              },
              {
                n: "DECISION 06",
                q: "Why Onest as the sole typeface?",
                a: "Onest is a geometric grotesque with exceptional weight range (300–900) and strong numeral rendering — critical for a finance app. Its tight letterspacing at heavy weights creates the premium, confident look needed for balance displays and CTAs. Using one typeface eliminates visual noise and reduces bundle size. Every typographic need from captions to display headings is covered.",
              },
            ].map(({ n, q, a }) => (
              <StaggerItem key={n}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 h-full flex flex-col gap-3">
                  <span className="rounded-md px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase w-fit"
                    style={{ background: `${GR}15`, color: GR }}>{n}</span>
                  <p className="text-[15px] font-semibold text-white leading-snug">{q}</p>
                  <p className="text-[14px] sm:text-[15px] leading-[1.65] text-white/50 flex-1">{a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ══ 07 — INFORMATION ARCHITECTURE ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto">
          <FadeUp>
            <SLabel n="07" t="IA OVERVIEW" />
            <H2 white="Information" accent="architecture" />
            <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/55 max-w-[520px]">
              The full app hierarchy — every flow, every screen, organized by section. A complete IA tree and 10-journey flow map has been delivered separately as a 5200px wide Figma frame.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-10">
            <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: "Pre-Launch", count: "4 screens", color: "#6366F1", items: ["S0 Splash", "S1–S3 Intro Slides"] },
                { name: "Auth", count: "7 screens", color: "#3B82F6", items: ["L1 Sign In", "L2 Biometric", "L3 Locked", "L4–L7 Reset Flow"] },
                { name: "Onboarding", count: "14 screens", color: "#F59E0B", items: ["O1–O5 Registration", "O6–O12 KYC Flow", "O13–O14 Google SSO"] },
                { name: "Dashboard", count: "2 screens", color: GR, items: ["O1 Minimal V1", "O1b Full V2"] },
                { name: "Deposit", count: "7 screens", color: "#EF4444", items: ["D1 Method", "D2–D5 Payment", "D6–D7 Result"] },
                { name: "Withdraw", count: "7 screens", color: "#F59E0B", items: ["W1–W4 Dest/Review", "W5 Auth", "W6–W7 Result"] },
                { name: "Send Ext", count: "6 screens", color: GR, items: ["SE1–SE4 Entry", "SE5 Review", "SE6 Success"] },
                { name: "Send Int", count: "4 screens", color: "#06B6D4", items: ["SI1 Search", "SI2–SI4 Send"] },
                { name: "Receive", count: "3 screens", color: "#EAB308", items: ["R1 Asset", "R2 Network", "R3 QR Code"] },
                { name: "Trade", count: "8 screens", color: "#8B5CF6", items: ["17–19 Buy/Sell/Swap", "20–21 Review", "22–24 Results"] },
                { name: "Market", count: "5 screens", color: "#EC4899", items: ["12 Overview", "13 Coin/Chart", "14–16 Watchlist"] },
                { name: "Cards", count: "6 screens", color: "#F97316", items: ["27–30 Overview", "27–32 Manage", "33 Empty"] },
                { name: "Profile", count: "10 screens", color: "#14B8A6", items: ["P1–P5 Identity", "P6–P8 Security", "P9–P15 Settings"] },
                { name: "Transactions", count: "5 screens", color: GR, items: ["TX1 History", "TX2–TX3 Detail", "TX4–TX5 Empty/Notifs"] },
              ].map(({ name, count, color, items }) => (
                <StaggerItem key={name}>
                  <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                      <p className="text-[14px] font-semibold text-white">{name}</p>
                    </div>
                    <p className="text-[10px] mb-2" style={{ color }}>{count}</p>
                    {items.map(it => <p key={it} className="text-[10px] text-white/35 leading-relaxed">{it}</p>)}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-5">
            <div className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-3 flex items-start gap-3">
              <span className="mt-0.5 w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[10px]" style={{ background: `${GR}20`, color: GR }}>i</span>
              <p className="text-[13px] text-white/45 leading-relaxed">
                The full IA tree with 14 columns, SVG connectors, and all 10 user journey flow diagrams is available as a separate 5200×5000px Figma frame — <strong className="text-white/60">IA & Flow Map (node 391:4719)</strong>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ MOCKUP 13 ══ */}
      <section className="py-10 sm:py-14 px-3 sm:px-6">
        <FadeUp className="max-w-[1100px] mx-auto">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 shadow-[0_0_80px_rgba(1,186,75,0.12)] aspect-[4/5] sm:aspect-[16/9]" style={{ borderColor: `${GR}44` }}>
            <img src={mockup13} alt="YDpay mockup" className="w-full h-full object-cover object-center" loading="lazy" />
          </div>
        </FadeUp>
      </section>

      {/* ══ THANK YOU ══ */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto text-center">
          <FadeUp>
            <h2
              className="text-5xl sm:text-6xl lg:text-[72px] font-semibold tracking-[-0.03em] leading-[1.05] mb-6"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paintOrder: "stroke fill",
                WebkitTextStroke: "1px rgba(180,180,180,0.35)",
              }}
            >
              Thank you.
            </h2>
            <p className="text-[16px] sm:text-[17px] leading-[1.65] text-white/55 max-w-[520px] mx-auto mb-10">
              This redesign represents over 96 screens of intentional, premium design. Every decision was made with the user's trust — and your product's success — in mind.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {[
                { label: "96 Screens Delivered", color: GR },
                { label: "14 Flows", color: "#6366F1" },
                { label: "10 User Journeys", color: "#F59E0B" },
                { label: "March 2026", color: "#3B82F6" },
              ].map(({ label, color }) => (
                <span key={label} className="rounded-full border px-4 py-1.5 text-[13px] font-semibold"
                  style={{ borderColor: `${color}44`, color, background: `${color}10` }}>
                  ● {label}
                </span>
              ))}
            </div>
            {/* author card */}
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                style={{ background: GR }}>R</div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">Richard Enoch Adesiyan</p>
                <p className="text-[11px]" style={{ color: GR }}>Lead Designer · ADLM Studio</p>
                <p className="text-[10px] text-white/35">YDPay Mobile App Redesign · 2026</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ BRAND FOUNDATION LINK ══ */}
      <section className="py-14 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-[860px] mx-auto">
          <FadeUp>
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/30 mb-2">THE OTHER HALF OF THIS STORY</p>
                <p className="text-[18px] sm:text-[20px] font-semibold text-white leading-snug mb-2">
                  The brand was built before this product.
                </p>
                <p className="text-[14px] text-white/50 leading-[1.65] max-w-[420px]">
                  The typography, palette, and visual language this app inherits came from the brand foundation phase — designed first, so the product had something coherent to build on.
                </p>
              </div>
              <Link
                to="/projects/ydpay-brand"
                className="shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-black whitespace-nowrap transition-opacity hover:opacity-85"
                style={{ background: GR }}
              >
                See the brand foundation →
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ OTHER PROJECTS ══ */}
      <OtherProj currentSlug="ydpay-mobile-redesign" currentKind="ui" />
      <BuildSection />

    </div>
  </div>
);

export default YDpayPage;
