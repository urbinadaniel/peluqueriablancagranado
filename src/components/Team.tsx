import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const TEAM = [
  {
    name: "Blanca Granado",
    role: "Directora Creativa & Estilista Principal",
    desc: "Con más de 15 años de experiencia, Blanca es experta en diseño de color y visagismo. Su visión perfeccionista ha posicionado al salón como un referente de estilo en Cabudare.",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=800&auto=format&fit=crop",
    ig: "@blancagranado"
  },
  {
    name: "Carolina Silva",
    role: "Especialista en Colorimetría",
    desc: "Maga de los rubios y experta certificada en técnicas de balayage y babylights. Carolina transforma cualquier cabello cuidando siempre su integridad estructural.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
    ig: "@carocolor"
  },
  {
    name: "Andrea Vegas",
    role: "Make-up Artist & Pestañas",
    desc: "Detallista por naturaleza, Andrea es la encargada de resaltar tu belleza natural con maquillajes impecables y diseños de mirada de larga duración.",
    image: "https://images.unsplash.com/photo-1516975080661-46bfa2e3c0ee?q=80&w=800&auto=format&fit=crop",
    ig: "@andreamakeup"
  }
];

export function Team() {
  return (
    <section className="py-24 bg-stone-50 dark:bg-stone-900 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-secondary text-accent dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            Nuestro Equipo
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-dark dark:text-white mb-4"
          >
            Las <span className="italic text-primary">Artistas</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-natural dark:text-gray-400 font-light max-w-2xl mx-auto"
          >
            Un equipo de profesionales apasionadas por la belleza, en constante formación para ofrecerte siempre las últimas tendencias.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-6">
                <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex justify-center">
                  <a href="#" className="flex items-center gap-2 bg-white text-dark px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" /> {member.ig}
                  </a>
                </div>
              </div>
              
              <div className="text-center px-4">
                <h4 className="font-display text-2xl text-dark dark:text-white mb-2">{member.name}</h4>
                <p className="text-primary text-[11px] font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-sm font-light text-natural dark:text-gray-400">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
