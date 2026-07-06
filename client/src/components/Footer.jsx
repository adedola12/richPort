import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import abtImg from "../assets/abtImg.jpg";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_144509_89e2d612-8af2-45c3-90f4-4831bc60715d.mp4";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/richardenoch/",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/richardenoch_",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/therichardenoch",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="15" height="15">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const NAVIGATE_LINKS = [
  { label: "Home",      to: "/" },
  { label: "About",     to: "/about" },
  { label: "Projects",  to: "/projects" },
  { label: "Rate Card", to: "/rate-details" },
  { label: "Contact",   to: "/contact" },
  { label: "Leave a Testimonial", to: "/testimonial" },
];

const WORK_COL_A = [
  { label: "Website Design",   to: "/website-design" },
  { label: "Graphic Design",   to: "/graphic-design" },
  { label: "UI / UX Projects", to: "/projects" },
  { label: "Book a Flyer",     to: "/book-flyer" },
];

const WORK_COL_B = [
  { label: "Brand Identity",      to: "/projects" },
  { label: "Publication Design",  to: null },
  { label: "Presentation Design", to: "/presentation-design" },
];

/* ── MAGNETIC LINK ── */
const MagneticLink = ({ to, children, style, disabled }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 14, mass: 0.6 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.38);
    y.set((e.clientY - cy) * 0.38);
  }, [x, y, disabled]);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}
      onMouseMove={onMove}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={onLeave}
    >
      {disabled ? (
        <span style={{ ...style, color: "rgba(255,255,255,0.2)", cursor: "default" }}>{children}</span>
      ) : (
        <Link to={to} style={{ ...style, color: hovered ? "#a3e635" : "#e5e7eb", transition: "color 0.18s" }}>
          {children}
        </Link>
      )}
      {disabled && (
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: "#4b5563", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "1px 5px", textTransform: "uppercase", flexShrink: 0 }}>
          Soon
        </span>
      )}
    </motion.div>
  );
};

/* ── WATERMARK ── */
const WatermarkSvg = () => {
  const svgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const fit = () => {
      const svg = svgRef.current;
      const text = textRef.current;
      if (!svg || !text) return;
      try {
        const bbox = text.getBBox();
        svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      } catch (e) {}
    };
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    else window.addEventListener("load", fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        maxWidth: "1700px",
        margin: "-56px auto 0",
        pointerEvents: "none",
        userSelect: "none",
        position: "relative",
        zIndex: 0,
        lineHeight: 0,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 95 1400 175"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
      >
        <text
          ref={textRef}
          x="700"
          y="240"
          textAnchor="middle"
          fontSize="240"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          letterSpacing="-0.03em"
          fill="rgba(255,255,255,0.04)"
        >
          Richard Enoch
        </text>
      </svg>
    </div>
  );
};

/* ── RIGHT CARD — 3D tilt + cursor glow ── */
const RightCard = ({ children, easterEgg, revealRef }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const sheenRef = useRef(null);
  const rafRef = useRef(null);
  const [inside, setInside] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 140, damping: 22, mass: 0.8 });
  const sRotY = useSpring(rotY, { stiffness: 140, damping: 22, mass: 0.8 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      // 3D tilt
      rotX.set((py - 0.5) * -9);
      rotY.set((px - 0.5) * 12);

      // spotlight glow
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(560px circle at ${px * 100}% ${py * 100}%, rgba(132,204,22,0.09) 0%, rgba(132,204,22,0.04) 35%, transparent 65%)`;
      }

      // specular sheen
      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(300px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.045) 0%, transparent 60%)`;
      }

      // image reveal spotlight
      if (revealRef?.current) {
        revealRef.current.style.background = `radial-gradient(280px circle at ${px * 100}% ${py * 100}%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 70%)`;
      }
    });
  }, [rotX, rotY, revealRef]);

  const handleMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    setInside(false);
    if (glowRef.current) glowRef.current.style.background = "transparent";
    if (sheenRef.current) sheenRef.current.style.background = "transparent";
    if (revealRef?.current) revealRef.current.style.background = "rgba(0,0,0,0.6)";
  }, [rotX, rotY, revealRef]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        background: "#0d0e14",
        borderRadius: 28,
        padding: 40,
        overflow: "visible",
        border: easterEgg
          ? "1px solid rgba(132,204,22,0.55)"
          : inside
            ? "1px solid rgba(132,204,22,0.22)"
            : "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        boxShadow: easterEgg
          ? "0 0 0 1px rgba(132,204,22,0.3), 0 20px 60px rgba(132,204,22,0.15)"
          : inside
            ? "0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(132,204,22,0.12)"
            : "0 4px 20px rgba(0,0,0,0.25)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* spotlight glow */}
      <div ref={glowRef} aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 28, pointerEvents: "none", zIndex: 0 }} />
      {/* specular sheen */}
      <div ref={sheenRef} aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 28, pointerEvents: "none", zIndex: 0 }} />
      {/* pulse dots */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 28, pointerEvents: "none", zIndex: 0, opacity: inside ? 1 : 0, transition: "opacity 0.4s ease" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {[[14,22],[38,68],[62,15],[80,44],[25,85],[55,55],[90,20],[70,78],[10,50],[45,92]].map(([cx, cy], i) => (
          <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="1.2" fill="rgba(132,204,22,0.55)"
            style={{ animation: `footerPulse ${1.8 + (i % 4) * 0.4}s ease-in-out ${i * 0.18}s infinite alternate` }} />
        ))}
      </svg>
      {children}
    </motion.div>
  );
};

/* ── FOOTER ── */
const Footer = () => {
  const navigate = useNavigate();
  const revealRef = useRef(null);
  const [easterEgg, setEasterEgg] = useState(false);
  const typedRef = useRef("");
  const eggTimerRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      typedRef.current = (typedRef.current + e.key).slice(-6).toLowerCase();
      if (["hire", "hello", "hey"].some((t) => typedRef.current.includes(t))) {
        setEasterEgg(true);
        clearTimeout(eggTimerRef.current);
        eggTimerRef.current = setTimeout(() => setEasterEgg(false), 5000);
        typedRef.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(eggTimerRef.current); };
  }, []);

  const linkStyle = {
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
  };

  return (
    <footer className="w-full bg-black pb-2 pt-16 relative" style={{ overflowX: "clip" }}>
      <div
        style={{ maxWidth: "1700px", margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: "16px", alignItems: "stretch", padding: "0 32px", position: "relative", zIndex: 1 }}
        className="footer-grid"
      >
        {/* ── LEFT CARD ── */}
        <div style={{ position: "relative", minHeight: "340px", borderRadius: "28px", padding: "32px", overflow: "hidden", background: "#050505", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <video src={VIDEO_SRC} autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, pointerEvents: "none", opacity: 0.55 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.45) 100%)", zIndex: 1 }} />

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 2 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(132,204,22,0.15)", border: "1.5px solid rgba(132,204,22,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#a3e635", letterSpacing: "-0.02em", flexShrink: 0 }}>R</div>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>Richard Enoch</span>
          </div>

          {/* Tagline */}
          <div style={{ marginTop: "auto", marginBottom: 28, position: "relative", zIndex: 2 }}>
            <p style={{ fontSize: 19, fontWeight: 400, color: "#ffffff", lineHeight: 1.45 }}>
              Crafting brands and interfaces<br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>that leave a lasting impression.</span>
            </p>
          </div>

          {/* Socials */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.85)", letterSpacing: "0.3px" }}>Stay in touch!</span>
            <div style={{ display: "flex", gap: 7 }}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  style={{ width: 36, height: 36, borderRadius: 9, background: "#0e1014", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.35)", transition: "background 0.2s, transform 0.15s, box-shadow 0.2s", flexShrink: 0 }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#000"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#0e1014"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.35)"; }}
                  onTouchStart={(e) => { e.currentTarget.style.background = "#000"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onTouchEnd={(e) => { e.currentTarget.style.background = "#0e1014"; e.currentTarget.style.transform = "translateY(0)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT CARD ── */}
        <RightCard easterEgg={easterEgg} revealRef={revealRef}>
          {/* Floating illustration */}
          <div className="footer-float-icon" style={{ position: "absolute", top: -72, right: 40, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <img src="/flower-glass-spectrum.png" alt="Flower Glass Spectrum"
              style={{ width: 130, height: 130, objectFit: "contain", filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.45))", transform: "rotate(-6deg)" }} />
            <div style={{ display: "flex", gap: 6, alignItems: "center", transform: "rotate(-4deg)", marginTop: 2 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" style={{ color: "#6b7280", flexShrink: 0 }}>
                <path d="M3 20 C 6 14, 10 9, 18 5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 5 L 12 5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 5 L 18 11" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: 20, fontWeight: 600, color: "#6b7280", whiteSpace: "nowrap" }}>Available for work!</span>
            </div>
          </div>

          {/* Portrait — full card background */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 28,
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <img
              src={abtImg}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 18%",
                opacity: 0.18,
                filter: "grayscale(1) brightness(0.6)",
              }}
            />
            {/* cursor-reveal overlay — nearly black at rest, lifts where cursor passes */}
            <div ref={revealRef} style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              transition: "background 0.05s linear",
            }} />
          </div>

          {/* Nav columns */}
          <div style={{ paddingTop: 8, position: "relative", zIndex: 1 }}>
            <div className="footer-nav-cols" style={{ display: "flex", gap: 88 }}>

              {/* Navigate */}
              <div>
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: "#4b5563", marginBottom: 16, display: "block" }}>Navigate</span>
                {NAVIGATE_LINKS.map((link) => (
                  <MagneticLink key={link.label} to={link.to} style={linkStyle}>
                    {link.label}
                  </MagneticLink>
                ))}
              </div>

              {/* Work — two sub-columns grouped tightly */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: 22, fontWeight: 600, fontStyle: "italic", color: "#4b5563", marginBottom: 16, display: "block" }}>Work</span>
                <div style={{ display: "flex", gap: 24 }}>
                  <div>
                    {WORK_COL_A.map((link) => (
                      <MagneticLink key={link.label} to={link.to} style={linkStyle}>
                        {link.label}
                      </MagneticLink>
                    ))}
                  </div>
                  <div>
                    {WORK_COL_B.map((link) => (
                      <MagneticLink key={link.label} to={link.to} style={linkStyle} disabled={!link.to}>
                        {link.label}
                      </MagneticLink>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom row */}
          <div className="footer-bottom-row" style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: 48, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, fontWeight: 500, color: "#4b5563", margin: 0 }}>
                © {new Date().getFullYear()} Richard Enoch. All rights reserved.
              </p>
              <Link
                to="/admin"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, color: "#2d3039", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#4b5563"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#2d3039"}
              >
                Admin
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <AnimatePresence mode="wait">
                {easterEgg ? (
                  <motion.h4
                    key="egg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 15, fontWeight: 400, color: "#a3e635", lineHeight: 1.45, fontFamily: "'DM Sans', sans-serif", margin: 0 }}
                  >
                    Oh hey — glad you found this. 👋<br />
                    <strong style={{ display: "block", fontSize: 19, fontWeight: 700, color: "#d9f99d" }}>
                      Let&apos;s talk.
                    </strong>
                  </motion.h4>
                ) : (
                  <motion.h4
                    key="default"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 15, fontWeight: 400, color: "#6b7280", lineHeight: 1.45, fontFamily: "'DM Sans', sans-serif", margin: 0 }}
                  >
                    Have a project in mind?<br />
                    <strong style={{ display: "block", fontSize: 19, fontWeight: 700, color: "#f9fafb" }}>
                      Let&apos;s build something great.
                    </strong>
                  </motion.h4>
                )}
              </AnimatePresence>

              <motion.div
                animate={easterEgg ? { scale: [1, 1.05, 1], boxShadow: ["0 6px 20px rgba(132,204,22,0.35)", "0 8px 32px rgba(132,204,22,0.7)", "0 6px 20px rgba(132,204,22,0.35)"] } : {}}
                transition={{ duration: 0.6, repeat: easterEgg ? Infinity : 0, repeatType: "loop" }}
              >
                <Link
                  to="/contact"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 28px", background: "#a3e635", color: "#000", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: 700, borderRadius: 10, textDecoration: "none", boxShadow: "0 6px 20px rgba(132,204,22,0.35)", transition: "background 0.2s, transform 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#bef264"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#a3e635"; e.currentTarget.style.transform = "translateY(0)"; }}
                  onTouchStart={(e) => { e.currentTarget.style.background = "#bef264"; }}
                  onTouchEnd={(e) => { e.currentTarget.style.background = "#a3e635"; }}
                >
                  {easterEgg ? "Yes, let's go →" : "Get in Touch"}
                </Link>
              </motion.div>
            </div>
          </div>
        </RightCard>
      </div>

      <WatermarkSvg />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Caveat:wght@500;600;700&display=swap');
        @keyframes footerPulse {
          from { opacity: 0.25; }
          to   { opacity: 1; }
        }
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            padding: 0 16px !important;
          }
          .footer-float-icon {
            display: none !important;
          }
          .footer-nav-cols {
            flex-direction: column !important;
            gap: 28px !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 28px !important;
            margin-top: 32px !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid > div:last-child { padding: 24px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
