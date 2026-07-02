import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && contentRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Política de Privacidad - Peluquería Blanca Granado</title>
            <style>
              body { font-family: sans-serif; line-height: 1.6; color: #333; padding: 20px; }
              h1 { font-size: 24px; margin-bottom: 20px; }
              h3 { font-size: 18px; margin-top: 20px; margin-bottom: 10px; }
              p { margin-bottom: 15px; }
            </style>
          </head>
          <body>
            ${contentRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white z-[101] rounded-sm shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-soft">
              <h2 className="font-display text-2xl text-dark">Política de Privacidad</h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrint}
                  className="text-natural hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
                  aria-label="Imprimir o guardar como PDF"
                >
                  <Printer className="w-5 h-5" />
                  <span className="hidden sm:inline">Imprimir / PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-natural hover:text-primary transition-colors ml-2"
                  aria-label="Cerrar modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar text-natural font-light text-sm space-y-6" ref={contentRef}>
              <p>
                <strong>Política de Privacidad de Peluquería Blanca Granado</strong><br />
                En Peluquería Blanca Granado nos comprometemos a proteger tu privacidad y tus datos personales conforme a la normativa vigente, incluyendo la Ley Orgánica de Protección de Datos Personales en Venezuela, la Ley 1581 de 2012 en Colombia, y otras disposiciones internacionales aplicables.
              </p>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">1. ¿Qué información recopilamos?</h3>
                <p className="mb-2">Podemos recopilar dos tipos de datos:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Información automática y anónima:</strong> como tipo de navegador, IP, fecha/hora de acceso, páginas visitadas. Esta información no permite identificarte.</li>
                  <li><strong>Datos personales identificables:</strong> como nombre, correo electrónico, teléfono o dirección, solo cuando tú los proporcionas voluntariamente, por ejemplo, al registrarte, solicitar citas, participar en promociones, concursos o escribirnos.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">2. ¿Para qué usamos tus datos?</h3>
                <p className="mb-2">Utilizamos tu información personal para:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Gestionar tu registro, citas, pedidos o participación en promociones.</li>
                  <li>Responder consultas y ofrecer atención al cliente.</li>
                  <li>Enviar información sobre nuestros servicios de peluquería, productos, novedades y promociones (solo si tú lo autorizas).</li>
                  <li>Mejorar tu experiencia en nuestro sitio web y redes sociales.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">3. ¿Con quién compartimos tus datos?</h3>
                <p>No compartimos tus datos con terceros, salvo obligación legal o si tú lo autorizas explícitamente.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">4. Menores de edad</h3>
                <p>No recopilamos datos de menores sin el consentimiento de sus representantes legales. Si descubrimos que hemos recopilado datos de un menor sin dicha autorización, los eliminaremos de inmediato.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">5. Seguridad de la información</h3>
                <p>Hemos adoptado medidas técnicas y organizativas para proteger tus datos contra el acceso no autorizado, alteración o pérdida, de acuerdo con los estándares de la industria.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">6. Tus derechos</h3>
                <p className="mb-2">Puedes ejercer en cualquier momento tus derechos de:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Acceso:</strong> Saber qué datos tenemos sobre ti.</li>
                  <li><strong>Rectificación:</strong> Corregir datos inexactos.</li>
                  <li><strong>Cancelación:</strong> Eliminar tus datos.</li>
                  <li><strong>Oposición:</strong> Negarte a ciertos usos.</li>
                </ul>
                <p className="mt-2">Escríbenos a info@peluqueriablancagranado.com con prueba de tu identidad.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">7. Cookies y tecnologías similares</h3>
                <p>Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. Puedes configurarlas desde tu navegador. Al navegar en nuestro sitio, aceptas su uso.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">8. Actualizaciones de esta política</h3>
                <p>Podemos actualizar esta política para adaptarla a cambios legales o técnicos. Si hacemos modificaciones importantes, te lo informaremos de forma visible en nuestra web o redes sociales.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">Contáctanos</h3>
                <p>Si tienes dudas sobre nuestra Política de Privacidad o el tratamiento de tus datos personales, puedes escribirnos a: <a href="mailto:info@peluqueriablancagranado.com" className="text-primary hover:underline">info@peluqueriablancagranado.com</a></p>
              </div>
            </div>
            
            <div className="p-6 border-t border-soft bg-stone-50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-dark text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
