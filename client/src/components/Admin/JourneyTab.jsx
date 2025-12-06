// src/components/admin/JourneyTab.jsx
import React, { useEffect, useState } from "react";
import { uploadImage, MAX_IMAGE_MB } from "../../utils/uploadImage";
import { useAuth } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";
const JOURNEY_API = API_BASE ? `${API_BASE}/api/journey/admin` : "";

const JourneyTab = () => {
  const { authFetch } = useAuth();
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
        const res = await authFetch(JOURNEY_API);
        if (!res.ok) throw new Error("Failed to fetch journey items");
        const data = await res.json();
        setExistingItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJourney();
  }, [authFetch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      const digitsOnly = value.replace(/[^\d]/g, "");
      setForm((prev) => ({ ...prev, year: digitsOnly }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageProgress(0); // start at 0 -> bar will still show

    uploadImage(file, setImageProgress, "/api/journey/admin/upload")
      .then((url) => {
        setForm((prev) => ({ ...prev, imageUrl: url }));
      })
      .catch((err) => {
        console.error(err);
        setStatus({
          type: "error",
          message: err.message || "Image upload failed. Please try again.",
        });
        setImageProgress(0);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Saving journey item..." });

    const yearNumber = form.year ? Number(form.year) : null;

    const payload = {
      year: yearNumber,
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

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Journey item saved successfully ✅",
      });

      const listRes = await authFetch(JOURNEY_API);
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

  const handleDelete = async (itemId) => {
    if (!JOURNEY_API) return;

    const id = itemId;
    const confirm = window.confirm("Delete this journey entry?");
    if (!confirm) return;

    try {
      const res = await authFetch(`${JOURNEY_API}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete journey item");

      setExistingItems((prev) =>
        prev.filter((item) => (item.id || item._id) !== id)
      );

      if (editingId === id) {
        setEditingId(null);
        setForm({ year: "", title: "", description: "", imageUrl: "" });
        setImageProgress(0);
      }

      setStatus({
        type: "success",
        message: "Journey item deleted ✅",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to delete journey item. Please try again.",
      });
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id || item._id || null);
    setForm({
      year: item.year != null ? String(item.year) : "",
      title: item.title || "",
      description: Array.isArray(item.description)
        ? item.description.join("\n")
        : item.description || "",
      imageUrl: item.imageUrl || "",
    });
    setImageProgress(0);
    setStatus({ type: "idle", message: "" });
  };

  const handleRemoveImage = async () => {
    if (!form.imageUrl) return;

    const confirmDelete = window.confirm(
      "Remove this image? It will also be deleted from Cloudinary."
    );
    if (!confirmDelete) return;

    if (JOURNEY_API) {
      try {
        await authFetch(`${JOURNEY_API}/delete-image`, {
          method: "POST", // or DELETE if you prefer
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: form.imageUrl }),
        });
      } catch (err) {
        console.error(err);
        setStatus({
          type: "error",
          message:
            "Could not delete image from server. Local reference was removed.",
        });
      }
    }

    setForm((prev) => ({ ...prev, imageUrl: "" }));
    setImageProgress(0);
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
              type="number"
              inputMode="numeric"
              pattern="\d*"
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
            <span className="ml-1 text-[10px] font-normal text-neutral-400">
              (max {MAX_IMAGE_MB}MB)
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
          />

          {imageProgress !== 0 && (
            <div className="mt-1 w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
              <div
                className="h-1.5 rounded-full bg-lime-400 transition-all"
                style={{ width: `${imageProgress}%` }}
              />
            </div>
          )}

          {form.imageUrl && (
            <div className="mt-2 relative inline-block">
              <img
                src={form.imageUrl}
                alt="Journey"
                className="h-32 w-full max-w-xs rounded-md object-cover border border-white/10"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="
        absolute -top-2 -right-2 rounded-full
        bg-black/80 p-1 text-red-400
        hover:bg-red-600 hover:text-white transition
      "
                title="Delete image"
              >
                <FaTrash className="h-3 w-3" />
              </button>
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
                    key={item.id || item._id || `${item.year}-${item.title}`}
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
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditing(item)}
                          className="text-[11px] px-3 py-1 rounded-md bg-white/10 border border-white/20 hover:bg-white/20"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id || item._id)}
                          className="p-1.5 rounded-md border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                          title="Delete"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
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
