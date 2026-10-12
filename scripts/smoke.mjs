// Smoke test of behaviours that unit tests cannot see: search, seals, motion, fallback, mobile header.
import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const out = [];
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
const errs = []; p.on('pageerror', (e) => errs.push(e.message));
await p.goto('http://localhost:4321/people', { waitUntil: 'networkidle' });
await p.waitForFunction(() => !document.querySelector('astro-island[ssr]'));
await p.keyboard.press('/');
await p.waitForTimeout(300);
out.push('slash opens dialog: ' + await p.evaluate(() => document.querySelector('dialog.search')?.open));
if (!(await p.evaluate(() => document.querySelector('dialog.search')?.open))) await p.getByRole('button', { name: 'Search' }).click();
for (const q of ['Koudelka', 'nave', 'relic', 'Halley']) {
  await p.fill('#search-q', q); await p.waitForTimeout(900);
  out.push(`search "${q}": ` + (await p.locator('.search-hits li a').allTextContents()).join(' | '));
}
await p.screenshot({ path: '/tmp/search.png' });
await p.keyboard.press('Escape');
await p.goto('http://localhost:4321/people/koudelka-iasant', { waitUntil: 'networkidle' });
await p.click('details.cite summary');
out.push('cite: ' + await p.locator('[data-cite-text]').textContent());
const r = await p.goto('http://localhost:4321/f/002', { waitUntil: 'networkidle' });
out.push('f/002 → ' + p.url());
// reduced motion: no canvas goes live
const rm = await b.newPage({ reducedMotion: 'reduce', viewport: { width: 1280, height: 720 } });
await rm.goto('http://localhost:4321/', { waitUntil: 'networkidle' }); await rm.waitForTimeout(1500);
out.push('reduced-motion live canvas: ' + await rm.locator('canvas.world[data-live="true"]').count());
await rm.screenshot({ path: '/tmp/still-fallback.png' });
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:4321/world', { waitUntil: 'networkidle' });
out.push('mobile h-scroll: ' + await m.evaluate(() => document.documentElement.scrollWidth > innerWidth));
await m.screenshot({ path: '/tmp/m-world.png' });
console.log(out.join('\n')); console.log('errors', errs);
await b.close();
