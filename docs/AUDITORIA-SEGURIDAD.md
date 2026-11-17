# Auditoría de seguridad (16/11/2026)

Receta: `lug1093/playbook`, `auditorias/seguridad.md`, más la pasada de "apps hechas con
IA". Sitio estático: sin base, sin login, sin formularios.

| Hallazgo | Riesgo | Arreglo |
|---|---|---|
| 6 avisos en dependencias (Astro, Vite, sharp, undici, zod) | Fallas del build y del servidor de desarrollo | `npm audit fix`. `npm audit --omit=dev`: 0 |
| Sin CSP ni HSTS; `X-Frame-Options: SAMEORIGIN` | Scripts de terceros, bajar a http | CSP en `vercel.json` (único tercero: el marco del mapa de Google), HSTS, `frame-ancestors 'none'`, `X-Frame-Options: DENY` |

Medido: `npm run check` (7 páginas, 5 anchos, 2 temas) y un navegador contra el build con
las cabeceras nuevas, 0 violaciones.

**Está bien y queda así**: todo el contenido sale de `src/data/site.ts`, los datos
estructurados son de ese archivo (no de una persona), sin analytics, sin cookies, sin
credenciales en el repo ni en la historia. El repo es público: nunca va un secreto acá.

## Paneles (lo hace Luk)

- [ ] **Vercel**: dos pasos en la cuenta; Deployment Protection en "Standard".
- [ ] **GitHub**: dos pasos, Dependabot alerts y security updates, Secret scanning con
  Push protection, la rama principal pide pull request.
- [ ] **Dominio**: dos pasos en el registrador y renovación automática.
- [ ] **Google Business Profile**: dos pasos en la cuenta de Google que lo maneja. Es lo
  más valioso que tiene el taller online.
