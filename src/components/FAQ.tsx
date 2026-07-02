import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: "¿Con cuánto tiempo de anticipación debo reservar?",
    a: "Recomendamos reservar con al menos 48 horas de anticipación para asegurar tu horario preferido, especialmente para servicios que requieren más tiempo como coloración o tratamientos intensivos."
  },
  {
    q: "¿Ofrecen evaluación gratuita?",
    a: "Sí, ofrecemos una consulta de evaluación inicial gratuita para analizar el estado de tu cabello y recomendarte el mejor tratamiento o coloración según tus necesidades."
  },
  {
    q: "¿Qué productos utilizan en el salón?",
    a: "Trabajamos exclusivamente con líneas profesionales de alta gama reconocidas internacionalmente (como L'Oréal Professionnel, Kérastase, y Olaplex) para garantizar resultados duraderos y el cuidado óptimo de tu cabello."
  },
  {
    q: "¿Cuál es su política de cancelación?",
    a: "Agradecemos que cualquier cancelación o reprogramación se realice con al menos 24 horas de antelación. Esto nos permite ofrecer ese espacio a otro cliente."
  },
  {
    q: "¿Puedo llevar a mi mascota?",
    a: "Para mantener un ambiente relajante y por respeto a clientes con alergias, nuestro salón es libre de mascotas, excepto perros de asistencia certificados."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white dark:bg-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-secondary text-accent dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Consultas
          </span>
          <h3 className="text-4xl md:text-5xl font-display text-dark dark:text-white mb-4">
            Preguntas <span className="italic text-primary">Frecuentes</span>
          </h3>
          <p className="text-lg text-natural dark:text-gray-400 font-light">
            Resuelve tus dudas rápidamente con nuestra sección de preguntas comunes.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-soft dark:border-stone-800 rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-900"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg text-dark dark:text-white">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-natural dark:text-gray-400 font-light text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
