// Genera las imágenes que se ven al compartir un link (WhatsApp, Instagram,
// Facebook) y el ícono para la pantalla de inicio del teléfono. Salen de los
// mismos datos que la web y con sus tipografías. Correr después de cambiar un
// servicio, el teléfono o el logo:
//
//   npm run og
//
// Los colores repiten los tokens de src/styles/global.css porque la plantilla se
// dibuja fuera del sitio (misma excepción que el favicon, ver docs/DESIGN.md).
import { mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { business, services } from '../src/data/site.ts';

const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const font = (p) => `data:font/woff2;base64,${readFileSync(new URL(`../node_modules/${p}`, import.meta.url)).toString('base64')}`;
const display = font('@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff2');
const sans = font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');

const ink = '#0e0f11';
const ink2 = '#17191c';
const inkLine = '#2a2d32';
const onInk = '#f2f2f3';
const onInk2 = '#b4b5b8';
const accent = '#ff5c61';
const accentSolid = '#b3121a';

const badge = (size) => `
  <svg viewBox="0 0 48 40" width="${size}" height="${(size * 40) / 48}" aria-hidden="true">
    <path d="M12 2h24l10 18-10 18H12L2 20Z" fill="none" stroke="${accentSolid}" stroke-width="4" stroke-linejoin="round" />
    <path d="M10.5 22.5c3-3.8 7.8-6 13.8-6.2 4.6-.2 8.6 1.6 11.6 4.6l3.6.6c.8.2 1.3.8 1.3 1.6H9.5c0-.2.4-.4 1-.6Z" fill="${onInk}" />
    <g fill="${onInk}"><circle cx="18" cy="29" r="1.4" /><circle cx="24" cy="30.5" r="1.4" /><circle cx="30" cy="29" r="1.4" /></g>
  </svg>`;

const base = `
  @font-face { font-family: D; src: url(${display}); font-weight: 700; }
  @font-face { font-family: S; src: url(${sans}); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  body { background: ${ink}; color: ${onInk}; font-family: S, sans-serif; }
  .d { font-family: D, sans-serif; font-weight: 700; text-transform: uppercase; line-height: .92; letter-spacing: .01em; }
`;

const card = ({ eyebrow, title, facts }) => `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  .wrap { position: relative; width: 1200px; height: 630px; padding: 64px 72px; display: flex; flex-direction: column; overflow: hidden; }
  .hex { position: absolute; right: -150px; top: 50%; transform: translateY(-50%); opacity: .16; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand span { font-size: 44px; }
  .eyebrow { margin-top: auto; color: ${accent}; font-size: 24px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; }
  h1 { margin-top: 16px; font-size: 104px; max-width: 16ch; text-wrap: balance; }
  .facts { margin-top: 36px; display: flex; border: 1px solid ${inkLine}; border-radius: 12px; overflow: hidden; }
  .facts div { flex: 1; background: ${ink2}; padding: 18px 22px; font-size: 22px; color: ${onInk2}; }
  .facts div + div { border-left: 1px solid ${inkLine}; }
  .facts b { display: block; color: ${onInk}; font-weight: 500; }
</style></head><body><div class="wrap">
  <svg class="hex" viewBox="0 0 48 40" width="620" aria-hidden="true"><path d="M12 2h24l10 18-10 18H12L2 20Z" fill="none" stroke="${accent}" stroke-width="1.2" stroke-linejoin="round" /></svg>
  <div class="brand">${badge(64)}<span class="d">${business.name}</span></div>
  <p class="eyebrow">${eyebrow}</p>
  <h1 class="d">${title}</h1>
  <div class="facts">${facts.map(([k, v]) => `<div><b>${k}</b>${v}</div>`).join('')}</div>
</div></body></html>`;

const facts = [
  ['WhatsApp', business.phoneDisplay],
  [business.address.street, business.address.city],
  ['Seguros', 'Todas las compañías'],
];

const pages = [
  { file: 'inicio', eyebrow: `${business.tagline} en ${business.address.city}`, title: 'Chapa y pintura' },
  { file: 'seguros', eyebrow: 'Trabajamos con todas las compañías', title: 'Reparación por seguro' },
  ...services.map((s) => ({ file: s.slug, eyebrow: `Servicio en ${business.address.city}`, title: s.name })),
];

const icon = `<!doctype html><html><head><style>${base}
  body { width: 180px; height: 180px; display: grid; place-items: center; }
</style></head><body>${badge(128)}</body></html>`;

mkdirSync('public/og', { recursive: true });
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  await page.setContent(card({ ...p, facts }), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${p.file}.png` });
}
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(icon);
await page.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log(`✓ ${pages.length} imágenes en public/og/ y public/apple-touch-icon.png`);
