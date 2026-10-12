export type FilterKey = 'Todas' | 'Minimal' | 'Francesa' | 'Nail art'

export type Service = {
  id: string
  name: string
  duration: string
  price: string
  description: string
}

export type GalleryItem = {
  id: number
  category: Exclude<FilterKey, 'Todas'>
  title: string
  alt: string
  src: string
  source: string
}

export type FAQItem = {
  question: string
  answer: string
}

export const brand = {
  name: 'FORMA',
  subName: 'Nail Studio',
}

export const navItems = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'El estudio', href: '#estudio' },
  { label: 'Contacto', href: '#contacto' },
]

export const heroCopy = {
  eyebrow: 'Manicura con carácter',
  title: ['EL ARTE', 'EN TUS', 'MANOS.'],
  subtitle:
    'Diseños cuidadosos, acabados impecables y una atención que se siente como un ritual.',
  cta: 'Explorar servicios',
}

export const services: Service[] = [
  {
    id: 'semipermanente',
    name: 'Manicura semipermanente',
    duration: '45 min',
    price: '38 €',
    description: 'Limpieza, preparación, esmaltado y pulido preciso con acabado duradero.',
  },
  {
    id: 'refuerzo',
    name: 'Refuerzo',
    duration: '35 min',
    price: '30 €',
    description: 'Fortalecimiento del propio borde para uñas más resistentes y con aspecto natural.',
  },
  {
    id: 'softgel',
    name: 'Extensiones soft gel',
    duration: '1 h 50 min',
    price: '82 €',
    description: 'Longitud personalizada y forma equilibrada con un resultado elegante y muy cómodo.',
  },
  {
    id: 'nailart',
    name: 'Nail art',
    duration: '50 min',
    price: '42 €',
    description: 'Minimal, figuras o detalles artísticos pensados para tu estilo y ocasión.',
  },
  {
    id: 'retirada',
    name: 'Retirada',
    duration: '25 min',
    price: '18 €',
    description: 'Extracción segura y cuidado de la superficie para preparar la próxima mani.',
  },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'Minimal',
    title: 'Minimal nude',
    alt: 'Manicura nude minimalista con acabado brillante',
    src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    source: 'Unsplash · fotografía editorial de manicura',
  },
  {
    id: 2,
    category: 'Francesa',
    title: 'French line',
    alt: 'Manicura francesa con punta delicada',
    src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    source: 'Unsplash · detalle de uñas francesa',
  },
  {
    id: 3,
    category: 'Nail art',
    title: 'Floral detail',
    alt: 'Diseño de nail art floral en tonos rosados',
    src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=80',
    source: 'Unsplash · nail art floral',
  },
  {
    id: 4,
    category: 'Minimal',
    title: 'Soft blush',
    alt: 'Uñas en tono rosa empolvado con acabado natural',
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    source: 'Unsplash · manos con esmalte rosa',
  },
  {
    id: 5,
    category: 'Francesa',
    title: 'French revival',
    alt: 'Francesa moderna con estilo editorial',
    src: 'https://images.unsplash.com/photo-1521590832167-7e3fe1f6f5f4?auto=format&fit=crop&w=900&q=80',
    source: 'Unsplash · manicura francesa',
  },
  {
    id: 6,
    category: 'Nail art',
    title: 'Pearl wave',
    alt: 'Nail art con texturas perladas',
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    source: 'Unsplash · diseño de uñas con brillo',
  },
]

export const galleryFilters: FilterKey[] = ['Todas', 'Minimal', 'Francesa', 'Nail art']

export const studioNotes = [
  'Cada trabajo se realiza con una atención meticulosa a la forma, la textura y la comodidad.',
  'Trabajamos con esmaltes y productos seleccionados para lograr un acabado suave, preciso y de larga duración.',
  'La consulta previa permite adaptar cada mano a la proporción, la forma y el estilo que mejor te acompaña.',
]

export const faqs: FAQItem[] = [
  {
    question: '¿Cuánto tiempo dura una manicura semipermanente?',
    answer:
      'Normalmente, la manicura semipermanente aguanta entre 2 y 3 semanas dependiendo del crecimiento de la uña y del cuidado diario.',
  },
  {
    question: '¿Qué necesito para una primera visita?',
    answer:
      'No hace falta nada especial. Si prefieres, puedes venir con las manos limpias y sin restos de esmalte para agilizar la preparación.',
  },
  {
    question: '¿Hacéis nail art personalizado?',
    answer:
      'Sí. Adaptamos diseños al estilo que más te guste, desde lo más discreto hasta ideas más expresivas o para eventos concretos.',
  },
  {
    question: '¿Se puede reservar una cita para una sesión con servicio concreto?',
    answer:
      'Por supuesto. En la reserva final puedes indicar el servicio que te interesa y el equipo lo recibe en el mensaje de WhatsApp.',
  },
]

export const contact = {
  hours: 'Martes a domingo · 10:30–19:30',
  note: 'Reservas por solicitud. Si no hay enlace configurado, la demo muestra el estado de disponibilidad.',
  reserveLabel: 'Reservar cita',
  bookingUnavailable: 'Las reservas no están disponibles en esta demo.',
}

export const reservationLink: string = ''

export const editorialShots = {
  blackSection: [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
  ],
  studioPortrait:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
}
