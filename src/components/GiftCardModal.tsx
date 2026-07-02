import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift } from 'lucide-react';

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GiftCardModal({ isOpen, onClose }: GiftCardModalProps) {
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [value, setValue] = useState('$50');
  
  const values = ['$25', '$50', '$100', '$150', 'Otro'];
  const [customValue, setCustomValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalValue = value === 'Otro' ? customValue : value;
    
    if (!finalValue) {
      alert('Por favor ingresa un monto válido.');
      return;
    }

    const message = `Hola, quiero comprar una Gift Card.

De: ${sender}
Para: ${recipient}
Monto: ${finalValue}

Por favor, indíquenme los métodos de pago. ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/584143518301?text=${encodedMessage}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-stone-900 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-stone-800"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-black/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <Gift className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <h3 className="font-display text-3xl mb-1">Regala Belleza</h3>
              <p className="text-sm font-light opacity-90">Sorprende a esa persona especial</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">Para (Nombre del destinatario)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. María Pérez"
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    value={recipient} onChange={e => setRecipient(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">De (Tu nombre)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej. Ana García"
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                    value={sender} onChange={e => setSender(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-2">Monto de la Gift Card</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {values.map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setValue(val)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          value === val 
                            ? 'bg-dark text-white dark:bg-white dark:text-dark' 
                            : 'bg-stone-100 text-natural hover:bg-stone-200 dark:bg-stone-800 dark:text-gray-300 dark:hover:bg-stone-700'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  
                  {value === 'Otro' && (
                    <div className="mt-2 relative">
                      <span className="absolute left-4 top-2.5 text-gray-500 font-medium">$</span>
                      <input 
                        required
                        type="text" 
                        placeholder="Monto personalizado"
                        className="w-full bg-stone-50 dark:bg-stone-800 border border-gray-200 dark:border-stone-700 dark:text-white rounded-lg py-2.5 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                        value={customValue} onChange={e => setCustomValue(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-accent text-white py-3.5 rounded-lg font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-dark transition-colors"
                >
                  Continuar en WhatsApp
                </button>
                <p className="text-center text-xs text-natural dark:text-gray-400 mt-4 font-light">
                  Se abrirá WhatsApp con los datos listos para enviar.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
