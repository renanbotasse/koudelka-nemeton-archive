import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

// A malformed data file only produces a warning in the Astro build, so pages silently lose their content.
// This makes it a hard failure.
describe('content data files', () => {
  for (const f of readdirSync('content').filter((x) => x.endsWith('.yaml'))) {
    it(`${f} parses and every entry has an id`, () => {
      const rows = parse(readFileSync(`content/${f}`, 'utf8')) as Array<{ id?: string }>;
      expect(Array.isArray(rows)).toBe(true);
      expect(rows.every((r) => typeof r.id === 'string' && r.id.length > 0)).toBe(true);
      expect(new Set(rows.map((r) => r.id)).size).toBe(rows.length);
    });
  }
  it('every source cited by an area exists', () => {
    const ids = new Set((parse(readFileSync('content/sources.yaml', 'utf8')) as Array<{ id: string }>).map((s) => s.id));
    const areas = parse(readFileSync('content/places.yaml', 'utf8')) as Array<{ id: string; sources: string[] }>;
    for (const a of areas) for (const s of a.sources) expect(ids.has(s), `${a.id} cites unknown ${s}`).toBe(true);
  });
});
