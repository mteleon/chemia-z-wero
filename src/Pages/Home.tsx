import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Atom, Microscope } from 'lucide-react';
import { motion } from "framer-motion";
import { getCourses } from "@/data/courses";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "@/components/CourseCard";
import SEO from "@/components/SEO";

export default function Home() {
  const { data: rawCourses, isLoading } = useQuery({
    queryKey: ["featuredCourses"],
    queryFn: getCourses,
  });

  // Filter for specific popular courses and sort
  const courses = React.useMemo(() => {
    const targetTitles = ['Lekcje indywidualne', 'Lekcje grupowe', 'POWTÓRKA – CHEMIA NIEORGANICZNA (LIVE) 26.02 - 1.03.2026'];
    const unique = [];
    const seen = new Set();

    for (const course of rawCourses ?? []) {
      if (targetTitles.includes(course.title) && !seen.has(course.title)) {
        seen.add(course.title);
        unique.push(course);
      }
    }

    return unique.sort((a, b) => {
      const oa = a.order ?? 999;
      const ob = b.order ?? 999;
      if (oa !== ob) return oa - ob;
      return (a.title ?? "").localeCompare(b.title ?? "");
    });
  }, [rawCourses]);

  const benefits = [
    {
      title: "Zrozumiesz, nie wykujesz",
      description: "Stawiam na logiczne myślenie i łączenie faktów, a nie bezmyślne wkuwanie regułek.",
      icon: <Atom className="w-6 h-6 text-[#D97745]" />
    },
    {
      title: "Zajęcia online",
      description: "Lekcje przez internet – w dogodnym dla Ciebie miejscu i czasie. Indywidualnie lub w grupie.",
      icon: <ClockIcon className="w-6 h-6 text-[#1A3B47]" />
    },
    {
      title: "Praca na maturę",
      description: "Na zajęciach: notatki, zadania maturalne i słowa kluczowe, które przekładają się na punkty.",
      icon: <BookIcon className="w-6 h-6 text-[#F4B942]" />
    },
    {
      title: "Wsparcie na lekcjach",
      description: "Twoje pytania wyjaśniam na bieżąco – na zajęciach masz moją pełną uwagę.",
      icon: <Users className="w-6 h-6 text-[#D97745]" />
    }
  ];

  return (
    <div className="bg-[#FFFBF0]">
      <SEO path="/" />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-12 lg:pt-32 lg:pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full bg-[#F4B942]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] rounded-full bg-[#D97745]/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#1A3B47] tracking-tight mb-6 md:mb-8 leading-tight">
              Pokochaj chemię i <br className="hidden md:block" />
              <span className="text-[#D97745]">
                zdaj maturę na 90%+
              </span>
            </h1>
            <p className="text-xl text-[#1A3B47]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Lekcje i kursy z chemii stworzone przez pasjonatkę. 
              Indywidualnie, w grupie albo intensywna powtórka przed maturą – 
              doprowadzę Cię do wymarzonego wyniku.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-[#D97745] hover:bg-[#c66535] text-white text-lg px-8 h-14 rounded-full" asChild>
                <Link to={createPageUrl('Courses')}>
                  Rozpocznij Naukę <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-[#1A3B47] border-[#1A3B47]/20 hover:bg-[#F4B942]/10 text-lg px-8 h-14 rounded-full gap-2" asChild>
                <Link to={`${createPageUrl('About')}#o-mnie`}>
                  Zobacz jak uczę
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Benefits Section */}
      <section className="pt-8 pb-12 md:pt-16 md:py-24 bg-[#FFFBF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#1A3B47] mb-4">Dlaczego Chemia z Wero?</h2>
            <p className="text-lg text-[#1A3B47]/80">
              Moja metoda opiera się na zrozumieniu procesów, a nie zakuwaniu schematów. 
              Zobacz, co zyskasz na moich zajęciach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((item, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#F4B942]/20">
                <div className="w-12 h-12 bg-[#FFFBF0] rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1A3B47] mb-3">{item.title}</h3>
                <p className="text-[#1A3B47]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1A3B47] mb-4">Najpopularniejsze Kursy</h2>
              <p className="text-lg text-[#1A3B47]/70">Wybierz ścieżkę dopasowaną do Twoich potrzeb.</p>
            </div>
            <Button variant="ghost" className="text-[#D97745] hover:text-[#c66535] hover:bg-[#FFFBF0] gap-2" asChild>
              <Link to={createPageUrl('Courses')}>
                Zobacz wszystkie <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[400px] bg-[#FFFBF0] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {courses.length === 0 && (
                <div className="col-span-full text-center py-12 bg-[#FFFBF0] rounded-2xl border border-dashed border-[#1A3B47]/20">
                  <p className="text-[#1A3B47]/50">Kursy pojawią się wkrótce!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-[#1A3B47] relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Microscope className="w-96 h-96 -mr-24 -mt-24 text-[#F4B942] transform rotate-12" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Gotowy na chemiczną rewolucję?
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Jeśli chcesz zrozumieć chemię i pewnie napisać maturę, zacznij razem ze mną.
          </p>
          <Button size="lg" className="bg-[#D97745] hover:bg-[#c66535] text-white font-bold text-lg px-10 h-14 rounded-full" asChild>
            <Link to={createPageUrl('Courses')}>Zapisz się teraz</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// Helper icons for the benefits section
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const BookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
