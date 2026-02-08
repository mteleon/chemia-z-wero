import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const ZAPISY_DEADLINE = new Date(2026, 1, 26, 23, 59, 59);

function useZapisyCountdown() {
  const [text, setText] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = ZAPISY_DEADLINE.getTime() - now;
      if (diff <= 0) {
        setText("Zapisy zakończone");
        return;
      }
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      if (days > 0) setText(`${days} dni ${hours} godz`);
      else if (hours > 0) setText(`${hours} godz ${mins} min`);
      else setText(`${mins} min`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return text;
}

const courseUrl = createPageUrl("CourseDetails?id=powtorka-maturalna");

export default function PromoBanner() {
  const countdown = useZapisyCountdown();

  return (
    <Link
      to={courseUrl}
      className="block bg-[#D97745] text-white py-2.5 px-4 hover:bg-[#c66535] transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm">
        <span className="font-semibold">Wielka powtórka – chemia nieorganiczna</span>
        <span className="text-white/80">·</span>
        <span>
          {countdown
            ? countdown === "Zapisy zakończone"
              ? "Zapisy zakończone"
              : <>Do końca zapisów: <strong>{countdown}</strong></>
            : "Zapisy do 26.02"}
        </span>
        <span className="text-white/80">·</span>
        <span className="inline-flex items-center gap-1.5 font-semibold">
          Zapisz się już dziś <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
