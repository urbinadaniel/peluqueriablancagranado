import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="inicio" className="relative lg:h-screen min-h-[600px] flex flex-col lg:flex-row items-stretch overflow-hidden bg-gradient-soft">
      {/* Content */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-24 lg:py-0 order-2 lg:order-1 pt-32 lg:pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-secondary text-accent text-[10px] font-bold uppercase tracking-[0.2em]">
            Exclusividad & Belleza
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-display mb-6 leading-[1.1] text-dark dark:text-white"
        >
          Descubre tu <br />
          <span className="italic text-primary">mejor versión.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg text-natural dark:text-gray-400 max-w-md mb-10 font-light italic leading-relaxed"
        >
          Elegancia, lujo y exclusividad en cada detalle. Experimenta el arte del estilismo en un ambiente diseñado para ti.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <a 
            href="#reservar" 
            className="px-8 py-4 bg-dark dark:bg-white text-white dark:text-dark rounded-sm text-sm uppercase tracking-widest font-bold hover:bg-black dark:hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            Reservar cita
          </a>
          <div className="flex flex-col justify-center border-l-2 border-secondary pl-6">
            <span className="text-xs uppercase tracking-tighter text-primary font-bold">Citas por WhatsApp</span>
            <span className="text-lg font-mono text-dark dark:text-white">+58 414-3518301</span>
          </div>
        </motion.div>
      </div>

      {/* Background Image */}
      <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full order-1 lg:order-2 border-l border-soft p-4 lg:p-8">
        <div 
          className="absolute inset-4 lg:inset-8 z-0 rounded-lg overflow-hidden border border-soft shadow-sm"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop")',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
        </div>
      </div>
    </section>
  );
}
