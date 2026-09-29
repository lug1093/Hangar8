// Mide con Lighthouse el build de producción, en celular y desktop, y escribe la
// tabla que va en docs/DESIGN.md. Levanta su propio servidor (scripts/serve.mjs).
//
//   npm run lighthouse
import { writeFileSync } from 'node:fs';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { serveDist } from './serve.mjs';

const pages = ['/', '/seguros/', '/servicios/chapa-y-pintura/'];
const chromePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const server = await serveDist();
const chrome = await launch({ chromePath, chromeFlags: ['--headless=new', '--no-sandbox'] });
const rows = [];
try {
  for (const path of pages) {
    for (const [label, config] of [['celular', undefined], ['desktop', desktopConfig]]) {
      const { lhr } = await lighthouse(server.base + path, { port: chrome.port, output: 'json', logLevel: 'error' }, config);
      const score = (id) => Math.round((lhr.categories[id]?.score ?? 0) * 100);
      const audit = (id) => lhr.audits[id].displayValue;
      rows.push(
        `| \`${path}\` | ${label} | ${score('performance')} | ${score('accessibility')} | ${score('best-practices')} | ${score('seo')} | ${audit('first-contentful-paint')} | ${audit('largest-contentful-paint')} | ${audit('cumulative-layout-shift')} | ${audit('total-blocking-time')} |`,
      );
    }
  }
} finally {
  await chrome.kill();
  server.close();
}

const table = [
  '| Página | Perfil | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | CLS | TBT |',
  '|---|---|---|---|---|---|---|---|---|---|',
  ...rows,
].join('\n');
writeFileSync('.checks/lighthouse.md', table + '\n');
console.log(table);
