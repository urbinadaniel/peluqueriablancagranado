import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export function LoyaltyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: '¡Hola! ✨ Soy el asistente virtual de Peluquería Blanca Granado. Estoy aquí para ayudarte a agendar citas y resolver tus dudas sobre nuestro nuevo Club de Belleza. ¿En qué te puedo ayudar hoy? Te comento que tenemos algunos espacios disponibles para esta semana.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userText: string) => {
    const text = userText.toLowerCase();
    
    // Simulate API delay
    setTimeout(() => {
      let botResponse = '';
      
      // Logic matching based on instructions
      if (text.match(/(?:cedula|v-|c\.i|tel[eé]fono|0414|0424|0412|0416|0426|\d{6,})/)) {
        botResponse = '¡Perfecto! He revisado en nuestro sistema y actualmente tienes 15 puntos acumulados. ¡Estás muy cerca de canjear un corte de puntas e hidratación gratis (20 pts) y ya tienes suficientes para un secado gratis (10 pts)! ¿Qué te parece si agendamos una cita para esta semana y los aprovechas? 💇‍♀️';
      } else if (text.match(/(?:puntos|saldo|cu[aá]ntos|verificar)/)) {
        botResponse = '¡Claro que sí! Para revisar cuántos puntos tienes acumulados en el Club de Belleza Blanca Granado, por favor indícame tu número de cédula o teléfono. ¿Te gustaría que también revise los horarios disponibles para esta semana? 📅';
      } else if (text.match(/(?:c[oó]mo funciona|programa|lealtad|reglas|informaci[oó]n|info|club|premios)/)) {
        botResponse = '¡El Club de Belleza Blanca Granado te premia por consentirte! Por cada $10 que inviertes en nuestros servicios ganas 1 punto, y puedes canjearlos por tratamientos gratis como un secado (10 pts) o corte con hidratación (20 pts). Recuerda que tus puntos son válidos por 6 meses. ¿Te gustaría que te comparta los horarios disponibles de esta semana para tu próxima cita? ✨';
      } else if (text.match(/(?:vencidos|expirados|caducaron|queja|desaparecieron)/)) {
        botResponse = 'Entiendo perfectamente tu inquietud sobre los puntos. En nuestro Club de Belleza, los puntos tienen una vigencia de 6 meses para animarte a mantener tu cabello siempre radiante. Aunque esos puntos hayan expirado, me encantaría ayudarte a empezar a acumular nuevos puntos hoy mismo. ¿Te comparto los espacios disponibles para esta semana? 🌸';
      } else if (text.match(/(?:cita|agendar|horarios|reservar|quiero ir)/)) {
        botResponse = '¡Excelente decisión! Esta semana tenemos disponibilidad el jueves a las 3:00 PM y el viernes a las 10:00 AM o 2:00 PM. ¿Cuál de estos horarios te funciona mejor para tu cita? 🗓️';
      } else if (text.match(/(?:gratis|canjear|reclamar)/)) {
        botResponse = '¡Qué emoción! Puedes canjear 10 puntos por un secado gratis, o 20 puntos por un corte de puntas e hidratación profunda. Para verificar si tienes los puntos necesarios, por favor indícame tu cédula o teléfono. Siempre tengo los horarios disponibles de esta semana a la mano por si te animas a agendar. 😉';
      } else {
        botResponse = '¡Entiendo! Como asistente virtual, estoy aprendiendo. Puedes preguntarme sobre cómo funciona nuestro Club de Belleza, consultar cuántos puntos tienes, o pedirme agendar una cita. Siempre estaré feliz de mostrarte los horarios disponibles para esta semana. ¿En qué te ayudo? ✨';
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);
    generateBotResponse(inputText);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Asistente de Lealtad</h3>
                  <p className="text-[10px] text-white/80">Club Blanca Granado</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 dark:bg-zinc-950">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      msg.sender === 'user' ? 'bg-secondary text-white' : 'bg-primary text-white'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-secondary text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-gray-700 dark:text-gray-300 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                      <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-stone-100 dark:bg-zinc-800 text-dark dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
        >
          <Bot className="w-6 h-6" />
        </motion.button>
      )}
    </>
  );
}
