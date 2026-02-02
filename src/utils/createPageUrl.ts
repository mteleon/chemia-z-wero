/** Mapuje nazwy stron na ścieżki routingu (SEO: małe litery, polskie słowa kluczowe). */
export function createPageUrl(path: string): string {
  const t = path.trim();
  if (t.startsWith("CourseDetails")) {
    const m = /CourseDetails\?id=([\w-]+)/.exec(t);
    return m ? `/kursy/${m[1]}` : "/kursy";
  }
  if (t.startsWith("PostDetail")) {
    const m = /PostDetail\?slug=([\w-]+)/.exec(t);
    return m ? `/blog/${m[1]}` : "/blog";
  }
  const map: Record<string, string> = {
    Home: "/",
    Courses: "/kursy",
    Posts: "/blog",
    About: "/o-mnie",
    Contact: "/kontakt",
  };
  return map[t] ?? (t.startsWith("/") ? t : `/${t}`);
}
