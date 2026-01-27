import React, { useState } from "react";
import { sendEnrollmentEmail } from "@/api/enrollment";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import type { Course } from "@/Utilities/Course";
import { isPromoActive } from "@/Utilities/Course";

type Props = {
  course: Course;
  onClose?: () => void;
};

export default function EnrollmentForm({ course, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    if (formData.name.trim().length < 2) {
      toast.error("Imię i nazwisko musi mieć co najmniej 2 znaki");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Podaj poprawny adres email");
      return false;
    }
    if (formData.phone && !/^[\d\s\-+()]{9,}$/.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Podaj poprawny numer telefonu (min. 9 cyfr)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const currentPrice = isPromoActive(course) && course.promo_price
        ? course.promo_price
        : course.price;

      await sendEnrollmentEmail({
        courseTitle: course.title,
        courseId: course.id || "",
        studentName: formData.name.trim(),
        studentEmail: formData.email.trim(),
        studentPhone: formData.phone.trim() || undefined,
        notes: formData.notes.trim() || undefined,
        price: course.price,
        promoPrice: isPromoActive(course) ? course.promo_price : undefined,
      });

      setIsSuccess(true);
      toast.success("Zapis zakończony pomyślnie!");
    } catch (err) {
      console.error("SendEnrollmentEmail error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      toast.error(`Wystąpił błąd: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="mx-auto w-16 h-16 bg-[#D97745]/10 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#D97745]" />
        </div>
        <h3 className="text-xl font-bold text-[#1A3B47] mb-2">
          Dziękujemy za zapis!
        </h3>
        <p className="text-[#1A3B47]/70 mb-6">
          Sprawdź maila – wkrótce otrzymasz dane do płatności.
        </p>
        {onClose && (
          <Button
            onClick={onClose}
            className="bg-[#D97745] hover:bg-[#c66535] text-white"
          >
            Zamknij
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Kurs (readonly) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1A3B47]">Kurs</label>
        <Input
          value={course.title}
          readOnly
          className="h-12 bg-[#FFFBF0] border-[#1A3B47]/10 cursor-not-allowed"
        />
      </div>

      {/* Imię i nazwisko */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1A3B47]">
          Imię i nazwisko <span className="text-[#D97745]">*</span>
        </label>
        <Input
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Jan Kowalski"
          className="h-12 bg-[#FFFBF0] border-[#1A3B47]/10"
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1A3B47]">
          Email <span className="text-[#D97745]">*</span>
        </label>
        <Input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="jan@example.com"
          className="h-12 bg-[#FFFBF0] border-[#1A3B47]/10"
          disabled={isSubmitting}
        />
      </div>

      {/* Telefon (opcjonalny) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1A3B47]">
          Telefon <span className="text-[#1A3B47]/50 text-xs">(opcjonalnie)</span>
        </label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="np. 123 456 789"
          className="h-12 bg-[#FFFBF0] border-[#1A3B47]/10"
          disabled={isSubmitting}
        />
      </div>

      {/* Uwagi (opcjonalny) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1A3B47]">
          Uwagi/pytania <span className="text-[#1A3B47]/50 text-xs">(opcjonalnie)</span>
        </label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Masz pytania? Napisz tutaj..."
          className="min-h-[100px] resize-none bg-[#FFFBF0] border-[#1A3B47]/10"
          disabled={isSubmitting}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-[#D97745] hover:bg-[#c66535] text-white h-12 text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Wysyłanie...
            </>
          ) : (
            "Zapisz się"
          )}
        </Button>
        {onClose && (
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="sm:flex-1 border-[#1A3B47]/20 text-[#1A3B47] h-12"
          >
            Anuluj
          </Button>
        )}
      </div>
    </form>
  );
}
