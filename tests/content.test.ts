import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(mdx?|ya?ml|astro|tsx?)$/.test(p) ? [p] : [];
  });
}
const files = [...walk('content'), ...walk('src/pages'), ...walk('src/components')];

// Representation rules (PRD §10.4): the exonym never appears in the archive's own voice,
// and "traveller" is not used for Koudelka. Quotations would need an explicit allow-list here.
describe('content lint', () => {
  it('never uses the exonym in the archive’s voice', () => {
    const hits = files.filter((f) => /\bgyps(y|ies)\b/i.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
  it('does not call Koudelka a traveller', () => {
    const hits = files.filter((f) => /\btraveller\b/i.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
});
