import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle, Quote } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";

import NotesPreviewCarousel from "@/components/NotesPreviewCarousel";
import { createNotesCheckoutSession } from "@/api/stripe";
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
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: bundle, isLoading } = useQuery({
    queryKey: ["notes-bundle"],
    queryFn: getNotesBundle,
  });
  const checkoutStatus = searchParams.get("checkout");

  const jsonLd = useMemo(
    () => (bundle ? buildNotesBundleJsonLd(bundle) : {}),
    [bundle]
  );

  useEffect(() => {
    if (checkoutStatus === "cancelled") {
      toast.info("Płatność anulowana. Możesz wrócić do checkoutu w dowolnym momencie.");
      navigate("/notatki", { replace: true });
    }
    if (checkoutStatus === "success") {
      toast.success("Płatność przyjęta. Sprawdź maila - wysłaliśmy bezpieczny link do pobrania.");
      navigate("/notatki", { replace: true });
    }
  }, [checkoutStatus, navigate]);

  const handleCheckout = async () => {
    try {
      setIsCheckoutLoading(true);
      const checkoutUrl = await createNotesCheckoutSession();
      window.location.assign(checkoutUrl);
    } catch (error) {
      console.error(error);
      toast.error("Nie udało się otworzyć płatności Stripe. Spróbuj ponownie.");
      setIsCheckoutLoading(false);
    }
  };

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
    <div className="min-h-screen overflow-x-hidden bg-[#FFFBF0] pb-36 md:pb-24">
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

      <div className="relative z-20 mx-auto -mt-8 md:-mt-12 max-w-7xl overflow-x-hidden px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="min-w-0 md:col-span-2 space-y-8">
            <div className="max-w-full break-words rounded-2xl border border-[#D97745]/10 bg-white p-8 shadow-sm">
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

            {bundle.testimonials && bundle.testimonials.length > 0 && (
              <div className="max-w-full break-words rounded-2xl border border-[#D97745]/10 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">Co mówią uczniowie</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {bundle.testimonials.map((t) => (
                    <div key={t.name} className="flex flex-col gap-3 bg-[#FFFBF0] rounded-xl p-5 border border-[#D97745]/10">
                      <Quote className="w-5 h-5 text-[#D97745] flex-shrink-0" />
                      <p className="text-[#1A3B47]/80 text-sm leading-relaxed flex-1">"{t.text}"</p>
                      <div>
                        <p className="font-semibold text-[#1A3B47] text-sm">{t.name}</p>
                        <p className="text-xs text-[#1A3B47]/50">{t.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="max-w-full break-words rounded-2xl border border-[#D97745]/10 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-2">Podgląd notatek</h2>
              <p className="text-[#1A3B47]/70 mb-6">
                Nie kupuj kota w worku - zajrzyj do przykładowych notatek przed zakupem.
              </p>
              <NotesPreviewCarousel slides={bundle.previewSlides} />
            </div>

            <div className="max-w-full break-words rounded-2xl border border-[#D97745]/10 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">Zawartość pakietu (1–27)</h2>
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

          <div className="min-w-0 md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-[#D97745]/10 p-6 md:sticky md:top-24">
              <div className="aspect-video bg-[#FFFBF0] rounded-xl mb-4 overflow-hidden border border-[#D97745]/10">
                <img src="/notes-cover.png" alt={bundle.title} className="h-full w-full object-cover" />
              </div>

              <h3 className="text-lg font-bold text-[#1A3B47] mb-4 leading-snug">{bundle.title}</h3>

              <div className="mb-6">
                {bundle.promoPrice ? (
                  <div className="text-4xl font-bold text-[#1A3B47]">{bundle.promoPrice} zł</div>
                ) : (
                  <div className="text-4xl font-bold text-[#1A3B47]">{bundle.price} zł</div>
                )}
              </div>

              <div>
                <Button
                  className="w-full bg-[#D97745] hover:bg-[#c66535] text-white h-12 text-lg"
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                >
                  {isCheckoutLoading ? "Przekierowanie..." : "Kup teraz"}
                </Button>
              </div>

              <div className="mt-6 space-y-3 text-sm text-[#1A3B47]/75">
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D97745] mt-0.5 flex-shrink-0" />
                  <span>W pakiecie: {bundle.notesCount} notatek PDF w jednym zakupie.</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D97745] mt-0.5 flex-shrink-0" />
                  <span>Po zakupie materiały wysyłamy na maila podanego w zamówieniu.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D97745]/20 bg-white px-3 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-[0_-12px_28px_rgba(26,59,71,0.18)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-t-2xl border border-[#D97745]/10 bg-white px-3 py-2">
          <div className="text-[#1A3B47]">
            <p className="text-xs uppercase tracking-wide text-[#1A3B47]/60">Pakiet notatek</p>
            <p className="text-lg font-bold">{bundle.promoPrice ?? bundle.price} zł</p>
          </div>
          <Button
            className="h-11 min-w-[9.5rem] bg-[#D97745] px-6 text-base text-white hover:bg-[#c66535]"
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
          >
            {isCheckoutLoading ? "Przekierowanie..." : "Kup teraz"}
          </Button>
        </div>
      </div>
    </div>
  );
}
