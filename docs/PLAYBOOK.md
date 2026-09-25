# Playbook

Lo que aprendimos construyendo **Hold**, **Listas Dharma**, **colegio-torneos**,
**portfolio**, **giotech-portfolio** y **Kit Offline**, escrito una sola vez para
no volver a discutirlo.

Este documento no es teoría de UX. Cada regla de acá se pagó con un bug, una
prueba con gente real, una medición, o una sesión entera de idas y vueltas. Por eso
casi todas llevan su origen entre paréntesis: el origen es lo que evita que una
sesión futura la "mejore" sin saber qué estaba resolviendo.

---

## 0. Cómo se usa

1. Proyecto nuevo: copiar `plantilla/CLAUDE.md` a la raíz del repo y completar solo
   lo particular (qué es, para quién, stack elegido, reglas que no se negocian).
   Ese archivo referencia este playbook en vez de repetirlo.
2. Copiar `plantilla/PROMPT_INICIAL.md` y pegarlo en la primera sesión.
3. Escribir la especificación **antes** que el código. La mayoría de las idas y
   vueltas no son código malo: son especificación faltante que se descubre tarde.
4. Si un proyecto necesita romper una regla de acá, se escribe por qué en su
   `DECISIONS.md`. Romperla en silencio es el problema, no romperla.

**Regla de oro de este archivo**: si una decisión ya está acá, no se vuelve a
discutir en cada proyecto. Ese es todo el punto.

---

## 1. Los ocho principios

Si hay que tirar el resto del documento, esto queda.

1. **El caso de uso central se hace en un toque, siempre visible, sin confirmación.**
   Si registrar algo cuesta más que hacerlo, el producto falló. (Hold: el check-in.
   Dharma: ME ANOTO.)
2. **Un solo bloque de color sólido por pantalla**, y es la acción principal. Todo lo
   demás vive en grises, bordes finos y tipografía. (Hold)
3. **El color nunca es el único portador de información.** Estado = forma + peso
   tipográfico + palabra + color. Tiene que leerse en escala de grises. (WCAG 1.4.1,
   aplicado en los tres proyectos con estados)
4. **Todo estado se diseña, no solo el feliz.** Vacío, primera vez, uno, muchos,
   texto larguísimo, error, sin red.
5. **Nada se borra sin red.** Deshacer con restitución, o confirmación escribiendo el
   nombre. Nunca un "¿estás seguro?" pelado.
6. **Mobile primero de verdad**, con una versión que aproveche la compu en vez de
   mostrar una tarjeta de celular centrada en un monitor de 24".
7. **No agregar funcionalidad sin pedido explícito.** El valor de estas apps es que
   son simples. Casi todo lo que "ya que estamos" se agrega, después hay que sacarlo.
8. **Medir antes de afirmar.** Contrastes, bundle, Lighthouse, áreas táctiles. Un
   número medido vale más que una opinión sobre diseño.

---

## 2. Elegir el stack

La discusión de stack se resuelve mirando qué tipo de proyecto es. No hay que
reabrirla cada vez.

| Tipo de proyecto | Stack | De dónde sale |
|---|---|---|
| Sitio institucional o de marketing, con o sin blog | **Astro** + Tailwind v4 + islas React solo donde hay interacción real. Sitemap, rutas por idioma, deploy en Vercel | `portfolio` migró de SPA a Astro y ganó SEO por locale y rutas estáticas reales |
| App de grupo, sin login, estado compartido | **Next.js (App Router)** + Supabase (Postgres + Realtime) + Vercel | `dharma-fc` |
| App personal, local-first, tiene que andar sin red | **Vite + React + TypeScript strict** + Dexie (IndexedDB) + `vite-plugin-pwa` | `Hold` |
| Plataforma con panel de gestión y datos relacionales | **Next.js** + Prisma + Postgres (Neon) + shadcn/ui + tokens generados | `colegio-torneos` |
| Herramienta puntual sin backend, privacidad como argumento | HTML + JS vanilla + dependencias vendorizadas en el repo | `QR-code` (Kit Offline) |

### Dependencias permitidas por defecto

`tailwindcss` v4, `shadcn/ui` (copiado, no instalado), Radix UI o Base UI,
`lucide-react` como **único** set de iconos, `date-fns`, `sonner` para avisos,
`zod` + `react-hook-form` cuando los formularios son el producto, `next-themes` o
un toggle propio, `clsx` + `tailwind-merge`.

### Lo que no entra sin justificar

- Un cliente HTTP: `fetch` alcanza.
- Una librería de gráficos: el heatmap de 365 días de Hold son divs. Una tabla de
  posiciones es una tabla.
- Un framework de formularios pesado en un proyecto con tres formularios.
- Un segundo set de iconos.
- Fuentes externas por CDN cuando podés self-hostear con `next/font`.
- Analytics o telemetría en proyectos personales.

### Presupuesto antes que preferencia

Fijá el presupuesto de bundle en números y medilo antes de agregar cualquier cosa.
En Hold, `motion` pesaba 68 KB gzip y empujaba el bundle inicial a 223 KB contra un
techo de 200. Se reemplazó por una curva CSS con overshoot
(`cubic-bezier(0.34, 1.56, 0.64, 1)`) que a 18px de diámetro se lee igual que el
spring. Resultado final: 161 KB. La animación no se perdió; la dependencia sí.

---

## 3. Sistema visual

### Tokens, siempre

Los colores viven como CSS variables en un solo archivo. **Nunca un hex en un
componente.** Eso es lo que hace que rebrandear sea editar dos constantes en vez de
tocar treinta archivos.

Dos formas legítimas de armar la paleta:

- **Hay marca real** (escudo, logo, colores del club): generar la paleta completa
  desde dos colores semilla con `@material/material-color-utilities` (algoritmo HCT)
  a un archivo CSS generado. Así el rebrand es cambiar dos hex y correr un script.
  Si falta un rol que M3 no tiene (por ejemplo "success"), generalo por el mismo
  pipeline en vez de elegir un verde a mano: queda tonalmente consistente en claro y
  en oscuro. (`colegio-torneos`)
- **No hay marca**: dos acentos elegidos a mano, con los contrastes medidos y
  anotados en una tabla. Un acento por rama semántica y nada más. (Hold: `--accent`
  para construir, `--quit` para dejar. Dharma: celeste para PARTIDO, azul para ASADO,
  con `--accent` cambiando según la solapa activa, que resolvió una confusión real
  sobre en qué lista estabas parado.)

### Jerarquía sin agregar colores

Un solo color de texto por modo. La jerarquía se hace con **opacidad**: 100%
principal, 65% secundario, 40% deshabilitado. El 40% nunca lleva información.
Nunca negro puro ni blanco puro para texto de cuerpo.

Si te encontrás agregando un color para diferenciar dos cosas, probá antes con
tamaño, peso y espacio. Casi siempre alcanza.

### Tipografía

Escala de 5 tamaños y 2 pesos (400 y 500). Más que eso no se sostiene.

```
xs    12px / 16    metadatos
sm    14px / 20    secundario
base  16px / 24    cuerpo
lg    20px / 28    títulos de sección
xl    28px / 34    título de pantalla
```

**Nunca por debajo de 14px para texto que aporte información.** 12px solo para
metadatos genuinamente secundarios.

Para texto corrido, capá la medida en `ch` (60 a 75). Achicar la tipografía nunca es
la forma de ganar espacio; la forma es recortar el padding de sección.

### Espaciado, radios, elevación

- Escala base 4px. Solo múltiplos: 4, 8, 12, 16, 24, 32, 48.
- Un solo set de radios, sin variaciones: 12px tarjetas, 10px botones, 999px para lo
  circular.
- **Trampa cara**: adoptar una escala de forma externa (como la de M3) pisando las
  utilidades `rounded-lg` / `rounded-xl` que tus componentes ya usan. En
  `colegio-torneos` eso infló los radios 2 a 3 veces y toda la interfaz quedó
  burbujeante. Si adoptás una escala ajena, **agregá tokens nuevos, no pises los
  existentes**.
- Sombras: por defecto ninguna. Tarjeta plana con una línea fina. Se usa caja
  (borde + relleno + sombra) solo donde el límite hace trabajo real: un logo que
  necesita fondo blanco, o un slide dentro de un carrusel donde tenés que ver dónde
  termina una tarjeta. (`portfolio`, pasada de aplanado)

---

## 4. Accesibilidad

Objetivo fijo en todos los proyectos: **WCAG 2.2 nivel AA**. No es una fase
posterior; es parte de "terminado".

### La tabla de contrastes

Cada proyecto tiene en su `DESIGN.md` una tabla con los pares medidos, el ratio, el
mínimo y el criterio. Se reverifica ante cualquier cambio de color. Ejemplo del
formato (Dharma):

| Par | Ratio | Mínimo | Criterio |
|---|---|---|---|
| Nombres / fondo | 19.35:1 | 4.5 | 1.4.3 |
| Borde de control / fondo | 3.78:1 | 3.0 | 1.4.11 |

### Las dos trampas que ya nos comimos

**1. El acento levantado en modo oscuro.** Para que el acento se lea sobre fondo
oscuro se lo aclara, y ahí el texto blanco encima deja de pasar AA (en Hold:
blanco sobre `#4FA876` daba 2,9:1). La solución no es cambiar el texto a negro, que
falla igual: son **dos tokens distintos**. `--accent` para bordes, heatmap y detalles;
`--accent-solid` (el valor oscuro, idéntico en los dos modos) solo como fondo de
bloques con texto blanco. (Hold, decisión 10)

**2. Un solo token de borde para todo.** Un separador decorativo puede ser tenue.
El borde de un control que se toca tiene que mantener 3:1 por el criterio 1.4.11.
Son dos tokens (`--line` y `--edge` en Dharma) y **no son intercambiables**.

### Checklist, la misma en todos los proyectos

- [ ] Sin `user-scalable=no` ni `maximum-scale` en el viewport (1.4.4)
- [ ] Áreas táctiles: 44px es el objetivo, 38px el piso probado en producción, 24px
      el mínimo absoluto del criterio 2.5.8. El área puede ser mayor que el dibujo
      (el círculo de check-in de Hold se ve de 28px y se toca en 44)
- [ ] Foco visible de 2 a 3px con offset en **todo** lo interactivo. Nunca
      `outline: none` sin reemplazo (2.4.7)
- [ ] Diálogos: `aria-modal`, `aria-labelledby`, cierre con Escape, foco atrapado
      mientras están abiertos, foco devuelto al disparador al cerrar
- [ ] Solapas según el patrón del ARIA Authoring Practices Guide: `role="tablist"`,
      flechas, roving tabindex
- [ ] `aria-current` en el ítem de navegación activo, diferenciado con **peso y
      subrayado**, no solo con color
- [ ] Avisos con `role="status"` y `aria-live="polite"` (4.1.3)
- [ ] Iconos decorativos con `aria-hidden`; botones de icono con `aria-label`
- [ ] Contenido colapsado con `visibility: hidden` para que salga del orden de
      tabulación (no alcanza con `opacity: 0`)
- [ ] Skip link al contenido principal en sitios con navegación larga
- [ ] `prefers-reduced-motion` desactiva animaciones y scroll suave (2.3.3)
- [ ] `prefers-contrast: more` sube los tokens de contraste
- [ ] Ningún estado comunicado solo por color (1.4.1)
- [ ] axe-core sobre **cada estado y cada modo**, no sobre la portada

### La lección más cara de todas

**Lo automático no ve lo importante.** En `portfolio`, cuatro bugs de mobile
pasaron todos los chequeos automáticos de overflow y accesibilidad: el menú abierto
tapaba su propio botón de cerrar (z-index), la fecha del artículo se pegaba al
tiempo de lectura (faltaba el gap), los números de estadística se descentraban
cuando la etiqueta pasaba a dos líneas.

Aparecieron recién recorriendo **sección por sección, a 390px, en los dos temas y en
los dos idiomas**. Eso hay que hacerlo a mano, y hay que pedirlo explícitamente.

---

## 5. Design system y componentes

### Las cuatro capas

Un design system acá no es una librería ni un archivo de Figma. Son cuatro capas, y
cada una solo puede depender de la anterior:

1. **Tokens** (un archivo CSS): color, tipografía, espaciado, radios, sombras,
   duraciones. Nada por debajo escribe un hex ni un px suelto.
2. **Primitivas** (`components/ui/`): Button, Field, Input, Select, Dialog o Sheet,
   Tabs, Badge, Table. No saben nada del dominio. Se copian con shadcn y se editan,
   no se instalan.
3. **Componentes de dominio** (`components/<area>/`): `MatchRow`, `TeamAvatar`,
   `BracketView`, el círculo de check-in, la fila de una lista. Conocen el modelo de
   datos, componen primitivas, **no inventan estilo**.
4. **Pantallas**: componen las capas de arriba y no declaran más estilo que el
   layout.

El diagnóstico es simple: si una pantalla define un color, falta un token. Si define
un borde, un padding y una tipografía para una fila, falta un componente de dominio.

### La base se elige una vez, por tipo de proyecto

| Tipo de proyecto | Base |
|---|---|
| Plataforma con panel de gestión (formularios, tablas, diálogos, menús) | shadcn CLI sobre **Base UI**, `lucide-react`, `cva` + `tailwind-merge` |
| Sitio institucional con poca interacción | shadcn sobre **Base UI**, y solo los componentes que se usan de verdad |
| App de una sola pantalla con presupuesto de bundle ajustado | Primitivas propias en `components/ui/` con la misma forma que shadcn, `vaul` si hace falta un drawer. Sin librería de primitivas |

**Base UI, no Radix.** Desde julio de 2026 Base UI es la librería por defecto de
shadcn/ui: el equipo que construyó Radix es el que hoy construye Base UI, y shadcn
recreó todos sus componentes sobre ella. `colegio-torneos` ya está ahí (estilo
`base-nova`). Radix sigue funcionando y no hay que migrar nada que ande, pero un
proyecto nuevo arranca en Base UI. Si alguna vez hay que mover `portfolio`, existe la
skill `migrate-radix-to-base`.

### "¿No hay algo más completo?"

Es una pregunta con trampa, porque "más completo" son tres ejes distintos y solo uno
es un hueco real acá:

| Eje | Opción más completa | Veredicto |
|---|---|---|
| **Primitivas accesibles** | React Aria Components (Adobe) | Es más profundo en accesibilidad e interacción, y bastante más trabajo de estilado. No hace falta: con shadcn sobre Base UI ya llegamos a AA y lo medimos. Se justificaría solo con requisitos de accesibilidad por contrato |
| **Cantidad de componentes** | MUI, Ant Design, Mantine | Traen data grid, date range picker, editores. A cambio te encadenan a su sistema de estilos, rompen el enfoque de tokens que funcionó, pesan, y **perdés la propiedad del componente**: no podés hornear `min-h-44px` adentro. No |
| **Páginas y secciones ya armadas** | Bloques de registro | **Acá sí hay un hueco real**, y es donde se va el tiempo en un sitio institucional |

**Lo que conviene sumar es un registro de bloques, no una segunda librería de
componentes.** Un bloque es una sección completa (hero, precios, FAQ, login, panel)
escrita sobre las mismas primitivas que ya tenés: entra por el mismo CLI, queda en tu
repo y se edita como cualquier otro componente, así que no agrega un segundo sistema.

- Los bloques oficiales de shadcn, gratis, son el primer lugar donde mirar.
- `shadcnblocks` es la opción paga con mucho más volumen, y tiene salida para Astro,
  que es justo el stack de los sitios institucionales de acá.
- Origin UI pasó a llamarse COSS y también se movió a Base UI.

**daisyUI** es la única alternativa de fondo que tiene sentido considerar: no manda
JavaScript al navegador y el markup queda más limpio. El problema es que no da
primitivas con manejo de foco y teclado, que es la mitad de por qué usamos esto.
Mezclar las dos es peor que el problema que resuelve.

Regla: **un solo sistema de componentes por proyecto.** Un hueco de cobertura se tapa
con un bloque, con un componente propio, o con una librería especializada de una sola
cosa (`@tanstack/react-table` para tablas, como en `colegio-torneos`). Nunca con una
segunda librería de componentes.

### Lo que tenemos hoy, medido

Revisando los cuatro proyectos con interfaz, hay **cuatro bases distintas**:

| Proyecto | Base real | Primitivas |
|---|---|---|
| `colegio-torneos` | shadcn CLI (estilo `base-nova`) sobre **Base UI** + lucide + cva | 17 en `components/ui/`, más `components/public/` y `components/admin/` |
| `portfolio` | shadcn (estilo `new-york`) sobre **Radix**, en JSX | 5 |
| `Hold` | **Ninguna.** `components/ui/` escrito a mano, sheet sobre `vaul` con carga diferida | 5 |
| `dharma-fc` | **Ninguna.** Cero dependencias de UI | 4 |

Dos hallazgos concretos de esa revisión:

1. **El `CLAUDE.md` tiene que decir la verdad.** El de Hold declara "shadcn/ui, sobre
   Radix UI primitives" y el repo no tiene ni shadcn ni Radix: las primitivas están
   escritas a mano. Seguramente fue la decisión correcta (el techo de bundle era
   200 KB), pero no quedó en `DECISIONS.md`, así que la próxima sesión que lea el
   stack va a instalar Radix creyendo que completa algo que falta.
2. **`class-variance-authority` está instalado en Hold y en `portfolio`, y no se
   importa en ningún archivo de ninguno de los dos.** Peso y ruido sin uso. Revisar
   esto es parte del cierre de hito.

Cuatro bases distintas en cuatro proyectos no es un problema de consistencia dentro
de cada app, pero sí es el costo que se paga cada vez que se arranca uno nuevo: se
vuelve a elegir, se vuelve a configurar y se vuelven a descubrir los mismos detalles.
Por eso la tabla de arriba: **la base se elige una vez por tipo de proyecto y se
copia.**

### Sobre reimplementar el foco a mano

La regla es "no reimplementar manejo de foco", y tiene una excepción legítima: un
proyecto que decide no tener dependencias de UI. Dharma lo hizo bien y pasó axe sin
hallazgos: **una sola** hoja genérica con `aria-modal`, `aria-labelledby`, cierre con
Escape, foco atrapado mientras está abierta y devuelto al disparador al cerrar.

Entonces la regla precisa no es "usá Radix", es: **una sola implementación de foco en
todo el proyecto, auditada con axe.** Lo que falla es repetir el patrón por pantalla.

### Cuándo un componente se vuelve compartido

- **A la segunda repetición se mira, a la tercera se extrae.** Antes es abstracción
  prematura.
- **Antes de la tercera si para el usuario es la misma cosa.** Un partido en fixture,
  en resultados y en el detalle del equipo es el mismo objeto para quien lo mira: si
  se renderiza distinto en cada lado ya está roto, aunque haya solo dos usos.
- **Un solo componente entre el panel y la parte pública** cuando muestran lo mismo.
  `BracketView` vive en `components/public/` y lo usan las dos pantallas de
  `colegio-torneos`. Dos copias divergen en la primera corrección.
- Lo que se extrae es el **patrón visual completo**, no un pedacito: `MatchRow` junto
  con `TeamIdentity`, `MatchScore` y `MatchStatus`, con los estados derivados de una
  función pura (`lib/match-status.ts`). Eso es lo que hizo que tres pantallas dejaran
  de tener tres layouts distintos para lo mismo.

### La API de un componente

- **Variantes cerradas, nunca props de estilo abiertas.**
  `variant="primary" | "secondary" | "ghost"`, no `color="#2F7D53"`. Con `cva` si el
  proyecto ya la usa, o con un `Record<Variant, string>` (como el `Button` de Hold),
  que es lo mismo sin dependencia. Lo que importa es que el set sea cerrado y viva en
  un solo archivo.
- **Las reglas no negociables se hornean adentro.** El `Button` de Hold trae
  `min-h-[44px]` en su clase base: el área táctil no depende de que cada pantalla se
  acuerde.
- **El color entra por token, nunca por prop**: `bg-[var(--accent-solid)]`.
- `className` se acepta para layout (ancho, margen) y se fusiona con `tailwind-merge`.
  No para repintar.
- **Composición antes que banderas.** Cuando un componente junta cinco booleanos,
  hacen falta dos componentes.
- Más de 150 líneas: partir.

### Skills: el atajo que ya estamos usando a medias

`colegio-torneos` ya tiene el mecanismo de skills instalado: `skills-lock.json` en la
raíz, `.claude/skills/` y `.agents/skills/`, con las nueve skills de Prisma traídas
desde `prisma/skills`. Lo que falta es la de shadcn, que es la que más aplica al
trabajo de interfaz.

```bash
npx skills add shadcn-ui/ui -s shadcn     # la skill oficial de shadcn
npx skills add shadcn-ui/ui --list        # ver las dos que publica el repo
npx skills experimental_install           # restaurar desde skills-lock.json
```

El repo `shadcn-ui/ui` publica dos:

| Skill | Qué hace |
|---|---|
| `shadcn` | Contexto del proyecto y uso correcto del CLI: agregar, buscar, componer, depurar y estilar componentes |
| `migrate-radix-to-base` | Migra de Radix UI a Base UI, un componente o el proyecto entero |

**Qué aporta concretamente**, y por qué encaja con lo que ya decidimos acá:

- Lee `components.json` y `npx shadcn@latest info --json` antes de escribir nada, así
  que conoce el framework, los alias, los componentes ya instalados, el set de iconos
  y la librería de base. Eso es contexto que hoy la sesión deduce leyendo archivos, y
  deducir cuesta tokens.
- Obliga a **buscar en el registro antes de construir a mano**
  (`npx shadcn@latest search`), que es literalmente la regla de este playbook, pero
  automatizada.
- Obliga a **leer la doc real del componente** (`npx shadcn@latest docs button`) en
  vez de asumir la API. El bug del `Select` de Base UI que necesitaba el mapa `items`
  es exactamente la clase de error que esto evita.
- Previsualiza antes de pisar: `npx shadcn@latest add button --dry-run --diff`.

**La advertencia, que en nuestros repos pesa más que en otros**: los componentes de
`components/ui/` los editamos. El `Button` de Hold tiene `min-h-[44px]` horneado y los
colores por token propio. Un `add` sin `--dry-run --diff` pisa esas ediciones y se
lleva puesta una regla no negociable sin que salte ningún test. **Nunca actualizar una
primitiva ya editada sin ver el diff primero.**

La alternativa es el servidor MCP de shadcn (`npx shadcn@latest mcp`). Para nuestro
caso conviene la skill: se versiona en el repo con `skills-lock.json`, cualquier
sesión la restaura sola, y no hay que configurar nada por máquina.

Y `migrate-radix-to-base` es el camino concreto si alguna vez queremos unificar la
base, que hoy está partida: `portfolio` sobre Radix, `colegio-torneos` sobre Base UI.

### Detalles que ya nos costaron una sesión

- Base UI: el `Select` necesita un mapa `items` (valor a etiqueta) o muestra el valor
  crudo. En `colegio-torneos` **todos** los selects mostraban IDs hasta que se cableó.
- Base UI: pasar `nativeButton={false}` cuando el `Button` renderiza algo que no es un
  `<button>` (por ejemplo un `next/link` vía render prop).
- Tailwind: un `--font-sans` autorreferencial hace que toda la app caiga al serif por
  defecto del navegador, sin ningún error de build.

### Qué se construye a mano igual

Heatmap (divs), avatar de iniciales determinístico a partir del nombre, bracket de
playoffs, tablas. No traigas una librería para nada de esto.

### Qué no se abstrae

Una pantalla que se usa una vez. Un wrapper que solo renombra props. Un "sistema" de
espaciado que duplica lo que ya hace Tailwind. La abstracción que se paga es la que
evita que dos lugares se desincronicen, no la que junta código parecido.

### Reglas de forma

- **Lista compacta antes que tarjeta flotante por ítem.** Un contenedor con borde por
  grupo, filas separadas por líneas finas adentro, y una columna central de ancho fijo
  cuyo contenido cambia según el estado. Es el patrón de Sofascore, Flashscore y ESPN,
  y reemplazó a "una tarjeta grande redondeada por partido", que no se leía como
  interfaz cuidada.
- **Un botón dice la acción, nunca el estado.** Probado con gente en Dharma: el
  octágono que servía de número de posición y de estado de pago no lo descubría nadie
  (era el mismo dibujo que en la otra lista, donde no se toca) y comunicaba el estado
  solo con forma y color. Etiquetarlo `DEBE` / `PAGÓ` es peor: hay que tocar "DEBE"
  para decir que alguien pagó. La versión que funciona es un botón **MARCAR PAGO**
  que, una vez marcado, se reemplaza por **✓ pagó**, que también se toca para
  corregir.
- Drawer o sheet en mobile, diálogo en desktop. **Nunca diálogos anidados**, uno a la
  vez.
- Todo lo interactivo se ve interactivo. Sin gestos sin equivalente visible: nada de
  mantener presionado ni deslizar como única forma de llegar a algo.

### Checklist del design system

- [ ] Cero hex y cero px sueltos fuera del archivo de tokens
- [ ] Todo control interactivo sale de una primitiva de `components/ui/`
- [ ] Una sola implementación de diálogo u hoja en todo el proyecto, auditada
- [ ] Un solo set de iconos
- [ ] Las variantes de cada primitiva son un set cerrado y viven en un solo archivo
- [ ] Ningún componente de dominio duplicado entre el panel y la parte pública
- [ ] `package.json` sin dependencias de UI que no se importen
- [ ] El stack declarado en `CLAUDE.md` es el que está instalado\n- [ ] Ninguna primitiva editada fue pisada por un `add` sin `--dry-run --diff`

---

## 6. Layout y responsive

- **Ancho de contenido**: 480px para una app de teléfono. En compu, ensanchar la
  columna (Dharma: 1040px, sin bordes redondeados ni sombra de tarjeta) en vez de
  dejar una tarjeta de celular flotando en el medio. Dos columnas solo con un umbral
  propio y alto (1400px), y solo si el contenido lo justifica. **Nunca un layout
  distinto por feature**: mismos componentes, mismas acciones, mejor uso del espacio.
- **320px es el piso.** Ningún elemento se desborda. `overflow-x: hidden` y
  `overscroll-behavior-x: none` en **`html` y `body`**: solo en `body` no alcanza, un
  drawer fijo con transform deja arrastrar la página al costado en algunos
  navegadores (reportado en Chrome sobre Samsung S23+).
- **Tablas**: condensar columnas abajo de un breakpoint, misma tabla con los mismos
  datos, no otra pantalla. En Dharma entran cinco columnas en el teléfono y el
  desglose aparece arriba de 640px. Scroll horizontal, nunca.
- **Safe areas de iOS** con `env(safe-area-inset-*)`.
- **El teclado del celular**: en móvil la ventana no se achica cuando aparece el
  teclado, así que todo lo anclado abajo queda tapado. Se resuelve atando el
  contenedor a `window.visualViewport` y escuchando sus eventos `resize` y `scroll`.
  Esto hay que implementarlo sí o sí, no es un detalle.
- **Navegación mobile**: si los links de la barra desaparecen abajo de `md` sin
  alternativa, la navegación está rota. Sheet con hamburguesa en mobile, desktop
  intacto. Lo mismo con una sidebar de admin de ancho fijo.
- `scroll-margin-top` en los destinos de anclas cuando hay header fijo. Y si el sitio
  tiene más de una página, los links de sección tienen que apuntar a `/#seccion`, no
  solo hacer scroll suave (desde el blog no hacían nada).
- La acción principal de cada pantalla, en el tercio inferior, al alcance del pulgar.

### La cascada de CSS

Tres bugs de `portfolio` tuvieron la misma causa raíz: **una regla posterior con
igual especificidad ganándole en silencio a una anterior**. Padding que desaparece,
un media query que resetea el `padding-top` que despejaba el header fijo, un reset de
botón que rompe la alineación.

Regla: **el modificador siempre más específico que la base**
(`.project-card.projects-slider__slide`, `.section.section--top`). Y cuando el CSS
crece, vale la pena auditar explícitamente conflictos de igual especificidad en vez
de esperar a verlos.

---

## 7. Movimiento

El movimiento comunica causa y efecto. Si una animación no explica de dónde viene o
adónde va un elemento, no va.

- **Duraciones**: 120ms micro-interacciones, 200ms cambios de estado, 280ms entrada
  y salida de pantalla. Techo de 300ms.
- **Easing**: `cubic-bezier(0.32, 0.72, 0, 1)` para entradas y salidas.
  `cubic-bezier(0.34, 1.56, 0.64, 1)` cuando querés el rebote de "se llenó".
- `prefers-reduced-motion: reduce` se implementa **una vez con un hook** y se usa en
  todos lados. Todo cae a un fade de 100ms o desaparece.
- Sin stagger elaborado en listas de tres ítems. Y el stagger que exista tiene que
  cerrar rápido: en `portfolio` las métricas tardaban más de un segundo en aterrizar,
  se bajó la transición de 0.7s a 0.45s.
- `IntersectionObserver` con `rootMargin` negativo achica el área de detección y
  retrasa cada aparición hasta que el elemento ya está bien adentro de la pantalla.
  Margen positivo: la animación arranca justo antes de que entre.
- **Sin animaciones de espera cuando los datos son locales.** Ni skeletons ni
  spinners. Si algo tarda lo suficiente como para necesitar un spinner, el problema
  es de rendimiento. Con datos remotos, skeleton solo donde la forma es estable.

---

## 8. Texto, idioma y copy

- **i18n desde el primer commit o nunca.** Cero strings hardcodeados, todo por clave,
  claves en inglés (`today.emptyState.title`). Agregarlo después es una refactor
  completa; hacerlo desde el día uno no cuesta nada. Verificar paridad de claves entre
  idiomas como parte del cierre.
- **Español rioplatense con voseo** cuando el público es argentino. Nunca "tú", nunca
  "ustedes deben".
- **Sin jerga.** En Dharma la solapa "FIXTURE" pasó a llamarse "CAMPEONATO" porque
  fixture es jerga y la pestaña muestra las fechas y la tabla. Si algo necesita
  explicación, está mal diseñado.
- **El texto cambia el layout.** Ese mismo cambio (tres letras más) empujó la
  pastilla del nombre contra el borde a 320px: se veía "Co" donde antes entraba
  "Capi". Probá siempre con los strings más largos de cada idioma.
- **Errores en lenguaje humano**, con la acción de salida. Nunca un código, nunca
  "algo salió mal". Cuando una validación falla, decí qué falta: "Falta el título".
- **Estados vacíos**: cada uno explica qué va a aparecer ahí y ofrece la acción para
  llenarlo. Cero estados vacíos genéricos.
- **Onboarding que se hace, no que se lee.** En Dharma, seis carteles se
  reemplazaron por un recorrido de práctica sobre un asado de ejemplo: tres consignas
  que hay que ejecutar. En Hold, el onboarding termina con un registro real hecho, no
  con una promesa.
- **Honestidad en el copy institucional**: no sobreafirmar resultados, y no nombrar
  clientes ni productos de terceros sin permiso. Una métrica muy específica apunta al
  cliente tanto como el nombre.

---

## 9. Formularios y acciones

- Enter avanza, autofocus en el campo principal.
- `trim()` antes de validar. Un nombre con tres espacios no se guarda, y la app lo
  dice.
- **Destructivo reversible**: sacar a alguien saca al instante, sin confirmar, y
  ofrece DESHACER durante 6 segundos, **restituyendo en la posición original**, no al
  final de la lista. El orden importa (los primeros 11 son los titulares).
- **Destructivo definitivo**: confirmación escribiendo el nombre. Archivar es
  reversible; borrar del archivo no.
- **Escritura optimista**: la UI responde primero y la escritura va después. Si falla,
  se revierte con aviso. Feedback visual en menos de 100ms.
- **La condición de carrera que nadie ve**: tocar algo recién creado, mientras su fila
  todavía tiene id provisorio y el insert sigue en vuelo, hace desaparecer el cambio
  **en silencio**. Es el bug más caro de esta familia de apps y solo aparece si
  probás con la escritura demorada a propósito.
- Fecha como texto libre cuando siempre se escribe igual ("Sábado 18:00 hs"): un date
  picker en el celular es fricción pura. Pero lo que se ordena, filtra o importa sí
  es una fecha real. Las dos cosas pueden convivir en el mismo modelo, con nombres
  distintos.

---

## 10. Estados

Antes de dibujar, enumerá los estados visibles. En `colegio-torneos` son 9 para un
partido (programado, en juego, terminado, sin fecha, suspendido...), y todos se
derivan de campos que ya estaban en el esquema, sin migración.

Por cada pantalla: **vacío, primera vez, un ítem, muchos ítems, texto larguísimo,
error, sin red, sin permiso.**

Y preferí **una sola estructura cuyo contenido cambia** antes que un tratamiento
visual distinto por estado: la misma columna central muestra el resultado si se jugó,
la hora y la cancha si está programado, o "a definir" si no tiene fecha. Nada de una
pastilla de color grande por estado.

---

## 11. Datos y arquitectura

- **La lógica de negocio vive en funciones puras**, sin React y sin base de datos, en
  `domain/` o `lib/`, con tests. Si una regla de negocio termina dentro de un
  componente, está mal ubicada.
- **UUIDv7** para todos los IDs, nunca autoincremental. Rompe cualquier sync futuro.
- **Soft delete**: `deleted_at`, nunca borrado físico salvo la acción explícita.
- **`updated_at` en toda escritura**, sin excepción.
- **Timestamps en UTC + `tz_offset` en minutos.** La fecha local se calcula con la
  zona **actual** del dispositivo. Al detectar cambio de zona, no se reescribe el
  historial.
- **Campos de sincronización desde el día uno**, aunque el sync llegue en la fase 6.
  Agregarlos después es una migración en todas las tablas.
- **Migraciones inmutables**, aunque estén mal. Snapshot automático antes de migrar.
  Una migración por fase.
- **El orden del array es el orden visible**, cuando el orden significa algo.
- **Supabase**: RLS desde la primera tabla, y **los `grant` a `anon` también**: sin
  los grants, las policies no alcanzan y todo responde "permission denied" con el
  esquema aparentemente bien.
- **Sin login**: la identidad es un apodo guardado en el dispositivo y el control de
  acceso es que el link no se comparte. En vez de permisos, un registro de acciones.
- **Google OAuth no sirve si el canal de distribución es WhatsApp**: WhatsApp abre los
  links en su navegador embebido y Google bloquea OAuth ahí
  (`disallowed_useragent`). Descartado como obligatorio.
- **Realtime con respaldo**: si el canal no engancha, refetch cada 15 segundos
  mientras la pantalla esté visible. Y probá la app en el escenario "Realtime caído",
  porque es el que tiene que cubrir el respaldo.
- **Contenido institucional editable sin redeploy** (CMS-lite): markdown en la base,
  editable desde el panel, renderizado con `react-markdown` +
  `@tailwindcss/typography`, con un fallback hardcodeado por si no hay registro.
- **La URL es estado compartible**: temporada y disciplina son segmentos de ruta, no
  query params, para que cada edición sea un link que se manda e indexa. Y con eso,
  `generateMetadata` por ruta, sitemap con todas las ediciones, y `robots.txt` que
  bloquea el panel.
- **Datos de desarrollo que ejerciten todos los estados** (terminado, en curso,
  programado, borrador) y que **se nieguen a correr contra producción**.

---

## 12. Pruebas

Proporcionalidad primero: **el nivel de pruebas depende de quién usa la app.**

| Situación | Qué se prueba |
|---|---|
| Proyecto personal, un usuario | Solo lógica de dominio (Vitest). Sin tests de UI ni E2E |
| App que usa un grupo de gente | Casos de uso de punta a punta, bordes, carreras, pantallas |
| Sitio institucional | Build sin errores, recorrido visual a mano, axe, Lighthouse |

### El método que funcionó (Dharma, 212 comprobaciones)

Un backend falso en memoria que responde los mismos endpoints REST, asigna ids y
borra en cascada. Eso permite probar los casos de uso completos sin depender de la
nube y, sobre todo, **demorar o hacer fallar las escrituras a voluntad**, que es como
salieron a la luz las condiciones de carrera.

Seis archivos, cada uno con una pregunta distinta:

| Archivo | Qué mira |
|---|---|
| `casos-de-uso` | Cada caso de uso del SPEC, de punta a punta |
| `bordes` | Campos vacíos, textos larguísimos, listas vacías, muchos ítems |
| `carreras` | Red lenta, sin conexión, doble toque, cambios desde otro dispositivo |
| `pantallas` | Cinco tamaños, áreas táctiles medidas, axe sobre cada estado y modo |
| `recorrido` | El onboarding completo, incluso con la app vacía |
| `parseo` | Los importadores, sin navegador |

### Cuatro reglas

1. **La prueba tiene que morder.** Verificá que falla cuando rompés a propósito lo
   que mide. En Dharma, una comprobación de áreas táctiles no medía nada porque el
   control que le importaba ni se renderizaba en la base de prueba.
2. **Escribí lo que las pruebas no cubren**, en el README de las pruebas: los
   teléfonos reales, el teclado de iOS, el websocket, el SQL.
3. **`next build` typechequea lo que `tsx` no.** Un seed que corre bien con `tsx`
   puede tener un error de tipos que recién aparece en el build.
4. **La prueba tiene que correr contra lo que creés que está corriendo.** En
   `loquitos-web` un `next start` viejo se quedó con el puerto, el nuevo falló con
   `EADDRINUSE` en un log que nadie estaba mirando, y **dos rondas enteras de
   mediciones, Lighthouse incluido, salieron contra un build anterior**: mostraban
   bugs ya corregidos y escondían un 404 recién introducido. La forma de no volver a
   comérselo no es acordarse de bajar el servidor: es que **el runner levante el
   suyo, en un puerto libre, y lo baje al terminar**.

En el entorno remoto, Chromium ya está instalado y Playwright configurado: no correr
`playwright install`.

---

## 13. Rendimiento

Presupuesto explícito, medido, en una tabla del proyecto. El de Hold, como
referencia de qué se mide:

| Métrica | Objetivo | Medido |
|---|---|---|
| Bundle inicial (gzip) | < 200 KB | 161 KB |
| Lighthouse Performance | > 90 | 100 desktop / 97 mobile |
| Lighthouse Accesibilidad | AA | 100, sin fallas |
| Tap a feedback visual | < 100 ms | optimista |
| Time to interactive en 4G | < 2 s | 2,2 s bajo el preset mobile |

Cuando un número queda apenas afuera, se escribe por qué y cuál es el candidato a
recortar. Eso vale más que esconderlo.

Además: dimensiones explícitas en las imágenes (evita el salto de layout), fuentes
self-hosted, y nada de marquesinas auto-scrolleadas (duplican el DOM y sacan
elementos del foco: en `portfolio` se reemplazó por una grilla responsive de 7/4/3/2
columnas).

---

## 14. Antipatrones ya pagados

No proponer estas cosas. Ya se evaluaron y se descartaron con motivo.

| Antipatrón | Por qué no |
|---|---|
| Una tarjeta grande redondeada por ítem en una lista | No se lee como interfaz cuidada. Va lista compacta con filas divididas |
| Props de estilo abiertas en un componente (`color="#2F7D53"`) | Rompe el sistema de tokens en el primer uso. Variantes cerradas |
| Actualizar una primitiva ya editada sin `--dry-run --diff` | Pisa las reglas horneadas adentro (área táctil, tokens) sin que falle ningún test |
| Elegir la base de componentes de cero en cada proyecto | Hoy hay cuatro bases distintas en cuatro proyectos. Se elige una vez por tipo de proyecto |
| Sumar una segunda librería de componentes para tapar un hueco de cobertura | Se tapa con un bloque, un componente propio, o una librería especializada de una sola cosa |
| Dejar dependencias de UI instaladas sin usar | `cva` está instalada en Hold y en portfolio y no se importa en ninguno de los dos |
| Un botón que dice el estado en vez de la acción | Probado con gente: nadie descubre que se toca |
| Comunicar estado solo con forma y color | Falla 1.4.1 y falla en la práctica |
| Pisar las utilidades de radio de Tailwind con una escala externa | Infla los componentes existentes 2 a 3 veces |
| Pedir un permiso (notificaciones) antes de tener qué notificar | Si lo rechaza, el navegador no vuelve a preguntar y quemás el canal |
| Welcome screen antes del onboarding | El onboarding tiene que terminar con algo hecho, no con una promesa |
| Gamificación: XP, niveles, monedas, mascotas | Ninguno de estos productos lo necesita y todos lo piden "ya que estamos" |
| Castigo, rojo, rachas que se resetean con drama | Correlaciona con abandono de la app |
| Date picker para algo que siempre se escribe igual | Fricción pura en el teléfono |
| Login con Google como obligatorio, si el canal es WhatsApp | `disallowed_useragent` en el navegador embebido |
| Puntuar personas del 1 al 10 (nivel de juego) | Tóxico, y arrastra estadísticas y perfiles que nadie pidió |
| Bot de WhatsApp | La Cloud API no soporta grupos; las librerías no oficiales implican número dedicado, servidor 24/7 y riesgo de baneo |
| Google Sheets como interfaz | Fricción alta en el teléfono, media población no lo abre |
| Otra app que haya que instalar | Nadie se baja otra app. Link fijado en el grupo |
| Spinners y skeletons con datos locales | Si hace falta un spinner, el problema es de rendimiento |
| Analytics y telemetría en proyectos personales | No aportan nada y agregan peso y superficie |

---

## 15. Cómo trabajar con Claude Code

Esta sección es la que más tiempo y tokens ahorra.

### Los cuatro archivos

| Archivo | Qué contiene | Cuándo se escribe |
|---|---|---|
| `CLAUDE.md` | Las reglas de cómo escribir el código en **este** proyecto, y los antipatrones ya descartados | Antes de la primera línea |
| `SPEC.md` o `REQUIREMENTS.md` | Modelo de datos, casos de uso, reglas de negocio, roadmap por fases | Antes de la primera línea |
| `PROGRESS.md` | Fase actual, checklist de lo hecho, tarea en curso, próximas tres, y lo que la próxima sesión necesita saber | **Después de cada tarea**, no al final |
| `DECISIONS.md` | Cada decisión tomada sin poder preguntar: contexto, problema, decisión, costo, qué revisar si sale mal | Cuando aparece |

`PROGRESS.md` y `DECISIONS.md` son los que permiten cortar una sesión por límite de
tokens y retomar sin perder nada. Sin ellos, cada sesión nueva vuelve a leer el repo
entero y a redescubrir lo mismo.

### Prioridades de calidad, en orden

Si dos chocan, gana la de arriba. Esto evita discusiones enteras:

1. **Que funcione.** El caso de uso central antes que nada.
2. **Accesibilidad.** AA, área táctil, teclado, foco, reduced motion. No es "para
   después".
3. **Fidelidad a la especificación.** Los tokens, la doctrina y la lista de lo que no
   se implementa son reglas, no sugerencias.
4. **Calidad de interfaz.** Componentes bien usados, animaciones dentro del
   presupuesto, espaciado consistente.
5. **Tests.** Según la tabla de proporcionalidad.

### Modo autónomo

Trabajar de corrido, sin pedir aprobación entre tareas. Las **únicas** tres razones
para frenar:

1. Una contradicción real entre dos documentos del proyecto.
2. Una decisión de negocio que no está especificada en ningún lado y que cambia el
   comportamiento del producto.
3. Un bloqueo técnico que no se supera tras tres intentos con enfoques distintos.

En los tres casos: anotarlo en `DECISIONS.md`, tomar la opción más conservadora,
dejarlo detrás de un feature flag apagado si corresponde, y **seguir con la
siguiente tarea**. No parar el trabajo entero por un bloqueo puntual.

### Fases e hitos

- **Una fase, una entidad nueva como máximo.** Si una fase toca tres entidades, está
  mal cortada.
- Cada fase es un incremento usable, y tiene un **criterio de salida verificable**
  ("exportar en un navegador e importar en otro con el registro intacto"), no una
  lista de features.
- **No se avanza a la siguiente fase sin usar la anterior.** Hold frenó en la fase 3
  a propósito: los tiers por consistencia necesitan 30 días de historial real para
  significar algo, y construirlos antes es diseñar a ciegas.
- **Deployar vacío primero.** Repo, Vercel, "hola mundo". Deja el pipeline andando
  antes de que haya algo que romper: si falla, falla cuando no hay nada que debuggear.
- Lo que pertenece a una fase futura va detrás de un feature flag apagado en
  `config/flags.ts`, no en una rama larga.

### Commits

Chicos, uno por unidad de trabajo terminada, y el working tree nunca queda roto entre
commits. **El mensaje explica el porqué y la causa raíz, no el qué**: el diff ya dice
el qué. Los mejores mensajes del historial son los que dicen "los tres tenían la misma
causa raíz: una regla posterior con igual especificidad ganándole a una anterior".

### Economía de sesión

Lo que efectivamente baja el consumo y las idas y vueltas:

1. **Las reglas van en `CLAUDE.md`, no en el prompt de cada sesión.** Un prompt largo
   que se repite cada vez es la forma más cara de decir lo mismo.
2. **Escribí la especificación antes.** Casi todo el ida y vuelta es especificación
   faltante descubierta tarde, no código malo.
3. **Nombrá los archivos.** "Mirá `components/public/match-row.tsx`" cuesta una
   fracción de "revisá el proyecto".
4. **Pedí recorridos con criterio, no revisiones genéricas.** "Recorré sección por
   sección a 390px en los dos temas y los dos idiomas" encuentra cosas; "revisá todo"
   quema contexto y encuentra menos.
5. **Plan corto y confirmación antes de una tarea grande.** Después, autonomía. El
   costo de corregir un plan de diez líneas es mínimo comparado con corregir la
   implementación.
6. **Un prototipo HTML como fuente de verdad visual** cuando el diseño importa: es
   mucho más barato iterar ahí que en componentes. Regla de convivencia: cuando el
   prototipo y la app difieren, **mandan la app y el SPEC**, y la diferencia se anota.
7. **Cerrá cada sesión actualizando `PROGRESS.md`**, incluso si quedó a la mitad.
8. **Tareas verificables.** "Que la tabla no se corte a 320px" se comprueba; "mejorá
   el diseño" no, y termina en tres rondas de opiniones.
9. **Instalá las skills del stack al arrancar el proyecto**, no en la sesión veinte.
   Una skill es contexto que la sesión no tiene que reconstruir leyendo el repo. Hoy
   aplican la de shadcn (ver sección 5) y las de Prisma donde haya Prisma. Se
   commitea `skills-lock.json`.

---

## 16. Checklist de cierre de hito

Antes de dar algo por terminado:

**Funciona**
- [ ] El caso de uso central, de punta a punta, en un navegador real
- [ ] Los estados vacío, error y sin red se ven y dicen algo útil
- [ ] Sin errores en la consola

**Se ve**
- [ ] Recorrido sección por sección a 390px, en los dos temas y los dos idiomas
- [ ] 320px sin scroll horizontal
- [ ] Los strings más largos de cada idioma no rompen nada
- [ ] La versión de compu usa el espacio, no es una tarjeta de celular centrada

**Accesible**
- [ ] axe-core sobre cada estado y cada modo, cero hallazgos
- [ ] Tabla de contrastes actualizada y verificada
- [ ] Recorrido completo con teclado, foco siempre visible
- [ ] Áreas táctiles medidas, no estimadas
- [ ] Ningún estado comunicado solo por color

**Medido**
- [ ] Bundle dentro del presupuesto
- [ ] Lighthouse Performance y Accesibilidad
- [ ] Typecheck y build de producción limpios

**Documentado**
- [ ] `PROGRESS.md` al día
- [ ] Decisiones tomadas sin preguntar, en `DECISIONS.md`
- [ ] Lo que quedó sin probar, escrito explícitamente

---

## 17. De dónde salió cada cosa

Si una regla parece arbitraria, el contexto completo está en estos archivos.

| Proyecto | Qué mirar |
|---|---|
| `Hold` | `CLAUDE.md` (sistema visual y doctrina de producto), `REQUIREMENTS.md` (modelo de dominio y no funcionales), `DECISIONS.md` (las diez decisiones autónomas), `docs/PROMPT_CLAUDE_CODE.md` |
| `dharma-fc` | `docs/DESIGN.md` (tokens y contrastes medidos), `docs/SPEC.md` (casos de uso), `docs/BACKLOG.md` (orden de construcción), `pruebas/README.md` (el método de pruebas) |
| `colegio-torneos` | Los mensajes de commit: la adopción de M3, la regresión de radios, el rediseño de filas de partido, la convención de ganó/empató/perdió |
| `portfolio` | Los mensajes de commit: la auditoría de cascada, los cuatro bugs de mobile, la pasada de densidad y accesibilidad |
| `QR-code` | El README: cómo se explica un producto por su arquitectura ("cortá internet y probá") en vez de por una promesa |
