// server/utils/reniFeed.js
// Portfolio → Reni Design Studio auto-feed. Every booking (brand identity,
// website, flyer — any future service) inserts a client row + a LOGGED
// (inactive) job row into Reni's Supabase tables; the Reni app picks both
// up on its next sync, pre-filled and waiting for the logged→active toggle.
//
// Required env (feed silently skips when missing — the booking flow never
// depends on it):
//   RENI_SUPABASE_URL          e.g. https://xxxx.supabase.co
//   RENI_SUPABASE_SERVICE_KEY  service_role key (Supabase dashboard → API)
//   RENI_USER_ID               the Reni account's auth user id

/* The agreed phase framework (mirrors Reni desktop, 2026-07-09):
   a phase is a journey stage, deliverables are the client's exit ticket,
   tasks are Richard's work. Booking arrives done — the booking that created
   this row IS phase 1. Money gates ("Payment received", "Balance received")
   tick themselves in Reni when milestones are marked received. */
const BRAND_TEMPLATE = [
  { name: "Booking", auto: true, tasks: [], deliverables: [] },
  { name: "Payment",
    tasks: ["Confirm the upfront payment", "Write and send the acknowledgment email with receipt"],
    deliverables: ["Payment received (upfront)", "Acknowledgment email + receipt sent"] },
  { name: "Understanding the Brief",
    tasks: ["Review the intake answers", "Draft the consolidated brief with the project roadmap", "Send the consolidated brief"],
    deliverables: ["Consolidated brief"] },
  { name: "Research & Direction",
    tasks: ["Gather inspiration and references", "Curate the moodboard", "Send the moodboard to the client"],
    deliverables: ["Moodboard", "Direction confirmed by client"] },
  { name: "Design",
    tasks: ["Design the logo", "Build the color palette", "Set the typography system", "Create the brand pattern"],
    deliverables: ["Logo", "Color palette", "Typography system", "Brand pattern"] },
  { name: "Presentation",
    tasks: ["Assemble the first delivery presentation", "Send the presentation"],
    deliverables: ["First deliverables presentation"] },
  { name: "Review & Refinement",
    tasks: ["Collect client feedback", "Apply revisions"],
    deliverables: ["Revised assets", "Client approval"] },
  { name: "Packaging",
    tasks: ["Prepare the brand guidelines document", "Export and organize all file formats"],
    deliverables: ["Brand guidelines (PDF)", "Final files (all formats)"] },
  { name: "Final Delivery & Payment",
    tasks: ["Send the final handover package", "Confirm the balance payment", "Send the balance receipt"],
    deliverables: ["Final handover package", "Balance received", "Balance receipt sent"] },
  { name: "Follow-Up",
    tasks: ["Check in with the client", "Ask for a testimonial"],
    deliverables: ["Follow-up done + testimonial asked"] },
];

/* Build the full plan for a brand booking: framework phases/deliverables/
   tasks plus the plan's tier items, dropped into the phase where that work
   happens (docs → Packaging, design work → Design). When the client picked
   specific merch designs on the form, the tier's generic "N Merch Designs"
   line is replaced by one named deliverable per pick. */
function buildBrandPlan(tierDeliverables = [], merchPicks = []) {
  const phases = BRAND_TEMPLATE.map((p, i) => ({ id: i + 1, name: p.name, ...(p.auto ? { done: true } : {}) }));
  const deliverables = [];
  const plannedTasks = [];
  BRAND_TEMPLATE.forEach((p, i) => {
    const phaseId = i + 1;
    p.deliverables.forEach((text, di) => deliverables.push({ id: `p${phaseId}d${di + 1}`, text, phaseId, done: false }));
    p.tasks.forEach((title) => plannedTasks.push({ title, phaseId }));
  });
  const covered = new Set(deliverables.map((d) => d.text.toLowerCase()));
  const byName = (n) => phases.find((p) => p.name === n)?.id ?? null;
  const picks = (Array.isArray(merchPicks) ? merchPicks : []).map((m) => String(m).trim()).filter(Boolean);
  tierDeliverables
    .filter((text) => text && !covered.has(String(text).toLowerCase()))
    .filter((text) => !(picks.length && /^\d+\s*merch/i.test(String(text).trim())))
    .forEach((text, i) => {
      const phaseId = /(guideline|style guide|strategy|handoff|final file)/i.test(text) ? byName("Packaging") : byName("Design");
      deliverables.push({ id: `t${i + 1}`, text, phaseId, done: false });
    });
  picks.forEach((m, i) => {
    deliverables.push({ id: `m${i + 1}`, text: `Merch: ${m}`, phaseId: byName("Design"), done: false });
  });
  return { phases, deliverables, plannedTasks };
}

export function reniConfigured() {
  return Boolean(
    process.env.RENI_SUPABASE_URL &&
    process.env.RENI_SUPABASE_SERVICE_KEY &&
    process.env.RENI_USER_ID
  );
}

/* Insert with missing-column resilience: Reni's sync auto-creates columns
   over time, so if this hits a column PostgREST doesn't know yet, drop
   that field and retry rather than losing the whole row. */
async function insert(table, row) {
  const base = process.env.RENI_SUPABASE_URL.replace(/\/+$/, "");
  const key = process.env.RENI_SUPABASE_SERVICE_KEY;
  let payload = { ...row };
  for (let attempt = 0; attempt < 10; attempt++) {
    const res = await fetch(`${base}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([payload]),
    });
    if (res.ok) return;
    const text = await res.text();
    const missing = text.match(/Could not find the '([^']+)' column/);
    if (missing && missing[1] in payload) {
      delete payload[missing[1]];
      continue;
    }
    throw new Error(`${table} insert failed: ${res.status} ${text}`);
  }
  throw new Error(`${table} insert failed: too many missing columns`);
}

/* Generic job feed — every service booking funnels through this. */
export async function feedReniJob({
  title,
  serviceType,
  type = "project",
  price = 0,
  deposit = null,
  balance = null,
  invoiceNo = "",
  deadline = "",
  deliverables = [],
  plannedTasks = null,
  phases = [],
  client = {}, // { name, company, phone, email }
  meta = {},
}) {
  if (!reniConfigured()) return { fed: false, reason: "not configured" };

  const userId = process.env.RENI_USER_ID;
  const now = new Date().toISOString();
  const stamp = Date.now();
  const clientId = `pf-client-${stamp}`;
  const jobId = `pf-job-${stamp}`;

  await insert("ds_clients", {
    id: clientId,
    user_id: userId,
    name: client.name || "Portfolio client",
    company: client.company || "",
    phone: client.phone || "",
    email: client.email || "",
    address: "",
  });

  // milestones: 70/30 split when a deposit is known; single full-payment
  // milestone when only a price is known; none for custom quotes
  const milestones =
    deposit != null
      ? [
          { id: 1, name: `Deposit (70%)${invoiceNo ? ` — Invoice ${invoiceNo}` : ""}`, amount: deposit, dueDate: "", received: false },
          { id: 2, name: "Balance (30%) — on completion", amount: balance ?? Math.max(0, price - deposit), dueDate: "", received: false },
        ]
      : price > 0
      ? [{ id: 1, name: `Full payment${invoiceNo ? ` — ${invoiceNo}` : ""}`, amount: price, dueDate: "", received: false }]
      : [];

  await insert("ds_jobs", {
    id: jobId,
    user_id: userId,
    title,
    client_id: clientId,
    service_type: serviceType,
    priority: "Medium",
    energy: "Medium Energy",
    deadline: deadline || null, // date column — empty string is rejected
    type,
    is_free: false,
    agreed_price: price,
    commitment_id: null,
    is_contract: true,
    brand_tier: meta.planLabel || "",
    pipeline_stage: "Confirmed",
    deliverables,
    milestones,
    task_ids: [],
    planned_tasks: plannedTasks ?? deliverables.map((d) => (typeof d === "string" ? { title: d } : { title: d.text })),
    is_active: false, // logged, not active — the toggle in Reni starts the clock
    phases,
    current_phase_idx: phases.length && phases[0]?.done ? 1 : 0,
    intake_meta: { submittedAt: now, ...meta },
    created_at: now,
  });

  return { fed: true, jobId };
}

/* Brand-identity bookings (the /api/questionnaire flow) */
export async function feedReniStudio({ planKey, plan, money, responses, invoiceNo, discount = null }) {
  const clientName =
    [responses.first_name, responses.last_name].filter(Boolean).join(" ") ||
    responses.brand_name || "Portfolio client";
  return feedReniJob({
    title: `${responses.brand_name || clientName} — ${plan.label} Brand Identity`,
    serviceType: "Brand Identity Design",
    type: "project",
    price: money.price,
    deposit: money.deposit,
    balance: money.balance,
    invoiceNo,
    ...(() => {
      const bp = buildBrandPlan(plan.deliverables || [], responses.merch_designs);
      return { deliverables: bp.deliverables, phases: bp.phases, plannedTasks: bp.plannedTasks };
    })(),
    client: {
      name: clientName,
      company: responses.brand_name || "",
      phone: responses.phone || "",
      email: responses.email || "",
    },
    meta: {
      source: "portfolio-brand",
      invoiceNo,
      planKey,
      planLabel: plan.label,
      ...(discount ? { basePrice: discount.basePrice, discountLabel: discount.label, discountAmount: discount.amount, discountCode: discount.code } : {}),
      merchDesigns: Array.isArray(responses.merch_designs) ? responses.merch_designs.join(", ") : responses.merch_designs || "",
      preferredDuration: Array.isArray(responses.duration) ? responses.duration.join(", ") : responses.duration || "",
      comm: Array.isArray(responses.comm) ? responses.comm.join(", ") : responses.comm || "",
      aboutBusiness: responses.business_about || "",
      targetAudience: responses.audience || "",
      brandValues: responses.values || "",
      nameStory: responses.name_story || "",
      brandVision: responses.brand_vision || "",
      desiredPerception: responses.perception || "",
      goals: responses.goals_short || "",
    },
  });
}

/* Website bookings (the /api/website-requests flow) */
export function feedReniWebsite({ doc, plan }) {
  return feedReniJob({
    title: `${doc.brand || doc.name} — ${plan.label} Website`,
    serviceType: "Website Design",
    type: "project",
    price: doc.priceNGN,
    deposit: doc.deposit,
    balance: doc.balance,
    invoiceNo: doc.invoiceNo,
    deliverables: plan.deliverables || [],
    client: { name: doc.name, company: doc.brand || "", phone: doc.phone || "", email: doc.email },
    meta: {
      source: "portfolio-website",
      invoiceNo: doc.invoiceNo,
      planKey: doc.plan,
      planLabel: plan.label,
      pages: doc.pages,
      features: doc.features,
      contentStatus: doc.contentStatus,
      domainStatus: doc.domainStatus,
      preferredDuration: doc.duration,
      aboutBusiness: doc.about,
      references: doc.references,
      extraNotes: doc.notes,
    },
  });
}

/* Flyer bookings (the /api/flyer-requests flow) */
export function feedReniFlyer({ doc, plan }) {
  const n = plan.designs;
  const who = doc.brand || doc.name;
  const plannedTasks = n
    ? Array.from({ length: n }, (_, i) => ({
        title: n === 1 ? `Flyer design — ${who}` : `Flyer ${i + 1}/${n} — ${who}`,
      }))
    : [{ title: `Scope event flyer campaign — ${who}` }];
  return feedReniJob({
    title: `${who} — ${plan.label}`,
    serviceType: "Flyer Design",
    type: n === 1 ? "oneoff" : "project",
    price: doc.priceNGN || 0,
    deadline: doc.deadline || "",
    plannedTasks,
    client: { name: doc.name, company: doc.brand || "", phone: doc.phone || "", email: doc.email },
    meta: {
      source: "portfolio-flyer",
      planKey: doc.plan,
      planLabel: plan.label,
      purpose: doc.purpose,
      headline: doc.headline,
      subtitle: doc.subtitle,
      bodyText: doc.bodyText,
      eventDetails: doc.eventDetails,
      breakdown: doc.breakdown,
      references: doc.references,
    },
  });
}
