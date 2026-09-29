// Qué Chromium usan los scripts, en este orden:
// 1. CHROMIUM_PATH, si está definida (así lo hace GitHub Actions).
// 2. El preinstalado del entorno remoto de Claude Code, si existe.
// 3. El que instala `npx playwright-core install chromium` (en una compu local).
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const remote = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

export const chromiumPath = process.env.CHROMIUM_PATH || (existsSync(remote) ? remote : chromium.executablePath());

if (!existsSync(chromiumPath)) {
  console.error(`No encuentro Chromium en ${chromiumPath}.\nInstalalo una vez con: npx playwright-core install chromium`);
  process.exit(1);
}
