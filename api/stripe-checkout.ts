import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const notesPriceId = process.env.STRIPE_PRICE_ID_NOTES_BUNDLE;

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

function getBaseUrl(req: VercelRequest): string {
  const origin = req.headers.origin;
  if (origin && typeof origin === "string") {
    return origin;
  }

  const forwardedHost = req.headers["x-forwarded-host"];
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (typeof forwardedHost === "string") {
    const protocol = typeof forwardedProto === "string" ? forwardedProto : "https";
    return `${protocol}://${forwardedHost}`;
  }

  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  return "https://chemiazwero.com";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!stripe || !notesPriceId) {
    return res.status(500).json({
      error: "Stripe is not configured",
    });
  }

  try {
    const baseUrl = getBaseUrl(req);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: notesPriceId, quantity: 1 }],
      success_url: `${baseUrl}/notatki?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/notatki?checkout=cancelled`,
      customer_creation: "always",
      allow_promotion_codes: true,
      metadata: {
        product: "notes_bundle",
      },
    });

    if (!session.url) {
      return res.status(500).json({ error: "Failed to create checkout session" });
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({
      error: "Failed to create Stripe checkout session",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
