// Servidor estático propio sobre dist/, en un puerto libre, para los chequeos.
// No se usa `astro preview`: en Astro 7 queda corriendo como demonio y una segunda
// corrida mide contra el build anterior sin avisar (playbook, sección 12, regla 4).
// Comprime y cachea como lo hace Vercel, para que Lighthouse mida algo parecido a
// producción.
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};
const compressible = new Set(['.html', '.css', '.js', '.svg', '.xml', '.txt']);

export async function serveDist(dir = 'dist') {
  const send = async (req, res, file, status) => {
    const ext = extname(file);
    let body = await readFile(file);
    const headers = {
      'content-type': types[ext] ?? 'application/octet-stream',
      'cache-control': file.includes('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
    };
    if (compressible.has(ext) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
      body = gzipSync(body);
      headers['content-encoding'] = 'gzip';
    }
    res.writeHead(status, headers);
    res.end(body);
  };
  const server = createServer(async (req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    for (const c of [url, `${url}.html`, join(url, 'index.html')]) {
      const file = join(dir, normalize(c));
      try {
        if ((await stat(file)).isFile()) return send(req, res, file, 200);
      } catch {}
    }
    return send(req, res, join(dir, '404.html'), 404);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}
