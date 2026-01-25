import type { Course } from "@/Utilities/Course";

/**
 * Lokalna lista kursów. Dodaj obiekty z polem `id` lub podłącz własne API.
 */
const COURSES: Course[] = [];

export async function getCourses(): Promise<Course[]> {
  return [...COURSES];
}

export async function getCourseById(id: string): Promise<Course | null> {
  const list = await getCourses();
  return list.find((c) => c.id === id) ?? null;
}
