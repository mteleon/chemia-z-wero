import matter from "gray-matter";
import type { Post } from "@/Utilities/Post";

/** Wpisy ładowane dynamicznie – dodaj plik .md w src/content/posts/, slug = nazwa pliku bez .md. */
const postModules = import.meta.glob<string>("../content/posts/*.md", {
  query: "?raw",
  import: "default",
});

function pathToSlug(path: string): string {
  const name = path.split("/").pop() ?? "";
  return name.replace(/\.md$/, "");
}

type Frontmatter = {
  title: string;
  excerpt: string;
  publishedAt: string;
  order?: number;
};

function estimateReadTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parsePost(raw: string, slug: string): Post | null {
  if (!raw.trim()) return null;
  const parsed = matter(raw);
  const data = parsed.data as Frontmatter;
  if (!data?.title || !data?.excerpt || !data?.publishedAt) return null;
  const content = parsed.content.trim();
  return {
    id: slug,
    slug,
    title: data.title,
    excerpt: data.excerpt,
    content,
    publishedAt: data.publishedAt,
    order: data.order ?? 999,
    readTimeMinutes: estimateReadTimeMinutes(content),
  };
}

export async function getPosts(): Promise<Post[]> {
  const entries = await Promise.all(
    Object.entries(postModules).map(async ([path, load]) => {
      const slug = pathToSlug(path);
      if (slug === "README") return null;
      const raw = await load();
      return parsePost(raw, slug);
    })
  );
  const posts = entries.filter((p): p is Post => p !== null);
  return posts.sort((a, b) => {
    const oa = a.order ?? 999;
    const ob = b.order ?? 999;
    if (oa !== ob) return oa - ob;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const list = await getPosts();
  return list.find((p) => p.slug === slug) ?? null;
}
