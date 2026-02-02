import React, { useState } from "react";
import { sendContactEmail } from "@/api/contact";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/utils/constants";
import { Mail, Send, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const CONTACT_TITLE = "Kontakt – Chemia z Wero";
const CONTACT_DESCRIPTION =
  "Skontaktuj się – korepetycje z chemii online, matura rozszerzona. Napisz lub umów lekcję próbną.";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.subject) {
      toast.error("Proszę wybrać temat wiadomości");
      setIsSubmitting(false);
      return;
    }

    try {
      await sendContactEmail({
        to: CONTACT_EMAIL,
        subject: `[Kontakt www] ${formData.subject} - ${formData.name}`,
        body: `
Nowa wiadomość z formularza kontaktowego:

Imię i Nazwisko: ${formData.name}
Email: ${formData.email}
Temat: ${formData.subject}

Treść wiadomości:
----------------------------------------
${formData.message}
----------------------------------------
        `.trim(),
      });

      toast.success("Wiadomość została wysłana pomyślnie!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("SendEmail error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      toast.error(`Wystąpił błąd: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] py-12">
      <SEO path="/kontakt" title={CONTACT_TITLE} description={CONTACT_DESCRIPTION} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-[#1A3B47] tracking-tight mb-4">
            Kontakt
          </h1>
          <p className="text-lg text-[#1A3B47]/80 max-w-2xl mx-auto leading-relaxed">
            Masz pytania dotyczące kursów? Chcesz nawiązać współpracę? Napisz do mnie, a postaram się odpowiedzieć jak najszybciej.
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-none">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#D97745]/10 rounded-full flex items-center justify-center text-[#D97745] mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#1A3B47] mb-2">Email</h3>
                <p className="text-[#1A3B47]/70 mb-4">{CONTACT_EMAIL}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-[#F4B942]/10 rounded-full flex items-center justify-center text-[#F4B942] mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-[#1A3B47] mb-2">Umów lekcję próbną</h3>
                <p className="text-[#1A3B47]/70 mb-4">Wybierz dogodny termin w kalendarzu</p>
                <Button asChild className="w-full bg-[#D97745] hover:bg-[#c66535] text-white gap-2 rounded-full">
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-4 h-4" /> Umów lekcję próbną
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-none h-full">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-[#1A3B47] mb-6">Wyślij wiadomość</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A3B47]">Imię i Nazwisko</label>
                      <Input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Jan Kowalski" 
                        className="h-12 bg-[#FFFBF0] border-[#1A3B47]/10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A3B47]">Email</label>
                      <Input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="jan@example.com" 
                        className="h-12 bg-[#FFFBF0] border-[#1A3B47]/10" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A3B47]">Temat</label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(val) => setFormData({...formData, subject: val})}
                    >
                      <SelectTrigger className="h-12 bg-[#FFFBF0] border-[#1A3B47]/10">
                        <SelectValue placeholder="Wybierz temat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pytanie o kursy">Pytanie o kursy</SelectItem>
                        <SelectItem value="Współpraca">Współpraca</SelectItem>
                        <SelectItem value="Problem techniczny">Problem techniczny</SelectItem>
                        <SelectItem value="Inne">Inne</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A3B47]">Wiadomość</label>
                    <Textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tutaj wpisz treść wiadomości..." 
                      className="min-h-[150px] resize-none bg-[#FFFBF0] border-[#1A3B47]/10"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#D97745] hover:bg-[#c66535] text-white h-12 text-lg"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}