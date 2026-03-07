# Chemia z Wero

Vite + React + TypeScript + React Router + Tailwind.

## Uruchomienie

```bash
npm install
npm run dev
```

Build: `npm run build` · Podgląd: `npm run preview`.

Zobacz **COPY_CHECKLIST.md** dla struktury projektu.

## Stripe post-payment (test mode)

Aktualny flow:
- `POST /api/stripe-checkout` tworzy sesję Stripe Checkout.
- `POST /api/stripe-webhook` obsługuje `checkout.session.completed`.
- `GET /api/download-notes?token=...` weryfikuje token i robi redirect do signed URL z prywatnego bucketu Supabase.

Wymagane zmienne środowiskowe znajdziesz w `.env.example` (`STRIPE_*`, `DOWNLOAD_*`, `SUPABASE_*`).

### Lokalny test webhooka przez Stripe CLI

1. Uruchom lokalny serwer z endpointami `/api/*`:

```bash
npx vercel dev
```

2. Zaloguj i forwarduj webhooki do lokalnego endpointu:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

3. Skopiuj pokazany secret (`whsec_...`) i ustaw `STRIPE_WEBHOOK_SECRET` w `.env.local`.

4. W osobnym terminalu wywołaj testowy event:

```bash
stripe trigger checkout.session.completed
```

5. Sprawdź:
- czy endpoint zwraca `200`,
- czy email z bezpiecznym linkiem został wysłany,
- czy link `/api/download-notes?token=...` działa i wygasa po czasie.
