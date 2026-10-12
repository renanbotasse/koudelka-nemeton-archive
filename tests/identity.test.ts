import { describe, expect, it } from 'vitest';
import stylelint from 'stylelint';

// The identity is enforced by tooling: a rounded corner or a raw hex in a component must fail the build.
describe('identity guard (Stylelint)', () => {
  it('rejects border-radius and raw hex colours', async () => {
    const res = await stylelint.lint({ files: 'tests/fixtures/bad.css' });
    const rules = res.results[0]!.warnings.map((w) => w.rule);
    expect(res.errored).toBe(true);
    expect(rules).toContain('color-no-hex');
    expect(rules).toContain('declaration-property-value-allowed-list');
  });
  it('accepts the real stylesheets', async () => {
    const res = await stylelint.lint({ files: ['src/**/*.css', 'src/**/*.astro'] });
    expect(res.results.flatMap((r) => r.warnings)).toEqual([]);
  });
});
