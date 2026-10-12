// Renders /og to public/og.png with the site's own fonts. Run against `astro preview` on :4321.
import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto('http://localhost:4321/og', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.locator('.og').screenshot({ path: 'public/og.png' });
await b.close();
console.log('wrote public/og.png');
