import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const notesUrl = createPageUrl("Notes");

export default function PromoBanner() {
  return (
    <Link
      to={notesUrl}
      className="block bg-[#D97745] text-white py-2.5 px-4 hover:bg-[#c66535] transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm">
        <span className="font-semibold">Ucz się samodzielnie z gotowym pakietem notatek</span>
        <span className="text-white/80">·</span>
        <span>Teoria, reakcje i podsumowania z wszystkich działów</span>
        <span className="text-white/80">·</span>
        <span className="inline-flex items-center gap-1.5 font-semibold">
          Zobacz notatki <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
