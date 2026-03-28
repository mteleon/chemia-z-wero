export type NotesBundleStatus = "available" | "coming_soon";

export interface Testimonial {
  name: string;
  /** Krótki kontekst, np. "matura 2024, 94%" */
  detail: string;
  text: string;
}

export interface NotesTopic {
  number: number;
  title: string;
}

export interface NotesPreviewSlide {
  id: string;
  title: string;
  pdfPath: string;
}

export interface NotesBundle {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  status: NotesBundleStatus;
  price: number;
  promoPrice?: number;
  promoLabel?: string;
  priceLabel: string;
  notesCount: number;
  formatLabel: string;
  accessLabel: string;
  updatesLabel: string;
  features: string[];
  topics: NotesTopic[];
  previewSlides: NotesPreviewSlide[];
  testimonials?: Testimonial[];
}
