# Review MVP - Chemia z Wero

## 🔴 KRYTYCZNE - Blokuje start

### 1. **API/Email - Formularze nie działają**
- ❌ `src/api/contact.ts` - rzuca błąd zamiast wysyłać email
- ❌ `src/api/enrollment.ts` - rzuca błąd zamiast wysyłać email
- **Rozwiązanie:** Skonfigurować jeden z:
  - Formspree (najprostsze, darmowe do 50 wiadomości/miesiąc)
  - Resend (darmowe do 100 wiadomości/dzień)
  - EmailJS (darmowe do 200 wiadomości/miesiąc)
  - Własny backend (Node.js + nodemailer)

### 2. **Przyciski bez akcji**
- ❌ "Zobacz jak uczę" (Home.tsx:94) - `href="#"` - brak linku do video/demo
- ❌ "Zapisz się teraz" (Home.tsx:180) - brak linku/akcji
- **Rozwiązanie:** 
  - Dodać link do YouTube/demo lub usunąć przycisk
  - "Zapisz się teraz" → przekierować do `/Courses` lub otworzyć modal

### 3. **Social Media - wszystkie linki nie działają**
- ❌ Instagram, Facebook, YouTube w Layout.tsx (linie 159-161) - wszystkie `href="#"`
- ❌ Social media w Contact.tsx (linie 105-111) - wszystkie `href="#"`
- **Rozwiązanie:** Dodać prawdziwe linki lub ukryć sekcję do czasu

---

## 🟡 WAŻNE - Wpływa na konwersję/SEO

### 4. **SEO - Brak meta tagów**
- ❌ Brak `meta description`
- ❌ Brak Open Graph tags (Facebook, LinkedIn)
- ❌ Brak Twitter Cards
- ❌ Brak structured data (JSON-LD)
- **Rozwiązanie:** Dodać do `index.html` lub użyć `react-helmet`

### 5. **Treści kursów - "Do uzupełnienia"**
- ⚠️ Wszystkie 3 kursy mają `full_description` z tekstem "Do uzupełnienia"
- **Rozwiązanie:** Uzupełnić pełne opisy kursów

### 6. **Brak strony 404**
- ❌ Nie ma obsługi nieistniejących stron
- **Rozwiązanie:** Dodać komponent NotFound i route catch-all

---

## 🟢 POŻĄDANE - Ulepszenia

### 7. **Analytics**
- ❌ Brak Google Analytics / Google Tag Manager
- ❌ Brak śledzenia konwersji (zapisy, kliknięcia)
- **Rozwiązanie:** Dodać GA4 lub prostsze rozwiązanie (Plausible, Umami)

### 8. **Robots.txt i Sitemap**
- ❌ Brak `public/robots.txt`
- ❌ Brak `sitemap.xml`
- **Rozwiązanie:** Stworzyć podstawowe pliki

### 9. **Error Boundary**
- ❌ Brak obsługi błędów React
- **Rozwiązanie:** Dodać Error Boundary component

### 10. **Loading states**
- ✅ Są podstawowe loadery
- ⚠️ Można dodać skeleton screens dla lepszego UX

### 11. **Accessibility (A11y)**
- ⚠️ Brak sprawdzenia:
  - Alt texty dla obrazów (są, ale warto zweryfikować)
  - ARIA labels
  - Keyboard navigation
  - Focus states

### 12. **Performance**
- ✅ Code splitting zrobiony
- ⚠️ Brak lazy loading obrazów
- ⚠️ Brak optymalizacji obrazów (WebP, responsive images)

---

## ✅ CO DZIAŁA DOBRZE

1. ✅ Responsywność - strona działa na mobile/desktop
2. ✅ Nawigacja - wszystkie strony dostępne
3. ✅ Formularze - UI gotowe, tylko brak backendu
4. ✅ Routing - React Router działa poprawnie
5. ✅ Styling - spójny design system
6. ✅ Code splitting - zoptymalizowane
7. ✅ Favicon - wygenerowany automatycznie
8. ✅ Calendly integration - linki działają

---

## 📋 PLAN DZIAŁANIA - Minimum do startu

### Faza 1: KRYTYCZNE (1-2 dni)
1. **Skonfigurować wysyłkę emaili** (Formspree/Resend/EmailJS)
2. **Naprawić przyciski** ("Zobacz jak uczę", "Zapisz się teraz")
3. **Dodać/ukryć social media** linki

### Faza 2: WAŻNE (1 dzień)
4. **Dodać meta tagi SEO** (description, OG tags)
5. **Uzupełnić opisy kursów** (usunąć "Do uzupełnienia")
6. **Dodać stronę 404**

### Faza 3: POŻĄDANE (opcjonalnie)
7. Analytics
8. Robots.txt / Sitemap
9. Error Boundary
10. Optymalizacja obrazów

---

## 🚀 Szybki start - Formspree (najprostsze)

1. Zarejestruj się na https://formspree.io (darmowe)
2. Utwórz 2 formularze:
   - Contact form
   - Enrollment form
3. Skopiuj endpoint URLs
4. Zaktualizuj `src/api/contact.ts` i `src/api/enrollment.ts`:

```typescript
// Przykład dla contact.ts
export async function sendContactEmail(payload: {
  to: string;
  subject: string;
  body: string;
}): Promise<void> {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: payload.to,
      subject: payload.subject,
      message: payload.body,
    }),
  });
  if (!response.ok) throw new Error('Failed to send email');
}
```

---

## 📝 Checklist przed launch

- [ ] Formularze działają (test wysłania)
- [ ] Wszystkie przyciski mają akcje
- [ ] Social media linki działają lub są ukryte
- [ ] Meta tagi SEO dodane
- [ ] Opisy kursów uzupełnione
- [ ] Strona 404 działa
- [ ] Test na mobile/desktop
- [ ] Test wszystkich formularzy
- [ ] Test wszystkich linków
- [ ] Favicon wyświetla się poprawnie
- [ ] Calendly linki działają

---

**Status:** 🟡 **Prawie gotowe** - głównie brakuje konfiguracji emaili i kilku detali
