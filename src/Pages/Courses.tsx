import React from 'react';
import { Link } from "react-router-dom";
import { getCourses } from "@/data/courses";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BookOpen, Calendar, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import SEO from "@/components/SEO";
import { CALENDLY_URL } from "@/utils/constants";

const COURSES_TITLE = "Kursy z chemii – Chemia z Wero";
const COURSES_DESCRIPTION =
  "Lekcje indywidualne, grupowe i powtórka maturalna z chemii. Korepetycje online – matura rozszerzona. Zapisz się na zajęcia.";

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
      <SEO path="/kursy" title={COURSES_TITLE} description={COURSES_DESCRIPTION} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nagłówek strony – wspólny wzorzec dla Kursy / Blog / Kontakt */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1A3B47] tracking-tight mb-4">Oferta kursów</h1>
          <p className="text-lg text-[#1A3B47]/80 max-w-2xl mx-auto leading-relaxed">
            Wszystko czego potrzebujesz, aby opanować chemię. Od podstaw po zadania maturalne.
          </p>
        </header>

        <div className="mb-12 rounded-2xl border border-[#D97745]/20 bg-white px-5 py-5 text-center sm:px-8">
          <p className="text-base font-semibold text-[#1A3B47]">Nie wiesz, od czego zacząć?</p>
          <p className="mt-1 text-sm text-[#1A3B47]/65">Sprawdź swój poziom samodzielnie albo porozmawiajmy na darmowej lekcji próbnej.</p>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="outline" className="rounded-full border-[#1A3B47]/20 text-[#1A3B47] hover:bg-[#FFFBF0]"><Link to="/test-diagnostyczny-chemia">Zrób test diagnostyczny</Link></Button>
            <Button asChild className="rounded-full bg-[#D97745] px-6 text-white hover:bg-[#c66535]">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"><Calendar className="mr-2 w-4 h-4" /> Umów lekcję próbną</a>
            </Button>
          </div>
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

        <section className="mt-16 overflow-hidden rounded-3xl bg-[#1A3B47] text-white shadow-lg">
          <div className="flex flex-col items-start justify-between gap-6 p-7 sm:p-10 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4B942]/40 bg-[#F4B942]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F4B942]"><FlaskConical className="h-4 w-4" />Darmowy test</div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Nie wiesz, od czego zacząć naukę?</h2>
              <p className="mt-3 leading-relaxed text-white/75">Sprawdź swój poziom z chemii nieorganicznej i stechiometrii. W 35 minut dowiesz się, które działy potrzebują Twojej uwagi.</p>
            </div>
            <Button asChild className="shrink-0 rounded-full bg-[#D97745] px-6 text-white hover:bg-[#c66535]"><Link to="/test-diagnostyczny-chemia">Sprawdź swój poziom <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </section>
      </div>
    </div>
  );
}
