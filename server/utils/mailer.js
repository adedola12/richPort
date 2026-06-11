// Outbound email. Provider picked via MAIL_PROVIDER env var:
//   gmail  -> Nodemailer + Gmail App Password (GMAIL_USER / GMAIL_APP_PASSWORD)
//   resend -> Resend HTTP API (RESEND_API_KEY, RESEND_FROM)
import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

export function mailConfigured() {
  const provider = (process.env.MAIL_PROVIDER || "gmail").toLowerCase();
  if (provider === "resend") return Boolean(process.env.RESEND_API_KEY);
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendMail({ to, subject, html, replyTo }) {
  const provider = (process.env.MAIL_PROVIDER || "gmail").toLowerCase();

  if (provider === "resend") {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Richard Enoch <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Resend failed (${res.status}): ${body}`);
    }
    return;
  }

  await getTransporter().sendMail({
    from: `"Richard Enoch" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}
