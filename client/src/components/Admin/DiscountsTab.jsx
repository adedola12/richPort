// src/components/Admin/DiscountsTab.jsx
// Mint discount codes and private custom offers. Codes are typed by the
// client at booking; offers are share links that pin a package and carry
// the negotiated price — the invoice and the Reni Studio job both honor it.
import React, { useEffect, useState } from "react";
import { fetchJson } from "../../api/http";

const N = (n) => "₦" + Number(n || 0).toLocaleString("en-NG");
const input = "w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-lime-400/60";
const btn = "rounded-lg border border-lime-400/40 px-4 py-2 text-sm text-lime-400 hover:bg-lime-400/10 disabled:opacity-40";
const btnDanger = "rounded-lg border border-red-400/40 px-3 py-1.5 text-xs text-red-400 hover:bg-red-400/10";

const SERVICES = [
  { id: "any", label: "Any service" },
  { id: "brand", label: "Brand identity" },
  { id: "website", label: "Website" },
  { id: "flyer", label: "Flyer" },
];
const OFFER_SERVICES = SERVICES.slice(1);
const PLAN_KEYS = { brand: ["silver", "gold", "platinum"], website: ["starter", "business", "premium"], flyer: ["single", "triple", "five", "event"] };

export default function DiscountsTab() {
  const [data, setData] = useState({ codes: [], offers: [] });
  const [msg, setMsg] = useState("");
  const [codeForm, setCodeForm] = useState({ code: "", type: "percent", value: "", service: "any", note: "", expiresAt: "", maxUses: "" });
  const [offerForm, setOfferForm] = useState({ clientName: "", clientEmail: "", note: "", expiresAt: "", items: [{ service: "brand", planKey: "gold", price: "" }] });

  const load = async () => {
    try { setData(await fetchJson("/api/discounts/admin")); }
    catch { setMsg("Couldn't load discounts — check your session."); }
  };
  useEffect(() => { load(); }, []);

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 3500); };

  const createCode = async () => {
    try {
      await fetchJson("/api/discounts/admin/codes", { method: "POST", body: JSON.stringify(codeForm) });
      setCodeForm({ code: "", type: "percent", value: "", service: "any", note: "", expiresAt: "", maxUses: "" });
      flash("✓ Code created"); load();
    } catch (e) { flash(e.message || "Couldn't create the code."); }
  };

  const toggleCode = async (c) => {
    try { await fetchJson(`/api/discounts/admin/codes/${c._id}`, { method: "PUT", body: JSON.stringify({ active: !c.active }) }); load(); }
    catch { flash("Couldn't update the code."); }
  };

  const deleteCode = async (c) => {
    if (!window.confirm(`Delete code ${c.code}?`)) return;
    try { await fetchJson(`/api/discounts/admin/codes/${c._id}`, { method: "DELETE" }); load(); }
    catch { flash("Couldn't delete the code."); }
  };

  const setItem = (i, patch) =>
    setOfferForm((f) => ({ ...f, items: f.items.map((it, j) => (j === i ? { ...it, ...patch } : it)) }));

  const createOffer = async () => {
    try {
      const items = offerForm.items.filter((i) => Number(i.price) > 0);
      if (!items.length) return flash("Give each offer item a price.");
      await fetchJson("/api/discounts/admin/offers", { method: "POST", body: JSON.stringify({ ...offerForm, items }) });
      setOfferForm({ clientName: "", clientEmail: "", note: "", expiresAt: "", items: [{ service: "brand", planKey: "gold", price: "" }] });
      flash("✓ Offer created — copy the link below"); load();
    } catch (e) { flash(e.message || "Couldn't create the offer."); }
  };

  const deleteOffer = async (o) => {
    if (!window.confirm(`Delete the offer for ${o.clientName || o.token}?`)) return;
    try { await fetchJson(`/api/discounts/admin/offers/${o._id}`, { method: "DELETE" }); load(); }
    catch { flash("Couldn't delete the offer."); }
  };

  const copyLink = (o) => {
    const link = `${window.location.origin}/offer/${o.token}`;
    navigator.clipboard?.writeText(link);
    flash("✓ Link copied: " + link);
  };

  return (
    <div className="space-y-10 text-white">
      {msg && <div className="rounded-lg border border-lime-400/30 bg-lime-400/5 px-4 py-2.5 text-sm text-lime-300">{msg}</div>}

      {/* ── Discount codes ── */}
      <section>
        <h2 className="mb-1 text-lg font-semibold">Discount codes</h2>
        <p className="mb-4 text-sm text-white/50">Create the code first, send it to the client, and they type it at booking. The invoice shows list price → discount → total.</p>
        <div className="mb-4 grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-3 lg:grid-cols-7">
          <input className={input} placeholder="CODE" value={codeForm.code} onChange={(e) => setCodeForm({ ...codeForm, code: e.target.value.toUpperCase() })} />
          <select className={input} value={codeForm.type} onChange={(e) => setCodeForm({ ...codeForm, type: e.target.value })}>
            <option value="percent">% off</option>
            <option value="fixed">₦ off</option>
          </select>
          <input className={input} type="number" placeholder={codeForm.type === "percent" ? "e.g. 10" : "e.g. 50000"} value={codeForm.value} onChange={(e) => setCodeForm({ ...codeForm, value: e.target.value })} />
          <select className={input} value={codeForm.service} onChange={(e) => setCodeForm({ ...codeForm, service: e.target.value })}>
            {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <input className={input} type="date" value={codeForm.expiresAt} onChange={(e) => setCodeForm({ ...codeForm, expiresAt: e.target.value })} title="Expiry (optional)" />
          <input className={input} type="number" placeholder="Max uses" value={codeForm.maxUses} onChange={(e) => setCodeForm({ ...codeForm, maxUses: e.target.value })} />
          <button className={btn} onClick={createCode} disabled={!codeForm.code || !(Number(codeForm.value) > 0)}>Create</button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-white/40">
              <tr><th className="px-4 py-2.5">Code</th><th className="px-4 py-2.5">Cuts</th><th className="px-4 py-2.5">Service</th><th className="px-4 py-2.5">Used</th><th className="px-4 py-2.5">Expires</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5" /></tr>
            </thead>
            <tbody>
              {data.codes.length === 0 && <tr><td colSpan={7} className="px-4 py-6 text-center text-white/35">No codes yet.</td></tr>}
              {data.codes.map((c) => (
                <tr key={c._id} className="border-t border-white/5">
                  <td className="px-4 py-2.5 font-mono font-semibold text-lime-300">{c.code}</td>
                  <td className="px-4 py-2.5">{c.type === "percent" ? `${c.value}%` : N(c.value)}</td>
                  <td className="px-4 py-2.5 capitalize">{c.service}</td>
                  <td className="px-4 py-2.5">{c.uses}{c.maxUses ? ` / ${c.maxUses}` : ""}</td>
                  <td className="px-4 py-2.5">{c.expiresAt ? new Date(c.expiresAt).toLocaleDateString("en-GB") : "—"}</td>
                  <td className="px-4 py-2.5">
                    <button onClick={() => toggleCode(c)} className={`rounded-full px-2.5 py-0.5 text-xs ${c.active ? "bg-lime-400/15 text-lime-300" : "bg-white/10 text-white/40"}`}>
                      {c.active ? "Active" : "Off"}
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-right"><button className={btnDanger} onClick={() => deleteCode(c)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Custom offers ── */}
      <section>
        <h2 className="mb-1 text-lg font-semibold">Custom offers</h2>
        <p className="mb-4 text-sm text-white/50">
          For negotiated deals and bundles. An offer pins real packages and only overrides the price — share the private link and the client books through it at the agreed amount.
        </p>
        <div className="mb-4 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <input className={input} placeholder="Client name" value={offerForm.clientName} onChange={(e) => setOfferForm({ ...offerForm, clientName: e.target.value })} />
            <input className={input} placeholder="Client email (optional)" value={offerForm.clientEmail} onChange={(e) => setOfferForm({ ...offerForm, clientEmail: e.target.value })} />
            <input className={input} type="date" value={offerForm.expiresAt} onChange={(e) => setOfferForm({ ...offerForm, expiresAt: e.target.value })} title="Expiry (optional)" />
          </div>
          {offerForm.items.map((it, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-4">
              <select className={input} value={it.service} onChange={(e) => setItem(i, { service: e.target.value, planKey: PLAN_KEYS[e.target.value][0] })}>
                {OFFER_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <select className={input} value={it.planKey} onChange={(e) => setItem(i, { planKey: e.target.value })}>
                {(PLAN_KEYS[it.service] || []).map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
              <input className={input} type="number" placeholder="Agreed price (₦)" value={it.price} onChange={(e) => setItem(i, { price: e.target.value })} />
              {offerForm.items.length > 1 && (
                <button className={btnDanger} onClick={() => setOfferForm((f) => ({ ...f, items: f.items.filter((_, j) => j !== i) }))}>Remove</button>
              )}
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <button className="text-xs text-white/50 hover:text-lime-400" onClick={() => setOfferForm((f) => ({ ...f, items: [...f.items, { service: "website", planKey: "business", price: "" }] }))}>
              + Add another service (bundle)
            </button>
            <span className="text-xs text-white/35">
              Bundle total: {N(offerForm.items.reduce((s, i) => s + (Number(i.price) || 0), 0))}
            </span>
            <button className={btn} onClick={createOffer}>Create offer</button>
          </div>
        </div>
        <div className="space-y-2.5">
          {data.offers.length === 0 && <p className="rounded-xl border border-white/10 px-4 py-5 text-center text-sm text-white/35">No offers yet.</p>}
          {data.offers.map((o) => (
            <div key={o._id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm">
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{o.clientName || "Unnamed offer"} — {N(o.total)}</div>
                <div className="text-xs text-white/45">
                  {(o.items || []).map((i) => `${i.service}/${i.planKey} at ${N(i.price)}${(o.usedServices || []).includes(i.service) ? " (booked ✓)" : ""}`).join(" + ")}
                  {o.expiresAt ? ` · expires ${new Date(o.expiresAt).toLocaleDateString("en-GB")}` : ""}
                  {!o.active ? " · fully used" : ""}
                </div>
              </div>
              <button className={btn} onClick={() => copyLink(o)}>Copy link</button>
              <button className={btnDanger} onClick={() => deleteOffer(o)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
