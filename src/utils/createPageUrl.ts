/** Mapuje nazwy stron na ścieżki routingu. */
export function createPageUrl(path: string): string {
  const t = path.trim();
  if (t.startsWith("CourseDetails")) {
    const m = /CourseDetails\?id=([\w-]+)/.exec(t);
    return m ? `/course/${m[1]}` : "/Courses";
  }
  const map: Record<string, string> = {
    Home: "/",
    Courses: "/Courses",
    About: "/About",
    Contact: "/Contact",
  };
  return map[t] ?? (t.startsWith("/") ? t : `/${t}`);
}
