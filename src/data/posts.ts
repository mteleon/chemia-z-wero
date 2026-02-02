import type { Post } from "@/Utilities/Post";

const POSTS: Post[] = [
  {
    id: "1",
    slug: "jak-sie-uczyc-do-matury-z-chemii",
    title: "Jak się uczyć do matury z chemii?",
    excerpt:
      "Kilka praktycznych wskazówek, jak planować powtórki i na co zwracać uwagę przy przygotowaniach do matury rozszerzonej z chemii.",
    content: `
      <p>Przygotowanie do matury z chemii rozszerzonej wymaga systematyczności i dobrego planu. Oto kilka sprawdzonych zasad.</p>
      <h2>Ustal harmonogram</h2>
      <p>Podziel materiał na bloki (np. stechiometria, chemia organiczna, nieorganiczna) i wyznacz konkretne terminy powtórek. Lepiej uczyć się krócej, ale regularnie, niż „zrywać” się na ostatnią chwilę.</p>
      <h2>Ćwicz na arkuszach</h2>
      <p>Rozwiązuj zadania z poprzednich lat i arkuszy CKE. Zwracaj uwagę na słowa kluczowe w schematach punktowania – często to one decydują o przyznaniu punktu.</p>
      <h2>Notuj wątpliwości</h2>
      <p>Zapisuj pytania i trudne zagadnienia, żeby wrócić do nich na zajęciach lub przy kolejnej powtórce. Chemia z Wero – korepetycje online, gdy potrzebujesz uporządkować wiedzę.</p>
    `,
    publishedAt: "2025-01-15",
    order: 1,
  },
  {
    id: "2",
    slug: "slowa-kluczowe-w-zadaniach-maturalnych",
    title: "Słowa kluczowe w zadaniach maturalnych",
    excerpt:
      "Dlaczego w arkuszach CKE tak ważne są tzw. słowa kluczowe i jak ich używać, żeby zdobyć maksimum punktów.",
    content: `
      <p>W schematach punktowania matury z chemii często pojawiają się konkretne sformułowania, które muszą wystąpić w odpowiedzi, żeby egzaminator mógł przyznać punkt.</p>
      <h2>Co to są słowa kluczowe?</h2>
      <p>To zwroty lub pojęcia wymienione w kluczu odpowiedzi CKE. Np. zamiast opisywać zjawisko „na około”, warto użyć dokładnie tego terminu, którego oczekuje klucz.</p>
      <h2>Jak z nich korzystać?</h2>
      <p>Przeglądaj oficjalne klucze do arkuszy z poprzednich lat. Zauważysz powtarzające się sformułowania w podobnych typach zadań. Na zajęciach często omawiamy je na żywych przykładach.</p>
    `,
    publishedAt: "2025-01-20",
    order: 2,
  },
  {
    id: "3",
    slug: "stechiometria-od-podstaw",
    title: "Stechiometria od podstaw",
    excerpt:
      "Krótkie przypomnienie: masa molowa, równania reakcji i obliczenia stechiometryczne – na co zwrócić uwagę przed maturą.",
    content: `
      <p>Stechiometria to jeden z fundamentów chemii i często pojawia się w zadaniach maturalnych. Oto najważniejsze elementy.</p>
      <h2>Masa molowa i mol</h2>
      <p>Pamiętaj, że 1 mol to 6,02·10²³ cząstek, a masa molowa (g/mol) to masa jednego mola substancji. W zadaniach często trzeba przejść z masy na mole i odwrotnie.</p>
      <h2>Równanie reakcji</h2>
      <p>Zawsze sprawdzaj, czy równanie jest uzgodnione. Współczynniki stechiometryczne mówią, w jakim stosunku molowym reagują substraty i powstają produkty – na tym opierają się obliczenia.</p>
      <p>Na lekcjach indywidualnych i grupowych regularnie rozwiązujemy zadania stechiometryczne krok po kroku – zapraszam na powtórkę.</p>
    `,
    publishedAt: "2025-01-25",
    order: 3,
  },
];

export async function getPosts(): Promise<Post[]> {
  return [...POSTS].sort((a, b) => {
    const oa = a.order ?? 999;
    const ob = b.order ?? 999;
    if (oa !== ob) return oa - ob;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const list = await getPosts();
  return list.find((p) => p.slug === slug) ?? null;
}
