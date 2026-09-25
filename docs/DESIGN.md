# Diseño: Hangar 8

Tokens en `src/styles/global.css`. Nunca un hex fuera de ese archivo (el favicon
SVG es la única excepción, porque no puede leer variables CSS).

## Marca

Sale del material que el taller ya usa en Instagram: negro, rojo y blanco, tipografía
condensada en mayúsculas, insignia hexagonal con un auto y tres estrellas.

| Rol | Token | Claro | Oscuro |
|---|---|---|---|
| Fondo | `--bg` | `#ffffff` | `#0e0f11` |
| Superficie | `--surface` | `#f4f4f5` | `#17191c` |
| Texto | `--text` | `#16171a` | `#f2f2f3` |
| Texto secundario | `--text-2` | texto al 68% | texto al 68% |
| Separador decorativo | `--line` | `#e4e4e7` | `#26292e` |
| Borde de control | `--edge` | `#82868d` | `#6f747c` |
| Acento (texto, iconos) | `--accent` | `#b3121a` | `#ff5c61` |
| Relleno con texto blanco | `--accent-solid` | `#b3121a` | `#b3121a` |
| Banda de marca | `--ink` / `--ink-2` | `#0e0f11` / `#17191c` | `#07080a` / `#111316` |

`--accent` y `--accent-solid` son dos tokens a propósito (playbook, sección 4,
trampa 1): el rojo claro que se lee sobre negro no aguanta texto blanco encima.

## Contrastes medidos

| Par | Ratio | Mínimo | Criterio |
|---|---|---|---|
| Claro: texto / fondo | 17.92:1 | 4.5 | 1.4.3 |
| Claro: texto secundario / fondo | 6.18:1 | 4.5 | 1.4.3 |
| Claro: texto secundario / superficie | 5.91:1 | 4.5 | 1.4.3 |
| Claro: acento / fondo | 6.96:1 | 4.5 | 1.4.3 |
| Claro: acento / superficie | 6.33:1 | 4.5 | 1.4.3 |
| Claro: borde de control / fondo | 3.66:1 | 3.0 | 1.4.11 |
| Blanco / `--accent-solid` | 6.96:1 | 4.5 | 1.4.3 |
| Blanco / `--accent-solid-hover` | 9.37:1 | 4.5 | 1.4.3 |
| Oscuro: texto / fondo | 17.14:1 | 4.5 | 1.4.3 |
| Oscuro: texto secundario / fondo | 8.17:1 | 4.5 | 1.4.3 |
| Oscuro: texto secundario / superficie | 7.84:1 | 4.5 | 1.4.3 |
| Oscuro: acento / fondo | 6.35:1 | 4.5 | 1.4.3 |
| Oscuro: borde de control / fondo | 4.08:1 | 3.0 | 1.4.11 |
| Banda: texto 72% / `--ink` | 9.06:1 | 4.5 | 1.4.3 |
| Banda: texto 72% / `--ink-2` | 8.60:1 | 4.5 | 1.4.3 |
| Banda: acento / `--ink-2` | 5.83:1 | 4.5 | 1.4.3 |

Además, axe (WCAG 2.2 AA) corre sobre cada página, en claro y oscuro, a 390 y
1280px, y con el menú abierto: `npm run check`.

## Tipografía

- Cuerpo: Inter Variable, 400 y 500, escala del playbook.
- Títulos: Barlow Condensed 700 en mayúsculas (clase `.display`). Se aparta de la
  escala de 5 tamaños del playbook: ver `DECISIONS.md`, D-03.

## Reglas de forma

- Un solo bloque rojo sólido por pantalla: el botón de WhatsApp. El del header es de
  contorno, y la barra fija del teléfono aparece recién cuando el botón del hero sale
  de la pantalla.
- Grillas (servicios, pasos, reseñas, stats) como un solo contenedor con celdas
  divididas por líneas de 1px, no tarjetas flotantes.
- Radios: 12px tarjetas, 10px botones. Sin sombras.

## Ritmo vertical

Un solo juego de espacios, en la escala de 4px:

| Qué | Celular | Desktop |
|---|---|---|
| Sección (`Section`) | 48px arriba y abajo | 64px desde `lg` |
| Hero | 40px | 64px arriba, 48px abajo |
| Título de sección a contenido | 24px | 32px |
| Título al lado del contenido (dos columnas) | sin margen (`flush`), el espacio lo da el `gap` | |
| Columnas | `gap` 32px | 48px |

## Alineación

- En cada grilla, los números, títulos y links de la misma fila van a la misma
  altura aunque el texto de al lado ocupe una o dos líneas. En las stats el número
  va primero con `order-first` (antes estaba abajo en el orden del documento con
  `flex-col-reverse`, y se desfasaba según el largo de la etiqueta).
- Las grillas marcadas con `data-align-group` se verifican en `npm run check`:
  las marcas `data-align="top"` o `"bottom"` de una misma fila no pueden diferir en
  más de 1px, en 320, 390, 768, 1024 y 1280px.
- Los títulos grandes usan `text-wrap: balance` para no dejar una palabra sola.
- Servicios en 4 columnas recién desde 1280px: en 1024 "Mecánica integral" ocupaba
  dos líneas y desfasaba las descripciones.
