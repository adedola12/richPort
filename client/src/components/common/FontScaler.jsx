// src/components/common/FontScaler.jsx
import React, { useCallback, useEffect, useState } from "react";

const DEFAULT_SIZE = 20; // must match index.css html { font-size }
const MIN_SIZE = 14;
const MAX_SIZE = 28;
const STORAGE_KEY = "adlm-font-size";

const FontScaler = () => {
  const [size, setSize] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? Number(saved) : DEFAULT_SIZE;
    } catch {
      return DEFAULT_SIZE;
    }
  });

  // Apply to document root whenever size changes
  useEffect(() => {
    document.documentElement.style.fontSize = `${size}px`;
    try {
      localStorage.setItem(STORAGE_KEY, String(size));
    } catch {
      // ignore storage errors
    }
  }, [size]);

  const increase = useCallback(() => {
    setSize((prev) => Math.min(prev + 1, MAX_SIZE));
  }, []);

  const decrease = useCallback(() => {
    setSize((prev) => Math.max(prev - 1, MIN_SIZE));
  }, []);

  const reset = useCallback(() => {
    setSize(DEFAULT_SIZE);
  }, []);

  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-1
        rounded-full
        border border-white/20
        bg-black/80 backdrop-blur-md
        px-2 py-1.5
        shadow-[0_4px_24px_rgba(0,0,0,0.6)]
      "
      style={{ fontSize: "16px" }} /* fixed size so it doesn't scale itself */
    >
      {/* Decrease */}
      <button
        type="button"
        onClick={decrease}
        disabled={size <= MIN_SIZE}
        className="
          flex h-8 w-8 items-center justify-center
          rounded-full text-white/80
          hover:bg-white/10 hover:text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          transition text-sm font-bold
        "
        title="Decrease font size"
      >
        A-
      </button>

      {/* Current size indicator */}
      <span
        className="
          min-w-[36px] text-center
          text-[11px] font-medium text-white/60
          select-none
        "
      >
        {size}px
      </span>

      {/* Increase */}
      <button
        type="button"
        onClick={increase}
        disabled={size >= MAX_SIZE}
        className="
          flex h-8 w-8 items-center justify-center
          rounded-full text-white/80
          hover:bg-white/10 hover:text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          transition text-sm font-bold
        "
        title="Increase font size"
      >
        A+
      </button>

      {/* Reset */}
      {size !== DEFAULT_SIZE && (
        <button
          type="button"
          onClick={reset}
          className="
            ml-0.5 flex h-7 items-center justify-center
            rounded-full px-2
            text-[10px] font-medium text-lime-400
            hover:bg-lime-400/10
            transition
          "
          title="Reset to default"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default FontScaler;
