// Fetches the cited reference images from the Internet Archive's copies (the wiki CDN blocks scripts).
// For each file it picks the largest archived size. Everything lands in public/evidence/ (isolated, removable).
import { writeFileSync } from 'node:fs';
const B = 'static.wikia.nocookie.net/shadowhearts/images';
const FILES = JSON.parse(process.argv[2]); // [[path, out], ...]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (u, tries = 3) => { for (let i = 0; i < tries; i++) { try { const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(60000) }); if (r.ok) return r; } catch {} await sleep(1500); } return null; };
for (const [path, out] of FILES) {
  const idx = await get(`http://web.archive.org/cdx/search/cdx?url=${B}/${path}&matchType=prefix&filter=statuscode:200&fl=timestamp,original,mimetype&limit=80`);
  const rows = idx ? (await idx.text()).trim().split('\n').filter(Boolean).map((l) => l.split(' ')) : [];
  // Rank: unscaled first, then the biggest scale-to-width.
  const rank = (u) => { const m = /scale-to-width-down\/(\d+)/.exec(u); return m ? Number(m[1]) : 99999; };
  const best = rows.filter((r) => r[2]?.startsWith('image/')).sort((a, b) => rank(b[1]) - rank(a[1]) || b[0].localeCompare(a[0]))[0];
  if (!best) { console.log('NONE', out); continue; }
  const img = await get(`https://web.archive.org/web/${best[0]}im_/${best[1]}`);
  const buf = img ? Buffer.from(await img.arrayBuffer()) : null;
  if (buf && buf.length > 1500 && !buf.subarray(0, 15).toString().includes('<')) { writeFileSync(out, buf); console.log('ok  ', out, buf.length, 'w=' + rank(best[1])); } else console.log('FAIL', out);
  await sleep(600);
}
