---
name: stripe-webhook-test
description: Tests Stripe webhook delivery for checkout.session.completed in this project. Use when Stripe payments succeed in checkout but webhook actions (email/download) do not run, or when validating webhook setup in preview/production.
---

# Stripe Webhook Test

## Goal
Quickly verify whether Stripe can reach `/api/stripe-webhook` and whether the endpoint responds correctly.

## Commands

### Local development (with Vercel dev)
Run app API locally:

```bash
npx vercel dev
```

In another terminal, forward Stripe events:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Trigger test event:

```bash
stripe trigger checkout.session.completed
```

### Remote preview/production
Use Stripe Dashboard Webhooks and set endpoint to:

```text
https://<deployment-domain>/api/stripe-webhook
```

Then click **Resend** for `checkout.session.completed`.

## Pass/Fail checks
- `2xx` response in Stripe delivery logs.
- No `FUNCTION_INVOCATION_FAILED` in Vercel logs.
- Email with secure download link is sent.

## Common fixes
- Endpoint URL must include `/api/stripe-webhook`.
- `STRIPE_WEBHOOK_SECRET` must match this exact endpoint.
- Ensure env vars exist in target environment:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `DOWNLOAD_TOKEN_SECRET`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_NOTES_BUCKET`
  - `SUPABASE_NOTES_OBJECT_PATH`
