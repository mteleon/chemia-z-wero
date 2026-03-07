import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { createAccessToken } from "./_utils/accessToken.js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const downloadTokenSecret = process.env.DOWNLOAD_TOKEN_SECRET;
const siteUrl = process.env.SITE_URL || "https://chemiazwero.com";
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
  const downloadUrl = `${siteUrl}/api/download-notes?token=${encodeURIComponent(accessToken)}`;

  const safeFromEmail =
    resendFromEmail.includes("@gmail.com") || resendFromEmail.includes("@outlook.com")
      ? "onboarding@resend.dev"
      : resendFromEmail;

  await resend.emails.send({
    from: safeFromEmail,
    to: customerEmail,
    subject: "Twoje notatki PDF są gotowe do pobrania",
    html: `
      <h2>Dziękujemy za zakup pakietu notatek!</h2>
      <p>Twoja płatność została potwierdzona. Pobierz pakiet z bezpiecznego linku:</p>
      <p><a href="${downloadUrl}">${downloadUrl}</a></p>
      <p>Link wygaśnie za ${Math.floor(downloadTokenTtlSeconds / 3600)} godzin.</p>
      <p>W razie pytań napisz na <a href="mailto:${contactEmail}">${contactEmail}</a>.</p>
      <p>Chemia z Wero</p>
    `,
    replyTo: contactEmail,
  });

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
