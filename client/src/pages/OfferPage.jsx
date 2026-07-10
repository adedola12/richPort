// src/pages/OfferPage.jsx
// The landing page for a private offer link. Shows the negotiated deal
// (package + agreed price per service) and routes the client into the
// right booking form with the offer applied. Bundles list every service;
// each is booked through its own form, one after the other.
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchJson } from "../api/http";

const N = (n) => "₦" + Number(n || 0).toLocaleString("en-NG");
const SERVICE_META = {
  brand: { label: "Brand Identity", path: "/book" },
  website: { label: "Website Design", path: "/book-website" },
  flyer: { label: "Flyer Design", path: "/book-flyer" },
};

export default function OfferPage() {
  const { token } = useParams();
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let on = true;
    fetchJson(`/api/discounts/offer/${token}`)
      .then((o) => { if (on) (o?.ok ? setOffer(o) : setError(o?.error || "Offer not found.")); })
      .catch((e) => { if (on) setError(e?.message || "This offer link isn't valid anymore."); });
    return () => { on = false; };
  }, [token]);

  return (
    <div className="mx-auto min-h-[70vh] w-full max-w-[640px] px-5 pt-32 pb-20 text-white">
      {!offer && !error && <p className="text-center text-neutral-400">Opening your offer…</p>}

      {error && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <div className="mb-3 text-3xl">🤝</div>
          <h1 className="mb-2 text-xl font-semibold">This offer isn't available</h1>
          <p className="mb-6 text-sm text-neutral-400">{error}</p>
          <Link to="/rate-details" className="text-sm text-lime-400 hover:underline">See the standard packages →</Link>
        </div>
      )}

      {offer && (
        <div className="rounded-2xl border border-lime-400/25 bg-white/[0.02] p-8">
          <div className="mb-1 text-xs uppercase tracking-[0.2em] text-lime-400">A private offer, just for you</div>
          <h1 className="mb-2 text-2xl font-semibold">
            {offer.clientName ? `Hi ${offer.clientName} 👋` : "Your agreed package"}
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-neutral-400">
            {offer.note || "As we discussed, here is your agreed package. Book through this page and your invoice will carry exactly this price."}
          </p>

          <div className="mb-6 space-y-3">
            {offer.items.map((item) => {
              const meta = SERVICE_META[item.service] || { label: item.service, path: "/" };
              return (
                <div key={item.service} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{meta.label} — <span className="capitalize">{item.planKey}</span></div>
                    <div className="text-xs text-neutral-500">Agreed price: <span className="text-lime-300">{N(item.price)}</span></div>
                  </div>
                  {item.booked ? (
                    <span className="rounded-full bg-lime-400/15 px-3 py-1 text-xs text-lime-300">Booked ✓</span>
                  ) : (
                    <Link
                      to={`${meta.path}?offer=${token}`}
                      className="rounded-lg border border-lime-400/50 px-4 py-2 text-xs font-semibold text-lime-400 hover:bg-lime-400/10"
                    >
                      Book this →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-white/10 pt-4 text-sm">
            <span className="text-neutral-400">Total agreed</span>
            <span className="text-lg font-semibold text-lime-400">{N(offer.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
