import { existsSync } from 'node:fs';
import sharp from 'sharp';

const EXT = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const;

export interface FoundImage { src: string; width: number; height: number }

/** Looks for `public/images/<slot>.<ext>` at build time. Dropping a file there is all it takes to fill a slot. */
export async function findImage(slot: string): Promise<FoundImage | null> {
  for (const ext of EXT) {
    const file = `public/images/${slot}.${ext}`;
    if (!existsSync(file)) continue;
    const meta = await sharp(file).metadata();
    return { src: `/images/${slot}.${ext}`, width: meta.width ?? 1200, height: meta.height ?? 800 };
  }
  return null;
}

/** Default credit line by kind of image; a per-slot `credit` in the manifest overrides it. */
export function defaultCredit(kind: string): string {
  if (kind === 'public-domain') return 'Public domain.';
  if (kind === 'photo') return 'Photograph.';
  return 'Shown as cited evidence. © its respective rights holders.';
}
