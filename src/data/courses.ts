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
    title: "POWTÓRKA – CHEMIA NIEORGANICZNA (LIVE) 26.02 - 1.03.2026",
    short_description:
      "POWTÓRKA Z CHEMII – ucz się mądrze, nie więcej.\n4 spotkania po 2 godziny\n17:00–19:00.",
    image_url: "/courses/powtorka-chem-nieorg.png",
    description_sections: [
      {
        title: "Cena",
        content: "160,00 zł.\nPoprzednia najniższa cena: 160,00 zł.",
      },
      {
        title: "POWTÓRKA Z CHEMII – ucz się mądrze, nie więcej",
        content:
          "Zamiast odkładania nauki na później – aktywnie i efektywnie wykorzystaj przerwę zimową. To zajęcia dla osób, które chcą wyjść z ferii z realnym postępem, a nie tylko z poczuciem, że coś tam powtórzyły.",
        bullets: [
          "4 zajęcia po 2 godziny (w trakcie 15 minut przerwy)",
          "Godziny: 17:00–19:00",
        ],
      },
      {
        title: "CEL",
        bullets: [
          "Zrozumieć chemię nieorganiczną w sposób logiczny i maturalny",
          "Wiedzieć, co robić w zadaniu maturalnym i jak poprawnie uzasadnić odpowiedź",
          "Wyjść z ferii z realnym postępem i większą pewnością przed maturą",
        ],
      },
      {
        title: "DZIEŃ 1: ATOM → WIĄZANIA → CZĄSTECZKA",
        content: "Fundament pod całą chemię nieorganiczną",
        bullets: [
          "Budowa atomu: protony, neutrony, elektrony (tylko w kontekście właściwości)",
          "Izotopy",
          "Konfiguracja elektronowa: powłoka walencyjna, dlaczego pierwiastek tworzy jony / wiązania",
          "Typy wiązań",
          "Polarność",
          "Kształt cząsteczek (model VSEPR)",
          "Wstęp do stopni utlenienia",
        ],
      },
      {
        title: "DZIEŃ 2: TLENKI, WODORKI, KWASY, WODOROTLENKI, TEORIE KWAS–ZASADA – LOGIKA MATURY",
        bullets: [
          "Tlenki: kwasowe, zasadowe, amfoteryczne",
          "Wodorki: jonowe vs kowalencyjne, właściwości maturalne",
          "Kwasy: mocne vs słabe, jedno- i wieloprotonowe",
          "Wodorotlenki: zasady mocne i słabe",
          "Teorie kwas–zasada: Arrheniusa, Lewisa, Brønsteda (zastosowanie w zadaniach)",
          "Dysocjacja elektrolityczna",
          "Odczyn roztworu",
        ],
      },
      {
        title: "DZIEŃ 3: SOLE I REAKCJE REDOX",
        content: "Najczęstsze zadania decyzyjne na maturze",
        bullets: [
          "Rodzaje soli: obojętne, kwasowe, zasadowe",
          "Reakcje otrzymywania soli",
          "Hydroliza soli: schemat decyzyjny, odczyn roztworu",
          "Stopnie utlenienia",
          "Reakcje redox",
          "Typowe zadania maturalne z redox",
        ],
      },
      {
        title: "DZIEŃ 4: METALE I ELEKTROCHEMIA",
        content: "„Czy ta reakcja zajdzie – i dlaczego?”",
        bullets: [
          "Metale bloku s i d – tylko maturalne core",
          "Szereg aktywności metali i jego praktyczne zastosowanie",
          "Pasywacja metali",
          "Chrom i mangan – klasyka matury",
          "Elektrochemia – core formuły 2023",
        ],
      },
      {
        title: "Co otrzymasz?",
        bullets: [
          "+8 godzin zajęć na żywo (4 spotkania po ok. 2 godziny)",
          "Materiały do każdego spotkania, w tym:",
          "– przejrzyste prezentacje",
          "– zestawy zadań maturalnych do samodzielnego rozwiązania",
          "Dostęp do nagrań ze wszystkich zajęć (nic Ci nie ucieknie)",
          "Kod rabatowy na WIELKĄ POWTÓRKĘ MATURALNĄ z chemii w kwietniu",
          "*Nie przerabiamy wszystkiego „po kolei” - Skupiamy się na NAJWAŻNIEJSZYCH zagadnieniach chemii nieorganicznej, które realnie pojawiają się na maturze i pozwalają zdobyć punkty",
        ],
      },
      {
        title: "Czego świadomie NIE MA w tej POWTÓRCE",
        bullets: [
          "Stechiometrii (mole, stężenia, gazy, obliczenia)",
          "Kinetyki i równowagi",
          "Akademickiej teorii bez przełożenia na maturę",
        ],
      },
      {
        title: "FAQ / Najczęściej zadawane pytania",
        bullets: [
          "Czy po zapisie mogę zwrócić zakupiony udział w zajęciach?||Niestety nie. Ze względu na charakter zajęć online oraz natychmiastowy dostęp do materiałów i nagrań, zwrot po zapisie nie jest możliwy. Proszę o przemyślaną decyzję przed dokonaniem zakupu.",
          "Czy muszę być obecny/a na zajęciach, aby skorzystać z kursu?||Nie. Obecność na żywo nie jest obowiązkowa. Każdy uczestnik otrzymuje dostęp do nagrań oraz materiałów, więc możesz przerobić zajęcia w dogodnym dla siebie czasie.",
          "Czy ten kurs jest odpowiedni dla matury w formule 2023?||Tak. Zakres zajęć jest w pełni dopasowany do aktualnych wymagań egzaminacyjnych (formuła 2023) oraz oparty na analizie zadań maturalnych z ostatnich lat.",
          "Czy na zajęciach będzie tylko teoria?||Nie. Zajęcia mają formę praktyczno-teoretyczną. Oprócz omówienia zagadnień rozwiązujemy zadania, które pojawiły się już na maturze, oraz uczymy się, jak poprawnie pisać odpowiedzi.",
          "Czy przerobimy wszystkie tematy od podstaw?||Nie. W czasie jednego spotkania nie da się omówić całych działów od zera. Skupiamy się na najważniejszych zagadnieniach z perspektywy maturalnej — tych, które pojawiają się najczęściej i dają realne punkty.",
          "Czy trzeba mieć włączoną kamerkę lub mikrofon?||Nie. Proszę o niewłączanie kamerek i mikrofonów. Zajęcia prowadzone są w formie wykładowo-warsztatowej, z możliwością zadawania pytań na czacie.",
        ],
      },
    ],
    price: 160,
    price_label: "pakiet",
    level: "rozszerzony",
    status: "available",
    duration: "8 godzin",
    schedule: "26.02–1.03.2026, 17:00–19:00",
    order: 3,
    features: [
      "5 spotkań live po 2 godziny",
      "Chemia nieorganiczna w ujęciu maturalnym",
      "Zadania, uzasadnienia i schematy odpowiedzi",
      "Dostęp do nagrań i materiałów",
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
