import type { Course } from "@/Utilities/Course";

/**
 * Lokalna lista kursów. Dodaj obiekty z polem `id` lub podłącz własne API.
 */
const COURSES: Course[] = [
  {
    id: "lekcje-indywidualne",
    title: "Lekcje indywidualne",
    short_description: "Indywidualne korepetycje online dopasowane do Twoich potrzeb i tempa nauki.",
    full_description:
      "Lekcje w formule 1:1. Omawiamy wybrane zagadnienia, rozwiązujemy zadania i nadrabiamy zaległości. Terminy i zakres ustalamy indywidualnie. Do uzupełnienia.",
    price: 150,
    price_label: "za 60 min",
    level: "wszystkie",
    status: "available",
    duration: "60 min",
    schedule: "Ustalany indywidualnie",
    order: 1,
    features: [
      "Dopasowany program i tempo",
      "Elastyczne terminy",
      "Materiały w cenie lekcji",
    ],
  },
  {
    id: "lekcje-grupowe",
    title: "Lekcje grupowe",
    short_description: "Zajęcia w małej grupie – wspólna nauka i dyskusje przy niższej cenie.",
    full_description:
      "Lekcje w małej grupie. Dobre na systematyczną pracę, powtórki i wspólne rozwiązywanie zadań. Do uzupełnienia.",
    price: 80,
    price_label: "za 60 min",
    level: "wszystkie",
    status: "available",
    duration: "60 min",
    schedule: "Wtorki lub czwartki",
    order: 2,
    features: [
      "Mała grupa",
      "Regularne spotkania",
      "Wzajemne wsparcie",
    ],
  },
  {
    id: "powtorka-maturalna",
    title: "Powtórka matura 2026",
    short_description:
      "Zajęcia grupowe w weekendy (marzec–kwiecień) – intensywna powtórka przed maturą z chemii rozszerzonej.",
    full_description:
      "Intensywna powtórka maturalna w formie zajęć grupowych. Spotkania w weekendy w marcu i kwietniu. Pełny zakres chemii rozszerzonej: reakcje, stechiometria, organiczna, nieorganiczna, zadania maturalne. Do uzupełnienia.",
    price: 399,
    promo_price: 299,
    promo_end_date: "2026-02-15",
    promo_label: "Do 15 lutego",
    price_label: "pakiet",
    level: "rozszerzony",
    status: "available",
    duration: "20 godzin",
    schedule: "Soboty i niedziele, marzec–kwiecień",
    order: 3,
    features: [
      "Zajęcia grupowe w weekendy",
      "Marzec i kwiecień – tuż przed maturą",
      "Pełny zakres matury rozszerzonej",
      "Zadania i arkusze CKE",
    ],
  },
];

export async function getCourses(): Promise<Course[]> {
  return [...COURSES];
}

export async function getCourseById(id: string): Promise<Course | null> {
  const list = await getCourses();
  return list.find((c) => c.id === id) ?? null;
}
