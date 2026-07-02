import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Testimonials } from './components/Testimonials';
import { Booking } from './components/Booking';
import { LocationMap } from './components/LocationMap';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';
import { BlogPage } from './components/BlogPage';
import { Loyalty } from './components/Loyalty';
import { FAQ } from './components/FAQ';
import { GiftCardModal } from './components/GiftCardModal';
import { LoyaltyChatbot } from './components/LoyaltyChatbot';

// Initialize Google Analytics
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || "G-XXXXXXXXXX";
ReactGA.initialize(GA_TRACKING_ID);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);

  useEffect(() => {
    // Track pageview on current page change
    ReactGA.send({ hitType: "pageview", page: currentPage === 'home' ? '/' : `/${currentPage}`, title: currentPage });
  }, [currentPage]);

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
      {currentPage === 'home' ? (
        <Helmet>
          <title>Peluquería Blanca Granado | Salón de Alta Gama</title>
          <meta name="description" content="Bienvenido a Peluquería Blanca Granado. Descubre nuestros servicios de alta gama: cortes, peinados, hidratación y más. Reserva tu cita hoy y transforma tu estilo." />
        </Helmet>
      ) : (
        <Helmet>
          <title>Consejos de Belleza | Peluquería Blanca Granado</title>
          <meta name="description" content="Aprende los mejores consejos de belleza, cuidado del cabello y tendencias de moda de la mano de los expertos en Peluquería Blanca Granado." />
        </Helmet>
      )}
      
      <Navbar currentPage={currentPage} isDark={isDark} toggleDark={() => setIsDark(!isDark)} onOpenGiftCard={() => setIsGiftCardOpen(true)} />
      {currentPage === 'home' ? (
        <main>
          <Hero />
          <Loyalty />
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

