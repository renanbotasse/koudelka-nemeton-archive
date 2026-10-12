export type SpoilerLevel = 'none' | 'story' | 'endings';
const RANK: Record<SpoilerLevel, number> = { none: 0, story: 1, endings: 2 };

/** A block is visible when it is not more spoilery than what the reader unsealed. */
export function canShow(block: SpoilerLevel, unsealed: SpoilerLevel): boolean {
  return RANK[block] <= RANK[unsealed];
}

/** Metadata (title, OG, alt) must never carry sealed text: only `none` is allowed. */
export function safeForMetadata(level: SpoilerLevel): boolean {
  return level === 'none';
}
