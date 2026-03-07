import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import NotesPreviewCarousel from "@/components/NotesPreviewCarousel";
import { getNotesBundle } from "@/data/notesBundle";
import { createPageUrl } from "@/utils";
import { SITE_URL } from "@/utils/constants";
import type { NotesBundle } from "@/Utilities/NotesBundle";

function buildNotesBundleJsonLd(bundle: NotesBundle): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bundle.title,
    description: bundle.shortDescription,
    category: "Edukacja",
    brand: {
      "@type": "Brand",
      name: "Chemia z Wero",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PLN",
      price: bundle.promoPrice ?? bundle.price,
      availability:
        bundle.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: `${SITE_URL}/notatki`,
    },
  };
}

export default function Notes() {
  const { data: bundle, isLoading } = useQuery({
    queryKey: ["notes-bundle"],
    queryFn: getNotesBundle,
  });

  const jsonLd = useMemo(
    () => (bundle ? buildNotesBundleJsonLd(bundle) : {}),
    [bundle]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D97745]" />
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF0]">
        <h1 className="text-2xl font-bold text-[#1A3B47] mb-4">
          Nie znaleziono pakietu notatek
        </h1>
        <Button className="bg-[#D97745] hover:bg-[#c66535]" asChild>
          <Link to={createPageUrl("Home")}>Wróć na stronę główną</Link>
        </Button>
      </div>
    );
  }

  const seoDescription = `${bundle.shortDescription} Zobacz podgląd notatek w karuzeli.`;

  return (
    <div className="bg-[#FFFBF0] min-h-screen pb-24">
      <SEO
        path="/notatki"
        title="Notatki maturalne z chemii – Pakiet PDF | Chemia z Wero"
        description={seoDescription}
        jsonLd={jsonLd}
      />

      <div className="bg-[#1A3B47] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Wróć na stronę główną
          </Link>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-[#D97745] hover:bg-[#c66535] text-white border-none">
                  Pakiet PDF
                </Badge>
                <Badge variant="outline" className="text-white/80 border-white/20">
                  {bundle.notesCount} notatek
                </Badge>
                <Badge variant="outline" className="text-white/80 border-white/20">
                  {bundle.formatLabel}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{bundle.title}</h1>
              <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                {bundle.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">O pakiecie</h2>
              <p className="text-[#1A3B47]/80 leading-relaxed mb-6">{bundle.fullDescription}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {bundle.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D97745] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1A3B47]/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-2">Podgląd notatek</h2>
              <p className="text-[#1A3B47]/70 mb-6">
                Sprawdź, jak wyglądają materiały w środku i jak są ułożone sekcje.
              </p>
              <NotesPreviewCarousel slides={bundle.previewSlides} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#D97745]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">Zawartość pakietu (1–26)</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {bundle.topics.map((topic) => (
                  <div key={topic.number} className="text-[#1A3B47]/85">
                    <span className="font-semibold text-[#D97745] mr-2">
                      {String(topic.number).padStart(2, "0")}.
                    </span>
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-[#D97745]/10 p-6 sticky top-24">
              <div className="aspect-video bg-[#FFFBF0] rounded-xl mb-6 overflow-hidden flex items-center justify-center border border-[#D97745]/10">
                <div className="text-center px-4">
                  <p className="text-[#1A3B47] font-semibold">Pakiet notatek PDF</p>
                  <p className="text-[#1A3B47]/60 text-sm mt-1">{bundle.notesCount} tematów maturalnych</p>
                </div>
              </div>

              <div className="mb-6">
                {bundle.promoPrice ? (
                  <>
                    <div className="text-3xl font-bold text-[#1A3B47] mb-1">{bundle.promoPrice} zł</div>
                    <div className="text-sm text-[#1A3B47]/50 line-through">
                      {bundle.price} zł — cena regularna
                    </div>
                    <div className="text-sm text-[#D97745] font-medium mt-1">
                      {bundle.promoLabel ?? "Cena promocyjna"}
                    </div>
                  </>
                ) : (
                  <div className="text-3xl font-bold text-[#1A3B47] mb-1">{bundle.price} zł</div>
                )}
                <div className="text-sm text-[#1A3B47]/60">{bundle.priceLabel}</div>
              </div>

              <div className="space-y-3 mb-6">
                <Button className="w-full bg-[#D97745] hover:bg-[#c66535] text-white h-12 text-lg" asChild>
                  <Link to={createPageUrl("Contact")}>Chcę kupić pakiet</Link>
                </Button>
              </div>

              <div className="text-sm text-[#1A3B47]/70 space-y-2">
                <p>
                  <span className="font-semibold">Format:</span> {bundle.formatLabel}
                </p>
                <p>
                  <span className="font-semibold">Dostęp:</span> {bundle.accessLabel}
                </p>
                <p>
                  <span className="font-semibold">Aktualizacje:</span> {bundle.updatesLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
