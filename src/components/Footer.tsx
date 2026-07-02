import React, { useState } from 'react';
import { MapPin, Phone, Instagram, Facebook, Send } from 'lucide-react';
import { Logo } from './Logo';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsModal } from './TermsModal';

export function Footer() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Phone validation (at least 10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Por favor, ingresa un número de WhatsApp válido (mínimo 10 dígitos).');
      return;
    }

    const message = `¡Hola! Quiero suscribirme al boletín de noticias, promociones y ofertas.\n\nNombre completo: ${formData.name}\nWhatsApp: ${formData.phone}\nCorreo: ${formData.email}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/584143518301?text=${encodedMessage}`, '_blank');
    setFormData({ name: '', phone: '', email: '' });
  };

  return (
    <footer id="contacto" className="bg-dark text-stone-50 border-t border-soft pt-20 pb-10 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10 text-stone-50" />
              <div className="flex flex-col">
                <span className="font-display text-lg tracking-wide text-stone-50">Blanca Granado</span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-secondary">Peluquería</span>
              </div>
            </div>
            <p className="text-sm text-stone-100 font-light leading-relaxed">
              El arte de resaltar tu belleza natural en un ambiente de lujo y exclusividad. Tu salón premium en Cabudare.
            </p>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-display text-lg text-stone-50 mb-6">Ubicación</h4>
            <div className="space-y-4">
              <a href="#" className="flex items-start gap-3 text-stone-100 hover:text-secondary transition-colors">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-sm font-light leading-relaxed">
                  Urbanización El Valle<br />
                  Cabudare, Estado Lara<br />
                  Venezuela
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-display text-lg text-stone-50 mb-6">Contacto</h4>
            <div className="space-y-4">
              <a href="https://wa.me/584143518301" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-stone-100 hover:text-secondary transition-colors">
                <Phone className="w-5 h-5" />
                <span className="text-sm font-light">+58 414-3518301</span>
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.instagram.com/peluqueriablancagranado" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-50 hover:bg-primary hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/peluqueriablancagranado" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-stone-50 hover:bg-primary hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg text-stone-50 mb-6">Suscríbete al Boletín</h4>
            <p className="text-sm text-stone-100 font-light mb-6">
              Recibe nuestras últimas promociones, novedades y ofertas exclusivas directamente en tu WhatsApp.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input 
                type="text" 
                required 
                placeholder="Nombre completo" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-4 text-sm text-stone-50 placeholder:text-stone-50/50 focus:outline-none focus:border-secondary transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="tel" 
                  required 
                  placeholder="Número de WhatsApp" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-4 text-sm text-stone-50 placeholder:text-stone-50/50 focus:outline-none focus:border-secondary transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
                <input 
                  type="email" 
                  required 
                  placeholder="Correo electrónico" 
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-4 text-sm text-stone-50 placeholder:text-stone-50/50 focus:outline-none focus:border-secondary transition-colors"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-1">{error}</p>
              )}
              <button 
                type="submit" 
                className="w-full bg-accent text-white py-2.5 rounded-sm font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-dark transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Suscribirme <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-stone-200">
          <p>
            © {new Date().getFullYear()} Peluquería Blanca Granado. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-white cursor-pointer">Política de Privacidad</span>
            <span onClick={() => setIsTermsModalOpen(true)} className="hover:text-white cursor-pointer">Aviso Legal</span>
          </div>
        </div>

      </div>
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </footer>
  );
}
