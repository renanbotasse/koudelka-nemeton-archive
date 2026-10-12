import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';

const spoiler = z.enum(['none', 'story', 'endings']);

const people = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './content/people' }),
  schema: z.object({
    number: z.number().int().min(1).max(999),
    name: z.string(),
    roles: z.string(), // e.g. "MEDIUM · EXILE · WITNESS"
    age: z.number().int().optional(),
    status: z.string().default('UNKNOWN'),
    group: z.enum(['guests', 'house', 'others']),
    spoilerLevel: spoiler.default('none'),
    summary: z.string(),
    sources: z.array(z.string()).min(1),
    /** In-game stats exactly as the game names them. Only for playable characters. */
    stats: z.record(z.string(), z.number()).optional(),
    statsNote: z.string().optional(),
    playable: z.boolean().default(false),
    /** Archetype and role in play, in a few words. */
    archetype: z.string().optional(),
    /** How the developers conceived the character (paraphrased, sourced). */
    designNote: z.string().optional(),
    battle: z.object({
      strengths: z.array(z.string()).default([]),
      weaknesses: z.array(z.string()).default([]),
      gear: z.array(z.string()).default([]),
      magic: z.array(z.string()).default([]),
      tips: z.array(z.string()).default([]),
    }).optional(),
  }),
});

const places = defineCollection({
  loader: file('./content/places.yaml'),
  schema: z.object({
    name: z.string(),
    /** Order in which the area is first visited in the game. */
    order: z.number().int(),
    /** Disc of the first visit. Only the end of disc 2 is confirmed; the rest comes from one play-through. */
    disc: z.number().int().min(1).max(4),
    floor: z.string(),
    layer: z.enum(['ground', 'below', 'tower']),
    spoilerLevel: spoiler,
    summary: z.string(),
    what: z.string(),
    route: z.array(z.string()).default([]),
    items: z.array(z.string()).default([]),
    foes: z.string().optional(),
    puzzle: z.string().optional(),
    tip: z.string().optional(),
    sealed: z.string().optional(),
    sources: z.array(z.string()).min(1),
  }),
});

const acts = defineCollection({
  loader: file('./content/acts.yaml'),
  schema: z.object({ number: z.number().int(), title: z.string(), spoilerLevel: spoiler, body: z.string() }),
});

const files = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './content/files' }),
  schema: z.object({
    number: z.number().int(),
    title: z.string(),
    docType: z.enum(['sheet', 'letter', 'report', 'map', 'photo', 'diary', 'clipping']),
    series: z.enum(['A', 'B', 'C', 'D', 'E']),
    spoilerLevel: spoiler.default('none'),
    summary: z.string(),
    sources: z.array(z.string()).min(1),
  }),
});

const sources = defineCollection({
  loader: file('./content/sources.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.url().optional(),
    kind: z.enum(['primary', 'interview', 'wiki', 'press', 'database', 'playthrough', 'guide']),
    confidence: z.enum(['high', 'medium', 'low']),
    accessed: z.string(),
  }),
});

const images = defineCollection({
  loader: file('./content/images.yaml'),
  schema: z.object({
    group: z.string(),
    page: z.string(),
    title: z.string(),
    ratio: z.string(),
    minWidth: z.number(),
    what: z.string(),
    priority: z.enum(['P0', 'P1', 'P2']),
    kind: z.enum(['official', 'public-domain', 'photo']),
    where: z.string(),
    tips: z.string().default(''),
    credit: z.string().default(''),
  }),
});

export const collections = { people, places, acts, files, sources, images };
