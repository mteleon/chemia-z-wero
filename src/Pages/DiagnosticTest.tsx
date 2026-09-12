import { ArrowLeft, CheckCircle2, Clock3, FlaskConical, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import SEO from "@/components/SEO";

export default function DiagnosticTest() {
  return (
    <div className="min-h-screen bg-[#FFFBF0] py-10 sm:py-14">
      <SEO path="/test-diagnostyczny-chemia" title="Test diagnostyczny z chemii – Chemia z Wero" description="Sprawdź swój poziom przed maturą: 30 zadań z chemii nieorganicznej i stechiometrii oraz diagnoza obszarów do powtórki." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/kursy" className="inline-flex items-center text-sm font-medium text-[#1A3B47]/65 transition-colors hover:text-[#D97745]"><ArrowLeft className="mr-2 h-4 w-4" /> Wróć do kursów</Link>
        <header className="mx-auto mt-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D97745]/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#D97745] shadow-sm"><FlaskConical className="h-4 w-4" /> Darmowy test diagnostyczny</div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#1A3B47] sm:text-5xl">Sprawdź, gdzie jesteś<br />z chemią nieorganiczną</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#1A3B47]/75">30 pytań, które pomogą Ci ocenić swój poziom wiedzy i sprawdzić, które działy masz już opanowane, a które wymagają powtórki.</p>
          <p className="mt-3 text-lg leading-relaxed text-[#1A3B47]/75">Na końcu otrzymasz jasną diagnozę i wskazówki, od czego najlepiej zacząć naukę.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-[#1A3B47]/70">
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#D97745]" />35–45 minut</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#D97745]" />Poziom rozszerzony</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#D97745]" />Wynik od razu</span>
          </div>
        </header>
        <div className="mx-auto mt-10 max-w-3xl"><DiagnosticQuiz /></div>
      </div>
    </div>
  );
}
