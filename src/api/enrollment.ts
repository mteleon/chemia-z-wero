/**
 * Wysyłka formularza zapisów na kurs przez Vercel Serverless Function + Resend.
 */
export async function sendEnrollmentEmail(payload: {
  courseTitle: string;
  courseId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  notes?: string;
  price: number;
  promoPrice?: number;
}): Promise<void> {
  const response = await fetch("/api/enrollment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `Failed to send enrollment email: ${response.statusText}`);
  }
}
