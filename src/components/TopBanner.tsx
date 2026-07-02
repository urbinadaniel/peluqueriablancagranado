import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

interface TopBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export function TopBanner({ isVisible, onClose }: TopBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-primary text-white text-xs md:text-sm font-medium relative w-full"
        >
          <div className="py-2.5 px-6 max-w-7xl mx-auto flex items-center justify-center text-center">
            <p className="flex items-center justify-center gap-2 pr-8 md:pr-0">
              <Sparkles className="w-4 h-4 hidden sm:block" />
              <span>
                <strong className="font-bold uppercase tracking-wider">¡Oferta Flash!</strong> 20% de descuento en Balayage y Coloración.
              </span>
              <a href="#reservar" className="underline underline-offset-2 hover:text-white/80 transition-colors whitespace-nowrap">
                Reserva ahora
              </a>
            </p>
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors"
              aria-label="Cerrar banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
