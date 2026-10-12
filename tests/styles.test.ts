import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

function walk(dir: string, re: RegExp): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p, re) : re.test(p) ? [p] : [];
  });
}

// Classes that are hooks for scripts or semantic markers, not styling.
const HOOKS = new Set(['long', 'short', 'prose', 'world', 'bust-live', 'explorer', 'pic-wide']);

// Guards against silently losing a stylesheet block: every class used in markup must be styled somewhere.
describe('styles', () => {
  it('every class used in components exists in a stylesheet', () => {
    const scoped = walk('src', /\.astro$/).flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]));
    const css = [...walk('src/styles', /\.css$/).map((f) => readFileSync(f, 'utf8')), ...scoped].join('\n');
    const used = new Set<string>();
    for (const f of walk('src', /\.(astro|tsx)$/)) {
      for (const m of readFileSync(f, 'utf8').matchAll(/class="([^"{}]+)"/g)) m[1]!.split(/\s+/).forEach((c) => c && used.add(c));
    }
    const missing = [...used].filter((c) => !HOOKS.has(c) && !new RegExp(`\\.${c}(?![\\w-])`).test(css));
    expect(missing).toEqual([]);
  });
});
