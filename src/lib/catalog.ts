import type { Series } from './refcode';

export interface CatalogEntry {
  number: number;
  title: string;
  kind: string;
  series: Series;
  href: string;
  /** Highest spoiler level inside the file. */
  sealed: 'none' | 'story' | 'endings';
}

/** The fourteen case files of the archive, in order. Single source for the vault, home and cross-links. */
export const CATALOG: readonly CatalogEntry[] = [
  { number: 1, title: 'The Monastery', kind: 'PLACE', series: 'A', href: '/walkthrough', sealed: 'none' },
  { number: 2, title: 'Koudelka Iasant', kind: 'PERSON', series: 'B', href: '/people/koudelka-iasant', sealed: 'none' },
  { number: 3, title: 'Edward Plunkett', kind: 'PERSON', series: 'B', href: '/people/edward-plunkett', sealed: 'none' },
  { number: 4, title: 'James O’Flaherty', kind: 'PERSON', series: 'B', href: '/people/james-oflaherty', sealed: 'none' },
  { number: 5, title: 'The Caretakers', kind: 'PERSON', series: 'B', href: '/people/the-caretakers', sealed: 'story' },
  { number: 6, title: 'The Princess Alice', kind: 'EVIDENCE', series: 'E', href: '/archive/files/the-princess-alice', sealed: 'none' },
  { number: 7, title: 'Charlotte', kind: 'PERSON', series: 'B', href: '/people/charlotte', sealed: 'story' },
  { number: 8, title: 'Roger Bacon', kind: 'PERSON', series: 'B', href: '/people/roger-bacon', sealed: 'none' },
  { number: 9, title: 'The Emigre Document', kind: 'EVIDENCE', series: 'E', href: '/archive/files/the-emigre-document', sealed: 'none' },
  { number: 10, title: 'Elaine', kind: 'PERSON', series: 'B', href: '/people/elaine', sealed: 'story' },
  { number: 11, title: 'The Pendant', kind: 'EVIDENCE', series: 'E', href: '/archive/files/the-pendant', sealed: 'none' },
  { number: 12, title: 'Alias', kind: 'PERSON', series: 'B', href: '/people/alias', sealed: 'story' },
  { number: 13, title: 'The Unexplained Events', kind: 'INCIDENT', series: 'C', href: '/story', sealed: 'story' },
  { number: 14, title: 'Three Dawns', kind: 'ENDINGS', series: 'C', href: '/story/endings', sealed: 'endings' },
];

/** `OPEN` or `SEALED` label with the level, never relying on colour alone. */
export function stateLabel(e: CatalogEntry): string {
  return e.sealed === 'none' ? 'OPEN' : `SEALED · ${e.sealed.toUpperCase()}`;
}
