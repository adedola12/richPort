// src/components/Layout/Nav.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const auth = useAuth() || {};
  const { isAdmin = false } = auth;
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const handleProfileClick = () => {
    if (isAuthenticated && user?.userType === "admin") {
      // 🔐 already admin → go straight to dashboard
      navigate("/admin");
    } else {
      // not logged in → go to admin auth page
      navigate("/admin-auth");
    }
  };

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
    <>
      {/* TOP NAVBAR */}
      <header
        className="
          fixed top-0 left-0 z-50 w-full
          px-[6px] pt-3 pb-2
        "
      >
        <div className="w-full">
          <div
            className="
              flex items-center justify-between
              rounded-[6px]
              border border-white/18
              bg-gradient-to-r
                from-emerald-500/18
                via-white/14
                to-sky-500/18
              backdrop-blur-2xl
              shadow-[0_0_40px_rgba(0,0,0,0.7)]
              px-4 sm:px-8 lg:px-12 py-3
            "
          >
            {/* Logo / name */}
            <Link
              to="/"
              className="
                text-white text-2xl sm:text-3xl font-normal
                whitespace-nowrap
              "
              style={{ fontFamily: "Zialothus, 'Great Vibes', cursive" }}
              onClick={closeMenu}
            >
              Richard Enoch
            </Link>

            {/* Center links – desktop */}
            <nav className="hidden md:flex items-center gap-10 text-[20px] sm:text-xs font-medium font-['Gabarito'] text-white/80">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors ${
                    isActive(link.to) ? "text-white" : "hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right buttons – desktop */}
            <div className="hidden sm:flex items-center gap-3 w-auto">
              <Link
                to="/projects"
                className="px-4 py-2 rounded-lg border border-white/60 bg-white/10 text-[11px] sm:text-xs font-normal font-['Lexend'] text-white hover:bg-white/15 transition"
              >
                View Works
              </Link>

              <Link
                to="/rate-details"
                className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-b from-lime-400 to-lime-600
                  text-[11px] sm:text-xs font-bold font-['Lexend'] text-black
                  shadow-[0_0_18px_rgba(132,204,22,0.5)]
                  hover:from-lime-300 hover:to-lime-500 transition
                "
              >
                Contact
              </Link>

              {/* Admin icon */}
              <button
                type="button"
                onClick={handleProfileClick}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full border border-white/50
                  bg-white/5 text-white
                  hover:bg-white/15 transition
                "
                title={isAdmin ? "Go to Admin" : "Admin sign in / sign up"}
              >
                <FiUser className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile: Contact + Hamburger + Admin icon */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                type="button"
                onClick={handleProfileClick}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full border border-white/40
                  bg-white/10 text-white
                  hover:bg-white/20 transition
                "
              >
                <FiUser className="h-4 w-4" />
              </button>

              {!menuOpen && (
                <Link
                  to="/rate-details"
                  onClick={closeMenu}
                  className="
                    px-3 py-1.5 rounded-lg
                    bg-gradient-to-b from-lime-400 to-lime-600
                    text-[11px] font-semibold font-['Lexend'] text-black
                    shadow-[0_0_14px_rgba(132,204,22,0.55)]
                  "
                >
                  Contact
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="
                  relative flex h-9 w-9 items-center justify-center
                  rounded-full border border-white/25 bg-white/10
                  text-white
                  focus:outline-none focus:ring-2 focus:ring-lime-400/70
                "
              >
                <span
                  className={`block h-[2px] w-4 rounded-full bg-white transition-transform duration-200 ${
                    menuOpen
                      ? "translate-y-[3px] rotate-45"
                      : "-translate-y-[4px]"
                  }`}
                />
                <span
                  className={`block h-[2px] w-4 rounded-full bg-white transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-[2px] w-4 rounded-full bg-white transition-transform duration-200 ${
                    menuOpen
                      ? "-translate-y-[3px] -rotate-45"
                      : "translate-y-[4px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile glass sidebar + overlay */}
      <div
        className={`
          md:hidden
          fixed inset-0 z-40
          transition-opacity duration-300
          ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      >
        <div className="absolute inset-0 bg-black/60" onClick={closeMenu} />

        <div
          className={`
            absolute right-0 top-0 h-full w-[78%] max-w-xs
            bg-gradient-to-b from-black/80 via-black/70 to-black/60
            backdrop-blur-2xl border-l border-white/10
            shadow-[0_0_45px_rgba(0,0,0,0.9)]
            px-6 pt-20 pb-10
            flex flex-col gap-8
            transform transition-transform duration-300
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <nav className="flex flex-col gap-5 text-sm font-['Gabarito'] text-white/85">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`
                  flex items-center justify-between
                  border-b border-white/10 pb-2
                  ${isActive(link.to) ? "text-white" : "hover:text-white"}
                `}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <Link
              to="/projects"
              onClick={closeMenu}
              className="w-full px-4 py-2 rounded-lg border border-white/40 bg-white/10 text-xs font-normal font-['Lexend'] text-white hover:bg-white/15 transition"
            >
              View Works
            </Link>

            <Link
              to="/rate-details"
              onClick={closeMenu}
              className="
                w-full text-center px-4 py-2 rounded-lg
                bg-gradient-to-b from-lime-400 to-lime-600
                text-xs font-bold font-['Lexend'] text-black
                shadow-[0_0_18px_rgba(132,204,22,0.5)]
                hover:from-lime-300 hover:to-lime-500 transition
              "
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
