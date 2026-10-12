export type Series = 'A' | 'B' | 'C' | 'D' | 'E';
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

/** Builds an archive reference like `NA·B·002` or `NA·B·002·iii`. */
export function refCode(series: Series, file: number, item?: number): string {
  if (!Number.isInteger(file) || file < 1 || file > 999) throw new RangeError(`file out of range: ${file}`);
  const base = `NA·${series}·${String(file).padStart(3, '0')}`;
  if (item === undefined) return base;
  const roman = ROMAN[item - 1];
  if (!roman) throw new RangeError(`item out of range: ${item}`);
  return `${base}·${roman}`;
}

/** Parses a reference code; returns null when malformed. */
export function parseRefCode(code: string): { series: Series; file: number; item?: number } | null {
  const m = /^NA·([A-E])·(\d{3})(?:·([ivx]+))?$/.exec(code);
  if (!m) return null;
  const item = m[3] ? ROMAN.indexOf(m[3]) + 1 : undefined;
  if (m[3] && item === 0) return null;
  return { series: m[1] as Series, file: Number(m[2]), ...(item ? { item } : {}) };
}
