/**
 * Wysyłka formularza kontaktowego.
 * Podmień na: Formspree, własny backend, SendGrid, Resend itp.
 */
export async function sendContactEmail(_payload: {
  to: string;
  subject: string;
  body: string;
}): Promise<void> {
  void _payload;
  throw new Error(
    "Skonfiguruj wysyłkę w src/api/contact.ts (np. Formspree, własny backend)."
  );
}
