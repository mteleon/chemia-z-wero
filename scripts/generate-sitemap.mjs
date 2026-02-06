import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const POSTS_DIR = path.join(ROOT, "src", "content", "posts");
const LANDINGS_FILE = path.join(ROOT, "src", "data", "landings.ts");
const COURSES_FILE = path.join(ROOT, "src", "data", "courses.ts");
const CONSTANTS_FILE = path.join(ROOT, "src", "utils", "constants.ts");

function readFileSafe(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function extractSlugsFromTs(source, key) {
  const re = new RegExp(`${key}\\s*:\\s*\"([^\"]+)\"`, "g");
  const out = new Set();
  let m;
  while ((m = re.exec(source))) {
    out.add(m[1]);
  }
  return [...out];
}

function extractSiteUrl(source) {
  const m = /SITE_URL\s*=\s*\"([^\"]+)\"/.exec(source);
  return m ? m[1] : "https://chemiazwero.com";
}

function extractFrontmatterDate(md) {
  const m = /publishedAt\s*:\s*"?(\d{4}-\d{2}-\d{2})"?/m.exec(md);
  return m ? m[1] : null;
}

function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      filePath: path.join(POSTS_DIR, f),
    }));
}

function buildUrlSet(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n` +
    urls.map((u) => {
      const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "";
      const changefreq = u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : "";
      const priority = u.priority ? `\n    <priority>${u.priority}</priority>` : "";
      return `  <url>\n    <loc>${u.loc}</loc>${lastmod}${changefreq}${priority}\n  </url>`;
    }).join("\n") +
    `\n</urlset>\n`;
}

const constantsSource = readFileSafe(CONSTANTS_FILE);
const SITE_URL = extractSiteUrl(constantsSource);
const today = new Date().toISOString().slice(0, 10);

const landingsSource = readFileSafe(LANDINGS_FILE);
const coursesSource = readFileSafe(COURSES_FILE);

const landingSlugs = extractSlugsFromTs(landingsSource, "slug");
const courseIds = extractSlugsFromTs(coursesSource, "id");
const posts = getPostSlugs();

const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/kursy", changefreq: "weekly", priority: "0.9" },
  { path: "/o-mnie", changefreq: "monthly", priority: "0.8" },
  { path: "/kontakt", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
];

const urls = [];

for (const page of staticPages) {
  urls.push({
    loc: `${SITE_URL}${page.path}`,
    lastmod: today,
    changefreq: page.changefreq,
    priority: page.priority,
  });
}

for (const slug of landingSlugs) {
  urls.push({
    loc: `${SITE_URL}/${slug}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.8",
  });
}

for (const id of courseIds) {
  urls.push({
    loc: `${SITE_URL}/kursy/${id}`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.8",
  });
}

for (const post of posts) {
  const raw = readFileSafe(post.filePath);
  const publishedAt = extractFrontmatterDate(raw) ?? today;
  urls.push({
    loc: `${SITE_URL}/blog/${post.slug}`,
    lastmod: publishedAt,
    changefreq: "monthly",
    priority: "0.7",
  });
}

const sitemapXml = buildUrlSet(urls);

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), sitemapXml, "utf8");

console.log(`Generated sitemap with ${urls.length} URLs.`);
