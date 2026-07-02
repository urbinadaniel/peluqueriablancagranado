import { Scissors, Sparkles, Droplet, Wind, Brush, Eye, Hand, SprayCan } from 'lucide-react';

export const SERVICES_LIST = [
  { id: 'corte-dama', name: 'Corte para dama', category: 'Cortes', icon: Scissors, price: 'Desde $20' },
  { id: 'corte-caballero', name: 'Corte para caballero', category: 'Cortes', icon: Scissors, price: '$15' },
  { id: 'corte-infantil', name: 'Corte infantil', category: 'Cortes', icon: Scissors, price: '$10' },
  { id: 'coloracion', name: 'Coloración', category: 'Color', icon: Brush, price: 'Desde $40' },
  { id: 'balayage', name: 'Balayage', category: 'Color', icon: Brush, price: 'Desde $80' },
  { id: 'mechas', name: 'Mechas', category: 'Color', icon: Brush, price: 'Desde $60' },
  { id: 'tinte-completo', name: 'Tinte completo', category: 'Color', icon: Brush, price: 'Desde $50' },
  { id: 'retoque-raices', name: 'Retoque de raíces', category: 'Color', icon: Brush, price: 'Desde $30' },
  { id: 'botox-capilar', name: 'Botox capilar', category: 'Tratamientos', icon: Droplet, price: 'Desde $45' },
  { id: 'keratina', name: 'Keratina', category: 'Tratamientos', icon: Sparkles, price: 'Desde $60' },
  { id: 'alisado', name: 'Alisado', category: 'Tratamientos', icon: Wind, price: 'Desde $70' },
  { id: 'hidratacion', name: 'Hidratación', category: 'Tratamientos', icon: Droplet, price: 'Desde $25' },
  { id: 'tratamientos-capilares', name: 'Tratamientos capilares', category: 'Tratamientos', icon: SprayCan, price: 'Variable' },
  { id: 'peinados', name: 'Peinados', category: 'Estilismo', icon: Wind, price: 'Desde $30' },
  { id: 'lavado-profesional', name: 'Lavado profesional', category: 'Estilismo', icon: Droplet, price: '$10' },
  { id: 'secado', name: 'Secado', category: 'Estilismo', icon: Wind, price: 'Desde $15' },
  { id: 'brushing', name: 'Brushing', category: 'Estilismo', icon: Wind, price: 'Desde $20' },
  { id: 'ondas', name: 'Ondas', category: 'Estilismo', icon: Wind, price: 'Desde $25' },
  { id: 'recogidos', name: 'Recogidos', category: 'Estilismo', icon: Wind, price: 'Desde $35' },
  { id: 'maquillaje', name: 'Maquillaje', category: 'Belleza', icon: Brush, price: 'Desde $40' },
  { id: 'manicure', name: 'Manicure', category: 'Belleza', icon: Hand, price: 'Desde $15' },
  { id: 'pedicure', name: 'Pedicure', category: 'Belleza', icon: Hand, price: 'Desde $20' },
  { id: 'depilacion', name: 'Depilación', category: 'Belleza', icon: Sparkles, price: 'Variable' },
  { id: 'diseno-cejas', name: 'Diseño de cejas', category: 'Belleza', icon: Eye, price: '$15' },
  { id: 'extensiones-pestanas', name: 'Extensiones de pestañas', category: 'Belleza', icon: Eye, price: 'Desde $45' },
  { id: 'asesoria-imagen', name: 'Asesoría de imagen', category: 'Especial', icon: Sparkles, price: 'Consultar' },
];

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=1000&auto=format&fit=crop",
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Valeria Mendoza",
    role: "Cliente frecuente",
    content: "El balayage que me hicieron superó todas mis expectativas. El trato es súper exclusivo y los productos de primera. 100% recomendado.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofía Arismendi",
    role: "Novia",
    content: "Blanca y su equipo me peinaron y maquillaron para mi boda. No pude haber elegido mejor lugar; me sentí como una reina y el resultado fue impecable y duradero.",
    rating: 5,
  },
  {
    id: 3,
    name: "Camila Torres",
    role: "Cliente",
    content: "La hidratación y el corte le devolvieron la vida a mi cabello. El ambiente del salón transmite muchísima paz y elegancia.",
    rating: 5,
  }
];
