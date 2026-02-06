import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBF0] flex flex-col items-center justify-center px-4 py-16">
      <SEO title="Strona nie istnieje – Chemia z Wero" robots="noindex, nofollow" />
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-[#D97745]/30 mb-4">404</p>
        <h1 className="text-2xl font-bold text-[#1A3B47] mb-3">
          Strona nie istnieje
        </h1>
        <p className="text-[#1A3B47]/70 mb-8">
          Adres, którego szukasz, mógł zostać zmieniony lub strona została usunięta.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#D97745] hover:bg-[#c66535] text-white gap-2 rounded-full">
            <Link to={createPageUrl("Home")}>
              <Home className="h-4 w-4" /> Strona główna
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#1A3B47]/20 text-[#1A3B47] gap-2 rounded-full" >
            <Link to={createPageUrl("Courses")}>
              Zobacz kursy <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
