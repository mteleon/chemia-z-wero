# Wpisy bloga

Każdy plik `.md` to jeden wpis. **Nazwa pliku (bez .md)** to slug w URL, np. `jak-sie-uczyc-do-matury-z-chemii.md` → `/blog/jak-sie-uczyc-do-matury-z-chemii`.

## Frontmatter

```yaml
---
title: "Tytuł wpisu"
excerpt: "Krótki opis do listy wpisów i meta description. Powinien zachęcić do kliknięcia i zawierać słowa kluczowe."
publishedAt: "2026-03-10"
---
```

## Kolejność wyświetlania wpisów

- Wpisy na stronie `/blog` są sortowane po `publishedAt`:
  - **od najnowszych do najstarszych**.
- Pole `order` nie jest używane do kolejności wpisów.

## Zasady tworzenia treści

Na podstawie wpisów wzorcowych: `stechiometria-od-podstaw.md`, `polarnosc-czasteczek.md`.

### Wstęp

- Jeden akapit wprowadzający, który:
  - wyjaśnia, dlaczego temat jest ważny na maturze,
  - zapowiada, co czytelnik znajdzie w artykule,
  - ewentualnie podaje jedną kluczową zasadę (np. „zawsze przeliczaj na mole").
- Gęste, merytoryczne akapity (2–4 zdania), bez nadmiaru whitespace.

### Styl i ton

- Naturalny, informacyjny ton — mówimy bezpośrednio do ucznia, bez dramatyzowania.
- Unikać zwrotów w stylu: „brutalna prawda", „CKE się uśmiecha i zabiera punkt", „moment prawdy".
- Odniesienia do CKE i matury: spokojne, rzeczowe (np. „częsty błąd na maturze", „CKE regularnie to testuje").
- **Pogrubienie** dla terminów kluczowych i zasad.

### LaTeX (wzory)

- Wzory inline: `$n = m/M$`, `$\mu = 0$`
- Wzory display (centrum): `$$n = \frac{m}{M}$$`
- Wzory chemiczne: `$\text{H}_2\text{O}$`, `$\text{CO}_2$`, `$\text{CaCO}_3$`
- Przecinek dziesiętny w LaTeX: `$22{,}4$` (krótska spacja `{,}`)
- Jednostki: `$\text{g/mol}$`, `$\text{dm}^3/\text{mol}$`

### Bloki specjalne (raw HTML)

Wszystkie używają `rehype-raw` — zwykły HTML w Markdown działa.

#### Ramka na treść zadania / regułę (`.zadanie-box`)

```html
<div class="zadanie-box">
<div class="zadanie-label">Matura 2025 — Zadanie 4</div>
<p>Treść polecenia lub reguły do zapamiętania.</p>
</div>
```

- `zadanie-label`: krótka etykieta (np. „Matura 2025 — Zadanie 4", „Reguła do zapamiętania").
- Ciepłe tło, lewa obwódka akcentowa.

#### Rozwiązanie odręczne (`.rozwiazanie`)

```html
<div class="rozwiazanie">
<div class="rozw-label">Rozwiązanie</div>
<p>Krok 1: ...</p>
<p>Krok 2: $x = ...$</p>
<span class="wynik">Odpowiedź: 70,4%</span>
</div>
```

- Font Caveat, tło w kratkę (jak kartka).
- `wynik`: podświetlenie końcowego wyniku (żółte tło).

#### CTA na końcu (`.cta-box`)

```html
<div class="cta-box">
<p class="cta-title">Chcesz [temat dopasowany do wpisu]?</p>
<p>Krótki opis: kursy i/lub notatki.</p>
<div class="cta-links">
<a href="/kursy" class="cta-link">Kursy z chemii →</a>
<a href="/notatki" class="cta-link secondary">Notatki PDF →</a>
</div>
</div>
```

- Każdy wpis merytoryczny kończy się CTA z linkami do `/kursy` i `/notatki`.
- Tekst CTA dostosowany do tematu wpisu.

### Struktura typowego wpisu

1. **Wstęp** — jeden akapit.
2. **Sekcje merytoryczne** — `##` i `###`, logiczny układ (od podstaw do trudniejszych zagadnień).
3. **Przykłady** — jeśli są zadania maturalne: `zadanie-box` + `rozwiazanie`.
4. **Podsumowanie / pułapki** — lista numerowana lub krótki akapit.
5. **Zakończenie** — 1–2 zdania + `cta-box`.

### Wpisy strategiczne (metodyka nauki / technika egzaminacyjna)

Dotyczy wpisów takich jak:
- `jak-sie-uczyc-do-matury-z-chemii.md`
- `slowa-kluczowe-w-zadaniach-maturalnych.md`

Dla takich wpisów też stosujemy ten sam standard redakcyjny:
- gęsty, merytoryczny tekst (bez „placeholderowych” 2–3 akapitów),
- konkretne checklisty i zasady do wdrożenia,
- 1–2 ramki `.zadanie-box` na najważniejsze reguły praktyczne,
- zakończenie z CTA (`.cta-box`) do `/kursy` i `/notatki`.

Wpis strategiczny nie musi mieć „zadań obliczeniowych”, ale powinien mieć elementy możliwe do natychmiastowego zastosowania przez ucznia (checklista, schemat pracy, reguła odpowiedzi).

### Kategorie wpisów (propozycja redakcyjna, bez implementacji)

Na poziomie redakcyjnym warto oznaczać wpisy jedną z kategorii:
- `powtorka-merytoryczna` — tematy chemiczne (np. stechiometria, polarność),
- `nauka-i-organizacja` — planowanie nauki i metodyka pracy,
- `technika-egzaminacyjna` — słowa kluczowe, pisanie odpowiedzi pod klucz CKE.

To jest wyłącznie konwencja redakcyjna na etapie tworzenia treści.
**Nie implementujemy** tych kategorii w modelu danych, parserze frontmatter ani UI listy bloga.

### Obrazki

- Ścieżka: `/posts/<slug>/<nazwa>.png`
- Np. `/posts/polarnosc/hcl.png`
- Pliki w `public/posts/<slug>/`.

### Pułapki maturalne

Jeśli temat na to pozwala, dodać sekcję „Najczęstsze pułapki" z krótką listą punktów. Każdy punkt: **termin** + wyjaśnienie (np. „STP ≠ warunki pokojowe. STP to 0°C i 1013 hPa.").
