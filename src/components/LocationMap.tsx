import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

export function LocationMap() {
  return (
    <section id="ubicacion" className="py-24 bg-white dark:bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-secondary text-accent dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            Nuestra Ubicación
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-dark dark:text-white mb-4"
          >
            Encuentra tu <span className="italic text-primary">salón ideal</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-natural dark:text-gray-400 font-light max-w-2xl mx-auto"
          >
            Estamos ubicados en una de las zonas más exclusivas de Cabudare, con fácil acceso y estacionamiento privado para tu mayor comodidad.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-stone-50 dark:bg-stone-900 rounded-lg shadow-xl overflow-hidden border border-soft flex flex-col lg:flex-row"
        >
          {/* Map Embed Container */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-auto relative bg-stone-200 dark:bg-stone-800">
            {/* The iframe source points to Cabudare, Lara, Venezuela. We use a stylized map embed if possible, or standard. */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31435.534241695507!2d-69.2789178!3d9.9798547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a6136d80d2833%3A0xc49d0dfc65bc7c5b!2sCabudare%2C%20Lara%2C%20Venezuela!5e0!3m2!1sen!2sus!4v1716382173169!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps - Peluquería Blanca Granado"
              className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700 dark:opacity-70 dark:hover:opacity-100 dark:invert-[0.9]"
            ></iframe>
          </div>

          {/* Location Info */}
          <div className="w-full lg:w-1/3 p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-stone-900">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-display text-2xl text-dark dark:text-white mb-4">Peluquería Blanca Granado</h4>
            <div className="space-y-4 text-natural dark:text-gray-400 font-light mb-8">
              <p>
                Urbanización El Valle<br />
                Cabudare, Estado Lara<br />
                Venezuela
              </p>
              <div className="pt-4 border-t border-soft dark:border-stone-800">
                <p className="text-sm font-medium text-dark dark:text-gray-300 mb-1">Horario de atención:</p>
                <p className="text-sm">Lunes a Sábado: 9:00 AM - 6:00 PM</p>
                <p className="text-sm">Domingo: Cerrado</p>
              </div>
            </div>
            
            <a 
              href="https://goo.gl/maps/xyz..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-dark dark:bg-white text-white dark:text-dark py-3 px-6 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-primary dark:hover:bg-gray-200 transition-colors w-full"
            >
              Cómo llegar <Navigation className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
