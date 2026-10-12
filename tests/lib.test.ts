import { describe, expect, it } from 'vitest';
import { pickTier } from '../src/lib/capabilities';
import { parseRefCode, refCode } from '../src/lib/refcode';
import { canShow, safeForMetadata } from '../src/lib/spoilers';

const base = { webgl2: true, reducedMotion: false, motionOff: false, saveData: false, width: 1440, cores: 8 };

describe('pickTier', () => {
  it('full on a capable desktop', () => expect(pickTier(base)).toBe('full'));
  it('still without webgl2', () => expect(pickTier({ ...base, webgl2: false })).toBe('still'));
  it('still with reduced motion', () => expect(pickTier({ ...base, reducedMotion: true })).toBe('still'));
  it('still when MOTION is off', () => expect(pickTier({ ...base, motionOff: true })).toBe('still'));
  it('still with save-data', () => expect(pickTier({ ...base, saveData: true })).toBe('still'));
  it('lite on narrow screens', () => expect(pickTier({ ...base, width: 390 })).toBe('lite'));
  it('lite on few cores', () => expect(pickTier({ ...base, cores: 2 })).toBe('lite'));
});

describe('refcode', () => {
  it('round-trips', () => {
    expect(refCode('B', 2, 3)).toBe('NA·B·002·iii');
    expect(parseRefCode('NA·B·002·iii')).toEqual({ series: 'B', file: 2, item: 3 });
    expect(parseRefCode(refCode('E', 14))).toEqual({ series: 'E', file: 14 });
  });
  it('rejects bad input', () => {
    expect(parseRefCode('NA·Z·002')).toBeNull();
    expect(() => refCode('A', 0)).toThrow(RangeError);
  });
});

describe('spoilers', () => {
  it('orders levels', () => {
    expect(canShow('none', 'none')).toBe(true);
    expect(canShow('story', 'none')).toBe(false);
    expect(canShow('story', 'endings')).toBe(true);
    expect(canShow('endings', 'story')).toBe(false);
  });
  it('only none may reach metadata', () => {
    expect(safeForMetadata('none')).toBe(true);
    expect(safeForMetadata('story')).toBe(false);
  });
});

import { contrast } from '../src/lib/contrast';
describe('contrast', () => {
  it('matches the documented palette', () => {
    expect(contrast('#e6dcc6', '#090d0e')).toBeCloseTo(14.33, 1);
    expect(contrast('#8a1d2c', '#e6dcc6')).toBeGreaterThan(4.5);
    expect(contrast('#d9a441', '#e6dcc6')).toBeLessThan(3); // gold must never be text on paper
  });
});
