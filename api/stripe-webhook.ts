import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { createHash } from "crypto";
import { createAccessToken } from "./_utils/accessToken.js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const metaPixelId = process.env.META_PIXEL_ID;
const metaAccessToken = process.env.META_ACCESS_TOKEN;
const downloadTokenSecret = process.env.DOWNLOAD_TOKEN_SECRET;
const downloadTokenTtlSeconds = Number(process.env.DOWNLOAD_TOKEN_TTL_SECONDS || "259200");
const contactEmail = process.env.CONTACT_EMAIL || "chemiazwero@gmail.com";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const processedSessions = new Map<string, number>();
const IDEMPOTENCY_TTL_MS = 1000 * 60 * 60 * 24;

function pruneProcessedSessions(now: number) {
  for (const [sessionId, processedAt] of processedSessions.entries()) {
    if (now - processedAt > IDEMPOTENCY_TTL_MS) {
      processedSessions.delete(sessionId);
    }
  }
}

function isSessionProcessed(sessionId: string): boolean {
  pruneProcessedSessions(Date.now());
  return processedSessions.has(sessionId);
}

function markSessionProcessed(sessionId: string) {
  processedSessions.set(sessionId, Date.now());
}

function withHttps(urlOrHost: string): string {
  if (urlOrHost.startsWith("http://") || urlOrHost.startsWith("https://")) {
    return urlOrHost;
  }
  return `https://${urlOrHost}`;
}

function resolveSiteUrl(): string {
  const explicitSiteUrl = process.env.SITE_URL;
  if (explicitSiteUrl) {
    return withHttps(explicitSiteUrl);
  }

  if (process.env.VERCEL_BRANCH_URL) {
    return withHttps(process.env.VERCEL_BRANCH_URL);
  }

  if (process.env.VERCEL_URL) {
    return withHttps(process.env.VERCEL_URL);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return withHttps(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }

  return "https://chemiazwero.com";
}

async function getRawBody(req: VercelRequest): Promise<string> {
  const maybeRawBody = (req as VercelRequest & { rawBody?: string | Buffer }).rawBody;
  if (typeof maybeRawBody === "string") {
    return maybeRawBody;
  }
  if (Buffer.isBuffer(maybeRawBody)) {
    return maybeRawBody.toString("utf8");
  }
  if (typeof req.body === "string") {
    return req.body;
  }
  if (Buffer.isBuffer(req.body)) {
    return req.body.toString("utf8");
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  if (chunks.length > 0) {
    return Buffer.concat(chunks).toString("utf8");
  }

  return JSON.stringify(req.body ?? {});
}

async function sendMetaCAPIEvent(session: Stripe.Checkout.Session, email: string) {
  if (!metaPixelId || !metaAccessToken) {
    return;
  }
  try {
    const hashedEmail = createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          event_id: session.id,
          action_source: "website",
          user_data: {
            em: [hashedEmail],
          },
          custom_data: {
            value: (session.amount_total ?? 0) / 100,
            currency: (session.currency ?? "pln").toUpperCase(),
          },
        },
      ],
    };
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${metaPixelId}/events?access_token=${metaAccessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error("Meta CAPI error:", response.status, text);
    }
  } catch (err) {
    console.error("Meta CAPI request failed:", err);
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const sessionId = session.id;
  if (isSessionProcessed(sessionId)) {
    return;
  }

  if (!downloadTokenSecret || !resend) {
    throw new Error("Webhook delivery is not configured");
  }

  const customerEmail = session.customer_details?.email || session.customer_email;
  if (!customerEmail) {
    throw new Error("Missing customer email in checkout session");
  }
  if (session.metadata?.product !== "notes_bundle") {
    return;
  }

  const accessToken = createAccessToken(
    {
      email: customerEmail,
      product: "notes_bundle",
      sessionId,
    },
    downloadTokenSecret,
    downloadTokenTtlSeconds
  );
  const siteUrl = resolveSiteUrl();
  const downloadUrl = `${siteUrl}/api/download-notes?token=${encodeURIComponent(accessToken)}`;

  const safeFromEmail =
    resendFromEmail.includes("@gmail.com") || resendFromEmail.includes("@outlook.com")
      ? "onboarding@resend.dev"
      : resendFromEmail;

  await resend.emails.send({
    from: safeFromEmail,
    to: customerEmail,
    subject: "Twoje notatki są gotowe do pobrania 🧪",
    html: [
      `<p>Hej!</p>`,
      `<p>Dziękuję Ci za zakup – bardzo się cieszę, że moje notatki trafią w Twoje ręce! 🎉</p>`,
      `<p>Twoja płatność została potwierdzona. Pobierz pakiet klikając w przycisk poniżej:</p>`,
      `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">`,
      `<tr><td>`,
      `<a href="${downloadUrl}" style="display:inline-block;padding:14px 32px;background-color:#D97745;color:#ffffff;font-weight:bold;font-size:16px;text-decoration:none;border-radius:8px;" target="_blank">📥 Pobierz notatki</a>`,
      `</td></tr>`,
      `</table>`,
      `<p style="font-size:13px;color:#888;">Link wygaśnie za ${Math.floor(downloadTokenTtlSeconds / 3600)} godziny. Jeśli przycisk nie działa, <a href="${downloadUrl}">kliknij tutaj</a>.</p>`,
      `<p>Mam nadzieję, że notatki okażą się super pomocne w przygotowaniach 💛 Jeśli coś nie działa albo masz jakieś pytania, napisz śmiało na <a href="mailto:${contactEmail}">${contactEmail}</a>.</p>`,
      `<p>A jeśli po przerobieniu notatek poczujesz, że chcesz poćwiczyć więcej i mieć kogoś do pytań – zapraszam na korepetycje! Razem przepracujemy wszystko, co sprawia Ci trudność 💪 Zajrzyj na <a href="https://chemiazwero.com">chemiazwero.com</a> lub odezwij się bezpośrednio pod <a href="mailto:${contactEmail}">${contactEmail}</a>.</p>`,
      `<p>Do zobaczenia i powodzenia! 🍀<br/>Wero</p>`,
    ].join("\n"),
    replyTo: contactEmail,
  });

  await sendMetaCAPIEvent(session, customerEmail);

  markSessionProcessed(sessionId);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!stripe || !stripeWebhookSecret) {
    return res.status(500).json({ error: "Stripe webhook is not configured" });
  }

  const signature = req.headers["stripe-signature"];
  if (!signature || typeof signature !== "string") {
    return res.status(400).json({ error: "Missing stripe-signature header" });
  }

  try {
    const rawBody = await getRawBody(req);
    const event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);

    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return res.status(400).json({
      error: "Invalid Stripe webhook signature or payload",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
