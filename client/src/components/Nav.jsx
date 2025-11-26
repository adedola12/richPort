import React from "react";

const Nav = () => {
  return (
    <header className="w-full flex justify-center pt-6">
      {/* wrapper to keep navbar centered and not full 1900px wide */}
      <div className="w-full px-1">
        {/* glass / gradient bar */}
        <div
          className="
            flex items-center justify-between
            rounded-md border border-white/10
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
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="/about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="/projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <a
              href="/rate-details"
              className="hover:text-white transition-colors"
            >
              Rate Card
            </a>
          </nav>

          {/* Right buttons */}
          <div className="hidden sm:flex items-center gap-3 w-auto">
            <button
              className="
                px-4 py-2 rounded-lg
                border border-white/60
                bg-white/5
                text-[11px] sm:text-xs
                font-normal font-['Lexend']
                text-white
                hover:bg-white/10
                transition
              "
            >
              View Works
            </button>

            <button
              className="
                px-4 py-2 rounded-lg
                bg-gradient-to-b from-lime-400 to-lime-600
                text-[11px] sm:text-xs
                font-bold font-['Lexend']
                text-black
                shadow-[0_0_18px_rgba(132,204,22,0.5)]
                hover:from-lime-300 hover:to-lime-500
                transition
              "
            >
              Contact
            </button>
          </div>

          {/* Mobile layout – links + buttons collapse into a simple row */}
          <div className="flex md:hidden items-center gap-3">
            <nav className="flex items-center gap-4 text-[11px] font-medium font-['Gabarito'] text-white/80">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
            </nav>

            <button
              className="
                px-3 py-1.5 rounded-lg
                bg-gradient-to-b from-lime-400 to-lime-600
                text-[11px]
                font-semibold font-['Lexend']
                text-black
              "
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
