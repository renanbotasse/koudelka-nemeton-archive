# Koudelka — The Nemeton Archive

> *Some places remember what people choose to forget.*

A non-commercial fan archive about Sacnoth's *Koudelka* (PlayStation, 1999), told as an 1898 investigation dossier reopened today, and read by descending. It features an original PS1-style 3D monastery.

> **Unofficial fan project.** Not affiliated with or endorsed by any rights holder of *Koudelka*. Text, illustrations, 3D models and sound are original unless credited. Official material appears only as cited evidence.

---

## Concept

Fan sites for *Koudelka* are mostly flat wikis. This project treats the monastery of Nemeton, on the night of 31 October 1898, as a **dossier**:

- **The Dossier** — information is organised like an archive (series → dossier → item). Every factual claim has a source and a confidence grade.
- **The Descent** — the home page is a camera lowered from the cliff, through the gate, nave and cells, down to the crypt. Scroll is always native; no scroll-jacking.

> *Nothing here is the original. Everything here is evidence.*

## Features

- **Two reading modes** — `ARCHIVE` (paper, ink, editorial) and `NEMETON` (dark, fog, 3D map). Same content, your choice.
- **Interactive 3D monastery** — an original low-poly model with a PS1 look (vertex snapping, affine texture mapping, dithering, fog), fixed cameras, a cutaway view and numbered room pins. Loaded on demand, with an SVG/still fallback.
- **Spoiler seals** — three levels (`NONE`, `STORY`, `ENDINGS`). Sealed text is a `<details>` element; the build fails if a higher-level block leaks outside its container. No spoilers in titles, OG tags or `alt` text.
- **Case files** — characters, places and objects with provenance, cross-references and a `[ CITE ]` button.
- **Walkthrough** — room-by-room guide and a battle-system page, written in original words.
- **Generative sound** — pure Web Audio, procedural, 0 KB of media. Off by default; never autoplays.
- **Search** — static, on-demand [Pagefind](https://pagefind.app/) index.
- **Accessibility first** — WCAG 2.2 AA target, full keyboard use, visible `MOTION` and `SOUND` controls, `prefers-reduced-motion` respected, nothing flashes more than 3×/s.
- **Privacy** — no cookies, no third parties before a click, self-hosted fonts.

## Routes

| Route | Content |
|---|---|
| `/` | The Descent (home) |
| `/walkthrough`, `/walkthrough/[slug]`, `/walkthrough/battle` | 3D section map, area pages, battle system |
| `/people`, `/people/[slug]` | Register of Persons (case files) |
| `/story`, `/story/endings` | The Incident Report; the sealed endings |
| `/archive`, `/archive/files/…`, `/archive/releases`, `/archive/legacy` | The Vault |
| `/design`, `/made`, `/about`, `/content-notes`, `/404` | Making-of, colophon, content warnings |

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | [Astro 7](https://astro.build/) (`output: 'static'`) | HTML first, islands, typed content collections. The content is the product. |
| Interactivity | [SolidJS](https://www.solidjs.com/) 1.9 + `@astrojs/solid-js` | Tiny runtime, fine-grained signals. |
| Language | TypeScript `~6.0` (`strictest`) | `@astrojs/check` does not accept TS 7 yet. Pinned until it does. |
| 3D | [three.js](https://threejs.org/) `WebGLRenderer` + custom GLSL `ShaderMaterial` | Smaller than WebGPU; vertex snapping and affine mapping are trivial in GLSL. |
| Content | Content collections + MDX + YAML + Zod | Cross-references and spoiler levels validated at build time. |
| Sound | Web Audio API (procedural) | 0 KB of media and no third-party rights involved. |
| Search | [Pagefind](https://pagefind.app/) + own Solid UI | Static, no server, loaded on demand. |
| Styling | Modern CSS with design tokens (no Tailwind) | Fine control over the visual identity. |
| Tests | Vitest, stylelint, `astro check` | Logic in pure functions; browser tests only where GPU or audio is needed. |
| Build | Vite (via Astro), Node ≥ 22.12 | Required by Astro 7 and Vitest 5. |

## Technical decisions

### Why Astro and not Next.js

- **Content first.** This is an archive of text, case files and sources. Astro ships zero JS by default, so the home page stays complete and readable with no JS and no WebGL.
- **JS budget.** The target is ≤ 25 KB of initial JS (CI ceiling 35 KB). Next.js ships the React and hydration runtime on every page; in Astro only the islands load JS.
- **Typed content collections.** Zod schemas validate cross-references and spoiler levels, and the build fails if a spoiler leaks. This is central to the project and comes built in.
- **No backend.** There is no login, comments, CMS or database, so SSR and API routes would go unused.
- **Persistent audio and 3D.** `<ClientRouter />` with `transition:persist` keeps sound and the 3D scene alive across navigation without a full client-side app.

### Why SolidJS and not React

- **Runtime size.** About 4.8 KB (brotli), against a much larger React + ReactDOM runtime, which matters with a 25 KB budget.
- **Signals map to the problem.** Fine-grained signals connect directly to shader uniforms and the sound mixer without re-rendering component trees.
- **Only islands need it.** Components are mostly presentational; interactivity is limited to the mode switch, depth rail, sound console, search and 3D canvases.
- **Version 1.9, not 2.** Solid 2 is still a release candidate, so it stays out.

### Why three.js with WebGL, not WebGPU

- The WebGL build is about 135 KB (brotli) against about 244 KB for WebGPU, and the 3D chunk has a 170 KB gzip target.
- The PS1 effects (vertex snapping, affine texture mapping, Bayer dithering, 15-bit colour, short fog) are simple in GLSL.
- Three.js is imported only inside `src/world/`, and loads after LCP through a dynamic `import()`. Capabilities (`full`, `lite`, `still`) are decided by a pure function in `src/lib/capabilities.ts`, and any error falls back to a pre-rendered still.

### Why procedural Web Audio

- *Koudelka*'s soundtrack is copyrighted, so no music is hosted. The site's sound (wind, stone, bell, distant choir, synthesised organ drone) is generated live.
- 0 KB of media, off by default, never autoplays, and it survives page navigation.

### Why Pagefind

Search is static: it indexes the built HTML, needs no server and loads only when asked.

### Why plain CSS with tokens (no Tailwind)

The visual identity (paper, ink, wax seals, stamps) needs fine control. All colours, type and spacing live in `src/styles/tokens.css`, and stylelint enforces that rule. Contrast ratios are calculated and tested (`src/lib/contrast.ts`).

### Why self-hosted open-licence fonts

Privacy (no third-party requests), performance (a few `woff2` files) and licensing (all OFL), served through `@fontsource`.

### Why no CMS, no Lenis/GSAP

- Content is written in Markdown/MDX/YAML in the repo and validated in the build, so an external editor is not needed.
- Scroll is always native. Animation uses CSS scroll-driven animations as progressive enhancement, plus `IntersectionObserver`. Without support, blocks simply appear in their final state.

### Why Vitest, and logic in `src/lib/`

Business logic (spoiler levels, reference codes, device capabilities, citation, sound mixer) lives in pure functions with no Astro and no DOM, so it is fast to test and fully covered. Components only present.

## Getting started

```bash
npm install
npm run dev        # dev server (empty image slots show dotted placeholders)
npm run check      # astro check + stylelint + vitest
npm run build      # static build + Pagefind index
npm run preview    # serve the production build
```

If `npm install` complains about peer dependencies, use `npm ci --legacy-peer-deps` (this is what CI does).

Set `PUBLIC_SITE_MODE=preview` for a private preview build.

## Project structure

```
koudelka/
├── content/               # all text and data
│   ├── people/ files/     # MDX case files
│   ├── acts.yaml places.yaml sources.yaml images.yaml
├── public/                # fonts, images, OG image, pre-rendered stills
├── research/              # source notes (lore, development, legal, tech)
├── scripts/               # stills, busts, OG rendering, image slot list
├── tests/                 # Vitest suites
└── src/
    ├── content.config.ts  # Zod schemas
    ├── lib/               # pure, tested logic: spoilers, refs, capabilities, cite, mixer
    ├── components/        # Astro components and Solid islands
    ├── world/             # the only place that imports three
    ├── layouts/ pages/ styles/
```

**Rule:** business logic lives in `src/lib/` as pure functions with tests; components only present. `three` is imported only inside `src/world/`.

## Content and images

- Content is authored as Markdown/MDX/YAML in the repo. There is no CMS and no backend.
- Every file carries a `spoilerLevel`; every factual claim cites an entry in `content/sources.yaml`.
- Images are slots listed in `content/images.yaml`. Drop a file named exactly like the slot id into `public/images/` and it is picked up on the next build. `/system/images` shows the state of every slot.

## Design

Three layers: **WORLD** (the PS1-style 3D scene), **DOCUMENT** (all text and interface: legible, paper and ink) and **GLASS** (a light CRT overlay, fully disableable). The golden rule: anything with text or that is clickable is DOCUMENT, and DOCUMENT is always readable.

Typefaces are open-licence (OFL) and self-hosted. Colours and spacing live only in `src/styles/tokens.css`.

## Legal and representation

- The identity is 100% original. No game models, textures, music, FMVs or key art are used as the site's identity; no music or video is hosted.
- Official material is used only as small, credited, cited evidence.
- Koudelka is a Romani woman. The site uses *Romani* and *Roma*, avoids stereotypes, and includes an editorial note on language. A sensitivity read is a launch gate.
- A content-warning page lists horror, violence, religion and real historical victims.

Rights holders: write to us and we will remove any material.

## Status

Work in progress (version 0).

## Author

**Renan Botasse** — a personal, non-commercial portfolio project.
