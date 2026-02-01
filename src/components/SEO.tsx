import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/utils/constants";

const DEFAULT_TITLE = "Chemia z Wero – Matura Rozszerzona";
const DEFAULT_DESCRIPTION =
  "Lekcje i kursy z chemii stworzone z pasją. Indywidualnie, w grupie lub intensywna powtórka przed maturą – doprowadzę Cię do wymarzonego wyniku.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
}: SEOProps) {
  const canonical = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : SITE_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Chemia z Wero",
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:site_name" content="Chemia z Wero" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
