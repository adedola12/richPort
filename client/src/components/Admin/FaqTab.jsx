// client/src/components/Admin/FaqTab.jsx
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-lime-400/60";

const emptyForm = { question: "", answer: "", order: 0, published: true };

const FaqTab = () => {
  const { authFetch } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null); // mongoId being edited, or null = create mode
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authFetch("/api/faqs/admin");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load");
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => { load(); }, [load]);

  const startEdit = (f) => {
    setEditingId(f.mongoId);
    setForm({ question: f.question, answer: f.answer, order: f.order ?? 0, published: f.published !== false });
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  const save = async (e) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) {
      return setError("Question and answer are both required.");
    }
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/faqs/admin/${editingId}` : "/api/faqs/admin";
      const res = await authFetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to save");
      cancelEdit();
      await load();
    } catch (err) {
      setError(err.message || "Failed to save FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (f) => {
    try {
      const res = await authFetch(`/api/faqs/admin/${f.mongoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !(f.published !== false) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update");
      setItems((prev) => prev.map((x) => (x.mongoId === f.mongoId ? data : x)));
    } catch (err) {
      setError(err.message || "Failed to update FAQ.");
    }
  };

  const remove = async (f) => {
    if (!window.confirm(`Delete "${f.question}"?`)) return;
    try {
      const res = await authFetch(`/api/faqs/admin/${f.mongoId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete");
      setItems((prev) => prev.filter((x) => x.mongoId !== f.mongoId));
    } catch (err) {
      setError(err.message || "Failed to delete FAQ.");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">FAQ</h2>
        <p className="mt-1 text-xs text-neutral-400">
          These power the FAQ section on the home page. While this list is empty the site shows the built-in defaults; the first FAQ you add here replaces them.
        </p>
      </div>

      {error && (
        <p className="mb-4 rounded-xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-xs text-orange-300">{error}</p>
      )}

      {/* create / edit form */}
      <form onSubmit={save} className="mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
          {editingId ? "Edit FAQ" : "New FAQ"}
        </p>
        <input className={inputCls} placeholder="Question" value={form.question} maxLength={200}
          onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} />
        <textarea className={`${inputCls} min-h-[90px] resize-y`} placeholder="Answer" value={form.answer} maxLength={2000}
          onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} />
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-xs text-neutral-300">
            Order
            <input type="number" className={`${inputCls} w-20`} value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))} />
          </label>
          <label className="flex items-center gap-2 text-xs text-neutral-300">
            <input type="checkbox" checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
            Published
          </label>
          <div className="ml-auto flex gap-2">
            {editingId && (
              <button type="button" onClick={cancelEdit}
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10">
                Cancel
              </button>
            )}
            <button type="submit" disabled={saving}
              className="rounded-lg bg-lime-400 px-4 py-2 text-xs font-semibold text-black hover:bg-lime-300 disabled:opacity-50">
              {saving ? "Saving…" : editingId ? "Save changes" : "Add FAQ"}
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-neutral-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-400">No FAQs in the database yet — the site is showing the built-in defaults.</p>
      ) : (
        <div className="space-y-3">
          {items.map((f) => (
            <div key={f.mongoId} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-start gap-3">
                <span className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                  #{f.order ?? 0}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{f.question}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/55">{f.answer}</p>
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  f.published !== false
                    ? "border-lime-400/40 bg-lime-400/10 text-lime-300"
                    : "border-orange-400/40 bg-orange-400/10 text-orange-300"
                }`}>
                  {f.published !== false ? "Published" : "Draft"}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => startEdit(f)}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">
                  Edit
                </button>
                <button type="button" onClick={() => togglePublished(f)}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10">
                  {f.published !== false ? "Unpublish" : "Publish"}
                </button>
                <button type="button" onClick={() => remove(f)}
                  className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqTab;
