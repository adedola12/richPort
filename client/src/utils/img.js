export const isNonEmptyString = (v) =>
  typeof v === "string" && v.trim().length > 0;

export const normalizeImgSrc = (src) => {
  if (!isNonEmptyString(src)) return "";
  const s = src.trim();

  // allow data/blob/http(s)
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;

  // if you ever store relative paths, keep them working
  if (s.startsWith("/")) return s;

  return s;
};
