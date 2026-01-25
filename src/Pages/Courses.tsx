import React, { useState } from 'react';
import { getCourses } from "@/data/courses";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen } from "lucide-react";
import CourseCard from "@/components/CourseCard";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const { data: rawCourses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const courses = React.useMemo(() => {
    return [...(rawCourses ?? [])].sort((a, b) => {
      const oa = a.order ?? 999;
      const ob = b.order ?? 999;
      if (oa !== ob) return oa - ob;
      return (a.title ?? "").localeCompare(b.title ?? "");
    });
  }, [rawCourses]);

  const filteredCourses = courses.filter(course => {
    if (course.hidden_from_catalog) return false;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.short_description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-[#FFFBF0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1A3B47] mb-4">Katalog Kursów</h1>
          <p className="text-lg text-[#1A3B47]/80 max-w-2xl mx-auto">
            Wszystko czego potrzebujesz, aby opanować chemię. Od podstaw po zadania maturalne.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#D97745]/10 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3B47]/50 h-5 w-5" />
            <Input 
              placeholder="Szukaj kursu..." 
              className="pl-10 h-12 border-[#D97745]/10 bg-[#FFFBF0]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="h-12 border-[#D97745]/10 bg-[#FFFBF0]">
                <SelectValue placeholder="Poziom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie poziomy</SelectItem>
                <SelectItem value="podstawowy">Podstawowy</SelectItem>
                <SelectItem value="rozszerzony">Rozszerzony</SelectItem>
                <SelectItem value="studia">Studia</SelectItem>
              </SelectContent>
            </Select>
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
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-dashed border-[#D97745]/20">
                <div className="mx-auto w-16 h-16 bg-[#FFFBF0] rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-[#1A3B47]/40" />
                </div>
                <h3 className="text-lg font-medium text-[#1A3B47] mb-1">Brak kursów spełniających kryteria</h3>
                <p className="text-[#1A3B47]/60">Spróbuj zmienić filtry wyszukiwania.</p>
                <Button 
                  variant="link" 
                  className="text-[#D97745] mt-2"
                  onClick={() => { setSearchTerm(""); setLevelFilter("all"); }}
                >
                  Wyczyść filtry
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}