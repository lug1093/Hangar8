# Decisiones

Cada una: contexto, decisión, costo, qué revisar si sale mal.

## D-01. Formato tomado de las cadenas de chapa y pintura de Estados Unidos

**Contexto.** El pedido fue no diseñar "a gusto" sino copiar el formato de sitios
que ya funcionan en EE.UU. Referencias: Caliber Collision, Gerber Collision &
Glass, Crash Champions, Maaco y los talleres independientes que mejor posicionan en
búsquedas locales. El análisis sale del conocimiento de esos sitios, no de una
navegación en esta sesión (el entorno no tiene acceso web abierto): conviene que
alguien los mire y confirme que el patrón sigue vigente.

**El patrón que comparten**, y cómo quedó acá:

| Patrón en EE.UU. | Por qué funciona | En Hangar 8 |
|---|---|---|
| Header con teléfono visible y botón "Get an estimate" | La acción principal nunca está a más de un toque | Barra superior con dirección, horario y teléfono; botón "Pedir presupuesto" |
| Hero con promesa concreta + dos botones (estimate / call) | El que llega con el auto chocado quiere resolver ya | Hero con WhatsApp (rojo) y Llamar (contorno) |
| Tira de confianza bajo el hero ("We work with all insurance", "Lifetime warranty") | Responde la primera objeción antes de que aparezca | Seguros, retiro a domicilio, horario |
| Números ("5M+ repairs", "4.8★ rating") | Prueba social cuantificada | Tira de stats, con placeholders |
| "How it works" en 3 pasos | Baja la ansiedad de un trámite que la gente no conoce | Fotos → presupuesto y seguro → retiro y entrega |
| Sección de seguros ("We work with your insurance") | El choque casi siempre pasa por el seguro | Banda de seguros + slots de logos |
| Galería antes/después | Es la prueba de oficio | Galería con slots y link a Instagram |
| Reseñas con estrellas | Confianza de terceros | Reseñas, con placeholders |
| Página por servicio | SEO: cada servicio es una búsqueda distinta | `/servicios/<slug>` |
| Mapa, horario y dirección | SEO local y "¿me queda cerca?" | Sección Contacto con mapa embebido |
| Botón fijo "Call now" en el teléfono | Conversión en mobile | Barra fija con Llamar + WhatsApp |

**Adaptación local.** En EE.UU. la conversión es "Schedule / Get estimate online";
acá es WhatsApp con fotos. Todo el sitio empuja a WhatsApp.

**Qué se dejó afuera a propósito**: el buscador de sucursales (hay una sola), los
formularios largos de estimate y la "lifetime warranty" (no está confirmada: si el
taller ofrece una garantía, es de los mejores argumentos para sumar).

## D-02. Astro sin React ni shadcn

El playbook indica shadcn sobre Base UI para sitios institucionales "con poca
interacción". Acá no hay ninguna: la única pieza interactiva es el menú del
teléfono, resuelto con `<dialog>` nativo (foco atrapado, Escape y retorno del foco
sin reimplementarlos), y las preguntas frecuentes con `<details>`. Sumar React para
eso son decenas de KB por nada. **Costo**: si mañana aparece un formulario complejo,
se agrega una isla React con shadcn en ese momento, solo para eso.

## D-03. Títulos fuera de la escala de 5 tamaños

La voz visual del taller (flyer, Instagram) es tipografía condensada, enorme y en
mayúsculas. Los títulos usan Barlow Condensed 700 de 28 a 84px. El cuerpo respeta la
escala y los pesos del playbook. **Revisar** si los títulos empiezan a multiplicarse
en tamaños: hoy son cuatro (hero, sección, tarjeta, stat).

## D-04. Dominio provisorio `hangar8.com.ar`

Canonical, sitemap, `robots.txt` y `llms.txt` usan `https://hangar8.com.ar`. Si el
dominio final es otro, cambiarlo en `astro.config.mjs`, `public/robots.txt` y
`public/llms.txt`.

## D-05. Un solo idioma

El playbook dice "i18n desde el primer commit o nunca". Acá es **nunca**: taller de
barrio, público 100% local. Igual, todo el texto vive en `src/data/site.ts` o en las
secciones, sin claves.

## D-06. Placeholders visibles en vez de datos inventados

Se pidió mostrar cantidad de clientes, aseguradoras, reseñas. No hay datos reales
todavía. Publicar números o reseñas inventadas es engañoso y, para un taller, el
peor riesgo reputacional. Los bloques existen con `placeholder: true`, se ven con
una marca "Ejemplo", y `SHOW_PLACEHOLDERS = false` los apaga enteros. **Antes del
lanzamiento público**: reemplazar o apagar.

## D-07. Contenido de "qué incluye" por servicio

Las listas de cada servicio (frenos, tren delantero, granizo, ópticas...) son
razonables para un taller integral pero **no están confirmadas**. Validarlas con el
taller: una promesa de un servicio que no se hace genera consultas perdidas.

## D-08. Modo oscuro por sistema, sin selector

Se respeta `prefers-color-scheme`. La marca ya es oscura, así que el modo oscuro no
necesita otro tratamiento. Sin botón de tema: nadie lo busca en un sitio de taller.

## D-09. El chequeo levanta su propio servidor

`astro preview` en Astro 7 queda corriendo como demonio: la segunda corrida del
chequeo encontró el servidor viejo y habría medido contra un build anterior. El
script sirve `dist/` con un servidor propio en un puerto libre y lo baja al
terminar (playbook, sección 12, regla 4).

## D-10. Vista previa en GitHub Pages

Desde el entorno de desarrollo no se llega a Vercel, y hacía falta un link para ver
el sitio en el teléfono. El repo es público, así que `.github/workflows/preview.yml`
publica en `https://lug1093.github.io/Hangar8/`. Para eso el sitio acepta una base
(`ASTRO_BASE`) y todo link interno pasa por `src/lib/path.ts`. La vista previa lleva
`noindex` (`PUBLIC_PREVIEW`): tiene placeholders y no tiene que competir en Google
con el dominio real. **Al pasar a Vercel**, borrar el workflow o dejarlo solo para
ramas.

## D-11. URLs con barra final

Los links iban a `/servicios/sacabollo` y el canonical y el sitemap a
`/servicios/sacabollo/`. Para Google son dos URLs de la misma página y reparte la
señal entre las dos. Todo va con barra final (`trailingSlash: 'always'`), que es la
forma en que Astro genera los archivos (`carpeta/index.html`) y en que los sirven
Vercel y GitHub Pages sin redirecciones.

## D-12. Página de seguros

"Taller que trabaja con seguros" es una búsqueda con mucha intención y solo tenía
una sección en la portada. `/seguros/` explica el trámite con información general
de Argentina (denuncia del siniestro, franquicia, reclamo al seguro del otro auto)
sin prometer nada que dependa de una póliza puntual. **A confirmar con el taller**:
que coordina el reclamo al seguro del tercero, y que acompaña la inspección cuando
la compañía la pide. Si alguna de las dos no es así, se ajusta el texto en
`insurance` de `src/data/site.ts`.

## D-13. `llms.txt` y `robots.txt` generados

Ya no son archivos fijos en `public/`: se generan en el build desde
`src/data/site.ts` (`src/pages/llms.txt.ts`, `src/pages/robots.txt.ts`). El
`llms.txt` fijo repetía teléfono, dirección y servicios a mano, que es exactamente
como el NAP termina distinto entre la web y lo que leen los asistentes (regla 5).

## D-14. Imágenes para compartir, generadas y commiteadas

El link del sitio se va a mandar sobre todo por WhatsApp, y sin imagen de Open
Graph se ve como un link cualquiera. `npm run og` dibuja una imagen por página
(portada, seguros y cada servicio) con Chromium, las tipografías del sitio y los
datos de `src/data/site.ts`, y las deja en `public/og/`; también el
`apple-touch-icon.png`. Se commitean en vez de generarse en el build para no
depender de Chromium en el deploy. **Hay que volver a correrlo** si cambia el
teléfono, la dirección, un servicio o llega el logo real.

Para que la vista previa muestre la imagen, su build usa `ASTRO_SITE`
(`https://lug1093.github.io`): og:image tiene que ser una URL absoluta que exista.

## D-15. Fuentes precargadas y CSS adentro del HTML

La primera medición de Lighthouse dio 99 con CLS 0,071 en las páginas de servicio:
el texto aparecía con la fuente del sistema y saltaba al llegar Inter y Barlow
Condensed. Se precargan los dos archivos que usa la primera pantalla (subset
latin) y el CSS, que pesa 6,5 KB gzip, va adentro del HTML
(`inlineStylesheets: 'always'`), así la primera pantalla no espera un segundo
pedido. Resultado: CLS 0 y 100 en las cuatro categorías. Se sacó además el peso
600 de Barlow, que no usaba ningún componente. **Costo**: el CSS se repite en cada
página en vez de cachearse; con 7 páginas y 6,5 KB no vale la pena lo contrario.
