import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/utils/constants";

const DEFAULT_TITLE = "Chemia z Wero – Korepetycje z chemii, matura rozszerzona online";
const DEFAULT_DESCRIPTION =
  "Chemia z Wero – korepetycje z chemii online, matura rozszerzona. Lekcje indywidualne i grupowe, powtórka przed maturą. Korepetycje online z pasją.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;

const DEFAULT_ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Chemia z Wero",
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
};

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  robots?: string;
  /** Custom JSON-LD (e.g. Course schema). When set, replaces default Organization schema. */
  jsonLd?: Record<string, unknown>;
};

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  robots = "index, follow",
  jsonLd,
}: SEOProps) {
  const canonical = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : SITE_URL;
  const schema = jsonLd ?? DEFAULT_ORGANIZATION_JSON_LD;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
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
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
