# PRD — KOUDELKA · THE NEMETON ARCHIVE

> **Some places remember what people choose to forget.**
> Um arquivo de fã sobre *Koudelka* (Sacnoth, 1999), contado como um dossiê de 1898 reaberto hoje, que se lê descendo.

| Campo | Valor |
|---|---|
| Autor | Renan Botasse |
| Estado | Rascunho v0.2 (revisado; implementação em andamento) |
| Data | 2026-10-08 |
| Tipo | Projeto autoral e de portfólio, sem fins comerciais |
| Referências | `TASKS.md` (backlog + identidade visual completa, §0) |
| Descrição pública (EN) | *A non-commercial fan archive exploring the world, characters, sound and legacy of Sacnoth's* Koudelka. |

> **Projeto independente.** O `CLAUDE.md` do Desktop descreve o noSignal (PHP, PostGIS, MapLibre). Nada daquilo se aplica aqui.

---

## 1. Contexto e problema

*Koudelka* (PlayStation, Japão em 16/12/1999, 4 discos) é um RPG gótico de culto. Tem uma ambientação fortíssima, o Mosteiro de Nemeton na noite de 31/10/1898, mas a informação sobre ele está espalhada em wikis de fãs, entrevistas antigas e vídeos soltos. Os poucos "sites de fã" são wikis: fichas planas, parágrafos longos, nenhuma atmosfera.

Isso deixa três lacunas:

1. **Falta um lugar que conte o jogo como experiência.** Os sites de Until Then e Pentiment mostram que a página pode ser parte da obra.
2. **Falta rigor visível.** Wikis misturam fato, boato e teoria sem dizer qual é qual.
3. **Falta um arquivo cuidadoso com spoilers e conteúdo sensível.** O jogo tem temas pesados e uma protagonista romani que costuma ser descrita com estereótipos.

**Proposta:** um site editorial e imersivo que apresenta Nemeton **como um dossiê**. A estrutura vem do arquivo (pastas, fichas, procedência, selos). O ritmo vem de uma descida vertical, do portão do mosteiro às criptas. O mundo é um ambiente low-poly **original**, com a atmosfera do PS1. Não é uma wiki e não recria o jogo.

### O conceito em uma frase

> **Um dossiê de investigação de 1898, reaberto em 2026, em que cada cópia é declarada, cada fato tem procedência e o scroll é uma lanterna baixada por uma corda.**

Nasce da fusão de duas ideias:

| Ideia | Origem | O que dá ao projeto |
|---|---|---|
| **O Dossiê** | Pentiment | A arquitetura de informação é a do arquivo: fundo → série → dossiê → item. Cada afirmação tem fonte. O formato do documento é a navegação. |
| **A Descida** | Until Then | A home é uma câmera que desce: portão, casa, nave, celas, cripta. Frases curtas, uma ideia por tela, ritmo de filme. |

Linha do site (EN): *Nothing here is the original. Everything here is evidence.*

## 2. Objetivos

### Produto
- **O1:** Em 90 segundos de scroll, a home faz o visitante **sentir** Nemeton e entender o que encontra em cada parte.
- **O2:** Cada personagem, lugar e objeto relevante tem uma página-dossiê com procedência (fontes citadas, grau de confiança).
- **O3:** O visitante controla o que revela: **nenhum spoiler por acidente**, avisos de conteúdo claros e acessíveis.
- **O4:** Dois modos de ler a mesma coisa: ARCHIVE (editorial, papel) e NEMETON (imersivo, escuro, mapa 3D).
- **O5:** Respeito: uma representação cuidadosa de Koudelka como mulher romani e zero material de terceiros hospedado sem necessidade.

### Portfólio (Renan)
- **P1:** Mostrar direção de arte, narrativa, interação, atmosfera e arquitetura de conteúdo, não só dashboards.
- **P2:** 3D com orçamento de desempenho real, carregado só quando vale a pena, com fallback estático.
- **P3:** Conteúdo tipado e validado no build, acessibilidade a sério (WCAG 2.2 AA), som gerativo sem um byte de áudio de terceiros.
- **P4:** Uma página *"How this archive was made"* que mostra o processo, como o making-of do Pentiment.

### Não-objetivos (v1)
- Hospedar música, vídeo, ROMs, ISOs ou FMVs do jogo.
- Recriar cenários do jogo ou usar logo e key art oficiais como identidade.
- Wiki aberta, comentários, login ou backend próprio.
- Monetização de qualquer tipo.
- Multi-idioma (v1 só em inglês; PT-BR é possibilidade depois).
- Um jogo jogável. O mapa 3D é navegação, não gameplay.

## 3. Públicos

| Persona | O que quer | Ação principal |
|---|---|---|
| **Fã antigo** | Reencontrar o clima e confirmar detalhes (datas, nomes, trilha) | Ler os arquivos de personagem e `/archive` |
| **Curioso que nunca jogou** | Entender o que é, sem spoiler | Descer a home e abrir 1–2 fichas |
| **Quem acabou de jogar** | Entender o que viu, os finais, o elo com *Shadow Hearts* | Romper o selo `ENDINGS` |
| **Recrutador / diretor de arte / dev** | Avaliar a qualidade do trabalho em poucos minutos | Home → `/made` → alternar os modos |
| **Pesquisador / jornalista** | Fatos citáveis, linha do tempo, fontes | `/archive`, `/sources`, botão `[ CITE ]` |

## 4. Métricas de sucesso

Sem cookies de tracking. Analytics opcional e sem cookies (Plausible ou Umami), carregado só se `PUBLIC_ANALYTICS_DOMAIN` existir; o objetivo é **não ter banner de cookies**.

| Métrica | Como medir | Meta |
|---|---|---|
| Chegar à cripta | evento `descent:crypt` / sessões na home | ≥ 25% |
| Uso do mapa | evento `mode:nemeton` | ≥ 15% das sessões em desktop |
| Som por opção própria | evento `sound:on` | ≥ 8% (e **zero** autoplay) |
| Selo `ENDINGS` rompido | evento `seal:endings` | acompanhar |
| Desempenho | Lighthouse mobile em todas as páginas | ≥ 95 |
| Acessibilidade | axe-core nos E2E | 0 violações |
| Portfólio | o link vira case no CV e no GitHub | feito até o lançamento |

---

## 5. Funcionalidades

Prioridade: **P0** = v1 obrigatório · **P1** = lançamento completo · **P2** = depois.

### 5.1 Home — `/` · "The Descent" (P0)

Uma página só, 12 blocos, ~7 segundos cada. Regras: ≤ 45 palavras por bloco, ≤ 160 vh por bloco, página ≤ 1.500 vh; a frase de abertura de cada bloco tem ≤ 7 palavras; **qualquer posição de scroll congelada num print é legível** (o estado final vem primeiro, a animação só embeleza).

| # | Bloco | Estrato | Copy-chave (EN) |
|---|---|---|---|
| 0 | **The Cliff** | fora dos muros | `THE NEMETON ARCHIVE` · *Some places remember what people choose to forget.* · `[ ENTER THE ARCHIVE ]` · *Scroll to descend.* |
| 1 | **The Gate** | disco 1 de 4 | *All-Hallows' Eve, 1898. A monastery on the cliffs of Wales. The gates are locked. Someone inside is calling.* |
| 2 | **The Name** | disco 1 | `[ ne · me · ton ]` *A Celtic sacred place; a grove set apart.* · **You come in the way she did: over the wall.** |
| 3 | **The Section** | disco 1 | *Three levels. Tower. Ground. Below. One night to cross them all.* → `/walkthrough` |
| 4 | **The House** | disco 2 | 3 fichas (Koudelka, Edward, James) → `/people` |
| 5 | **The Nave** | disco 2 | *Before it was a house, it was a prison. Before it was a prison, it was a monastery. Before it was a monastery, it was holy ground.* |
| 6 | **Midnight** | fim do disco 2 | `XII` · `DISC 2 OF 4 ENDS HERE. PLEASE INSERT DISC 3.` |
| 7 | **The Cells** | disco 3 | gaveta de atos do `/story` (3 abertos, o resto lacrado) |
| 8 | **The Sound** | disco 3 | *We host none of it. The sound on this page is ours, made live, only if you ask.* |
| 9 | **The Crypt** | disco 4 | catálogo de 14 arquivos → `/archive` |
| 10 | **The Record** | disco 4 | 3 lançamentos + *2026 · No re-release.* |
| 11 | **Dawn** | torre, selada | *What it finds there is sealed.* · `[ UNSEAL THE ENDINGS ]` |
| 12 | Rodapé | — | texto legal (§10) |

**A virada:** a página inteira desce, e só uma coisa sobe, o final. Se o visitante rompe o selo `ENDINGS`, a câmera sobe até a torre. Quem não rompe termina embaixo, na cripta, com o arquivo.

**Os quatro discos são estrutura editorial.** O jogo tem 4 discos em todas as versões, mas a única fronteira de disco que dá para datar é o fim do disco 2, à meia-noite, na nave. O bloco 6 diz isso em voz alta no próprio site.

**Critérios de aceitação**
- [ ] Sem JS e sem WebGL, a home é uma página longa, completa e legível.
- [ ] Em 390×844, o bloco 0 mostra título, frase e CTA sem scroll.
- [ ] `[ ENTER THE ARCHIVE ]` é uma âncora (`#gate`) que funciona sem JS.
- [ ] Nenhum bloco usa scroll-jacking; o scroll é sempre o nativo.
- [ ] O único movimento ascendente da câmera acontece depois de romper o selo `ENDINGS`.

### 5.2 O mundo — `/walkthrough` e `/walkthrough/[slug]` (P0)

**The Section:** um mapa em corte do mosteiro. No ARCHIVE MODE é uma gravura SVG; no NEMETON MODE levanta em 3D low-poly com câmeras fixas. Ao lado, a lista de salas por estrato (torre / térreo / subsolo) e o palimpsesto histórico: santuário → mosteiro → prisão → mansão → ruína.

**Páginas de sala** (14 POIs): gates and walls, stables, caretakers' quarters, storage room, library, church nave, inner grounds, graveyard, Patrick's quarters, prison, Charlotte's cell, underground passage, church crypt, bell tower. Cada uma traz o que acontece ali, o nível de spoiler, um still e os arquivos ligados. Seis primeiras são P0; as outras P1.

**Critérios de aceitação**
- [ ] O mapa 3D é **um** caminho para as salas, nunca o único: toda sala tem URL e link na lista.
- [ ] O mapa funciona só com teclado (setas/Tab entre salas, Enter abre).
- [ ] Sem WebGL, a gravura SVG assume, com os mesmos pontos clicáveis.
- [ ] Salas `STORY`/`ENDINGS` aparecem na lista, com o texto selado.
- [x] Implementado: mapa 3D com 15 câmeras fixas (`src/world/views.ts`), gravura SVG e lista.

### 5.3 Pessoas — `/people` e `/people/[slug]` · "Register of Persons" (P0)

O elenco como livro de hóspedes da noite, em 3 grupos: *The Guests* (Koudelka, Edward, James) · *The House* (Ogden e Bessy Hartman, Charlotte D'Lota, Patrick e Elaine Heyworth) · *The Others* (Roger Bacon, Alias).

Cada pessoa é um **CASE FILE** com ficha, papel na história, relações, procedência e a camada selada. O trio de protagonistas é P0; os demais, P1.

```text
CASE FILE 002
KOUDELKA IASANT
MEDIUM · EXILE · WITNESS
AGE 19 · STATUS: UNKNOWN · LAST SEEN: NEMETON
[ OPEN FILE 002 ]
```

Decisões editoriais que valem como regra de produto:
- **EXILE, não TRAVELLER.** No Reino Unido e na Irlanda *Traveller* designa os *Irish Travellers*, outro grupo étnico, e reforça o tropo nômade. *Exile* é o fato do jogo: ela foi banida.
- Âncoras históricas reais ficam **separadas** da ficção: Edward Plunkett × Lord Dunsany, o Roger Bacon histórico (c. 1219–1292) × o imortal do jogo, o naufrágio do *Princess Alice* (1878).
- A ficha dela é a única que leva uma nota editorial sobre linguagem (§10.4).

**Critérios de aceitação**
- [ ] Toda ficha mostra `spoilerLevel` e o código de referência (`NA·B·002`).
- [ ] Nenhum `alt`, `og:description` ou metadado carrega spoiler.
- [ ] Os campos da ficha vêm do conteúdo tipado; nada de texto solto no template.

### 5.4 A noite — `/story` e `/story/endings` · "The Incident Report" (P0 / P1)

A noite de 31/10/1898 em 9 atos (Prólogo → Epílogo), escrita como relatório. O marcador `END OF DISC 2 · MIDNIGHT` fica depois do ato IV. Atos I–II são abertos; os seguintes ficam selados (`STORY`).

`/story/endings` (**P1**), "Three Dawns": os três finais lado a lado, uma folha por final. Só renderiza o conteúdo com o selo `ENDINGS` rompido (sem JS: `<details>` duplo).

**Critérios de aceitação**
- [ ] O build **falha** se um bloco de nível de spoiler maior aparecer fora do seu contêiner.
- [ ] Sem JS, os selos funcionam como `<details>`.
- [ ] Os finais ficam atrás de um selo próprio (`/story/endings`), que nunca abre sozinho. Um `Reveal endings` global persistente é P2.

### 5.5 Som — `/sound` · "The Sound of Nemeton" (P0)

Um ensaio escrito sobre a trilha (Hiroki Kikuta, *Koudelka Original Soundtrack*, Pony Canyon, PCCB-00396, 1/12/1999, 34 faixas) **mais** um console de som gerativo, original.

- **Nenhuma música hospedada.** Links e embeds só para fontes oficiais, com fachada de clique (`youtube-nocookie`). Se não houver fonte oficial online, não se embute nada.
- **Som do site:** Web Audio puro, procedural (vento, pedra, sino, coro distante, drone de órgão sintetizado). 0 KB de mídia. Começa **desligado**; só liga com ação explícita; o mixer tem 4 canais e a preferência persiste.
- Cada estrato da descida tem um preset sonoro.

**Critérios de aceitação**
- [ ] Nenhum áudio toca antes de um gesto explícito do usuário.
- [ ] O som sobrevive à navegação entre páginas (sem cortar e sem reiniciar).
- [ ] `SOUND: OFF` e `MOTION` são visíveis em toda página, sem esconder atrás de menu.
- [ ] Sem Web Audio, o console mostra `SOUND UNAVAILABLE` e a página segue íntegra.

### 5.6 Arquivo — `/archive` · "The Vault" (P0 / P1)

Índice dos 14 CASE FILES + as prateleiras `DEVELOPMENT NOTES`, `RELEASE HISTORY`, `LEGACY` e `SOURCES`.

| Rota | Conteúdo | Prioridade |
|---|---|---|
| `/archive` | catálogo, filtros (tipo, spoiler), busca | P0 |
| `/archive/files/[nnn-slug]` | arquivos que não são pessoa nem sala: The Monastery, The Princess Alice, The Emigre Document, The Pendant, The Unexplained Events, Three Dawns | P1 |
| `/archive/making` | Sacnoth, Kikuta, captura de movimento, equipe | P1 |
| `/archive/releases` | 3 lançamentos, 4 discos, linha do tempo 1997–2026 | P1 |
| `/archive/legacy` | *Shadow Hearts*, 25 anos, culto, preservação | P1 |
| `/sources` | bibliografia com selo de confiança | P0 |

**Linha do tempo (P0 mínimo, implementada em `/archive/releases`):** 16/12/1999 Japão (SNK, 4 discos) · 29/06/2000 América do Norte (Infogrames, ESRB M) · 27/09/2000 Europa (Infogrames) · 2026 sem relançamento.

**Critérios de aceitação**
- [ ] Toda afirmação factual cita uma fonte em `/sources`; toda fonte tem tipo e grau de confiança (ALTA / MÉDIA / BAIXA).
- [ ] Datas sem confirmação de dia aparecem só com mês/ano.
- [ ] Botão `[ CITE ]` copia o código e a URL canônica.

### 5.7 Os dois modos (P0)

| | **ARCHIVE MODE** (padrão) | **NEMETON MODE** |
|---|---|---|
| Sensação | papel, tinta, margem, leitura | carbono escuro, névoa, mapa 3D |
| Superfície | folha `--paper` com texto `--ink` | folha escura `--crypt` com texto `--paper` |
| Mapa | gravura SVG | mapa low-poly com câmeras fixas |
| 3D | nenhum | cena do mosteiro e objetos "examine" |
| Custo | 0 KB de 3D | chunk de 3D carregado sob demanda |

Alterna por um controle fixo no topo (`[ ARCHIVE | NEMETON ]`). A preferência persiste. Sem WebGL, ou com `prefers-reduced-motion`, o NEMETON MODE continua existindo (paleta escura + stills pré-renderizados), só sem câmera viva.

### 5.8 Global (P0)

- **Navegação:** `WORLD · PEOPLE · STORY · SOUND · ARCHIVE` (ordem = ordem de descida). Desktop: barra superior fixa de 48 px, nunca escondida por efeito. Mobile: barra inferior de 56 px, 5 palavras em mono, sem ícones.
- **Trilho de profundidade** (`DepthRail`): só em `/` e `/walkthrough`; um corte vertical do mosteiro com 7 marcos; é navegação de verdade (`<nav>` com âncoras).
- **Controles sempre visíveis:** modo, `MOTION`, `SOUND`, busca (`/`).
- **Busca** Pagefind, carregada sob demanda.
- **Páginas de serviço:** `/content-notes`, `/about` (colofão legal), `/made`, `/sources`, `/404` (*"This room was never built."*).
- **Cartão de leitor** (P1): "memory card" de 15 blocos guardado no navegador, com o progresso da descida e os arquivos lidos. Nada sai do navegador.

---

## 6. Conteúdo

**Princípio:** texto próprio, sempre. Wikis são mapa de fontes, nunca texto a copiar (CC BY-SA obriga ShareAlike). Citações do jogo são curtas e atribuídas.

### 6.1 Os 14 CASE FILES (v1)

| Nº | Título | Tipo de documento | Spoiler |
|---|---|---|---|
| 001 | The Monastery | mapa + relatório arquitetônico | nenhum |
| 002 | Koudelka Iasant | ficha de identificação | nenhum |
| 003 | Edward Plunkett | ficha + nota marginal "cf. Lord Dunsany" | leve |
| 004 | James O'Flaherty | carta de apresentação (ficcional, sem brasão real) | leve |
| 005 | The Caretakers | foto de casal + inventário da despensa | leve (grave oculto) |
| 006 | The Princess Alice | recorte (texto próprio) | leve → grave |
| 007 | Charlotte | maço de cartas | grave |
| 008 | Roger Bacon | ficha de catálogo de biblioteca | leve |
| 009 | The Emigre Document | ficha de objeto, com proveniência | leve → grave |
| 010 | Elaine | retrato + diário de Patrick | grave |
| 011 | The Pendant | ficha de objeto + mapa | leve |
| 012 | Alias | depoimento | grave |
| 013 | The Unexplained Events | relatório com linha do tempo hora a hora | grave (em camadas) |
| 014 | Three Dawns | três folhas paralelas | grave |

**Regra editorial:** todo documento é *reconstrução de fã assinada como ficção* e leva o carimbo `FAN RECONSTRUCTION · NOT AN ORIGINAL DOCUMENT`. Nunca imita papel timbrado, brasão ou marca real (Vaticano, jornais).

### 6.2 Três estratos por arquivo

Como folhas de papel cebola sobrepostas, cada arquivo tem: **1898** (a ficção) · **1999** (a produção do jogo) · **2026** (as fontes). O leitor alterna entre eles sem sair da página.

### 6.3 Spoilers: três níveis

| Nível | Conteúdo | Tratamento |
|---|---|---|
| `NONE` (padrão) | premissa até a entrada em Nemeton, ambientação, produção, som | visível |
| `STORY` | identidades, mortes, segredos | `<details>` com `[SEALED — story spoilers]` |
| `ENDINGS` | os finais e o elo com *Shadow Hearts* | só com `Reveal endings` rompido |

### 6.4 Quem escreve e como entra conteúdo

Renan escreve em Markdown/MDX/YAML no repositório, validado por Zod no build (`people`, `places`, `acts`, `files`, `sources`). Selos de spoiler são o componente `Seal` (um `<details>`), não um plugin remark. Sem CMS na v1: é um projeto autoral, não precisa de editor externo.

---

## 7. Direção visual

> **A especificação completa e verificável está em `TASKS.md` §0.** Aqui vai o resumo; em caso de diferença, vale o `TASKS.md`.

### 7.1 Três camadas

| Camada | O que é | Estilo |
|---|---|---|
| **MUNDO** (fundo) | cena 3D low-poly, olhar PS1, original | baixa resolução, vértices que tremem, afim, dither, névoa |
| **DOCUMENTO** (meio) | toda a informação e toda a interface | papel e carbono: serifa de leitura, mono de metadados, fios finos, carimbos |
| **VIDRO** (frente) | o monitor CRT | grão, vinheta leve, scanlines suaves; tudo desligável |

**Regra de ouro:** se tem texto ou é clicável, é DOCUMENTO, e DOCUMENTO é legível. O PS1 vive no MUNDO, nunca no corpo do texto.

### 7.2 Decisões principais

- **Paleta** (contrastes WCAG calculados, TASKS §0.7): fundo `--soot #090d0e` · papel `--paper #e6dcc6` (14,9:1 sobre soot) · tinta `--ink #12100e` (14,0:1 sobre paper) · vermelho `--blood #8a1d2c` (6,8:1 sobre paper) · verde doente `--sick #6fa89a` (8,2:1) · dourado `--gilt #d9a441` (8,2:1).
- **Tipos:** Cinzel (títulos, agressivos), Newsreader (narrativa, serifada), IBM Plex Mono (metadados). Todas OFL, self-hosted.
- **Look PS1:** 320×240 internos com upscale nearest, vértices alinhados a uma grade, mapeamento afim de textura, dither Bayer 4×4, cor de 15 bits, névoa curta, 30 fps. Intensidade dosável de 0 a 1.
- **Movimento:** curto, em passos, nada pisca mais de 3×/s; `prefers-reduced-motion` e o botão `MOTION: OFF` desligam câmera, grão e glitch.
- **Honestidade:** cada carimbo, código e metadado é real (`NA·B·002`, datas, fontes), nunca ornamento falso.

### 7.3 O que fica na memória

O código de referência que funciona como breadcrumb · a troca de disco à meia-noite · o selo de cera que guarda o final · a câmera que sobe uma única vez · o mosteiro original, nunca o do jogo.

---

## 8. Arquitetura técnica

### 8.1 Stack (versões verificadas em 2026-10-08)

| Camada | Escolha | Porquê |
|---|---|---|
| Framework | **Astro 7.3.x** (`output: 'static'`) | HTML primeiro, ilhas, content collections tipadas; o conteúdo é o produto |
| Interatividade | **SolidJS 1.9.x** + `@astrojs/solid-js` 7.0.x | 4,8 KB br de runtime; sinais mapeiam para uniforms e mixer; Solid 2 ainda é RC, fica fora |
| Linguagem | **TypeScript ~6.0.3** (`strictest`) | `@astrojs/check` ainda exige TS ≤ 6; sobe para 7 quando aceitar |
| 3D | **three ~0.186.1**, `WebGLRenderer` + `ShaderMaterial` GLSL3 | 135 KB br contra 244 KB do WebGPU; snap e afim são triviais em GLSL |
| Assets 3D | Blender → `.glb` → `@gltf-transform/cli` 4.5.x (`optimize` + meshopt) | sem Draco, sem KTX2 |
| Conteúdo | content collections + `@astrojs/mdx` 8.0.x + Zod 4 | referências cruzadas validadas no build |
| Transições | CSS scroll-driven (progressivo) + `IntersectionObserver` + `<ClientRouter />` com `transition:persist` | scroll nativo; som e 3D sobrevivem à navegação |
| Som | Web Audio puro, procedural | 0 KB de mídia, 0 direitos em jogo |
| Busca | **Pagefind 1.5.x** + UI Solid própria | estática, sem servidor |
| Estilo | CSS moderno + tokens em custom properties (sem Tailwind) | controle fino da identidade |
| Testes | **Vitest 5**, **Playwright ~1.64**, axe-core | lógica em funções puras; browser só para GPU e áudio |
| Build | Vite 8 (Rolldown), Node ≥ 22.12 | exigência do Astro 7 e do Vitest 5 |
| Hosting | Cloudflare Pages (ou Vercel) | CDN, preview por PR, `_headers` |

Fora, de propósito: Lenis e GSAP (scroll nativo), WebGPU/TSL, Draco e KTX2, CMS, backend.

### 8.2 Estrutura

```
koudelka/
├── PRD.md
├── TASKS.md
├── astro.config.mjs
├── content/                     # tudo o que é texto e dado
│   ├── people/*.mdx   places/*.mdx   files/*.mdx
│   ├── story/*.mdx    records/*.mdx
│   ├── sources.yaml   settings.yaml
├── public/
│   ├── fonts/   world/          # stills e sprites pré-renderizados
│   └── models/                  # .glb otimizados
├── scripts/
│   ├── optimize-models.ts       # gltf-transform + checagem de orçamento
│   └── render-stills.ts         # stills do mundo para fallback e OG
└── src/
    ├── content.config.ts        # schemas Zod
    ├── lib/                     # puro e testável: spoilers, refs, capabilities, citação
    ├── components/
    │   ├── astro/               # estáticos: CaseFile, Stamp, Seal, Gloss, Colophon
    │   └── islands/             # Solid: ModeSwitch, DepthRail, SoundConsole, Search
    ├── world/                   # único lugar que importa three
    │   ├── engine.ts  psx-material.ts  scenes/  audio/
    ├── layouts/   pages/   styles/   # tokens.css, base.css, glass.css
```

**Regra:** a lógica (níveis de spoiler, códigos de referência, capacidades do aparelho, citação, mixer do som) vive em `src/lib/` como funções puras, sem Astro nem DOM, e é 100% testável. Componentes só apresentam. **`three` só pode ser importado dentro de `src/world/`.**

### 8.3 Modelos de dados (resumo)

```ts
type SpoilerLevel = 'none' | 'story' | 'endings';
type Confidence = 'high' | 'medium' | 'low';

interface CaseFile {
  slug: string;
  number: number;            // 1..14
  refCode: string;           // "NA·B·002"
  series: 'world' | 'people' | 'story' | 'sound' | 'archive';
  title: string;
  docType: 'sheet' | 'letter' | 'report' | 'map' | 'photo' | 'diary' | 'clipping';
  spoilerLevel: SpoilerLevel;
  strata: { y1898: string; y1999?: string; y2026?: string };  // MDX por estrato
  related: string[];         // reference() para outras coleções
  sources: string[];         // ids em sources.yaml; ao menos 1 por afirmação factual
  stamp?: string;            // ex.: "FAN RECONSTRUCTION · NOT AN ORIGINAL DOCUMENT"
  contentNotes: ContentNote[];
}

interface Source {
  id: string;                // "wp-koudelka"
  title: string;
  url: string;
  kind: 'primary' | 'interview' | 'wiki' | 'press' | 'database';
  confidence: Confidence;
  accessed: string;          // ISO
}

type ContentNote =
  | 'horror' | 'violence' | 'child-death' | 'suicide' | 'torture'
  | 'religion' | 'real-victims' | 'sexual-exploitation-ref';
```

### 8.4 Capacidades e carregamento do 3D

`lib/capabilities.ts` (função pura) devolve `'full' | 'lite' | 'still'` com base em WebGL2, `prefers-reduced-motion`, `saveData`, largura de tela e núcleos de CPU. O 3D **só** carrega depois do LCP, com `import()` dinâmico, pausa fora da tela e com a aba oculta, teto de 30 fps (20 no `lite`), `dispose` completo no `onCleanup`. Qualquer erro volta ao still, sem ruído no console.

---

## 9. Requisitos não funcionais

### Desempenho (orçamentos que falham o CI)
| Métrica | Alvo | Teto no CI |
|---|---|---|
| LCP (4G lento, mobile) | ≤ 2,0 s | 2,5 s |
| CLS | ≤ 0,02 | 0,05 |
| INP | ≤ 150 ms | 200 ms |
| JS inicial (gzip) | ≤ 25 KB | 35 KB |
| Chunk 3D (gzip) | ≤ 170 KB | 180 KB |
| Fontes | 2 famílias, ≤ 4 woff2, ≤ 100 KB | 120 KB |
| CSS (gzip) | ≤ 25 KB | 30 KB |
| Imagem da 1ª dobra | ≤ 150 KB (still ≤ 60 KB) | 250 KB |
| Áudio | 0 KB de mídia | código ≤ 8 KB |

Lighthouse mobile ≥ 95 em Performance, Accessibility, Best Practices e SEO, em **todas** as páginas.

### Acessibilidade
- WCAG 2.2 AA; zero violações do axe nos E2E.
- Teclado completo, foco visível (outline `--gilt` de 3 px), skip link, `scroll-padding` para a barra fixa nunca cobrir o foco (2.4.11).
- Nenhuma informação só por cor: todo estado tem palavra.
- Canvas 3D é `aria-hidden`; todo o conteúdo existe em HTML.
- **Fotossensibilidade (2.3.1):** nada pisca mais de 3×/s; sem flash de tela cheia; grão e glitch desligam com `prefers-reduced-motion` e com `MOTION: OFF`.
- Texto sob grão e scanlines mantém o contraste medido **com o overlay ligado**.

### SEO e partilha
Meta e OG por página, imagens OG geradas no build em DOCUMENTO (carimbo + título), sitemap. **Nenhum spoiler em título, descrição, OG ou `alt`.**

### Privacidade e segurança
Sem cookies, sem terceiros antes do clique, fontes self-hosted, embeds por fachada. CSP restritiva (scripts inline por hash). Nenhum segredo no cliente.

### Compatibilidade
Duas últimas versões de Chrome, Firefox, Safari (incluindo iOS) e Edge. Scroll-driven animations são **melhoria progressiva**: sem suporte, os blocos aparecem já no estado final.

---

## 10. Diretrizes legais e de representação (viram regra de produto)

> Não é parecer jurídico. É um guia de prudência com critérios verificáveis.

### 10.1 Direitos
Titular incerto: *Koudelka* saiu "©SNK" no Japão; a Sacnoth foi absorvida pela Aruze (hoje Universal Entertainment, que registrou *Shadow Hearts* em 2022). Ninguém publica política de fãs para o jogo. O site vive de **citação (UE) e fair use (EUA), boa-fé e takedown rápido**. Rodapé: *"Koudelka © its respective rights holders."* — sem afirmar quem são.

### 10.2 Imagens
- Identidade 100% autoral: logo, key art e cenários oficiais **nunca** são a cara do site.
- Material oficial só como **prova citada**: poucas imagens, pequenas, em contexto de comentário, com crédito, num diretório isolado e removível (`public/evidence/`).
- Nada de FMVs, vídeos, ROMs, ISOs ou áudio extraídos.

### 10.3 Música
Nenhuma hospedada. Análise escrita + links/embeds oficiais com fachada de clique. Sem fonte oficial, não se embute nada.

### 10.4 Representação de Koudelka
Koudelka é uma mulher romani. Na voz do site: **Romani** (adjetivo) e **Roma** (coletivo). *Gypsy* só **dentro de citações do jogo**, sem alterar a palavra, com uma nota editorial única na ficha dela. Proibido: o tropo da "cigana mística" (bola de cristal, tarô, leitura de mão, "exótica", "selvagem", "maldição cigana"), cultura romani inventada, a figura low-poly caricaturando traços. **Antes do lançamento, uma leitura sensível por um leitor romani é um gate**, não uma opção.

### 10.5 Avisos de conteúdo
Página `/content-notes`, linkada no `ENTER` e no rodapé, com categorias visíveis e detalhes selados: horror e body horror · violência e morte (incluindo a execução de uma criança) · tortura e encarceramento · religião e ocultismo · eventos históricos reais com vítimas · e os avisos **do próprio site** (grão, flicker, som).

### 10.6 Colofão (rodapé, EN)
> *An unofficial, non-commercial fan archive. Not affiliated with or endorsed by any rights holder of* Koudelka. *Text, illustrations, 3D models and sound on this site are original unless credited. Official material appears only as cited evidence. Rights holders: write to us and we will remove it.*

O texto completo está em `research/legal.md` §9 e vai para `/about` na TASK-33.

---

## 11. Estratégia de lançamento

1. **Fase 0 — Esqueleto publicável (M1–M3):** identidade, conteúdo tipado, `/people` (trio), `/walkthrough`, `/archive` mínimo, `/sources`. Já mostra o conceito sem 3D.
2. **Fase 1 — A Descida (M4):** a home completa, em modo ARCHIVE.
3. **Fase 2 — O mundo (M5–M6):** NEMETON MODE, mapa 3D, som.
4. **Fase 3 — Lançamento (M7–M8):** polimento, leitura sensível, preview privado, depois público.

Antes de ser público: `noindex` + preview privado, leitura sensível feita, texto legal revisado.

## 12. Milestones

Detalhe, dependências e critérios de aceite no [TASKS.md](TASKS.md).

| # | Entrega | Tasks |
|---|---|---|
| M1 | Fundação e identidade: setup, tokens, kit DOCUMENTO, `/_system`, **spike visual 🚦**, layout, 404, CI | 01–08 |
| M2 | Conteúdo: coleções, fontes, spoilers, referências, busca | 09–13 |
| M3 | Páginas centrais: people, world (SVG), story, archive, sources, serviço | 14–20 |
| M4 | A Descida: blocos e home | 21–23 |
| M5 | Mundo 3D: motor, material PS1, mapa, NEMETON MODE, stills | 24–29 |
| M6 | Som gerativo | 30–31 |
| M7 | Polimento: VIDRO e `MOTION`, SEO/OG, analytics, E2E, Lighthouse | 32–36 |
| M8 | Lançamento: legal, leitura sensível 🚦, deploy | 37–39 |

## 13. Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Titular dos direitos incerto | pedido de remoção | identidade autoral, material oficial isolado e mínimo, colofão e contato de takedown |
| Representação de Koudelka falha | dano real e reputacional | regras da §10.4, nota editorial, **leitura sensível como gate** |
| Escopo estoura (dev solo) | projeto nunca sai | P0 publicável **sem 3D**; 3D e som são camadas; cortar P1 antes de P0 |
| 3D pesa em aparelhos fracos | desempenho e bateria | `capabilities`, still pré-renderizado, 30 fps, pausa fora de tela |
| Efeitos prejudicam a leitura | acessibilidade | PS1 só no MUNDO; contraste medido com overlay; `MOTION: OFF` |
| Parecer pastiche de PS1 | perda de autoralidade | PS1 dosável, sem fonte pixelada, mundo original |
| Fato errado vira "verdade" | credibilidade | toda afirmação com fonte e confiança; lacunas ficam visíveis |
| Spoiler vaza em metadado | quebra de confiança | build falha; `alt`/OG verificados por teste |
| `astro check` não aceita TS 7 | atrito de build | fixar `~6.0.3` até suporte |

## 14. Perguntas em aberto

1. **Nome de domínio** e se o título público usa "Koudelka" (marca de terceiros) ou só "The Nemeton Archive" com subtítulo.
2. Quem fará a **leitura sensível** (leitor romani ou organização como ERRC / Romani Cultural & Arts Company)?
3. As **fontes de fato** são suficientes para os arquivos `STORY`/`ENDINGS`? Algum fato do dossiê está marcado `NÃO VERIFICADO`?
4. ~~Existe fonte oficial online da trilha?~~ **Respondido (2026-10-08): não foi encontrada** (nenhum canal oficial, nenhum relançamento; o Bandcamp do Kikuta não lista o álbum). `/sound` já está escrito sem embeds.
5. Os **modelos 3D** (mosteiro, objetos) serão feitos por Renan no Blender ou em parceria?
6. O 3D entra na v1 pública ou o lançamento acontece na Fase 1, só com ARCHIVE MODE?
7. Analytics: usar Plausible/Umami ou nenhum?
