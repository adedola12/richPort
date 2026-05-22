// src/utils/richTextClean.js

export const isProbablyHtml = (s) =>
  typeof s === "string" && /<\/?[a-z][\s\S]*>/i.test(s);

/** Decode &lt; &gt; etc (important when content got double-encoded from Figma copy/paste) */
export function decodeHtmlEntities(input) {
  const s = typeof input === "string" ? input : "";
  if (!s) return "";
  if (typeof document === "undefined") return s; // safety (SSR)
  // Use textContent to avoid mXSS — textarea.innerHTML can mutate HTML
  const ta = document.createElement("textarea");
  ta.textContent = s;
  // Read back via innerHTML to decode entities safely
  const div = document.createElement("div");
  div.innerHTML = ta.textContent;
  return div.textContent || "";
}

/**
 * Remove Figma “figmeta” artifacts and sanitize to a small allowlist
 * (enough for your editor output: p/br/b/strong/i/em/u/ul/ol/li/a/blockquote).
 */
export function sanitizeRichHtml(input) {
  const raw = typeof input === "string" ? input : "";
  if (!raw.trim()) return "";

  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    // If DOMParser not available, at least strip obvious figmeta text
    return raw
      .replace(/\(figmeta\)[\s\S]*$/gi, "")
      .replace(/\(figma\)[\s\S]*$/gi, "")
      .replace(/\(figmeta\)/gi, "")
      .replace(/\(figma\)/gi, "")
      .trim();
  }

  // 1) decode entities first (handles copied content that’s been escaped)
  const decoded = decodeHtmlEntities(raw);

  // 2) parse into DOM
  const doc = new DOMParser().parseFromString(decoded, "text/html");
  const body = doc.body;

  // Remove Figma hidden spans
  body
    .querySelectorAll("span[data-metadata], span[data-buffer]")
    .forEach((n) => n.remove());

  // Remove unsafe tags
  body
    .querySelectorAll("script, style, iframe, object, embed")
    .forEach((n) => n.remove());

  // Remove figma tokens from text nodes
  const walker = doc.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    const t = node.nodeValue || "";
    if (!t) return;

    if (/(figmeta|figma)/i.test(t)) {
      node.nodeValue = t
        .replace(/\(figmeta\)[\s\S]*$/gi, "")
        .replace(/\(figma\)[\s\S]*$/gi, "")
        .replace(/\(figmeta\)/gi, "")
        .replace(/\(figma\)/gi, "");
    }
  });

  // Allowlist tags + safe attributes
  const ALLOWED = new Set([
    "p",
    "br",
    "b",
    "strong",
    "i",
    "em",
    "u",
    "ul",
    "ol",
    "li",
    "a",
    "blockquote",
    "div",
    "span",
  ]);

  const sanitizeElement = (el) => {
    if (!el || el.nodeType !== 1) return;

    // sanitize children first
    [...el.children].forEach(sanitizeElement);

    const tag = el.tagName.toLowerCase();

    // unwrap disallowed tags (keep inner content)
    if (!ALLOWED.has(tag)) {
      const parent = el.parentNode;
      if (!parent) return;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
      return;
    }

    // strip all attributes except safe href on links
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      if (tag === "a" && name === "href") return;
      el.removeAttribute(attr.name);
    });

    if (tag === "a") {
      const href = (el.getAttribute("href") || "").trim();

      // block javascript:, data:, vbscript: etc — only allow http(s) and anchors
      const ok =
        /^https?:\/\//i.test(href) || href.startsWith("#") || href === "";
      if (!ok) el.removeAttribute("href");
      // also block data: URIs that snuck through
      if (/^data:/i.test(href)) el.removeAttribute("href");

      // always open safe
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noreferrer noopener");
    }
  };

  [...body.children].forEach(sanitizeElement);

  // Remove empty wrappers commonly produced by editors
  body.querySelectorAll("p, div").forEach((n) => {
    const text = (n.textContent || "").replace(/\u00A0/g, " ").trim();
    if (!text && n.querySelectorAll("img, ul, ol, li, br").length === 0) {
      n.remove();
    }
  });

  return body.innerHTML.trim();
}

/** Convert rich HTML -> plain text (used for Role splitting) */
export function richHtmlToText(input) {
  const raw = typeof input === "string" ? input : "";
  if (!raw.trim()) return "";
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return decodeHtmlEntities(raw).replace(/\s+/g, " ").trim();
  }

  const decoded = decodeHtmlEntities(raw);
  const doc = new DOMParser().parseFromString(decoded, "text/html");
  const body = doc.body;

  body
    .querySelectorAll("span[data-metadata], span[data-buffer]")
    .forEach((n) => n.remove());

  // convert br to newline to preserve intent
  body.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));

  // list items -> newline
  body.querySelectorAll("li").forEach((li) => {
    li.insertBefore(doc.createTextNode("• "), li.firstChild);
    li.appendChild(doc.createTextNode("\n"));
  });

  const text = (body.textContent || "")
    .replace(/\u00A0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // final figmeta cleanup
  return text
    .replace(/\(figmeta\)[\s\S]*$/gi, "")
    .replace(/\(figma\)[\s\S]*$/gi, "")
    .replace(/\(figmeta\)/gi, "")
    .replace(/\(figma\)/gi, "")
    .trim();
}
