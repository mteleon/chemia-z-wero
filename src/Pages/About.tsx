import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart, Sparkles, Brain, FileText, CheckCircle2, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function About() {
  return (
    <div className="bg-[#FFFBF0] min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b border-[#D97745]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A3B47] tracking-tight">
                Cześć! Jestem <span className="text-[#D97745]">Weronika</span>.
              </h1>
              <p className="text-xl text-[#1A3B47]/80 leading-relaxed">
                Uczę chemii tak, by wreszcie była logiczna. Zamiast kucia wzorów – zrozumienie, typowe zadania maturalne i słowa kluczowe, które realnie przekładają się na punkty na egzaminie.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                {/* Logiczne podejście */}
                <div className="space-y-3 bg-[#FFFBF0] p-4 rounded-xl border border-[#D97745]/10">
                  <div className="flex items-center gap-2 text-[#D97745] font-bold">
                    <Brain className="w-5 h-5" />
                    <h3>Logiczne podejście</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-[#1A3B47]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#F4B942] mt-0.5 flex-shrink-0" />
                      Rozumiesz zamiast zapamiętywać
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#1A3B47]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#F4B942] mt-0.5 flex-shrink-0" />
                      Logika zamiast listy wyjątków
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#1A3B47]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#F4B942] mt-0.5 flex-shrink-0" />
                      Wiesz jak myśleć przy rozwiązywaniu
                    </li>
                  </ul>
                </div>

                {/* Typowe zadania */}
                <div className="space-y-3 bg-[#FFFBF0] p-4 rounded-xl border border-[#D97745]/10">
                  <div className="flex items-center gap-2 text-[#D97745] font-bold">
                    <FileText className="w-5 h-5" />
                    <h3>Zadania maturalne</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-[#1A3B47]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#F4B942] mt-0.5 flex-shrink-0" />
                      Typowe schematy zadań z matur
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#1A3B47]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#F4B942] mt-0.5 flex-shrink-0" />
                      Jak pisać, żeby dostać max punktów
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#1A3B47]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#F4B942] mt-0.5 flex-shrink-0" />
                      Triki na najczęstsze „pułapki”
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl max-w-[400px] mx-auto bg-gradient-to-b from-[#F4B942]/20 to-[#D97745]/20 flex items-center justify-center relative">
                 <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692ef18744158a65bf84cfbd/0cc8d30cc_Projektbeznazwy6.png" 
                  alt="Weronika" 
                  className="w-full h-full object-cover"
                 />
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute bottom-10 left-10 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3"
              >
                <Heart className="w-8 h-8 text-[#D97745] fill-[#D97745]" />
                <div>
                  <div className="font-bold text-[#1A3B47]">Pasja</div>
                  <div className="text-xs text-[#1A3B47]/60">Do nauczania</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* My Story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-[#1A3B47] mb-8 text-center">Moja Historia</h2>
        <div className="prose prose-lg prose-slate mx-auto text-[#1A3B47]/80">
          <p className="mb-8">
            Chemia nie zawsze była moją miłością. W liceum miałam momenty zwątpienia, kiedy patrzyłam na skomplikowane wzory organiczne i myślałam: „po co mi to?”.<br />
            Wszystko zmieniło się, gdy trafiłam na nauczyciela, który tłumaczył „dlaczego”, a nie tylko „jak”.
          </p>
          <p className="mb-8">
            Teraz chcę być taką osobą dla Ciebie. Stworzyłam Chemię z Wero, żeby wypełnić lukę w polskiej edukacji. Brakuje miejsc, gdzie trudne zagadnienia są tłumaczone normalnym, ludzkim językiem, bez zbędnego akademickiego zadęcia.
          </p>
          <div className="mb-8">
            <p className="mb-4">W moich kursach skupiam się na:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>zrozumieniu zamiast kucia,</li>
              <li>typowych zadaniach maturalnych,</li>
              <li>sposobie pisania odpowiedzi, który realnie przekłada się na punkty.</li>
            </ul>
          </div>
          <p>
            Chcę pokazać Ci, że chemia może być logiczna.<br />
            A dobrze wytłumaczona staje się dużo prostsza, niż się wydaje!
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1A3B47] mb-16 text-center">Co mnie wyróżnia?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Jakość ponad ilość",
                text: "Nie zalewam Cię zbędną teorią. Koncentruję się na esencji i tym, co realnie pojawia się na maturze.",
                icon: <Sparkles className="w-8 h-8 text-[#F4B942]" />
              },
              {
                title: "Aktualna wiedza",
                text: "Zajęcia prowadzę zgodnie z najnowszymi wytycznymi CKE. Nie uczysz się rzeczy, których już nie ma w podstawie.",
                icon: <BookOpen className="w-8 h-8 text-[#D97745]" />
              },
              {
                title: "Zajęcia grupowe",
                text: "Na lekcjach grupowych i powtórce – wspólna nauka. Maraton do matury łatwiej biec w towarzystwie.",
                icon: <Users className="w-8 h-8 text-[#1A3B47]" />
              }
            ].map((val, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#FFFBF0] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1A3B47] mb-4">{val.title}</h3>
                <p className="text-[#1A3B47]/70">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#D97745] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">
            Chcesz uczyć się ze mną?
          </h2>
          <Button size="lg" className="bg-white text-[#D97745] hover:bg-[#FFFBF0] font-bold px-8 h-14 rounded-full text-lg" asChild>
            <Link to={createPageUrl('Courses')}>
              Zobacz moją ofertę
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

const Users = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const BookOpen = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)