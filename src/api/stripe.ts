type StripeCheckoutResponse = {
  url: string;
};

/**
 * Tworzy sesję Stripe Checkout i zwraca URL do przekierowania.
 */
export async function createNotesCheckoutSession(): Promise<string> {
  const response = await fetch("/api/stripe-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `Failed to create checkout session: ${response.statusText}`);
  }

  const data = (await response.json()) as StripeCheckoutResponse;
  if (!data.url) {
    throw new Error("Missing Stripe checkout URL in API response");
  }

  return data.url;
}
