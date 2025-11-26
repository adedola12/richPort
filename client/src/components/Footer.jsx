import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-800 mt-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
        {/* TOP ROW: logo | nav | socials */}
        <div className="grid gap-6 md:grid-cols-3 md:items-center">
          {/* Logo */}
          <div className="justify-self-start text-white text-3xl md:text-4xl font-normal font-['Zialothus']">
            Richard Enoch
          </div>

          {/* Center nav */}
          <nav className="flex justify-center items-center gap-10 text-[11px] sm:text-xs font-medium font-['Gabarito'] text-neutral-200">
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
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Rate Card
            </Link>
          </nav>

          {/* Stay Connected */}
          <div className="justify-self-stretch md:justify-self-end">
            <div
              className="
                flex items-center justify-between md:justify-start gap-4
                px-5 py-3
                rounded-xl
                border border-neutral-700
                bg-gradient-to-b from-neutral-900/85 to-neutral-800/40
                shadow-[0_0_16px_rgba(0,0,0,0.8)]
              "
            >
              <span className="text-neutral-200 text-xs sm:text-sm font-medium font-['Lexend']">
                Stay Connected
              </span>

              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://www.linkedin.com/in/richardenoch/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-md
                    border border-neutral-700
                    bg-gradient-to-b from-neutral-900 to-neutral-800
                    hover:border-lime-400 hover:shadow-[0_0_14px_rgba(132,204,22,0.7)]
                    transition
                  "
                >
                  <span
                    className="
                      flex items-center justify-center
                      w-6 h-6
                      rounded-full
                      bg-gradient-to-b from-lime-400 to-lime-600
                    "
                  >
                    <FaLinkedinIn className="text-black text-sm" />
                  </span>
                </a>

                {/* Twitter */}
                <a
                  href="https://x.com/richardenoch_"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-md
                    border border-neutral-700
                    bg-gradient-to-b from-neutral-900 to-neutral-800
                    hover:border-lime-400 hover:shadow-[0_0_14px_rgba(132,204,22,0.7)]
                    transition
                  "
                >
                  <span
                    className="
                      flex items-center justify-center
                      w-6 h-6
                      rounded-full
                      bg-gradient-to-b from-lime-400 to-lime-600
                    "
                  >
                    <FaTwitter className="text-black text-sm" />
                  </span>
                </a>

                {/* Instagram (you can swap to LinkedIn if you want) */}
                <a
                  href="https://www.instagram.com/therichardenoch"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    rounded-md
                    border border-neutral-700
                    bg-gradient-to-b from-neutral-900 to-neutral-800
                    hover:border-lime-400 hover:shadow-[0_0_14px_rgba(132,204,22,0.7)]
                    transition
                  "
                >
                  <span
                    className="
                      flex items-center justify-center
                      w-6 h-6
                      rounded-full
                      bg-gradient-to-b from-lime-400 to-lime-600
                    "
                  >
                    <FaInstagram className="text-black text-sm" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle divider */}
        <div className="h-px bg-neutral-800" />

        {/* BOTTOM ROW: email/phone | copyright */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs sm:text-sm font-['Lexend']">
          {/* Email + phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2 pb-1 border-b border-neutral-800">
              <span
                className="
                  flex items-center justify-center
                  w-4 h-4
                  rounded-sm
                  bg-gradient-to-b from-lime-400 to-lime-600
                "
              >
                <FaEnvelope className="text-black text-[10px]" />
              </span>
              <span className="text-neutral-200">
                des.richardenoch@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-2 pb-1 border-b border-neutral-800">
              <span
                className="
                  flex items-center justify-center
                  w-4 h-4
                  rounded-sm
                  bg-gradient-to-b from-lime-400 to-lime-600
                "
              >
                <FaPhone className="text-black text-[10px]" />
              </span>
              <span className="text-neutral-200">+234 903 852 2066</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-neutral-400 text-xs sm:text-sm text-center md:text-right">
            © {new Date().getFullYear()} Richard Enoch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
