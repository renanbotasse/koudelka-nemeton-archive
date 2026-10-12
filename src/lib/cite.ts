export interface CiteInput {
  title: string;
  /** Absolute URL, or a site-relative path when the origin is not known at build time. */
  url: string;
  accessed: string; // YYYY-MM-DD
}

/** One-line citation for a case file. Plain text so it pastes cleanly anywhere. */
export function formatCitation(c: CiteInput): string {
  return `“${c.title}.” Koudelka: The Nemeton Archive. ${c.url}. Accessed ${c.accessed}.`;
}

/** Today's date as YYYY-MM-DD; the clock is injected so the function stays pure. */
export function isoDate(now: Date): string {
  return now.toISOString().slice(0, 10);
}
