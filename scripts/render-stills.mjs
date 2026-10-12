// Renders the fallback stills from the SAME live scene (TASK-29), so still and 3D never diverge.
// Usage: npm run build && npx astro preview --port 4321 & node scripts/render-stills.mjs
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ executablePath: CHROME, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });

for (const [name, width, height] of [['hero-wide', 1280, 720], ['hero-tall', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.waitForSelector('canvas.world[data-live="true"]', { timeout: 15000 });
  // Hide every DOCUMENT/GLASS layer: the still is the WORLD alone.
  await page.addStyleTag({ content: 'body > *:not(main), .descent, .depth { visibility: hidden !important; } .world { visibility: visible !important; }' });
  await page.mouse.move(width / 2, height / 2); // neutral parallax
  await page.waitForTimeout(3500); // let the camera settle on the cliff
  const png = await page.locator('canvas.world').screenshot();
  // Downscale back to the internal 240-line buffer with nearest-neighbour: tiny file, same pixels.
  const internalW = Math.round((240 * width) / height);
  await sharp(png).resize(internalW, 240, { kernel: 'nearest' }).webp({ lossless: true }).toFile(`public/world/${name}.webp`);
  console.log('wrote', name, internalW + 'x240');
  await page.close();
}
await browser.close();
