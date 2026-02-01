import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseById } from "@/data/courses";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createPageUrl } from "@/utils";
import { isPromoActive } from "@/Utilities/Course";
import EnrollmentForm from "@/components/EnrollmentForm";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D97745]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF0]">
        <h1 className="text-2xl font-bold text-[#1A3B47] mb-4">Nie znaleziono kursu</h1>
        <Button className="bg-[#D97745] hover:bg-[#c66535]" asChild>
          <Link to={createPageUrl('Courses')}>Wróć do listy kursów</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBF0] min-h-screen pb-24">
      {/* Header / Hero */}
      <div className="bg-[#1A3B47] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <Link to={createPageUrl('Courses')} className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Wróć do kursów
          </Link>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex gap-2">
                 {course.level === 'wszystkie' ? (
                   <>
                     <Badge className="bg-[#D97745] hover:bg-[#c66535] text-white border-none">
                        Poziom Podstawowy
                     </Badge>
                     <Badge className="bg-[#D97745] hover:bg-[#c66535] text-white border-none">
                        Poziom Rozszerzony
                     </Badge>
                   </>
                 ) : (
                   <Badge className="bg-[#D97745] hover:bg-[#c66535] text-white border-none">
                      {course.level === 'rozszerzony' ? 'Poziom Rozszerzony' : 
                       course.level === 'podstawowy' ? 'Poziom Podstawowy' : 
                       course.level === 'studia' ? 'Studia' : 'Poziom Podstawowy'}
                   </Badge>
                 )}
                 {course.duration && <Badge variant="outline" className="text-white/80 border-white/20">{course.duration}</Badge>}
                 {course.schedule && <Badge variant="outline" className="text-white/80 border-white/20">{course.schedule}</Badge>}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{course.title}</h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                {course.short_description}
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">O tym kursie</h2>
              <div className="prose prose-slate max-w-none text-[#1A3B47]/80 space-y-8">
                {course.description_sections && course.description_sections.length > 0 ? (
                  course.description_sections.map((section, idx) => (
                    <section key={idx}>
                      <h3 className="text-lg font-semibold text-[#1A3B47] mb-3">
                        {section.title}
                      </h3>
                      {section.content && (
                        <p className="mb-3 leading-relaxed">{section.content}</p>
                      )}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="list-disc pl-6 space-y-2">
                          {section.bullets.map((bullet, i) => (
                            <li key={i} className="leading-relaxed">{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))
                ) : course.full_description ? (
                  <p className="leading-relaxed">{course.full_description}</p>
                ) : (
                  <p>Szczegółowy opis kursu wkrótce...</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">Czego się nauczysz?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.features && course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D97745] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1A3B47]/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Pricing Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-[#D97745]/10 p-6 sticky top-24">
              <div className="aspect-video bg-[#FFFBF0] rounded-xl mb-6 overflow-hidden relative group">
                 {course.image_url ? (
                   <img src={course.image_url} alt="" className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center">
                     <BookOpen className="w-12 h-12 text-[#1A3B47]/20" />
                   </div>
                 )}
              </div>
              
              <div className="mb-6">
                {isPromoActive(course) ? (
                  <>
                    <div className="text-3xl font-bold text-[#1A3B47] mb-1">{course.promo_price} zł</div>
                    <div className="text-sm text-[#1A3B47]/50 line-through">{course.price} zł — cena regularna</div>
                    <div className="text-sm text-[#D97745] font-medium mt-1">{course.promo_label ?? "Cena promocyjna"}</div>
                  </>
                ) : (
                  <div className="text-3xl font-bold text-[#1A3B47] mb-1">{course.price} zł</div>
                )}
                <div className="text-sm text-[#1A3B47]/60">{course.price_label || "Dostęp na rok"}</div>
              </div>

              <div className="space-y-3 mb-8">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#D97745] hover:bg-[#c66535] text-white h-12 text-lg">
                      Zapisz się
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Zapisz się na kurs</DialogTitle>
                      <DialogDescription>
                        Wypełnij formularz, a wkrótce otrzymasz dane do płatności.
                      </DialogDescription>
                    </DialogHeader>
                    <EnrollmentForm
                      course={course}
                      onClose={() => setIsDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}