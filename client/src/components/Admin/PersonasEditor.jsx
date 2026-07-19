import React from "react";
import { Delete02Icon } from "hugeicons-react";
import { Button, Input, Textarea, Label } from "../ui";

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

        <Button variant="secondary" size="sm" onClick={addPersona}>
          Add Persona +
        </Button>
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
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removePersona(p.id)}
                  title="Remove persona"
                >
                  <Delete02Icon size={16} />
                </Button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input
                  value={p.name}
                  onChange={(e) =>
                    updatePersona(p.id, { name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Subtitle</Label>
                <Input
                  value={p.subtitle}
                  onChange={(e) =>
                    updatePersona(p.id, { subtitle: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <Label>About</Label>
                <Textarea
                  value={p.about}
                  onChange={(e) =>
                    updatePersona(p.id, { about: e.target.value })
                  }
                  rows={4}
                  placeholder="Write here..."
                />
              </div>

              <div className="md:col-span-2">
                <Label>
                  Persona Image{" "}
                  <span className="text-[10px] font-normal text-white/50">
                    (max {MAX_IMAGE_MB}MB)
                  </span>
                </Label>

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
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removePersonaImg(p.id)}
                        className="absolute -top-2 -right-2 rounded-full p-1"
                        title="Delete image"
                      >
                        <Delete02Icon size={16} />
                      </Button>
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
