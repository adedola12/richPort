import React from "react";
import { FaTrash } from "react-icons/fa";

const newPersona = () => ({
  id: crypto?.randomUUID?.() || String(Date.now()),
  enabled: true,
  name: "",
  subtitle: "",
  about: "",
  img: "",
});

export default function PersonasEditor({
  personas,
  setPersonas,
  Toggle,
  handleUploadFiles,
  handleDeleteUrl,
  MAX_IMAGE_MB,
}) {
  const addPersona = () => setPersonas((p) => [...p, newPersona()]);
  const removePersona = (id) =>
    setPersonas((p) => p.filter((x) => x.id !== id));
  const updatePersona = (id, patch) =>
    setPersonas((p) => p.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const uploadPersonaImg = async (id, file) => {
    const url = await handleUploadFiles(file, `persona-${id}-${Date.now()}`);
    if (url) updatePersona(id, { img: url });
  };

  const removePersonaImg = async (id) => {
    const p = personas.find((x) => x.id === id);
    if (!p?.img) return;
    await handleDeleteUrl(p.img);
    updatePersona(id, { img: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">User Personas</h3>
          <p className="text-xs text-white/50">
            These map directly to <b>writeUp.idealUsers.cards</b>.
          </p>
        </div>

        <button
          type="button"
          onClick={addPersona}
          className="text-xs px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/15"
        >
          Add Persona +
        </button>
      </div>

      <div className="space-y-4">
        {personas.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] text-neutral-300 uppercase tracking-[0.18em]">
                  Persona
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/60">
                  Show
                </span>
                <Toggle
                  checked={p.enabled !== false}
                  onChange={(v) => updatePersona(p.id, { enabled: v })}
                />
                <button
                  type="button"
                  onClick={() => removePersona(p.id)}
                  className="p-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                  title="Remove persona"
                >
                  <FaTrash className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs mb-1 font-semibold">
                  Name
                </label>
                <input
                  value={p.name}
                  onChange={(e) =>
                    updatePersona(p.id, { name: e.target.value })
                  }
                  className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                />
              </div>

              <div>
                <label className="block text-xs mb-1 font-semibold">
                  Subtitle
                </label>
                <input
                  value={p.subtitle}
                  onChange={(e) =>
                    updatePersona(p.id, { subtitle: e.target.value })
                  }
                  className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs mb-1 font-semibold">
                  About
                </label>
                <textarea
                  value={p.about}
                  onChange={(e) =>
                    updatePersona(p.id, { about: e.target.value })
                  }
                  rows={4}
                  className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
                  placeholder="Write here..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs mb-1 font-semibold">
                  Persona Image{" "}
                  <span className="text-[10px] font-normal text-white/50">
                    (max {MAX_IMAGE_MB}MB)
                  </span>
                </label>

                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      uploadPersonaImg(p.id, e.target.files?.[0] || null)
                    }
                    className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
                  />

                  {p.img && (
                    <div className="relative inline-block">
                      <img
                        src={p.img}
                        alt=""
                        className="h-24 w-40 rounded-xl object-cover border border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => removePersonaImg(p.id)}
                        className="absolute -top-2 -right-2 rounded-full bg-black/80 p-1 text-red-400 hover:bg-red-600 hover:text-white transition"
                        title="Delete image"
                      >
                        <FaTrash className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {personas.length === 0 && (
          <p className="text-xs text-white/50">
            No personas yet — add one.
          </p>
        )}
      </div>
    </div>
  );
}
