import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonios" className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-[250px] -mt-[250px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -ml-[250px] -mb-[250px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-secondary text-accent dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            Experiencias
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-dark dark:text-white mb-4"
          >
            Lo que dicen <span className="italic text-primary">nuestras clientas</span>
          </motion.h3>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-stone-50 dark:bg-stone-900 rounded-lg border border-soft p-8 md:p-16 shadow-sm min-h-[300px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center flex flex-col items-center"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg md:text-2xl font-light text-natural dark:text-gray-300 italic mb-8 leading-relaxed max-w-2xl">
                "{TESTIMONIALS[currentIndex].content}"
              </p>
              <div>
                <h4 className="font-display text-xl text-dark dark:text-white mb-1">{TESTIMONIALS[currentIndex].name}</h4>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {TESTIMONIALS[currentIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center shadow-md text-natural dark:text-gray-400 hover:text-accent dark:hover:text-white hover:scale-105 transition-all border border-soft dark:border-stone-700"
            aria-label="Anterior testimonio"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 w-12 h-12 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center shadow-md text-natural dark:text-gray-400 hover:text-accent dark:hover:text-white hover:scale-105 transition-all border border-soft dark:border-stone-700"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Dots Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-6' : 'bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Ir a testimonio ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
