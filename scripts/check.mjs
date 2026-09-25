// Chequeo de cierre para un sitio institucional (playbook, sección 12):
// levanta su propio preview en un puerto libre, recorre cada página en varios
// anchos y en los dos temas, corre axe, mide desborde horizontal y áreas táctiles,
// guarda capturas en .checks/ y baja el servidor al terminar.
import { mkdirSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/servicios/chapa-y-pintura', '/servicios/sacabollo', '/404'];
const widths = [320, 390, 768, 1024, 1280];
const schemes = ['light', 'dark'];
const executablePath = process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

// Servidor estático propio sobre dist/, en un puerto libre. No se usa
// `astro preview`: en Astro 7 queda corriendo como demonio y una segunda corrida
// mide contra el build anterior sin avisar (playbook, sección 12, regla 4).
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const candidates = [url, `${url}.html`, join(url, 'index.html')];
  for (const c of candidates) {
    const file = join('dist', normalize(c));
    try {
      if ((await stat(file)).isFile()) {
        res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
        return res.end(await readFile(file));
      }
    } catch {}
  }
  res.writeHead(404, { 'content-type': types['.html'] });
  res.end(await readFile('dist/404.html'));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

mkdirSync('.checks', { recursive: true });
const browser = await chromium.launch({ executablePath });
const problems = [];

try {
  for (const scheme of schemes) {
    for (const width of widths) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
      const page = await ctx.newPage();
      page.on('console', (m) => m.type() === 'error' && problems.push(`${scheme} ${width} consola: ${m.text()}`));
      for (const path of pages) {
        await page.goto(base + path, { waitUntil: 'networkidle' });
        const tag = `${scheme} ${width}px ${path}`;

        const overflow = await page.evaluate(() => {
          const w = document.documentElement.clientWidth;
          return [...document.querySelectorAll('body *')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              const s = getComputedStyle(el);
              return r.width > 0 && r.right > w + 1 && s.position !== 'fixed' && !el.closest('[aria-hidden="true"], svg, dialog');
            })
            .slice(0, 3)
            .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
        });
        if (overflow.length) problems.push(`${tag} desborda: ${overflow.join(', ')}`);

        const small = await page.evaluate(() =>
          [...document.querySelectorAll('a, button, summary')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden' && (r.height < 24 || r.width < 24) && !el.closest('p, blockquote, dd') && !el.classList.contains('sr-only');
            })
            .map((el) => `"${el.textContent.trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().height)}px`),
        );
        if (small.length) problems.push(`${tag} áreas < 24px: ${small.join('; ')}`);

        // Alineación: en cada grilla marcada con data-align-group, las celdas de una
        // misma fila tienen que tener sus marcas data-align="top|bottom" a la misma altura.
        const misaligned = await page.evaluate(() => {
          const out = [];
          for (const group of document.querySelectorAll('[data-align-group]')) {
            const rows = new Map();
            for (const cell of group.children) {
              const r = cell.getBoundingClientRect();
              if (!r.width) continue;
              const key = Math.round(r.top);
              if (!rows.has(key)) rows.set(key, []);
              rows.get(key).push(cell);
            }
            for (const cells of rows.values()) {
              if (cells.length < 2) continue;
              for (const mode of ['top', 'bottom']) {
                const marks = cells.map((c) => c.querySelector(`[data-align="${mode}"]`)).filter(Boolean);
                if (marks.length < 2) continue;
                const ys = marks.map((m) => m.getBoundingClientRect()[mode]);
                if (Math.max(...ys) - Math.min(...ys) > 1) out.push(`${group.dataset.alignGroup} (${mode}, ${Math.round(Math.max(...ys) - Math.min(...ys))}px)`);
              }
            }
          }
          return [...new Set(out)];
        });
        if (misaligned.length) problems.push(`${tag} desalineado: ${misaligned.join(', ')}`);

        if (width === 390 || width === 1280) {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).exclude('iframe').analyze();
          for (const v of axe.violations) problems.push(`${tag} axe ${v.id}: ${v.nodes.length} nodos · ${v.nodes[0]?.target}`);
          const file = `.checks/${scheme}-${width}${path.replaceAll('/', '_') || '_'}.png`;
          await page.screenshot({ path: file, fullPage: true });
        }
      }

      if (width === 390) {
        await page.goto(base + '/', { waitUntil: 'networkidle' });
        await page.click('[data-menu-open]');
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).exclude('iframe').analyze();
        for (const v of axe.violations) problems.push(`${scheme} menú abierto axe ${v.id}`);
        await page.screenshot({ path: `.checks/${scheme}-390-menu.png` });
        await page.keyboard.press('Escape');
        const focused = await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-open'));
        if (!focused) problems.push(`${scheme} el foco no vuelve al botón de menú`);
      }
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

if (problems.length) {
  console.log(`✗ ${problems.length} problemas\n` + problems.map((p) => '  · ' + p).join('\n'));
  process.exit(1);
}
console.log(`✓ ${pages.length} páginas × ${widths.length} anchos × ${schemes.length} temas sin problemas`);
