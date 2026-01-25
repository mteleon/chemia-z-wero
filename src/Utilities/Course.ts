/** Typ Course (kurs). */
export type Course = {
  id?: string;
  title: string;
  short_description?: string;
  full_description?: string;
  price: number;
  price_label?: string;
  level?: "podstawowy" | "rozszerzony" | "studia" | "wszystkie";
  status?: "available" | "coming_soon";
  duration?: string;
  schedule?: string;
  features?: string[];
  image_url?: string;
  hidden_from_catalog?: boolean;
  order?: number;
  promo_price?: number;
  promo_end_date?: string;
  promo_label?: string;
};

export function isPromoActive(c: Course): boolean {
  return !!(
    c.promo_price != null &&
    c.promo_end_date &&
    new Date() <= new Date(c.promo_end_date + "T23:59:59")
  );
}
