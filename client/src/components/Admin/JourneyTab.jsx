// src/components/admin/JourneyTab.jsx
import React, { useEffect, useState } from "react";
import { uploadImage } from "../../utils/uploadImage";

const JOURNEY_API = import.meta.env.VITE_ADMIN_JOURNEY_ENDPOINT || "";

const JourneyTab = () => {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [existingItems, setExistingItems] = useState([]);

  const [form, setForm] = useState({
    year: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  const [imageProgress, setImageProgress] = useState(0);

  // Load existing journey items
  useEffect(() => {
    const fetchJourney = async () => {
      if (!JOURNEY_API) {
        setExistingItems([]);
        return;
      }

      try {
        const res = await fetch(JOURNEY_API);
        if (!res.ok) throw new Error("Failed to fetch journey items");
        const data = await res.json();
        setExistingItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJourney();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageProgress(0);
    uploadImage(file, setImageProgress)
      .then((url) => {
        setForm((prev) => ({ ...prev, imageUrl: url }));
      })
      .catch((err) => {
        console.error(err);
        setStatus({
          type: "error",
          message: "Image upload failed. Please try again.",
        });
      });
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
            "Journey item saved locally (no JOURNEY_API set). Check console payload.",
        });
        return;
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${JOURNEY_API}/${editingId}` : JOURNEY_API;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Journey item saved successfully ✅",
      });

      // reload list
      const listRes = await fetch(JOURNEY_API);
      const listData = await listRes.json();
      setExistingItems(Array.isArray(listData) ? listData : []);

      if (!editingId) {
        setForm({ year: "", title: "", description: "", imageUrl: "" });
        setImageProgress(0);
      }
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to save journey item. Please try again.",
      });
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id || item.id || null);
    setForm({
      year: item.year || "",
      title: item.title || "",
      description: Array.isArray(item.description)
        ? item.description.join("\n")
        : item.description || "",
      imageUrl: item.imageUrl || "",
    });
    setImageProgress(0);
    setStatus({ type: "idle", message: "" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold font-['Mont']">
          Journey Timeline Entries
        </h2>
        <p className="text-sm text-neutral-300 font-['Lexend'] max-w-2xl">
          These entries feed the Journey component on the About page. Each entry
          can have a single image — upload it here and preview it instantly.
        </p>
      </div>

      {/* FORM */}
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

        {/* Image upload */}
        <div>
          <label className="block text-xs mb-1 font-semibold font-['Mont']">
            Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
          />

          {imageProgress > 0 && imageProgress < 100 && (
            <div className="mt-1 w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-lime-400 transition-all"
                style={{ width: `${imageProgress}%` }}
              />
            </div>
          )}

          {form.imageUrl && (
            <div className="mt-2">
              <img
                src={form.imageUrl}
                alt="Journey"
                className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
              />
            </div>
          )}
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
          {status.type === "loading"
            ? "Saving..."
            : editingId
            ? "Update Journey Item"
            : "Save Journey Item"}
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

      {/* EXISTING JOURNEY ITEMS */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-semibold font-['Mont'] mb-3">
          Existing Journey Entries
        </h3>
        {existingItems.length === 0 ? (
          <p className="text-xs text-neutral-400 font-['Lexend']">
            No journey entries found yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
            <table className="min-w-full text-left text-xs font-['Lexend']">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Year
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Title
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Image
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {existingItems.map((item) => (
                  <tr
                    key={item._id || item.id || `${item.year}-${item.title}`}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-3 py-2">{item.year}</td>
                    <td className="px-3 py-2">{item.title}</td>
                    <td className="px-3 py-2">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-10 w-16 object-cover rounded border border-white/10"
                        />
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => startEditing(item)}
                        className="text-[11px] px-3 py-1 rounded-md bg-white/10 border border-white/20 hover:bg-white/20"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyTab;
