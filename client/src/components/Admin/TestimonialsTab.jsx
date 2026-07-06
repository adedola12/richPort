// client/src/components/Admin/TestimonialsTab.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { serviceColor } from "../../data/testimonialOptions";

const Star = ({ filled }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#84cc16" : "rgba(255,255,255,0.15)"}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </svg>
);

const statusOf = (t) => {
  if (t.hidden) return { label: "Hidden", cls: "border-orange-400/40 bg-orange-400/10 text-orange-300" };
  if (t.rating >= 4) return { label: "Live", cls: "border-lime-400/40 bg-lime-400/10 text-lime-300" };
  return { label: "Below 4★", cls: "border-white/20 bg-white/5 text-white/50" };
};

const TestimonialsTab = () => {
  const { authFetch } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch("/api/testimonials/admin");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => { load(); }, [load]);

  const toggleHidden = async (t) => {
    try {
      const res = await authFetch(`/api/testimonials/admin/${t.mongoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidden: !t.hidden }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update");
      setItems((prev) => prev.map((x) => (x.mongoId === t.mongoId ? data : x)));
    } catch (err) {
      setError(err.message || "Failed to update testimonial.");
    }
  };

  const remove = async (t) => {
    if (!window.confirm(`Delete the testimonial from "${t.name || t.initials}"? This cannot be undone.`)) return;
    try {
      const res = await authFetch(`/api/testimonials/admin/${t.mongoId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete");
      setItems((prev) => prev.filter((x) => x.mongoId !== t.mongoId));
    } catch (err) {
      setError(err.message || "Failed to delete testimonial.");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Testimonials</h2>
          <p className="mt-1 text-xs text-neutral-400">
            4★ and above go live automatically; use Hide to pull one off the site. Lower ratings stay private feedback.
          </p>
        </div>
        <button type="button" onClick={load}
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">
          Refresh
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-xs text-orange-300">{error}</p>
      )}

      {loading ? (
        <p className="text-sm text-neutral-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-400">No testimonials yet. Share <span className="text-lime-300">/testimonial</span> with a client to collect the first one.</p>
      ) : (
        <div className="space-y-3">
          {items.map((t) => {
            const st = statusOf(t);
            return (
              <div key={t.mongoId} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-bold"
                    style={{ borderColor: `${serviceColor(t.service)}40`, color: serviceColor(t.service), background: `${serviceColor(t.service)}12` }}>
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{t.name || t.initials}</p>
                    <p className="text-[11px] text-neutral-400">
                      {new Date(t.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={{ borderColor: `${serviceColor(t.service)}40`, color: serviceColor(t.service) }}>
                    {t.service}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < t.rating} />)}
                  </div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${st.cls}`}>
                    {st.label}
                  </span>
                  <div className="ml-auto flex gap-2">
                    <button type="button" onClick={() => toggleHidden(t)}
                      className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">
                      {t.hidden ? "Show" : "Hide"}
                    </button>
                    <button type="button" onClick={() => remove(t)}
                      className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20">
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-white/60 italic">&ldquo;{t.feedback}&rdquo;</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestimonialsTab;
