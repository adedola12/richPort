import React, { useState } from "react";
import ADLMLogo from "../../assets/partner/ADLMLogo.png";
import VeriLogo from "../../assets/partner/VeriLogo.png";
import TradeflowLogo from "../../assets/partner/TradeflowLogo.png";
import BookLogo from "../../assets/partner/BookLogo.png";
import ydpayGrey from "../../assets/partner/ydpayLogo.svg";
import ydpayColor from "../../assets/partner/ydpayColor.svg";
import niqsGrey from "../../assets/partner/niqsLogo.svg";
import niqsColor from "../../assets/partner/NiqsColor.svg";
import whitespaceLogo from "../../assets/partner/whitespaceLogo.png";

const partners = [
  { grey: ADLMLogo,       color: null,        alt: "ADLM Studio",            href: "https://www.adlmstudio.net/" },
  { grey: VeriLogo,       color: null,        alt: "Veridian Arc",            href: "https://veridianarc.com/" },
  { grey: TradeflowLogo,  color: null,        alt: "Tradeflow Africa",        href: null },
  { grey: BookLogo,       color: null,        alt: "Book Rion",               href: "https://www.bookrion.com/" },
  { grey: ydpayGrey,      color: ydpayColor,  alt: "YDPay",                   href: "https://www.ydpay.io/" },
  { grey: niqsGrey,       color: niqsColor,   alt: "NIQS",                    href: "https://niqs-website.vercel.app/" },
  { grey: whitespaceLogo, color: null,        alt: "Whitespace Creatorverse", href: "https://whitespacecreatorverse.com/" },
];

const track = [...partners, ...partners];

const LogoItem = ({ p }) => {
  const [hovered, setHovered] = useState(false);
  const src = (hovered && p.color) ? p.color : p.grey;

  const img = (
    <img
      src={src}
      alt={p.alt}
      style={{
        height: 34,
        width: "auto",
        maxWidth: 150,
        objectFit: "contain",
        filter: (hovered || p.color) ? (hovered ? "none" : "grayscale(1)") : "grayscale(1)",
        opacity: hovered ? 1 : 0.5,
        transition: "filter 0.3s, opacity 0.3s",
        display: "block",
      }}
    />
  );

  const inner = p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" title={p.alt}>
      {img}
    </a>
  ) : img;

  return (
    <div
      className="flex items-center justify-center px-5 sm:px-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </div>
  );
};

const Partners = () => (
  <section className="w-full mt-8 overflow-hidden">
    <style>{`
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      .marquee-track {
        display: flex;
        align-items: center;
        width: max-content;
        animation: marquee 32s linear infinite;
      }
      .marquee-wrap:hover .marquee-track {
        animation-play-state: paused;
      }
    `}</style>

    <div className="marquee-wrap relative">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
        style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
        style={{ background: "linear-gradient(to left, #050505, transparent)" }} />

      <div className="marquee-track py-3">
        {track.map((p, i) => (
          <LogoItem key={i} p={p} />
        ))}
      </div>
    </div>
  </section>
);

export default Partners;
