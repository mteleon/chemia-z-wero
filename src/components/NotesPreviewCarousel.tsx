import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NotesPreviewSlide } from "@/Utilities/NotesBundle";

type NotesPreviewCarouselProps = {
  slides: NotesPreviewSlide[];
};

export default function NotesPreviewCarousel({ slides }: NotesPreviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#D97745]/10 bg-[#FFFBF0] p-4">
        <div className="relative overflow-hidden rounded-xl border border-[#D97745]/15 bg-white aspect-[16/10]">
          <iframe
            key={currentSlide.id}
            title={`Podgląd notatki: ${currentSlide.title}`}
            src={`${currentSlide.pdfPath}#page=1&toolbar=0&navpanes=0&view=FitH`}
            className="h-full w-full scale-[1.02]"
          />
          <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#1A3B47]/85 px-3 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
            Podgląd
          </div>
        </div>

        <div className="mt-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1A3B47]">{currentSlide.title}</h3>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          className="border-[#1A3B47]/20 text-[#1A3B47]"
          onClick={goPrev}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Poprzedni
        </Button>

        <div className="flex items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-[#D97745]" : "w-2.5 bg-[#1A3B47]/25"
              }`}
              aria-label={`Przejdź do slajdu ${idx + 1}`}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="border-[#1A3B47]/20 text-[#1A3B47]"
          onClick={goNext}
        >
          Następny
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
