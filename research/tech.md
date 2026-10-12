# Dossiê técnico — KOUDELKA · THE NEMETON ARCHIVE

> Pesquisa técnica para PRD/TASKS. Data de referência: 2026-10-08. Português do Brasil; copy do site em inglês.
> Status: completo (v1 do dossiê). Medições de bundle reaproveitadas de `bench-src/out/`; nenhuma instalação nova.

## 0. Versões confirmadas (outubro de 2026)

Fonte: `registry.npmjs.org/<pkg>/latest` consultado em 2026-10-08 (reconfirma o snapshot `npmmeta/` de 2026-10-07 23:32) + campo `time` do registry. Navegadores: `@mdn/browser-compat-data` 8.1.4 (timestamp 2026-10-01) e `web-features` 3.40.1.

| Pacote | `latest` | Publicado | Observação que muda decisão |
|---|---|---|---|
| `astro` | **7.3.7** | 2026-10-07 | Major 7.0.0 em 2026-06-22. Node `>=22.12.0`. Depende de `vite ^8.3.1`, `zod ^4.6.5`, `rolldown ^1.2.11`, `@astrojs/compiler-rs`. Beta 7.4.0-beta.1 existe — não usar. |
| `solid-js` | **1.9.17** | 2026-10-07 | `next` = **2.0.0-rc.13** (2026-09-30). Solid 2 ainda é RC → fica fora da v1. |
| `@astrojs/solid-js` | **7.0.2** | 2026-08-06 | peer `solid-js ^1.9.13` (não aceita 2.x). Usa `vite-plugin-solid ^2.11.12`. |
| `@astrojs/mdx` | **8.0.3** | 2026-10-06 | peer `astro ^7.2.10`. |
| `three` | **0.186.1** (r186) | 2026-09-24 | r186.0 em 2026-09-08. Tipos à parte: `@types/three` **0.186.0**. |
| `vite` | **8.3.3** | 2026-10-06 | Vite 8 (2026-03-12) = bundler **Rolldown** (`rolldown ~1.2.11`). Node `^20.19 \|\| >=22.12`. |
| `vitest` | **5.0.3** | 2026-09-30 | Major 5 em 2026-09-03. peer `vite ^6.4 \|\| ^7 \|\| ^8`. Browser mode via `@vitest/browser-playwright` 5.0.3. Node `^22.12 \|\| ^24 \|\| >=26`. |
| `@playwright/test` | **1.64.0** | 2026-10-07 | Saiu ontem; `next` já é 1.65 alpha. Fixar `~1.64.0`. |
| `@gltf-transform/core` / `cli` | **4.5.1** | 2026-09-28 | 4.5.0 em 2026-09-01. CLI traz `optimize`, `meshopt`, `quantize`, `palette`, `join`, `flatten`, `instance`, `etc1s`/`uastc`. |
| `meshoptimizer` | 1.3.0 | — | Encoder usado pelo gltf-transform; decoder vem em `three/addons/libs/meshopt_decoder.module.js`. |
| `pagefind` | **1.5.2** | 2026-04-12 | Estável há 6 meses. |
| `typescript` | **7.0.2** | 2026-07-08 | TS 7 = compilador nativo (Go). **Mas `@astrojs/check` 0.9.10 tem peer `typescript ^5 \|\| ^6`** → fixar `typescript ~6.0.3` no projeto até o `astro check` aceitar 7 (ver Riscos). |
| `zod` | 4.6.5 | — | Já vem com o Astro (`astro/zod`); não instalar separado. |
| `lenis` / `gsap` | 1.3.26 / 3.15.0 | 2026-08 / 2026-04 | Avaliados em §4 — **não entram**. |

Navegadores correntes (BCD): Chrome 154 (2026-09-22), Firefox 157 (2026-09-29), Safari/iOS 27 (2026-09-14).

**Three.js: WebGL vs WebGPU/TSL (r186).** `three/webgpu` (`WebGPURenderer` + TSL) é o caminho onde o desenvolvimento novo acontece e cai para WebGL2 automaticamente quando não há WebGPU; WebGPU está em Chrome/Edge (desktop 113+ parcial, completo no 144; Android 121+), Safari 26+ e Firefox 141+ parcial (BCD: `api.GPU`, `web-features: webgpu` ainda **não Baseline**). Medição de bundle já feita neste scratchpad (esbuild, minificado, cena mínima com loader glTF + meshopt + material custom + render target; `bench-src/`):

| Entrada | min | gzip | brotli |
|---|---|---|---|
| `three` (WebGLRenderer + ShaderMaterial + GLTFLoader + Meshopt) | 645 KB | **163 KB** | **135 KB** |
| `three/webgpu` + TSL (mesmo escopo) | 1154 KB | 303 KB | 244 KB |
| `solid-js` + `solid-js/web` (runtime mínimo) | 13 KB | 5.3 KB | 4.8 KB |
| meshopt decoder (WASM inline) | 26 KB | 7.2 KB | 6.4 KB |

**Decisão:** v1 usa `WebGLRenderer` + `ShaderMaterial`/`onBeforeCompile` em GLSL ES 3.0. Motivos: ~110 KB br a menos no chunk 3D; o mapeamento afim sai em GLSL ES 3.00 com o truque `uv·w / w` sem depender de extensão (§1); WebGL2 é Baseline amplo (desde 2021) e a cena é trivial — WebGPU não compra nada visível aqui. TSL fica como P2 se o Three descontinuar o caminho GLSL (ver Riscos).

## 1. Look PS1 em Three.js

Princípio: cada artefato do PS1 vira **um uniform**, todos controlados por um mestre `psx` ∈ [0,1] (0 = render moderno e limpo; 1 = PS1 pleno). O usuário tem um toggle persistido `[PSX: ON/OFF]`; `prefers-reduced-motion` não desliga o look (o jitter só aparece com câmera em movimento, e com reduced motion a câmera fica parada).

| Artefato | Origem no hardware | Implementação | Dose (`t = psx`) |
|---|---|---|---|
| Vertex jitter | GTE em ponto fixo, rasterizador sem subpixel | snap de `gl_Position` em NDC para a grade da resolução virtual | `mix(clip, snapped, t)` |
| Texture warping | sem correção de perspectiva | varying `uv*w` + `w`, divisão no fragment (afim) | `mix(uvPersp, uvAffine, t)` |
| 320×240 | framebuffer de 256–640 px | drawing buffer pequeno + upscale nearest inteiro | escada: nativo → 480 → 360 → 240 linhas |
| Dither + 15 bits | GPU fazia dither 4×4 ao gravar RGB555 | tabela 4×4 do PS1 + quantização por canal | bits = `mix(8, 5, t)` (contínuo) |
| Névoa/depth cueing | GTE interpolava para a "far color" | fog linear por vértice/fragmento, cor = fundo | `uFogFar` encurta com `t` |
| Luz por vértice | Gouraud | luz calculada no vertex shader → `vColor` | — (sempre) |
| Sem filtro | sem bilinear, sem mipmaps | `NearestFilter`, `generateMipmaps=false` | — |
| Draw distance curta | orçamento de polígonos | `camera.far` ≈ 40 u, fog termina antes | — |

**Correção ao briefing:** `noperspective` **não existe em GLSL ES 3.00** (WebGL2). Só com a extensão `NV_shader_noperspective_interpolation`, que tem ~60% de suporte geral e **~7% Android / ~6% iOS** ([web3dsurvey](https://web3dsurvey.com/webgl2/extensions/NV_shader_noperspective_interpolation), [registro Khronos](https://registry.khronos.org/webgl/extensions/NV_shader_noperspective_interpolation)). Em WGSL é nativo (`@interpolate(linear)`). O truque portátil — interpolar `uv*w` e `w` com correção de perspectiva e dividir no fragment — dá exatamente a interpolação linear em tela (os `1/w` se cancelam) e funciona em 100% do WebGL2. Obs.: o TSL do r186 mapeia `setInterpolation('linear')` para `noperspective` no fallback GLSL (`src/renderers/webgl-fallback/nodes/GLSLNodeBuilder.js:110`) sem habilitar a extensão (grep não encontra `NV_shader` em `src/`) — mais um motivo para ficar em GLSL na v1.

### 1.1 Render: resolução virtual com escala inteira (recomendado)

Sem render target extra: o **drawing buffer do canvas já é a resolução virtual** e o CSS amplia com `image-rendering: pixelated` (suporte universal: Chrome 41, Firefox 93, Safari 10 — BCD). Uma passada só, ~77 mil pixels/frame. Escala **inteira** evita pixels de largura desigual:

```ts
/** Calcula a resolução virtual mantendo escala inteira — pixels de tamanho uniforme. */
/** Entradas em pixels de DISPOSITIVO (css × devicePixelRatio): escala inteira também em DPR 1.25/1.5. */
export function virtualSize(devW: number, devH: number, lines = 240): { w: number; h: number; scale: number } {
  const scale = Math.max(1, Math.round(devH / lines));
  return { w: Math.ceil(devW / scale), h: Math.ceil(devH / scale), scale };
}
// renderer.setPixelRatio(1); renderer.setSize(w, h, false);
// canvas CSS = (w*scale/dpr) × (h*scale/dpr) px, image-rendering: pixelated; container com overflow:hidden recorta o excesso
```

Use `WebGLRenderTarget(w, h, { minFilter: NearestFilter, magFilter: NearestFilter, generateMipmaps: false, depthBuffer: true })` + quad de tela cheia **só** se precisar de pós-processo sobre a imagem inteira (fade para preto, troca de paleta). Nesse caso dither/quantização vão no quad, uma vez, e o canvas fica em resolução nativa (DPR ≤ 1.5).

### 1.2 `PsxMaterial` (ShaderMaterial, GLSL3)

Luz por vértice exige shader próprio: no r186 o `MeshLambertMaterial` calcula a luz no fragment (`ShaderLib/meshlambert.glsl.js`). Uniforms **compartilhados por referência** entre todos os materiais (um `.value` atualiza a cena inteira; não usar `material.clone()`, que copia uniforms).

```glsl
// psx.vert — ShaderMaterial({ glslVersion: THREE.GLSL3, vertexColors: true })
uniform vec2 uSnapRes; uniform float uSnap;          // grade virtual (ex. 320×240) e dose 0–1
uniform vec3 uAmbient, uSunDir, uSunColor;           // uSunDir: em view space, aponta PARA a luz
uniform vec3 uLampPos, uLampColor; uniform float uLampRange; // vela/lanterna (view space)
out vec2 vUv; out vec3 vUvAffine; out vec3 vColor; out float vDepth;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec4 clip = projectionMatrix * mv;
  if (clip.w > 0.0) {                                  // não snapar vértices atrás da câmera
    vec2 px = (clip.xy / clip.w * 0.5 + 0.5) * uSnapRes;
    vec2 snapped = (floor(px + 0.5) / uSnapRes * 2.0 - 1.0) * clip.w;
    clip.xy = mix(clip.xy, snapped, uSnap);
  }
  gl_Position = clip;
  vUv = uv;
  vUvAffine = vec3(uv * clip.w, clip.w);               // divisão no fragment = afim
  vec3 n = normalize(normalMatrix * normal);
  vec3 toLamp = uLampPos - mv.xyz;
  float att = clamp(1.0 - length(toLamp) / uLampRange, 0.0, 1.0);
  vec3 light = uAmbient + uSunColor * max(dot(n, uSunDir), 0.0)
             + uLampColor * max(dot(n, normalize(toLamp)), 0.0) * att * att;
  vec3 base = vec3(1.0);
  #ifdef USE_COLOR
    base = color;                                      // AO/sujeira pintada por vértice no Blender
  #endif
  vColor = base * light;
  vDepth = -mv.z;
}
```

```glsl
// psx.frag
uniform sampler2D map; uniform float uAffine, uDither, uBits;   // uBits: 8 = desligado, 5 = RGB555
uniform vec3 uFogColor; uniform float uFogNear, uFogFar;
in vec2 vUv; in vec3 vUvAffine; in vec3 vColor; in float vDepth;
// Tabela de dither do GPU do PS1 (= DITHER_MATRIX do DuckStation), somada antes de truncar para 5 bits
const float PSX_DITHER[16] = float[16](-4.,0.,-3.,1., 2.,-2.,3.,-1., -3.,1.,-4.,0., 3.,-1.,2.,-2.);
void main() {
  vec2 uv = mix(vUv, vUvAffine.xy / vUvAffine.z, uAffine);
  vec4 tex = texture(map, uv);
  if (tex.a < 0.5) discard;                            // transparência binária, sem sort
  vec3 col = tex.rgb * vColor;
  col = mix(col, uFogColor, smoothstep(uFogNear, uFogFar, vDepth));
  col = linearToOutputTexel(vec4(col, 1.0)).rgb;       // quantizar no espaço de saída (sRGB)
  float levels = exp2(uBits) - 1.0;
  ivec2 p = ivec2(gl_FragCoord.xy) & 3;                // gl_FragCoord já está na resolução virtual
  col += PSX_DITHER[p.y * 4 + p.x] / 8.0 / levels * uDither;
  col = floor(col * levels + 0.5) / levels;
  gl_FragColor = vec4(col, 1.0);                       // three define gl_FragColor → pc_fragColor em GLSL3
}
```

Dose e desligamento (TS, `src/lib/psx.ts`, função pura testável):

```ts
/** Mapeia a intensidade mestre (0–1) para os uniforms; 0 = render moderno. */
export function psxUniformValues(t: number): { snap: number; affine: number; dither: number; bits: number } {
  const k = Math.min(1, Math.max(0, t));
  return { snap: k, affine: k, dither: k, bits: 8 - 3 * k };
}
```

Variante leve para materiais prontos (ex.: `MeshBasicMaterial` emissivo de vitral), só com snap:

```ts
mat.onBeforeCompile = (s) => {
  s.uniforms.uSnapRes = psx.uSnapRes; s.uniforms.uSnap = psx.uSnap;   // mesmas referências
  s.vertexShader = s.vertexShader
    .replace('#include <common>', '#include <common>\nuniform vec2 uSnapRes; uniform float uSnap;')
    .replace('#include <project_vertex>', `#include <project_vertex>
      if (gl_Position.w > 0.0) { vec2 px = (gl_Position.xy / gl_Position.w * .5 + .5) * uSnapRes;
        gl_Position.xy = mix(gl_Position.xy, (floor(px + .5) / uSnapRes * 2. - 1.) * gl_Position.w, uSnap); }`);
};
mat.customProgramCacheKey = () => 'psx-snap';         // evita colisão de cache de programa
```

Regras de cena: ao carregar o glTF, trocar todo material por `PsxMaterial` copiando `map`; `vertexColors: true` só se a geometria tiver `COLOR_0` (sem o atributo o WebGL lê 0 → preto); em toda textura `magFilter = minFilter = NearestFilter`, `generateMipmaps = false`, `colorSpace = SRGBColorSpace`. `scene.background = uFogColor` (névoa funde com o fundo). `camera.near = 0.3`, `far = 40`, `uFogFar ≤ 0.9·far`. Polígonos grandes no chão precisam ser subdivididos (~1–2 u) ou o warping afim fica grotesco — é o mesmo truque dos jogos da época.

TSL/WebGPU (P2): o equivalente do snap já foi esboçado em `bench-src/webgpu.js` (`material.vertexNode = Fn(() => …floor(p.xy.div(p.w).mul(res)).div(res).mul(p.w)…)`); não vale o +110 KB br agora.

## 2. Pipeline de assets

**Blender → glTF.** Exportar `.glb` (glTF 2.0) com modificadores aplicados, só a coleção da cena, normais suavizadas por grupo (Gouraud precisa de normais), atributo de cor ativo como `COLOR_0` (AO/sujeira pintados por vértice substituem lightmaps), um material = um "texture page". Nó *Image Texture* com interpolação **Closest** → o exportador grava sampler `NEAREST`. Nada de PBR: só *Base Color*; o resto é descartado pelo `PsxMaterial`.

**Texturas.** Pintar já no tamanho final (64², 128², no máx. 256²; potência de 2) e **indexadas**: PNG-8 com 16 cores (4 bits, como as CLUT do PS1) ou 256 cores. Quantizar sem difusão de erro (ex.: `pngquant 16 --nofs`) — o dither é do shader, não da textura. Um atlas 256×256 por cena ("texture page") permite `join` e corta draw calls. Na GPU tudo vira RGBA8 de qualquer forma: indexar serve para peso de download e para disciplina estética. **Não** usar `gltf-transform resize`: no 4.5.1 só oferece Lanczos2/3 (`cli.ts`, comando `resize`), que borra pixel art.

**gltf-transform 4.5.1.** Os defaults do `optimize` são hostis a este projeto (`--simplify true`, `--texture-compress auto`, `--texture-size 2048` — `src/cli.ts` l. 226–345). Pipeline em dois passos, num script `scripts/build-models.ts`:

```sh
gltf-transform optimize src/scene.glb tmp.glb \
  --compress false --texture-compress false --simplify false \
  --palette true --flatten true --join true --instance true --weld true
gltf-transform meshopt tmp.glb public/models/scene.glb --level high
gltf-transform inspect public/models/scene.glb   # relatório para o PR
```

- `simplify` desligado: as malhas já nascem low-poly; o simplificador destrói silhuetas desenhadas à mão.
- `palette`: materiais sem textura (cores sólidas) viram uma paleta pequena e um material só → `join` funciona.
- `meshopt` quantiza e comprime geometria (`EXT_meshopt_compression` + `KHR_mesh_quantization`) e foi feito para ser seguido de gzip/brotli. Decoder = 6.9 KB br (medido: `three/examples/jsm/libs/meshopt_decoder.module.js`). **Draco não**: 49 KB br só de WASM (`draco_decoder.wasm`), mais worker.
- O host **precisa** servir `.glb` com brotli/gzip (nem todo CDN comprime `model/gltf-binary`). Teste de CI: `curl -sI -H 'Accept-Encoding: br' …/scene.glb | grep -i content-encoding`.

**KTX2/Basis: não.** O transcoder custa **217 KB br** (medido: `basis_transcoder.wasm` 204 KB + `.js` 14 KB) para economizar sobre um conjunto de texturas que inteiro pesa 40–120 KB em PNG-8. ETC1S trabalha em blocos 4×4 e mancha paletas de 16 cores; UASTC fica maior que o PNG. VRAM não é problema: 256² RGBA8 = 256 KB sem mipmaps; 30 texturas ≈ 7.5 MB. Reavaliar só se surgir textura ≥ 1024² ou VRAM > 32 MB.

**Orçamentos por cena** (verificados por `scripts/check-models.ts` com `@gltf-transform/core` + `EXTMeshoptCompression` + `MeshoptDecoder` do pacote `meshoptimizer`, falhando o CI):

| Item | Cena-herói (mosteiro) | Vinheta (objeto/corredor) |
|---|---|---|
| Triângulos totais / visíveis | ≤ 12k / ≤ 6k | ≤ 3k |
| Draw calls | ≤ 40 | ≤ 12 |
| Texturas | ≤ 8, ≤ 256², indexadas | ≤ 3, ≤ 128² |
| `.glb` (brotli) | ≤ 150 KB | ≤ 50 KB |
| Animação | câmera por keyframes; sem skinning | idem |

Referência de época: o PS1 desenhava na prática poucos milhares de polígonos por frame a 30 fps; 6k visíveis já é "generoso" e roda em qualquer GPU móvel a 240 linhas.

## 3. Estratégia de carregamento

1. **LCP é uma imagem, nunca o canvas.** O herói renderiza um *still* (`<picture>` AVIF/WebP ≤ 60 KB, `fetchpriority="high"`, mesmo `aspect-ratio` do canvas). Os stills são gerados da própria cena por `scripts/render-stills.ts` (Playwright abre `/dev/still?scene=…` com seed fixa e salva PNG) → paridade visual garantida e fallback gratuito.
2. **Ilha mínima.** `<SceneGate client:idle={{ timeout: 1500 }} />` (Solid, < 2 KB) decide o tier e só então faz `import('../three/nemeton-scene')`. Condições, nesta ordem: LCP já reportado (`PerformanceObserver` `largest-contentful-paint`, Baseline desde 2025-12 com Safari 26.2; fallback `load` + 1 s) → container visível (`IntersectionObserver`) → tier ≠ `still`.
3. **Capacidade** (função pura em `src/lib/device-tier.ts`, testada em Vitest):

```ts
export type Tier = 'still' | 'lite' | 'full';
export interface DeviceSignals {
  webgl2: boolean;         // getContext('webgl2', { failIfMajorPerformanceCaveat: true }) !== null → exclui render por software
  reducedMotion: boolean;  // matchMedia('(prefers-reduced-motion: reduce)')
  saveData: boolean;       // navigator.connection?.saveData — só Chromium; ausente = false
  cores: number;           // navigator.hardwareConcurrency (Safari 15.4+)
  memoryGB?: number;       // navigator.deviceMemory — só Chromium
  userPref: 'auto' | 'on' | 'off';
}
/** Decide quanto 3D o dispositivo recebe; a preferência explícita do usuário vence tudo. */
export function pickTier(s: DeviceSignals): Tier {
  if (s.userPref === 'off' || !s.webgl2) return 'still';
  if (s.userPref === 'on') return 'full';
  if (s.saveData || s.reducedMotion) return 'still';   // com botão "View in 3D"
  if (s.cores <= 4 || (s.memoryGB ?? 8) <= 4) return 'lite';
  return 'full';
}
```

`lite` = 200 linhas, 20 fps, sem luz pontual animada. `full` = 240 linhas, 30 fps. Com reduced motion e 3D ligado manualmente: câmera estática, sem névoa animada.

4. **Loop.** `renderer.setAnimationLoop` com **cap de 30 fps** (acumulador sobre `THREE.Timer`; o PS1 rodava a 30/20 fps, e isso poupa bateria). Pausar com `IntersectionObserver` (fora da tela → `setAnimationLoop(null)`), `visibilitychange` e `pagehide`. Compilar shaders antes do primeiro frame com `await renderer.compileAsync(scene, camera)` (usa `KHR_parallel_shader_compile` em Chrome/Safari; Firefox não tem a extensão e compila de forma síncrona → fazer isso fora da janela de interação).
5. **Um contexto WebGL por página.** Vinhetas secundárias reusam o mesmo renderer (scissor/viewport ou troca de cena), nunca um canvas por card.
6. **Dispose** no `onCleanup` da ilha: parar loop → `scene.traverse` liberando geometrias, materiais e texturas → `renderer.dispose()` → `renderer.forceContextLoss()` → desconectar observers. Tratar `webglcontextlost` mostrando o still (iOS derruba contextos sob pressão de memória).

## 4. Scrollytelling

Suporte atual (BCD 8.1.4 + web-features 3.40.1):

| Recurso | Chrome | Safari | Firefox 157 | Baseline |
|---|---|---|---|---|
| Scroll-driven animations (`animation-timeline: view()/scroll()`, `animation-range`) | 115+ | 26+ | **não no estável** (BCD: só preview; flag `layout.css.scroll-driven-animations.enabled`) | não |
| View Transitions same-document (`startViewTransition`, `view-transition-name/class`) | 111+ | 18+ | 144+ | **sim** (2025-10-14) |
| View Transitions cross-document (`@view-transition { navigation: auto }`) | 126+ | 18.2+ | não | não |
| `IntersectionObserver` | 51+ | 12.1+ | 55+ | amplo |

**Regras.**
- **Scroll nativo, sempre.** Sem scroll-jacking, sem `wheel` interceptado, sem pin que prenda o leitor. Âncoras, `Page Down`, busca do navegador e leitores de tela funcionam como em qualquer página.
- **Estado final primeiro.** Todo conteúdo é legível sem animação; a animação parte do estado final. CSS dentro de `@supports (animation-timeline: view())` **e** `@media (prefers-reduced-motion: no-preference)`. No Firefox o leitor vê o layout estático — aceitável e honesto.
- **IntersectionObserver** para o que é discreto: seção ativa (`aria-current` na barra `[WORLD] [PEOPLE] …`), keyframe-alvo da câmera 3D, preset do mixer de som. Progresso contínuo dentro da seção ativa: um `rAF` lendo `getBoundingClientRect()` só daquele elemento (listener `scroll` passivo apenas marca "sujo").
- Barras fixas não podem cobrir foco (WCAG 2.4.11): `scroll-padding-top/bottom` = altura das barras. `scroll-behavior: smooth` só sob `no-preference`.

**Transições entre páginas: `<ClientRouter />` (Astro), não MPA puro.** Motivo decisivo: o som ambiente e o canvas precisam **sobreviver à navegação**. Num MPA cada documento novo nasce sem ativação do usuário e o `AudioContext` volta suspenso. Com `transition:persist` a ilha de áudio (e a do 3D, se estiver no layout) mantém estado entre páginas. Bônus: usa a API same-document, que é Baseline (inclui Firefox 144+); `fallback="swap"` nos demais; o ClientRouter já desliga animações sob `prefers-reduced-motion` e anuncia a troca de rota. Custos: scripts precisam ouvir `astro:page-load`; analytics e foco precisam ser testados ([docs Astro](https://docs.astro.build/en/guides/view-transitions/)). Plano B (se o ClientRouter der atrito): MPA + `@view-transition { navigation: auto; }` só em CSS, aceitando som que pede novo clique por página.

**Lenis/GSAP: não.** Lenis 1.3.26 reimplementa a inércia do scroll (conflita com reduced motion, zoom e tecnologias assistivas) para resolver um problema que este site não tem. GSAP 3.15 + ScrollTrigger resolveria a timeline, mas CSS + IO + ~1 KB de código próprio cobrem os 5 capítulos. Reavaliar GSAP só se a abertura (`[ENTER THE ARCHIVE]`) exigir coreografia que CSS não expresse.

## 5. Som generativo (Web Audio)

Tudo sintetizado em tempo real: **zero arquivos de áudio**, zero música do jogo (a seção THE SOUND faz análise escrita e aponta para fontes oficiais). Código carregado por `import()` só no opt-in (≤ 6 KB gz).

**Política de autoplay.** Um `AudioContext` criado sem gesto nasce `suspended`; Safari exige gesto para `resume()`. Logo: o contexto só é criado no clique de `[SOUND: OFF]` → `await ctx.resume()`. `navigator.getAutoplayPolicy()` só existe no Firefox (BCD) → não usar. iOS: o botão de silencioso cala o Web Audio; definir `navigator.audioSession.type = 'playback'` (Safari 16.4+, BCD) **depois** do opt-in, já que é escolha explícita do usuário.

**Grafo** (`src/audio/`):

```
drone ─┐   2–3 OscillatorNode (saw/triangle, ex. 55 Hz + 55.4 Hz + 82.4 Hz) → BiquadFilter lowpass 300–800 Hz com LFO 0.05 Hz
wind  ─┤   AudioBuffer de ruído rosa (2 s, gerado 1×, loop) → bandpass Q 1–3, frequência em random walk (setTargetAtTime a cada ~2 s)
bells ─┼─→ bus Gain ×4 → ConvolverNode (IR procedural: ruído com decaimento exp. 3.5 s = "nave de pedra") → master Gain → DynamicsCompressor (limiter) → destination
organ ─┘   aditivo (PeriodicWave, harmônicos 1,2,3,4,6,8), ataque lento, acordes modais esparsos (dórico/frígio), ganho baixo
```

- Sinos: parciais inarmônicos de Risset (razões ≈ 0.56, 0.92, 1.19, 1.71, 2.0, 2.74, 3.0, 3.76, 4.07), cada um com decaimento exponencial próprio; disparo aleatório a cada 8–25 s.
- Mixer: 4 sliders + master; toda mudança via `gain.setTargetAtTime(v, now, 0.1)` (sem cliques). Fade-in 2 s ao ligar, fade-out 0.6 s antes de `ctx.suspend()`.
- Presets por seção (via IO): THE PLACE = vento + drone; THE INCIDENT = drone grave + sinos; THE SOUND = órgão.
- `visibilitychange` oculto → `suspend()`; visível → `resume()` só se o usuário tinha ligado.
- **Persistência:** `localStorage['nemeton:sound'] = { enabled, volumes }` (em try/catch). Ao voltar ao site com `enabled: true`, **não** tocar sozinho: mostrar pílula `RESUME SOUND` (o gesto continua obrigatório e o usuário não é surpreendido). WCAG 1.4.2: controle de parar sempre visível e alcançável por teclado (`aria-pressed`).
- Teste: `OfflineAudioContext` em Vitest browser mode renderiza 2 s de cada voz → afirma não-silêncio e pico < 1.0 (sem clipping). Funções de agenda (próximo sino, acordes) são puras e testadas sem áudio.

## 6. CRT, ruído e fotossensibilidade

Overlays em um único elemento fixo `pointer-events: none`, **acima do 3D e abaixo do texto principal** (texto nunca recebe ruído).

| Efeito | Implementação | Custo | Regra |
|---|---|---|---|
| Scanlines | `repeating-linear-gradient(to bottom, rgb(0 0 0 / .16) 0 1px, transparent 1px 3px)` | ~zero (estático, rasterizado 1×) | nunca animar `background-position` (repinta a cada frame) |
| Grain | SVG `feTurbulence` (`fractalNoise`, `baseFrequency .8`, `stitchTiles="stitch"`) **como data-URI de tile 160×160 em `background-image`** | rasteriza 1× e vira imagem | **não** usar `filter: url(#grain)` em conteúdo: refiltra a cada paint. Animar = `transform` em saltos (`steps(4)`, ~8 fps) de camada maior que a viewport; parado sob reduced motion |
| Vinheta | `radial-gradient(transparent 55%, rgb(0 0 0 / .55))` | ~zero | — |
| Aberração/glitch | só no título da abertura, 1× ao entrar | baixo | nunca em loop, nunca em texto de leitura |
| Evitar | `backdrop-filter` e `mix-blend-mode` em overlays de tela cheia animados, `filter: blur()` animado | alto em mobile | — |

**Fotossensibilidade (WCAG 2.3.1, nível A).** Nada pisca mais de 3 vezes em qualquer 1 s, ou fica abaixo dos limiares geral e de vermelho. Limiar geral: par de variações opostas de luminância relativa ≥ 10% com a mais escura < 0,80, quando a área somada dos flashes simultâneos passa de 25% de um campo visual de 10° — que a WCAG aproxima por um retângulo de 341×256 px numa tela de 1024×768 (logo, > ~21,8 mil px² a essa escala) ([Understanding 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html)). Regras do projeto:
1. Chama/lanterna no 3D: ruído suave < 2 Hz e amplitude < 8% de luminância.
2. Grain com opacidade ≤ 0,06 e luminância média constante (o padrão muda, a média não).
3. Vermelho saturado (`--blood`) nunca anima opacidade/brilho; transições de cena = fade ≥ 400 ms, nunca corte preto↔branco.
4. Toggle global `[MOTION: ON/OFF]` (WCAG 2.2.2 para animação automática > 5 s: névoa, grain, câmera ociosa), inicializado por `prefers-reduced-motion`.
5. Antes do lançamento: gravar a abertura e o modo NEMETON e passar num analisador de flashes (ex.: PEAT, Trace Center) — critério de aceite.

## 7. Conteúdo: coleções, MDX, fontes, busca

**Astro 7 muda três coisas que afetam o PRD:** (1) toda coleção build-time precisa de `loader` explícito em `src/content.config.ts` (acabou a descoberta implícita de `src/content/`); (2) o Markdown padrão é o **Sätteri**, não remark/rehype — plugins unified exigem instalar `@astrojs/markdown-remark` e trocar `markdown.processor`; (3) o compilador agora é em Rust e **falha** com HTML inválido ou tag não fechada (bom para qualidade, ruim para MDX descuidado). MDX 8 usa o mesmo processador do `.md` e herda GFM (inclui **notas de rodapé**) por padrão ([upgrade v7](https://docs.astro.build/en/guides/upgrade-to/v7/), [markdown](https://docs.astro.build/en/guides/markdown-content/), [mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/)).

```ts
// src/content.config.ts — Zod 4 via astro/zod (astro depende de zod ^4.6.5)
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
const sources = defineCollection({
  loader: file('src/content/sources.yaml'),            // lista; cada item tem `id`
  schema: z.object({ title: z.string(), author: z.string().optional(), publisher: z.string().optional(),
    date: z.string() /* '1999-12' */, kind: z.enum(['primary', 'press', 'interview', 'manual', 'reference', 'fan']),
    url: z.url().optional(), archived: z.url().optional(), accessed: z.string().optional() }),
});
const characters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/characters' }),
  schema: ({ image }) => z.object({ caseNo: z.number().int(), name: z.string(), roles: z.array(z.string()).max(4),
    status: z.string(), location: z.string(), portrait: image().optional(),
    related: z.array(reference('characters')).default([]), places: z.array(reference('places')).default([]),
    sources: z.array(reference('sources')).min(1) }),     // página sem fonte não compila
});
export const collections = { sources, characters /* places, incidents, notes: mesmo molde */ };
```

**Fonte por afirmação.** Nota de rodapé GFM padrão + componente que resolve o id na coleção `sources`:

```mdx
Kikuta wrote and scored the game.[^kikuta]

[^kikuta]: <Source id="famitsu-1999-xx" loc="p. 34" />
```

`<Source>` faz `getEntry('sources', id)` e lança erro de build se não existir (id errado = CI vermelho). O GFM cuida de numeração, `id`s e links de volta. `<Ref to="characters/edward-plunkett">Edward</Ref>` faz o mesmo para referências cruzadas. Backlinks ("Mentioned in") saem de uma função pura `buildBacklinks(entries)` que inverte os `reference()` — testada em Vitest. Screenshots/arte em pixel: **não** passar pelo `<Image>`/sharp (redimensiona com Lanczos e borra); servir o PNG original e ampliar por CSS com `image-rendering: pixelated` em múltiplos inteiros.

**Busca: Pagefind 1.5.2**, como `postbuild` (`pagefind --site dist`). Indexar só `data-pagefind-body` dos arquivos; facetas com `data-pagefind-filter="type:character"`. UI própria em Solid chamando `const pf = await import('/pagefind/pagefind.js'); await pf.search(q)` **no primeiro foco** do campo → 0 KB no carregamento inicial. Peso declarado pelo projeto: "< 300 kB num site de 10.000 páginas, perto de 100 kB para a maioria" ([pagefind.app](https://pagefind.app/)); para ~60–120 páginas espere bem menos (os fragmentos vêm sob demanda). A Component UI nova do 1.5 é opcional — a nossa precisa da voz do arquivo. `astro-pagefind` 2.0.1 aceita Astro 7, mas o CLI direto é mais simples.

## 8. Stack final e orçamentos

| Camada | Escolha (versão) | Porquê |
|---|---|---|
| Framework | Astro **7.3.x**, `output: 'static'` | HTML primeiro, ilhas, content collections tipadas; o conteúdo é o produto |
| Interatividade | SolidJS **1.9.x** + `@astrojs/solid-js` **7.0.x** | 4.8 KB br de runtime; sinais mapeiam 1:1 para uniforms e mixer; preferência do Renan. Solid 2 (RC) fica para depois |
| Linguagem | TypeScript **~6.0.3** `strictest` (`astro/tsconfigs/strictest`) | `@astrojs/check` 0.9.10 ainda exige TS ^5 \|\| ^6; TS 7 quando o check aceitar |
| 3D | three **~0.186.1**, `WebGLRenderer` + `ShaderMaterial` GLSL3, `GLTFLoader` + meshopt | 135 KB br vs 244 KB do WebGPU; afim/snap triviais em GLSL |
| Assets | Blender → `.glb` → `@gltf-transform/cli` **4.5.x** (`optimize` + `meshopt`) + checagem em CI | sem Draco, sem KTX2 (§2) |
| Conteúdo | content collections (`glob`/`file`, `astro/zod`), `@astrojs/mdx` **8.0.x**, Sätteri | referências validadas no build; notas GFM |
| Scroll/transições | CSS scroll-driven (progressivo) + IO; `<ClientRouter />` com `transition:persist` | scroll nativo; som e 3D sobrevivem à navegação |
| Som | Web Audio puro, procedural | 0 bytes de mídia, sem direitos autorais em jogo |
| Busca | Pagefind **1.5.2** + UI Solid própria, lazy | estático, sem servidor, ~0 KB até usar |
| Testes | Vitest **5.0.x** (+ `@vitest/browser-playwright` 5.0.3 para WebGL/áudio), Playwright **~1.64.0** (E2E, axe, regressão visual dos stills) | funções puras em `src/lib/` cobrem a lógica; browser só para o que precisa de GPU/áudio |
| Build | Vite **8.3.x** (Rolldown), Node ≥ 22.12 | exigência do Astro 7 e do Vitest 5 |

**Orçamentos** (falham o CI; Lighthouse mobile com throttling padrão + `size-limit`/script próprio sobre `dist/`):

| Métrica | Alvo | Teto CI | Nota |
|---|---|---|---|
| LCP | ≤ 2.0 s lab / ≤ 2.5 s p75 | 2.5 s | elemento LCP = still do herói ou título |
| CLS | ≤ 0.02 | 0.05 | canvas sobre still de mesmo `aspect-ratio`; fallback de fonte com `size-adjust` |
| INP | ≤ 150 ms | 200 ms | `compileAsync` antes do 1º frame; nada de 3D no handler de clique |
| TBT (lab) | ≤ 150 ms | 200 ms | import do 3D só após LCP |
| JS inicial (gz) | ≤ 25 KB | 35 KB | Solid + barra + toggles + ClientRouter; 3D, áudio e busca fora |
| Chunk 3D (gz / br) | ≤ 170 / 140 KB | 180 KB gz | medido 163/135 KB para three + loader + meshopt |
| Modelos por página (br) | ≤ 150 KB herói | 400 KB | §2 |
| Fontes | 2 famílias, ≤ 4 woff2, ≤ 100 KB, 1 preload | 120 KB | subset latino + diacríticos (Iasant, O'Flaherty, Émigré) |
| CSS (gz) | ≤ 25 KB | 30 KB | — |
| Imagens 1ª dobra | ≤ 150 KB | 250 KB | still ≤ 60 KB |
| Áudio | 0 KB de mídia; código ≤ 6 KB gz no opt-in | 8 KB | — |
| Frame 3D | 30 fps estáveis no tier `full`, 20 no `lite` | — | medir em aparelho real (lacuna) |

## Riscos técnicos

| Risco | Impacto | Mitigação |
|---|---|---|
| Astro 7 é jovem (major em 2026-06) e mudou compilador (Rust, HTML estrito), Markdown (Sätteri) e Vite 8/Rolldown | MDX/plugins quebram; menos exemplos na web | fixar `~7.3.x`; nada de plugins remark; spike de 1 dia (TASK de setup) validando MDX + notas + Solid + `astro check` |
| `@astrojs/check` não aceita TS 7 | `astro check` falha ou instala TS duplicado | fixar `typescript ~6.0.3`; revisar a cada release do check |
| Solid 2.0 sai do RC no meio do projeto | tentação de migrar; integração exige ^1.9 | travar 1.9.x na v1; migração = P2 |
| Three solta release mensal e prioriza WebGPU/TSL | API/GLSL chunks mudam; `onBeforeCompile` é frágil por natureza | fixar `~0.186.1`; `PsxMaterial` é shader próprio (não depende de chunks além de `linearToOutputTexel`); teste visual dos stills detecta regressão |
| Firefox sem scroll-driven e sem VT cross-document | experiência diferente por engine | estado-final-primeiro; ClientRouter usa VT same-document (Baseline) |
| iOS: perda de contexto WebGL, botão de silencioso, memória | canvas preto, som mudo | still no `webglcontextlost`; `audioSession.type = 'playback'`; 1 contexto por página |
| Shader compile/jank em Android fraco; render por software | INP ruim, bateria | `failIfMajorPerformanceCaveat`, tier `lite`, cap de fps, `compileAsync` |
| CDN não comprime `.glb` | modelos 3–5× maiores | teste de `content-encoding` no CI; fallback: servir como `.bin` com tipo comprimível |
| Flashes (lanterna, glitch, transições) | violação WCAG 2.3.1 (nível A) e risco real a pessoas | regras §6 + análise com PEAT como aceite |
| Sharp/`<Image>` borra pixel art | perde a identidade | pixel art fora do pipeline de imagem; lint de imports |
| Texto essencial dentro do 3D | ilegível com jitter e inacessível | regra: todo texto é DOM; 3D é ilustração (`aria-hidden`, descrição no still) |
| `transition:persist` + scripts re-executados | listeners duplicados, vazamento de contexto | `astro:page-load` + `onCleanup` obrigatórios; teste E2E navegando 10× e checando contagem de contextos |

## Lacunas

- **Não medido aqui:** peso real do ClientRouter no Astro 7; payload do Pagefind para este site; Lighthouse/INP em aparelho real; fps do `PsxMaterial` em Android de entrada. Fazer na task de spike, não chutar.
- `image()` no schema: usado como nas versões anteriores; a página de coleções do v7 não o mencionou no trecho lido — confirmar no spike.
- Opção `features.gfm.footnotes` do Sätteri: confirmar rótulo/`aria` das notas geradas (a11y das notas de rodapé) e se `<Source>` dentro da definição da nota renderiza no Sätteri.
- Fonts API do Astro 7 (estável ou experimental?) não verificada; o orçamento de fontes vale para qualquer caminho (self-host + subset).
- Versões de `@axe-core/playwright` e Lighthouse CI não foram consultadas.
- TSL: o caminho `setInterpolation('linear')` no fallback WebGL2 não foi testado (ver §1); irrelevante enquanto ficarmos em GLSL.
- `@types/three` está em 0.186.0 (o core em 0.186.1) — conferir compatibilidade no setup.

## Fontes

- **npm registry** (`/latest` + `time`, 2026-10-08): astro, solid-js, @astrojs/{solid-js,mdx,check}, three, @types/three, vite, vitest, @vitest/browser-playwright, @playwright/test, @gltf-transform/{core,cli}, meshoptimizer, pagefind, astro-pagefind, typescript, zod, lenis, gsap (snapshot em `npmmeta/`, `npmfull/`). **BCD** 8.1.4 + **web-features** 3.40.1 (`bcd/`).
- **Código local:** `gt-cli/package/src/cli.ts` (gltf-transform 4.5.1); `bench-deps/node_modules/three` r186 (`GLSLNodeBuilder.js`, `meshlambert.glsl.js`, `WebGLRenderer.js`, decoders); bundles em `bench-src/out/` (gzip -9 / brotli -q 11).
- **Astro:** [upgrade v7](https://docs.astro.build/en/guides/upgrade-to/v7/) · [content collections](https://docs.astro.build/en/guides/content-collections/) · [markdown](https://docs.astro.build/en/guides/markdown-content/) · [mdx](https://docs.astro.build/en/guides/integrations-guide/mdx/) · [view transitions](https://docs.astro.build/en/guides/view-transitions/).
- **Three/WebGL:** [WebGPURenderer](https://threejs.org/manual/en/webgpurenderer) · [r186](https://cgworld.jp/flashnews/01-202610-Threejs-r186.html) · [NV_shader_noperspective_interpolation](https://registry.khronos.org/webgl/extensions/NV_shader_noperspective_interpolation) · [web3dsurvey](https://web3dsurvey.com/webgl2/extensions/NV_shader_noperspective_interpolation) · [DuckStation `DITHER_MATRIX`](https://raw.githubusercontent.com/stenzek/duckstation/master/src/core/gpu_types.h).
- **Plataforma:** [scroll-driven no Firefox](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026) · [VT cross-document](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) · [Pagefind](https://pagefind.app/) · [WCAG 2.3.1](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html).
