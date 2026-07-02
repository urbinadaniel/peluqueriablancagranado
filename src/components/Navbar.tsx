import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { TopBanner } from './TopBanner';

interface NavbarProps {
  currentPage?: string;
  isDark?: boolean;
  toggleDark?: () => void;
  onOpenGiftCard?: () => void;
}

export function Navbar({ currentPage, isDark, toggleDark, onOpenGiftCard }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBlog = currentPage === 'blog';
  const shouldShowDarkText = isScrolled || isBlog;

  const navLinks = {
    es: [
      { name: 'Inicio', href: '#inicio' },
      { name: 'Consejos de Belleza', href: '#blog' },
      { name: 'Testimonios', href: '#testimonios' },
      { name: 'Ubicación', href: '#ubicacion' },
      { name: 'Contacto', href: '#contacto' },
    ],
    en: [
      { name: 'Home', href: '#inicio' },
      { name: 'Beauty Tips', href: '#blog' },
      { name: 'Testimonials', href: '#testimonios' },
      { name: 'Location', href: '#ubicacion' },
      { name: 'Contact', href: '#contacto' },
    ]
  };

  const currentNavLinks = navLinks[lang];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex flex-col"
    >
      <TopBanner isVisible={isBannerVisible} onClose={() => setIsBannerVisible(false)} />
      <div 
        className={`w-full h-20 flex items-center transition-all duration-500 ${
          isScrolled || isBlog ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-b border-soft dark:border-stone-800' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group">
          <Logo className={`transition-all duration-500 ${shouldShowDarkText ? 'w-10 h-10' : 'w-12 h-12 text-white'}`} />
          <div className="flex flex-col">
            <span className={`font-display text-xl font-bold tracking-tight uppercase leading-none transition-colors ${shouldShowDarkText ? 'text-dark' : 'text-white'}`}>Peluquería Blanca Granado</span>
            <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${shouldShowDarkText ? 'text-primary' : 'text-white/80'}`}>{lang === 'es' ? 'Salón de Alta Gama' : 'High-End Salon'}</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-widest font-semibold transition-colors ${shouldShowDarkText ? 'text-natural' : 'text-white/90'}`}>
          <ul className="flex items-center gap-8">
            {currentNavLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-6 pl-8 border-l border-white/20">
            <div className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${shouldShowDarkText ? 'bg-gray-100 text-dark dark:bg-stone-800 dark:text-gray-300' : 'bg-white/10 text-white'}`}>
              <span 
                className={`cursor-pointer ${lang === 'es' ? '' : 'opacity-50 hover:opacity-100'}`}
                onClick={() => setLang('es')}
              >🇪🇸 ES</span>
              <span className={shouldShowDarkText ? 'text-gray-300 dark:text-gray-600' : 'text-white/30'}>|</span>
              <span 
                className={`cursor-pointer ${lang === 'en' ? '' : 'opacity-50 hover:opacity-100'}`}
                onClick={() => setLang('en')}
              >🇺🇸 EN</span>
            </div>
            <button
              onClick={toggleDark}
              className={`p-2 rounded-full transition-colors ${shouldShowDarkText ? 'text-dark hover:bg-gray-100 dark:text-white dark:hover:bg-stone-800' : 'text-white hover:bg-white/10'}`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={onOpenGiftCard}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                shouldShowDarkText 
                  ? 'border border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-dark' 
                  : 'border border-white text-white hover:bg-white hover:text-dark'
              }`}
            >
              Gift Card
            </button>
            <a 
              href="#reservar" 
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                shouldShowDarkText 
                  ? 'bg-primary text-white hover:bg-accent' 
                  : 'bg-white text-dark hover:bg-white/90'
              }`}
            >
              {lang === 'es' ? 'Reservar' : 'Book'}
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={shouldShowDarkText ? 'text-dark dark:text-white' : 'text-white'} />
          ) : (
            <Menu className={shouldShowDarkText ? 'text-dark dark:text-white' : 'text-white'} />
          )}
        </button>
      </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 shadow-xl border-t border-gray-100 dark:border-stone-800 lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {currentNavLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-display text-dark dark:text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="my-2 border-gray-100 dark:border-stone-800" />
              <div className="flex items-center justify-between">
                <button 
                  className="flex items-center gap-2 text-dark dark:text-white font-medium w-fit"
                  onClick={() => {
                    setLang(lang === 'es' ? 'en' : 'es');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {lang === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
                </button>
                <button
                  onClick={() => {
                    if (toggleDark) toggleDark();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-full text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              <button 
                onClick={() => {
                  if (onOpenGiftCard) onOpenGiftCard();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 border border-primary text-primary dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-dark text-center py-3 rounded-full font-medium"
              >
                Comprar Gift Card
              </button>
              <a 
                href="#reservar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 bg-primary text-white text-center py-3 rounded-full font-medium"
              >
                {lang === 'es' ? 'Reservar cita' : 'Book appointment'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
