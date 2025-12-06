// src/components/admin/RatesTab.jsx
import React, { useState } from "react";

const RATES_API = import.meta.env.VITE_ADMIN_RATES_ENDPOINT || "";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const RatesTab = () => {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [category, setCategory] = useState({
    categoryId: "",
    label: "",
    heading: "",
    description: "",
    tags: "",
  });
  const [plans, setPlans] = useState([
    { id: "plan-1", name: "", price: "", currency: "USD", description: "" },
  ]);
  const [deliverables, setDeliverables] = useState([]);

  const handleCatChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const updatePlan = (index, field, value) => {
    setPlans((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const addPlan = () => {
    setPlans((prev) => [
      ...prev,
      {
        id: `plan-${prev.length + 1}`,
        name: "",
        price: "",
        currency: "USD",
        description: "",
      },
    ]);
  };

  const removePlan = (index) => {
    setPlans((prev) => prev.filter((_, i) => i !== index));
    setDeliverables((prev) =>
      prev.map((d) => {
        const updated = { ...d.perPlan };
        const removedPlanId = plans[index]?.id;
        if (removedPlanId) delete updated[removedPlanId];
        return { ...d, perPlan: updated };
      })
    );
  };

  const addDeliverable = () => {
    setDeliverables((prev) => [
      ...prev,
      { id: `deliv-${prev.length + 1}`, label: "", perPlan: {} },
    ]);
  };

  const updateDeliverableLabel = (index, value) => {
    setDeliverables((prev) =>
      prev.map((d, i) => (i === index ? { ...d, label: value } : d))
    );
  };

  const updateDeliverableValue = (dIndex, planId, value) => {
    setDeliverables((prev) =>
      prev.map((d, i) =>
        i === dIndex ? { ...d, perPlan: { ...d.perPlan, [planId]: value } } : d
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Saving rate category..." });

    const payload = {
      id: category.categoryId || slugify(category.label || category.heading),
      label: category.label || category.heading,
      heading: category.heading,
      description: category.description,
      tags: category.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      plans: plans.map((p) => ({
        ...p,
        price: Number(p.price || 0),
        isFeatured: false, // you can add this to the UI later
      })),
      deliverables: deliverables.map((d) => ({
        id: d.id || slugify(d.label),
        label: d.label,
        perPlan: d.perPlan,
      })),
    };

    try {
      if (!RATES_API) {
        console.log("Admin rates payload:", payload);
        await new Promise((res) => setTimeout(res, 700));
        setStatus({
          type: "success",
          message:
            "Rates saved locally. Once RATES_API is set, they’ll sync to backend.",
        });
        return;
      }

      const res = await fetch(RATES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Rate category saved successfully ✅",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to save rate category. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold font-['Mont']">Rate & Plans</h2>
      <p className="text-sm text-neutral-300 font-['Lexend'] max-w-2xl">
        Configure rate categories, plans and deliverables. This data feeds the
        Rate Card page (categories, plans and the comparison table).
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category meta */}
        <div className="space-y-3">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Category ID
              </label>
              <input
                name="categoryId"
                value={category.categoryId}
                onChange={handleCatChange}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="brand-identity"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 font-semibold font-['Mont']">
                Label
              </label>
              <input
                name="label"
                value={category.label}
                onChange={handleCatChange}
                className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                placeholder="Brand Identity"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Heading
            </label>
            <input
              name="heading"
              value={category.heading}
              onChange={handleCatChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Brand Identity"
            />
          </div>

          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Description
            </label>
            <textarea
              name="description"
              value={category.description}
              onChange={handleCatChange}
              rows={3}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs mb-1 font-semibold font-['Mont']">
              Tags (optional, comma separated)
            </label>
            <input
              name="tags"
              value={category.tags}
              onChange={handleCatChange}
              className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400/70"
              placeholder="Brand, Identity, Logo"
            />
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold font-['Mont']">Plans</h3>
            <button
              type="button"
              onClick={addPlan}
              className="text-xs px-3 py-1 rounded-md bg-white/5 border border-white/15 hover:bg-white/10 transition"
            >
              + Add Plan
            </button>
          </div>

          <div className="space-y-3">
            {plans.map((plan, idx) => (
              <div
                key={plan.id}
                className="rounded-lg border border-white/10 bg-black/50 px-3 py-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold font-['Mont'] text-neutral-200">
                    Plan #{idx + 1}
                  </span>
                  {plans.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePlan(idx)}
                      className="text-[11px] text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid gap-2 md:grid-cols-4">
                  <input
                    value={plan.id}
                    onChange={(e) =>
                      updatePlan(idx, "id", e.target.value.trim())
                    }
                    className="rounded-md bg-black/70 border border-white/10 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                    placeholder="ID (gold)"
                  />
                  <input
                    value={plan.name}
                    onChange={(e) => updatePlan(idx, "name", e.target.value)}
                    className="rounded-md bg-black/70 border border-white/10 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                    placeholder="Name (Gold)"
                  />
                  <input
                    value={plan.price}
                    onChange={(e) => updatePlan(idx, "price", e.target.value)}
                    className="rounded-md bg-black/70 border border-white/10 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                    placeholder="Price (e.g. 299)"
                  />
                  <input
                    value={plan.description}
                    onChange={(e) =>
                      updatePlan(idx, "description", e.target.value)
                    }
                    className="rounded-md bg-black/70 border border-white/10 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                    placeholder="Short description"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold font-['Mont']">
              Deliverables per Plan
            </h3>
            <button
              type="button"
              onClick={addDeliverable}
              className="text-xs px-3 py-1 rounded-md bg-white/5 border border-white/15 hover:bg-white/10 transition"
            >
              + Add Deliverable
            </button>
          </div>

          <div className="space-y-3">
            {deliverables.map((d, dIndex) => (
              <div
                key={d.id}
                className="rounded-lg border border-white/10 bg-black/50 px-3 py-3 space-y-2"
              >
                <input
                  value={d.label}
                  onChange={(e) =>
                    updateDeliverableLabel(dIndex, e.target.value)
                  }
                  className="w-full rounded-md bg-black/70 border border-white/10 px-2 py-1.5 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                  placeholder="Deliverable name (e.g. Brand Guideline)"
                />

                {plans.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-x-2 text-[11px]">
                      <thead>
                        <tr>
                          {plans.map((p) => (
                            <th
                              key={p.id}
                              className="text-left text-neutral-300 pb-1"
                            >
                              {p.name || p.id}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {plans.map((p) => (
                            <td key={p.id} className="pr-2">
                              <input
                                value={d.perPlan[p.id] || ""}
                                onChange={(e) =>
                                  updateDeliverableValue(
                                    dIndex,
                                    p.id,
                                    e.target.value
                                  )
                                }
                                className="w-full rounded-md bg-black/70 border border-white/10 px-2 py-1.5 text-[11px] focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                                placeholder="check, -, 2, etc."
                              />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={status.type === "loading"}
          className="
            mt-2 inline-flex items-center justify-center rounded-md
            bg-gradient-to-b from-lime-400 to-lime-600
            px-6 py-2.5 text-sm font-semibold text-black font-['Mont']
            shadow-[0_18px_60px_rgba(132,204,22,0.7)]
            hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {status.type === "loading" ? "Saving..." : "Save Rate Category"}
        </button>

        {status.type !== "idle" && (
          <p
            className={`text-xs mt-2 font-['Mont'] ${
              status.type === "error"
                ? "text-red-400"
                : status.type === "success"
                ? "text-lime-400"
                : "text-neutral-300"
            }`}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default RatesTab;
