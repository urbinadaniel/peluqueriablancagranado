import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    // A simple approach for printing just this content
    // We open a new window, write the HTML, and call print()
    const printWindow = window.open('', '_blank');
    if (printWindow && contentRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Términos y Condiciones - Peluquería Blanca Granado</title>
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
      // Small delay to ensure styles are applied
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
              <h2 className="font-display text-2xl text-dark">Términos y Condiciones de Uso</h2>
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
              <div>
                <h1 className="text-xl font-bold text-dark mb-4 hidden">TÉRMINOS Y CONDICIONES DE USO</h1>
                
                <h3 className="text-dark font-medium mb-2 text-base">1. ¿Quiénes Somos?</h3>
                <p>Este sitio web es operado por Peluquería Blanca Granado. Al navegar en nuestro sitio web https://peluqueriablancagranado.vercel.app, aceptas plenamente estos términos de uso. Si no estás de acuerdo con alguna de las condiciones aquí establecidas, te invitamos a no continuar navegando en nuestra plataforma.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">2. Condiciones de Uso</h3>
                <p>El sitio está destinado a personas mayores de 18 años. Su uso es estrictamente personal y no comercial. No se permite modificar, copiar, distribuir, transmitir o reutilizar el contenido del sitio web sin nuestra autorización expresa y por escrito. Nos reservamos el derecho de restringir o suspender el acceso a la plataforma en caso de detectar un uso indebido o fraudulento.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">3. Propiedad Intelectual</h3>
                <p>Todo el contenido presente en este sitio (incluyendo, pero no limitado a, textos, imágenes, videos, marcas comerciales, logotipos, elementos gráficos y diseños de página) está protegido por las leyes de propiedad intelectual y derechos de autor. Queda totalmente prohibida su reproducción, uso, distribución o modificación con fines comerciales sin la debida autorización previa y por escrito de Peluquería Blanca Granado.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">4. Protección de Datos y Privacidad</h3>
                <p className="mb-2">Recogemos y tratamos tus datos personales únicamente con el fin de mejorar tu experiencia de navegación, ofrecer una atención personalizada (como la gestión, programación y confirmación de tus citas de belleza) y mantener una comunicación directa contigo.</p>
                <p className="mb-2">No compartimos tu información personal con terceros sin tu consentimiento explícito.</p>
                <p className="mb-2">Puedes acceder, rectificar o solicitar la eliminación de tus datos en cualquier momento escribiendo a nuestro correo de contacto: contacto@peluqueriablancagranado.vercel.app</p>
                <p className="mb-2">No recopilamos datos de menores de edad sin la debida autorización de sus representantes legales, ni solicitamos de forma directa información de carácter sensible.</p>
                <p>En caso de detectar o sospechar de un intento de phishing o suplantación de nuestra identidad, te solicitamos reportarlo de inmediato a nuestros canales oficiales.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">5. Cookies y Navegación</h3>
                <p>Este sitio web utiliza cookies para personalizar la experiencia de navegación, recordar tus preferencias y analizar el rendimiento técnico y de tráfico de la página. Puedes desactivar o configurar el uso de cookies desde los ajustes de tu navegador, tomando en cuenta que esto podría limitar el acceso a ciertas funcionalidades del sitio.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">6. Seguridad y Responsabilidad</h3>
                <p>Peluquería Blanca Granado realiza esfuerzos constantes por mantener la plataforma segura; sin embargo, no garantiza el funcionamiento ininterrumpido del sitio ni la total ausencia de errores, virus o componentes dañinos en el servidor. No nos hacemos responsables por pérdidas, perjuicios o daños directos o indirectos derivados del uso de este sitio web o de los enlaces externos hacia páginas de terceros que aquí se incluyan.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">7. Uso de Imagen y Cesión de Derechos</h3>
                <p className="mb-2">Al interactuar en nuestras plataformas digitales, interactuar en nuestras redes sociales o participar de forma activa en dinámicas, concursos o campañas asociadas al establecimiento, autorizas de manera voluntaria a Peluquería Blanca Granado a utilizar tu imagen y voz con fines promocionales, publicitarios, comerciales o editoriales, sin que esto genere ningún tipo de compensación económica o regalía.</p>
                <p className="mb-2">Esto incluye la cesión de los derechos patrimoniales sobre el material fotográfico, videográfico o de audio en el que participes dentro de nuestras instalaciones o eventos de la marca, permitiendo su difusión en medios digitales (sitio web, redes sociales, publicidad programática), audiovisuales o impresos, sin limitación temporal ni territorial.</p>
                <p>Nos comprometemos firmemente a respetar tu derecho a la propia imagen, garantizando que no se utilizará ningún contenido que pueda afectar tu dignidad, honor o reputación. En caso de que se requiera por formalidades adicionales, las partes podrán suscribir un acuerdo físico o digital de cesión de derechos de imagen. Los derechos morales del autor se respetarán rigurosamente conforme a las leyes vigentes.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">8. Modificaciones</h3>
                <p>Nos reservamos el derecho de actualizar, modificar o transformar la estructura del sitio web y los presentes Términos y Condiciones en cualquier momento. Esto se realizará con el fin de implementar mejoras operativas, adaptaciones tecnológicas o para dar cumplimiento a nuevas normativas legales. Las modificaciones entrarán en vigencia inmediatamente después de su publicación en esta sección, por lo que te recomendamos revisarla de manera periódica.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">9. Jurisdicción Aplicable</h3>
                <p>Estos términos y condiciones se rigen e interpretan bajo las leyes vigentes de la República Bolivariana de Venezuela. Ante cualquier duda, controversia o disputa derivada del uso del sitio web o de la interpretación de este documento, las partes buscarán inicialmente una resolución amistosa de mutuo acuerdo. En caso de no alcanzar una conciliación, la resolución se someterá a los tribunales competentes de la jurisdicción venezolana.</p>
              </div>

              <div>
                <h3 className="text-dark font-medium mb-2 text-base">10. Contacto Legal</h3>
                <p>Para resolver cualquier duda relacionada con estos Términos y Condiciones, ejercer tus derechos sobre el tratamiento de tus datos personales, o realizar consultas de carácter legal, puedes escribirnos directamente a nuestra dirección de correo electrónico oficial: contacto@peluqueriablancagranado.vercel.app</p>
              </div>

              <div className="pt-4 mt-6 border-t border-soft">
                <p className="text-xs text-natural/70">Última actualización: Julio 2026</p>
              </div>
            </div>
            
            <div className="p-6 border-t border-soft bg-stone-50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-dark text-white rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Aceptar y Cerrar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
