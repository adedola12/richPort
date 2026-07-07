// src/components/Layout/Nav.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const PROJECT_CATEGORIES = [
  { label: "Brand Identity Designs", icon: "✦" },
  { label: "Product UI/UX Designs",  icon: "◈" },
  { label: "Graphic Designs",         icon: "◇" },
  { label: "Websites Designs",        icon: "⬡" },
];

const Nav = () => {
  const { user } = useAuth() || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const projectsRef = useRef(null);

  const closeMenu = () => { setMenuOpen(false); setMobileProjectsOpen(false); };

  // Close on route change
  useEffect(() => { closeMenu(); setProjectsOpen(false); }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/rate-details", label: "Rate Card" },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header ref={dropdownRef} className="fixed top-0 left-0 z-50 w-full">
      {/* ── Navbar row ── */}
      <div
        className="
          flex items-center justify-between
          border-b border-white/10
          bg-gradient-to-r from-emerald-500/18 via-white/14 to-sky-500/18
          backdrop-blur-2xl
          shadow-[0_0_40px_rgba(0,0,0,0.7)]
          px-4 sm:px-8 lg:px-12 py-3
        "
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-white text-[clamp(20px,2.2vw,28px)] font-medium tracking-[-0.04em] whitespace-nowrap"
        >
          Richard Enoch
        </Link>

        {/* Center links – desktop */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-medium text-white/80">
          {navLinks.map((link) =>
            link.label === "Projects" ? (
              <div
                key={link.to}
                ref={projectsRef}
                className="relative"
                onMouseEnter={() => setProjectsOpen(true)}
                onMouseLeave={() => setProjectsOpen(false)}
              >
                <Link
                  to={link.to}
                  className={`flex items-center gap-1 transition-colors ${isActive(link.to) ? "text-white" : "hover:text-white"}`}
                >
                  {link.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                    style={{ transition: "transform 0.2s", transform: projectsOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </Link>

                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
                    >
                      <div className="p-1.5">
                        {PROJECT_CATEGORIES.map((cat) => (
                          <button
                            key={cat.label}
                            onClick={() => {
                              setProjectsOpen(false);
                              navigate(`/projects?tab=${encodeURIComponent(cat.label)}`);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[11px] font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors"
                          >
                            <span className="text-lime-400 text-[13px] leading-none">{cat.icon}</span>
                            {cat.label}
                          </button>
                        ))}
                        <div className="mx-3 my-1 h-px bg-white/[0.06]"/>
                        <Link
                          to="/projects"
                          onClick={() => setProjectsOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-medium text-white/50 hover:text-white hover:bg-white/8 transition-colors"
                        >
                          <span className="text-white/30 text-[13px] leading-none">⊞</span>
                          View all projects
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${isActive(link.to) ? "text-white" : "hover:text-white"}`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right buttons – desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/projects"
            className="px-4 py-2 rounded-lg bg-gradient-to-b from-lime-400 to-lime-600 text-xs font-bold text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] hover:from-lime-300 hover:to-lime-500 hover:-translate-y-[1px] active:scale-95 transition"
          >
            View Works
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-lg bg-gradient-to-b from-lime-400 to-lime-600 text-xs font-bold text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] hover:from-lime-300 hover:to-lime-500 transition"
          >
            Contact
          </Link>
        </div>

        {/* Mobile: Contact pill + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {!menuOpen && (
            <Link
              to="/contact"
              onClick={closeMenu}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-lime-400 to-lime-600 text-[11px] font-semibold text-black shadow-[0_0_14px_rgba(132,204,22,0.55)]"
            >
              Contact
            </Link>
          )}

          <motion.button
            type="button"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/8 backdrop-blur text-white focus:outline-none focus:ring-2 focus:ring-lime-400/50"
          >
            <motion.span
              className="absolute block h-[1.5px] w-[18px] rounded-full bg-white"
              animate={{ y: menuOpen ? 0 : -6, rotate: menuOpen ? 45 : 0 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            />
            <motion.span
              className="absolute block h-[1.5px] w-[14px] rounded-full bg-white"
              style={{ originX: "0%" }}
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute block h-[1.5px] w-[18px] rounded-full bg-white"
              animate={{ y: menuOpen ? 0 : 6, rotate: menuOpen ? -45 : 0 }}
              transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </motion.button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute left-0 right-0 top-full px-3 pt-1.5 pb-3"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div
              className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
            >
              {/* Nav links */}
              <nav className="flex flex-col py-2">
                {navLinks.map((link) =>
                  link.label === "Projects" ? (
                    <div key={link.to} className="border-b border-white/[0.06]">
                      <button
                        onClick={() => setMobileProjectsOpen((p) => !p)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors ${isActive(link.to) ? "text-white bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                      >
                        <span>Projects</span>
                        <svg width="12" height="12" viewBox="0 0 10 10" fill="currentColor"
                          style={{ transition: "transform 0.2s", transform: mobileProjectsOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobileProjectsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                            className="overflow-hidden bg-white/[0.03]"
                          >
                            {PROJECT_CATEGORIES.map((cat) => (
                              <button
                                key={cat.label}
                                onClick={() => {
                                  closeMenu();
                                  navigate(`/projects?tab=${encodeURIComponent(cat.label)}`);
                                }}
                                className="w-full flex items-center gap-3 px-7 py-2.5 text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                              >
                                <span className="text-lime-400">{cat.icon}</span>
                                {cat.label}
                              </button>
                            ))}
                            <Link
                              to="/projects"
                              onClick={closeMenu}
                              className="flex items-center gap-3 px-7 py-2.5 text-xs font-medium text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <span className="text-white/30">⊞</span>
                              View all
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-5 py-3.5 text-sm font-medium border-b border-white/[0.06] last:border-0 transition-colors ${isActive(link.to) ? "text-white bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}
                    >
                      <span>{link.label}</span>
                      {isActive(link.to) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                      )}
                    </Link>
                  )
                )}
              </nav>

              {/* CTA row */}
              <div className="flex gap-2 px-4 pb-4 pt-3 border-t border-white/[0.06]">
                <Link
                  to="/projects"
                  onClick={closeMenu}
                  className="flex-1 text-center px-4 py-2.5 rounded-lg bg-gradient-to-b from-lime-400 to-lime-600 text-xs font-bold text-black shadow-[0_0_16px_rgba(132,204,22,0.45)] hover:from-lime-300 hover:to-lime-500 active:scale-95 transition"
                >
                  View Works
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMenu}
                  className="flex-1 text-center px-4 py-2.5 rounded-lg bg-gradient-to-b from-lime-400 to-lime-600 text-xs font-bold text-black shadow-[0_0_16px_rgba(132,204,22,0.45)] hover:from-lime-300 hover:to-lime-500 transition"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
