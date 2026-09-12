import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { diagnosticTopics, inorganicDiagnosticQuestions, type QuizTopic } from "@/data/diagnosticInorganicQuiz";

const topicLinks: Record<QuizTopic, string> = {
  "Atom i wiązania": "Budowa atomu i tworzenie cząsteczek",
  "Kwasy, zasady i sole": "Kwasy, zasady, hydroliza i sole",
  "Stechiometria i roztwory": "Stechiometria, hydraty i stężenia roztworów",
  "Redoks i pierwiastki": "Reakcje redoks, chrom i mangan",
  Elektrochemia: "Ogniwa, elektroliza i korozja",
};

export default function DiagnosticQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const question = inorganicDiagnosticQuestions[current];
  const selected = answers[current];

  const result = useMemo(() => {
    const score = inorganicDiagnosticQuestions.reduce((total, item, index) => total + Number(answers[index] === item.correctAnswer), 0);
    const byTopic = diagnosticTopics.map((topic) => {
      const questions = inorganicDiagnosticQuestions.filter((item) => item.topic === topic);
      const correct = questions.filter((item) => answers[inorganicDiagnosticQuestions.indexOf(item)] === item.correctAnswer).length;
      return { topic, correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
    });
    return { score, percentage: Math.round((score / inorganicDiagnosticQuestions.length) * 100), byTopic };
  }, [answers]);

  const resetQuiz = () => {
    setAnswers({});
    setCurrent(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const label = result.percentage >= 80 ? "Masz bardzo mocną bazę" : result.percentage >= 55 ? "Masz bazę — teraz dopracuj szczegóły" : "Warto spokojnie zbudować fundament";
    const weakest = result.byTopic.filter((item) => item.percentage < 70);
    return (
      <div className="rounded-3xl bg-white p-5 shadow-xl shadow-[#1A3B47]/10 ring-1 ring-[#D97745]/15 sm:p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4B942]/20 text-[#D97745]"><Sparkles className="h-7 w-7" /></div>
        <p className="text-center text-sm font-bold uppercase tracking-[0.18em] text-[#D97745]">Twój wynik</p>
        <h3 className="mt-2 text-center text-3xl font-bold text-[#1A3B47]">{result.score} / 30</h3>
        <p className="mt-2 text-center text-lg text-[#1A3B47]/75">{result.percentage}% · {label}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {result.byTopic.map((item) => (
            <div key={item.topic} className="rounded-2xl border border-[#1A3B47]/10 bg-[#FFFBF0] p-4">
              <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#1A3B47]"><span>{item.topic}</span><span>{item.correct}/{item.total}</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#1A3B47]/10"><div className="h-full rounded-full bg-[#D97745]" style={{ width: `${item.percentage}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-[#D97745]/20 bg-[#FEF6EE] p-5">
          <h4 className="font-bold text-[#1A3B47]">Twój następny krok</h4>
          <p className="mt-1 text-sm leading-relaxed text-[#1A3B47]/75">
            {weakest.length ? `Zacznij od: ${weakest.map((item) => topicLinks[item.topic]).join(" · ")}.` : "Wynik jest bardzo dobry — utrzymuj formę zadaniami przekrojowymi i pracą na czasie."}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-[#D97745] text-white hover:bg-[#c66535]"><Link to="/notatki">Zobacz notatki</Link></Button>
            <Button asChild variant="outline" className="border-[#1A3B47]/20 text-[#1A3B47] hover:bg-white"><a href="https://calendly.com/chemiazweroo/30min?back=1" target="_blank" rel="noreferrer">Umów konsultację</a></Button>
          </div>
        </div>
        <Button variant="ghost" onClick={resetQuiz} className="mx-auto mt-5 flex text-[#1A3B47]/70 hover:text-[#D97745]"><RotateCcw className="mr-2 h-4 w-4" />Rozwiąż ponownie</Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-xl shadow-[#1A3B47]/10 ring-1 ring-[#D97745]/15 sm:p-8">
      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-[#1A3B47]/65"><span>Zadanie {current + 1} z {inorganicDiagnosticQuestions.length}</span><span>{question.topic}</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#1A3B47]/10"><div className="h-full rounded-full bg-[#D97745] transition-all duration-300" style={{ width: `${((current + 1) / inorganicDiagnosticQuestions.length) * 100}%` }} /></div>
      <h3 className="mt-7 text-xl font-bold leading-relaxed text-[#1A3B47] sm:text-2xl">{question.question}</h3>
      <div className="mt-6 space-y-3">
        {question.options.map((option, optionIndex) => {
          const active = selected === optionIndex;
          return <button key={option} type="button" onClick={() => setAnswers((previous) => ({ ...previous, [current]: optionIndex }))} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm leading-relaxed transition sm:text-base ${active ? "border-[#D97745] bg-[#FEF6EE] text-[#1A3B47] ring-1 ring-[#D97745]" : "border-[#1A3B47]/10 text-[#1A3B47]/85 hover:border-[#D97745]/50 hover:bg-[#FFFBF0]"}`}>
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${active ? "border-[#D97745] bg-[#D97745] text-white" : "border-[#1A3B47]/20"}`}>{active ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + optionIndex)}</span>{option}
          </button>;
        })}
      </div>
      <div className="mt-7 flex items-center justify-between gap-3">
        <Button variant="ghost" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)} className="text-[#1A3B47]/70"><ArrowLeft className="mr-1 h-4 w-4" />Wstecz</Button>
        {current === inorganicDiagnosticQuestions.length - 1 ? <Button disabled={selected === undefined} onClick={() => setIsFinished(true)} className="bg-[#D97745] text-white hover:bg-[#c66535]">Zobacz wynik<Sparkles className="ml-2 h-4 w-4" /></Button> : <Button disabled={selected === undefined} onClick={() => setCurrent((value) => value + 1)} className="bg-[#1A3B47] text-white hover:bg-[#12303a]">Dalej<ArrowRight className="ml-2 h-4 w-4" /></Button>}
      </div>
    </div>
  );
}
