import React, { useState, useMemo } from "react";
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
import { CALENDLY_URL, SITE_URL } from "@/utils/constants";
import { isPromoActive } from "@/Utilities/Course";
import type { Course } from "@/Utilities/Course";
import EnrollmentForm from "@/components/EnrollmentForm";
import SEO from "@/components/SEO";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";

function buildCourseJsonLd(course: Course): Record<string, unknown> {
  const url = `${SITE_URL}/kursy/${course.id ?? ""}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.short_description ?? course.title,
    url,
    provider: {
      "@type": "Organization",
      name: "Chemia z Wero",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "PLN",
      availability: course.status === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    },
  };
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id!),
    enabled: !!id,
  });

  const courseJsonLd = useMemo(
    () => (course ? buildCourseJsonLd(course) : {}),
    [course]
  );

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

  const coursePath = `/kursy/${course.id ?? id}`;
  const seoTitle = `${course.title} – Chemia z Wero`;
  const seoDescription = course.short_description ?? `Kurs z chemii: ${course.title}. Korepetycje online, matura rozszerzona.`;

  return (
    <div className="bg-[#FFFBF0] min-h-screen pb-24">
      <SEO path={coursePath} title={seoTitle} description={seoDescription} jsonLd={courseJsonLd} />
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
                {(course.short_description ?? "").split("\n").map((line, idx, arr) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {course.id === "powtorka-maturalna" && (
              <div className="space-y-3">
                <p className="text-lg font-semibold text-[#1A3B47]">
                  POWTÓRKA Z CHEMII – ucz się mądrze, nie więcej.
                </p>
              </div>
            )}
            <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">O tym kursie</h2>
              <div className="prose prose-slate max-w-none text-[#1A3B47]/80 space-y-8">
                {course.description_sections && course.description_sections.length > 0 ? (
                  course.id === "powtorka-maturalna" ? (
                    <div className="space-y-10">
                      {course.description_sections
                        .filter(
                          (section) =>
                            !section.title.startsWith("FAQ") &&
                            !section.title.startsWith("Co otrzymasz")
                        )
                        .map((section, idx) => {
                        const isDay = section.title.startsWith("DZIEŃ");
                        const isNoItems = section.title.includes("NIE MA");
                        const isReceive = section.title.startsWith("Co otrzymasz");
                        return (
                          <section key={idx} className="space-y-4">
                            <div className="flex items-start gap-3">
                              {isDay && (
                                <span className="w-6 h-6 bg-[#2F73FF] rounded-lg mt-0.5 flex-shrink-0" />
                              )}
                              <h3 className="text-lg font-semibold text-[#1A3B47] leading-snug">
                                {section.title}
                              </h3>
                            </div>
                            {section.content && (
                              <p className={`leading-relaxed text-[#1A3B47]/80 ${isDay ? "ml-9" : ""}`}>
                                {section.content.split("\n").map((line, lineIdx) => (
                                  <React.Fragment key={lineIdx}>
                                    {line}
                                    {lineIdx < section.content!.split("\n").length - 1 && <br />}
                                  </React.Fragment>
                                ))}
                              </p>
                            )}
                            {section.bullets && section.bullets.length > 0 && (
                              <>
                                {isReceive ? (
                                  <div className="space-y-3 text-[#1A3B47]/80">
                                    {section.bullets.map((item, i) => {
                                      const isSub = item.trim().startsWith("– ");
                                      const isNote = item.trim().startsWith("*");
                                      if (isSub) {
                                        return (
                                          <div key={i} className="pl-8">
                                            <span className="mr-2">–</span>
                                            <span>{item.trim().slice(2)}</span>
                                          </div>
                                        );
                                      }
                                      if (isNote) {
                                        return (
                                          <p key={i} className="italic text-[#1A3B47]/70">
                                            {item.trim().replace(/^\*\s?/, "")}
                                          </p>
                                        );
                                      }
                                      return (
                                        <div key={i} className="flex items-start gap-2">
                                          <span className="text-[#1A3B47] font-semibold">✓</span>
                                          <span>{item}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : isNoItems ? (
                                  <ul className="space-y-2 text-[#1A3B47]/80">
                                    {section.bullets.map((bullet, i) => (
                                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                                        <span className="text-red-500">✗</span>
                                        <span>{bullet}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <ul className={`list-disc space-y-2 text-[#1A3B47]/80 ${isDay ? "pl-10" : "pl-6"}`}>
                                    {section.bullets.map((bullet, i) => (
                                      <li key={i} className="leading-relaxed">{bullet}</li>
                                    ))}
                                  </ul>
                                )}
                              </>
                            )}
                          </section>
                        );
                      })}
                    </div>
                  ) : (
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
                  )
                ) : course.full_description ? (
                  <p className="leading-relaxed">{course.full_description}</p>
                ) : (
                  <p>Szczegółowy opis kursu wkrótce...</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">
                {course.id === "powtorka-maturalna" ? "Co otrzymasz?" : "Czego się nauczysz?"}
              </h2>
              {course.id === "powtorka-maturalna" ? (
                <div className="space-y-3 text-[#1A3B47]/80">
                  {(course.description_sections ?? [])
                    .find((section) => section.title.startsWith("Co otrzymasz"))
                    ?.bullets?.map((item, i) => {
                      const isSub = item.trim().startsWith("– ");
                      const isNote = item.trim().startsWith("*");
                      if (isSub) {
                        return (
                          <div key={i} className="pl-8">
                            <span className="mr-2">–</span>
                            <span>{item.trim().slice(2)}</span>
                          </div>
                        );
                      }
                      if (isNote) {
                        return (
                          <p key={i} className="italic text-[#1A3B47]/70">
                            {item.trim().replace(/^\*\s?/, "")}
                          </p>
                        );
                      }
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#D97745] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features && course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#D97745] flex-shrink-0 mt-0.5" />
                      <span className="text-[#1A3B47]/80">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {course.id === "powtorka-maturalna" && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[#D21F1F] text-2xl leading-none">?</span>
                  <h2 className="text-2xl font-bold text-[#1A3B47]">
                    Najczęściej zadawane pytania (FAQ)
                  </h2>
                </div>
                <div className="divide-y divide-[#1A3B47]/10">
                  {(course.description_sections ?? [])
                    .find((section) => section.title.startsWith("FAQ"))
                    ?.bullets?.map((item, i) => {
                      const [question, answer] = item.split("||").map((part) => part.trim());
                      return (
                        <div key={i} className="py-5">
                          <div className="flex items-start gap-4">
                            <span className="w-7 h-7 rounded-md bg-gradient-to-b from-[#EEF3FA] to-[#D9E4F2] border border-[#B6C6DA] text-[#1A3B47] text-sm font-semibold flex items-center justify-center flex-shrink-0">
                              {i + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-[#1A3B47]">
                                {question}
                              </p>
                              {answer && (
                                <p className="mt-2 text-[#1A3B47]/80 leading-relaxed">
                                  {answer}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Pricing Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-[#D97745]/10 p-6 sticky top-24">
              <div className="bg-[#FFFBF0] rounded-xl mb-6 overflow-hidden relative group p-3">
                 {course.image_url ? (
                   <img src={course.image_url} alt="" className="w-full h-auto object-contain rounded-lg" />
                 ) : (
                   <div className="w-full h-40 flex items-center justify-center">
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
                <Button variant="outline" className="w-full border-[#1A3B47]/20 text-[#1A3B47] h-12" asChild>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    Umów lekcję próbną
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
