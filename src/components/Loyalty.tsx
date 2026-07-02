import React from 'react';
import { motion } from 'motion/react';
import { Star, Gift, Crown, Scissors } from 'lucide-react';

export function Loyalty() {
  const benefits = [
    {
      icon: Star,
      title: "Puntos de Belleza",
      desc: "Acumula 1 punto por cada $10 gastados en el salón."
    },
    {
      icon: Gift,
      title: "Recompensas Exclusivas",
      desc: "Canjea tus puntos por tratamientos y productos seleccionados."
    },
    {
      icon: Crown,
      title: "Trato VIP",
      desc: "Acceso prioritario a citas y promociones especiales."
    },
    {
      icon: Scissors,
      title: "Tarjeta de Sellos",
      desc: "¡Tu sexto corte de cabello tiene un 50% de descuento!"
    }
  ];

  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-primary text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Programa de Lealtad
            </span>
            <h3 className="text-4xl md:text-5xl font-display mb-6">
              Premia tu <span className="italic text-secondary">Fidelidad</span>
            </h3>
            <p className="text-white/80 font-light text-lg mb-8 max-w-lg">
              Creemos en construir relaciones duraderas. Nuestro programa de lealtad está diseñado para agradecerte por elegirnos cada vez que buscas realzar tu belleza.
            </p>
            
            <button className="bg-primary text-white py-3 px-8 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-dark transition-colors">
              Únete Hoy
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg hover:bg-white/15 transition-colors"
              >
                <item.icon className="w-8 h-8 text-secondary mb-4" />
                <h4 className="font-display text-xl mb-2">{item.title}</h4>
                <p className="text-white/70 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
