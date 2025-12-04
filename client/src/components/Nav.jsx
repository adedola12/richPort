import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <header
      className="
        fixed top-0 left-0 z-50
        w-full
        bg-gradient-to-b from-black/90 via-black/70 to-black/0
        backdrop-blur-xl
        px-[6px]   /* 4px padding from the screen edge */
      "
    >
      {/* full-width wrapper, no max-w so it spans edge to edge */}
      <div className="w-full pt-4 pb-3">
        <div
          className="
            flex items-center justify-between
            rounded-full border border-white/10
            bg-black/40 bg-gradient-to-b from-black/70 to-black/40
            backdrop-blur-xl
            px-4 sm:px-8 lg:px-12 py-3
          "
        >
          {/* Logo / name */}
          <div className="text-white text-2xl sm:text-3xl font-normal font-['Zialothus'] whitespace-nowrap">
            Richard Enoch
          </div>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] sm:text-xs font-medium font-['Gabarito'] text-white/80">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/projects" className="hover:text-white transition-colors">
              Projects
            </Link>
            <Link
              to="/rate-details"
              className="hover:text-white transition-colors"
            >
              Rate Card
            </Link>
          </nav>

          {/* Right buttons – desktop */}
          <div className="hidden sm:flex items-center gap-3 w-auto">
            <button className="px-4 py-2 rounded-lg border border-white/60 bg-white/5 text-[11px] sm:text-xs font-normal font-['Lexend'] text-white hover:bg-white/10 transition">
              View Works
            </button>

            <button className="px-4 py-2 rounded-lg bg-gradient-to-b from-lime-400 to-lime-600 text-[11px] sm:text-xs font-bold font-['Lexend'] text-black shadow-[0_0_18px_rgba(132,204,22,0.5)] hover:from-lime-300 hover:to-lime-500 transition">
              Contact
            </button>
          </div>

          {/* Mobile compact menu */}
          <div className="flex md:hidden items-center gap-3">
            <nav className="flex items-center gap-4 text-[11px] font-medium font-['Gabarito'] text-white/80">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </nav>

            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-lime-400 to-lime-600 text-[11px] font-semibold font-['Lexend'] text-black">
              Contact
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
