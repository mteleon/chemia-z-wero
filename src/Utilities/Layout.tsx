import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { createPageUrl } from "@/utils";
import { CALENDLY_URL } from "@/utils/constants";
import { Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogoIcon from "@/components/AnimatedLogoIcon";
import PromoBanner from "@/components/PromoBanner";
import SEO from "@/components/SEO";

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Strona Główna', path: '/' },
    { name: 'Kursy', path: '/Courses' },
    { name: 'O mnie', path: '/About' },
    { name: 'Kontakt', path: '/Contact' },
  ];


  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF0] font-sans text-[#1A3B47]">
      <SEO path={pathname} />
      <Analytics />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FFFBF0]/90 backdrop-blur-md border-b border-[#D97745]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link 
              to={createPageUrl('Home')} 
              className="flex items-center gap-2 group"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <AnimatedLogoIcon isHovered={isLogoHovered} />
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-[#1A3B47]">Chemia z Wero</span>
                <span className="text-[10px] uppercase tracking-widest text-[#D97745] font-semibold">Matura Rozszerzona</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-[#D97745] ${
                    isActive(link.path) ? 'text-[#D97745]' : 'text-[#1A3B47]/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="bg-[#D97745] hover:bg-[#c66535] text-white rounded-full px-6 gap-2">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  <Calendar className="w-4 h-4" /> Umów lekcję próbną
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#1A3B47] hover:bg-[#F4B942]/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FFFBF0] border-b border-[#D97745]/20 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive(link.path)
                        ? 'bg-[#F4B942]/20 text-[#D97745]'
                        : 'text-[#1A3B47] hover:bg-[#F4B942]/10 hover:text-[#D97745]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button asChild className="w-full bg-[#D97745] hover:bg-[#c66535] text-white gap-2">
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      <Calendar className="w-4 h-4" /> Umów lekcję próbną
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1A3B47] text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link 
                to={createPageUrl('Home')}
                className="flex items-center gap-2 mb-4 group w-fit cursor-pointer"
              >
                <AnimatedLogoIcon isHovered={true} rotate={false} className="h-6 w-6" />
                <span className="font-bold text-xl text-white">Chemia z Wero</span>
              </Link>
              <p className="text-slate-300 text-sm max-w-xs leading-relaxed">
                Zrozum chemię i otwórz drogę na wymarzone studia. 
                Lekcje i kursy z chemii tworzone z pasją.
              </p>
            </div>
            
            <div>
              <h3 className="text-[#F4B942] font-semibold mb-4">Na skróty</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-[#F4B942] transition-colors">Strona Główna</Link></li>
                <li><Link to="/Courses" className="hover:text-[#F4B942] transition-colors">Wszystkie Kursy</Link></li>
                <li><Link to="/About" className="hover:text-[#F4B942] transition-colors">O mnie</Link></li>
                <li><Link to="/Contact" className="hover:text-[#F4B942] transition-colors">Kontakt</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Chemia z Wero. Wszelkie prawa zastrzeżone.
          </div>
        </div>
      </footer>
    </div>
  );
}