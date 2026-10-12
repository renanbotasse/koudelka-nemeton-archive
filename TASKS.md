# TASKS — KOUDELKA · THE NEMETON ARCHIVE

> Backlog executável do [PRD.md](PRD.md). **1 task = 1 PR.**
> Antes de qualquer task, leia a **§0 (Identidade visual)** e as seções do PRD citadas. Em questões visuais, se algo aqui contradisser o PRD, vale este arquivo.

## Status (2026-10-12, rodada 10: revisão de diagramação e celular)

- **Método:** medição automática (estouro horizontal, alvos de toque, texto pequeno) + capturas em 390 px e 1280 px de 18 páginas, revisadas por 6 revisores em paralelo; correções aplicadas; segunda rodada de 4 revisores céticos sobre o resultado.
- **Layout editorial (`src/styles/editorial.css`, classe `page ed`):** no desktop, os títulos h2 ficam numa coluna lateral e o texto corre ao lado, ocupando a largura inteira (antes o texto cobria só ~60%). Páginas sem h2 usam a largura toda. No celular, coluna única. Aplicado a design, about, content-notes, made, releases, legacy, arquivos, walkthrough (índice, áreas, batalha), story, endings e fichas de pessoas.
- **Celular:** a rolagem horizontal (15 a 46 px em quase todas as páginas) vinha do sublinhado ornamental dos h2 e das linhas de velocidade das fichas; corrigido, com `overflow-x: clip` de segurança. Barra inferior com 5 colunas iguais, texto de 11 px (era 8,6 px) e área segura do iPhone; todos os links e botões com 44 px; tabelas empilham com o rótulo de cada coluna.
- **Ritmo vertical:** h2 com 48 a 64 px acima e 16 px abaixo (era 96 px), página com topo de 48 px, capitular menor e contida; imagens limitadas a 72% da altura da tela, capas com tamanho de capa, mapas em 2 colunas.
- A home não foi alterada (pedido anterior), salvo a barra de navegação compartilhada.

## Status (2026-10-08, rodada 9: arte oficial no lugar dos bustos + estética de mangá)

- **Imagens do Renan (`reference/`) colocadas nos slots** de `public/images/`: retratos dos 8 personagens (recortes de rosto para Edward e James, logotipo removido da Koudelka), arte-chave do mosteiro (hero do walkthrough), capa norte-americana, linha de croquis dos personagens e o pôster do elenco (novo slot `people-poster`). Os bustos 3D só aparecem onde ainda não há imagem.
- **Tratamento único de impressão:** todas as imagens passam por tinta + retícula (screentone) + cor ao passar o mouse, para CG, croquis e modelos do jogo parecerem uma mesma revista. Painéis de mangá nos cards e retratos (borda de tinta grossa, sombra dura, leve inclinação, canto em retícula, legenda em caixa de narração), linhas de velocidade atrás do título de cada ficha e o título em kana vertical (クーデルカ) no registro de pessoas. No modo NEMETON a tinta vira papel claro e a sombra dourada.
- `Plate` mantém a proporção real das imagens de arte e recorta só retratos e capas.

## Status (2026-10-08, rodada 8: guias novos no walkthrough)

- Fontes novas: um **guia impresso brasileiro** (11 páginas em scans na pasta `reference/`, lidas por 4 leitores em paralelo e extraídas para `research/mag-*.md`), o **FAQ/Walkthrough de DANado e Carla Souza (2008, em português)**, a página do jogo na wiki do Shadow Hearts, a Wikipedia do Kikuta e a matéria do Time Extension. Tudo reescrito com palavras próprias e em inglês; nada do texto original foi copiado e os scans não são exibidos.
- **Áreas do walkthrough** (`content/places.yaml`) enriquecidas sala a sala: itens, puzzles, chefes, ordem. Quando as fontes divergem em HP, o texto diz "cerca de" e cita as duas.
- **Nova página `/walkthrough/battle`:** como funciona a batalha, os 8 atributos (confirmados por duas fontes), magias, itens, monstros e chefes (os mais adiantados selados).
- **Design/Releases/Legacy** atualizados: pesquisa do Kikuta, fotógrafos e Carnacki, referências de rosto da Koudelka (Portman, Ryder), captura em **janeiro de 1999** (palavras do próprio Kikuta), sequências nunca feitas corrigidas, remasterização da trilha **reportada** para 2026 (não confirmada), data europeia 27 ou 29/09/2000.
- **Pendente do texto do DANado:** o colado foi cortado pelo limite de caracteres (acabou no Underground Shrine, Disco 2). Salvar o restante num `.txt` em `reference/` para eu ler os Discos 2–4.

## Status (2026-10-08, rodada 7: imagens no lugar do enfeite)

Feedback do Renan: as bordas e os vitrais de fundo deixavam o site com cara de tema de fantasia, não de site feito para este jogo; os códigos (`NA·B·002`, `SERIES`) e o `[ ne · me · ton ]` estranhos. **A identidade deve vir de imagens curadas por ele.**
- **Removidos:** moldura dupla, cantos ornamentados, rosácea de fundo e **todos os códigos de arquivo** (rodapés das páginas, cards, catálogo, citações) e o verbete da home.
- **Sistema de imagens:** `content/images.yaml` lista 89 slots (id, página, proporção, tamanho mínimo, o que mostrar, prioridade P0/P1/P2, tipo de direito). `Plate.astro` mostra `public/images/<slot>.(jpg|png|webp|avif)` quando o arquivo existe, e em produção não mostra nada quando não existe; em dev (`npm run dev`) mostra um espaço pontilhado com o nome do arquivo. `/system/images` lista o estado de todos os slots. **`IMAGES.md`** (gerado por `node scripts/images-list.mjs`) é a lista para curadoria.
- **Já preenchidos com os prints do Renan:** mapas dos andares 0–3, foto de St Davids e o croqui da mansão.
- Retratos: o slot `person-<id>-portrait` substitui o busto 3D nas fichas, nos cards, no baralho e na home quando o arquivo existe.
- Créditos: `credit:` opcional por slot; sem ele, o texto padrão depende do tipo (oficial, domínio público, foto).

## Status (2026-10-08, rodada 6: direção de arte das páginas de leitura)

Feedback do Renan: os pontinhos de atributos, os rótulos monoespaçados e as caixas planas passavam uma estética tecnológica e sem identidade. A home e o modelo 3D do walkthrough **não mudam**; os bustos 3D ficam até as imagens oficiais chegarem.
- **Conceito:** dossiê de um investigador vitoriano (*Carnacki*) sobre um manuscrito monástico (*O Nome da Rosa*), com a sensibilidade fotográfica sombria que o diretor cita (Clarke, Saudek): pergaminho envelhecido, rubrica, cera, fotografias montadas, anotações à mão.
- **Papel e moldura:** pergaminho com fibras, manchas e queima nas bordas (modo ARCHIVE); laje de pedra com brilho de vela (modo NEMETON). Moldura dupla com cantos ornamentados e rosácea de vitral em marca-d'água. Sem scanlines sobre o papel.
- **Tipografia:** títulos em Cinzel Decorative, corpo em IM Fell English (impressão do século XVII), capitular em UnifrakturCook cor de rubrica, anotações em Pinyon Script, rótulos em capitulares Cinzel (nada de monoespaçada nas páginas de leitura).
- **Componentes:** selo de cera que racha ao abrir e revela uma tira de papel rasgado; carimbo de tinta inclinado; fotos presas por cantoneiras com filtro sépia; legendas manuscritas; atos da história com numeral gótico num quadro; **rosácea de atributos** gravada (os 8 atributos reais do jogo, ênfase 0–3) no lugar dos pontinhos; gravuras com hachura; livro-razão no lugar das tabelas técnicas; baralho com moldura dourada.
- Stylelint: `folio.css` pode usar gradientes e sombras; cores continuam só por token.

## Status (2026-10-08, rodada 5: modelo 3D refeito sobre as plantas)

- O mosteiro foi reconstruído a partir das plantas do 1º andar, do 2º andar e do subsolo (prints em `reference/`), do croqui de elevação (igreja com flecha altíssima ao lado de uma mansão com mansardas) e da foto de uma catedral de Pembrokeshire (pedra cinza-violeta, telhado de chumbo, torre quadrada com pináculos).
- **Anel de edifícios inclinados** em volta do pátio com fonte, arbor e cinco estátuas: igreja com abside e torre central, capela/vestry, ruínas, Patrick's Quarters (cobre verde), Dungeon, Main Gate (diagonal), Caretaker's (tijolo, mansarda), Storage, Library (cúpula), sala do vitral e cemitério com os túmulos de Charlotte e St. Daniel.
- **Subsolo conforme o mapa:** celas, tanque de ácido central com cellar e shrine, túneis, altar da escuridão e a câmara do caldeirão sob a igreja, sobre uma laje de rocha.
- **Muros dentro do terreno** (antes passavam do penhasco). Cada edifício tem pedra e telhado próprios.
- Texturas com densidade constante e caixas grandes subdivididas, para o efeito PS1 ficar nítido em vez de esticado.

## Status (2026-10-08, rodada 4)

- **Castelo interativo** no `/walkthrough` (`src/world/explorer.ts`): arrastar para girar, roda/pinça para zoom, setas e +/− no teclado, duplo clique reinicia, 15 pinos numerados que levam à área, **cutaway** que corta o modelo de cima para baixo e revela cripta, celas e túnel, e giro lento pausável.
- **Paleta** mais fria e próxima do jogo: preto-azulado, osso, vinho `#8a1d2c`, verde-verdigris e âmbar de vela `#d9a441` (contrastes recalculados; borda de controle no modo ARCHIVE usa `--ink-dim` para manter 3:1).
- **Espaçamento** vertical entre tópicos ampliado.
- Aviso visível quando o 3D da home está desligado (MOTION: OFF salvo, "reduzir movimento" do sistema ou sem WebGL2).
- **Aguardando:** o texto do walkthrough, que o Renan vai passar. **Imagens oficiais:** a wiki bloqueia download automático e o Internet Archive só guarda miniaturas; precisam ser baixadas à mão para `public/evidence/` (os encaixes das páginas já existem).

## Status (2026-10-08, rodada 3: feedback do Renan)

**Aplicado a partir do feedback:**
- **Identidade:** título agora em **Cinzel** (capitular romana, mais gótica-vitoriana) no lugar de League Gothic; hero "KOUDELKA / The Nemeton Archive"; wordmark "KOUDELKA · THE NEMETON ARCHIVE".
- **Home:** removidos "Disc X of 4", as frases de rodapé do hero e "Two hosts"; cartões dos hóspedes com retrato e ênfase de atributos; meia-noite reescrita; selo da seção Cells abre o botão; catálogo da cripta com arquivos selados **sem número nem nome** até abrir.
- **3D:** mosteiro refeito (contrafortes, janelas lancet, rosácea, torre com ameias e flecha, claustro com fonte, portão com grades e lanternas, cemitério, árvores, cripta, **celas com grades e túnel**). A câmera tem **uma parada distinta por seção** (10 chaves em `engine.ts`).
- **Pessoas:** bustos 3D low-poly originais (pré-renderizados + vivos), **baralho** que passa sozinho (pausável), selo vermelho que se divide ao clicar nos não-hóspedes, ficha com arquétipo, ênfase de atributos (os 8 nomes reais: STR VIT DEX AGL INT MND PIE LUC), Battle guide e nota de design.
- **Walkthrough** (era World): 3 gravuras (de cima, quatro lados, corte), 15 áreas **na ordem do jogo por disco**, rota, itens, inimigos, puzzles e selo de spoilers. Rotas antigas redirecionam.
- **Story:** só "Act I…VII", sem discos, texto mais explicativo, selos mantidos.
- **Design** (era Sound): origem, lugar, influências, elenco, combate, som, o que não foi feito + console de som com 4 canais.
- **Pendente do feedback:** item 20 (Archive, o Renan pediu para fazer depois).

**Limitações assumidas:** (1) o CDN da wiki bloqueia clientes automatizados, então as imagens oficiais (mapas de andar e retratos) **não foram baixadas**; os retratos são originais e há um encaixe em `public/evidence/{maps,people}/` (veja `README.txt`) para o Renan soltar as imagens à mão. (2) Nenhuma fonte legível traz os stats iniciais; as barras mostram **ênfase** com aviso, não números. (3) Só o fim do disco 2 é confirmado; os outros discos vêm de um único play-through.

**Anterior (ainda válido):** stylelint guardião, CI, `/system`, busca Pagefind, `[ CITE ]`, `/f/nnn`, stills, mixer, OG.

**Revisão (2026-10-08):** o PRD foi alinhado ao que existe (selo nativo em vez de plugin remark; finais atrás de `/story/endings`; fonte oficial de trilha: não encontrada). Itens a decidir: ver "Perguntas que bloqueiam tasks".

## Como usar

- Siga a ordem dos milestones e respeite o campo **Depende de**.
- Prompt sugerido: `claude "leia PRD.md e TASKS.md §0 e implemente a TASK-09"`.
- Prioridades iguais às do PRD: **P0** v1 · **P1** lançamento completo · **P2** depois.
- **Skills:** em toda task com UI, carregar `bencium-innovative-ux-designer` e usar `contrast-checker` para qualquer cor nova. Ilhas Solid seguem `../.claude/skills/solidjs-best-practices.md`; a lógica segue `../.claude/skills/programming-principles.md`. **Ignorar** `php-best-practices.md`, `SPEC.md` e `schema.sql`: são do noSignal.

### Definição de pronto (vale para todas as tasks)

- [ ] `npm run check` verde: `astro check` strict, ESLint, Stylelint e Vitest.
- [ ] Sem `any`. JSDoc em componentes e funções exportadas. Comentários explicam o porquê.
- [ ] Ilhas Solid: cada `createEffect` com um comentário dizendo o que observa; `onCleanup` para listeners, observers, áudio e WebGL.
- [ ] Regra de negócio em `src/lib/`, como função pura e com teste. O tempo entra como parâmetro. Componentes só apresentam.
- [ ] Nada quebra sem JavaScript, exceto o que é explicitamente uma ilha.
- [ ] Task com UI: passa no **checklist visual (§0.11)** e anexa screenshots em 390px e 1280px ao PR.
- [ ] Task com conteúdo: toda afirmação factual tem `sources`; nenhum spoiler fora do seu nível.

---

## 0. Identidade visual — Dossiê × Descida × PS1

### 0.1 Em uma frase

> **Um dossiê de investigação de 1898, reaberto em 2026, em que cada cópia é declarada, cada fato tem procedência e o scroll é uma lanterna baixada por uma corda.**

- **O Dossiê é a interface.** Papel, carbono, fichas, carimbos, margens, fontes. Estrutura exposta e muito legível.
- **A Descida é o ritmo.** Do portão às criptas: uma ideia por tela, frases curtas, câmera que só sobe uma vez.
- **O PS1 é o mundo.** Um mosteiro original em low-poly de 1999, ao fundo, nunca no texto.

### 0.2 As três camadas

```
frente  ── 3. VIDRO ───────  monitor CRT: grão, vinheta, scanlines (desligável)
        ── 2. DOCUMENTO ───  a UI: papel/carbono, serifa, mono; carrega toda a informação
fundo   ── 1. MUNDO ───────  3D low-poly PS1, original; mapa, objetos, fundo da home
```

| | 1. MUNDO | 2. DOCUMENTO | 3. VIDRO |
|---|---|---|---|
| Onde existe | hero, mapa (`/walkthrough`), objetos *examine*; stills em todo o resto | todas as páginas | overlay global, `pointer-events: none` |
| Pode ter jitter, afim, dither, baixa resolução | **sim** | **não** | não |
| Gradiente, blur, transparência | só dentro do canvas | **não** | sim |
| Carrega informação | nunca sozinho; tudo se repete em HTML | sim | nunca |
| Com `MOTION: OFF` ou reduced motion | still estático | não muda | desliga |

**Regra prática:** se tem texto ou é clicável, é DOCUMENTO. E DOCUMENTO é legível.

### 0.3 Os dois modos como matéria

| | ARCHIVE MODE (padrão) | NEMETON MODE |
|---|---|---|
| Material | **a cópia**: papel cebola claro, tinta escura | **o carbono**: folha escura, letra clara |
| Superfície / texto | `--paper` / `--ink` | `--crypt` / `--paper` |
| Mapa | gravura SVG | mapa 3D low-poly |

A hierarquia de arquivo **é** a arquitetura de informação: `FONDS` (NA) → **série** (A–E) → **dossiê** (`FILE 001`…) → **item** (`i, ii, iii`). O código `NA·B·002·iii` é o breadcrumb e o botão `[ CITE ]`.

| Série | Rota | Nome |
|---|---|---|
| A | `/walkthrough` | WORLD |
| B | `/people` | PEOPLE |
| C | `/story` | STORY |
| D | `/sound` | SOUND |
| E | `/archive` | ARCHIVE |

### 0.4 Regras do DOCUMENTO

1. **Estrutura exposta.** Código de referência sempre visível (`NA·B·002`). Margem esquerda = registro; margem direita = marginália (fontes, notas de estrato, avisos).
2. **Fios finos.** `1px` em `--line` para estrutura; `2px` em `--edge` para controles. `border-radius: 0`, **sem exceção**.
3. **Sombras só por deslocamento duro:** `4px 4px 0`, sem blur. Folhas sobrepostas (papel cebola) usam deslocamento de 6px.
4. **Carimbos.** Todo documento reconstruído leva `FAN RECONSTRUCTION · NOT AN ORIGINAL DOCUMENT`. Carimbos são retos, sem rotação aleatória.
5. **Selo de cera = gate de spoiler.** Selo = `<details>`/botão com texto (`[SEALED — story spoilers]`), nunca só ícone.
6. **Três estratos** por arquivo: `1898 · 1999 · 2026`, como folhas de papel cebola.
7. **Metadados reais como ornamento.** IDs, datas, contagens, confiança. Nunca texto falso de enfeite.
8. **Medida de leitura 62–68 caracteres.** Parágrafo ≤ 5 linhas no mobile. Uma ideia por bloco.
9. **Alvos grandes.** Botões ≥ 48px de altura; área de toque ≥ 44×44px.
10. **Honestidade.** Link é sublinhado; botão parece botão; estado tem palavra.

### 0.5 O que usar e o que não usar

| Aspecto | ✅ Usar | ❌ Não usar |
|---|---|---|
| Texto | serifa de leitura, mono de metadado, display condensado | fonte pixelada no corpo ou em títulos |
| Efeito | grão e glitch **pontuais** (hover, troca de disco) | glitch em todo elemento |
| Mundo | mosteiro **original**, inspirado na atmosfera | cenários, modelos ou texturas do jogo |
| Imagem oficial | prova citada, pequena, creditada | screenshots sem contexto; key art como identidade |
| Som | gerativo, opt-in | música (qualquer), autoplay |
| Scroll | nativo, sempre | scroll-jacking |
| Terminologia | *Romani*, *Roma*, *EXILE* | *gypsy* fora de citação; tropo da "cigana mística"; *TRAVELLER* |

### 0.6 Anti-referências

- ❌ Wiki comum: fichas planas, parágrafos enormes, dezenas de menus.
- ❌ "Site de jogo": hero com trailer em loop, botão "Buy now", menu em ícones de console.
- ❌ PS1 como fantasia: tudo pixelado, tela inteira com dither, fonte bitmap, "VHS".
- ❌ Gótico de brechó: fontes blackletter decorativas, caveiras, sangue pingando, vermelho vivo.
- ❌ Glassmorphism, `backdrop-filter`, canto arredondado, gradiente na UI.
- ❌ Parallax que atrapalha a leitura ou esconde a navegação.

### 0.7 Referências

| Referência | O que tirar dela |
|---|---|
| **Pentiment** (site) | arquivo como navegação; contexto histórico; seção de making-of; documento como página |
| **Until Then** (site) | ritmo vertical; frases curtas; uma ideia por tela; CTA claro |
| **Return of the Obra Dinn** | a ficha como interface de investigação; o dossiê que se completa |
| **SIGNALIS** | aviso de conteúdo em categorias, detalhes selados; PS1 com intenção |
| **Disco Elysium** | texto de leitura dosado; voz editorial |
| **The Public Domain Review / Cabinet** | tipografia editorial de arquivo; legendas e procedência |

### 0.8 Tokens

**Cores.** Contrastes pela fórmula da WCAG, calculados por script.

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `--soot` | `#090d0e` | fundo base | — |
| `--crypt` | `#10171a` | folha escura (NEMETON), superfícies | — |
| `--paper` | `#e6dcc6` | texto principal sobre escuro; folha clara (ARCHIVE) | 14,9:1 sobre soot; 14,0:1 como fundo de `--ink` |
| `--paper-dim` | `#9fada6` | texto secundário **sobre escuro** | 7,5:1 sobre soot; 7,1:1 sobre crypt |
| `--ink` | `#12100e` | texto sobre `--paper` | 14,0:1 |
| `--blood` | `#8a1d2c` | fundo de selo/carimbo, fios | `--paper` sobre blood 6,8:1; **proibido como texto sobre soot** |
| `--blood-text` | `#e27a85` | vermelho como **texto/ícone** sobre escuro | 6,7:1 sobre soot |
| `--sick` | `#6fa89a` | verde doente: estado, "aberto", foco secundário | 8,2:1 sobre soot |
| `--gilt` | `#d9a441` | dourado: foco, CTA, destaque | 8,2:1 sobre soot; `--soot` sobre gilt 8,2:1 |
| `--edge` | `#6f8582` | borda de controles | 4,1:1 sobre soot (mínimo 3:1 ✓) |
| `--line` | `#2c3a3d` | só decoração: fios, grade | 1,6:1 — **proibido** em texto e em controle |

Combinações proibidas: `--paper-dim` sobre `--paper` (2,0:1) · `--blood` como texto sobre soot · `--line` em qualquer texto.

**Tipografia (todas OFL, self-hosted, woff2, subset latino + diacríticos: Iasant, O'Flaherty, Émigré)**

| Papel | Fonte | Regra |
|---|---|---|
| Display | **Cinzel** | títulos, numerais (`XII`), códigos; caixa alta, entrelinha 0.9 |
| Narrativa | **Newsreader** (variável, romano + itálico) | corpo e citações; entrelinha 1.6; 62–68 caracteres |
| Metadados | **IBM Plex Mono** 400/600 | códigos, carimbos, datas, botões; caixa alta, tracking +0.06em |

Orçamento: 2–3 famílias, ≤ 4 woff2, ≤ 100 KB, 1 preload (a narrativa). `font-display: swap` com `size-adjust` para CLS 0. Escala 1.333 com base 16px: 12 · 16 · 21 · 28 · 38 · 50 · 67 · 90.

**Forma e espaço:** `--hairline: 1px` · `--rule: 2px` · `--radius: 0` (único valor) · `--shadow: 4px 4px 0 0 var(--line)` · espaço base 8 (4 · 8 · 16 · 24 · 32 · 48 · 64 · 96). Breakpoints: 390 · 768 · 1024 · 1280. Colunas: registro 200px · corpo 62–68ch · marginália 240px.

### 0.9 Componentes-assinatura

| Componente | Spec |
|---|---|
| `Stamp` | retângulo mono com borda 2px; `FAN RECONSTRUCTION · NOT AN ORIGINAL DOCUMENT` |
| `CaseFile` | ficha: nº, título, papéis (`MEDIUM · EXILE · WITNESS`), `AGE`, `STATUS`, `LAST SEEN`, `[ OPEN FILE 002 ]` |
| `RefCode` | `NA·B·002·iii` + `[ CITE ]` (copia código e URL) |
| `Seal` | selo de spoiler: texto + `<details>`; níveis `STORY` e `ENDINGS` |
| `Gloss` | glossário `[ ne · me · ton ] n.` |
| `StrataTabs` | alterna `1898 · 1999 · 2026` na mesma página |
| `Marginalia` | cartões de fonte, notas, avisos; inline no mobile |
| `DepthRail` | corte vertical do mosteiro com 7 marcos (`<nav>` real) |
| `DiscChange` | `XII` + `DISC 2 OF 4 ENDS HERE.` |
| `SourceBadge` | `ALTA / MÉDIA / BAIXA` + link para `/sources#id` |
| `Colophon` | texto legal do rodapé |

### 0.10 Look PS1 do MUNDO

Intensidade geral `psx: 0..1` (padrão **0.6**), toda desligável.

| Parâmetro | Valor |
|---|---|
| Resolução interna | **320×240**, upscale `image-rendering: pixelated` por escala inteira |
| Snap de vértices | grade de resolução virtual (≈ 1 pixel interno) |
| Textura | mapeamento afim (sem correção de perspectiva), sem filtro, 64–256 px |
| Dither | ordenado, Bayer 4×4 |
| Cor | 15 bits (5-5-5) |
| Névoa | curta, de 3 a 18 unidades, cor `--soot` → azul-esverdeado escuro |
| Iluminação | por vértice |
| Taxa | 30 fps (20 no `lite`) |

**Onde aparece:** só no canvas do hero, no mapa e nos objetos *examine*. **Onde nunca:** texto, controles, fotos, gráficos.

### 0.11 Movimento e efeitos

| Efeito | Spec | Com `MOTION: OFF` / reduced motion |
|---|---|---|
| Descida (blocos da home) | scroll-driven, `animation-timeline`, só opacidade e deslocamento | estado final, sem movimento |
| Câmera 3D | órbita lenta + parallax ≤ 3° | still |
| Grão | SVG `feTurbulence`, opacidade ≤ 5% | desligado |
| Scanlines (VIDRO) | paradas duras, opacidade ≤ 5% | desligado |
| Glitch de título | ≤ 4px, só no hover, ≤ 300ms | desligado |
| Contador `XII` | 12 traços, 120 ms cada | todos acesos |
| Transição de página | fade 150ms (View Transitions) | instantâneo |

- **Segurança (WCAG 2.3.1):** nada pisca mais de 3×/s; nenhum flash de tela cheia.
- **`MOTION`:** botão fixo, `aria-pressed`, persiste (com try/catch), começa OFF se o sistema pedir menos movimento.

### 0.12 Som

- **Motor:** Web Audio puro, procedural: vento (ruído filtrado), pedra (reverb convolutivo sintético), sino, coro distante (síntese aditiva), drone de órgão. Mixer de 4 canais. **0 KB de mídia.**
- **Estrato → preset:** CLIFF vento · GATE vento+sino · HOUSE drone baixo · NAVE órgão · CELLS pedra+gotas · CRYPT silêncio quase total.
- **Regras:** começa **desligado**; só liga com gesto; volume inicial baixo; fade de 1,5s; pausa com a aba oculta; sobrevive à navegação.

### 0.13 Voz do sistema

Formato: **frase de arquivo + explicação em linguagem normal.** Todo texto em inglês.

| Situação | Texto |
|---|---|
| Carregando | `RETRIEVING FILE…` |
| Vazio | `NO RECORD` — Nothing matches. `[ CLEAR FILTERS ]` |
| Erro | `FILE UNREADABLE` — Something went wrong. Try again. |
| Selado | `[SEALED — story spoilers]` — Open it when you are ready. |
| Final selado | `[ UNSEAL THE ENDINGS ]` → confirmação: *This reveals how the story ends.* |
| Sem 3D | `NO SIGNAL FROM THE MODEL.` — Showing the engraving instead. |
| Sem som | `SOUND UNAVAILABLE` |
| 404 | `This room was never built.` |
| Troca de disco | `DISC 2 OF 4 ENDS HERE. PLEASE INSERT DISC 3.` |

### 0.14 Checklist visual de PR

- [ ] Stylelint verde: só tokens; sem radius, blur, `backdrop-filter` ou gradiente fora de `glass.css`.
- [ ] Tudo o que tem texto ou é clicável está em DOCUMENTO.
- [ ] Nenhuma anti-referência da §0.6.
- [ ] Todo estado tem palavra, não só cor.
- [ ] Cores dentro da §0.8; combinação nova verificada com `contrast-checker`, **com o VIDRO ligado**.
- [ ] 390px sem scroll horizontal; alvos ≥ 44px; `scroll-padding` para as barras fixas.
- [ ] Teclado completo, com foco visível.
- [ ] Testado com reduced motion, com `MOTION: OFF`, sem JS e sem WebGL.
- [ ] Nenhum spoiler em título, `alt`, OG ou meta.
- [ ] **Teste de 1 segundo:** num screenshot, a ação principal da página é óbvia.

---

## 1. Convenções técnicas

- Astro 7 (SSG). Ilhas Solid só onde há interação, com `client:visible` ou `client:idle`; `client:load` exige justificativa no PR.
- `src/lib/`: funções puras, sem DOM nem Astro, 100% testadas. O tempo entra como parâmetro.
- CSS: valores só em `src/styles/tokens.css`; efeitos do VIDRO só em `src/styles/glass.css`. Stylelint garante as duas coisas.
- **`three` só é importado dentro de `src/world/`.** O 3D nunca está no bundle inicial.
- Conteúdo validado com Zod: conteúdo inválido quebra a build com mensagem clara (arquivo e campo).
- Versões fixadas: ver PRD §8.1. `typescript ~6.0.3` até o `astro check` aceitar TS 7.
- `PUBLIC_SITE_MODE=preview|public` controla `noindex` e o banner de preview.

## 2. Mapa

| Milestone | Tasks |
|---|---|
| M1 Fundação e identidade | 01 → 02 → 03 → 04 · 05 🚦 → 06 → 07 · 08 em paralelo |
| M2 Conteúdo | 09 → 10 → 11 · 12 · 13 |
| M3 Páginas centrais | 14 · 15 · 16 · 17 · 18 · 19 · 20 |
| M4 A Descida | 21 → 22 → 23 |
| M5 Mundo 3D | 24 → 25 → 26 → 27 → 28 → 29 |
| M6 Som | 30 → 31 |
| M7 Polimento | 32 · 33 · 34 · 35 · 36 |
| M8 Lançamento | 37 🚦 · 38 · 39 |

🚦 = gate: parar e pedir a aprovação do Renan antes de seguir.

---

## M1 — Fundação e identidade

### TASK-01 · Setup e CLAUDE.md
**P0** · Depende de: — · PRD §8

- Astro 7 + `@astrojs/solid-js` + `@astrojs/mdx` + TypeScript `~6.0.3` `strictest`. ESLint, Prettier, Stylelint, Vitest. Node ≥ 22.12.
- Scripts: `dev`, `build`, `preview`, `test`, `check`.
- `astro:env`: `PUBLIC_SITE_MODE` (`preview|public`) e `PUBLIC_ANALYTICS_DOMAIN` (opcional). `.env.example`.
- `CLAUDE.md` na raiz: o que é o projeto, "leia PRD.md e TASKS.md §0", convenções da §1 e a nota: *o `CLAUDE.md` do Desktop é do noSignal; PHP, SPEC.md e schema.sql não se aplicam*.
- Estrutura de pastas do PRD §8.2.

**Aceite**
- [ ] `npm run check` verde no projeto vazio.
- [ ] Sem `PUBLIC_SITE_MODE`, a build falha com mensagem clara.

### TASK-02 · Tokens, fontes e identidade como código
**P0** · Depende de: 01 · §0.8 · Skills: `bencium-innovative-ux-designer`

- `src/styles/tokens.css` com todos os tokens da §0.8.
- Fontes self-hosted (Cinzel, Newsreader, IBM Plex Mono), subset latino + diacríticos; preload só da narrativa; fallbacks com `size-adjust`.
- `base.css`: reset, escala, links sublinhados, `:focus-visible` em `--gilt`, `::selection`, regras globais de `prefers-reduced-motion`.
- **Stylelint como guardião:** cores só em `tokens.css`; `border-radius` só `0`; `box-shadow` só `var(--shadow*)`; `backdrop-filter` proibido; `font-family` só `var(--font-*)`; gradientes só em `glass.css`.

**Aceite**
- [ ] Um `border-radius: 4px` ou um hex num componente faz o `check` falhar (testado com fixture).
- [ ] Fontes ≤ 100 KB no total; CLS = 0 na troca de fonte.

### TASK-03 · Kit do DOCUMENTO
**P0** · Depende de: 02 · §0.4, §0.9 · Skills: `bencium-innovative-ux-designer`, `contrast-checker`

Componentes Astro estáticos: `Stamp`, `CaseFile`, `RefCode`, `Seal`, `Gloss`, `StrataTabs` (CSS-only com `:target`/radio), `Marginalia`, `SourceBadge`, `Colophon`, `Button`, `ExternalLink` (`rel="noopener"`, `↗`).

- Estados: default, hover, active, focus-visible, disabled.
- `src/lib/refcode.ts`: monta e valida `NA·B·002·iii`. Com teste.

**Aceite**
- [ ] Todo estado tem texto; nada depende só de cor.
- [ ] Botões ≥ 48px, operáveis por teclado.
- [ ] `Seal` funciona sem JS.

### TASK-04 · Página `/_system` (styleguide vivo)
**P0** · Depende de: 03

- Amostras de cor com contraste calculado na build por `src/lib/contrast.ts` (fórmula WCAG, com teste).
- Escala tipográfica, espaçamento, todos os componentes em todos os estados e o diagrama das três camadas, nos **dois modos**.
- `noindex`, fora do sitemap e da navegação.

**Aceite**
- [ ] Os contrastes batem com a tabela da §0.8.
- [ ] Dá para mostrar a alguém sem explicar.

### TASK-05 · Spike visual da home 🚦
**P0** · Depende de: 03 · §0, PRD §5.1 · Skills: `bencium-innovative-ux-designer`

Validar a identidade antes de construir o resto.

- Páginas estáticas, dados fixos no código: blocos 0–3 e 6 da home (`Cliff`, `Gate`, `Name`, `Section`, `Midnight`) e **uma** ficha (`/people/koudelka-iasant`) nos dois modos.
- Protótipo descartável do mundo em `src/world/prototype.ts`: um mosteiro low-poly **original** (silhueta, torre, nave), névoa, sem textura oficial. Serve para gerar o still do hero.
- Screenshots em 390px e 1280px, nos dois modos.

**Aceite**
- [ ] Passa no checklist §0.14.
- [ ] Posto ao lado das anti-referências da §0.6, não se confunde com nenhuma.
- [ ] 🚦 **Gate:** o Renan aprova a direção. Ajustes de token entram aqui, antes da TASK-06.

### TASK-06 · Layout base e navegação
**P0** · Depende de: 05 · PRD §5.8 · Skills: `web-design-guidelines`

- `BaseLayout`: meta e OG padrão, `noindex` em `preview`, skip link, as três camadas, `<ClientRouter />` com `transition:persist` para o som e o 3D.
- Nav desktop (48px, fixa) e mobile (barra inferior de 56px, 5 palavras em mono); `aria-current`; `scroll-padding` para as duas barras (WCAG 2.4.11).
- Cluster de controles: `[ARCHIVE | NEMETON]`, `MOTION`, `SOUND` (placeholder), busca.
- `Footer` com o `Colophon`, avisos de conteúdo e links legais.
- Banner de preview: *"Preview — not yet public."*

**Aceite**
- [ ] Navegação inteira por teclado, desktop e mobile.
- [ ] 390px sem scroll horizontal; nenhuma barra cobre o foco.
- [ ] Com `PUBLIC_SITE_MODE=public`, o banner e o `noindex` somem.

### TASK-07 · Página 404
**P0** · Depende de: 06

- `This room was never built.` + explicação + links para a home, `/walkthrough` e `/archive`.

**Aceite**
- [ ] Responde com status 404 no host de preview.

### TASK-08 · CI básica
**P0** · Depende de: 01

- GitHub Actions em todo PR: install com cache, `npm run check`, `npm run build`.

**Aceite**
- [ ] Um PR com erro de lint ou de tipo fica vermelho.

---

## M2 — Conteúdo

### TASK-09 · Content collections e schemas
**P0** · Depende de: 01 · PRD §6, §8.3

- `src/content.config.ts` com `people`, `places`, `files`, `story`, `records`, `sources` e `settings`, via `glob`/`file`.
- Campos do PRD §8.3: `refCode`, `series`, `docType`, `spoilerLevel`, `strata`, `related` (`reference()`), `sources`, `stamp`, `contentNotes`.
- Conteúdo de exemplo mínimo (Koudelka Iasant) para destravar as outras tasks.

**Aceite**
- [ ] Um arquivo sem `spoilerLevel` quebra a build com mensagem que diz o arquivo e o campo.
- [ ] Uma `reference()` para um slug inexistente quebra a build.

### TASK-10 · `lib/spoilers.ts` e componentes de selo
**P0** · Depende de: 09 · PRD §5.4, §6.3

- Funções puras: `canShow(level, revealed)`, `validateBlocks(file)`. Níveis `none < story < endings`.
- Plugin remark/rehype: blocos `:::story` e `:::endings` viram `Seal`; **o build falha** se um bloco de nível maior estiver fora do seu contêiner.
- `lib/metadata.ts`: remove qualquer conteúdo selado de `title`, `description`, OG e `alt`.

**Aceite**
- [ ] Testes cobrindo cada nível e a falha do build.
- [ ] Nenhum HTML de saída contém texto `ENDINGS` fora de um `Seal`.

### TASK-11 · Fontes, procedência e `/sources`
**P0** · Depende de: 09

- `content/sources.yaml` a partir dos dossiês (id, título, URL, `kind`, `confidence`, `accessed`).
- `lib/sources.ts`: toda afirmação com `sources`; `buildBacklinks()` das fontes para os arquivos.
- Página `/sources`, com âncora por id e `SourceBadge`.

**Aceite**
- [ ] Um arquivo factual sem `sources` quebra a build.
- [ ] Fonte de confiança `low` aparece com aviso visível.

### TASK-12 · Referências cruzadas e `[ CITE ]`
**P1** · Depende de: 09, 03

- `buildBacklinks()` (CROSS-REFERENCES) e `NEXT IN SERIES →`.
- `lib/cite.ts`: gera a citação (código + URL canônica + data). Rota curta `/f/[nnn]`.

**Aceite**
- [ ] `/f/002` leva à ficha da Koudelka.
- [ ] Testes de ida e volta no `refcode`.

### TASK-13 · Busca com Pagefind
**P1** · Depende de: 09, 06

- Pagefind 1.5.x no build; UI Solid própria (`client:idle` ao abrir), atalho `/`.
- Resultados não revelam texto selado.

**Aceite**
- [ ] Nada de busca no bundle inicial (≤ 35 KB gzip).
- [ ] Buscar um termo de um bloco `STORY` não mostra o trecho selado.

---

## M3 — Páginas centrais

### TASK-14 · `/people` e `/people/[slug]`
**P0** · Depende de: 03, 06, 09, 10 · PRD §5.3

- Índice "Register of Persons" (3 grupos) e página da ficha com os três estratos, marginália e `Seal` para `STORY`.
- Trio P0: Koudelka Iasant, Edward Plunkett, James O'Flaherty. Os demais P1.
- **Texto escrito do zero** a partir de `research/lore.md`, com `sources`. Koudelka: `MEDIUM · EXILE · WITNESS`.

**Aceite**
- [ ] Critérios do PRD §5.3.
- [ ] Nenhuma ocorrência de *gypsy* fora de citação marcada; nota editorial presente na ficha dela.

### TASK-15 · Nota editorial e glossário (representação)
**P0** · Depende de: 14 · PRD §10.4

- Componente `EditorialNote` e página/âncora de glossário (*Romani, Roma, exile*).
- Lint de conteúdo (`scripts/lint-content.ts`) que bloqueia termos proibidos fora de citações (`gypsy`, `traveller` aplicado a ela, tropos listados).

**Aceite**
- [ ] O lint falha ao introduzir um termo proibido num texto de exemplo.
- [ ] Revisão do texto da ficha dela anexada ao PR.

### TASK-16 · `/walkthrough` com gravura SVG
**P0** · Depende de: 03, 06, 09 · PRD §5.2

- Prancha SVG do corte do mosteiro (autoral, original), com os 14 POIs clicáveis e navegáveis por teclado; lista por estrato; palimpsesto histórico.
- Páginas de sala (`/walkthrough/[slug]`): 6 em P0, 8 em P1.

**Aceite**
- [ ] Toda sala tem URL e link na lista.
- [ ] Salas `STORY`/`ENDINGS` aparecem, com o texto selado.

### TASK-17 · `/story` e `/story/endings`
**P0** (story) / **P1** (endings) · Depende de: 10, 14 · PRD §5.4

- Relatório em 9 atos; marcador de disco depois do ato IV; `ActDrawer`.
- `/story/endings` só renderiza com o selo rompido (sem JS: `<details>` duplo).
- Estado `Reveal endings` em `lib/reveal.ts` (puro) + persistência em `localStorage` com try/catch.

**Aceite**
- [ ] Critérios do PRD §5.4.
- [ ] O selo nunca é rompido sem ação explícita; o diálogo de confirmação diz o que será revelado.

### TASK-18 · `/archive` e arquivos
**P0** (índice) / **P1** (restante) · Depende de: 09, 11, 12 · PRD §5.6

- Catálogo dos 14 arquivos, filtros (tipo, spoiler) e busca.
- `/archive/files/[nnn-slug]`, `/archive/making`, `/archive/releases` (linha do tempo 1997–2026, de `development.md`), `/archive/legacy`.
- Datas só com mês/ano quando o dia não foi confirmado.

**Aceite**
- [ ] Critérios do PRD §5.6.
- [ ] Toda linha da linha do tempo cita fonte e confiança.

### TASK-19 · `/content-notes`
**P0** · Depende de: 06, 09 · PRD §10.5

- Avisos por categoria (visíveis) com detalhes selados; avisos do próprio site (grão, flicker, som). Linkada no `ENTER` e no rodapé.

**Aceite**
- [ ] Todo `contentNote` usado em arquivos aparece na página.

### TASK-20 · `/about` e `/made`
**P0** (about) / **P1** (made) · Depende de: 06 · PRD §10

- `/about`: propósito, colofão legal completo, privacidade, takedown, acessibilidade, nota sobre linguagem.
- `/made`: *How this archive was made* — conceito, paleta, fontes, shaders, orçamento, decisões e o que ficou de fora.

**Aceite**
- [ ] O texto legal bate com o PRD §10 e tem contato de takedown.

---

## M4 — A Descida

### TASK-21 · `lib/descent.ts` e blocos
**P0** · Depende de: 05, 06

- `lib/descent.ts` (puro): estratos, marcos do `DepthRail`, presets de som por estrato.
- Componentes: `Threshold`, `Chapter`, `Line`, `Gloss`, `Dispatch`, `SectionTeaser`, `FileCard`, `Strata`, `DiscChange`, `ActDrawer`, `SoundCard`, `CatalogDrawer`, `RecordStrip`, `Dawn`.

**Aceite**
- [ ] Cada bloco respeita ≤ 45 palavras e ≤ 160 vh.

### TASK-22 · Animação de scroll (progressiva)
**P0** · Depende de: 21 · §0.11

- CSS `animation-timeline: view()/scroll()` com `@supports`; fallback: estado final.
- `DepthRail` (`<nav>` com âncoras) e progresso mobile de 2 px.
- `IntersectionObserver` só onde o CSS não cobre (marcos do `DepthRail`).

**Aceite**
- [ ] Sem suporte a scroll-driven, a home é legível, completa e sem movimento.
- [ ] Nenhum scroll-jacking; scroll restaurado ao voltar.

### TASK-23 · Home `/`
**P0** · Depende de: 14, 16, 17, 18, 21, 22 · PRD §5.1 · Skills: `bencium-innovative-ux-designer`

- Os 12 blocos do PRD §5.1, com a copy exata; bloco 11 com o selo `ENDINGS` e `MemorySlot` (P1).
- A câmera ascendente só depois de romper o selo.

**Aceite**
- [ ] Critérios do PRD §5.1.
- [ ] LCP < 2,0 s em 4G lento, com o still em AVIF ≤ 60 KB.
- [ ] A página é legível congelada em qualquer posição de scroll.

---

## M5 — Mundo 3D

> Tudo aqui segue a §0.10. O PS1 é **dosável** e **só** no MUNDO.

### TASK-24 · Motor do mundo e `capabilities`
**P0** · Depende de: 05, 06

- `lib/capabilities.ts` (puro): WebGL2, reduced motion, `saveData`, largura, núcleos → `'full' | 'lite' | 'still'`.
- Ilha `WorldCanvas` (`client:visible`): mostra o still; se `full`/`lite`, `import()` dinâmico de `src/world/` **depois do LCP** e troca.
- `engine.ts`: render interno 320×240, upscale pixelado, teto de 30 fps (20 no `lite`), pausa fora da tela e com a aba oculta, `aria-hidden`, `dispose` completo no `onCleanup`.
- Qualquer erro volta ao still, sem ruído no console.

**Aceite**
- [ ] `three` não aparece no bundle inicial.
- [ ] CPU em repouso com a aba oculta.
- [ ] Testes de `capabilities.ts` cobrindo cada condição.

### TASK-25 · Material PS1
**P0** · Depende de: 24 · §0.10

- `PsxMaterial` (`ShaderMaterial`, GLSL ES 3.0): snap em grade virtual, afim (`uv·w/w` com `noperspective`), dither Bayer 4×4, cor de 15 bits, névoa; uniform `psx` (0–1) que escala tudo.
- Página `/_system/world` com um mesmo objeto em `psx = 0, 0.3, 0.6, 1`.

**Aceite**
- [ ] `psx = 0` volta a um render limpo.
- [ ] Nenhuma textura do jogo; só assets originais.

### TASK-26 · Pipeline de modelos
**P0** · Depende de: 24

- Blender → `.glb` → `@gltf-transform/cli` (`optimize` + meshopt); `scripts/optimize-models.ts` com checagem de orçamento no CI.
- Orçamento: hero ≤ 150 KB br, página ≤ 400 KB br; ≤ 8 mil triângulos no hero; texturas 64–256 px.

**Aceite**
- [ ] Estourar o orçamento deixa o PR vermelho.

### TASK-27 · O mosteiro original (modelo e cena)
**P0** · Depende de: 25, 26 · PRD §5.2

- Modelo original do mosteiro (torre, nave, portão, cripta) e cena: névoa, câmera em órbita lenta, parallax ≤ 3°.
- Câmeras fixas por sala, para o mapa.

**Aceite**
- [ ] Não reproduz cenário, modelo nem textura do jogo (revisão registrada no PR).
- [ ] 30 fps estáveis num notebook médio com GPU integrada; orçamentos medidos no PR.

### TASK-28 · NEMETON MODE e mapa 3D
**P0** · Depende de: 16, 27 · PRD §5.7

- `ModeSwitch` (Solid): alterna ARCHIVE/NEMETON, persiste, aplica `data-mode` antes da primeira pintura (script inline por hash).
- Mapa 3D em `/walkthrough`, com câmeras fixas, navegação por teclado e foco visível; sem WebGL, a gravura SVG.

**Aceite**
- [ ] O mapa 3D é **um** caminho; toda sala continua acessível por lista e URL.
- [ ] Sem WebGL ou com reduced motion, NEMETON MODE funciona com stills.

### TASK-29 · Stills e objetos *examine*
**P1** · Depende de: 27

- `scripts/render-stills.ts` (Playwright + sharp): still do hero (desktop e mobile) em AVIF/WebP; stills do mapa; imagem OG base.
- Objetos *examine* (pingente, documento Émigré, cartas) como peças 3D pequenas com rotação por arraste e por teclado.

**Aceite**
- [ ] O still sai da mesma cena do 3D vivo (não divergem).
- [ ] Still AVIF ≤ 60 KB.

---

## M6 — Som

### TASK-30 · Motor de áudio gerativo
**P0** · Depende de: 06

- `src/world/audio/` (Web Audio): vento, pedra, sino, coro, drone; mixer de 4 canais; presets por estrato.
- `lib/mixer.ts` (puro): valores, fades e presets, testáveis sem áudio.
- `AudioContext` só após gesto; persiste entre páginas via `transition:persist`; pausa com a aba oculta.

**Aceite**
- [ ] Nenhum áudio antes de um gesto explícito.
- [ ] Código ≤ 8 KB gzip; 0 KB de mídia.
- [ ] Testes de `lib/mixer.ts`.

### TASK-31 · `/sound` e controles
**P0** · Depende de: 30, 06 · PRD §5.5

- Ensaio sobre a trilha (texto próprio, fontes citadas) + ficha do álbum (Pony Canyon PCCB-00396, 1/12/1999, 34 faixas, a confirmar) + console do mixer.
- Embed oficial só com fachada de clique (`youtube-nocookie`); sem fonte oficial, nenhum embed.
- Controle `SOUND` no cluster global.

**Aceite**
- [ ] Critérios do PRD §5.5.
- [ ] Sem Web Audio, `SOUND UNAVAILABLE` e a página segue íntegra.

---

## M7 — Polimento

### TASK-32 · VIDRO e `MOTION`
**P0** · Depende de: 06 · §0.11

- `glass.css`: grão (SVG `feTurbulence`), vinheta, scanlines (≤ 5%).
- Botão `MOTION` (`aria-pressed`), persistência com try/catch, script inline que aplica `data-motion` antes da primeira pintura.
- Glitch de título no hover.

**Aceite**
- [ ] O texto sob o VIDRO mantém o contraste da §0.8 (medido com o overlay ligado).
- [ ] `MOTION: OFF` persiste entre páginas e visitas.

### TASK-33 · SEO e imagens de partilha
**P0** · Depende de: 14, 18, 20

- Meta e canonical por página; `sitemap` sem `/_system`; imagens OG geradas no build (Satori + resvg) em DOCUMENTO (carimbo + título + `RefCode`).
- **Nenhum spoiler em OG.** Em `preview`, `robots` bloqueia tudo.

**Aceite**
- [ ] O link da home colado no WhatsApp e no Discord mostra uma prévia com a identidade.
- [ ] Teste automatizado: nenhum `og:*`, `title` ou `alt` contém texto selado.

### TASK-34 · Analytics (opcional)
**P2** · Depende de: 06

- Plausible ou Umami, só se `PUBLIC_ANALYTICS_DOMAIN` existir. Eventos: `descent:crypt`, `mode:nemeton`, `sound:on`, `seal:endings`.

**Aceite**
- [ ] Sem a variável, nenhum script de analytics é carregado.

### TASK-35 · Testes E2E, a11y e regressão visual
**P0** · Depende de: 23, 28, 31, 32

- Playwright: descer a home até a cripta; alternar modos; romper e não romper o selo; busca sem vazar spoiler; navegação só por teclado; sem JS; sem WebGL; reduced motion sem `<canvas>`; `MOTION` persiste.
- axe-core em todas as páginas: zero violações.
- Screenshots da `/_system` e dos stills como regressão visual.

**Aceite**
- [ ] A suíte roda no CI a cada PR.

### TASK-36 · Lighthouse CI e orçamentos
**P0** · Depende de: 08, 23

- `@lhci/cli` mobile: ≥ 95 nas 4 categorias, em todas as páginas.
- `size-limit`: JS inicial ≤ 35 KB gzip, chunk 3D ≤ 180 KB gzip, fontes ≤ 120 KB, CSS ≤ 30 KB.

**Aceite**
- [ ] Estourar qualquer orçamento deixa o PR vermelho.

---

## M8 — Lançamento

### TASK-37 · Revisão legal e leitura sensível 🚦
**P0** · Depende de: 14, 15, 19, 20

- Auditoria de imagens oficiais: lista de tudo o que é material de terceiros, com origem, tamanho e justificativa; tudo isolado em `public/evidence/`.
- Texto legal revisado; contato de takedown testado.
- **Leitura sensível** da ficha da Koudelka, do glossário e da seção de som, por um leitor romani ou organização indicada; ajustes aplicados.

**Aceite**
- [ ] 🚦 **Gate:** o Renan confirma que a leitura sensível foi feita antes de qualquer lançamento público.
- [ ] Remover `public/evidence/` não quebra nenhuma página.

### TASK-38 · Deploy de preview
**P0** · Depende de: 08

- Cloudflare Pages, preview por PR; `_headers` com CSP restritiva (scripts inline por hash; libera só o necessário), `X-Robots-Tag: noindex` em `preview`.

**Aceite**
- [ ] Nota A ou maior no securityheaders.com.
- [ ] URL de preview pronta para compartilhar.

### TASK-39 · Lançamento público
**P0** · Depende de: 36, 37, 38

- Domínio, `PUBLIC_SITE_MODE=public`, sitemap enviado, checklist final (§0.14), post de lançamento.

**Aceite**
- [ ] Todos os gates 🚦 resolvidos; Lighthouse e axe verdes em produção.

---

## Perguntas que bloqueiam tasks

| Pergunta | Bloqueia |
|---|---|
| Nome de domínio e uso do nome "Koudelka" no título | TASK-39 |
| Quem faz a leitura sensível | TASK-37 |
| Os modelos 3D serão feitos pelo Renan? | TASK-26, 27 |
| ~~Fonte oficial da trilha?~~ respondido: não existe | — |
| 3D entra na v1 pública ou só ARCHIVE MODE no início? | TASK-24 a 29 |
| Analytics: sim ou não? | TASK-34 |
| Fatos `NÃO VERIFICADO` dos dossiês | TASK-14, 17, 18 |
