// src/components/admin/GraphicProjectsTab.jsx
import React from "react";
import { createPortal } from "react-dom";
import { graphicProjectsApi } from "../../api/graphicProjectsApi";

/* -------------------- small UI bits -------------------- */
function Toggle({ checked, onChange, label = "Toggle" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-[18px] w-[34px] items-center rounded-full border",
        "transition-colors duration-200",
        checked
          ? "bg-lime-500/70 border-lime-400/50"
          : "bg-white/10 border-white/10",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/40",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-[14px] w-[14px] rounded-full",
          "transition-transform duration-200",
          checked
            ? "translate-x-[16px] bg-white"
            : "translate-x-[2px] bg-white/80",
        ].join(" ")}
      />
    </button>
  );
}

function TextField({ label, value, onChange, placeholder = "" }) {
  return (
    <div className="w-full">
      <label className="block text-[10px] font-semibold text-white/70 mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full h-10 rounded-lg px-3",
          "bg-white/5 border border-white/10 text-white/80",
          "text-[12px]",
          "outline-none focus:ring-2 focus:ring-lime-400/25",
        ].join(" ")}
      />
    </div>
  );
}

function ToolBtn({ children }) {
  return (
    <button
      type="button"
      className={[
        "h-6 w-6 rounded-md",
        "border border-white/10 bg-white/5 text-white/75",
        "grid place-items-center text-[11px] font-semibold",
        "hover:bg-white/10 transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/30",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SmallBtn({ children, onClick, disabled, title, variant = "ghost" }) {
  const base = [
    "h-9 px-4 rounded-md",
    "text-[11px] font-bold",
    "transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/30",
    disabled ? "opacity-60 cursor-not-allowed" : "",
  ];

  const styles =
    variant === "primary"
      ? "bg-lime-500/90 text-black hover:bg-lime-400"
      : variant === "danger"
        ? "bg-red-500/20 text-red-100 border border-red-500/30 hover:bg-red-500/25"
        : "border border-white/12 bg-white/5 text-white/80 hover:bg-white/10";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={[...base, styles].join(" ")}
    >
      {children}
    </button>
  );
}

function isImage(mime) {
  return typeof mime === "string" && mime.startsWith("image/");
}

function safeStr(v) {
  return v == null ? "" : String(v);
}

function getImgId(img) {
  return img?.publicId || img?.url || "";
}

function useBodyScrollLock(locked) {
  React.useEffect(() => {
    if (!locked) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}

/* -------------------- Modal: Gallery (search + multi-select + reorder) -------------------- */
function MoreImagesModal({
  open,
  images,
  onClose,
  onRemoveIds,
  onCloudDeleteIds,
  onReorder,
  cloudBusy,
  cloudProgress,
}) {
  useBodyScrollLock(open);

  const [q, setQ] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState(() => new Set());
  const dragFromRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return;
    // reset selection when modal opens
    setSelectedIds(new Set());
    setQ("");
  }, [open]);

  const query = q.trim().toLowerCase();

  const visible = React.useMemo(() => {
    if (!query) return images.map((img, idx) => ({ img, idx }));
    return images
      .map((img, idx) => ({ img, idx }))
      .filter(({ img }) => {
        const pid = safeStr(img?.publicId).toLowerCase();
        const url = safeStr(img?.url).toLowerCase();
        return pid.includes(query) || url.includes(query);
      });
  }, [images, query]);

  const visibleIds = React.useMemo(() => {
    return visible.map(({ img }) => getImgId(img)).filter(Boolean);
  }, [visible]);

  const selectedCount = selectedIds.size;

  const toggleSelect = (id) => {
    if (!id) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const selectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      visibleIds.forEach((id) => next.add(id));
      return next;
    });
  };

  const deselectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      visibleIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));

  const doRemoveSelected = () => {
    if (!selectedCount) return;
    const ok = window.confirm(
      `Remove ${selectedCount} selected image(s) from this project list?`,
    );
    if (!ok) return;
    onRemoveIds(Array.from(selectedIds));
    clearSelection();
  };

  const doCloudDeleteSelected = () => {
    if (!selectedCount) return;
    const ok = window.confirm(
      `Delete ${selectedCount} selected image(s) from Cloudinary too? This cannot be undone.`,
    );
    if (!ok) return;
    onCloudDeleteIds(Array.from(selectedIds));
    clearSelection();
  };

  const doRemoveOne = (id) => {
    if (!id) return;
    onRemoveIds([id]);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const doCloudDeleteOne = (id) => {
    if (!id) return;
    const ok = window.confirm(
      "Delete this image from Cloudinary too? This cannot be undone.",
    );
    if (!ok) return;
    onCloudDeleteIds([id]);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // ✅ Reorder: only when not searching (avoids confusing index mapping)
  const canReorder = !query && !cloudBusy;

  const onDragStart = (fromIdx) => {
    dragFromRef.current = fromIdx;
  };

  const onDrop = (toIdx) => {
    const fromIdx = dragFromRef.current;
    dragFromRef.current = null;
    if (fromIdx == null || toIdx == null) return;
    if (fromIdx === toIdx) return;
    if (!canReorder) return;

    onReorder(fromIdx, toIdx);
    // keep selection by ID (still valid), no need to clear
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
        <div
          className={[
            "w-full max-w-[1040px]",
            "rounded-2xl border border-white/12 bg-black/50 backdrop-blur-xl",
            "shadow-[0_30px_130px_rgba(0,0,0,0.75)]",
          ].join(" ")}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-[14px] font-bold text-white/90">
                  Other Images ({images.length})
                </div>
                <div className="mt-0.5 text-[11px] text-white/55">
                  ✅ Search by <b>publicId</b> • ✅ Select multiple • ✅ Drag to
                  reorder (clear search to reorder)
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <SmallBtn onClick={onClose} disabled={cloudBusy} title="Close">
                  Close
                </SmallBtn>
              </div>
            </div>

            {/* Search + Actions */}
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by publicId (or URL)…"
                  className={[
                    "w-full h-10 rounded-lg px-3",
                    "bg-white/5 border border-white/10 text-white/80",
                    "text-[12px]",
                    "outline-none focus:ring-2 focus:ring-lime-400/25",
                  ].join(" ")}
                  disabled={cloudBusy}
                />
                {query && (
                  <div className="mt-1 text-[10px] text-white/45">
                    Showing {visible.length} result(s). Clear search to enable
                    drag reordering.
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <SmallBtn
                  onClick={() =>
                    allVisibleSelected
                      ? deselectAllVisible()
                      : selectAllVisible()
                  }
                  disabled={cloudBusy || visibleIds.length === 0}
                  title="Select all results"
                >
                  {allVisibleSelected ? "Unselect visible" : "Select visible"}
                </SmallBtn>

                <SmallBtn
                  onClick={clearSelection}
                  disabled={cloudBusy || selectedCount === 0}
                  title="Clear selection"
                >
                  Clear selection
                </SmallBtn>

                <SmallBtn
                  variant="danger"
                  onClick={doRemoveSelected}
                  disabled={cloudBusy || selectedCount === 0}
                  title="Remove selected from project list"
                >
                  Remove selected ({selectedCount})
                </SmallBtn>

                <SmallBtn
                  onClick={doCloudDeleteSelected}
                  disabled={cloudBusy || selectedCount === 0}
                  title="Delete selected from Cloudinary and remove"
                >
                  Cloud delete selected
                </SmallBtn>
              </div>
            </div>

            {cloudBusy && (
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-[11px] text-white/70">
                  Deleting from cloud…{" "}
                  <span className="text-white/90 font-semibold">
                    {cloudProgress.done}/{cloudProgress.total}
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-white/45">
                  Please don’t close this window until it finishes.
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="max-h-[70dvh] overflow-auto pr-1">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
                {visible.map(({ img, idx }) => {
                  const id = getImgId(img);
                  const checked = id && selectedIds.has(id);

                  return (
                    <div
                      key={id || idx}
                      className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5"
                      draggable={canReorder}
                      onDragStart={() => onDragStart(idx)}
                      onDragOver={(e) => {
                        if (!canReorder) return;
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        if (!canReorder) return;
                        e.preventDefault();
                        onDrop(idx);
                      }}
                      title={
                        canReorder
                          ? "Drag to reorder"
                          : query
                            ? "Clear search to reorder"
                            : ""
                      }
                    >
                      <img
                        src={img.url}
                        alt={`Other ${idx + 1}`}
                        className="h-28 w-full object-cover"
                        draggable={false}
                      />

                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={() => toggleSelect(id)}
                        disabled={cloudBusy}
                        className={[
                          "absolute left-1 bottom-1",
                          "rounded-md bg-black/70 px-2 py-1",
                          "text-[10px] font-semibold text-white/90",
                          "border border-white/10",
                          "hover:bg-black/85 transition-colors",
                          cloudBusy ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                        title="Select"
                      >
                        {checked ? "✓ Selected" : "Select"}
                      </button>

                      {/* Drag hint */}
                      <div className="absolute right-1 bottom-1 rounded-md bg-black/60 px-2 py-1 text-[9px] text-white/75 border border-white/10">
                        {canReorder ? "Drag" : "View"}
                      </div>

                      {/* Remove (list only) */}
                      <button
                        type="button"
                        onClick={() => doRemoveOne(id)}
                        disabled={cloudBusy}
                        className={[
                          "absolute right-1 top-1 rounded-md bg-black/70 px-2 py-1",
                          "text-[10px] font-semibold text-white/90 hover:bg-black/85",
                          cloudBusy ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                        title="Remove from project list"
                      >
                        ✕
                      </button>

                      {/* Delete from Cloud */}
                      <button
                        type="button"
                        onClick={() => doCloudDeleteOne(id)}
                        disabled={cloudBusy}
                        className={[
                          "absolute left-1 top-1 rounded-md px-2 py-1",
                          "border border-white/10 bg-black/55 text-white/80",
                          "text-[10px] font-semibold",
                          "hover:bg-black/75 transition-colors",
                          cloudBusy ? "opacity-60 cursor-not-allowed" : "",
                        ].join(" ")}
                        title="Delete from Cloudinary + remove"
                      >
                        Cloud
                      </button>
                    </div>
                  );
                })}
              </div>

              {visible.length === 0 && (
                <div className="text-[12px] text-white/60">
                  No images match your search.
                </div>
              )}
            </div>

            <div className="mt-3 text-[11px] text-white/45">
              Tip: after removing/deleting/reordering, click <b>Save</b> to
              persist changes to the project.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* -------------------- Main -------------------- */
export default function GraphicProjectsTab() {
  // form fields
  const [projectName, setProjectName] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");

  const [headlineEnabled, setHeadlineEnabled] = React.useState(true);
  const [bodyEnabled, setBodyEnabled] = React.useState(true);
  const [otherImagesEnabled, setOtherImagesEnabled] = React.useState(true);

  const [headline, setHeadline] = React.useState("");
  const [bodyText, setBodyText] = React.useState("");

  const [headlineImage, setHeadlineImage] = React.useState(null);
  const [otherImages, setOtherImages] = React.useState([]);

  const [uploadingMain, setUploadingMain] = React.useState(false);
  const [uploadingOthers, setUploadingOthers] = React.useState(false);

  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [okMsg, setOkMsg] = React.useState("");

  // singleton + edit mode
  const [adminCount, setAdminCount] = React.useState(null);
  const [existingProject, setExistingProject] = React.useState(null);
  const [loadingExisting, setLoadingExisting] = React.useState(false);

  // MUST be true to update/override the existing singleton project
  const [overrideExisting, setOverrideExisting] = React.useState(false);

  // modal to show ALL other images
  const [moreOpen, setMoreOpen] = React.useState(false);

  // cloud delete status (supports single + batch)
  const [cloudBusy, setCloudBusy] = React.useState(false);
  const [cloudProgress, setCloudProgress] = React.useState({
    done: 0,
    total: 0,
  });

  const mainImageInputRef = React.useRef(null);
  const otherImagesInputRef = React.useRef(null);

  const triggerMainUpload = () => mainImageInputRef.current?.click();
  const triggerOtherUpload = () => otherImagesInputRef.current?.click();

  const removeOtherAt = (idx) => {
    setOtherImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeOthersByIds = (idsArr) => {
    const ids = new Set((idsArr || []).filter(Boolean));
    if (!ids.size) return;
    setOtherImages((prev) => prev.filter((img) => !ids.has(getImgId(img))));
  };

  const clearAllOther = () => setOtherImages([]);
  const removeHeadline = () => setHeadlineImage(null);

  const reorderOtherImages = (fromIdx, toIdx) => {
    setOtherImages((prev) => {
      if (
        fromIdx == null ||
        toIdx == null ||
        fromIdx === toIdx ||
        fromIdx < 0 ||
        toIdx < 0 ||
        fromIdx >= prev.length ||
        toIdx >= prev.length
      )
        return prev;

      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  };

  function loadIntoForm(p) {
    if (!p) return;

    setProjectName(safeStr(p.projectName));
    setSubtitle(safeStr(p.subtitle));

    setHeadlineEnabled(Boolean(p?.headline?.enabled ?? true));
    setBodyEnabled(Boolean(p?.body?.enabled ?? true));
    setOtherImagesEnabled(true);

    setHeadline(safeStr(p?.headline?.text));
    setBodyText(safeStr(p?.body?.text));

    setHeadlineImage(p?.headline?.image?.url ? p.headline.image : null);
    setOtherImages(Array.isArray(p?.otherImages) ? p.otherImages : []);

    setOkMsg(
      "Loaded saved project. Enable Override/Edit mode to save changes.",
    );
  }

  function resetEditor() {
    setProjectName("");
    setSubtitle("");

    setHeadlineEnabled(true);
    setBodyEnabled(true);
    setOtherImagesEnabled(true);

    setHeadline("");
    setBodyText("");

    setHeadlineImage(null);
    setOtherImages([]);

    setOkMsg("");
    setError("");
  }

  async function refreshAdminRead({ autoLoad = true } = {}) {
    setLoadingExisting(true);
    try {
      const all = await graphicProjectsApi.adminAll();
      const list = Array.isArray(all) ? all : [];
      setAdminCount(list.length);

      // singleton: use newest
      const first = list.length ? list[0] : null;
      setExistingProject(first);

      if (autoLoad && first) loadIntoForm(first);
      if (!first && autoLoad) resetEditor();
    } catch (e) {
      setAdminCount(null);
      setExistingProject(null);
    } finally {
      setLoadingExisting(false);
    }
  }

  React.useEffect(() => {
    refreshAdminRead({ autoLoad: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onPickHeadlineImage(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError("");
    setOkMsg("");

    if (!isImage(file.type)) {
      setError("Only image files are allowed.");
      return;
    }

    try {
      setUploadingMain(true);
      const uploaded = await graphicProjectsApi.uploadImage(file);
      setHeadlineImage(uploaded);
    } catch (err) {
      setError(err?.message || "Headline image upload failed");
    } finally {
      setUploadingMain(false);
    }
  }

  async function onPickOtherImages(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;

    setError("");
    setOkMsg("");

    const imageFiles = files.filter((f) => isImage(f.type));
    if (!imageFiles.length) {
      setError("Only image files are allowed.");
      return;
    }

    const remaining = 50 - otherImages.length;
    if (remaining <= 0) {
      setError("Maximum of 50 other images reached.");
      return;
    }

    const toUpload = imageFiles.slice(0, remaining);

    try {
      setUploadingOthers(true);

      const uploadedBatch = [];
      for (const f of toUpload) {
        const up = await graphicProjectsApi.uploadImage(f);
        uploadedBatch.push(up);
      }

      setOtherImages((prev) => [...prev, ...uploadedBatch]);

      if (imageFiles.length > remaining) {
        setError(
          `Only ${remaining} more images allowed (max 50). Extra files were ignored.`,
        );
      }
    } catch (err) {
      setError(err?.message || "Other images upload failed");
    } finally {
      setUploadingOthers(false);
    }
  }

  // ✅ Cloud delete (single or batch) by IDs
  async function deleteOthersFromCloudByIds(idsArr) {
    const ids = Array.from(new Set((idsArr || []).filter(Boolean)));
    if (!ids.length) return;

    // snapshot current list so IDs map correctly
    const snapshot = otherImages.slice();
    const toDelete = snapshot
      .map((img) => ({
        id: getImgId(img),
        url: img?.url,
        publicId: img?.publicId,
      }))
      .filter((x) => x.id && ids.includes(x.id));

    if (!toDelete.length) return;

    setError("");
    setOkMsg("");

    setCloudBusy(true);
    setCloudProgress({ done: 0, total: toDelete.length });

    const okDeletedIds = [];
    const failed = [];

    try {
      for (let i = 0; i < toDelete.length; i++) {
        const item = toDelete[i];

        // must have publicId for cloud delete
        if (!item.publicId) {
          failed.push({ id: item.id, reason: "Missing publicId" });
          setCloudProgress((p) => ({ ...p, done: i + 1 }));
          continue;
        }

        try {
          await graphicProjectsApi.deleteImage({
            url: item.url,
            publicId: item.publicId,
          });
          okDeletedIds.push(item.id);
        } catch (err) {
          failed.push({
            id: item.id,
            reason: err?.message || "Cloud delete failed",
          });
        } finally {
          setCloudProgress((p) => ({ ...p, done: i + 1 }));
        }
      }

      if (okDeletedIds.length) {
        removeOthersByIds(okDeletedIds);
      }

      if (failed.length) {
        setError(
          `Deleted ${okDeletedIds.length}/${toDelete.length}. Failed: ${failed.length}. (Some items may be missing publicId)`,
        );
      } else {
        setOkMsg(
          `Deleted ${okDeletedIds.length} image(s) from cloud and removed.`,
        );
      }
    } finally {
      setCloudBusy(false);
      setCloudProgress({ done: 0, total: 0 });
    }
  }

  async function onSave() {
    setError("");
    setOkMsg("");

    const pn = String(projectName || "").trim();
    const st = String(subtitle || "").trim();

    if (!pn) return setError("Project name is required.");

    if (headlineEnabled) {
      if (!String(headline || "").trim())
        return setError("Headline text is required.");
      if (!headlineImage?.url || !headlineImage?.publicId)
        return setError("Headline image is required.");
    }

    if (otherImagesEnabled) {
      if (otherImages.length < 16 || otherImages.length > 50) {
        return setError(
          `Other images must be between 16 and 50. Current: ${otherImages.length}`,
        );
      }
    }

    const hasExisting = Boolean(existingProject?._id);
    const creatingNew = !hasExisting;

    if (!creatingNew && !overrideExisting) {
      return setError(
        "A Graphic Design project already exists. Enable Override/Edit mode to update the existing project (singleton rule).",
      );
    }

    setSaving(true);
    try {
      const payload = {
        projectName: pn,
        subtitle: st,
        status: "published",
        override: !creatingNew ? true : false,

        headline: {
          enabled: headlineEnabled,
          text: headline,
          image: headlineEnabled ? headlineImage : null,
        },
        body: {
          enabled: bodyEnabled,
          text: bodyText,
        },
        otherImages: otherImagesEnabled ? otherImages : [],
      };

      await graphicProjectsApi.adminCreate(payload);

      setOkMsg(
        creatingNew
          ? "Graphic project created successfully!"
          : "Graphic project updated successfully!",
      );

      await refreshAdminRead({ autoLoad: true });
    } catch (err) {
      setError(err?.message || "Save failed");
      await refreshAdminRead({ autoLoad: false });
    } finally {
      setSaving(false);
    }
  }

  const canCreate = !existingProject?._id;
  const isEditContext = Boolean(existingProject?._id);

  return (
    <div className="relative">
      {/* ✅ Modal showing ALL other images (search + multi-select + reorder) */}
      <MoreImagesModal
        open={moreOpen}
        images={otherImages}
        onClose={() => setMoreOpen(false)}
        onRemoveIds={(ids) => removeOthersByIds(ids)}
        onCloudDeleteIds={(ids) => deleteOthersFromCloudByIds(ids)}
        onReorder={(fromIdx, toIdx) => reorderOtherImages(fromIdx, toIdx)}
        cloudBusy={cloudBusy}
        cloudProgress={cloudProgress}
      />

      {/* subtle glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10 opacity-60">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-lime-500/10 blur-[80px]" />
        <div className="absolute left-1/2 top-[260px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-400/6 blur-[90px]" />
      </div>

      <div className="mx-auto w-full max-w-[760px]">
        {/* proof admin read */}
        <div className="mb-4 text-[11px] text-white/60">
          Admin read check:{" "}
          <span className="text-white/80">
            {adminCount == null
              ? "not loaded"
              : `${adminCount} graphic projects`}
          </span>
          {loadingExisting && (
            <span className="ml-2 text-white/50">(refreshing…)</span>
          )}
        </div>

        {/* Title */}
        <div className="mt-2">
          <h1 className="text-[42px] leading-[1.05] font-bold text-white">
            Graphic Design
          </h1>
          <p className="mt-2 text-[12px] text-white/55">
            Singleton mode: only one Graphic Design project can exist. You can
            edit/override the saved one.
          </p>
        </div>

        {/* Existing project + Edit controls */}
        <div
          className={[
            "mt-6 rounded-2xl border border-white/10",
            "bg-black/35 backdrop-blur-xl",
            "shadow-[0_28px_90px_rgba(0,0,0,0.55)]",
            "p-5",
          ].join(" ")}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[12px] font-bold text-white/85">
                Saved Project (Singleton)
              </div>
              <div className="mt-1 text-[11px] text-white/55">
                {existingProject?._id ? (
                  <>
                    <span className="text-white/80">
                      {safeStr(existingProject.projectName) || "Untitled"}
                    </span>{" "}
                    <span className="text-white/35">•</span>{" "}
                    <span className="text-white/55">
                      {safeStr(existingProject.status || "published")}
                    </span>
                  </>
                ) : (
                  <span className="text-white/55">No project saved yet.</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {existingProject?._id && (
                <>
                  <button
                    type="button"
                    onClick={() => loadIntoForm(existingProject)}
                    className={[
                      "h-9 px-4 rounded-md",
                      "border border-white/12 bg-white/5 text-white/80",
                      "text-[11px] font-bold",
                      "hover:bg-white/10 transition-colors",
                    ].join(" ")}
                  >
                    Load for Editing
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetEditor();
                      setOkMsg(
                        "Editor cleared. Enable Override/Edit mode and save to replace the existing project.",
                      );
                    }}
                    className={[
                      "h-9 px-4 rounded-md",
                      "border border-white/12 bg-white/5 text-white/70",
                      "text-[11px] font-bold",
                      "hover:bg-white/10 transition-colors",
                    ].join(" ")}
                  >
                    Clear Editor
                  </button>

                  <div className="flex items-center gap-2 ml-1">
                    <span className="text-[10px] text-white/60">
                      Override/Edit
                    </span>
                    <Toggle
                      checked={overrideExisting}
                      onChange={setOverrideExisting}
                      label="Override existing project"
                    />
                  </div>
                </>
              )}

              {!existingProject?._id && (
                <button
                  type="button"
                  onClick={() => refreshAdminRead({ autoLoad: true })}
                  className={[
                    "h-9 px-4 rounded-md",
                    "border border-white/12 bg-white/5 text-white/80",
                    "text-[11px] font-bold",
                    "hover:bg-white/10 transition-colors",
                  ].join(" ")}
                >
                  Refresh
                </button>
              )}
            </div>
          </div>

          {isEditContext && !overrideExisting && (
            <div className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-[11px] text-amber-100/90">
              A project already exists. Turn on <b>Override/Edit</b> to save
              changes. Otherwise, creation is blocked (singleton rule).
            </div>
          )}

          {!isEditContext && (
            <div className="mt-3 rounded-xl border border-lime-500/20 bg-lime-500/10 px-4 py-3 text-[11px] text-lime-100/90">
              No project exists yet — you can create the first one.
            </div>
          )}
        </div>

        {/* Top card */}
        <div
          className={[
            "mt-6 rounded-2xl border border-white/10",
            "bg-black/35 backdrop-blur-xl",
            "shadow-[0_28px_90px_rgba(0,0,0,0.55)]",
            "p-5",
          ].join(" ")}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Project Name"
              value={projectName}
              onChange={setProjectName}
              placeholder="e.g. SavedUp"
            />
            <TextField
              label="Subtitle"
              value={subtitle}
              onChange={setSubtitle}
              placeholder="e.g. Social Media Design"
            />
          </div>
        </div>

        {/* Case Study Content */}
        <div
          className={[
            "mt-6 rounded-2xl border border-white/10",
            "bg-black/35 backdrop-blur-xl",
            "shadow-[0_28px_90px_rgba(0,0,0,0.55)]",
            "p-6",
          ].join(" ")}
        >
          <div>
            <h2 className="text-[18px] font-bold text-white">
              Case Study Content
            </h2>
            <p className="mt-1 text-[11px] text-white/45">
              Fill in the details of your case study
            </p>
          </div>

          <div className="mt-4 h-px w-full bg-white/10" />

          {/* Headline */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-white/75">
                Headline
              </label>
              <Toggle
                checked={headlineEnabled}
                onChange={setHeadlineEnabled}
                label="Headline toggle"
              />
            </div>

            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Headline"
              disabled={!headlineEnabled}
              className={[
                "mt-2 w-full h-10 rounded-lg px-3",
                "bg-white/5 border border-white/10 text-white/80",
                "text-[12px]",
                "outline-none focus:ring-2 focus:ring-lime-400/25",
                !headlineEnabled ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
            />
          </div>

          {/* Body */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-white/75">
                Body Text
              </label>
              <Toggle
                checked={bodyEnabled}
                onChange={setBodyEnabled}
                label="Body toggle"
              />
            </div>

            <div
              className={[
                "mt-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden",
                !bodyEnabled ? "opacity-50" : "",
              ].join(" ")}
            >
              <textarea
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Write here..."
                disabled={!bodyEnabled}
                className={[
                  "w-full h-[180px] resize-none p-3",
                  "bg-transparent text-white/80",
                  "text-[12px]",
                  "outline-none",
                  !bodyEnabled ? "cursor-not-allowed" : "",
                ].join(" ")}
              />

              <div className="flex items-center gap-2 px-2 py-2 border-t border-white/10 bg-black/20">
                <ToolBtn>B</ToolBtn>
                <ToolBtn>
                  <span className="italic">I</span>
                </ToolBtn>
                <ToolBtn>
                  <span className="underline">U</span>
                </ToolBtn>
                <ToolBtn>≡</ToolBtn>
                <ToolBtn>≣</ToolBtn>
              </div>
            </div>
          </div>

          {/* Headline image upload */}
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={triggerMainUpload}
              className={[
                "flex-1 h-10 rounded-lg",
                "border border-lime-400/45 bg-white/5",
                "text-[11px] font-semibold text-white/75",
                "hover:bg-white/10 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/30",
              ].join(" ")}
              disabled={uploadingMain}
            >
              {uploadingMain
                ? "Uploading..."
                : headlineImage
                  ? "Replace Image ✓"
                  : "Upload Image"}
            </button>

            <input
              ref={mainImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickHeadlineImage}
            />
          </div>

          {headlineImage?.url && (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-3">
                <img
                  src={headlineImage.url}
                  alt="Headline"
                  className="h-10 w-10 rounded-lg object-cover border border-white/10"
                />
                <div>
                  <p className="text-[11px] font-semibold text-white/75">
                    Headline Image Uploaded
                  </p>
                  <p className="text-[10px] text-white/45">
                    {headlineImage.width || "?"}×{headlineImage.height || "?"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeHeadline}
                className="text-[10px] font-semibold text-white/65 hover:text-white"
              >
                Remove
              </button>
            </div>
          )}

          {/* Other Images */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-bold text-white">
                  Other Images
                </h3>
                <p className="mt-1 text-[11px] text-white/45">
                  Use the full gallery to <b>search</b>, <b>select multiple</b>,
                  <b> delete</b>, and <b>drag-reorder</b> images.
                </p>
              </div>
              <Toggle
                checked={otherImagesEnabled}
                onChange={setOtherImagesEnabled}
                label="Other images toggle"
              />
            </div>

            <button
              type="button"
              onClick={triggerOtherUpload}
              disabled={!otherImagesEnabled || uploadingOthers}
              className={[
                "mt-4 w-full h-[110px] rounded-xl",
                "border border-dashed border-white/15 bg-white/5",
                "grid place-items-center",
                "hover:bg-white/10 transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/25",
                !otherImagesEnabled ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[11px] font-semibold text-white/70">
                  {uploadingOthers ? "Uploading..." : "Upload Images"}
                </span>
                <span className="text-[10px] text-white/40">
                  Uploaded: {otherImages.length} (min 16, max 50)
                </span>
              </div>
            </button>

            <input
              ref={otherImagesInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onPickOtherImages}
            />

            {otherImages.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-white/45">
                    Remove/reorder in the full gallery and save to apply
                    changes.
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMoreOpen(true)}
                      className="text-[10px] font-semibold text-white/70 hover:text-white"
                    >
                      Open full gallery →
                    </button>

                    <button
                      type="button"
                      onClick={clearAllOther}
                      className="text-[10px] font-semibold text-white/60 hover:text-white"
                    >
                      Clear all
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {otherImages.slice(0, 18).map((img, idx) => (
                    <div
                      key={img.publicId || img.url || idx}
                      className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5"
                    >
                      <img
                        src={img.url}
                        alt={`Other ${idx + 1}`}
                        className="h-16 w-full object-cover"
                        draggable="false"
                      />
                      <button
                        type="button"
                        onClick={() => removeOtherAt(idx)}
                        className="absolute right-1 top-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold text-white/85 hover:bg-black/80"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {otherImages.length > 18 && (
                    <button
                      type="button"
                      onClick={() => setMoreOpen(true)}
                      className={[
                        "h-16 rounded-lg border border-white/10 bg-white/5",
                        "grid place-items-center",
                        "hover:bg-white/10 transition-colors",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/25",
                      ].join(" ")}
                      aria-label="Show all other images"
                      title="Show all other images"
                    >
                      <span className="text-[10px] text-white/70">
                        +{otherImages.length - 18} more
                      </span>
                      <span className="text-[9px] text-white/45">
                        Click
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {(error || okMsg) && (
          <div className="mt-4">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[12px] text-red-200">
                {error}
              </div>
            )}
            {okMsg && (
              <div className="rounded-xl border border-lime-500/30 bg-lime-500/10 px-4 py-3 text-[12px] text-lime-200">
                {okMsg}
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={onSave}
            disabled={saving || (!canCreate && !overrideExisting)}
            className={[
              "h-9 px-5 rounded-md",
              "bg-lime-500/90 text-black",
              "text-[11px] font-bold",
              "shadow-[0_10px_30px_rgba(132,204,22,0.18)]",
              "hover:bg-lime-400 transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/35",
              saving ? "opacity-70 cursor-not-allowed" : "",
              !canCreate && !overrideExisting
                ? "opacity-60 cursor-not-allowed"
                : "",
            ].join(" ")}
            title={
              !canCreate && !overrideExisting
                ? "Enable Override/Edit to update the existing project."
                : ""
            }
          >
            {saving
              ? "Saving..."
              : canCreate
                ? "Create Project"
                : "Save Changes (Override)"}
          </button>
        </div>
      </div>
    </div>
  );
}
