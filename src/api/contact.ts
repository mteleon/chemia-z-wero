/**
 * Wysyłka formularza kontaktowego przez Vercel Serverless Function + Resend.
 */
export async function sendContactEmail(payload: {
  to: string;
  subject: string;
  body: string;
}): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `Failed to send email: ${response.statusText}`);
  }
}
