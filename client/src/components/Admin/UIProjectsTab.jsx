// src/components/admin/UIProjectsTab.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { uploadImage, MAX_IMAGE_MB } from "../../utils/uploadImage";

const API = import.meta.env.VITE_AUTH_ENDPOINT || "";

const slugify = (str) =>
  (str || "")
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const bytesFromMB = (mb) => mb * 1024 * 1024;

const safeArr = (v) => (Array.isArray(v) ? v : []);
const safeStr = (v) => (v == null ? "" : String(v));

const splitLines = (txt) =>
  safeStr(txt)
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

const joinLines = (arr) =>
  Array.isArray(arr) ? arr.filter(Boolean).join("\n") : "";

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const inputBase =
  "w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-lime-400/30 focus:border-lime-400/30 transition";
const selectBase =
  "w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-lime-400/30 focus:border-lime-400/30 transition";
const textareaBase =
  "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-lime-400/30 focus:border-lime-400/30 transition resize-none";

const timelineOptions = [
  "1 week",
  "2 weeks",
  "3 weeks",
  "4 weeks",
  "5 weeks",
  "6 weeks",
  "7 weeks",
  "8 weeks",
  "10 weeks",
  "12 weeks",
];

const getWorkExpBulletsCount = (p) => {
  const arr = p?.workExperience;
  if (Array.isArray(arr)) return arr.filter(Boolean).length;
  if (typeof arr === "string") return splitLines(arr).length;
  return 0;
};

/**
 * ✅ Tailwind preflight removes list bullets by default.
 * Strong override (with !important) to guarantee bullets/numbering show.
 */
const RTE_CSS = `
  .adlm-rte { white-space: pre-wrap; }
  .adlm-rte ul { 
    list-style-type: disc !important; 
    list-style-position: outside !important;
    padding-left: 1.35rem !important; 
    margin: .35rem 0 !important; 
  }
  .adlm-rte ol { 
    list-style-type: decimal !important; 
    list-style-position: outside !important;
    padding-left: 1.35rem !important; 
    margin: .35rem 0 !important; 
  }
  .adlm-rte li { 
    display: list-item !important; 
    margin: .15rem 0 !important; 
  }
  .adlm-rte a { text-decoration: underline; }
  .adlm-rte blockquote {
    border-left: 3px solid rgba(255,255,255,.18);
    padding-left: .8rem;
    margin: .35rem 0;
    color: rgba(255,255,255,.75);
  }
  .adlm-rte p, .adlm-rte div { margin: 0; }
`;

/**
 * ✅ Disable Grammarly / in-browser writing tools on inputs & contentEditable.
 * This prevents Grammarly from injecting DOM that triggers "textLengthCalc" assertions.
 */
const GRAMMARLY_OFF_PROPS = {
  "data-gramm": "false",
  "data-enable-grammarly": "false",
  "data-gramm_editor": "false",
  spellCheck: false,
  autoCorrect: "off",
  autoCapitalize: "off",
  translate: "no",
};

/**
 * If Grammarly still injects markup, strip it before saving to state.
 * This keeps your saved HTML clean and prevents mutation/length mismatch noise.
 */
function stripGrammarlyArtifacts(html) {
  const s = String(html || "");
  if (!s) return "";
  if (!/gramm/i.test(s)) return s;

  try {
    const doc = new DOMParser().parseFromString(`<div>${s}</div>`, "text/html");
    const root = doc.body.firstElementChild;
    if (!root) return s;

    // Remove Grammarly elements/wrappers but keep their children (so text stays).
    const nodes = root.querySelectorAll(
      [
        "grammarly-extension",
        "grammarly-editor-plugin",
        "[data-gramm]",
        "[data-gramm_editor]",
        "[data-enable-grammarly]",
        ".grammarly-inline",
        ".grammarly-textarea",
      ].join(","),
    );

    nodes.forEach((n) => {
      const parent = n.parentNode;
      if (!parent) return;
      while (n.firstChild) parent.insertBefore(n.firstChild, n);
      parent.removeChild(n);
    });

    // Remove grammarly data attributes left behind
    root.querySelectorAll("*").forEach((el) => {
      [...el.attributes].forEach((a) => {
        if (/^data-gramm/i.test(a.name) || /gramm/i.test(a.name)) {
          el.removeAttribute(a.name);
        }
      });
    });

    return root.innerHTML;
  } catch {
    return s;
  }
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <label
      className={[
        "relative inline-flex items-center select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={!!checked}
        disabled={!!disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="w-12 h-6 bg-white/10 border border-white/15 rounded-full peer peer-checked:bg-lime-500/30 peer-checked:border-lime-400/40 transition" />
      <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white/60 peer-checked:bg-lime-200 peer-checked:translate-x-6 transition" />
    </label>
  );
}

function SectionCard({ title, subtitle, right, children, disabled }) {
  return (
    <section
      className={[
        "rounded-2xl border border-white/10",
        "bg-gradient-to-b from-white/[0.05] to-white/[0.02]",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        "p-5 md:p-7 space-y-5",
        disabled ? "opacity-60" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[20px] md:text-[26px] font-semibold text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-xs md:text-sm text-white/55">
              {subtitle}
            </p>
          ) : null}
        </div>

        {right ? <div className="pt-1">{right}</div> : null}
      </div>

      <div className={disabled ? "pointer-events-none" : ""}>{children}</div>
    </section>
  );
}

function FileButton({
  label = "Upload Image",
  hint,
  onPick,
  progress,
  disabled,
}) {
  const idRef = useRef(`file-${uid()}`);

  const base =
    "inline-flex items-center justify-center gap-2 h-11 w-full rounded-xl border text-xs font-semibold transition";
  const enabledCls =
    "border-lime-400/40 bg-lime-400/10 text-lime-100 hover:bg-lime-400/15 hover:border-lime-300/50 cursor-pointer";
  const disabledCls =
    "border-white/10 bg-white/5 text-white/40 cursor-not-allowed";

  return (
    <div className="space-y-2">
      <label
        htmlFor={disabled ? undefined : idRef.current}
        onClick={(e) => {
          if (disabled) e.preventDefault();
        }}
        className={[base, disabled ? disabledCls : enabledCls].join(" ")}
      >
        {label}
        <span className="opacity-80">⤓</span>
      </label>

      <input
        id={idRef.current}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={!!disabled}
        onChange={(e) => {
          const f = e.target.files?.[0] || null;
          onPick?.(f);
          // allow re-pick same file later
          e.target.value = "";
        }}
      />

      {hint ? (
        <p className="text-[10px] text-white/35">{hint}</p>
      ) : null}

      {progress != null ? (
        <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
          <div
            className="h-1.5 rounded-full bg-lime-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

/* -------------------- Image name + X row -------------------- */
function inferNameFromUrl(url) {
  try {
    const u = new URL(url);
    const last = (u.pathname || "").split("/").filter(Boolean).pop() || "";
    if (!last) return "image";
    const noQuery = last.split("?")[0];
    return decodeURIComponent(noQuery);
  } catch {
    const last =
      String(url || "")
        .split("/")
        .pop() || "image";
    return last.split("?")[0];
  }
}

function FileNameRow({ name, onRemove }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
      <div className="min-w-0">
        <p className="truncate text-[11px] text-white/75">
          {name}
        </p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/20 transition"
        title="Remove image"
      >
        <FaTimes className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* -------------------- RICH TEXT (WYSIWYG) -------------------- */
function ToolbarBtn({ title, children, onAction }) {
  const run = (e) => {
    e.preventDefault();
    onAction?.();
  };

  return (
    <button
      type="button"
      className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition text-sm"
      title={title}
      onMouseDown={run}
      onPointerDown={run}
    >
      {children}
    </button>
  );
}

function RichTextToolbar({ onExec, onToggleMore }) {
  return (
    <div className="flex items-center gap-2 relative">
      <ToolbarBtn title="Bold" onAction={() => onExec?.("bold")}>
        B
      </ToolbarBtn>
      <ToolbarBtn title="Italic" onAction={() => onExec?.("italic")}>
        I
      </ToolbarBtn>
      <ToolbarBtn title="Underline" onAction={() => onExec?.("underline")}>
        U
      </ToolbarBtn>
      <ToolbarBtn
        title="Bulleted List"
        onAction={() => onExec?.("insertUnorderedList")}
      >
        ≡
      </ToolbarBtn>
      <ToolbarBtn title="More" onAction={() => onToggleMore?.()}>
        ⋮
      </ToolbarBtn>
    </div>
  );
}

function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Write here...",
  rows = 6,
  disabled,
}) {
  const editorRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [open, setOpen] = useState(false);

  const savedRangeRef = useRef(null);

  const moveCaretToEnd = () => {
    const el = editorRef.current;
    if (!el) return;
    try {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection?.();
      if (!sel) return;
      sel.removeAllRanges();
      sel.addRange(range);
      savedRangeRef.current = range.cloneRange();
    } catch {
      // ignore
    }
  };

  const isRangeValid = (range) => {
    const el = editorRef.current;
    if (!el || !range) return false;
    const sc = range.startContainer;
    const ec = range.endContainer;
    if (!sc || !ec) return false;
    // must still be connected and inside editor
    return (
      sc.isConnected && ec.isConnected && el.contains(sc) && el.contains(ec)
    );
  };

  const saveSelection = () => {
    const el = editorRef.current;
    if (!el) return;

    const sel = window.getSelection?.();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    if (!el.contains(range.commonAncestorContainer)) return;

    try {
      savedRangeRef.current = range.cloneRange();
    } catch {
      // ignore
    }
  };

  const restoreSelection = () => {
    const el = editorRef.current;
    const range = savedRangeRef.current;
    if (!el || !range) return;

    if (!isRangeValid(range)) {
      savedRangeRef.current = null;
      moveCaretToEnd();
      return;
    }

    const sel = window.getSelection?.();
    if (!sel) return;

    try {
      sel.removeAllRanges();
      sel.addRange(range);
    } catch {
      savedRangeRef.current = null;
      moveCaretToEnd();
    }
  };

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const nextRaw = value || "";
    const next = stripGrammarlyArtifacts(nextRaw);
    const current = stripGrammarlyArtifacts(el.innerHTML || "");

    // Only update DOM when truly different (prevents mutation thrash).
    if (current !== next) el.innerHTML = next;

    const hasText = (el.textContent || "").replace(/\u00A0/g, " ").trim();
    setIsEmpty(!hasText);

    // If our saved range points to old nodes, reset it.
    if (savedRangeRef.current && !isRangeValid(savedRangeRef.current)) {
      savedRangeRef.current = null;
    }
  }, [value]);

  const commit = () => {
    const el = editorRef.current;
    if (!el) return;

    const text = (el.textContent || "").replace(/\u00A0/g, " ").trim();
    let html = text ? el.innerHTML : "";
    html = stripGrammarlyArtifacts(html);

    setIsEmpty(!text);

    // Avoid unnecessary state updates
    if ((value || "") !== html) onChange?.(html);
  };

  const patchLinks = () => {
    const el = editorRef.current;
    if (!el) return;
    el.querySelectorAll("a").forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noreferrer noopener");
    });
  };

  const exec = (cmd, value = null) => {
    const el = editorRef.current;
    if (!el || disabled) return;

    el.focus();
    restoreSelection();

    try {
      document.execCommand(cmd, false, value);
    } catch {
      // ignore
    }

    patchLinks();
    saveSelection();
    commit();
  };

  const insertLink = () => {
    const el = editorRef.current;
    if (!el || disabled) return;

    el.focus();
    restoreSelection();

    let url = window.prompt("Enter link URL (https://...)");
    if (!url) return;

    url = String(url).trim();
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

    const sel = window.getSelection?.();
    const selectedText = sel?.toString?.() || "";

    if (selectedText.trim()) {
      exec("createLink", url);
    } else {
      const safeUrl = String(url).replace(/"/g, "&quot;");
      exec(
        "insertHTML",
        `<a href="${safeUrl}" target="_blank" rel="noreferrer noopener">link</a>`,
      );
    }

    setOpen(false);
  };

  const clearFormatting = () => {
    exec("removeFormat");
    exec("unlink");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = () => setOpen(false);
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div className={["space-y-2", disabled ? "opacity-60" : ""].join(" ")}>
      {label ? (
        <label className="block text-xs font-semibold text-white/80">
          {label}
        </label>
      ) : null}

      <div
        className={[
          "rounded-2xl border border-white/10 bg-white/5 overflow-hidden",
          disabled ? "pointer-events-none" : "",
        ].join(" ")}
      >
        <div className="relative">
          {isEmpty ? (
            <div className="pointer-events-none absolute left-4 top-3 text-sm text-white/30">
              {placeholder}
            </div>
          ) : null}

          <div
            ref={editorRef}
            contentEditable={!disabled}
            suppressContentEditableWarning
            className={[
              "adlm-rte",
              "w-full px-4 py-3 bg-transparent text-sm text-white/90",
              "focus:outline-none",
              "min-h-[120px]",
            ].join(" ")}
            style={{ minHeight: `${Math.max(110, rows * 22)}px` }}
            {...GRAMMARLY_OFF_PROPS}
            onInput={() => {
              saveSelection();
              commit();
            }}
            onBlur={() => {
              saveSelection();
              commit();
            }}
            onKeyUp={saveSelection}
            onMouseUp={saveSelection}
            onPointerUp={saveSelection}
            onPointerDown={saveSelection}
            onFocus={saveSelection}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-black/20">
          <div
            className="relative flex items-center gap-2"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <RichTextToolbar
              onExec={exec}
              onToggleMore={() => !disabled && setOpen((v) => !v)}
            />

            {open ? (
              <div
                className="absolute left-0 bottom-12 z-50 w-52 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
                onMouseDown={(e) => e.preventDefault()}
                onPointerDown={(e) => e.preventDefault()}
              >
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    exec("insertOrderedList");
                    setOpen(false);
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    exec("insertOrderedList");
                    setOpen(false);
                  }}
                >
                  Numbered list
                </button>

                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    exec("formatBlock", "blockquote");
                    setOpen(false);
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    exec("formatBlock", "blockquote");
                    setOpen(false);
                  }}
                >
                  Quote
                </button>

                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    insertLink();
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    insertLink();
                  }}
                >
                  Insert link
                </button>

                <div className="h-px bg-white/10" />

                <button
                  type="button"
                  className="w-full text-left px-3 py-2 text-xs text-red-300 hover:bg-red-500/15 transition"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    clearFormatting();
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    clearFormatting();
                  }}
                >
                  Clear formatting
                </button>
              </div>
            ) : null}
          </div>

          <span className="text-[10px] text-white/30"> </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------- FORM -------------------- */
const emptyForm = () => ({
  name: "",
  slug: "",
  status: "published",
  isDefault: false,

  heroTitle: "",
  heroSubtitle: "",
  heroDateLabel: "",
  timelineLabel: "4 weeks",
  roleTitle: "",
  roleDescription: "", // HTML
  roleBulletsText: "",

  enableContentBlocks: true,
  enablePersonas: true,
  enableOtherImages: true,

  writeUpBlocks: [
    {
      id: uid(),
      enabled: true,
      headlineEnabled: true,
      bodyEnabled: true,
      imagesEnabled: true,
      placement: "beforePersonas",
      headline: "",
      body: "", // HTML
      images: [],
      layout: "wide",
      textSide: "left",
      wideVariant: "full",
    },
  ],

  personas: [
    { id: uid(), enabled: true, name: "", subtitle: "", about: "", img: "" },
    { id: uid(), enabled: true, name: "", subtitle: "", about: "", img: "" },
  ],

  heroImageUrl: "",
  galleryImageUrls: ["", "", "", "", "", "", ""],

  showInWorkExperience: false,
  workExperienceText: "",
  workExpClientName: "",
  workExpRole: "",
  workExpStartDate: "",
  workExpEndDate: "",
});

export default function UIProjectsTab() {
  const navigate = useNavigate();
  const { authFetch, initialized, isAuthenticated } = useAuth();

  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [items, setItems] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [form, setForm] = useState(() => emptyForm());

  // url -> original file name (when uploaded from this admin)
  const [uploadedNames, setUploadedNames] = useState({});
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const uploadEndpoint = useMemo(() => {
    return API
      ? `${API}/api/ui-projects/admin/upload`
      : `/api/ui-projects/admin/upload`;
  }, []);

  const deleteImageEndpoint = useMemo(() => {
    return API
      ? `${API}/api/ui-projects/admin/delete-image`
      : `/api/ui-projects/admin/delete-image`;
  }, []);

  const listEndpoint = useMemo(() => {
    return API ? `${API}/api/ui-projects/admin` : `/api/ui-projects/admin`;
  }, []);

  useEffect(() => {
    if (!initialized) return;
    if (!isAuthenticated) return;
    if (typeof authFetch !== "function") return;

    let cancelled = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const load = async () => {
      for (let attempt = 0; attempt < 5; attempt++) {
        if (cancelled) return;
        try {
          const res = await authFetch(listEndpoint);
          if (res.ok) {
            const data = await res.json();
            if (!cancelled) setItems(Array.isArray(data) ? data : []);
            return;
          }

          if (res.status === 401 || res.status === 403) {
            await sleep(350);
            continue;
          }

          throw new Error(`Failed to fetch UI projects: ${res.status}`);
        } catch (e) {
          if (attempt < 4) {
            await sleep(350);
            continue;
          }
          console.error(e);
          if (!cancelled) setItems([]);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [authFetch, listEndpoint, initialized, isAuthenticated]);

  const validateImageFile = (file) => {
    if (!file) return "No file selected.";
    if (!file.type?.startsWith("image/")) return "Please select an image file.";
    if (file.size > bytesFromMB(MAX_IMAGE_MB))
      return `Image is too large. Max ${MAX_IMAGE_MB}MB.`;
    return "";
  };

  const handleUploadFiles = async (file, progressKey) => {
    if (!file) return "";
    const err = validateImageFile(file);
    if (err) {
      setStatus({ type: "error", message: err });
      return "";
    }

    setUploadProgress((p) => ({ ...p, [progressKey]: 0 }));

    try {
      const url = await uploadImage(
        file,
        (pct) => setUploadProgress((p) => ({ ...p, [progressKey]: pct })),
        uploadEndpoint,
      );

      if (url) {
        setUploadedNames((m) => ({ ...m, [url]: file.name }));
      }

      return url;
    } catch (e) {
      setStatus({ type: "error", message: e?.message || "Upload failed" });
      return "";
    } finally {
      setUploadProgress((p) => {
        const copy = { ...p };
        delete copy[progressKey];
        return copy;
      });
    }
  };

  const handleDeleteUrl = async (url) => {
    if (!url) return;
    try {
      await authFetch(deleteImageEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch (e) {
      console.error(e);
      setStatus({
        type: "error",
        message: "Server delete failed. Local reference removed.",
      });
    } finally {
      setUploadedNames((m) => {
        const copy = { ...m };
        delete copy[url];
        return copy;
      });
    }
  };

  const imageLabel = (url) => uploadedNames[url] || inferNameFromUrl(url);

  const setField = (name, value) => {
    setForm((prev) => {
      if (name === "name" && !prev.slug)
        return { ...prev, name: value, slug: slugify(value) };
      return { ...prev, [name]: value };
    });
  };

  const setCheck = (name, checked) =>
    setForm((p) => ({ ...p, [name]: !!checked }));

  const resetForm = () => {
    setEditingId(null);
    setSelectedProjectId("");
    setUploadProgress({});
    setStatus({ type: "idle", message: "" });
    setUploadedNames({});
    setForm(emptyForm());
  };

  const startEditing = (p) => {
    const hero = p.hero || {};
    const w = p.writeUp || {};
    const blocksRaw = safeArr(w.blocks);
    const cardsRaw = safeArr(w.idealUsers?.cards);

    const blocks = blocksRaw.length
      ? blocksRaw.map((b) => ({
          id: b.id || uid(),
          enabled: b.enabled !== false,
          headlineEnabled: b.headlineEnabled !== false,
          bodyEnabled: b.bodyEnabled !== false,
          imagesEnabled: b.imagesEnabled !== false,
          placement: b.placement || "beforePersonas",
          headline: b.headline || "",
          body: b.body || "",
          images: safeArr(b.images).filter(Boolean),
          layout: b.layout || (safeArr(b.images).length > 1 ? "grid" : "wide"),
          textSide: b.textSide || "left",
          wideVariant: b.wideVariant || "full",
        }))
      : [
          {
            id: uid(),
            enabled: true,
            headlineEnabled: true,
            bodyEnabled: true,
            imagesEnabled: true,
            placement: "beforePersonas", // ✅ missing before (fixed)
            headline: "",
            body: "",
            images: [],
            layout: "wide",
            textSide: "left",
            wideVariant: "full",
          },
        ];

    const personas = cardsRaw.length
      ? cardsRaw.map((c) => ({
          id: uid(),
          enabled: c.enabled !== false,
          name: c.name || "",
          subtitle: c.subtitle || "",
          about: c.about || "",
          img: c.img || "",
        }))
      : [
          {
            id: uid(),
            enabled: true,
            name: "",
            subtitle: "",
            about: "",
            img: "",
          },
          {
            id: uid(),
            enabled: true,
            name: "",
            subtitle: "",
            about: "",
            img: "",
          },
        ];

    const gallery = safeArr(p.images?.gallery);
    const padded =
      gallery.length >= 7
        ? gallery.slice(0, 7)
        : [...gallery, ...Array(7 - gallery.length).fill("")];

    const wem = p.workExperienceMeta || {};

    setEditingId(p._id || p.id || null);
    setSelectedProjectId(p._id || p.id || "");
    setStatus({ type: "idle", message: "" });
    setUploadProgress({});
    setUploadedNames({});

    setForm((prev) => ({
      ...prev,
      name: p.name || "",
      slug: p.slug || "",
      status: p.status || "published",
      isDefault: !!p.isDefault,

      heroTitle: hero.title || "",
      heroSubtitle: hero.subtitle || "",
      heroDateLabel: hero.dateLabel || "",
      timelineLabel: hero.timelineLabel || "4 weeks",
      roleTitle: hero.roleTitle || "",
      roleDescription: hero.roleDescription || "",
      roleBulletsText: joinLines(hero.roleBullets),

      enableContentBlocks: blocks.some((b) => b.enabled),
      enablePersonas: personas.some((x) => x.enabled),
      enableOtherImages: padded.some(Boolean),

      writeUpBlocks: blocks,
      personas,

      heroImageUrl: p.images?.hero || "",
      galleryImageUrls: padded,

      showInWorkExperience: !!p.showInWorkExperience,
      workExperienceText: joinLines(p.workExperience),
      workExpClientName: wem.clientName || "",
      workExpRole: wem.myRole || "",
      workExpStartDate: wem.startDate ? String(wem.startDate).slice(0, 10) : "",
      workExpEndDate: wem.endDate ? String(wem.endDate).slice(0, 10) : "",
    }));
  };

  const buildPayload = () => {
    const gallery = form.enableOtherImages
      ? safeArr(form.galleryImageUrls).filter(Boolean)
      : [];

    const blocks = form.enableContentBlocks
      ? safeArr(form.writeUpBlocks)
          .map((b) => ({
            id: b.id || uid(),
            enabled: b.enabled !== false,
            headlineEnabled: b.headlineEnabled !== false,
            bodyEnabled: b.bodyEnabled !== false,
            imagesEnabled: b.imagesEnabled !== false,
            placement: b.placement || "beforePersonas",
            headline: (b.headline || "").trim(),
            body: stripGrammarlyArtifacts(b.body || ""),
            images: safeArr(b.images).filter(Boolean),
            layout:
              safeArr(b.images).filter(Boolean).length > 1
                ? "grid"
                : b.layout || "wide",
            textSide: b.textSide || "left",
            wideVariant: b.wideVariant || "full",
          }))
          .filter(
            (b) =>
              b.headline ||
              (b.body || "").trim() ||
              safeArr(b.images).filter(Boolean).length,
          )
      : [];

    const personas = form.enablePersonas
      ? safeArr(form.personas)
          .filter((p) => p.enabled !== false)
          .map((p) => ({
            name: (p.name || "").trim(),
            subtitle: (p.subtitle || "").trim(),
            img: p.img || "",
            pos: "",
            about: stripGrammarlyArtifacts(p.about || ""),
            enabled: p.enabled !== false,
          }))
      : [];

    return {
      projectType: "uiux",
      name: form.name.trim(),
      slug: (form.slug || slugify(form.name)).toLowerCase(),
      status: form.status,
      isDefault: !!form.isDefault,

      hero: {
        title: form.heroTitle.trim(),
        subtitle: form.heroSubtitle.trim(),
        dateLabel: form.heroDateLabel.trim(),
        roleTitle: form.roleTitle.trim(),
        roleDescription: stripGrammarlyArtifacts(form.roleDescription || ""),
        roleBullets: splitLines(form.roleBulletsText),
        timelineLabel: form.timelineLabel.trim(),
      },

      writeUp: {
        blocks,
        idealUsers: { cards: personas },
      },

      images: {
        hero: form.heroImageUrl || null,
        gallery,
      },

      mainImage: form.heroImageUrl || gallery[0] || null,

      showInWorkExperience: !!form.showInWorkExperience,
      workExperience: splitLines(form.workExperienceText),
      workExperienceMeta: {
        clientName: form.workExpClientName.trim(),
        myRole: form.workExpRole.trim(),
        startDate: form.workExpStartDate || null,
        endDate: form.workExpEndDate || null,
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Saving UI/UX project..." });

    const payload = buildPayload();
    if (!payload.name || !payload.slug) {
      setStatus({ type: "error", message: "Project Name is required." });
      return;
    }
    if (!payload.hero?.title) {
      setStatus({ type: "error", message: "Hero Title is required." });
      return;
    }

    try {
      if (!API) {
        console.log("UI project payload:", payload);
        setStatus({
          type: "success",
          message: "Saved locally (no API). Check console.",
        });
        return;
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API}/api/ui-projects/admin/${editingId}`
        : `${API}/api/ui-projects/admin`;

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus({ type: "success", message: "Project saved ✅" });

      const listRes = await authFetch(listEndpoint);
      const listData = await listRes.json();
      setItems(Array.isArray(listData) ? listData : []);

      resetForm();
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to save UI project. Please try again.",
      });
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this UI/UX project?");
    if (!ok) return;

    try {
      if (!API) return;
      const res = await authFetch(`${API}/api/ui-projects/admin/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setItems((prev) => prev.filter((x) => (x._id || x.id) !== id));
      if (editingId === id) resetForm();

      setStatus({ type: "success", message: "UI/UX project deleted ✅" });
    } catch (e) {
      console.error(e);
      setStatus({ type: "error", message: "Failed to delete UI project." });
    }
  };

  // ---------- UI helpers ----------
  const updateBlock = (idx, patch) =>
    setForm((p) => {
      const arr = safeArr(p.writeUpBlocks).slice();
      arr[idx] = { ...arr[idx], ...patch };
      return { ...p, writeUpBlocks: arr };
    });

  const addBlock = () =>
    setForm((p) => ({
      ...p,
      writeUpBlocks: [
        ...safeArr(p.writeUpBlocks),
        {
          id: uid(),
          enabled: true,
          headlineEnabled: true,
          bodyEnabled: true,
          imagesEnabled: true,
          placement: "beforePersonas",
          headline: "",
          body: "",
          images: [],
          layout: "wide",
          textSide: "left",
          wideVariant: "full",
        },
      ],
    }));

  const removeBlock = (idx) =>
    setForm((p) => ({
      ...p,
      writeUpBlocks: safeArr(p.writeUpBlocks).filter((_, i) => i !== idx),
    }));

  const uploadBlockImage = async (idx, file) => {
    const url = await handleUploadFiles(file, `block-${idx}`);
    if (!url) return;

    setForm((prev) => {
      const blocks = safeArr(prev.writeUpBlocks).slice();
      const b = blocks[idx] || {
        id: uid(),
        enabled: true,
        headlineEnabled: true,
        bodyEnabled: true,
        imagesEnabled: true,
        placement: "beforePersonas", // ✅ missing before (fixed)
        headline: "",
        body: "",
        images: [],
        layout: "wide",
        textSide: "left",
        wideVariant: "full",
      };

      blocks[idx] = {
        ...b,
        images: [...safeArr(b.images), url],
      };

      return { ...prev, writeUpBlocks: blocks };
    });
  };

  const removeBlockImage = async (idx, imgUrl) => {
    const ok = window.confirm(
      "Remove this image? It will also be deleted from Cloudinary.",
    );
    if (!ok) return;

    await handleDeleteUrl(imgUrl);

    setForm((p) => {
      const blocks = safeArr(p.writeUpBlocks).slice();
      const b = blocks[idx];
      if (!b) return p;
      blocks[idx] = {
        ...b,
        images: safeArr(b.images).filter((u) => u !== imgUrl),
      };
      return { ...p, writeUpBlocks: blocks };
    });
  };

  const updatePersona = (idx, patch) =>
    setForm((p) => {
      const arr = safeArr(p.personas).slice();
      arr[idx] = { ...arr[idx], ...patch };
      return { ...p, personas: arr };
    });

  const addPersona = () =>
    setForm((p) => ({
      ...p,
      personas: [
        ...safeArr(p.personas),
        {
          id: uid(),
          enabled: true,
          name: "",
          subtitle: "",
          about: "",
          img: "",
        },
      ],
    }));

  const uploadPersonaImage = async (idx, file) => {
    const url = await handleUploadFiles(file, `persona-${idx}`);
    if (!url) return;
    updatePersona(idx, { img: url });
  };

  const removePersonaImage = async (idx) => {
    const imgUrl = formRef.current?.personas?.[idx]?.img;
    if (!imgUrl) return;

    const ok = window.confirm(
      "Remove this image? It will also be deleted from Cloudinary.",
    );
    if (!ok) return;

    await handleDeleteUrl(imgUrl);
    updatePersona(idx, { img: "" });
  };

  const uploadHeroImage = async (file) => {
    const url = await handleUploadFiles(file, "hero");
    if (!url) return;
    setForm((p) => ({ ...p, heroImageUrl: url }));
  };

  const removeHeroImage = async () => {
    const heroUrl = formRef.current?.heroImageUrl;
    if (!heroUrl) return;

    const ok = window.confirm(
      "Remove this image? It will also be deleted from Cloudinary.",
    );
    if (!ok) return;

    await handleDeleteUrl(heroUrl);
    setForm((p) => ({ ...p, heroImageUrl: "" }));
  };

  const uploadOtherImages = async (files) => {
    const list = Array.from(files || []).filter(Boolean);
    if (!list.length) return;

    // read latest gallery from ref (avoids stale closure)
    let gallery = safeArr(formRef.current?.galleryImageUrls).slice();

    for (let i = 0; i < list.length; i++) {
      const slot = gallery.findIndex((x) => !x);
      if (slot === -1) break;

      const url = await handleUploadFiles(list[i], `gallery-${slot}`);
      if (!url) continue;

      gallery[slot] = url;
    }

    setForm((p) => ({ ...p, galleryImageUrls: gallery }));
  };

  const removeGalleryImage = async (idx) => {
    const url = formRef.current?.galleryImageUrls?.[idx];
    if (!url) return;

    const ok = window.confirm(
      "Remove this image? It will also be deleted from Cloudinary.",
    );
    if (!ok) return;

    await handleDeleteUrl(url);
    setForm((p) => {
      const g = safeArr(p.galleryImageUrls).slice();
      g[idx] = "";
      return { ...p, galleryImageUrls: g };
    });
  };

  return (
    <section className="pb-24 text-white">
      <style>{RTE_CSS}</style>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-0 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10 transition"
          >
            Back to Portfolio
          </button>

          <h1 className="text-[34px] md:text-[44px] font-semibold tracking-tight">
            UIUX Case Studies
          </h1>
          <p className="text-sm md:text-base text-white/55">
            Add new case studies, projects or even website designs.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Details */}
          <SectionCard
            title="Project Details"
            subtitle="Fill in the details of your project"
          >
            {/* Row 1 */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Project Name
                </label>

                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedProjectId(val);

                    if (!val) {
                      resetForm();
                      return;
                    }

                    const found = items.find((x) => (x._id || x.id) === val);
                    if (found) startEditing(found);
                  }}
                  className={selectBase}
                >
                  <option value="">Create new…</option>
                  {items.map((p) => (
                    <option key={p._id || p.id} value={p._id || p.id}>
                      {p.name || p.slug}
                    </option>
                  ))}
                </select>

                {!selectedProjectId && (
                  <input
                    {...GRAMMARLY_OFF_PROPS}
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    className={inputBase}
                    placeholder="SavedUp"
                  />
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Subtitle
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.heroSubtitle}
                  onChange={(e) => setField("heroSubtitle", e.target.value)}
                  className={inputBase}
                  placeholder="Subtitle"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Date
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  type="date"
                  value={form.workExpStartDate || ""}
                  onChange={(e) => setField("workExpStartDate", e.target.value)}
                  className={inputBase}
                />
                <p className="text-[10px] text-white/30">
                  (Using WorkExp Start Date to match your Figma “Date” field)
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Timeline
                </label>
                <select
                  value={form.timelineLabel}
                  onChange={(e) => setField("timelineLabel", e.target.value)}
                  className={selectBase}
                >
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Slug
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.slug}
                  onChange={(e) => setField("slug", e.target.value)}
                  className={inputBase}
                  placeholder="savedup"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                  className={selectBase}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-7">
                <Toggle
                  checked={form.isDefault}
                  onChange={(v) => setCheck("isDefault", v)}
                />
                <span className="text-xs text-white/60">
                  Make Default
                </span>
              </div>

              <div className="md:col-span-3 space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Role Bullets (one per line)
                </label>
                <textarea
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.roleBulletsText}
                  onChange={(e) => setField("roleBulletsText", e.target.value)}
                  rows={4}
                  className={textareaBase}
                  placeholder={`UX research & synthesis\nUser personas\nUser flows & information architecture`}
                />
              </div>
            </div>

            {/* Upload hero image */}
            <div className="grid gap-4 md:grid-cols-2 items-start">
              <div className="space-y-3">
                <FileButton
                  label={form.heroImageUrl ? "Image Added" : "Upload Image"}
                  hint={`Max ${MAX_IMAGE_MB}MB`}
                  onPick={uploadHeroImage}
                  progress={uploadProgress["hero"]}
                  disabled={!!form.heroImageUrl}
                />

                {form.heroImageUrl ? (
                  <div className="space-y-3">
                    <FileNameRow
                      name={imageLabel(form.heroImageUrl)}
                      onRemove={removeHeroImage}
                    />
                    <div className="relative">
                      <img
                        src={form.heroImageUrl}
                        alt="Hero"
                        className="h-40 w-full rounded-2xl object-cover border border-white/10"
                      />
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-white/80">
                  Hero Title
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.heroTitle}
                  onChange={(e) => setField("heroTitle", e.target.value)}
                  className={inputBase}
                  placeholder="SavedUp"
                  required
                />

                <label className="block text-xs font-semibold text-white/80">
                  Hero Date Label (optional)
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.heroDateLabel}
                  onChange={(e) => setField("heroDateLabel", e.target.value)}
                  className={inputBase}
                  placeholder="August 2023"
                />
              </div>
            </div>

            {/* My Role */}
            <RichTextEditor
              label="My Role"
              value={form.roleDescription}
              onChange={(v) => setField("roleDescription", v)}
              placeholder="Write here..."
              rows={6}
            />
          </SectionCard>

          {/* Case Study Content */}
          <SectionCard
            title="Case Study Content"
            subtitle="Fill in the details of your case study"
            right={
              <Toggle
                checked={form.enableContentBlocks}
                onChange={(v) => setCheck("enableContentBlocks", v)}
              />
            }
            disabled={!form.enableContentBlocks}
          >
            <div className="space-y-6">
              {safeArr(form.writeUpBlocks).map((b, idx) => {
                const blockDisabled = b.enabled === false;

                const headlineDisabled =
                  blockDisabled || b.headlineEnabled === false;
                const bodyDisabled = blockDisabled || b.bodyEnabled === false;
                const imagesDisabled =
                  blockDisabled || b.imagesEnabled === false;

                return (
                  <div
                    key={b.id || idx}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-6 space-y-5"
                  >
                    {/* ✅ NEW: Clean header layout */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      {/* Left: title */}
                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-white/85">
                          Content Block #{idx + 1}
                        </div>
                        <p className="text-[11px] text-white/40">
                          Manage placement, visibility and content.
                        </p>
                      </div>

                      {/* Right: controls */}
                      <div className="w-full md:w-auto">
                        <div className="grid gap-3 md:grid-cols-[minmax(260px,1fr)_auto_auto] md:items-end">
                          {/* Placement */}
                          <div className="space-y-1">
                            <label className="block text-xs font-semibold text-white/80">
                              Placement
                            </label>

                            <select
                              value={b.placement || "beforePersonas"}
                              disabled={blockDisabled}
                              onChange={(e) =>
                                updateBlock(idx, {
                                  placement: e.target.value,
                                })
                              }
                              className={[
                                selectBase,
                                "h-10",
                                blockDisabled
                                  ? "opacity-60 cursor-not-allowed"
                                  : "",
                              ].join(" ")}
                            >
                              <option value="beforePersonas">
                                Above User Personas
                              </option>
                              <option value="afterPersonas">
                                Below User Personas
                              </option>
                            </select>

                            <p className="text-[10px] text-white/35">
                              Choose where this block shows on the UI project
                              page.
                            </p>
                          </div>

                          {/* Block toggle */}
                          <div className="flex items-center justify-between md:justify-end gap-2 md:pb-[18px]">
                            <span className="text-[11px] text-white/55">
                              Block
                            </span>
                            <Toggle
                              checked={b.enabled !== false}
                              onChange={(v) => updateBlock(idx, { enabled: v })}
                            />
                          </div>

                          {/* Remove */}
                          <div className="md:pb-[18px]">
                            <button
                              type="button"
                              onClick={() => removeBlock(idx)}
                              className="w-full md:w-auto rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 px-4 h-10 text-xs font-semibold hover:bg-red-500/20 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Headline */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-white/80">
                          Headline
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-white/55">
                            Show
                          </span>
                          <Toggle
                            checked={b.headlineEnabled !== false}
                            onChange={(v) =>
                              updateBlock(idx, { headlineEnabled: v })
                            }
                            disabled={blockDisabled}
                          />
                        </div>
                      </div>

                      <div
                        className={
                          headlineDisabled
                            ? "opacity-60 pointer-events-none"
                            : ""
                        }
                      >
                        <input
                          {...GRAMMARLY_OFF_PROPS}
                          value={b.headline || ""}
                          onChange={(e) =>
                            updateBlock(idx, { headline: e.target.value })
                          }
                          className={inputBase}
                          placeholder="Headline"
                        />
                      </div>
                    </div>

                    {/* Body Text */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-white/80">
                          Body Text
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-white/55">
                            Show
                          </span>
                          <Toggle
                            checked={b.bodyEnabled !== false}
                            onChange={(v) =>
                              updateBlock(idx, { bodyEnabled: v })
                            }
                            disabled={blockDisabled}
                          />
                        </div>
                      </div>

                      <RichTextEditor
                        label={null}
                        value={b.body || ""}
                        onChange={(v) => updateBlock(idx, { body: v })}
                        placeholder="Write here..."
                        rows={7}
                        disabled={bodyDisabled}
                      />
                    </div>

                    {/* Images */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-white/80">
                          Images
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-white/55">
                            Show
                          </span>
                          <Toggle
                            checked={b.imagesEnabled !== false}
                            onChange={(v) =>
                              updateBlock(idx, { imagesEnabled: v })
                            }
                            disabled={blockDisabled}
                          />
                        </div>
                      </div>

                      <div
                        className={
                          imagesDisabled ? "opacity-60 pointer-events-none" : ""
                        }
                      >
                        <FileButton
                          label="Upload Image"
                          onPick={(file) => uploadBlockImage(idx, file)}
                          progress={uploadProgress[`block-${idx}`]}
                        />
                      </div>

                      {!imagesDisabled && safeArr(b.images).length ? (
                        <div className="space-y-2">
                          {safeArr(b.images).map((u) => (
                            <FileNameRow
                              key={`name-${u}`}
                              name={imageLabel(u)}
                              onRemove={() => removeBlockImage(idx, u)}
                            />
                          ))}
                        </div>
                      ) : null}

                      {!imagesDisabled && safeArr(b.images).length ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {safeArr(b.images).map((u) => (
                            <div key={u} className="relative">
                              <img
                                src={u}
                                alt="block"
                                className="h-28 w-full rounded-xl object-cover border border-white/10"
                              />
                              <button
                                type="button"
                                onClick={() => removeBlockImage(idx, u)}
                                className="absolute -top-2 -right-2 rounded-full bg-black/80 p-1.5 text-red-300 hover:bg-red-600 hover:text-white transition"
                                title="Delete image"
                              >
                                <FaTrash className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={addBlock}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 h-11 text-xs font-semibold text-white/80 hover:bg-white/10 transition"
              >
                Add Content Block{" "}
                <span className="text-base leading-none">＋</span>
              </button>
            </div>
          </SectionCard>

          {/* User Personas */}
          <SectionCard
            title="User Personas"
            subtitle="Fill in the details of your ideal users"
            right={
              <Toggle
                checked={form.enablePersonas}
                onChange={(v) => setCheck("enablePersonas", v)}
              />
            }
            disabled={!form.enablePersonas}
          >
            <div className="space-y-6">
              {safeArr(form.personas).map((p, idx) => (
                <div
                  key={p.id || idx}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5 space-y-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-white/80">
                        Name
                      </label>
                      <input
                        {...GRAMMARLY_OFF_PROPS}
                        value={p.name || ""}
                        onChange={(e) =>
                          updatePersona(idx, { name: e.target.value })
                        }
                        className={inputBase}
                        placeholder="Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-white/80">
                        Subtitle
                      </label>
                      <input
                        {...GRAMMARLY_OFF_PROPS}
                        value={p.subtitle || ""}
                        onChange={(e) =>
                          updatePersona(idx, { subtitle: e.target.value })
                        }
                        className={inputBase}
                        placeholder="Subtitle"
                      />
                    </div>
                  </div>

                  <RichTextEditor
                    label="About"
                    value={p.about || ""}
                    onChange={(v) => updatePersona(idx, { about: v })}
                    placeholder="Write here..."
                    rows={6}
                  />

                  <div className="space-y-3">
                    <FileButton
                      label={p.img ? "Image Added" : "Upload Image"}
                      onPick={(file) => uploadPersonaImage(idx, file)}
                      progress={uploadProgress[`persona-${idx}`]}
                      disabled={!!p.img}
                      hint={`Max ${MAX_IMAGE_MB}MB`}
                    />

                    {p.img ? (
                      <div className="space-y-3">
                        <FileNameRow
                          name={imageLabel(p.img)}
                          onRemove={() => removePersonaImage(idx)}
                        />
                        <img
                          src={p.img}
                          alt="persona"
                          className="h-36 w-full rounded-2xl object-cover border border-white/10"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addPersona}
                className="inline-flex items-center gap-2 rounded-xl border border-lime-400/40 bg-lime-400/10 px-4 h-11 text-xs font-semibold text-lime-100 hover:bg-lime-400/15 transition"
              >
                Add Persona <span className="text-base leading-none">＋</span>
              </button>
            </div>
          </SectionCard>

          {/* Other Images */}
          <SectionCard
            title="Other Images"
            subtitle="Add any other relevant images to this project"
            right={
              <Toggle
                checked={form.enableOtherImages}
                onChange={(v) => setCheck("enableOtherImages", v)}
              />
            }
            disabled={!form.enableOtherImages}
          >
            <div className="space-y-4">
              <label
                className={[
                  "block w-full rounded-2xl border border-dashed border-white/15",
                  "bg-white/5 hover:bg-white/10 transition cursor-pointer",
                  "h-44 flex items-center justify-center",
                ].join(" ")}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    uploadOtherImages(e.target.files);
                    e.target.value = "";
                  }}
                />
                <div className="text-center space-y-2">
                  <div className="text-white/70 text-sm">
                    Upload Image
                  </div>
                  <div className="text-[10px] text-white/35">
                    Up to 7 images • max {MAX_IMAGE_MB}MB each
                  </div>
                </div>
              </label>

              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {safeArr(form.galleryImageUrls).map((u, idx) => (
                  <div key={`g-${idx}`} className="space-y-2">
                    <div className="relative">
                      <div className="h-24 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                        {u ? (
                          <img
                            src={u}
                            alt={`gallery-${idx}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] text-white/25">
                            Empty
                          </div>
                        )}
                      </div>

                      {u ? (
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="absolute -top-2 -right-2 rounded-full bg-black/80 p-1.5 text-red-300 hover:bg-red-600 hover:text-white transition"
                          title="Delete image"
                        >
                          <FaTrash className="h-3.5 w-3.5" />
                        </button>
                      ) : null}

                      {uploadProgress[`gallery-${idx}`] != null ? (
                        <div className="mt-2 w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-lime-400 transition-all"
                            style={{
                              width: `${uploadProgress[`gallery-${idx}`]}%`,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>

                    {u ? (
                      <FileNameRow
                        name={imageLabel(u)}
                        onRemove={() => removeGalleryImage(idx)}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* WORK EXPERIENCE */}
          <SectionCard
            title="Work Experience"
            subtitle="Leave this section available for your Work Experience page"
          >
            <label className="flex items-center gap-3 text-xs text-white/75">
              <Toggle
                checked={form.showInWorkExperience}
                onChange={(v) => setCheck("showInWorkExperience", v)}
              />
              <span>Show in Work Experience section</span>
            </label>

            <div
              className={[
                "grid gap-4 md:grid-cols-2",
                form.showInWorkExperience
                  ? ""
                  : "opacity-60 pointer-events-none",
              ].join(" ")}
            >
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Client / Company Name (optional)
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.workExpClientName}
                  onChange={(e) =>
                    setField("workExpClientName", e.target.value)
                  }
                  className={inputBase}
                  placeholder="FinTech Startup / Personal Project"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Role (optional)
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.workExpRole}
                  onChange={(e) => setField("workExpRole", e.target.value)}
                  className={inputBase}
                  placeholder="Product Designer (UI/UX)"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Start Date
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  type="date"
                  value={form.workExpStartDate}
                  onChange={(e) => setField("workExpStartDate", e.target.value)}
                  className={inputBase}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  End Date (leave empty if Present)
                </label>
                <input
                  {...GRAMMARLY_OFF_PROPS}
                  type="date"
                  value={form.workExpEndDate}
                  onChange={(e) => setField("workExpEndDate", e.target.value)}
                  className={inputBase}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-semibold text-white/80">
                  Work Experience bullets (one per line)
                </label>
                <textarea
                  {...GRAMMARLY_OFF_PROPS}
                  value={form.workExperienceText}
                  onChange={(e) =>
                    setField("workExperienceText", e.target.value)
                  }
                  rows={5}
                  className={textareaBase}
                  placeholder={`Led end-to-end UI for onboarding and savings flows\nCreated design system components for consistency\nImproved usability via iteration + feedback`}
                />
              </div>
            </div>
          </SectionCard>

          {/* Save */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status.type === "loading"}
              className={[
                "inline-flex items-center justify-center",
                "rounded-xl h-12 px-7",
                "bg-gradient-to-b from-lime-300 to-lime-600",
                "text-sm font-semibold text-black",
                "shadow-[0_18px_60px_rgba(132,204,22,0.55)]",
                "hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition",
              ].join(" ")}
            >
              {status.type === "loading"
                ? "Saving..."
                : editingId
                  ? "Update Project"
                  : "Save Project"}
            </button>

            {status.type !== "idle" ? (
              <p
                className={[
                  "text-xs",
                  status.type === "error"
                    ? "text-red-300"
                    : status.type === "success"
                      ? "text-lime-300"
                      : "text-white/60",
                ].join(" ")}
              >
                {status.message}
              </p>
            ) : (
              <span />
            )}
          </div>
        </form>

        {/* Existing list */}
        <details className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <summary className="cursor-pointer text-xs font-semibold text-white/75">
            Existing UI/UX Projects
          </summary>

          <div className="mt-4">
            {items.length === 0 ? (
              <p className="text-xs text-white/45">
                No UI/UX projects found yet.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
                <table className="min-w-full text-left text-xs">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        Name
                      </th>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        Slug
                      </th>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        Status
                      </th>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        Default
                      </th>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        WorkExp
                      </th>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        WorkExp bullets
                      </th>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        Hero Image
                      </th>
                      <th className="px-3 py-2 font-semibold text-white/80">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((p) => {
                      const id = p._id || p.id || p.slug;
                      const thumb = p.images?.hero || p.mainImage || "";
                      const workExpYes = !!p.showInWorkExperience;

                      return (
                        <tr
                          key={id}
                          className="border-t border-white/5 hover:bg-white/5 transition"
                        >
                          <td className="px-3 py-2">{p.name || "-"}</td>
                          <td className="px-3 py-2">{p.slug || "-"}</td>
                          <td className="px-3 py-2">{p.status || "-"}</td>
                          <td className="px-3 py-2">
                            {p.isDefault ? (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold border-lime-500/40 bg-lime-500/10 text-lime-200">
                                Default
                              </span>
                            ) : (
                              <span className="text-[11px] text-white/35">
                                —
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            {workExpYes ? (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold border-lime-500/40 bg-lime-500/10 text-lime-200">
                                Yes
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold border-white/10 bg-white/5 text-white/45">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            {getWorkExpBulletsCount(p)}
                          </td>
                          <td className="px-3 py-2">
                            {thumb ? (
                              <img
                                src={thumb}
                                alt={p.name}
                                className="h-10 w-16 object-cover rounded border border-white/10"
                              />
                            ) : (
                              <span className="text-[11px] text-white/35">
                                No image
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => startEditing(p)}
                                className="text-[11px] px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(p._id || p.id)}
                                className="p-2 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition"
                                title="Delete"
                              >
                                <FaTrash className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}
