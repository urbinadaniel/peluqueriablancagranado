import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Gift, Crown, Scissors, Share2, Copy, Check, History, Calendar, CheckCircle2 } from 'lucide-react';

export function Loyalty() {
  const [referralName, setReferralName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [simulatedPoints, setSimulatedPoints] = useState(6);

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralName.trim()) return;
    
    // Simulate generating a unique link
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const formattedName = referralName.trim().toLowerCase().replace(/\s+/g, '-');
    setGeneratedLink(`https://peluqueriablancagranado.vercel.app/ref/${formattedName}-${uniqueId}`);
    setCopied(false);
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
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

        {/* Progress Tracker Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 md:p-12 rounded-2xl max-w-4xl mx-auto mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display mb-4">Tu Progreso de Recompensas</h3>
            <p className="text-white/70 font-light">Simula cuántos puntos tienes para ver qué tan cerca estás de tu próximo premio.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12 mb-8 px-4 md:px-0">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-white/80 mb-4 text-center md:text-left">Puntos Actuales (Simulación)</label>
              <input 
                type="range" 
                min="0" 
                max="25" 
                value={simulatedPoints} 
                onChange={(e) => setSimulatedPoints(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
              <div className="text-center mt-6">
                <span className="text-5xl font-display text-secondary">{simulatedPoints}</span>
                <span className="text-white/60 ml-2 font-medium uppercase tracking-wider text-xs">puntos</span>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 relative pt-10 pb-16 md:pb-0">
               {/* Progress Bar Container */}
               <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
                 <motion.div 
                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                   initial={{ width: 0 }}
                   animate={{ width: `${Math.min(100, (simulatedPoints / 20) * 100)}%` }}
                   transition={{ type: "spring", damping: 20 }}
                 />
               </div>
               
               {/* Markers */}
               <div className="absolute top-2 left-0 -translate-x-1/2 flex flex-col items-center">
                 <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center bg-zinc-900 z-10 transition-colors ${simulatedPoints >= 0 ? 'border-secondary text-secondary' : 'border-zinc-700 text-zinc-500'}`}>
                   <Star className="w-4 h-4" />
                 </div>
                 <div className="mt-4 text-center absolute top-full w-24">
                   <div className="text-xs font-bold">0 Pts</div>
                   <div className="text-[10px] text-white/60 mt-1">Inicio</div>
                 </div>
               </div>

               <div className="absolute top-2 left-[50%] -translate-x-1/2 flex flex-col items-center">
                 <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center bg-zinc-900 z-10 transition-colors ${simulatedPoints >= 10 ? 'border-secondary text-secondary' : 'border-zinc-700 text-zinc-500'}`}>
                   <Gift className="w-4 h-4" />
                 </div>
                 <div className="mt-4 text-center absolute top-full w-32">
                   <div className="text-xs font-bold text-secondary">10 Pts</div>
                   <div className="text-[10px] text-white/60 mt-1 leading-tight">Secado Gratis</div>
                 </div>
               </div>

               <div className="absolute top-2 left-[100%] -translate-x-1/2 flex flex-col items-center">
                 <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center bg-zinc-900 z-10 transition-colors ${simulatedPoints >= 20 ? 'border-secondary text-secondary' : 'border-zinc-700 text-zinc-500'}`}>
                   <Crown className="w-4 h-4" />
                 </div>
                 <div className="mt-4 text-center absolute top-full w-36">
                   <div className="text-xs font-bold text-secondary">20 Pts</div>
                   <div className="text-[10px] text-white/60 mt-1 leading-tight">Corte + Hidratación</div>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Refer a Friend Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 md:p-12 rounded-2xl max-w-4xl mx-auto mb-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-full mb-6">
                <Share2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-3xl font-display mb-4">Refiere a una Amiga</h3>
              <p className="text-white/70 font-light mb-6">
                Comparte tu amor por Blanca Granado. Genera tu enlace único y compártelo. 
                <strong className="text-secondary font-medium ml-1">
                  Cuando tu amiga agende su primera cita mencionando tu enlace, ambas ganarán 5 puntos extra.
                </strong>
              </p>
              
              {!generatedLink ? (
                <form onSubmit={handleGenerateLink} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={referralName}
                    onChange={(e) => setReferralName(e.target.value)}
                    placeholder="Ingresa tu nombre completo"
                    className="flex-1 bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-secondary transition-colors"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors whitespace-nowrap"
                  >
                    Generar Enlace
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
                    <code className="flex-1 text-sm text-secondary truncate w-full sm:w-auto">
                      {generatedLink}
                    </code>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-sm font-medium">{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      setGeneratedLink('');
                      setReferralName('');
                    }}
                    className="text-white/50 text-sm hover:text-white underline transition-colors"
                  >
                    Generar otro enlace
                  </button>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-1/3 relative">
              <div className="absolute inset-0 bg-secondary blur-3xl opacity-20 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=600&auto=format&fit=crop" 
                alt="Amigas en salón de belleza" 
                className="w-full h-auto aspect-square object-cover rounded-full border-4 border-zinc-800 relative z-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Visit History Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 md:p-12 rounded-2xl max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8 justify-center md:justify-start">
            <div className="bg-secondary/20 p-3 rounded-full">
              <History className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-3xl font-display">Historial de Visitas</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { date: '15 Jun, 2024', service: 'Balayage + Olaplex', points: '+15', status: 'Completado' },
              { date: '28 May, 2024', service: 'Corte + Secado', points: '+4', status: 'Completado' },
              { date: '10 Abr, 2024', service: 'Canje: Secado Gratis', points: '-10', status: 'Recompensa' },
              { date: '02 Mar, 2024', service: 'Tinte + Hidratación', points: '+8', status: 'Completado' }
            ].map((visit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-800/60 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${visit.points.startsWith('+') ? 'bg-zinc-700/50 text-white' : 'bg-secondary/20 text-secondary'}`}>
                    {visit.points.startsWith('+') ? <CheckCircle2 className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-white mb-1">{visit.service}</h4>
                    <div className="flex items-center gap-3 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {visit.date}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="text-white/40">{visit.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`text-xl font-bold whitespace-nowrap text-right ${visit.points.startsWith('+') ? 'text-secondary' : 'text-white/70'}`}>
                  {visit.points} pts
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
