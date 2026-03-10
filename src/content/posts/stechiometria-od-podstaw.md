---
title: "Stechiometria od podstaw"
excerpt: "Mol, masa molowa, gazy, wzory empiryczne, wydajność, reagent limitujący — kompletne repetytorium z prawdziwymi zadaniami z matur 2023–2025 rozwiązanymi krok po kroku."
publishedAt: "2026-03-10"
order: 3
---

Stechiometria to po prostu matematyka chemii. Brzmi groźnie, ale w praktyce sprowadza się do kilku wzorów i jednej zasady: **zawsze przeliczaj na mole**. Jeśli opanujesz tę zasadę i będziesz konsekwentnie pilnować jednostek, większość zadań obliczeniowych na maturze rozszerzonej stanie się schematyczna. W tym artykule przejdziemy przez wszystkie kluczowe zagadnienia stechiometryczne — od mola i masy molowej, przez gazy i wzory empiryczne, po wydajność i reakcje współbieżne — a na końcu rozwiążemy razem trzy prawdziwe zadania z arkuszy CKE z lat 2023–2025.

## Mol i masa molowa

**Mol** to podstawowa jednostka ilości substancji. Jeden mol to dokładnie $6{,}02 \cdot 10^{23}$ cząstek (atomów, cząsteczek, jonów — zależy, co liczymy). Ta liczba to **liczba Avogadra** ($N_A$). Zależność między liczbą cząstek a liczbą moli opisuje wzór:

$$N = n \cdot N_A$$

gdzie $N$ to liczba cząstek, $n$ to liczba moli, a $N_A = 6{,}02 \cdot 10^{23}\ \text{mol}^{-1}$.

**Masa molowa** ($M$) to masa jednego mola drobin danej substancji, wyrażona w g/mol. Jej wartość liczbowa jest taka sama jak masa atomowa (lub cząsteczkowa) wyrażona w jednostkach u — wystarczy więc zsumować masy atomowe z układu okresowego. Przykłady: $M(\text{Na}) = 23\ \text{g/mol}$, $M(\text{H}_2\text{O}) = 2 \cdot 1 + 16 = 18\ \text{g/mol}$, $M(\text{Cl}^-) \approx 35{,}5\ \text{g/mol}$.

Najważniejszy wzór stechiometrii łączy masę próbki z liczbą moli:

$$n = \frac{m}{M}$$

Przekształcając: $m = n \cdot M$ (gdy szukamy masy) lub $M = \frac{m}{n}$ (gdy szukamy masy molowej). Te trzy postacie powinny wejść Ci w krew — pojawiają się praktycznie w każdym zadaniu obliczeniowym.

Częsta pułapka dotyczy **hydratów**. Masa molowa $\text{CuSO}_4 \cdot 5\text{H}_2\text{O}$ to nie 160 g/mol (sama sól bezwodna), lecz $160 + 5 \cdot 18 = 250\ \text{g/mol}$ — wodę krystalizacyjną trzeba uwzględnić. CKE regularnie to testuje.

## Objętość gazu

### Warunki normalne (STP)

W warunkach normalnych (ciśnienie 1013 hPa, temperatura 0°C = 273 K) objętość jednego mola dowolnego gazu wynosi **22,4 dm³**. To tzw. objętość molowa:

$$V = n \cdot 22{,}4\ \text{dm}^3/\text{mol}$$

Wzór działa tylko w STP. Jeśli zadanie nie precyzuje warunków albo wprost mówi o „warunkach normalnych", używasz 22,4 i tyle. Ale jeśli podaje inne ciśnienie lub temperaturę — musisz sięgnąć po równanie Clapeyrona.

### Równanie Clapeyrona

Dla warunków innych niż normalne stosujemy równanie gazu doskonałego:

$$p \cdot V = n \cdot R \cdot T$$

gdzie $p$ to ciśnienie w hPa, $V$ to objętość w dm³, $n$ to liczba moli, $R = 83{,}1\ \text{hPa} \cdot \text{dm}^3/(\text{mol} \cdot \text{K})$, a $T$ to temperatura **w kelwinach**. I tu jest klasyczna pułapka: temperatura musi być w kelwinach, nie w stopniach Celsjusza. Przeliczenie jest proste — $T[\text{K}] = t[°\text{C}] + 273$ — ale wpisanie do wzoru stopni Celsjusza zamiast kelwinów to jeden z najczęstszych błędów na maturze.

Pamiętaj też, że **STP to nie to samo co warunki pokojowe**. STP oznacza 0°C i 1013 hPa — w temperaturze pokojowej (ok. 20–25°C) objętość molowa gazu jest większa niż 22,4 dm³.

## Gęstość

Gęstość to stosunek masy do objętości: $d = \frac{m}{V}$. Dla gazów jednostką jest najczęściej g/dm³, a dla ciał stałych i cieczy — g/cm³. Nie mieszaj tych jednostek: 1 dm³ = 1000 cm³. W zadaniach gazowych gęstość przydaje się do wyznaczania masy molowej: jeśli znasz gęstość gazu w warunkach normalnych, to $M = d \cdot 22{,}4$ (bo masa 1 mola = gęstość × objętość 1 mola).

## Wzory empiryczne i rzeczywiste

**Wzór empiryczny** (elementarny) pokazuje stosunek liczb atomów poszczególnych pierwiastków wyrażony za pomocą najmniejszych liczb całkowitych. **Wzór rzeczywisty** (sumaryczny) podaje faktyczną liczbę atomów w cząsteczce — może być identyczny z empirycznym lub stanowić jego wielokrotność. Przykład: but-1-en ma wzór rzeczywisty $\text{C}_4\text{H}_8$, ale wzór empiryczny to $\text{CH}_2$ (bo $4:8 = 1:2$).

### Jak wyznaczyć wzór empiryczny z procentowego składu masowego?

1. Przyjmij, że masz **100 g** związku — wtedy procenty zamieniają się na gramy.
2. Dla każdego pierwiastka podziel masę przez **masę atomową** — otrzymasz liczbę moli.
3. Podziel wszystkie wyniki przez **najmniejszą** z nich — dostaniesz stosunek molowy.
4. Jeśli liczby nie wyszły całkowite, pomnóż przez odpowiednią liczbę (2, 3, …), żeby uzyskać liczby całkowite.

Żeby przejść od wzoru empirycznego do rzeczywistego, potrzebujesz **masy molowej** związku. Dzielisz masę molową rzeczywistą przez masę molową wzoru empirycznego — wynik mówi, ile razy trzeba pomnożyć indeksy.

## Wydajność reakcji

**Wydajność reakcji** ($W$) to stosunek ilości produktu faktycznie otrzymanego do ilości teoretycznej (wynikającej z obliczeń stechiometrycznych), wyrażony w procentach:

$$W = \frac{m_p}{m_t} \cdot 100\%$$

gdzie $m_p$ to masa produktu rzeczywiście otrzymanego, a $m_t$ to masa teoretyczna. Można też liczyć na molach: $W = \frac{n_p}{n_t} \cdot 100\%$. Wydajność **nigdy nie przekracza 100%** — jeśli Ci tak wychodzi, masz błąd w obliczeniach (najprawdopodobniej pomyliłeś $m_p$ z $m_t$).

Schemat obliczeń: napisz i zbilansuj równanie reakcji → oblicz $n$ substratu ($n = m/M$) → z proporcji stechiometrycznej wyznacz $m_t$ produktu → podstaw do wzoru na $W$.

Najgroźniejsza pułapka dotyczy **zadań wieloetapowych**. Jeśli reakcja przebiega w dwóch etapach i każdy ma wydajność 80%, to wydajność całkowita to $0{,}80 \cdot 0{,}80 = 0{,}64 = 64\%$, a nie 160%. Wydajności kolejnych etapów się **mnoży**, nie dodaje.

## Reagent limitujący

Reagent limitujący to substrat, który zużyje się jako pierwszy i przez to ograniczy ilość produktu. Kluczowa zasada: **to nie zawsze ten, którego masz mniej gramów**. Musisz przeliczyć masy obu substratów na mole, a następnie podzielić liczbę moli każdego substratu przez jego współczynnik stechiometryczny. Substrat, dla którego ten iloraz jest mniejszy, jest reagentem limitującym — i to na jego podstawie obliczasz ilość produktu.

## Reakcje współbieżne — układ równań z dwiema niewiadomymi

Reakcje współbieżne pojawiają się, gdy mieszanina zawiera dwa różne substraty (np. dwa węglany, dwa metale), które jednocześnie reagują z tym samym odczynnikiem. Znamy łączną masę mieszaniny, ale nie wiemy, ile jest każdego składnika z osobna. W takiej sytuacji oznaczamy liczbę moli składników jako $x$ i $y$, a następnie układamy dwa równania: pierwsze z masy mieszaniny ($M_1 \cdot x + M_2 \cdot y = m$), drugie z innej danej w zadaniu — np. objętości wydzielonego gazu, masy osadu albo ilości zużytego odczynnika. Rozwiązujemy układ metodą podstawiania lub eliminacji i zawsze sprawdzamy wynik, podstawiając z powrotem do obu równań.

## Prawdziwe zadania maturalne — krok po kroku

Poniżej trzy zadania prosto z arkuszy CKE z ostatnich trzech lat. Każde reprezentuje inny typ problemu stechiometrycznego.

### Matura 2025, Zadanie 4 — wzór empiryczny i rzeczywisty

<div class="zadanie-box">
<div class="zadanie-label">Matura 2025 — Zadanie 4</div>

W jednym z tlenków jodu masa tlenu stanowi 20,14% masy tego tlenku. W jego wzorze rzeczywistym liczba atomów jodu jest dwa razy większa niż we wzorze empirycznym. Na podstawie obliczeń ustal i napisz wzór empiryczny oraz wzór rzeczywisty opisanego tlenku.

</div>

<div class="rozwiazanie">
<div class="rozw-label">Rozwiązanie</div>

Przyjmujemy 100 g tlenku → 20,14 g tlenu i 79,86 g jodu.

$n(\text{O}) = \frac{20{,}14}{16{,}00} = 1{,}26\ \text{mol}$

$n(\text{I}) = \frac{79{,}86}{126{,}90} = 0{,}63\ \text{mol}$

Dzielimy przez mniejszą wartość (0,63):

$\text{I} : \text{O} = \frac{0{,}63}{0{,}63} : \frac{1{,}26}{0{,}63} = 1 : 2$

<span class="wynik">Wzór empiryczny: $\text{IO}_2$</span>

W wzorze rzeczywistym atomów jodu jest 2× więcej → mnożymy indeksy ×2:

<span class="wynik">Wzór rzeczywisty: $\text{I}_2\text{O}_4$</span>

</div>

To klasyczny przykład zadania na wzór empiryczny — metoda jest zawsze ta sama: procenty → gramy → mole → stosunek → najmniejsze liczby całkowite.

### Matura 2023, Zadanie 12 — mieszanina węglanów (układ równań)

<div class="zadanie-box">
<div class="zadanie-label">Matura 2023 — Zadanie 12</div>

Próbkę mieszaniny $\text{CaCO}_3$ i $\text{MgCO}_3$ o masie 2,84 g roztworzono w kwasie. Przebiegły reakcje:

$\text{CaCO}_3 + 2\text{H}_3\text{O}^+ \rightarrow \text{Ca}^{2+} + \text{CO}_2 + 3\text{H}_2\text{O}$

$\text{MgCO}_3 + 2\text{H}_3\text{O}^+ \rightarrow \text{Mg}^{2+} + \text{CO}_2 + 3\text{H}_2\text{O}$

Otrzymano 672 cm³ tlenku węgla(IV) w przeliczeniu na warunki normalne. Oblicz wyrażoną w procentach masowych zawartość $\text{CaCO}_3$ w badanej próbce mieszaniny.

</div>

<div class="rozwiazanie">
<div class="rozw-label">Rozwiązanie</div>

Oznaczamy: $x = n(\text{CaCO}_3)$, $y = n(\text{MgCO}_3)$

$M(\text{CaCO}_3) = 100\ \text{g/mol}$, $M(\text{MgCO}_3) = 84\ \text{g/mol}$

Z równań reakcji: 1 mol węglanu → 1 mol $\text{CO}_2$, więc łącznie $n(\text{CO}_2) = x + y$

$n(\text{CO}_2) = \frac{0{,}672}{22{,}4} = 0{,}03\ \text{mol}$

Układamy układ równań:

$\text{I:}\ \ 100x + 84y = 2{,}84$

$\text{II:}\ \ x + y = 0{,}03$

Z równania II: $x = 0{,}03 - y$. Podstawiamy do I:

$100(0{,}03 - y) + 84y = 2{,}84$

$3 - 100y + 84y = 2{,}84$

$-16y = -0{,}16$

**$y = 0{,}01\ \text{mol}$** (MgCO₃)

**$x = 0{,}03 - 0{,}01 = 0{,}02\ \text{mol}$** (CaCO₃)

$m(\text{CaCO}_3) = 0{,}02 \cdot 100 = 2{,}00\ \text{g}$

<span class="wynik">$\%\ \text{CaCO}_3 = \frac{2{,}00}{2{,}84} \cdot 100\% \approx 70{,}4\%$</span>

Sprawdzenie: $m(\text{MgCO}_3) = 0{,}01 \cdot 84 = 0{,}84$ g. Suma: $2{,}00 + 0{,}84 = 2{,}84$ g ✓. $\text{CO}_2$: $0{,}02 + 0{,}01 = 0{,}03$ mol $= 0{,}672$ dm³ ✓

</div>

### Matura 2024, Zadanie 10 — stężenie roztworu z hydratem

<div class="zadanie-box">
<div class="zadanie-label">Matura 2024 — Zadanie 10</div>

W 150 cm³ wodnego roztworu chlorku manganu(II) o stężeniu molowym $c = 0{,}678\ \text{mol} \cdot \text{dm}^{-3}$ i gęstości $d = 1{,}07\ \text{g} \cdot \text{cm}^{-3}$ rozpuszczono 6,00 g hydratu tej soli o wzorze $\text{MnCl}_2 \cdot 4\text{H}_2\text{O}$. Oblicz, jaki procent masy otrzymanego roztworu stanowi masa chlorku manganu(II). Przyjmij: $M_{\text{MnCl}_2} = 126\ \text{g/mol}$, $M_{\text{MnCl}_2 \cdot 4\text{H}_2\text{O}} = 198\ \text{g/mol}$.

</div>

<div class="rozwiazanie">
<div class="rozw-label">Rozwiązanie</div>

$V = 150\ \text{cm}^3 = 0{,}150\ \text{dm}^3$

Masa roztworu początkowego: $m_r = d \cdot V = 1{,}07 \cdot 150 = 160{,}5\ \text{g}$

Mole $\text{MnCl}_2$ w roztworze: $n = c \cdot V = 0{,}678 \cdot 0{,}150 = 0{,}1017\ \text{mol}$

Masa $\text{MnCl}_2$ w roztworze: $m_1 = n \cdot M = 0{,}1017 \cdot 126 = 12{,}81\ \text{g}$

Masa $\text{MnCl}_2$ z hydratu: $m_2 = \frac{126}{198} \cdot 6{,}00 = 3{,}82\ \text{g}$

Łączna masa $\text{MnCl}_2$: $12{,}81 + 3{,}82 = 16{,}63\ \text{g}$

Łączna masa roztworu: $160{,}5 + 6{,}00 = 166{,}5\ \text{g}$

<span class="wynik">$c_p = \frac{16{,}63}{166{,}5} \cdot 100\% \approx 10{,}0\%$</span>

</div>

To zadanie łączy kilka pojęć naraz: stężenie molowe, gęstość, hydrat i stężenie procentowe. Klucz do sukcesu to systematyczne wypisanie danych i pilnowanie, że masa $\text{MnCl}_2$ z hydratu to nie 6 g (bo hydrat zawiera też wodę krystalizacyjną).

## Najczęstsze pułapki maturalne

1. **STP ≠ warunki pokojowe.** STP to 0°C (273 K) i 1013 hPa. $V_m = 22{,}4\ \text{dm}^3/\text{mol}$ działa wyłącznie w tych warunkach — w innych musisz użyć równania Clapeyrona.
2. **Temperatura w Clapeyronie musi być w kelwinach.** $T = t[°\text{C}] + 273$. Wpisanie stopni Celsjusza to najczęstszy błąd rachunkowy.
3. **Wzór empiryczny ≠ wzór rzeczywisty.** $\text{CH}_2$ to wzór empiryczny but-1-enu ($\text{C}_4\text{H}_8$). Do przejścia na wzór rzeczywisty potrzebujesz masy molowej.
4. **Masa molowa hydratu obejmuje wodę.** $M(\text{CuSO}_4 \cdot 5\text{H}_2\text{O}) = 160 + 5 \cdot 18 = 250\ \text{g/mol}$, nie 160.
5. **Reagent limitujący to nie zawsze ten, którego masz mniej gramów.** Zawsze przeliczaj na mole i dziel przez współczynniki stechiometryczne.
6. **Wydajności etapów się mnoży, nie dodaje.** Dwa etapy po 80% to $0{,}80 \cdot 0{,}80 = 64\%$, nie 160%.

## Na koniec

Stechiometria na maturze rozszerzonej to w gruncie rzeczy kilka wzorów ($n = \frac{m}{M}$, $V = n \cdot 22{,}4$, $pV = nRT$, $W = \frac{m_p}{m_t} \cdot 100\%$) i umiejętność ich konsekwentnego stosowania. Najważniejsze to nie skakać na skróty — wypisz dane, przelicz na mole, sprawdź jednostki, a potem dopiero podstawiaj. Jeśli potrzebujesz przećwiczyć te schematy na większej liczbie zadań, zapraszam na zajęcia indywidualne i grupowe.
