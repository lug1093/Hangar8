// Única fuente de verdad del contenido del sitio. Cambiar un teléfono, un horario
// o un servicio es editar este archivo; ningún componente escribe estos datos.

const phoneDigits = '5491123162623';

export const business = {
  name: 'Hangar 8',
  tagline: 'Taller integral',
  description:
    'Taller de chapa y pintura en Ituzaingó. Sacabollo, reparaciones y mecánica integral. Trabajamos con todas las compañías de seguro y retiramos y entregamos tu auto a domicilio.',
  phoneDisplay: '11 2316-2623',
  phoneHref: `tel:+${phoneDigits}`,
  whatsappHref: (text = 'Hola Hangar 8, quiero pedir un presupuesto.') =>
    `https://wa.me/${phoneDigits}?text=${encodeURIComponent(text)}`,
  address: {
    street: 'Santa Lucía 1746',
    city: 'Ituzaingó',
    region: 'Provincia de Buenos Aires',
    country: 'AR',
  },
  mapsHref: 'https://maps.app.goo.gl/Qv4A2iDeyJSRW3z76',
  mapsEmbed:
    'https://www.google.com/maps?q=Santa+Luc%C3%ADa+1746,+Ituzaing%C3%B3,+Buenos+Aires&output=embed',
  hours: {
    label: 'Lunes a viernes, 8 a 18 h',
    short: 'Lun a vie 8 a 18 h',
    schema: 'Mo-Fr 08:00-18:00',
  },
  social: [
    { label: 'Instagram', handle: '@hangar8.taller', href: 'https://www.instagram.com/hangar8.taller/' },
    { label: 'TikTok', handle: '@taller.hangar8', href: 'https://www.tiktok.com/@taller.hangar8' },
  ],
} as const;

export type ServiceIcon = 'spray-can' | 'hammer' | 'wrench' | 'car-front';

export interface Service {
  slug: string;
  name: string;
  /** Una línea para la grilla de la portada. */
  summary: string;
  /** Párrafo de apertura de la página del servicio. */
  intro: string;
  includes: string[];
  icon: ServiceIcon;
  whatsappText: string;
}

// El orden es el orden visible: chapa y pintura primero porque es el foco del taller.
export const services: Service[] = [
  {
    slug: 'chapa-y-pintura',
    name: 'Chapa y pintura',
    summary: 'Reparación de carrocería después de un choque y pintura en cabina.',
    intro:
      'Es lo que más hacemos. Reparamos la carrocería después de un choque, un raspón o un golpe de estacionamiento, y pintamos en cabina para que el color quede parejo con el resto del auto.',
    includes: [
      'Reparación y reemplazo de piezas de carrocería',
      'Pintura en cabina',
      'Igualación de color con el resto del auto',
      'Pintura parcial o de una pieza',
      'Preparación y pulido',
    ],
    icon: 'spray-can',
    whatsappText: 'Hola Hangar 8, quiero un presupuesto de chapa y pintura.',
  },
  {
    slug: 'sacabollo',
    name: 'Sacabollo',
    summary: 'Abolladuras sin pintar, cuando la pintura original está sana.',
    intro:
      'Cuando la pintura no se rompió, muchas abolladuras se sacan desde adentro sin repintar. El auto conserva la pintura de fábrica y el trabajo lleva menos tiempo.',
    includes: [
      'Abolladuras de estacionamiento',
      'Golpes de granizo',
      'Bollos en puertas, capot y techo',
      'Evaluación de si conviene sacabollo o chapa y pintura',
    ],
    icon: 'hammer',
    whatsappText: 'Hola Hangar 8, tengo un bollo y quiero saber si se puede sacar sin pintar.',
  },
  {
    slug: 'mecanica-integral',
    name: 'Mecánica integral',
    summary: 'Mantenimiento y reparaciones mecánicas en el mismo taller.',
    intro:
      'Además de la carrocería, nos ocupamos de la mecánica. Si el auto entra por un choque y también necesita un service, lo resolvés en un solo lugar.',
    includes: [
      'Service y mantenimiento',
      'Frenos',
      'Tren delantero y suspensión',
      'Diagnóstico de fallas',
    ],
    icon: 'wrench',
    whatsappText: 'Hola Hangar 8, quiero consultar por un trabajo de mecánica.',
  },
  {
    slug: 'reparaciones',
    name: 'Reparaciones',
    summary: 'Arreglos generales, ópticas, paragolpes y detalles del día a día.',
    intro:
      'Los arreglos que no son un choque grande pero igual hay que resolver: un paragolpes flojo, una óptica rota, un espejo, una cerradura. Traelo y lo vemos.',
    includes: [
      'Paragolpes y fijaciones',
      'Ópticas y espejos',
      'Cerraduras y manijas',
      'Arreglos generales',
    ],
    icon: 'car-front',
    whatsappText: 'Hola Hangar 8, quiero consultar por una reparación.',
  },
];

export const steps = [
  {
    title: 'Mandanos fotos',
    body: 'Por WhatsApp, del daño y del auto entero. Con eso te damos una primera idea del trabajo.',
  },
  {
    title: 'Presupuesto y seguro',
    body: 'Te pasamos el presupuesto. Si va por el seguro, coordinamos con tu compañía.',
  },
  {
    title: 'Lo retiramos y te lo devolvemos',
    body: 'Pasamos a buscar el auto y te lo llevamos listo. O lo traés vos al taller.',
  },
];

export const faqs = [
  {
    q: '¿Trabajan con mi seguro?',
    a: 'Sí, trabajamos con todas las compañías de seguro. Escribinos con los datos del siniestro y coordinamos con tu compañía.',
  },
  {
    q: '¿Cómo pido un presupuesto?',
    a: 'Mandanos por WhatsApp fotos del daño y del auto entero, con la marca, el modelo y el año. Te respondemos con una primera estimación y, si hace falta, coordinamos para verlo en el taller.',
  },
  {
    q: '¿Retiran el auto?',
    a: 'Sí, retiramos y entregamos a domicilio. Consultanos por WhatsApp para coordinar el día y el horario.',
  },
  {
    q: '¿Qué días atienden?',
    a: 'De lunes a viernes, de 8 a 18 h, en Santa Lucía 1746, Ituzaingó.',
  },
];

export const nav = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Seguros', href: '/#seguros' },
  { label: 'Cómo trabajamos', href: '/#como-trabajamos' },
  { label: 'Contacto', href: '/#contacto' },
];

// --- Confianza --------------------------------------------------------------
// Todo lo marcado `placeholder: true` es un ejemplo a reemplazar con el dato real
// del taller. Nunca se publica como verdadero: se ve marcado como "Ejemplo" y se
// apaga entero con SHOW_PLACEHOLDERS en src/config/flags.ts.

export interface Stat {
  value: string;
  label: string;
  placeholder: boolean;
}

export const stats: Stat[] = [
  { value: '+500', label: 'autos reparados', placeholder: true },
  { value: '+10', label: 'años de oficio', placeholder: true },
  { value: 'Todas', label: 'las compañías de seguro', placeholder: false },
  { value: '4,9', label: 'de puntaje en Google', placeholder: true },
];

export interface Review {
  name: string;
  car: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  placeholder: boolean;
}

// Copiar reseñas reales de Google o Instagram, con permiso de quien la escribió.
export const reviews: Review[] = [
  {
    name: 'Nombre del cliente',
    car: 'Modelo del auto',
    text: 'Acá va una reseña real de Google. Qué le arreglaron, cómo quedó y cómo fue el trato.',
    rating: 5,
    placeholder: true,
  },
  {
    name: 'Nombre del cliente',
    car: 'Modelo del auto',
    text: 'Segunda reseña real. Idealmente de alguien que vino por el seguro, para reforzar ese punto.',
    rating: 5,
    placeholder: true,
  },
  {
    name: 'Nombre del cliente',
    car: 'Modelo del auto',
    text: 'Tercera reseña real. Idealmente de alguien que usó el retiro y la entrega a domicilio.',
    rating: 5,
    placeholder: true,
  },
];

/** Perfil de Google del taller, para "Ver todas las reseñas" y "Dejanos tu reseña". */
export const googleReviewsHref: string | null = null;

export interface GalleryItem {
  /** Ruta dentro de /public, o null mientras no haya foto. */
  src: string | null;
  alt: string;
  caption: string;
}

// Fotos reales de trabajos terminados, idealmente antes y después del mismo auto.
export const gallery: GalleryItem[] = [
  { src: null, alt: '', caption: 'Antes y después: chapa y pintura' },
  { src: null, alt: '', caption: 'Pintura en cabina' },
  { src: null, alt: '', caption: 'Sacabollo sin pintar' },
  { src: null, alt: '', caption: 'Trabajo por seguro' },
  { src: null, alt: '', caption: 'El taller' },
  { src: null, alt: '', caption: 'Entrega a domicilio' },
];

/** Logos de aseguradoras: solo con nombres confirmados por el taller. */
export const insurers: string[] = [];

/** Zonas cercanas: ayudan al SEO local. Confirmar hasta dónde llega el retiro. */
export const areas = ['Ituzaingó', 'Castelar', 'Morón', 'Hurlingham', 'Padua', 'Merlo'];
