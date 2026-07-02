import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SERVICES_LIST } from '../data';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Search, CalendarPlus, Bell } from 'lucide-react';

export function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    comments: ''
  });
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'VED'>('USD');
  const [vedRate, setVedRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('https://ve.dolarapi.com/v1/cotizaciones');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Find the BCV rate. DolarAPI typically returns an array where one of the items is for BCV.
        // It could have source: 'oficial' or source: 'bcv' or nombre: 'BCV'
        let bcvQuote = null;
        if (Array.isArray(data)) {
          bcvQuote = data.find((q: any) => 
            q.source === 'oficial' || q.source === 'bcv' || q.nombre?.toLowerCase() === 'bcv' || q.casa === 'bcv'
          );
        } else if (data && typeof data === 'object') {
          bcvQuote = data;
        }
        
        if (bcvQuote) {
          setVedRate(bcvQuote.precio || bcvQuote.venta || bcvQuote.promedio || 36.42);
        } else if (Array.isArray(data) && data.length > 0) {
           // Fallback to first quote if BCV not explicitly found but we got data
           setVedRate(data[0].precio || data[0].venta || data[0].promedio || 36.42);
        }
      } catch (error) {
        console.error('Error fetching BCV rate:', error);
        setVedRate(36.42); // Fallback
      }
    };
    fetchRate();
  }, []);

  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const formatPrice = (priceStr: string) => {
    if (currency === 'USD') return priceStr;
    const rate = vedRate || 36.42;
    const match = priceStr.match(/\$(\d+)/);
    if (match && match[1]) {
      const usd = parseInt(match[1]);
      const ved = (usd * rate).toFixed(2);
      return priceStr.replace(`$${usd}`, `Bs ${ved}`);
    }
    return priceStr;
  };

  const filteredServices = SERVICES_LIST.filter(s => {
    const matchesCategory = activeCategory === 'Todos' || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      alert("Por favor selecciona al menos un servicio.");
      return;
    }

    const message = `Hola, deseo reservar una cita.

Nombre: ${formData.name}
Apellido: ${formData.lastName}
Teléfono: ${formData.phone}
Correo: ${formData.email}
Fecha: ${formData.date}
Hora: ${formData.time}

Servicios seleccionados:
${selectedServices.map(s => `* ${s}`).join('\n')}

Comentarios:
${formData.comments || 'Ninguno'}

Muchas gracias.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/584143518301?text=${encodedMessage}`, '_blank');
  };

  const generateICS = () => {
    if (!formData.date || !formData.time) {
      alert("Por favor selecciona una fecha y hora para agendar y sincronizar.");
      return;
    }
    const [year, month, day] = formData.date.split('-');
    const [hours, minutes] = formData.time.split(':');
    const startString = `${year}${month}${day}T${hours}${minutes}00`;
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startString}
SUMMARY:Cita - Peluquería Blanca Granado
DESCRIPTION:Cita reservada en Peluquería Blanca Granado
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cita_blanca_granado.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const requestWhatsAppReminder = () => {
    if (!formData.date || !formData.time || !formData.firstName) {
      alert("Por favor ingresa tu nombre, fecha y hora para solicitar el recordatorio.");
      return;
    }
    
    const message = `¡Hola! Me gustaría programar un recordatorio para mi cita.

Nombre: ${formData.firstName} ${formData.lastName}
Fecha: ${formData.date}
Hora: ${formData.time}

Por favor envíenme un recordatorio por WhatsApp 24 horas antes de mi cita. ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/584143518301?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="reservar" className="py-24 bg-stone-100 dark:bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-secondary text-accent dark:text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            Agenda tu espacio
          </motion.span>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display text-dark dark:text-white mb-4"
          >
            Reserva <span className="italic text-primary">con nosotras</span>
          </motion.h3>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white dark:bg-stone-900 rounded-sm shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 border border-soft dark:border-stone-800"
        >
          
          {/* Info Side */}
          <div className="lg:col-span-2 bg-stone-200 dark:bg-stone-800 p-12 text-dark dark:text-white flex flex-col justify-between relative overflow-hidden border-r border-soft dark:border-stone-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-display mb-4 italic">Reserva tu cita</h3>
              <p className="text-natural dark:text-gray-300 font-light mb-12">
                Completa el formulario para solicitar tu espacio. Te confirmaremos por WhatsApp a la brevedad.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Horario de atención</h4>
                  <div className="space-y-2 text-dark dark:text-gray-200 font-light text-sm">
                    <p className="flex justify-between"><span>Lunes a Viernes</span> <span>8:00 am - 6:00 pm</span></p>
                    <p className="flex justify-between"><span>Sábados</span> <span>8:00 am - 5:00 pm</span></p>
                    <p className="flex justify-between text-dark/50 dark:text-gray-500"><span>Domingos</span> <span>Cerrado</span></p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Contacto Directo</h4>
                  <p className="text-dark dark:text-gray-200 font-light text-sm">+58 414-3518301</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input required type="text" placeholder="Nombre" 
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input required type="text" placeholder="Apellido" 
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input required type="tel" placeholder="Teléfono" 
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input required type="email" placeholder="Correo electrónico" 
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input required type="date" 
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-600"
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input required type="time" 
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-600"
                    value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <label className="block text-sm font-medium text-dark dark:text-white">Selecciona los servicios deseados</label>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-48">
                      <Search className="absolute left-3 top-2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Buscar..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-full py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex bg-stone-200 dark:bg-stone-800 rounded-full p-1">
                        <button
                          type="button"
                          onClick={() => setCurrency('USD')}
                          className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${currency === 'USD' ? 'bg-white dark:bg-stone-700 text-dark dark:text-white shadow-sm' : 'text-natural dark:text-gray-400'}`}
                        >
                          USD
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrency('VED')}
                          className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${currency === 'VED' ? 'bg-white dark:bg-stone-700 text-dark dark:text-white shadow-sm' : 'text-natural dark:text-gray-400'}`}
                        >
                          VED
                        </button>
                      </div>
                      {currency === 'VED' && (
                        <span className="text-[10px] text-natural dark:text-gray-400 font-medium whitespace-nowrap">
                          Tasa BCV: {vedRate ? vedRate : 'Cargando...'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
                  {['Todos', ...Array.from(new Set(SERVICES_LIST.map(s => s.category)))].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        activeCategory === cat 
                          ? 'bg-primary text-white' 
                          : 'bg-stone-200 text-natural hover:bg-stone-300 dark:bg-stone-800 dark:text-gray-300 dark:hover:bg-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border border-gray-100 dark:border-stone-800 rounded-xl bg-stone-50 dark:bg-stone-900 scrollbar-thin">
                  {filteredServices.map(service => (
                    <label key={service.id} className="flex items-center gap-3 cursor-pointer group p-1">
                      <div className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                          checked={selectedServices.includes(service.name)}
                          onChange={() => handleServiceToggle(service.name)}
                        />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-natural dark:text-gray-300 group-hover:text-dark dark:group-hover:text-white transition-colors leading-tight">{service.name}</span>
                        <span className="text-[10px] text-primary font-medium">{formatPrice(service.price)}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <textarea placeholder="Comentarios adicionales (opcional)" rows={3}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  value={formData.comments} onChange={e => setFormData({...formData, comments: e.target.value})}
                ></textarea>
              </div>

              <div className="flex flex-col gap-4">
                <button type="submit" className="w-full bg-accent text-white py-4 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-dark transition-colors">
                  Reservar por WhatsApp
                </button>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    type="button" 
                    onClick={generateICS}
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-200 dark:bg-stone-800 text-dark dark:text-white py-4 px-6 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Agendar en Calendario
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={requestWhatsAppReminder}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary py-4 px-6 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors border border-primary/20"
                  >
                    <Bell className="w-4 h-4" />
                    Solicitar Recordatorio
                  </button>
                </div>
              </div>

            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
