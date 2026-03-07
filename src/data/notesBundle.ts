import type { NotesBundle } from "@/Utilities/NotesBundle";

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

export const notesBundle: NotesBundle = {
  id: "pakiet-notatek-chemia-matura",
  slug: "notatki",
  title: "Pakiet notatek maturalnych z chemii",
  shortDescription:
    "Kompletny zestaw 27 notatek PDF do matury rozszerzonej z chemii.",
  fullDescription:
    "Pakiet zawiera cały materiał w uporządkowanej kolejności: teoria, schematy, najważniejsze reakcje i podsumowania pod maturę.",
  status: "coming_soon",
  price: 49,
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
