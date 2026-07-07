import Questionnaire from "../models/Questionnaire.js";
import RateCategory from "../models/RateModel.js";
import { nextSequence } from "../models/Counter.js";
import { PLANS, OWNER, getFxRate, computeMoney } from "../config/plans.js";
import { mailConfigured, sendMail } from "../utils/mailer.js";
import {
  QUESTION_KEYS,
  buildClientEmail,
  buildOwnerEmail,
} from "../utils/questionnaireEmails.js";

/* The invoice counter continues the existing manual sequence: it seeds at 3
   so the first booking gets 000-004. */
const INVOICE_SEED = 3;
const formatInvoiceNo = (seq) => `000-${String(seq).padStart(3, "0")}`;

const MAX_FIELD_LEN = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v) => String(v ?? "").replace(/<[^>]*>/g, "").trim().slice(0, MAX_FIELD_LEN);

/* Keep only known questionnaire keys; coerce everything to trimmed strings
   (or arrays of trimmed strings for multi-select answers). */
function sanitizeResponses(body) {
  const out = {};
  for (const key of QUESTION_KEYS) {
    const v = body[key];
    out[key] = Array.isArray(v)
      ? v.map(clean).filter(Boolean).slice(0, 20)
      : clean(v);
  }
  return out;
}

export async function createQuestionnaire(req, res) {
  try {
    const body = req.body || {};

    // honeypot: bots fill hidden fields — pretend success, store nothing
    if (clean(body._hp)) return res.json({ ok: true });

    const planKey = String(body?._meta?.plan_key || body.plan_key || "").toLowerCase();
    const plan = PLANS[planKey];
    if (!plan) return res.status(400).json({ ok: false, error: "Unknown plan." });

    const responses = sanitizeResponses(body);
    if (!EMAIL_RE.test(responses.email))
      return res.status(400).json({ ok: false, error: "A valid email is required." });
    if (!responses.phone)
      return res.status(400).json({ ok: false, error: "Phone / WhatsApp is required." });
    if (!responses.brand_name)
      return res.status(400).json({ ok: false, error: "Brand name is required." });

    // money is recomputed here — client-sent figures are ignored.
    // Admin-set pricing from the rate card overrides the config fallback.
    const fx = await getFxRate();
    let priceOverride = null;
    try {
      const cat = await RateCategory.findOne({
        $or: [{ id: "brand-identity" }, { label: /brand\s*identity/i }],
      });
      const dbPlan = cat?.plans?.find((p) => {
        const nm = String(p.name || "").trim().toLowerCase();
        return nm === planKey || nm.includes(planKey) || String(p.id || "").trim().toLowerCase() === planKey;
      });
      if (dbPlan && Number(dbPlan.price) > 0) {
        priceOverride = { price: Number(dbPlan.price), currency: dbPlan.currency || "USD" };
      }
    } catch (rateErr) {
      console.error("rate card lookup failed, using config pricing:", rateErr);
    }
    const money = computeMoney(planKey, fx.rate, priceOverride);

    const seq = await nextSequence("invoice", INVOICE_SEED);
    const invoiceNo = formatInvoiceNo(seq);

    const record = await Questionnaire.create({
      invoiceNo,
      email: responses.email,
      phone: responses.phone,
      brandName: responses.brand_name,
      firstName: responses.first_name,
      lastName: responses.last_name,
      planKey,
      planSnapshot: {
        label: plan.label,
        website: plan.website,
        deliverables: plan.deliverables,
      },
      priceUSD: money.price_usd,
      fxRate: fx.rate,
      fxSource: fx.source,
      priceNGN: money.price,
      deposit: money.deposit,
      balance: money.balance,
      responses,
      preferredDuration: responses.duration || "",
      status: "submitted",
    });

    // emails — a failure here must not lose the booking
    let emailsSent = false;
    if (mailConfigured()) {
      const meta = {
        plan_key: planKey,
        plan: plan.label,
        price: money.price,
        price_usd: money.price_usd,
        fx_rate: fx.rate,
        fx_source: fx.source,
        deposit: money.deposit,
        balance: money.balance,
        invoice_no: invoiceNo,
        submitted_at: record.createdAt,
      };
      const subj = `${plan.label} Package — ${responses.brand_name} — Invoice ${invoiceNo}`;
      const results = await Promise.allSettled([
        sendMail({
          to: responses.email,
          subject: `Your booking with Richard Enoch — ${subj}`,
          html: buildClientEmail(responses, meta),
          replyTo: OWNER.email,
        }),
        sendMail({
          to: OWNER.notifyEmail,
          subject: `NEW BOOKING — ${subj}`,
          html: buildOwnerEmail(responses, meta),
          replyTo: responses.email,
        }),
      ]);
      emailsSent = results.every((r) => r.status === "fulfilled");
      results.forEach((r) => {
        if (r.status === "rejected") console.error("Questionnaire email failed:", r.reason);
      });
      if (record.emailsSent !== emailsSent) {
        record.emailsSent = emailsSent;
        await record.save();
      }
    } else {
      console.warn("Questionnaire saved but mail is not configured (set GMAIL_USER/GMAIL_APP_PASSWORD or RESEND_API_KEY).");
    }

    return res.json({ ok: true, invoice_no: invoiceNo, emails_sent: emailsSent });
  } catch (err) {
    console.error("createQuestionnaire error:", err);
    return res.status(500).json({ ok: false, error: "Could not save your booking. Please try again." });
  }
}

/* Admin: list bookings, newest first. */
export async function listQuestionnaires(_req, res) {
  try {
    const items = await Questionnaire.find().sort({ createdAt: -1 }).lean();
    return res.json(items);
  } catch (err) {
    console.error("listQuestionnaires error:", err);
    return res.status(500).json({ error: "Could not load bookings." });
  }
}
