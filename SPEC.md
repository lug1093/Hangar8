# SPEC: sitio de Hangar 8

## Objetivo

1. Aparecer en Google para búsquedas de servicios en Ituzaingó y zona oeste
   ("chapa y pintura Ituzaingó", "sacabollo Castelar", "taller que trabaja con
   seguros zona oeste") y en respuestas de asistentes de IA.
2. Que quien llega le crea al taller.
3. Que escriba por WhatsApp con fotos.

**Métrica de éxito**: consultas por WhatsApp que dicen "te vi en la web" / "en
Google". (Se puede medir sin analytics: el mensaje precargado de cada botón es
distinto por página.)

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Hero, números, servicios, retiro a domicilio, cómo trabajamos, seguros, galería, reseñas, preguntas frecuentes, contacto con mapa, cierre |
| `/servicios/chapa-y-pintura` | Página del servicio principal |
| `/servicios/sacabollo` | |
| `/servicios/mecanica-integral` | |
| `/servicios/reparaciones` | |
| `/404` | |

Cada página de servicio: hero con el servicio, qué incluye, cómo trabajamos, otros
servicios, cierre. Botón de WhatsApp con mensaje precargado del servicio.

## Confianza (lo más importante del sitio)

| Elemento | Dónde | Estado |
|---|---|---|
| Trabajamos con todas las compañías de seguro | Hero, stats, sección Seguros, FAQ | Real (flyer del taller) |
| Retiro y entrega a domicilio | Hero, banda propia, pasos | Real |
| Dirección, horario, mapa | Barra superior, Contacto, footer | Real |
| Cantidad de autos reparados | Stats | **Placeholder** |
| Años de oficio | Stats | **Placeholder** |
| Puntaje en Google | Stats | **Placeholder**, requiere Google Business |
| Reseñas de clientes | Reseñas | **Placeholder** |
| Logos de aseguradoras | Seguros | **Placeholder**, requiere confirmación |
| Fotos de trabajos antes/después | Galería | **Placeholder** |
| Garantía del trabajo | (no está) | Preguntar: si existe, sumar a la tira del hero |

## SEO

**Técnico (hecho)**

- HTML estático, un `<h1>` por página, títulos y descripciones propias por página.
- `canonical`, Open Graph, `lang="es-AR"`, sitemap, `robots.txt`.
- JSON-LD: `AutoBodyShop` (dirección, teléfono, horario, zonas, redes) en todas;
  `FAQPage` en la portada; `Service` y `BreadcrumbList` en cada servicio.
- `llms.txt` con el resumen del taller para asistentes de IA.
- Fuentes self-hosted, sin JS de terceros salvo el mapa (carga diferida).

**Fuera del código (lo que más mueve la aguja en SEO local)**

1. **Google Business Profile** verificado, con categoría "Taller de chapa y pintura",
   mismas NAP (nombre, dirección, teléfono) que la web, fotos y horario. Es lo que
   hace aparecer el taller en el mapa.
2. **Reseñas en Google**: pedirle a cada cliente que deje una, con el link directo.
3. Link a la web desde la bio de Instagram y TikTok.
4. Dar de alta en Search Console y mandar el sitemap.

**Para asistentes de IA (GEO)**: respuestas directas en las FAQ, datos
estructurados consistentes, `llms.txt`, y el mismo texto de NAP en todos lados. Los
asistentes citan lo que está claro, repetido y es consistente entre fuentes.

## Roadmap

| Fase | Qué | Criterio de salida |
|---|---|---|
| 1 | Sitio con placeholders | `npm run check` en verde, recorrido a 390 y 1280 en los dos temas |
| 2 | Datos reales, dominio, deploy, Google Business | Cero `placeholder: true` visibles o `SHOW_PLACEHOLDERS = false`; sitio en su dominio; perfil de Google verificado |
| 3 | Fotos reales y logo vectorial | Galería con al menos 6 trabajos, Open Graph con imagen |
