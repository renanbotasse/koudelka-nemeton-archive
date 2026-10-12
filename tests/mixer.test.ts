import { describe, expect, it } from 'vitest';
import { CHANNELS, PRESETS, approach, mix } from '../src/lib/mixer';

const full = { wind: 1, bell: 1, drone: 1, drip: 1 };

describe('mixer', () => {
  it('keeps every preset within 0..1', () => {
    for (const p of Object.values(PRESETS)) for (const c of CHANNELS) expect(p[c]).toBeGreaterThanOrEqual(0), expect(p[c]).toBeLessThanOrEqual(1);
  });
  it('multiplies preset, fader and master', () => {
    expect(mix(PRESETS.nave, { ...full, bell: 0.5 }, 0.5).bell).toBeCloseTo(0.15);
  });
  it('a muted master silences everything', () => {
    expect(Object.values(mix(PRESETS.cliff, full, 0)).every((v) => v === 0)).toBe(true);
  });
  it('clamps bad input', () => {
    expect(mix(PRESETS.cliff, { ...full, wind: 7 }, Number.NaN).wind).toBe(0);
  });
  it('approaches a target without overshoot', () => {
    expect(approach(0, 1, 0.5)).toBeCloseTo(0.25);
    expect(approach(0.9, 1, 1)).toBe(1);
    expect(approach(1, 0, 0.1)).toBeCloseTo(0.95);
  });
});
