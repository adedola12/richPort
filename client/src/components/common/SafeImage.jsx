import React, { useEffect, useMemo, useState } from "react";
import { normalizeImgSrc } from "../../utils/img";

const SafeImage = ({
  src,
  fallbackSrc = "",
  alt = "image",
  className = "",
  imgClassName = "",
  loading = "lazy",
  draggable = false,
  onClick,
}) => {
  const [broken, setBroken] = useState(false);

  const primary = useMemo(() => normalizeImgSrc(src), [src]);
  const fallback = useMemo(() => normalizeImgSrc(fallbackSrc), [fallbackSrc]);

  useEffect(() => {
    setBroken(false); // reset when src changes
  }, [primary]);

  const finalSrc = !broken && primary ? primary : fallback;

  if (!finalSrc) {
    return (
      <div
        className={`rounded-3xl border border-white/10 bg-white/[0.03] p-10 ${className}`}
      >
        <p className="text-sm text-white/60">
          No image available.
        </p>
      </div>
    );
  }

  return (
    <img
      src={finalSrc}
      alt={alt}
      loading={loading}
      draggable={draggable}
      onClick={onClick}
      onError={() => setBroken(true)}
      className={imgClassName || className}
    />
  );
};

export default SafeImage;
