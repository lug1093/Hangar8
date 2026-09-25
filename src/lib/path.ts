// Links internos relativos a la base del sitio. En producción la base es "/"; en la
// vista previa de GitHub Pages es "/Hangar8/" (ver astro.config.mjs).
export const path = (p: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${p}`;
