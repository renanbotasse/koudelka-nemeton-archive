# Koudelka — The Nemeton Archive

A non-commercial fan archive about Sacnoth's *Koudelka*: a 1898 dossier you read by descending, with an original PS1-style 3D monastery.

Read `PRD.md` and `TASKS.md` §0 before any task. **Everything user-facing and all code/comments are in English.**

> The `CLAUDE.md` in `~/Desktop` belongs to the noSignal project (PHP, PostGIS). PHP, `SPEC.md` and `schema.sql` do NOT apply here.

## Conventions
- Astro 7 (static) + SolidJS islands + TypeScript `strictest`. Three.js only inside `src/world/`.
- Business logic lives in `src/lib/` as pure functions with tests. Components only present.
- Tokens only in `src/styles/tokens.css`. No radius, blur or gradients in the DOCUMENT layer.
- Spoilers: every file has `spoilerLevel`; metadata/OG/alt never carry sealed text.
- Original assets only. Never use game models, textures, music or key art as identity.
- JSDoc on exported functions, comments explain *why*, no `any`, `onCleanup` for every external resource.
- Run `npm run check` (astro check + vitest) before finishing a task.
