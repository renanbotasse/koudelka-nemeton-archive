// Pre-renders each character bust to public/world/busts/<slug>.webp (lossless, 160×200).
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
const SLUGS = ['koudelka-iasant', 'edward-plunkett', 'james-oflaherty', 'roger-bacon', 'the-caretakers', 'charlotte', 'elaine', 'alias'];
mkdirSync('public/world/busts', { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 160, height: 200 } });
for (const s of SLUGS) {
  await p.goto(`http://localhost:4321/bust/${s}`, { waitUntil: 'networkidle' });
  await p.waitForSelector('body[data-ready]');
  await p.waitForTimeout(400);
  await p.locator('#c').screenshot({ path: `public/world/busts/${s}.png` });
  console.log('bust', s);
}
await b.close();
