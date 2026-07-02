import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Tendencias en coloración para esta temporada',
    excerpt: 'Descubre los tonos que están dominando el mundo de la belleza capilar y cómo adaptarlos a tu estilo personal con nuestros especialistas.',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1000&auto=format&fit=crop',
    date: '15 Jul 2026',
    author: 'Blanca Granado',
    category: 'Coloración'
  },
  {
    id: 2,
    title: 'El secreto para un balayage perfecto y duradero',
    excerpt: 'Mantener tu balayage intacto no tiene por qué ser complicado. Te compartimos nuestra rutina recomendada para cuidar el color en casa.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop',
    date: '22 Jul 2026',
    author: 'Equipo Blanca',
    category: 'Cuidado Capilar'
  },
  {
    id: 3,
    title: 'Tratamientos de hidratación profunda: ¿Cuál necesitas?',
    excerpt: 'Desde keratina hasta botox capilar, conoce las diferencias y descubre cuál es el tratamiento ideal para devolverle la vida a tu cabello.',
    image: 'https://images.unsplash.com/photo-1516975080661-46bfa2e3c0ee?q=80&w=1000&auto=format&fit=crop',
    date: '05 Ago 2026',
    author: 'Blanca Granado',
    category: 'Tratamientos'
  }
];

export function BlogPage() {
  return (
    <div className="pt-32 pb-24 bg-stone-50 dark:bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full border border-secondary text-accent dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            Blog & Novedades
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-dark dark:text-white mb-6"
          >
            Consejos de <span className="italic text-primary">Belleza</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-natural dark:text-gray-400 font-light max-w-2xl mx-auto"
          >
            Explora las últimas tendencias, trucos de cuidado y secretos de salón directamente de nuestros expertos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white dark:bg-stone-900 rounded-lg overflow-hidden border border-soft shadow-sm group hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-dark">
                  {post.category}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-natural mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h3 className="font-display text-xl text-dark mb-4 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm font-light text-natural mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark group-hover:text-primary transition-colors mt-auto w-fit">
                  Leer artículo <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </div>
  );
}
