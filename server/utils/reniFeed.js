// server/utils/reniFeed.js
// Portfolio → Reni Design Studio auto-feed. On a completed brand-identity
// booking, inserts a client row + a LOGGED (inactive) job row into Reni's
// Supabase tables; the Reni app picks both up on its next sync and the
// project appears in the Design Studio pre-filled, waiting for the
// logged→active toggle.
//
// Required env (feed silently skips when missing — the booking flow never
// depends on it):
//   RENI_SUPABASE_URL          e.g. https://xxxx.supabase.co
//   RENI_SUPABASE_SERVICE_KEY  service_role key (Supabase dashboard → API)
//   RENI_USER_ID               the Reni account's auth user id

const PHASES_BRAND = [
  "Booking", "Payment", "Understanding the Brief", "Research",
  "Direction & Concept", "Design Assets", "First Deliverables",
  "Review", "Packaging", "Final Review", "Follow-Up",
];

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

export async function feedReniStudio({ planKey, plan, money, responses, invoiceNo }) {
  if (!reniConfigured()) return { fed: false, reason: "not configured" };

  const userId = process.env.RENI_USER_ID;
  const now = new Date().toISOString();
  const stamp = Date.now();
  const clientId = `pf-client-${stamp}`;
  const jobId = `pf-job-${stamp}`;
  const clientName =
    [responses.first_name, responses.last_name].filter(Boolean).join(" ") ||
    responses.brand_name || "Portfolio client";

  await insert("ds_clients", {
    id: clientId,
    user_id: userId,
    name: clientName,
    company: responses.brand_name || "",
    phone: responses.phone || "",
    email: responses.email || "",
    address: "",
  });

  const deliverables = plan.deliverables || [];
  await insert("ds_jobs", {
    id: jobId,
    user_id: userId,
    title: `${responses.brand_name || clientName} — ${plan.label} Brand Identity`,
    client_id: clientId,
    service_type: "Brand Identity Design",
    priority: "Medium",
    energy: "Medium Energy",
    deadline: "",
    type: "project",
    is_free: false,
    agreed_price: money.price,
    commitment_id: null,
    is_contract: true,
    brand_tier: plan.label,
    pipeline_stage: "Confirmed",
    deliverables,
    milestones: [
      { id: 1, name: `Deposit (70%) — Invoice ${invoiceNo}`, amount: money.deposit, dueDate: "", received: false },
      { id: 2, name: "Balance (30%) — on completion", amount: money.balance, dueDate: "", received: false },
    ],
    task_ids: [],
    planned_tasks: deliverables.map((d) => ({ title: d })),
    is_active: false, // logged, not active — the toggle in Reni starts the clock
    phases: PHASES_BRAND.map((name, i) => ({ id: i + 1, name })),
    current_phase_idx: 0,
    intake_meta: {
      source: "portfolio",
      invoiceNo,
      planKey,
      preferredDuration: Array.isArray(responses.duration) ? responses.duration.join(", ") : responses.duration || "",
      comm: Array.isArray(responses.comm) ? responses.comm.join(", ") : responses.comm || "",
      submittedAt: now,
    },
    created_at: now,
  });

  return { fed: true, jobId };
}
