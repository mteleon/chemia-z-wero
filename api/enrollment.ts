import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "chemiazwero@gmail.com";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    courseTitle,
    courseId,
    studentName,
    studentEmail,
    studentPhone,
    notes,
    price,
    promoPrice,
  } = req.body;

  if (!courseTitle || !studentName || !studentEmail || price === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Email do Ciebie
    const emailToYou = `
      <h2>Nowy zapis na kurs</h2>
      <p><strong>Kurs:</strong> ${courseTitle}</p>
      <p><strong>ID kursu:</strong> ${courseId || "N/A"}</p>
      
      <h3>Dane uczestnika:</h3>
      <ul>
        <li><strong>Imię i nazwisko:</strong> ${studentName}</li>
        <li><strong>Email:</strong> ${studentEmail}</li>
        ${studentPhone ? `<li><strong>Telefon:</strong> ${studentPhone}</li>` : ""}
        ${notes ? `<li><strong>Uwagi/pytania:</strong> ${notes}</li>` : ""}
      </ul>
      
      <h3>Cena:</h3>
      <ul>
        ${promoPrice ? `<li><strong>Cena promocyjna:</strong> ${promoPrice} zł</li>` : ""}
        <li><strong>Cena regularna:</strong> ${price} zł</li>
        ${promoPrice ? `<li><strong>Oszczędność:</strong> ${price - promoPrice} zł</li>` : ""}
      </ul>
      
      <p><strong>Data zapisu:</strong> ${new Date().toLocaleString("pl-PL")}</p>
    `;

    // Email potwierdzający do użytkownika
    const emailToStudent = `
      <h2>Hej ${studentName}!</h2>
      
      <p>Super, że zapisałeś się na <strong>"${courseTitle}"</strong>! 🎉</p>
      
      <p>Wkrótce skontaktuję się z Tobą, żeby omówić szczegóły. W międzyczasie, jeśli masz pytania, pisz na <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
      
      <p>Do zobaczenia!</p>
      
      <p>Weronika<br>Chemia z Wero</p>
    `;

    // Użyj onboarding@resend.dev jeśli nie ustawiono lub jeśli to Gmail
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const safeFromEmail = fromEmail.includes("@gmail.com") || fromEmail.includes("@outlook.com")
      ? "onboarding@resend.dev"
      : fromEmail;

    // Wysyłka dwóch emaili równolegle
    await Promise.all([
      resend.emails.send({
        from: safeFromEmail,
        to: CONTACT_EMAIL,
        subject: `[Zapis na kurs] ${courseTitle} - ${studentName}`,
        html: emailToYou,
      }),
      resend.emails.send({
        from: safeFromEmail,
        to: studentEmail,
        subject: `Dziękujemy za zapis na ${courseTitle}!`,
        html: emailToStudent,
        replyTo: CONTACT_EMAIL,
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ 
      error: "Failed to send email",
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
