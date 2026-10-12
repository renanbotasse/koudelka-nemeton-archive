# Referências — análise crítica (Nemeton Archive)

> Dossiê de pesquisa para PRD/TASKS de *KOUDELKA — THE NEMETON ARCHIVE*. Data: 2026-10-08.
> Método: HTML/CSS/JS baixado localmente (pasta `research/raw-*`) + WebFetch/WebSearch pontuais. Onde algo não pôde ser verificado, está dito.

## 0. Escopo e escolhas

**Tese em uma linha:** nenhuma referência faz o que o brief pede. Until Then e Pentiment são *landings* de publisher com 1–2 truques bem executados; a "sensação de arquivo" só existe de verdade no Public Domain Review, e o "PS1 low-poly" só no SIGNALIS. O Nemeton Archive precisa **combinar** camadas que, isoladas, são simples.

| # | Site | Por que está aqui | Papel no Nemeton Archive |
|---|---|---|---|
| 1 | Until Then | obrigatório; brief cita como modelo de ritmo | contenção da primeira dobra, legendas-tema, quiz de personagem |
| 2 | Pentiment | obrigatório; brief cita como modelo de arquivo | glossário, marcas d'água, hero vivo, toggle de movimento, making-of |
| 3 | SIGNALIS | survival horror low-poly/PS1 contemporâneo feito por autores | objeto girando estilo inventário, epígrafe, avisos de conteúdo |
| 4 | The Public Domain Review | arquivo editorial real sobre ocultismo, morte e religião | ficha de catálogo, rotulagem de direitos, `Source` |
| 5 | Return of the Obra Dinn | investigação de época + restrição gráfica como identidade | premissa como despacho, paleta aplicada às imagens, par tipográfico |
| 6 | Disco Elysium | investigação literária "óbvia" | contraexemplo (site vazio, JS-only); 2ª pessoa e analytics sem cookies |
| 7 | Igloo Inc. | Awwwards SOTY 2024, scroll + 3D | técnicas de carga; limite do "NEMETON MODE" (texto nunca em canvas) |

Descartados (com motivo): *Inscryption* (site de loja sem linguagem própria relevante), *Cabinet* (editorial forte mas sem camada de imagem/objeto; o PDR cobre o papel melhor), sites de museu com *deep zoom* (bom para "detalhes clicáveis", mas o padrão já aparece no lightbox do Pentiment e entra como técnica, não como referência).

**Não verificado visualmente:** nenhum site foi aberto num navegador real nesta pesquisa (análise feita sobre HTML/CSS/JS e assets). Cores e fontes vêm do código; impressões de ritmo são inferidas da estrutura e do espaçamento CSS. Menus e subpáginas do Disco Elysium (renderizados no cliente) e o conteúdo do Igloo (UI em WebGL) não puderam ser lidos.

## 1. Until Then — untilthengame.com

Fonte: HTML baixado em 2026-10-07 (`raw-ut/index.html`, `quiz.html`, `merch.html`) + HEAD dos assets.

**Achado principal (corrige o brief):** o site real é um *one-pager* promocional curto e convencional, com 7 blocos. A sensação "cinematográfica" vem quase inteira de **uma** key art em tela cheia e de muito preto, não de scrollytelling. Não há sequência narrativa por seções, nem personagens na home, nem texto dosado em várias frases. O que o Renan lembra como "ritmo" é contenção.

- **Estrutura (ordem):** `header` 100vh (key art fixa + gradiente para preto, `H1 UNTIL THEN` com `letter-spacing:2rem`, título em Baybayin logo abaixo, "Buy Now On" + 4 ícones de loja, 4 CTAs secundários, seta animada) → `OUT NOW` com fios laterais (`.lined`) + plataformas → trailer (`lite-youtube nocookie`) → descrição (H3 "The world hasn't ended yet" + **1** parágrafo de 47 palavras + logo-borboleta) → galeria 2×3 com legendas sobre gradiente → newsletter (fundo com relógio, "Receive updates on time") → links sociais → footer com logos/ESRB e "Back to top".
- **Ritmo:** seções com `margin: 11rem auto`, `max-width: 90rem`, tudo centralizado. Leitura total estimada em menos de 1 minuto. O peso está no topo; depois da dobra o site fica "ficha de loja".
- **Tipografia:** Montserrat **só no peso 400** (títulos e corpo; os negritos são sintéticos, gerados pelo navegador) + Nunito Sans 200, com `@font-face` inline apontando para o Google Fonts. Títulos `uppercase`, `letter-spacing .12rem`, centralizados. Corpo `#ccc` sobre `#000`, `line-height 1.8`, `text-indent` no parágrafo descritivo. Nada de serifada: é sem-serifa genérica.
- **Paleta:** preto puro, branco, cinza `#ccc`; a cor vem só das imagens (azul/rosa de chuva). Bordas `2px solid #fff` nos botões, `outline 2px dotted` no foco.
- **Dosagem de texto:** mínima. Um parágrafo, seis legendas de 4 a 9 palavras que funcionam como *feature list* emocional ("Explore Themes of Love, Loss, and Friendship", "Play Addictively Mundane Minigames").
- **CTAs:** primário = lojas (ícones + rótulo). Secundários = botões fantasma `Press / Newsletter / Fan Merch Policy / Character Quiz`. O CSS tem um selo "New!" (`.header__cta.new`), mas nenhum botão o usa hoje. Repetidos no topo de cada subpágina.
- **Interações-assinatura:** quase nenhuma. Glow `drop-shadow` no hover dos ícones, `brightness(70%)` em logos, seta `arrow-down` em loop. A peça interativa real é o **Character Quiz** (`quiz.html`): 8 perguntas de rádio com `data-points` por personagem, resultado = retrato + bio de ~90 palavras ("You got Nicole Lacsamana!"). É assim que o site apresenta personagens: via identificação lúdica, não via ficha.
- **Lore:** apresentada por insinuação ("People disappear and memories prove unreliable") e não por exposição.
- **Sinais técnicos:** estático, assets com hash (padrão Parcel), CSS inline no `<head>`, `<picture>` com AVIF/WebP, Cloudflare (email obfuscation + Web Analytics beacon) + Google Tag Manager. A "Fan Merch Policy" é um doc externo do Coda/Superhuman Docs (só funciona com JS).
- **Peso:** HTML 38 KB, mas a key art JPG tem 904 KB e **cada screenshot da galeria tem ~1,7 MB, sem `loading="lazy"` e sem `width/height`** (6 × 1,7 MB ≈ 10 MB, mais CLS).
- **Acessibilidade percebida:** boa base (`lang`, `alt` descritivo na key art, `aria-label` nos links sociais, foco visível). Falhas: `alt="Until Then screenshot"` repetido 6×, `H1` com `letter-spacing:2rem` que pode estourar em telas estreitas, `H4` usado como rótulo, hierarquia H1→H2→H3→H4 fora de ordem, contraste dos rótulos sobre imagem depende da foto.

**O QUE TIRAR**
- A coragem de deixar a primeira dobra ser **uma imagem + um título + uma ação**. É o oposto de wiki.
- Legendas da galeria como frases-tema curtas, em vez de "Screenshot 1".
- O padrão "resultado → personagem" do quiz como forma alternativa de entrar nos personagens (para Koudelka: "Which of the three would Nemeton keep?"; opcional, P2).
- Fios laterais em títulos (`.lined`) e botões fantasma com borda de 2px: simples, baratos, brutalistas.
- `lite-youtube` com `nocookie` para trailers e trilha (casa com a regra "sem hospedar música").

**O QUE NÃO COPIAR**
- O *layout* centralizado de landing page de loja: tudo no eixo central, sem grid, sem tensão.
- Montserrat/Nunito: neutras demais para gótico.
- Imagens de 1,7 MB sem lazy e sem dimensões; analytics de terceiros (GTM) num fã-site.
- Legendas genéricas no `alt`.
- A ideia de que "Until Then = scrollytelling": a referência válida é o **tom e a contenção**, não a estrutura.

## 2. Pentiment — pentiment.obsidian.net

Fonte: `raw-pent/index.html`, `pent.css` (133 KB), `pent.js`, `rss.xml` + HEAD dos assets + WebFetch de `/news/obsidian/obsidian-entertainment-announces-pentiment`.

**Achado principal:** o "manuscrito" do Pentiment não está no layout (que é uma landing em coluna única), e sim em **quatro camadas finas**: papel de fundo, borda rasgada entre hero e conteúdo, palavras gigantes em blackletter como marca d'água e uma *definição de dicionário* que enquadra o título. É barato de fazer e muito eficaz. O resto é landing de publisher.

- **Estrutura (ordem):** nav global Obsidian (Sign in/Sign up) → **hero** com key art animada em canvas + logo SVG + 4 plataformas + `Watch Trailer / Buy Now / Play Now` + toggle **Reduce Motion** → **about** (2 parágrafos, depois `[ pen • ti • ment ]` + definição) → **The 16th Century** (contexto histórico: imprensa, Lutero, 95 teses) → **A Narrative Adventure Most Unexpected** (Tassing, Kiersau Abbey, escolhas) → **An Illuminated World** (making-of em vídeo com cursor customizado) → **Art Style & Animation** (texto sobre animação de quadros limitados + galeria de 8 screenshots com títulos: "The Scriptorium", "Supper with the Abbot") → **Download Fankit** → **Accessibility Features** (seção longa: volume, tamanho de texto, alto contraste, câmera estável, legendas, *Easy-read font*, teclado completo, sem QTE, um analógico; cada item com print do menu) → footer corporativo Microsoft.
- **Ritmo:** blocos de texto de 2 parágrafos alternando com mídia; reveal por `IntersectionObserver` (`rootMargin -10%`, classe `.show`) **só quando `body.motion`** está ativo. Scroll nativo, sem smooth-scroll de biblioteca.
- **Tipografia:** `mo_textura` (blackletter Textura, títulos-fantasma e display), `mo_druckeryn` (letra de imprensa da era), **Merriweather** para corpo (Google Fonts), Roboto/Lato no chrome corporativo, Font Awesome para ícones. Hierarquia: blackletter só no display, serifa legível no texto.
- **Paleta:** `#0a1216` (azul-quase-preto do canvas), `#1a1a1a`, `#e3e3e3`/`#e8e8e8` (pergaminho claro no texto), **bordô `#660101`** (CTA primário, hover `#4c0101`), terra `#9d7a61`, ouro `#c88b3c` a 10% de alfa nas marcas d'água. Textura `lrg-paper.webp` (60 KB) e `texture-bw.png`.
- **Dosagem de texto:** parágrafos de 40 a 70 palavras, nunca mais de dois seguidos. Contexto histórico antes de vender o jogo. Legendas de galeria com nome de cena, não descrição técnica.
- **CTAs:** `Buy Now` em bordô abre `<dialog>` "Select Your Platform" ilustrado (Lady of Labyrinth). `Watch Trailer` branco, `Play Now` fantasma. `Download Fankit` (zip) como CTA de comunidade, que é o único CTA que um fã-site pode imitar.
- **Interações-assinatura:**
  1. **Key art viva**: PixiJS (WebGL) com 4 texturas — fundo (195 KB), key art (559 KB), máscara (36 KB) e `drk-cloud.jpg` (535 KB) como `DisplacementFilter` que desliza `-0.3 px/frame`: a pintura "respira" como fumaça. O `<canvas>` recebe `aria-label` com descrição completa da cena.
  2. **Toggle Reduce Motion visível** no hero, sincronizado com `prefers-reduced-motion`: se o SO já pede redução, o toggle some e a animação para (`ticker.stop()`).
  3. **Marca d'água tipográfica**: `.pentiment-text:before{content:attr(data-text)}` em Textura de 7–8em, `user-select:none`, alfa 5–10%, com as palavras *Reformation*, *Humanism*, *Early Modern*, *Inclusion* atrás de cada seção.
  4. **Borda rasgada** (`hero-fl-lg.png`, 92 KB) sobrepondo a transição hero → página com `padding-top:18vw`.
  5. Cursor customizado sobre o poster do vídeo (GSAP `quickSetter` + lerp `0.88^dt`).
  6. Lightbox (Magnific Popup) que copia `aria-label` do link para o `alt` da imagem ampliada e põe `role="dialog"`.
- **Como apresenta personagens/lore:** **não apresenta personagens individualmente.** Andreas aparece só no texto e nas legendas. A lore vem como **contexto histórico** e como glossário (`pen • ti • ment`). O "arquivo" é tom, não estrutura.
- **Sinais técnicos:** Vite (`/build/assets/*-hash.js`, runtime `rolldown`), jQuery 3.6 (carregado duas vezes, uma do CDN da Microsoft), lodash, GSAP, Magnific Popup, PixiJS v8 (BitmapFont, FilterSystem…). Consentimento Microsoft WCP + GTM. Login de conta Obsidian. RSS com **um** item (2022).
- **Subpágina de notícia:** cai num template genérico Obsidian (coluna única + sidebar "What is Pillars of Eternity?" + "Recent articles"). A identidade de manuscrito **some** fora da home.
- **Acessibilidade percebida:** a melhor das referências: skip link, toggle de movimento, `aria-label` rico no canvas e nos links da galeria, seção pública sobre acessibilidade do jogo, marca d'água decorativa com `content: attr(data-text) / ""` (texto alternativo vazio, então o leitor de tela não lê a palavra gigante). Falhas: miniaturas com `alt=""` (compensado pelo `aria-label` no link) e contraste do texto sobre a key art viva, que varia com a animação.

**O QUE TIRAR**
- **Glossário como abertura**: `[ ne • me • ton ]` — *a sacred grove; a place set apart* — logo abaixo do hero, como o Pentiment faz com `pen • ti • ment`.
- **Palavras-fantasma gigantes** atrás de cada capítulo (`MEDIUM`, `HERESY`, `ABERYSTWYTH`, `1898`) via `attr(data-text)` + alfa baixo. Custo zero de JS.
- **Uma** imagem viva no hero com *displacement* de névoa, e não uma cena 3D inteira. Em Koudelka: névoa sobre o mosteiro low-poly renderizado como imagem, com WebGL só para o deslocamento.
- **Toggle de movimento visível** e sincronizado com `prefers-reduced-motion`, no próprio hero. Vira assinatura de cuidado.
- Contexto histórico antes da ficção (País de Gales, 1898; Roger Bacon; o *Émigré Manuscript*), como o "The 16th Century".
- Seção editorial "como foi feito" (aqui: "How this archive was made": low-poly, paleta, fontes, decisões), espelhando "An Illuminated World".
- Lightbox que transporta legenda/descrição do link para a imagem ampliada.
- **Declaração pública de acessibilidade** do próprio site (contraste, movimento, teclado, avisos), espelhando "Accessibility Features". Para um portfólio, vale mais do que um efeito a mais.
- Blackletter/display **só em títulos**; corpo em serifada legível (Merriweather é um bom piso de legibilidade).

**O QUE NÃO COPIAR**
- A pilha jQuery (carregado duas vezes) + lodash + Magnific + GSAP + Pixi para um efeito de hero (peso total não medido). Num site Astro/Solid, um *shader* de 30 linhas ou CSS resolve.
- Subpáginas em template corporativo: no Nemeton Archive **toda rota** precisa herdar o papel, as bordas e as marcas d'água.
- 1,3 MB de texturas só para o hero; o deslocamento pode usar um ruído procedural em vez de `drk-cloud.jpg`.
- Banner de consentimento/GTM: um fã-site sem cookies não precisa disso.
- Blackletter: é a *mão* do Pentiment. Koudelka é 1898 e gótico vitoriano/galês, não Baviera 1518; usar Textura seria cosplay.

## 3. SIGNALIS — rose-engine.org/signalis

**Por que entra:** é o parente mais próximo de Koudelka em gênero e em linguagem visual: survival horror low-poly com estética PS1 assumida, melancolia e um site feito pelos próprios autores (dupla rose-engine), não por agência. Fonte: `raw-sig/` (home do estúdio, `/signalis/`, `SignalisWarnings.html`) + HEAD dos GIFs.

- **Estrutura (ordem):** header em imagem (`website_header_20_fullwidth.png`) → trailer YouTube (iframe cru) → GIF de um objeto low-poly **girando** (`kingInYellow_rotation.gif`) → **epígrafe** em 4 versos ("Great holes secretly are digged / where earth's pores ought to suffice, / and things have learnt to walk / that ought to crawl.", trecho de *The Festival*, de Lovecraft, sem atribuição) → data e plataformas em prosa → 2º GIF girando (`Rotate_spray.gif`) → *tagline* + 1 parágrafo → lista de links entre colchetes `[ Press Kit ]`, `[ SIGNALIS Soundtrack - Bandcamp ]`, `[ SIGNALIS Content Warnings ]` → imagem de prêmios → 10 screenshots em miniatura → sociais → "a game by" + logo GIF.
- **Home do estúdio:** um logo e seis links com letras espaçadas à mão (`A B O U T`, `S I G N A L I S`, `N E W S`, `F A Q`). Zero JS.
- **Ritmo:** coluna única centralizada, curta. O "ritmo" é de **zine/website de 2003**, proposital.
- **Tipografia:** Raleway 400/700 auto-hospedada (com fallbacks `.eot/.svg` de IE6!). O caráter vem das imagens e do espaçamento manual, não da fonte.
- **Paleta:** fundo preto com padrão de cruzes em mosaico (`crosses.png`), branco, cinza, **vermelho-laranja `#cc3500`** como único acento (links e hover). Esse acento sobre preto dá **4,08:1**, abaixo do 4,5:1 exigido pela WCAG para texto normal.
- **Dosagem de texto:** a menor de todas: epígrafe + 2 frases ("A classic survival horror experience with a unique aesthetic, full of melancholic mystery.").
- **CTAs:** links textuais entre colchetes, sem botões. Lojas em prosa.
- **Interações-assinatura:**
  1. **Objetos low-poly girando como no inventário do PS1**, em GIF (427 KB e 247 KB). Pelos nomes de arquivo, são itens do jogo: o livro *The King in Yellow* e um spray; não vi os GIFs renderizados. É a citação mais direta da linguagem de *item examine* do console.
  2. Lightbox **só com CSS** (`:target`, `href="#img1"` → `href="#_"` para fechar).
  3. Página de **avisos** (fotossensibilidade, jumpscares, temas) com spoilers escondidos em texto da cor do fundo: "Please highlight the block with your cursor to read the contents".
- **Personagens/lore:** não apresenta personagens. Lore = epígrafe + insinuação ("a technician Replika looking for a lost dream").
- **Sinais técnicos:** HTML/CSS escritos à mão, sem framework, sem bundler, imagens absolutas em `http://` (mistura de protocolo), estilos inline (`font-size: 8px`), iframe YouTube sem `nocookie`. Screenshots PNG ~160 KB cada.
- **Acessibilidade percebida:** fraca. Imagens sem `alt`, texto de 8–10 px, `S I G N A L I S` soletrado letra a letra para leitor de tela, lightbox `:target` sem foco gerenciado, spoiler "selecione para ler" inacessível a teclado/leitor/toque. **Mas** a página de avisos de conteúdo e fotossensibilidade é um gesto de cuidado que nenhum site AAA faz.

**O QUE TIRAR**
- **Objeto-relíquia girando** no estilo inventário PS1 para os itens do arquivo (pingente de Koudelka, o *Émigré Manuscript*, as cartas de Sophia). Em vez de GIF: `<model-viewer>`/Three.js com `autoRotate`, ou um sprite-sheet WebP leve, sempre com fallback estático.
- **Epígrafe** antes da sinopse: uma linha de fonte da época (domínio público) faz mais clima que três parágrafos.
- **Um único acento quente** sobre preto.
- **Página de avisos de conteúdo/fotossensibilidade** antes de efeitos CRT/flicker. Para Koudelka (violência, tortura, temas religiosos), vira `/warnings` + aviso no `ENTER`.
- Links entre colchetes `[ SOUND ARCHIVE ]` como CTA textual: coerente com o vocabulário de arquivo e com brutalismo.

**O QUE NÃO COPIAR**
- O amadorismo técnico (sem `alt`, 8 px, `http://`, iframe sem `nocookie`). No portfólio do Renan isso conta contra.
- Letras separadas com espaço literal: usar `letter-spacing` + `aria-label`.
- Spoiler "selecione para ler": usar `<details>`/botão "Reveal" com estado anunciado.
- Visual que o próprio site **não** entrega: o SIGNALIS é bonito no jogo e cru na web. A referência aqui é atitude, não acabamento.

## 4. The Public Domain Review — publicdomainreview.org

**Por que entra:** é a referência de **arquivo editorial sério** na web: curadoria de material antigo, ocultismo, morte e religião (os mesmos temas de Koudelka), com metadados de catálogo e rotulagem de direitos item a item. Dá ao "ARCHIVE MODE" um modelo de conteúdo real, não só estética. Fonte: `raw-pdr/index.html` (460 KB, home) + WebFetch de `/collection/mutus-liber/`.

- **Estrutura da home:** nav (`Essays · Collections · Explore · Sources · Shop · About · Blog` + `Support PDR` + busca) → **ensaio em destaque** (título, "By …", *dek* de 50–60 palavras, `more`, tags, data) → manifesto de 1 frase + 2 citações de imprensa → shop → **Latest Essays** (4, com autor/tags/data) → newsletter → Friends → **Latest Collections** (8, formato `Medium / Theme` + título com ano entre parênteses: "Paul Carus' *The History of the Devil and the Idea of Evil* (1899)") → **Editor's Picks / Conjectures** → shop → Image Archive → footer institucional (CIC, Rights Labelling, What is the Public Domain?).
- **Página de item (Mutus Liber):** breadcrumb `Collections / Images` → título com ano → **ficha de catálogo** com rótulos fixos: `Published`, `Medium`, `Theme`, `Style`, `Epoch`, `Tags` → ensaio de ~1.200 palavras em 3 partes com 2 imagens no texto → **todas as pranchas** em sequência vertical, cada uma com legenda e download → caixa **`Source`** ("e-rara / ETH-Bibliothek Zürich") → caixa **`Rights`** com dois rótulos separados: **`Underlying Work Rights: PD Worldwide`** e **`Digital Copy Rights: No Additional Rights`** → "More e-rara content on PDR (5)".
- **Ritmo:** de revista: lista → artigo longo → pranchas. Sem animação; o ritmo vem da alternância de densidade (dek curto na home, ensaio longo no item).
- **Tipografia:** **Alegreya** (serifada humanista com caráter caligráfico) para títulos e texto editorial + **Open Sans** para UI/metadados (183 usos no CSS). Alegreya tem itálico expressivo, bom para títulos de obras.
- **Paleta (CSS inline):** tinta `#1d2731`, azul-petróleo `#0b3c5d`/`#328cc1` (links), cinza-papel `#e0e5e5`/`#f2f5f5`, e uma cor por tema/medium: mostarda `#d9b310`, ameixa `#550b5d`, sépia `#5d2c0b`, verde `#135d0b`, laranja `#d94e10`. Codificar categoria por cor é útil, mas o site **sempre** escreve o rótulo junto.
- **Dosagem de texto:** dek de 1 parágrafo como porta; texto longo só dentro do item. Títulos fazem trabalho de chamada ("Warburg's Werewolf: An Anamnesis").
- **CTAs:** institucionais (Support, Friend of the PDR, Shop, Newsletter). Repetidos demais na home (shop aparece 3×).
- **Interações-assinatura:** praticamente nenhuma; a assinatura é **a ficha de catálogo + a rotulagem de direitos**. A seção *Explore* permite navegação visual por imagens.
- **Personagens/lore:** não se aplica; o equivalente é como o PDR apresenta **pessoas históricas** (Warburg, Sidney): sempre por um ângulo curioso, nunca por biografia de wiki.
- **Sinais técnicos:** **Gatsby** (`data-gatsby-head`, `gatsby-script-loader`), HTML da home com 460 KB (estado hidratado embutido), FoxyCart para loja, Google Fonts, sitemap e RSS.
- **Acessibilidade percebida:** boa leitura (serifada, contraste tinta/papel alto, links sublinhados por cor + texto), `alt` presentes no logo. Pontos fracos: home longa e repetitiva, peso do HTML.

**O QUE TIRAR**
- **Ficha de catálogo com rótulos fixos** para cada CASE FILE: `FILE NO. · MEDIUM · SUBJECT · EPOCH · LOCATION · STATUS · TAGS`, renderizada em monoespaçada. Igual em toda rota → vira o esqueleto do "ARCHIVE MODE".
- **Rotulagem de direitos em dois níveis**, adaptada a um fã-site: `UNDERLYING WORK` (obra citada, titular incerto) vs `THIS IMAGE` (trabalho original do site, com licença própria); texto exato no padrão 5 da §8.2. Resolve de forma visível a questão legal das imagens.
- **Caixa `Source`** em cada documento (de onde veio cada fato: manual, entrevista, wiki), como prova de pesquisa.
- **Título + ano entre parênteses** ("The *Émigré Manuscript* (c. 1898)") e breadcrumb `Archive / Documents`.
- **Dek de 1 parágrafo** como porta para cada ficha; texto longo só dentro.
- Página institucional "What is this archive?" no lugar de "About": propósito, não-comercialidade, como citar.

**O QUE NÃO COPIAR**
- Azul-petróleo de link e o tom "revista acadêmica clara": Nemeton é noturno.
- Home com CTAs institucionais repetidos.
- Gatsby/HTML de 460 KB: um SSG com hidratação parcial (Astro) entrega o mesmo modelo com uma fração do peso.

## 5. Return of the Obra Dinn — obradinn.com

**Por que entra:** é o melhor exemplo de **premissa contada como documento endereçado ao visitante** e de **restrição gráfica como identidade** (1-bit, paleta de 2 cores do Mac antigo). Investigação + arquivo + época (1807) + baixa fidelidade assumida: muito próximo do "case file" de Koudelka. Fonte: `curl` de `obradinn.com` e `css/styles.css` (2026-10-08) + HEAD dos assets.

- **Estrutura (ordem):** faixa de 280 px com **GIF animado 1-bit do navio** (`obradinn.gif`, 200 KB, `image-rendering: pixelated`) → logo SVG → **carrossel** de 14 telas (Slick, autoplay 4 s) sobre barras horizontais → *tagline* "An Insurance Adventure with Minimal Colour" → 6 louros de prêmios (IGF, BAFTA, TGA…) → **dois documentos de época como imagem** (`notice.png` = aviso, `dispatch.png` = despacho) → a premissa em dois parágrafos datados ("**Late 1802,** the merchant ship…", "**October 14th, 1807,** the Obra Dinn has drifted into port…") que terminam numa **ordem ao leitor**: "As insurance investigator for the East India Company's London Office, **dispatch immediately to Falmouth**, find means to board the ship, and prepare an assessment of damages." → preço em selo circular → lojas → idiomas → suporte/copyright.
- **Ritmo:** página única curta, centralizada (Skeleton grid). O ritmo é **do documento**: data em negrito → fato → ordem.
- **Tipografia:** **IM Fell DW Pica** (digitalização das Fell Types do séc. XVII, irregular, com tinta "sangrando") para texto + **Pathway Gothic One** (sem-serifa condensada) para rótulos. Combinação época + utilitário que serve direto para "serifada narrativa + mono de metadados".
- **Paleta:** só duas cores, tiradas do jogo: **`#333319`** (preto-oliva) e **`#e5ffff`** (branco-ciano frio). Tudo, inclusive capturas, obedece.
- **Dosagem de texto:** 3 blocos curtos. O jogo é vendido pela premissa e pelos prêmios; mecânica nem é explicada.
- **CTAs:** ícones de loja agrupados por "PC & Mac" / "Consoles". Sem botões.
- **Interações-assinatura:** o próprio GIF pixelado; o carrossel; a forma de "despacho". Não há JS além de jQuery 1.11 + Slick.
- **Personagens/lore:** personagens aparecem só como capturas `People-*.png`; a lore é **um caso a resolver**, não um elenco.
- **Sinais técnicos:** HTML estático (10 KB), Skeleton CSS, jQuery 1.11 (2014) + Slick via CDN, YouTube comentado. **Capturas 1-bit em PNG pesam ~6 KB** (`Book-06.png`: 5.794 bytes); documentos ~15 KB. Prova de que restrição de paleta é também orçamento de performance.
- **Acessibilidade percebida:** fraca: capturas sem `alt`, carrossel com **autoplay sem pausa** (falha WCAG 2.2.2), logo SVG como `<img>` sem `alt`. Contraste `#e5ffff`/`#333319` = 12,3:1, excelente.

**O QUE TIRAR**
- **Premissa como despacho em segunda pessoa** com data em destaque (exemplo de copy no padrão 3 da §8.2, usando a data do manual: *All-Hallows' Eve, 1898*). O visitante é o investigador; isso justifica o "ARCHIVE" sem explicação.
- **Documentos de época como objetos gráficos** (aviso, carta, recorte) no meio do fluxo, e não só fotos.
- **Paleta restrita aplicada também às imagens** (pós-processar screenshots/renders para a paleta do site: posterização + *dither* ordenado). Unifica material heterogêneo e reduz peso.
- **Par tipográfico época + condensada utilitária.**
- `image-rendering: pixelated` em imagens propositalmente de baixa resolução, servidas pequenas (ex.: 320×240) e ampliadas.

**O QUE NÃO COPIAR**
- Carrossel com autoplay sem controle.
- `<img>` sem `alt`, jQuery 1.11.
- A estética 1-bit em si: é do Obra Dinn. Koudelka é PS1 (textura afinada, *vertex wobble*, cor dessaturada), não Macintosh.

## 6. Disco Elysium — discoelysium.com (contraexemplo útil)

**Por que entra:** é o jogo de investigação literária mais citado da década e tem arte pictórica forte, então seria uma referência "óbvia". Incluo para registrar **por que não serve de modelo de site**, e pelos dois detalhes que valem. Fonte: `curl` da home (SSR, 37 KB) + CSS principal (8 KB) + `__NEXT_DATA__`. **Não consegui ver**: o menu e as subpáginas são renderizados no cliente e não aparecem no HTML; não há navegação no SSR.

- **Estrutura:** só um hero: fundo pintado com "Background flare animation", logo *Final Cut*, selo "Out now", título quebrado em **três `<h1>`** ("Award winning / open world / role playing game") com animação de entrada, *slogan* em 2ª pessoa ("You're a detective with a unique skill system at your disposal and a whole city block to carve your path across…"), 2 CTAs com ícone (Merchandise / Order now), 7 lojas, 5 logos de prêmios/imprensa, seta para baixo.
- **Tipografia:** Libre Baskerville (serifada de livro, regular/itálico/bold) + **Dobra** (display, comercial) + Noto Serif/Sans SC, tudo auto-hospedado. A dupla serifada de livro + display condensada é coerente com o jogo.
- **Sinais técnicos:** Next.js (pages router) + styled-components (`sc-*`), WordPress headless, Cloudinary (`f_auto,q_auto`) e `next/image`, **Plausible** (analytics sem cookies). Problemas visíveis no HTML: `rel="canonical"` aponta para o domínio do CMS (`discowp.zaumstudio.com`), três `h1`, logos de prêmios com `alt=""`, dados ainda listam **Stadia** (encerrado em 2023), `alt="Goge Store"`.
- **Personagens/lore:** nada no SSR.

**O QUE TIRAR**
- O *slogan* em segunda pessoa que põe o visitante no papel ("You're a detective…"), mesmo princípio do despacho do Obra Dinn.
- **Plausible ou equivalente sem cookies** (casa com "métricas sem cookies" do formato de PRD do Renan).
- Par serifada de livro + display condensada.

**O QUE NÃO COPIAR**
- Site que é só hero + lojas: zero arquivo, zero mundo.
- Conteúdo dependente de JS para existir; `canonical` errado; vários `h1`; dados desatualizados. Um arquivo precisa ser **HTML primeiro**.

## 7. Igloo Inc. — igloo.inc (Awwwards Site of the Year 2024)

**Por que entra:** é a referência canônica de **scroll + 3D WebGL premiado** (SOTY 2024, Developer Award), com estética fria/brutalista, HUD monoespaçado e "text scramble". Serve para calibrar até onde o "NEMETON MODE" deve ir, e onde parar. Fonte: case study da Awwwards (`awwwards.com/igloo-inc-case-study.html`) + `curl` da home.

- **Quem/stack (case study):** Abeto + Bureaux. Three.js, Svelte + Vite, GSAP, `three-mesh-bvh`; Houdini/Blender para os assets; exportadores de geometria próprios, dados volumétricos (VDB) comprimidos, gerador procedural de cristais de gelo, **compilação de shaders em background e *streaming* de texturas**.
- **Estrutura:** intro animada em tempo real no próprio motor → três seções de rolagem com blocos de gelo/partículas → lista de projetos do portfólio. A **UI é desenhada em WebGL**, não em HTML (glitches por shader, *scramble* de texto via offset de textura SDF). Som sincronizado com as partículas (o case study não fala de controle de mudo/opt-in).
- **O que o HTML entrega:** 1,4 KB, um `<title>` e um script módulo de 16,5 KB que carrega o resto. **Texto visível no DOM: "Igloo Inc."**. Ou seja, sem JS/WebGL não há conteúdo, nem para leitor de tela, nem para busca.
- **Acessibilidade:** o case study não menciona *reduced motion* nem alternativa textual; com UI em canvas, foco de teclado e leitura de tela ficam por conta de camadas extras que não aparecem no HTML.
- **Peso total:** não medido (carregamento sob demanda dentro do WebGL); o próprio case study trata o tempo de carga como "o maior desafio".

**O QUE TIRAR**
- **Técnicas de carga**: compilar shaders e baixar texturas **enquanto** o visitante lê a abertura (`ENTER THE ARCHIVE` dá esse tempo de graça), geometria exportada enxuta, procedural no lugar de assets pesados (ruído para névoa, em vez de texturas).
- **HUD/metadados monoespaçados** sobre cena 3D e *scramble* de texto curto como transição entre arquivos (só em rótulos de 1 a 3 palavras, nunca em parágrafos).
- Intro que **é** o loader: a aproximação ao mosteiro esconde o carregamento.

**O QUE NÃO COPIAR**
- UI em canvas: no Nemeton Archive, **todo texto é HTML** e o 3D é camada decorativa/opcional.
- Som sem opt-in explícito.
- Experiência que só existe com GPU boa: o "NEMETON MODE" precisa de *fallback* estático e não pode ser o único caminho até o conteúdo.

## 8. Síntese — padrões acionáveis

### 8.1 Quadro comparativo

| Site | Fontes | Cor-chave | Assinatura | Stack | A11y |
|---|---|---|---|---|---|
| Until Then | Montserrat, Nunito Sans | `#000` + `#fff` | key art fixa 100vh, quiz | estático (Parcel), GTM | média |
| Pentiment | Textura, Druckeryn, Merriweather | bordô `#660101`, ouro 10% | canvas com névoa, marcas d'água, toggle de movimento | Vite + jQuery + PixiJS + GSAP | **a melhor** |
| SIGNALIS | Raleway | `#cc3500` sobre preto | GIFs de objeto girando, avisos | HTML à mão | fraca (mas tem avisos) |
| PDR | Alegreya, Open Sans | tinta `#1d2731`, cor por tema | ficha de catálogo + direitos | Gatsby | boa |
| Obra Dinn | IM Fell DW Pica, Pathway Gothic One | `#333319` / `#e5ffff` | despacho datado, 1-bit em 6 KB | estático + jQuery/Slick | fraca |
| Disco Elysium | Libre Baskerville, Dobra | — | 2ª pessoa | Next.js + WP headless, Plausible | fraca |
| Igloo Inc. | (em WebGL) | gelo/preto | UI em canvas, scramble | Svelte + Three.js | não verificável, provavelmente fraca |

### 8.2 Quinze padrões para o Nemeton Archive

1. **Primeira dobra com três elementos:** render low-poly do mosteiro + `KOUDELKA` / `A DIGITAL ARCHIVE OF NEMETON` + `[ENTER THE ARCHIVE]`. Nada de lojas, logos ou selos. A navegação fica visível, mas discreta. *(Until Then, hero do Pentiment)*
2. **Glossário logo abaixo do hero:** `[ ne • me • ton ]` — *n.* a Celtic sacred place; a grove set apart. A etimologia vem do `lore.md` §1. Em uma linha, enquadra o nome e o tom. *(Pentiment, `pen • ti • ment`)*
3. **Premissa como despacho datado em 2ª pessoa,** com a data do manual em destaque: "**All-Hallows' Eve, 1898.** Nemeton Abbey, on the cliffs near Aberystwyth. Voices not of this world are calling. You are the one who answers." O visitante vira investigador, e isso justifica o arquivo sem explicação. *(Obra Dinn; Disco Elysium)*
4. **Ficha de catálogo fixa em monoespaçada** no topo de cada CASE FILE, com os mesmos rótulos em todas as rotas: `FILE NO. · SUBJECT · ROLE · EPOCH · LOCATION · STATUS · SOURCES`. É o esqueleto do ARCHIVE MODE e vira um componente `<CaseFileMeta>` tipado. *(PDR: `Medium/Theme/Style/Epoch/Tags`)*
5. **Rotulagem de direitos em dois níveis em toda imagem:** `UNDERLYING WORK: Koudelka © 1999 SNK/Sacnoth (holder uncertain) · quoted for commentary` vs `THIS IMAGE: original low-poly work · CC BY-NC 4.0`, mais uma caixa `SOURCE` por documento. Mostra que a questão legal foi resolvida (ver `legal.md` §0). *(PDR: `Underlying Work Rights` / `Digital Copy Rights`)*
6. **Uma palavra-fantasma gigante por capítulo** (`NEMETON`, `MEDIUM`, `HERESY`, `1898`, `FORMOR`) via `::before{content:attr(data-ghost) / ""}`, alfa de 4 a 8% e `user-select:none`. Custo zero de JS e substitui textura pesada. *(Pentiment: Reformation/Humanism)*
7. **Relíquias girando como no inventário do PS1** (pingente, *Émigré Manuscript*, cartas de Sophia): modelo de menos de 1.500 triângulos, textura de 128 px com *nearest filtering* e `autoRotate` lento. Com *reduced motion* ou sem WebGL, cai num sprite estático. É o único 3D "dentro" do texto. *(SIGNALIS: `kingInYellow_rotation.gif`)*
8. **Paleta aplicada também às imagens:** um pipeline de build (posterização + *dither* ordenado + mapeamento para os tokens do site, servido pequeno com `image-rendering: pixelated`) unifica capturas, renders e documentos e corta peso: o 1-bit do Obra Dinn sai em cerca de 6 KB por tela. *(Obra Dinn)*
9. **Um único acento quente sobre quase-preto:** vermelho escuro como cor de ação (CTA, foco, link ativo). Ouro e verde doente ficam só como acento de conteúdo, nunca como cor de UI. **Atenção ao contraste:** vermelho escuro como *texto* sobre quase-preto reprova (o `#cc3500` do SIGNALIS já fica em 4,08:1). Use o vermelho como *preenchimento* com texto claro (o `#660101` do Pentiment sob `#e3e3e3` dá 10,4:1) ou numa variante clareada só para links. *(SIGNALIS `#cc3500`; bordô `#660101` do Pentiment)*
10. **CTAs textuais entre colchetes** (`[ ENTER THE ARCHIVE ]`, `[ OPEN FILE 002 ]`, `[ SOUND ARCHIVE ]`) com borda de 1–2 px no hover/foco. Sem botões arredondados nem ícones de loja. *(SIGNALIS; botões fantasma de Until Then)*
11. **Movimento opt-out visível:** um toggle `MOTION: ON/OFF` no hero, sincronizado com `prefers-reduced-motion` (se o SO pede redução, o toggle some e a névoa para). Reveals só existem sob `html.motion`. O som segue a mesma lógica: começa desligado e liga num clique explícito. *(Pentiment)*
12. **Rota `/warnings` + aviso no `ENTER`** (fotossensibilidade do CRT/flicker, violência, tortura, temas religiosos) e spoilers com `<details>` acessível em vez de "selecione para ler". *(SIGNALIS `SignalisWarnings.html`)*
13. **Hero vivo barato:** imagem pré-renderizada do mosteiro + *displacement* de névoa com ruído procedural num shader pequeno, sem cena 3D inteira e sem textura de nuvem de 535 KB. A intro **é** o loader: o NEMETON MODE compila shaders e baixa texturas enquanto a abertura roda. *(PixiJS do Pentiment; técnicas de carga do Igloo)*
14. **HTML primeiro, 3D como camada:** todo texto existe no DOM e é navegável sem JS. O NEMETON MODE nunca é o único caminho até um conteúdo, e cada subpágina herda papel, bordas e marcas d'água: nada de cair num template genérico. *(contra Igloo/Disco Elysium; contra a página de notícia do Pentiment)*
15. **Legendas e making-of com voz:** legendas são nomes de cena ou frases-tema ("The roof, where the pendant fell"), nunca "screenshot". O lightbox leva legenda e `alt` junto, e uma seção `HOW THIS ARCHIVE WAS MADE` explica low-poly, paleta e fontes como no "An Illuminated World". Personagens podem ganhar uma porta lúdica opcional (P2): "Which of the three would Nemeton keep?". *(Until Then: legendas e quiz; Pentiment: making-of e lightbox)*

### 8.3 Notas de execução que saem daqui

- **Tipografia (candidatas para o TASKS §0, licença OFL):** narrativa em serifada de época com legibilidade testada. *Old Standard TT* reproduz as "Modern" de livros do fim do século XIX, o que bate com 1898; *IM Fell* (do Obra Dinn) é mais antiga e áspera e serve só para display. Metadados em mono, display em condensada utilitária (no papel da *Pathway Gothic One*). Tudo auto-hospedado: nenhuma referência que usa Google Fonts por CDN deve ser copiada nisso (`legal.md`: nenhum terceiro antes do clique).
- **Terceiros:** zero GTM/consentimento (contra Until Then e Pentiment). Analytics sem cookies (Plausible ou similar, como no Disco Elysium). Vídeo só com fachada `lite-youtube` em modo `nocookie` (Until Then), carregado no clique.
- **Imagens:** sempre com `width/height`, `loading="lazy"` abaixo da dobra e AVIF/WebP via `<picture>` (Until Then faz o `<picture>` e esquece o resto: 6 × 1,7 MB).
- **Carrosséis:** proibidos com autoplay. Se existirem, com pausa (falha WCAG 2.2.2 do Obra Dinn).

### Fontes consultadas

- https://untilthengame.com/ · `/quiz.html` · `/fan-merch-policy` (cópias em `research/raw-ut/`)
- https://pentiment.obsidian.net/ · `/news/obsidian/obsidian-entertainment-announces-pentiment` · `/rss` · CSS/JS de `/build/assets/` (cópias em `research/raw-pent/`)
- https://rose-engine.org/ · https://rose-engine.org/signalis/ · `/signalis/SignalisWarnings.html` (cópias em `research/raw-sig/`)
- https://publicdomainreview.org/ (cópia em `research/raw-pdr/`) · https://publicdomainreview.org/collection/mutus-liber/
- https://obradinn.com/ · `/css/styles.css` (cópias em `research/raw-obra/`)
- https://discoelysium.com/ · CSS `/_next/static/css/` (cópias em `research/raw-de/`)
- https://www.igloo.inc/ (cópia em `research/raw-igloo/`) · https://www.awwwards.com/igloo-inc-case-study.html
- Tamanhos de assets: requisições HEAD em 2026-10-08 (podem mudar).

