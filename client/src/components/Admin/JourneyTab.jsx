// src/components/admin/JourneyTab.jsx
import React, { useState } from "react";

const JOURNEY_API = import.meta.env.VITE_ADMIN_JOURNEY_ENDPOINT || "";

const JourneyTab = () => {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [form, setForm] = useState({
    year: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Saving journey item..." });

    const payload = {
      year: form.year.trim(),
      title: form.title.trim(),
      description: form.description
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
      imageUrl: form.imageUrl.trim() || null,
    };

    try {
      if (!JOURNEY_API) {
        console.log("Admin journey payload:", payload);
        await new Promise((res) => setTimeout(res, 700));
        setStatus({
          type: "success",
          message:
            "Journey item saved locally. Once JOURNEY_API is set, it will sync to backend.",
        });
        return;
      }

      const res = await fetch(JOURNEY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Journey item saved successfully ✅",
      });
      setForm({ year: "", title: "", description: "", imageUrl: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to save journey item. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold font-['Mont']">
        Journey Timeline Entries
      </h2>
      <p className="text-sm text-neutral-300 font-['Lexend'] max-w-2xl">
        These entries feed the Journey component on the About page. Description
        text is stored as multiple paragraphs.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Year
            </label>
            <input
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="2024"
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Design systems & documentation"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Description (one paragraph per line)
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Image URL (optional)
          </label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
            placeholder="https://cdn.../journey.png"
          />
        </div>

        <button
          type="submit"
          disabled={status.type === "loading"}
          className="
            mt-2 inline-flex items-center justify-center rounded-md
            bg-gradient-to-b from-lime-400 to-lime-600
            px-6 py-2.5 text-sm font-semibold text-black font-['Mont']
            shadow-[0_18px_60px_rgba(132,204,22,0.7)]
            hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {status.type === "loading" ? "Saving..." : "Save Journey Item"}
        </button>

        {status.type !== "idle" && (
          <p
            className={`text-xs mt-2 font-['Mont'] ${
              status.type === "error"
                ? "text-red-400"
                : status.type === "success"
                ? "text-lime-400"
                : "text-neutral-300"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};
export default JourneyTab;
