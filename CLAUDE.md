# CLAUDE.md: Hangar 8

Las reglas generales de UX, UI, accesibilidad, componentes, pruebas y método de
trabajo están en el **playbook** (copia en `docs/PLAYBOOK.md`, original en
`lug1093/playbook`), y se dan por leídas. **Este archivo solo escribe lo particular
de este proyecto.**

Si algo de acá contradice al playbook, gana este archivo, y la contradicción se
anota en `DECISIONS.md` con el motivo.

Leé también `SPEC.md` (contenido, secciones, SEO y roadmap) y `PROGRESS.md` (qué
está hecho y qué datos faltan).

---

## 1. Qué es esto

Sitio institucional de **Hangar 8**, taller integral en Ituzaingó (Santa Lucía
1746). El foco es chapa y pintura; también sacabollo, reparaciones y mecánica
integral. Trabaja con todas las compañías de seguro y retira y entrega a domicilio.

**El diferencial del producto**: que alguien que busca "chapa y pintura Ituzaingó"
en Google (o le pregunta a un asistente de IA) encuentre el taller, **le crea**, y
le escriba por WhatsApp. Confianza y un camino corto a WhatsApp. Si una decisión
complica eso, está mal.

## 2. Para quién

- Vecinos de Ituzaingó y zona oeste con un auto chocado o con un bollo, muchos
  con un siniestro en curso con el seguro.
- **Dónde se usa de verdad**: teléfono, casi siempre. La compu es secundaria.
- **Cómo llegan**: Google (búsqueda orgánica y mapa), Instagram, recomendación.
- **Nivel técnico**: bajo. Si algo necesita explicación, está mal diseñado.
- **Idioma**: español rioplatense con voseo. Un solo idioma (ver `DECISIONS.md`).

---

## 3. Stack

```
Astro 7 (estático, cero JS salvo el menú y la barra del teléfono)
Tailwind CSS v4 (@tailwindcss/vite)
@lucide/astro como único set de iconos, siempre vía src/components/ui/Icon.astro
@fontsource (Inter Variable, Barlow Condensed): fuentes self-hosted
@astrojs/sitemap
Deploy: Vercel, salida estática
```

Sin React ni shadcn: no hay una sola interacción que lo justifique (ver
`DECISIONS.md`, D-02). **Presupuesto**: JS del cliente < 5 KB, cero islas.

Pruebas: `npm run check` (build + axe + desborde + áreas táctiles + capturas en
`.checks/`). Usa `playwright-core` con el Chromium del entorno.

---

## 4. Arquitectura

```
src/
  data/site.ts          # TODO el contenido: negocio, servicios, pasos, FAQ, confianza
  config/flags.ts       # SHOW_PLACEHOLDERS
  styles/global.css     # tokens (único lugar con hex)
  lib/path.ts           # links internos: siempre path("/..."), nunca "/..." suelto
  layouts/Base.astro    # <head>, SEO, JSON-LD, header, footer, barra móvil
  components/ui/        # primitivas: Button, Icon, PlaceholderTag
  components/site/      # compartidos entre páginas: Header, Footer, Section, ServiceGrid, Steps, CtaBand
  components/home/      # secciones de la portada
  pages/                # index, servicios/[slug], 404
public/                 # favicon, robots.txt, llms.txt
scripts/check.mjs       # chequeo de cierre
```

**Regla dura**: ningún componente escribe un teléfono, una dirección, un horario ni
un nombre de servicio. Todo sale de `src/data/site.ts`. Cambiar un dato es editar un
archivo.

---

## 5. Sistema visual

Tokens y contrastes medidos en `docs/DESIGN.md`. Se reverifican ante cualquier
cambio de color.

- Negro, rojo y blanco, porque es la marca que el taller ya usa.
- **Un solo bloque rojo sólido por pantalla, y es WhatsApp.**
- Títulos condensados en mayúsculas (Barlow Condensed): la voz del flyer del taller.
- `Button` trae `min-h-[44px]` horneado. Variantes cerradas: `primary`,
  `secondary`, `secondary-ink`, `ghost`.
- **Trampa ya pagada**: no poner `hidden` en el `class` de un `Button` (su
  `inline-flex` le gana por orden). El display responsive va en un contenedor.

---

## 6. Reglas que no se negocian

1. **Nunca publicar un dato inventado como real.** Reseñas, cantidad de clientes,
   años, puntaje y logos de aseguradoras van con `placeholder: true` hasta que el
   taller los confirme; se ven marcados "Ejemplo" y se apagan con
   `SHOW_PLACEHOLDERS`. Un taller que miente en su web pierde lo único que vende.
2. **No nombrar aseguradoras ni poner sus logos sin confirmación del taller.**
3. **WhatsApp a un toque desde cualquier pantalla del teléfono.**
4. **Cada servicio tiene su página** (`/servicios/<slug>`) con su título y su
   descripción: es lo que posiciona en Google.
5. **Los datos de contacto son iguales en todos lados** (web, JSON-LD, `llms.txt`,
   Google Business, Instagram). Nombre, dirección y teléfono idénticos: es la base
   del SEO local.
6. **Nada de marquesinas, carruseles automáticos, pop-ups ni chat de terceros.**

## 7. Lo que NO se implementa

- Turnero online, formulario de presupuesto con subida de fotos, login, blog,
  precios publicados, chat embebido, analytics (hasta que se pida).

Si creés que algo de esta lista hace falta, decilo antes de implementarlo.

## 8. Antipatrones ya descartados

- **Widget de reseñas de Google embebido**: pesado, de terceros y rompe el diseño.
  Van reseñas copiadas con permiso y un link al perfil de Google.
- **Formulario de contacto**: para este público WhatsApp convierte más y no necesita
  backend. Descartado *para esta fase*; si el taller pide recibir por mail, se evalúa.

---

## 9. Fase actual

**Fase 1, sitio publicable con placeholders. Hecha.** Ver `PROGRESS.md`.

**La próxima es la fase 2**: reemplazar placeholders con datos reales, dominio, deploy
y Google Business Profile. Se arranca cuando lleguen los datos del taller.

## 10. Cómo trabajar conmigo

- Antes de una tarea grande, plan corto y esperá confirmación. Después, autonomía.
- Si un requerimiento es ambiguo, preguntá. No inventes datos del taller.
- Commits chicos. El mensaje explica el porqué.
- `PROGRESS.md` se actualiza después de cada tarea.
