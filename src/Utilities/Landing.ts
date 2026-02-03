/** Jedna korzyść / punkt na stronie landing. */
export type LandingBenefit = {
  title: string;
  description?: string;
};

/** Typ Landing (strona docelowa pod słowo kluczowe). */
export type Landing = {
  /** Slug = ścieżka URL bez ukośnika (np. korepetycje-z-chemii-online). */
  slug: string;
  /** Tytuł wyświetlany (np. w nawigacji). */
  title: string;
  /** Meta title (SEO). */
  metaTitle: string;
  /** Meta description (SEO, ok. 155 znaków). */
  metaDescription: string;
  /** Nagłówek H1 w sekcji hero. */
  heroHeading: string;
  /** Krótki podtytuł pod H1. */
  heroSubheading: string;
  /** Lista korzyści (punkty z ikoną). */
  benefits: LandingBenefit[];
  /** ID kursów do wyświetlenia (CourseCard). */
  relatedCourseIds: string[];
  /** Slugi wpisów blogowych do linków "Więcej w blogu". */
  relatedPostSlugs: string[];
};
