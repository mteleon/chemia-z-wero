import type { NotesBundle, Testimonial } from "@/Utilities/NotesBundle";

const topics = [
  "Budowa atomu",
  "Budowa atomu i tworzenie cząsteczek",
  "Kształty cząsteczek i stopnie utlenienia",
  "Tlenki, wodorki i kwasy",
  "Wodorotlenki",
  "Teorie kwasów i zasad",
  "Sole",
  "Reakcje redoks",
  "Chrom, mangan i inne ważne pierwiastki",
  "Elektrochemia",
  "Stechiometria 1",
  "Stechiometria 2",
  "Stechiometria 3",
  "Stężenia",
  "Rozpuszczalność",
  "Alkany",
  "Alkeny i alkiny",
  "Areny",
  "Alkohole i fenole",
  "Aldehydy i ketony",
  "Kwasy karboksylowe i estry",
  "Tłuszcze i mydła",
  "Aminy, amidy, aminokwasy, peptydy",
  "Izomeria optyczna i związki wielofunkcyjne",
  "Cukry",
  "Kinetyka, stała równowagi",
  "Reguła przekory i termochemia",
];

const testimonials: Testimonial[] = [
  {
    name: "Kasia",
    detail: "matura 2024, 84%",
    text: "Miałam miesiąc do matury i nie wiedziałam jak zabrać się za powtórkę. Zaczęłam przerabiać podręczniki od pierwszej klasy, ale szło mega wolno. W notatkach Wero znalazłam wszystkie najważniejsze informacje i zdążyłam powtórzyć cały materiał.",
  },
  {
    name: "Michał",
    detail: "matura 2024, 82%",
    text: "Notatki są bardzo przejrzyste. Każdy temat na kilku stronach, bez lania wody. Szczególnie pomogły mi schematy reakcji w organice, które są dużo czytelniejsze niż w podręczniku. ;)",
  },
  {
    name: "Zosia",
    detail: "matura 2023, 91%",
    text: "Pół roku korepetycji u Wero dało mi więcej niż 4 lata nauki z moją tragiczną nauczycielką. Z notatkami nie rozstawałam się przed maturą aż do wejścia na salę. Dzięki Wero <3",
  },
];

export const notesBundle: NotesBundle = {
  id: "pakiet-notatek-chemia-matura",
  slug: "notatki",
  title: "Pakiet notatek maturalnych z chemii",
  shortDescription:
    "Kompletny zestaw 27 notatek PDF do matury rozszerzonej z chemii.",
  fullDescription:
    "Chemia na maturze rozszerzonej to ogrom materiału, ale da się go ogarnąć! Ten pakiet to 27 starannie opracowanych notatek z całego zakresu do matury, które zbierają wszystko, co ważne: teorię, reakcje, schematy i podsumowania. Bez szukania po podręcznikach, zeszytach i zbiorach zadań.",
  status: "coming_soon",
  price: 69,
  promoPrice: 49,
  priceLabel: "Jednorazowy zakup pakietu",
  notesCount: 27,
  formatLabel: "PDF",
  accessLabel: "Dostęp online po zakupie",
  updatesLabel: "Aktualizacje pakietu w cenie",
  features: [
    "27 notatek w jednej spójnej strukturze",
    "Materiał pod maturę rozszerzoną",
    "Przejrzyste podsumowania i schematy",
    "Wersja do druku i nauki na telefonie/tablecie",
  ],
  topics: topics.map((title, index) => ({ number: index + 1, title })),
  testimonials,
  previewSlides: [
    {
      id: "preview-01",
      title: "Budowa atomu",
      pdfPath: "/notes-preview/01_budowa_atomu_preview.pdf",
    },
    {
      id: "preview-05",
      title: "Wodorotlenki",
      pdfPath: "/notes-preview/05_wodorotlenki_preview.pdf",
    },
    {
      id: "preview-09",
      title: "Elektrochemia",
      pdfPath: "/notes-preview/10_elektrochemia_preview.pdf",
    },
  ],
};

export async function getNotesBundle(): Promise<NotesBundle> {
  return Promise.resolve(notesBundle);
}
