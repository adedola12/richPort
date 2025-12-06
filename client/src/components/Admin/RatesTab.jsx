// src/components/admin/RatesTab.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_AUTH_ENDPOINT || "";
const RATES_API = API_BASE ? `${API_BASE}/api/rates/admin` : "";


const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const RatesTab = () => {
  const { authFetch } = useAuth();

  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [existingCategories, setExistingCategories] = useState([]);

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

  // deliverables: perPlan now boolean => { [planId]: true/false }
  const [deliverables, setDeliverables] = useState([]);

  // Load existing rate categories
  useEffect(() => {
    const fetchRates = async () => {
      if (!RATES_API) {
        setExistingCategories([]);
        return;
      }

      try {
        const res = await authFetch(RATES_API); // 👈 use authFetch
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data = await res.json();
        setExistingCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRates();
  }, [authFetch]); // 👈 include authFetch in deps

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

    // remove this plan from all deliverables
    setDeliverables((prev) =>
      prev.map((d) => {
        const updatedPerPlan = { ...d.perPlan };
        const removedPlanId = plans[index]?.id;
        if (removedPlanId) delete updatedPerPlan[removedPlanId];
        return { ...d, perPlan: updatedPerPlan };
      })
    );
  };

  const addDeliverable = () => {
    setDeliverables((prev) => [
      ...prev,
      {
        id: `deliv-${prev.length + 1}`,
        label: "",
        mode: "boolean", // 👈 new
        perPlan: {},
      },
    ]);
  };

const updateDeliverableLabel = (index, value) => {
  setDeliverables((prev) =>
    prev.map((d, i) => (i === index ? { ...d, label: value } : d))
  );
};

// NEW: change mode for a row
const updateDeliverableMode = (index, mode) => {
  setDeliverables((prev) =>
    prev.map((d, i) => (i === index ? { ...d, mode } : d))
  );
};

// Checkbox toggle for boolean deliverables
const toggleDeliverablePlan = (dIndex, planId, checked) => {
  setDeliverables((prev) =>
    prev.map((d, i) =>
      i === dIndex ? { ...d, perPlan: { ...d.perPlan, [planId]: checked } } : d
    )
  );
};

// NEW: text value for text deliverables
const updateDeliverablePlanText = (dIndex, planId, value) => {
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
      id:
        category.categoryId ||
        slugify(category.label || category.heading || "category"),
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
        isFeatured: false,
      })),
      deliverables: deliverables.map((d) => ({
        id: d.id || slugify(d.label),
        label: d.label,
        mode: d.mode || "boolean", // 👈 new
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
            "Rates saved locally (no RATES_API set). Check console payload.",
        });
        return;
      }

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${RATES_API}/${editingId}` : RATES_API;

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setStatus({
        type: "success",
        message: "Rate category saved successfully ✅",
      });

      // reload list
      // reload list (protected admin endpoint)
      const listRes = await authFetch(RATES_API);
      if (!listRes.ok) throw new Error("Failed to reload rate categories");
      const listData = await listRes.json();

      setExistingCategories(Array.isArray(listData) ? listData : []);

      if (!editingId) {
        setCategory({
          categoryId: "",
          label: "",
          heading: "",
          description: "",
          tags: "",
        });
        setPlans([
          {
            id: "plan-1",
            name: "",
            price: "",
            currency: "USD",
            description: "",
          },
        ]);
        setDeliverables([]);
      }
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to save rate category. Please try again.",
      });
    }
  };

  const startEditing = (cat) => {
    // setEditingId(cat.id || cat._id || null);
    setEditingId(cat.mongoId || cat._id || null); // 👈 use mongoId

    setCategory({
      categoryId: cat.id || "",
      label: cat.label || "",
      heading: cat.heading || "",
      description: cat.description || "",
      tags: Array.isArray(cat.tags) ? cat.tags.join(", ") : "",
    });

    setPlans(
      Array.isArray(cat.plans) && cat.plans.length > 0
        ? cat.plans.map((p) => ({
            id: p.id || slugify(p.name || "plan"),
            name: p.name || "",
            price: p.price?.toString?.() || "",
            currency: p.currency || "USD",
            description: p.description || "",
          }))
        : [
            {
              id: "plan-1",
              name: "",
              price: "",
              currency: "USD",
              description: "",
            },
          ]
    );

setDeliverables(
  Array.isArray(cat.deliverables)
    ? cat.deliverables.map((d, idx) => ({
        id: d.id || `deliv-${idx + 1}`,
        label: d.label || "",
        mode: d.mode || "boolean", // 👈 new
        perPlan: d.perPlan || {},
      }))
    : []
);


    setStatus({ type: "idle", message: "" });
  };

  const handleDeleteRateCategory = async (catId) => {
    if (!RATES_API) return;

    const id = catId; // this is mongoId
    const confirmDelete = window.confirm("Delete this rate category?");
    if (!confirmDelete) return;

    try {
      const res = await authFetch(`${RATES_API}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete rate category");

      setExistingCategories((prev) => prev.filter((cat) => cat.mongoId !== id));

      if (editingId === id) {
        setEditingId(null);
        // reset form...
        setCategory({
          categoryId: "",
          label: "",
          heading: "",
          description: "",
          tags: "",
        });
        setPlans([
          {
            id: "plan-1",
            name: "",
            price: "",
            currency: "USD",
            description: "",
          },
        ]);
        setDeliverables([]);
      }

      setStatus({
        type: "success",
        message: "Rate category deleted ✅",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to delete rate category. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold font-['Mont']">Rate & Plans</h2>
        <p className="text-sm text-neutral-300 font-['Lexend'] max-w-2xl">
          Configure rate categories, plans and deliverables. This data feeds the
          Rate Card page (categories, plans and the comparison table). Use the
          checkboxes to mark which deliverables belong to each plan.
        </p>
      </div>

      {/* FORM */}
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

        {/* Deliverables with checkboxes */}
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
                {/* Deliverable label */}
                <input
                  value={d.label}
                  onChange={(e) =>
                    updateDeliverableLabel(dIndex, e.target.value)
                  }
                  className="w-full rounded-md bg-black/70 border border-white/10 px-2 py-1.5 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                  placeholder="Deliverable name (e.g. Brand Guideline)"
                />

                {/* NEW: mode selector */}
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[11px] text-neutral-300 font-['Mont']">
                    Value type:
                  </span>
                  <select
                    value={d.mode || "boolean"}
                    onChange={(e) =>
                      updateDeliverableMode(dIndex, e.target.value)
                    }
                    className="rounded-md bg-black/70 border border-white/15 px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                  >
                    <option value="boolean">Checkbox (included / not)</option>
                    <option value="text">Text per plan</option>
                  </select>
                </div>

                {/* Per-plan values */}
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
                              {(d.mode || "boolean") === "boolean" ? (
                                // Checkbox mode
                                <label className="inline-flex items-center gap-1 text-[11px] text-neutral-200">
                                  <input
                                    type="checkbox"
                                    className="h-3 w-3 rounded border-white/40 bg-black/80"
                                    checked={!!d.perPlan[p.id]}
                                    onChange={(e) =>
                                      toggleDeliverablePlan(
                                        dIndex,
                                        p.id,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <span>Included</span>
                                </label>
                              ) : (
                                // Text mode
                                <input
                                  type="text"
                                  className="w-full rounded-md bg-black/70 border border-white/15 px-2 py-1 text-[11px] focus:outline-none focus:ring-1 focus:ring-lime-400/70"
                                  placeholder="-"
                                  value={d.perPlan[p.id] || ""}
                                  onChange={(e) =>
                                    updateDeliverablePlanText(
                                      dIndex,
                                      p.id,
                                      e.target.value
                                    )
                                  }
                                />
                              )}
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
          {status.type === "loading"
            ? "Saving..."
            : editingId
            ? "Update Rate Category"
            : "Save Rate Category"}
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

      {/* EXISTING RATE CATEGORIES */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-sm font-semibold font-['Mont'] mb-3">
          Existing Rate Categories
        </h3>
        {existingCategories.length === 0 ? (
          <p className="text-xs text-neutral-400 font-['Lexend']">
            No rate categories found yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
            <table className="min-w-full text-left text-xs font-['Lexend']">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Label
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Heading
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Plans
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Deliverables
                  </th>
                  <th className="px-3 py-2 font-semibold text-neutral-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {existingCategories.map((cat) => (
                  <tr
                    key={cat.id || cat._id || cat.heading}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="px-3 py-2">{cat.label}</td>
                    <td className="px-3 py-2">{cat.heading}</td>
                    <td className="px-3 py-2">
                      {Array.isArray(cat.plans) ? cat.plans.length : 0}
                    </td>
                    <td className="px-3 py-2">
                      {Array.isArray(cat.deliverables)
                        ? cat.deliverables.length
                        : 0}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEditing(cat)}
                          className="text-[11px] px-3 py-1 rounded-md bg-white/10 border border-white/20 hover:bg-white/20"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteRateCategory(cat.mongoId || cat.id)
                          }
                          className="p-1.5 rounded-md border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                          title="Delete"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatesTab;
