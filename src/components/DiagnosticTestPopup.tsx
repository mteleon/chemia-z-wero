import React from "react";
import { Link } from "react-router-dom";
import { X, FlaskConical, ArrowRight } from "lucide-react";

const DISMISSED_KEY = "diagnosticTestPopupDismissedAt";
const SHOW_DELAY_MS = 1500;
const SCROLL_FALLBACK_DELAY_MS = 6000;
const SCROLL_THRESHOLD_PX = 300;
const HIDE_FOR_DAYS = 7;

function wasRecentlyDismissed(): boolean {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (Number.isNaN(dismissedAt)) return false;
    const elapsedDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return elapsedDays < HIDE_FOR_DAYS;
  } catch {
    return false;
  }
}

export default function DiagnosticTestPopup() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);

  React.useEffect(() => {
    if (wasRecentlyDismissed()) return;

    const reveal = () => {
      setIsMounted(true);
      requestAnimationFrame(() => setIsShown(true));
    };

    // Na telefonie popup zasłaniałby przyciski w hero, więc czekamy,
    // aż osoba przewinie stronę (albo pokazujemy go mimo to po dłuższej chwili).
    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD_PX) {
        reveal();
        cleanup();
      }
    };

    const scrollTimer = setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }, SHOW_DELAY_MS);

    const fallbackTimer = setTimeout(() => {
      reveal();
      cleanup();
    }, SCROLL_FALLBACK_DELAY_MS);

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
      clearTimeout(fallbackTimer);
    }

    return cleanup;
  }, []);

  const dismiss = () => {
    setIsShown(false);
    setTimeout(() => setIsMounted(false), 300);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {
      // localStorage niedostępny (np. tryb prywatny) – po prostu ukrywamy popup
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed bottom-4 inset-x-4 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm transition-all duration-300 ease-out ${
        isShown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="relative rounded-2xl border border-[#D97745]/20 bg-white p-5 pr-9 shadow-xl">
        <button
          onClick={dismiss}
          aria-label="Zamknij"
          className="absolute right-3 top-3 rounded-full p-1 text-[#1A3B47]/40 transition-colors hover:bg-[#FFFBF0] hover:text-[#1A3B47]"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#D97745]/10">
            <FlaskConical className="h-5 w-5 text-[#D97745]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1A3B47]">Sprawdź swój poziom przed maturą</p>
            <p className="mt-1 text-sm text-[#1A3B47]/70">
              Bezpłatny test diagnostyczny – 30 zadań, wynik od razu.
            </p>
            <Link
              to="/test-diagnostyczny-chemia"
              onClick={dismiss}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D97745] transition-colors hover:text-[#c66535]"
            >
              Zrób test diagnostyczny <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
