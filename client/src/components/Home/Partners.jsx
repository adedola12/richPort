import React from "react";
import ADLMLogo from "../../assets/partner/ADLMLogo.png";
import crediLogo from "../../assets/partner/crediLogo.png";
import FedMinLogo from "../../assets/partner/FedMinLogo.png";
import VeriLogo from "../../assets/partner/VeriLogo.png";
import TradeflowLogo from "../../assets/partner/TradeflowLogo.png";
import BookLogo from "../../assets/partner/BookLogo.png";
import nediLogo from "../../assets/partner/nediLogo.png";

const partners = [
  { src: ADLMLogo, alt: "ADLM Studio" },
  { src: crediLogo, alt: "Credicorp" },
  { src: FedMinLogo, alt: "Federal Ministry" },
  { src: VeriLogo, alt: "Veridian Arc" },
  { src: TradeflowLogo, alt: "Tradeflow" },
  { src: BookLogo, alt: "Book Rion" },
  { src: nediLogo, alt: "NEDI" },
];

const Partners = () => {
  return (
    <div className="mx-auto mt-8 sm:mt-10 grid max-w-6xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 items-center gap-x-6 gap-y-6">
      {partners.map((p) => (
        <div
          key={p.alt}
          className="flex items-center justify-center opacity-95 grayscale hover:grayscale-0 transition"
        >
          <img src={p.src} alt={p.alt} className="h-7 sm:h-8 md:h-9 w-auto" />
        </div>
      ))}
    </div>
  );
};

export default Partners;
