# Progreso

## Fase actual: 1, sitio publicable con placeholders. Hecha.

Todo lo que se puede hacer sin datos del taller está hecho. **Lo que sigue depende
de los datos (fase 2) y de las cuentas (dominio, Vercel, Google).**

- [x] Proyecto Astro 7 + Tailwind v4, tokens, fuentes self-hosted
- [x] Contenido centralizado en `src/data/site.ts`
- [x] Portada completa con todas las secciones de confianza
- [x] Cuatro páginas de servicio, página de seguros (D-12), 404
- [x] SEO técnico: metadatos, JSON-LD, sitemap, URLs con barra final (D-11)
- [x] `llms.txt` y `robots.txt` generados desde los datos (D-13)
- [x] Imágenes para compartir por página y ícono del teléfono (`npm run og`, D-14)
- [x] Placeholders marcados y apagables (`src/config/flags.ts`)
- [x] Galería lista para fotos: se optimizan solas a AVIF y WebP (`src/assets/trabajos/`)
- [x] `npm run check`: axe WCAG 2.2 AA, desborde, áreas táctiles, alineación, imágenes para compartir; 7 páginas × 5 anchos × 2 temas
- [x] El chequeo corre en GitHub en cada push y bloquea la publicación si falla (D-16)
- [x] Lighthouse: 100 en las cuatro categorías, celular y desktop, CLS 0 (`npm run lighthouse`, D-15)
- [x] Contrastes medidos en `docs/DESIGN.md`
- [x] Revisión de alineación y espacios (ver `docs/DESIGN.md`)
- [x] `vercel.json` listo para el deploy definitivo
- [x] Speed Insights descartado; Web Analytics queda como opción cuando se pida (D-17)
- [x] Guías: `docs/PARA_EL_TALLER.md` (qué pedir y cómo) y `docs/PUBLICAR.md` (dominio, Vercel, Google)

## Datos pendientes del taller (fase 2)

El detalle de cómo pedirlos está en `docs/PARA_EL_TALLER.md`, y dónde va cada uno,
en su tabla final.

1. **Fotos de trabajos**, idealmente antes y después.
2. **Reseñas reales** (3 o más, con permiso) y **link al perfil de Google**.
3. **Cantidad de autos reparados** y **años de oficio**.
4. **Aseguradoras** que se pueden nombrar.
5. **Logo original** en buena calidad.
6. **Confirmar qué incluye cada servicio** (D-07) y **el texto de seguros** (D-12).
7. **Hasta dónde llega el retiro a domicilio**.
8. **Garantía del trabajo**, si la hay.

## Pendiente de cuentas (ver `docs/PUBLICAR.md`)

1. Dominio en nic.ar (D-04).
2. Proyecto en Vercel conectado al repo.
3. Google Business Profile verificado y Search Console con el sitemap.
4. Link a la web en Instagram y TikTok.

## Próximas tres tareas

1. Cargar los datos de arriba a medida que lleguen, y volver a medir con
   `npm run lighthouse` cuando entren las fotos.
2. Con el logo real: reemplazar la insignia en `Logo.astro` y en `scripts/og.mjs`,
   y correr `npm run og`.
3. Con el dominio: cambiar `site` en `astro.config.mjs` si no es `hangar8.com.ar`,
   y apagar la vista previa (`docs/PUBLICAR.md`, "Después de publicar").

## Para la próxima sesión

- `npm run check` construye y chequea todo; capturas en `.checks/`.
- `npm run lighthouse` mide y deja la tabla en `.checks/lighthouse.md` para pegar en `docs/DESIGN.md`.
- `npm run og` regenera las imágenes para compartir.
- En una compu local: `npx playwright-core install chromium` una vez; los scripts lo encuentran solos (`scripts/chromium.mjs`).
- En el entorno remoto Google y github.io están bloqueados: el mapa se ve vacío en las
  capturas (con la dirección como respaldo) y la vista previa no se puede abrir
  desde acá. En un navegador real andan.
- No usar `astro preview` para medir (D-09): los scripts usan `scripts/serve.mjs`.
- Vista previa: https://lug1093.github.io/Hangar8/ (D-10). Todo link interno va con `path()` de `src/lib/path.ts`.
