import type { APIRoute } from 'astro';

// La vista previa se deja rastrear para que Google vea su noindex (D-10): un
// Disallow le impediría leerlo y podría indexar las URLs igual, sin contenido.
export const GET: APIRoute = ({ site }) => {
  const preview = import.meta.env.PUBLIC_PREVIEW === 'true';
  const body = preview
    ? 'User-agent: *\nAllow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
