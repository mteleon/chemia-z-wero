/** Typ Course (kurs). */
export type Course = {
  id?: string;
  title: string;
  short_description?: string;
  full_description?: string;
  price: number;
  level?: "podstawowy" | "rozszerzony" | "studia" | "wszystkie";
  status?: "available" | "coming_soon";
  duration?: string;
  features?: string[];
  image_url?: string;
  hidden_from_catalog?: boolean;
};
