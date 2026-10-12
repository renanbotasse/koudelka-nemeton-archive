import { describe, expect, it } from 'vitest';
import { formatCitation, isoDate } from '../src/lib/cite';

describe('cite', () => {
  it('formats a stable one-line citation', () => {
    expect(formatCitation({ title: 'Koudelka Iasant', url: 'https://x.test/people/koudelka-iasant', accessed: '2026-10-08' }))
      .toBe('“Koudelka Iasant.” Koudelka: The Nemeton Archive. https://x.test/people/koudelka-iasant. Accessed 2026-10-08.');
  });
  it('uses an injected clock', () => expect(isoDate(new Date('2026-10-08T23:00:00Z'))).toBe('2026-10-08'));
});
