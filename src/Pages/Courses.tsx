import React from 'react';
import { getCourses } from "@/data/courses";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import { CALENDLY_URL } from "@/utils/constants";

export default function Courses() {
  const { data: rawCourses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const courses = React.useMemo(() => {
    return [...(rawCourses ?? [])]
      .filter(course => !course.hidden_from_catalog)
      .sort((a, b) => {
        const oa = a.order ?? 999;
        const ob = b.order ?? 999;
        if (oa !== ob) return oa - ob;
        return (a.title ?? "").localeCompare(b.title ?? "");
      });
  }, [rawCourses]);

  return (
    <div className="min-h-screen bg-[#FFFBF0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1A3B47] mb-4">Oferta kursów</h1>
          <p className="text-lg text-[#1A3B47]/80 max-w-2xl mx-auto">
            Wszystko czego potrzebujesz, aby opanować chemię. Od podstaw po zadania maturalne.
          </p>
        </div>

        {/* Darmowa lekcja próbna */}
        <div className="mb-12 p-6 rounded-2xl bg-white border border-[#D97745]/20 text-center">
          <p className="text-lg font-medium text-[#1A3B47] mb-4">
            Nie wiesz co wybrać? Umów się na darmową lekcję próbną.
          </p>
          <Button asChild className="bg-[#D97745] hover:bg-[#c66535] text-white rounded-full px-6 gap-2">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Calendar className="w-4 h-4" /> Umów lekcję próbną
            </a>
          </Button>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-[400px] bg-[#FFFBF0] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-dashed border-[#D97745]/20">
                <div className="mx-auto w-16 h-16 bg-[#FFFBF0] rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-[#1A3B47]/40" />
                </div>
                <h3 className="text-lg font-medium text-[#1A3B47] mb-1">Brak dostępnych kursów</h3>
                <p className="text-[#1A3B47]/60">Kursy pojawią się wkrótce.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}