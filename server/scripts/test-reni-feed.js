// server/scripts/test-reni-feed.js
// Fires one dummy brand-identity booking through the Reni feed so you can
// watch the job appear in Reni's Design Studio — no Mongo, no emails, no
// Render needed. Run from the server/ folder:
//
//   PowerShell:
//     $env:RENI_SUPABASE_URL="https://pstjgjzrfoablaqpchna.supabase.co"
//     $env:RENI_SUPABASE_SERVICE_KEY="<service_role key>"
//     $env:RENI_USER_ID="<your auth user id>"
//     node scripts/test-reni-feed.js
//
// Then open Reni (or wait for its next sync): a "○ LOGGED" job named
// "TEST — Acme Coffee — Gold Brand Identity" should appear in the
// pipeline under Confirmed, with phases, deliverables, and milestones.
// Delete it from the Reni UI afterwards.

import { feedReniStudio, reniConfigured } from "../utils/reniFeed.js";

if (!reniConfigured()) {
  console.error("Missing env — set RENI_SUPABASE_URL, RENI_SUPABASE_SERVICE_KEY, RENI_USER_ID first.");
  process.exit(1);
}

const result = await feedReniStudio({
  planKey: "gold",
  plan: {
    label: "Gold",
    deliverables: [
      "Logo design", "Colour palette", "Typography system",
      "Brand guideline", "Business card", "Social media designs",
    ],
  },
  money: { price: 700000, deposit: 490000, balance: 210000 },
  responses: {
    first_name: "TEST — Acme",
    last_name: "Coffee",
    brand_name: "TEST — Acme Coffee",
    email: "test@example.com",
    phone: "+2340000000000",
    duration: "3-4 weeks",
    comm: ["WhatsApp"],
  },
  invoiceNo: "TEST-000",
});

console.log(result.fed ? `✅ Fed Reni — job id ${result.jobId}. Check the Design Studio pipeline.` : `Skipped: ${result.reason}`);
