import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Booking } from './components/Booking';
import { LocationMap } from './components/LocationMap';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { BlogPage } from './components/BlogPage';
import { Loyalty } from './components/Loyalty';
import { Team } from './components/Team';
import { FAQ } from './components/FAQ';
import { GiftCardModal } from './components/GiftCardModal';
import { LoyaltyChatbot } from './components/LoyaltyChatbot';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#blog') {
        setCurrentPage('blog');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
        if (hash) {
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          window.scrollTo(0, 0);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // check on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <Navbar currentPage={currentPage} isDark={isDark} toggleDark={() => setIsDark(!isDark)} onOpenGiftCard={() => setIsGiftCardOpen(true)} />
      {currentPage === 'home' ? (
        <main>
          <Hero />
          <Loyalty />
          <Gallery />
          <Team />
          <Testimonials />
          <Booking />
          <FAQ />
          <LocationMap />
        </main>
      ) : (
        <main>
          <BlogPage />
        </main>
      )}
      <Footer />
      <FloatingButtons />
      <LoyaltyChatbot />
      <GiftCardModal isOpen={isGiftCardOpen} onClose={() => setIsGiftCardOpen(false)} />
    </div>
  );
}

