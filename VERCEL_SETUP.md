# Konfiguracja Vercel + Resend

## ✅ Co zostało zrobione

1. ✅ Zainstalowano `resend` i `@vercel/node`
2. ✅ Utworzono Vercel Serverless Functions:
   - `/api/contact.ts` - formularz kontaktowy
   - `/api/enrollment.ts` - formularz zapisów (wysyła 2 emaile)
3. ✅ Zaktualizowano frontend API calls
4. ✅ Gotowe do konfiguracji!

## 🚀 Kroki konfiguracji

### 1. Zarejestruj się w Resend

1. Przejdź na: https://resend.com
2. Zarejestruj się (darmowe konto)
3. Zweryfikuj email

### 2. Utwórz API Key

1. W dashboardzie Resend: **API Keys** → **Create API Key**
2. Nazwij klucz (np. "Vercel Production")
3. Skopiuj klucz (zaczyna się od `re_`)

### 3. Zweryfikuj domenę (opcjonalnie, na początku możesz użyć testowego)

**Opcja A: Użyj testowego emaila (szybkie)**
- Na początku możesz użyć: `onboarding@resend.dev`
- Działa od razu, ale w "From" będzie widoczne "via resend.dev"

**Opcja B: Zweryfikuj własną domenę (zalecane)**
1. W Resend: **Domains** → **Add Domain**
2. Dodaj domenę (np. `chemiazwero.com`)
3. Skonfiguruj DNS records (Resend pokaże co dodać)
4. Poczekaj na weryfikację (zwykle kilka minut)

### 4. Skonfiguruj zmienne środowiskowe w Vercel

1. Przejdź do projektu w Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Dodaj następujące zmienne:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=chemiazwero@gmail.com  (lub onboarding@resend.dev na start)
CONTACT_EMAIL=chemiazwero@gmail.com
```

4. Kliknij **Save**

### 5. Redeploy aplikacji

Po dodaniu zmiennych środowiskowych:
1. Vercel automatycznie wykryje zmiany
2. Lub kliknij **Deployments** → **Redeploy** (najnowszy deployment)

## 🧪 Testowanie

### Test formularza kontaktowego:
1. Przejdź na `/Contact`
2. Wypełnij formularz
3. Wyślij
4. Sprawdź email w `chemiazwero@gmail.com`

### Test formularza zapisów:
1. Przejdź na dowolny kurs → **Zapisz się**
2. Wypełnij formularz
3. Wyślij
4. Sprawdź:
   - Email do Ciebie w `chemiazwero@gmail.com`
   - Email potwierdzający do użytkownika

## 📧 Limity Resend (Free Plan)

- ✅ **100 wiadomości/dzień** (3000/miesiąc)
- ✅ Wystarczy dla MVP i początkowego ruchu
- ✅ Upgrade do Pro ($20/mies) gdy potrzebujesz więcej

## 🔧 Troubleshooting

### Błąd: "Failed to send email"
1. Sprawdź czy `RESEND_API_KEY` jest ustawiony w Vercel
2. Sprawdź czy email nadawcy jest zweryfikowany
3. Sprawdź logs w Vercel: **Deployments** → **Functions** → wybierz funkcję → **Logs**

### Błąd: "Invalid API key"
- Sprawdź czy klucz zaczyna się od `re_`
- Upewnij się że skopiowałeś cały klucz

### Email nie przychodzi
1. Sprawdź folder SPAM
2. Sprawdź logs w Resend Dashboard: **Logs**
3. Sprawdź czy domena jest zweryfikowana (jeśli używasz własnej)

## 📝 Struktura plików

```
/
├── api/                    # Vercel Serverless Functions
│   ├── contact.ts         # Formularz kontaktowy
│   └── enrollment.ts      # Formularz zapisów
├── src/
│   └── api/
│       ├── contact.ts     # Frontend API call
│       └── enrollment.ts  # Frontend API call
└── .env.example           # Przykładowe zmienne
```

## 🎯 Co dalej?

Po skonfigurowaniu:
1. ✅ Formularze działają automatycznie
2. ✅ Dwa emaile przy zapisie (do Ciebie + potwierdzenie)
3. ✅ Wszystko działa na Vercel (darmowe dla hobby plan)

**Status:** Gotowe do konfiguracji! 🚀
