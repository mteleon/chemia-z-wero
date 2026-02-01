/** Mapuje nazwy stron na ścieżki routingu (SEO: małe litery, polskie słowa kluczowe). */
export function createPageUrl(path: string): string {
  const t = path.trim();
  if (t.startsWith("CourseDetails")) {
    const m = /CourseDetails\?id=([\w-]+)/.exec(t);
    return m ? `/kursy/${m[1]}` : "/kursy";
  }
  const map: Record<string, string> = {
    Home: "/",
    Courses: "/kursy",
    About: "/o-mnie",
    Contact: "/kontakt",
  };
  return map[t] ?? (t.startsWith("/") ? t : `/${t}`);
}
