import type { Course } from "@/Utilities/Course";

/**
 * Lokalna lista kursów. Dodaj obiekty z polem `id` lub podłącz własne API.
 */
const COURSES: Course[] = [
  {
    id: "lekcje-indywidualne",
    title: "Lekcje indywidualne",
    short_description: "Indywidualne korepetycje online dopasowane do Twoich potrzeb i tempa nauki.",
    image_url:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    description_sections: [
      {
        title: "Na czym polegają zajęcia",
        content:
          "Lekcje w formule 1:1 – w pełni dopasowane do Ciebie. Omawiamy dokładnie te zagadnienia, które są dla Ciebie trudne, rozwiązujemy zadania krok po kroku i nadrabiamy zaległości w Twoim tempie. Nie ma sztywnego programu: ustalamy zakres i terminy indywidualnie.",
      },
      {
        title: "Co otrzymujesz w cenie lekcji",
        bullets: [
          "Notatki",
          "Prezentacje",
          "Quizy do utrwalenia materiału",
          "Zadania do rozwiązania samodzielnie",
          "Nagrania z lekcji – możesz wrócić do wyjaśnień w dowolnym momencie",
        ],
      },
      {
        title: "Dla kogo?",
        bullets: [
          "Przygotowujesz się do matury rozszerzonej",
          "Nadganiasz zaległości po chorobie lub dłuższej przerwie",
          "Chcesz w końcu zrozumieć chemię, a nie tylko ją „zaliczyć”",
        ],
      },
    ],
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
    image_url:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    description_sections: [
      {
        title: "Na czym polegają zajęcia",
        content:
          "Zajęcia w małej grupie – wspólna nauka przy niższej cenie. Spotykamy się regularnie (wtorki lub czwartki), omawiamy zagadnienia z chemii, rozwiązujemy zadania i powtarzamy materiał przed maturą. Dzięki małej liczbie osób każdy ma przestrzeń na pytania i wyjaśnienia, a grupa motywuje do systematycznej pracy.",
      },
      {
        title: "Co wchodzi w skład kursu",
        bullets: [
          "Notatki",
          "Prezentacje",
          "Quizy",
          "Zadania do rozwiązania samodzielnie",
          "Nagrania z lekcji – wszystko w cenie zajęć",
        ],
      },
      {
        title: "Dla kogo?",
        content: "Świetna opcja, jeśli lubisz uczyć się w towarzystwie i chcesz połączyć naukę z dyskusją oraz wspólnym rozwiązywaniem zadań maturalnych.",
      },
    ],
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
    image_url:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
    description_sections: [
      {
        title: "Na czym polegają zajęcia",
        content:
          "Intensywna powtórka tuż przed maturą – zajęcia grupowe w weekendy (marzec i kwiecień). W pakiecie 20 godzin przechodzimy przez pełny zakres chemii rozszerzonej.",
      },
      {
        title: "Zakres merytoryczny",
        bullets: [
          "Stechiometria i reakcje",
          "Chemia organiczna i nieorganiczna",
          "Typowe zadania i arkusze CKE",
          "Słowa kluczowe, schematy punktowania i pułapki w zadaniach",
        ],
      },
      {
        title: "Co wchodzi w cenę kursu",
        bullets: [
          "Notatki",
          "Prezentacje",
          "Quizy",
          "Zadania do rozwiązania samodzielnie",
          "Nagrania z lekcji – możesz wrócić do każdego tematu przed egzaminem",
        ],
      },
      {
        title: "Dla kogo?",
        bullets: [
          "Masz już podstawy i chcesz uporządkować wiedzę",
          "Chcesz w ostatnich tygodniach przed egzaminem przećwiczyć zadania maturalne",
        ],
      },
    ],
    price: 399,
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
