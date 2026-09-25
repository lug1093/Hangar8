// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// El dominio definitivo todavía no está: ver DECISIONS.md (D-04).
// ASTRO_BASE solo se usa en la vista previa de GitHub Pages (D-10).
export default defineConfig({
  site: 'https://hangar8.com.ar',
  base: process.env.ASTRO_BASE ?? '/',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
