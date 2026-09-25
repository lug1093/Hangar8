// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// El dominio definitivo todavía no está: ver DECISIONS.md (D-04).
export default defineConfig({
  site: 'https://hangar8.com.ar',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
