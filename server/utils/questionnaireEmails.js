// Email builders for questionnaire bookings — ported from book-a-plan.html.
// Intentionally email-client-safe: inline styles, table-based layout, LIGHT
// background (dark-theme emails render unreliably across clients).
import { OWNER, PLANS, DEPOSIT_PCT, formatNGN as N } from "../config/plans.js";

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const fmt = (v) => (Array.isArray(v) ? v.join(", ") : v ?? "");

const today = () =>
  new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const LABELS = {
  first_name: "First name", last_name: "Last name", email: "Email", phone: "Phone / WhatsApp",
  brand_name: "Brand / business name", business_about: "About the business", focus: "Business focus",
  service_areas: "Service areas", trust_signals: "Certifications / trust signals",
  peculiarity: "What makes the firm different", goals_short: "Short-term goals", goals_long: "Long-term goals",
  audience: "Target audience", values: "Brand values & mission", perception: "Desired perception",
  aesthetic: "Design aesthetic", colors: "Colour preferences", existing_logo: "Existing logo",
  inspiration: "Brands admired", avoid: "Things to avoid", competitors: "Competitors", tagline: "Tagline",
  name_story: "Idea behind the name", brand_vision: "Vision for the brand & logo", personality: "Brand personality",
  site_purpose: "Website purpose", site_actions: "Visitor actions", specialty_page: "Specialty page focus",
  content_status: "Content readiness", photos: "Project photos", site_refs: "Reference websites",
  features: "Website features", domain_1: "Domain — 1st choice", domain_2: "Domain — 2nd choice",
  domain_3: "Domain — 3rd choice", social_active: "Active social platforms",
  social_platforms: "Audience platforms", social_content: "Social designs should promote",
  social_tone: "Tone of voice", social_refs: "Admired accounts", duration: "Preferred project duration",
  comm: "Communication channels", updates: "Update frequency", approver: "Reviewer / approver",
  anything_else: "Anything else",
};

export const QUESTION_KEYS = Object.keys(LABELS);

const SECTIONS = [
  ["About You & Your Business", "about", ["first_name", "last_name", "email", "phone", "brand_name", "business_about", "focus", "service_areas", "trust_signals", "peculiarity", "goals_short", "goals_long"]],
  ["Brand Identity", "brand", ["name_story", "audience", "values", "brand_vision", "perception", "personality", "aesthetic", "colors", "existing_logo", "inspiration", "avoid", "competitors", "tagline"]],
  ["Your Website", "website", ["site_purpose", "site_actions", "specialty_page", "content_status", "photos", "site_refs", "features", "domain_1", "domain_2", "domain_3"]],
  ["Social Media", "social", ["social_active", "social_platforms", "social_content", "social_tone", "social_refs"]],
  ["Working Together", "working", ["duration", "comm", "updates", "approver", "anything_else"]],
];

const clientName = (data) =>
  [data.first_name, data.last_name].filter(Boolean).join(" ") || data.brand_name;

/* ---------------- invoice ---------------- */
export function buildInvoiceHTML(data, meta) {
  const plan = PLANS[meta.plan_key];
  const G = "#5e8c00", D = "#1a1f12";
  const banks = OWNER.banks
    .map(
      (b) =>
        `<td style="padding:10px 14px;border:1px solid #dfe6d2;border-radius:8px;font-size:13px;line-height:1.7;">
      <b style="color:${G};">${b.bank}</b><br>${b.name}<br>Acc. No: <b>${b.acc}</b></td>`
    )
    .join('<td style="width:12px;"></td>');
  return `
  <div style="border:2px solid ${G};border-radius:12px;padding:26px;margin:18px 0;background:#fbfdf7;">
    <table width="100%" style="border-collapse:collapse;"><tr>
      <td><div style="font-size:24px;font-weight:800;color:${D};">INVOICE</div>
          <div style="font-size:12px;color:#777;">Invoice No: <b style="color:${G};">${meta.invoice_no}</b> • ${today()}</div></td>
      <td align="right" style="font-size:13px;color:#555;line-height:1.6;">
        <b style="color:${D};">${OWNER.fullName}</b><br>${OWNER.title}<br>${OWNER.email}</td>
    </tr></table>
    <div style="font-size:12px;color:#777;margin-top:16px;">Invoice to:</div>
    <div style="font-size:16px;font-weight:700;color:${D};">${esc(clientName(data))}</div>
    <div style="font-size:13px;color:#555;">${esc(data.brand_name)} • ${esc(data.phone)} • ${esc(data.email)}</div>

    <table width="100%" style="border-collapse:collapse;margin-top:18px;">
      <tr style="background:${D};color:#fff;">
        <th align="left" style="padding:10px 14px;font-size:12px;border-radius:8px 0 0 0;">Description</th>
        <th align="right" style="padding:10px 14px;font-size:12px;border-radius:0 8px 0 0;">Amount</th></tr>
      <tr><td style="padding:12px 14px;border:1px solid #dfe6d2;font-size:13.5px;">
        <b>Brand Identity Design${plan.website ? " + Website" : ""} — ${meta.plan} Package</b><br>
        <span style="font-size:12px;color:#666;">Includes: ${plan.deliverables.join("; ")}.</span></td>
        <td align="right" style="padding:12px 14px;border:1px solid #dfe6d2;font-weight:700;">${N(meta.discount_amount ? meta.base_price : meta.price)}</td></tr>
      ${meta.discount_amount ? `<tr><td align="right" style="padding:6px 14px;font-size:13px;color:#2e7d32;">${meta.discount_label || "Discount"}</td>
        <td align="right" style="padding:6px 14px;font-weight:700;color:#2e7d32;">− ${N(meta.discount_amount)}</td></tr>` : ""}
      ${plan.website ? `<tr><td style="padding:12px 14px;border:1px solid #dfe6d2;font-size:13.5px;">
        <b>Website Hosting &amp; Domain Name</b><br><span style="font-size:12px;color:#666;">Paid directly by the Client to providers; accounts created under the Client's own credentials.</span></td>
        <td align="right" style="padding:12px 14px;border:1px solid #dfe6d2;color:#7a5db0;font-weight:600;font-size:12.5px;">Billed separately</td></tr>` : ""}
      <tr><td align="right" style="padding:10px 14px;font-size:13px;">Total</td>
        <td align="right" style="padding:10px 14px;font-weight:800;font-size:15px;color:${G};">${N(meta.price)}</td></tr>
      <tr><td align="right" style="padding:4px 14px;font-size:13px;">Upfront deposit (${DEPOSIT_PCT}%) — due now</td>
        <td align="right" style="padding:4px 14px;font-weight:700;">${N(meta.deposit)}</td></tr>
      <tr><td align="right" style="padding:4px 14px 12px;font-size:13px;">Final payment (${100 - DEPOSIT_PCT}%) — on final approval</td>
        <td align="right" style="padding:4px 14px 12px;font-weight:700;">${N(meta.balance)}</td></tr>
    </table>

    <div style="font-size:11px;color:#999;margin-top:6px;">${meta.plan} Package list price $${meta.price_usd} USD, converted at NGN ${Math.round(meta.fx_rate).toLocaleString()}/USD${meta.fx_source === "live" ? " (market rate, " + today() + ")" : ""}.${meta.discount_amount ? " Total reflects your agreed reduction." : ""}</div>
    <div style="font-size:12px;font-weight:700;color:${D};margin:14px 0 8px;">PAYMENT DETAILS</div>
    <table style="border-collapse:separate;"><tr>${banks}</tr></table>
    <div style="font-size:12px;color:#b35e00;margin-top:14px;line-height:1.7;font-style:italic;">
      Please note: the ${DEPOSIT_PCT}% deposit is required before commencement of work. The project clock starts when your deposit is made and acknowledged. Kindly send your proof of payment to WhatsApp <b>${OWNER.whatsapp}</b>.</div>
  </div>`;
}

/* ---------------- terms (plan-dynamic) ---------------- */
export function buildTermsHTML(data, meta) {
  const plan = PLANS[meta.plan_key];
  const G = "#5e8c00";
  const duration = fmt(data.duration) || "To be agreed";
  const webClauses = plan.website
    ? `
    <p style="margin:8px 0;"><b>6. Hosting, Domain &amp; Third-Party Costs.</b> Website hosting and domain name are billed separately and are not included in the project fee. All hosting and domain accounts are created under the Client's own credentials, with payments made directly to the providers; the Designer handles setup, design and development. Other third-party costs, if required, are approved by the Client before purchase.</p>`
    : `
    <p style="margin:8px 0;"><b>6. Third-Party Costs.</b> Third-party costs (premium fonts, stock imagery, licences), if required, are approved by the Client before purchase and billed separately.</p>`;
  const files = plan.website
    ? "final brand assets as JPEG, PNG and SVG exports, together with the website source code. Editable working/design files (e.g. Figma, Illustrator, Photoshop) are not included"
    : "final brand assets as exported files per the package specification. Editable working/design files (e.g. Figma, Illustrator, Photoshop) are not included";
  return `
  <div style="border:1px solid #dfe6d2;border-radius:12px;padding:24px 26px;margin:18px 0;background:#fff;font-size:13px;line-height:1.75;color:#333;">
    <div style="font-size:18px;font-weight:800;color:#1a1f12;margin-bottom:4px;">Terms of Agreement</div>
    <div style="font-size:12px;color:#777;margin-bottom:14px;">Between <b>${OWNER.fullName}</b> (the Designer) and <b>${esc(clientName(data))}</b> (the Client) • Invoice ${meta.invoice_no}</div>
    <p style="margin:8px 0;"><b>1. Scope.</b> This engagement covers the ${meta.plan} Package deliverables: ${plan.deliverables.join("; ")}. Work outside this scope is quoted and agreed separately.</p>
    <p style="margin:8px 0;"><b>2. Timeline.</b> The Client's preferred duration is <b style="color:${G};">${esc(duration)}</b>. The final timeline and milestone schedule are confirmed by the Designer after reviewing this questionnaire, and run from the date the deposit is made and acknowledged. Client-side delays (late feedback, content or approvals) pause the project clock.</p>
    <p style="margin:8px 0;"><b>3. Payment.</b> Total fee ${N(meta.price)}. A ${DEPOSIT_PCT}% deposit (${N(meta.deposit)}) is due before work commences and is non-refundable once work has begun. The remaining ${100 - DEPOSIT_PCT}% (${N(meta.balance)}) is due on the Client's final approval of deliverables. Final files are released after the final payment clears.</p>
    <p style="margin:8px 0;"><b>4. Client responsibilities.</b> Supply all required content within the first 5 days; designate one point of contact; give feedback within 48 hours of each presentation.</p>
    <p style="margin:8px 0;"><b>5. Revisions.</b> The package includes ${plan.label === "Platinum" ? "revisions as required within scope" : plan.label === "Gold" ? "up to 3 revision rounds" : "up to 2 revision rounds"}. Additional rounds or post-approval direction changes are billed separately at a rate agreed in advance.</p>
    ${webClauses}
    <p style="margin:8px 0;"><b>7. File handover.</b> On final payment, the Client receives ${files} and remain the property of the Designer.</p>
    <p style="margin:8px 0;"><b>8. Intellectual property.</b> Ownership of final approved assets transfers to the Client on full payment. The Designer retains portfolio and case-study rights. Unselected concepts remain the Designer's property.</p>
    <p style="margin:8px 0;"><b>9. Cancellation.</b> Either party may end the engagement by written notice. If the Client cancels after work begins, the deposit is retained and work beyond its value becomes payable. If the Designer cannot complete for reasons within his control, payment for undelivered work is refunded.</p>
    <p style="margin:8px 0;"><b>10. Acceptance.</b> Payment of the deposit constitutes acceptance of these terms in full.</p>
  </div>`;
}

/* ---------------- responses ---------------- */
export function buildResponsesHTML(data, meta) {
  const hasWeb = PLANS[meta.plan_key]?.website;
  return SECTIONS.filter(([, key]) => key !== "website" || hasWeb)
    .map(
      ([title, , fields]) => `
    <div style="margin:14px 0;border:1px solid #e5e9dc;border-radius:10px;overflow:hidden;">
      <div style="background:#f2f6e8;padding:9px 16px;font-size:13px;font-weight:700;color:#3f5c00;">${title}</div>
      <table width="100%" style="border-collapse:collapse;">${fields
        .map(
          (f) => `
        <tr><td style="padding:7px 16px;font-size:12px;color:#888;width:42%;vertical-align:top;border-top:1px solid #eef1e6;">${LABELS[f]}</td>
        <td style="padding:7px 16px;font-size:12.5px;color:#333;border-top:1px solid #eef1e6;white-space:pre-wrap;">${esc(fmt(data[f])) || "—"}</td></tr>`
        )
        .join("")}
      </table></div>`
    )
    .join("");
}

/* ---------------- client email ---------------- */
export function buildClientEmail(data, meta) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#333;">
    <div style="text-align:center;padding:22px 0 6px;">
      <div style="font-size:22px;font-weight:800;color:#1a1f12;">Richard Enoch</div>
      <div style="font-size:11px;color:#888;letter-spacing:.08em;">BRAND IDENTITY &amp; PRODUCT DESIGNER</div>
    </div>
    <p style="font-size:14px;line-height:1.8;">Hi ${esc(data.first_name || "there")},</p>
    <p style="font-size:14px;line-height:1.8;">Thank you for booking the <b>${meta.plan} Package</b> for <b>${esc(data.brand_name)}</b>! Your questionnaire responses have been received — a full copy is included below for your records, along with your invoice and the terms of agreement.</p>
    <div style="border:2px solid #5e8c00;background:#f4f9e8;border-radius:10px;padding:16px 20px;font-size:13.5px;line-height:1.8;">
      <b style="color:#3f5c00;">NEXT STEPS</b><br>
      1. Make the <b>${DEPOSIT_PCT}% upfront deposit of ${N(meta.deposit)}</b> using the payment details on the invoice below.<br>
      2. Send your <b>proof of payment / receipt</b> to WhatsApp: <b>${OWNER.whatsapp}</b>.<br>
      3. Once your deposit is acknowledged, your project officially begins — and I'll confirm the timeline and milestone schedule with you.
    </div>
    ${buildInvoiceHTML(data, meta)}
    ${buildTermsHTML(data, meta)}
    <div style="font-size:15px;font-weight:700;color:#1a1f12;margin-top:22px;">Your Questionnaire Responses</div>
    ${buildResponsesHTML(data, meta)}
    <p style="font-size:12px;color:#999;text-align:center;margin-top:24px;">${OWNER.site} • ${OWNER.email} • WhatsApp ${OWNER.whatsapp}</p>
  </div>`;
}

/* ---------------- owner email ---------------- */
export function buildOwnerEmail(data, meta) {
  const raw = { _meta: meta, ...data };
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#333;">
    <h2 style="color:#1a1f12;">New booking — ${meta.plan} Package</h2>
    <p style="font-size:14px;line-height:1.8;"><b>${esc([data.first_name, data.last_name].filter(Boolean).join(" "))}</b> (${esc(data.brand_name)}) just completed the questionnaire.<br>
    ${esc(data.email)} • ${esc(data.phone)} • Preferred duration: <b>${esc(fmt(data.duration) || "not stated")}</b><br>
    Total ${N(meta.price)} — deposit due ${N(meta.deposit)} • Invoice ${meta.invoice_no}</p>
    ${buildResponsesHTML(data, meta)}
    ${buildInvoiceHTML(data, meta)}
    <div style="font-size:12px;font-weight:700;margin-top:18px;">RAW JSON (paste into Claude when starting the project):</div>
    <pre style="background:#f4f4f0;border:1px solid #e0e0d8;border-radius:8px;padding:14px;font-size:10.5px;white-space:pre-wrap;word-break:break-all;">${esc(JSON.stringify(raw, null, 1))}</pre>
  </div>`;
}
