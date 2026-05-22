import React from "react";
import { FaTrash } from "react-icons/fa";

const newBlock = () => ({
  id: crypto?.randomUUID?.() || String(Date.now()),
  enabled: true,
  headline: "",
  body: "",
  images: [],
  layout: "wide", // wide | half | grid
  textSide: "left",
  wideVariant: "full",
});

const BlockCard = ({
  block,
  onUpdate,
  onRemove,
  onAddImage,
  onRemoveImage,
  renderProgressBar,
  MAX_IMAGE_MB,
}) => {
  const imgCount = (block.images || []).length;

  const allowWideHalf = imgCount <= 1;
  const effectiveLayout = imgCount > 1 ? "grid" : block.layout || "wide";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] text-neutral-300 uppercase tracking-[0.18em]">
            Content Block
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-white/60">Show</span>
          {block.toggleUI}
          <button
            type="button"
            onClick={onRemove}
            className="p-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
            title="Remove block"
          >
            <FaTrash className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        {/* Headline */}
        <div className="flex items-center justify-between gap-3">
          <label className="text-xs font-semibold">
            Headline
          </label>
        </div>
        <input
          value={block.headline}
          onChange={(e) => onUpdate({ headline: e.target.value })}
          className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
          placeholder="e.g. Research & Insights"
        />

        {/* Body */}
        <div className="flex items-center justify-between gap-3">
          <label className="text-xs font-semibold">
            Body Text
          </label>
        </div>
        <textarea
          value={block.body}
          onChange={(e) => onUpdate({ body: e.target.value })}
          rows={6}
          className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
          placeholder={`Write here...\nUse "-" for bullets if you want a list.`}
        />

        {/* Layout */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <p className="text-[11px] text-white/70 mb-2">
              Layout
            </p>

            {imgCount > 1 ? (
              <p className="text-xs text-white/60">
                Multiple images detected → layout forced to <b>Grid</b>.
              </p>
            ) : (
              <div className="flex gap-2">
                {["wide", "half"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onUpdate({ layout: v })}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition ${
                      (block.layout || "wide") === v
                        ? "bg-white text-black border-white"
                        : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10"
                    }`}
                    disabled={!allowWideHalf}
                  >
                    {v === "wide" ? "Wide" : "Half"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Half options */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <p className="text-[11px] text-white/70 mb-2">
              Image options
            </p>

            {effectiveLayout === "half" ? (
              <div className="flex flex-wrap gap-2">
                {["left", "right"].map((side) => (
                  <button
                    key={side}
                    type="button"
                    onClick={() => onUpdate({ textSide: side })}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition ${
                      (block.textSide || "left") === side
                        ? "bg-lime-500/20 border-lime-400/40 text-lime-200"
                        : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10"
                    }`}
                  >
                    Text {side}
                  </button>
                ))}
              </div>
            ) : effectiveLayout === "wide" ? (
              <div className="flex flex-wrap gap-2">
                {["full", "narrow"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => onUpdate({ wideVariant: v })}
                    className={`px-3 py-1.5 rounded-lg text-xs border transition ${
                      (block.wideVariant || "full") === v
                        ? "bg-lime-500/20 border-lime-400/40 text-lime-200"
                        : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10"
                    }`}
                  >
                    {v === "full" ? "Wide view" : "Half-width"}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/60">
                Grid auto.
              </p>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">
              Images{" "}
              <span className="text-[10px] font-normal text-white/50">
                (max {MAX_IMAGE_MB}MB)
              </span>
            </p>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => onAddImage(e.target.files)}
              className="block w-full text-xs text-neutral-200 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20"
            />

            {renderProgressBar?.()}

            {imgCount > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {block.images.map((url, i) => (
                  <div key={`${url}-${i}`} className="relative">
                    <img
                      src={url}
                      alt=""
                      className="h-28 w-full rounded-xl object-cover border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveImage(i)}
                      className="absolute -top-2 -right-2 rounded-full bg-black/80 p-1 text-red-400 hover:bg-red-600 hover:text-white transition"
                      title="Delete image"
                    >
                      <FaTrash className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WriteUpBlocksEditor({
  blocks,
  setBlocks,
  Toggle,
  handleUploadFiles,
  handleDeleteUrl,
  renderProgressBarForKey,
  MAX_IMAGE_MB,
}) {
  const addBlock = () => setBlocks((p) => [...p, newBlock()]);
  const removeBlock = (id) => setBlocks((p) => p.filter((b) => b.id !== id));
  const updateBlock = (id, patch) =>
    setBlocks((p) => p.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const addImages = async (id, fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    // upload sequentially (stable progress)
    for (const f of files) {
      const url = await handleUploadFiles(f, `block-${id}-${Date.now()}`);
      if (url) {
        updateBlock(id, {
          images: [...(blocks.find((b) => b.id === id)?.images || []), url],
          // force grid if >1
        });
      }
    }
  };

  const removeImageAt = async (id, idx) => {
    const b = blocks.find((x) => x.id === id);
    const url = b?.images?.[idx];
    if (!url) return;
    await handleDeleteUrl(url);
    const next = (b.images || []).filter((_, i) => i !== idx);
    updateBlock(id, {
      images: next,
      layout: next.length > 1 ? "grid" : b.layout || "wide",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">
            Case Study Content
          </h3>
          <p className="text-xs text-white/50">
            Add as many blocks as you want. Each block supports text + images +
            layout.
          </p>
        </div>
        <button
          type="button"
          onClick={addBlock}
          className="text-xs px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/15"
        >
          + Add Content Block
        </button>
      </div>

      <div className="space-y-4">
        {blocks.map((b) => (
          <BlockCard
            key={b.id}
            block={{
              ...b,
              toggleUI: (
                <Toggle
                  checked={b.enabled !== false}
                  onChange={(v) => updateBlock(b.id, { enabled: v })}
                />
              ),
            }}
            onUpdate={(patch) => updateBlock(b.id, patch)}
            onRemove={() => removeBlock(b.id)}
            onAddImage={(files) => addImages(b.id, files)}
            onRemoveImage={(i) => removeImageAt(b.id, i)}
            renderProgressBar={() => renderProgressBarForKey?.(`block-${b.id}`)}
            MAX_IMAGE_MB={MAX_IMAGE_MB}
          />
        ))}
      </div>
    </div>
  );
}
