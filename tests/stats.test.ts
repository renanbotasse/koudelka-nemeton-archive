import { describe, expect, it } from 'vitest';
import { listNames, strongestNames, weakestNames } from '../src/lib/stats';

describe('stats', () => {
  it('lists names in plain English', () => {
    expect(listNames(['Mind'])).toBe('Mind');
    expect(listNames(['Intelligence', 'Mind', 'Piety'])).toBe('Intelligence, Mind and Piety');
  });
  it('orders strongest first and ignores unknown keys', () => {
    expect(strongestNames({ INT: 3, VIT: 2, XYZ: 3, STR: 3 }, 3)).toEqual(['Strength', 'Intelligence', 'Vitality']);
    expect(strongestNames(undefined)).toEqual([]);
  });
  it('finds listed weaknesses', () => {
    expect(weakestNames({ STR: 3, PIE: 0 })).toEqual(['Piety']);
  });
});
