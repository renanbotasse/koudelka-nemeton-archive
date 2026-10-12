/** The eight attributes of the game, in the order they sit around the rose. */
export const STAT_ORDER = ['STR', 'VIT', 'DEX', 'AGL', 'INT', 'MND', 'PIE', 'LUC'] as const;
export type StatKey = (typeof STAT_ORDER)[number];

export const STAT_NAMES: Record<StatKey, string> = {
  STR: 'Strength', VIT: 'Vitality', DEX: 'Dexterity', AGL: 'Agility', INT: 'Intelligence', MND: 'Mind', PIE: 'Piety', LUC: 'Luck',
};

/** "Intelligence, Mind and Piety": a plain English list. */
export function listNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? '';
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/** The attributes a character leans on most (emphasis 3), as readable names. */
export function strongestNames(stats: Record<string, number> | undefined, limit = 3): string[] {
  if (!stats) return [];
  return Object.entries(stats)
    .filter(([k, v]) => k in STAT_NAMES && v > 0)
    .sort((a, b) => b[1] - a[1] || STAT_ORDER.indexOf(a[0] as StatKey) - STAT_ORDER.indexOf(b[0] as StatKey))
    .slice(0, limit)
    .map(([k]) => STAT_NAMES[k as StatKey]);
}

/** The attribute a character is weakest in (emphasis 0, explicitly listed), if any. */
export function weakestNames(stats: Record<string, number> | undefined): string[] {
  if (!stats) return [];
  return Object.entries(stats).filter(([k, v]) => k in STAT_NAMES && v === 0).map(([k]) => STAT_NAMES[k as StatKey]);
}
