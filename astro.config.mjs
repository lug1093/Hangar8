// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// El dominio definitivo todavía no está: ver DECISIONS.md (D-04).
// ASTRO_BASE solo se usa en la vista previa de GitHub Pages (D-10).
export default defineConfig({
  // ASTRO_SITE solo en la vista previa, para que las imágenes de Open Graph
  // apunten a una URL que existe (D-14).
  site: process.env.ASTRO_SITE ?? 'https://hangar8.com.ar',
  base: process.env.ASTRO_BASE ?? '/',
  // Links, canonical y sitemap con la misma forma: /servicios/sacabollo/ (D-11).
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
