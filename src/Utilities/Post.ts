/** Typ wpisu na blogu. */
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  order?: number;
  image_url?: string;
  /** Szacowany czas czytania w minutach. */
  readTimeMinutes?: number;
};
