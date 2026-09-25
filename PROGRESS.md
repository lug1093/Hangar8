# Progreso

## Fase actual: 1, sitio publicable con placeholders. Hecha.

- [x] Proyecto Astro 7 + Tailwind v4, tokens, fuentes self-hosted
- [x] Contenido centralizado en `src/data/site.ts`
- [x] Portada completa con todas las secciones de confianza
- [x] Cuatro páginas de servicio, 404
- [x] SEO técnico: metadatos, JSON-LD, sitemap, robots, llms.txt
- [x] Placeholders marcados y apagables (`src/config/flags.ts`)
- [x] `npm run check`: axe WCAG 2.2 AA, desborde a 320/390/768/1280, áreas táctiles, claro y oscuro, menú
- [x] Contrastes medidos en `docs/DESIGN.md`

## Datos pendientes del taller (fase 2)

Todo esto está en `src/data/site.ts`:

1. **Cantidad de autos reparados** y **años de oficio** (`stats`).
2. **Reseñas reales** (3 o más, con permiso) y **link al perfil de Google** (`reviews`, `googleReviewsHref`).
3. **Aseguradoras** con las que trabaja más seguido, y si se pueden nombrar (`insurers`).
4. **Fotos de trabajos**, idealmente antes y después (`gallery`, archivos en `public/trabajos/`).
5. **Logo en vector** (SVG o PDF). Hoy hay una insignia provisoria en `src/components/site/Logo.astro`.
6. **Confirmar qué incluye cada servicio** (`services[].includes`), ver D-07.
7. **Hasta dónde llega el retiro a domicilio** (`areas`).
8. **¿Tiene garantía el trabajo?** Si sí, va en la tira del hero.
9. **Dominio** (ver D-04).

## Próximas tres tareas

1. Cargar los datos de arriba a medida que lleguen.
2. Deploy en Vercel + dominio.
3. Imagen Open Graph (con logo real) para cuando se comparte el link por WhatsApp.

## Para la próxima sesión

- `npm run check` construye y chequea todo; capturas en `.checks/`.
- En este entorno Google está bloqueado: el mapa se ve vacío en las capturas, con
  la dirección como respaldo. En un navegador real carga.
- No usar `astro preview` para medir (D-09).
- Vista previa: https://lug1093.github.io/Hangar8/ (D-10). Todo link interno va con `path()` de `src/lib/path.ts`.
