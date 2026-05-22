// src/components/admin/ProjectsTab.jsx
import React from "react";
import BrandProjectsTab from "./BrandProjectsTab.jsx";
import UIProjectsTab from "./UIProjectsTab.jsx";
import GraphicProjectsTab from "./GraphicProjectsTab.jsx";

function SegmentedTabs({ value, onChange }) {
  const tabs = [
    { key: "brand", label: "Brand Identity Design" },
    { key: "uiux", label: "Product UI/UX Designs" },
    { key: "web", label: "Websites Designs", disabled: true }, // later
    { key: "graphic", label: "Graphic Designs" }, // ✅ enabled now
  ];

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.key === value),
  );

  return (
    <div className="flex justify-center">
      {/* keeps Figma width + allows scroll on small screens */}
      <div className="w-full max-w-4xl overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-1 shadow-[0_28px_90px_rgba(0,0,0,0.55)]">
            {/* active pill */}
            <span
              className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-xl bg-white/10 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />

            <div className="relative flex items-center">
              {tabs.map((t) => {
                const isActive = t.key === value;
                const isDisabled = !!t.disabled;

                return (
                  <button
                    key={t.key}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => !isDisabled && onChange(t.key)}
                    className={[
                      "flex-1 h-10 rounded-xl px-3",
                      "text-[11px] sm:text-xs font-semibold whitespace-nowrap",
                      "transition-colors duration-200",
                      isDisabled
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-white/5",
                      isActive ? "text-white" : "text-white/65",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/40",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-2 text-xs text-white/55">
        This tab is coming soon.
      </p>
    </div>
  );
}

export default function ProjectsTab() {
  const [mode, setMode] = React.useState("uiux"); // "brand" | "uiux" | "web" | "graphic"

  return (
    <div className="space-y-8">
      {/* ✅ Figma-style segmented tabs */}
      <SegmentedTabs value={mode} onChange={setMode} />

      {/* ✅ Tab switch content */}
      {mode === "brand" ? (
        <BrandProjectsTab />
      ) : mode === "uiux" ? (
        <UIProjectsTab />
      ) : mode === "web" ? (
        <ComingSoon title="Websites Designs" />
      ) : (
        <GraphicProjectsTab />
      )}
    </div>
  );
}
