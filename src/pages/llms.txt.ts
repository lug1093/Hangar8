import type { APIRoute } from 'astro';
import { areas, business, faqs, insurance, services } from '../data/site';
import { path } from '../lib/path';

// Resumen del taller para asistentes de IA (llmstxt.org). Sale de los mismos datos
// que la web: nombre, dirección y teléfono no pueden quedar distintos (regla 5).
export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(path(p), site).toString();
  const { address } = business;
  const body = `# ${business.name}

> ${business.description}

- Dirección: ${address.street}, ${address.city}, ${address.region}, Argentina
- Horario: ${business.hours.label}
- Teléfono y WhatsApp: ${business.phoneDisplay} (+${business.phoneHref.replace('tel:+', '')})
- Mapa: ${business.mapsHref}
${business.social.map((s) => `- ${s.label}: ${s.href}`).join('\n')}
- Zona: ${areas.join(', ')} (zona oeste del Gran Buenos Aires)

## Servicios

${services.map((s) => `- [${s.name}](${url(`/servicios/${s.slug}/`)}): ${s.summary}`).join('\n')}
- [Reparaciones por seguro](${url('/seguros/')}): ${insurance.intro}

## Cómo pedir presupuesto

Enviar fotos del daño y del auto entero por WhatsApp al ${business.phoneDisplay}, con marca, modelo y año.

## Preguntas frecuentes

${[...faqs, ...insurance.faqs].map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
