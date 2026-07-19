// src/components/admin/RatesTab.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Delete02Icon } from "hugeicons-react";
import { Button, Input, Textarea, Select, Label } from "../ui";

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
    // Capture the plan ID before state update to avoid stale closure
    const removedPlanId = plans[index]?.id;

    setPlans((prev) => prev.filter((_, i) => i !== index));

    // remove this plan from all deliverables
    if (removedPlanId) {
      setDeliverables((prev) =>
        prev.map((d) => {
          const updatedPerPlan = { ...d.perPlan };
          delete updatedPerPlan[removedPlanId];
          return { ...d, perPlan: updatedPerPlan };
        })
      );
    }
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
        <h2 className="text-lg font-semibold">Rate & Plans</h2>
        <p className="text-sm text-neutral-300 max-w-2xl">
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
              <Label>Category ID</Label>
              <Input
                name="categoryId"
                value={category.categoryId}
                onChange={handleCatChange}
                placeholder="brand-identity"
              />
            </div>
            <div>
              <Label>Label</Label>
              <Input
                name="label"
                value={category.label}
                onChange={handleCatChange}
                placeholder="Brand Identity"
              />
            </div>
          </div>

          <div>
            <Label>Heading</Label>
            <Input
              name="heading"
              value={category.heading}
              onChange={handleCatChange}
              placeholder="Brand Identity"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={category.description}
              onChange={handleCatChange}
              rows={3}
            />
          </div>

          <div>
            <Label>Tags (optional, comma separated)</Label>
            <Input
              name="tags"
              value={category.tags}
              onChange={handleCatChange}
              placeholder="Brand, Identity, Logo"
            />
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Plans</h3>
            <Button
              type="button"
              onClick={addPlan}
              variant="secondary"
              size="sm"
            >
              + Add Plan
            </Button>
          </div>

          <div className="space-y-3">
            {plans.map((plan, idx) => (
              <div
                key={plan.id}
                className="rounded-lg border border-white/10 bg-black/50 px-3 py-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-200">
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
                  <Input
                    value={plan.id}
                    onChange={(e) =>
                      updatePlan(idx, "id", e.target.value.trim())
                    }
                    className="px-3 py-2 text-sm rounded-lg"
                    placeholder="ID (gold)"
                  />
                  <Input
                    value={plan.name}
                    onChange={(e) => updatePlan(idx, "name", e.target.value)}
                    className="px-3 py-2 text-sm rounded-lg"
                    placeholder="Name (Gold)"
                  />
                  <Input
                    value={plan.price}
                    onChange={(e) => updatePlan(idx, "price", e.target.value)}
                    className="px-3 py-2 text-sm rounded-lg"
                    placeholder="Price (e.g. 299)"
                  />
                  <Input
                    value={plan.description}
                    onChange={(e) =>
                      updatePlan(idx, "description", e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg"
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
            <h3 className="text-sm font-semibold">
              Deliverables per Plan
            </h3>
            <Button
              type="button"
              onClick={addDeliverable}
              variant="secondary"
              size="sm"
            >
              + Add Deliverable
            </Button>
          </div>

          <div className="space-y-3">
            {deliverables.map((d, dIndex) => (
              <div
                key={d.id}
                className="rounded-lg border border-white/10 bg-black/50 px-3 py-3 space-y-2"
              >
                {/* Deliverable label */}
                <Input
                  value={d.label}
                  onChange={(e) =>
                    updateDeliverableLabel(dIndex, e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg mb-2"
                  placeholder="Deliverable name (e.g. Brand Guideline)"
                />

                {/* NEW: mode selector */}
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[11px] text-neutral-300">
                    Value type:
                  </span>
                  <Select
                    value={d.mode || "boolean"}
                    onChange={(e) =>
                      updateDeliverableMode(dIndex, e.target.value)
                    }
                    className="w-auto px-3 py-2 text-sm rounded-lg"
                  >
                    <option value="boolean">Checkbox (included / not)</option>
                    <option value="text">Text per plan</option>
                  </Select>
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
                                <Input
                                  type="text"
                                  className="w-full px-2 py-1 text-xs rounded-lg"
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

        <Button
          type="submit"
          disabled={status.type === "loading"}
          variant="primary"
          size="md"
          className="mt-2"
        >
          {status.type === "loading"
            ? "Saving..."
            : editingId
            ? "Update Rate Category"
            : "Save Rate Category"}
        </Button>

        {status.type !== "idle" && (
          <p
            className={`text-xs mt-2 ${
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
        <h3 className="text-sm font-semibold mb-3">
          Existing Rate Categories
        </h3>
        {existingCategories.length === 0 ? (
          <p className="text-xs text-neutral-400">
            No rate categories found yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
            <table className="min-w-full text-left text-xs">
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
                        <Button
                          type="button"
                          onClick={() => startEditing(cat)}
                          variant="secondary"
                          size="sm"
                        >
                          Edit
                        </Button>

                        <Button
                          type="button"
                          onClick={() =>
                            handleDeleteRateCategory(cat.mongoId || cat.id)
                          }
                          variant="danger"
                          size="sm"
                          title="Delete"
                        >
                          <Delete02Icon size={16} />
                        </Button>
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
