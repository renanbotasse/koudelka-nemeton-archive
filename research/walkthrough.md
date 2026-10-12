# Walkthrough do Nemeton Monastery (Koudelka, PS1, 1999) — dossiê de pesquisa

Data da pesquisa: 2026-10-08. Idioma: pt-BR; nomes de áreas, itens e termos de jogo em inglês.
Versão de referência das fontes: NTSC-U (a LP e a wiki descrevem a versão ocidental).

## 0. Como ler este documento

### Fontes (chaves usadas nas citações)

| Chave | Fonte | URL | Tipo / confiança base |
|---|---|---|---|
| W:Area | Shadow Hearts Wiki, página da área (lida via API MediaWiki do Fandom, texto-fonte do wikitext) | `https://shadowhearts.fandom.com/wiki/<Nome_da_area>` (ex.: `.../wiki/Storage_Room`) | Wiki de fãs; itens/inimigos por área. Confiança ALTA para listas de itens, MÉDIA para ordem |
| W:NM | Wiki, Nemeton Monastery | https://shadowhearts.fandom.com/wiki/Nemeton_Monastery | idem |
| W:Item | Wiki, páginas de itens (Old Letter, Daniel's Arm, Red Key, Mask, Disk) | `https://shadowhearts.fandom.com/wiki/Old_Letter` etc. | ALTA (texto in-game citado) |
| W:Char | Wiki, páginas de personagem (Koudelka Iasant, Edward Plunkett, James O' Flaherty) | https://shadowhearts.fandom.com/wiki/Koudelka_Iasant | MÉDIA (resumo de enredo) |
| LP:NN | "Koudelka" Let's Play de The Dark Id, Part NN (NTSC-U, emulador, jogo completo com screenshots/transcrição) | `https://lparchive.org/Koudelka-(by-The-Dark-Id)/Update%20NN/` (NN = 01..31) | Playthrough real, ordem de visita observada. Confiança MÉDIA-ALTA para rota/ordem; é uma única pessoa e tem opiniões (ignoradas aqui) |
| WP | Wikipedia, Koudelka | https://en.wikipedia.org/wiki/Koudelka | ALTA para enredo geral, nada de rota |
| GF | GameFAQs (guias de mysticcat, MMalekzandi, Gobi) | https://gamefaqs.gamespot.com/ps/197752-koudelka/faqs (guias `/faqs/12644`, `/7338`, `/14373`) | NÃO LIDOS: retornam HTTP 403 ao acesso automatizado. Existem, mas nada aqui foi tirado deles |

Escala de confiança: ALTA = duas fontes independentes concordam ou texto in-game citado; MÉDIA = uma fonte; BAIXA = inferência.

### Convenções e avisos importantes

- Os nomes de áreas seguem a wiki (`Category:Koudelka Locations`). A wiki NÃO tem páginas para "Gates and Walls" nem "Stables" (a API devolve `missingtitle`; a lista da categoria é: Archives, Bell Tower Spire, Caretaker's Quarters, Charlotte's Cell, Church, Church Nave, Inner Grounds, Library, Nemeton Graveyard, Nemeton Monastery, Patrick's Quarters, Prison, Storage Room, Underground Passage, Underground Shrine, Vestry; Dungeon e Nemeton Monastery Grounds existem mas são esparsas). Por isso essas duas áreas foram reconstruídas a partir de W:Caretaker's Quarters, W:Koudelka Iasant e LP:01/03/05. Detalhado em cada seção.
- A ordem de visita abaixo vem do Let's Play (LP), cruzada com a wiki. A ordem pedida na tarefa (lista de áreas) NÃO é a ordem real de jogo; a ordem real está na seção 17.
- Spoiler: nenhum / leve / grave (grave = revela a identidade da ameaça final, mortes ou o destino de Elaine/Patrick/James).
- Nenhuma sala, item ou rota foi inventada. O que não se confirmou está marcado NÃO VERIFICADO.

## 1. Estrutura de discos (o que se sabe)

- O jogo tem 4 discos (confirmado: LP:09 "Koudelka is a four disc game"; WP cita Disc 1 a Disc 4 nas referências).
- Fim do Disc 2 (CONFIRMADO, já dado pela equipe e confirmado por duas fontes): Church Nave, Koudelka foge do Gargoyle e o disco acaba na transição de tela ao pé da escada. W:Church_Nave: "It is the final area of the second disc"; LP:15: "the end of Disc 2 ... at the screen transition at the bottom of the stairs". (A equipe descreve como "meia-noite na nave"; a LP diz "midnight on November 1st" para o portal/Gargoyle. Confiança ALTA.)
- Fronteiras adicionais, SÓ pela LP (não confirmadas por segunda fonte), confiança MÉDIA:
  - Fim do Disc 1: no Dungeon, a sala "chair storage" cai (piso podre) e o trio despenca numa cela do Prison; fim de disco em seguida. LP:08 ("So concludes Disc 1 of 4"); LP:09 começa o Disc 2 na cela.
  - Início do Disc 3: Koudelka sozinha no pátio central (Inner Grounds). LP:15 (fim D2) e LP:16 ("Welcome to Disc 3").
  - Fim do Disc 3: após derrotar o Apostle no Vestry, cena na porta destruída. LP:25 ("Disc 3 of Koudelka draws to a close").
  - Início do Disc 4: obter nitroglicerina e explodir o portão do Vestry. LP:26 ("Welcome to the fourth and final disc").
- Nota para o site: no disco físico, o menu principal vem em "New Game" nos 4 discos e, se escolhido, trava em "Insert Disc 1" (LP:09). Os saves permanentes só existem após derrotar o chefe da área; os "temporary saves" foram acrescentados nas versões ocidentais (LP:08).

## 2. Mapas: o que existe (resumo; detalhe por área abaixo)

Imagens de mapa de andar (wiki, W:NM, seção "Strategy Guide Map"; a wiki as chama Ground Floor / Second Floor / Third Floor / Underground):

| Arquivo | URL direta | Tamanho (API imageinfo) | Cobre (INFERIDO, não verificado visualmente) |
|---|---|---|---|
| 0floor.jpg | https://static.wikia.nocookie.net/shadowhearts/images/8/8c/0floor.jpg | 919x792 | Andar 0 = "Underground": Dungeon, Prison, Charlotte's Cell, Underground Shrine/acid pit, Underground Passage |
| 1stfloor.jpg | https://static.wikia.nocookie.net/shadowhearts/images/f/f9/1stfloor.jpg | 1297x990 | "Ground Floor": Caretaker's Quarters (térreo), Storage Room, Library, Archives, Inner Grounds, Church Nave |
| 2ndfloor.jpg | https://static.wikia.nocookie.net/shadowhearts/images/4/49/2ndfloor.jpg | 1317x947 | "Second Floor": corredor do Gatehouse, Library superior, Church, Patrick's Quarters (parte) |
| 3rdfloor.jpg | https://static.wikia.nocookie.net/shadowhearts/images/0/08/3rdfloor.jpg | 463x1040 (vertical) | "Third Floor": a LP diz que os andares 3 a 7 são só a torre oeste (Bell Tower); a LP:03 chama o sótão do início de "third floor" |
| K-mat3-1-.jpg | https://static.wikia.nocookie.net/shadowhearts/images/d/d5/K-mat3-1-.jpg | 500x263 | NÃO VERIFICADO (provável material/arte; a wiki também tem K-mat1-1-.jpg e K-mat2-1-.jpg) |

Observações de qualidade: (1) as imagens estão protegidas contra hotlink (HTTP 403 em curl); no site, copiar manualmente pelo navegador ou pedir permissão; (2) o mapeamento "andar -> áreas" acima é inferência pelos nomes de arquivo e da seção; não consegui ver as imagens. Confiança BAIXA para o mapeamento, ALTA para a existência/URL/tamanho. (3) A wiki também lista "In-game Map" First a Seventh Floor + Basement sem URLs claras. Em jogo, o mapa completo só existe depois de usar a Stone Tablet na Printing Press da Library (LP:13); antes disso o jogador tem só o Monastery Map do início (LP:03).

Miniaturas de mapa por área (cada página da wiki tem uma, minúscula, 135-143 x 82-85 px; só serve de ícone):
- Caretaker's Quarters: https://static.wikia.nocookie.net/shadowhearts/images/5/5a/Caretakersquatersmap.jpg
- Storage Room: https://static.wikia.nocookie.net/shadowhearts/images/a/aa/Storageroommap.jpg
- Library: https://static.wikia.nocookie.net/shadowhearts/images/d/d5/Librarymapmap.jpg
- Archives: https://static.wikia.nocookie.net/shadowhearts/images/6/63/Archivesmap.jpg
- Church Nave: https://static.wikia.nocookie.net/shadowhearts/images/7/79/Navemap.jpg
- Inner Grounds: https://static.wikia.nocookie.net/shadowhearts/images/6/66/Innergroundsmap.jpg
- Nemeton Graveyard: https://static.wikia.nocookie.net/shadowhearts/images/3/30/Graveyardmap.jpg
- Patrick's Quarters: https://static.wikia.nocookie.net/shadowhearts/images/b/ba/Patricksquatersmap.jpg
- Prison (também usada em Charlotte's Cell): https://static.wikia.nocookie.net/shadowhearts/images/c/ca/Prisonmap.jpg
- Dungeon: https://static.wikia.nocookie.net/shadowhearts/images/5/58/Dungeonmap.jpg
- Underground Passage: https://static.wikia.nocookie.net/shadowhearts/images/a/af/Undergroundpassagemap.jpg
- Underground Shrine: https://static.wikia.nocookie.net/shadowhearts/images/a/a0/Undergroundshrinemap.jpg
- Church: https://static.wikia.nocookie.net/shadowhearts/images/4/4e/Churchmap.jpg
- Vestry: https://static.wikia.nocookie.net/shadowhearts/images/4/4e/Vestrymap.jpg (mesmo hash que Churchmap.jpg na resposta da API; possível duplicação do arquivo, NÃO VERIFICADO)
- Bell Tower Spire: https://static.wikia.nocookie.net/shadowhearts/images/c/cd/Bellspiremap.jpg

Imagens de solução de puzzle (wiki): StorageRoomPuzzleSolution.jpg (262x281) https://static.wikia.nocookie.net/shadowhearts/images/3/37/StorageRoomPuzzleSolution.jpg ; MusicPuzzleSolution.jpg (232x183) https://static.wikia.nocookie.net/shadowhearts/images/3/37/MusicPuzzleSolution.jpg ; Window.jpg (362x343, vitral) https://static.wikia.nocookie.net/shadowhearts/images/7/77/Window.jpg
Screenshots de fãs/renders: Nemeton_Early_Render https://static.wikia.nocookie.net/shadowhearts/images/7/70/Nemeton_Early_Render.jpg ; SH1NemetonMonastaryExterior https://static.wikia.nocookie.net/shadowhearts/images/b/b1/SH1NemetonMonastaryExterior.jpg ; Monastarykoudelka https://static.wikia.nocookie.net/shadowhearts/images/f/f6/Monastarykoudelka.jpg ; St_David%27s_Cathedral (inspiração real) https://static.wikia.nocookie.net/shadowhearts/images/d/d8/St_David%27s_Cathedral.jpg . As páginas de área têm galerias "KScreenNNN.jpg" (não listadas aqui; nomes nos wikitexts das páginas de área).

Licença: texto da wiki é CC-BY-SA (W:NM, rodapé); imagens do jogo são material com copyright da Sacnoth/Infogrames. Para o site, preferir link/atribuição em vez de re-hospedar. LP: não reutilizar texto.

---

## 3. Gates and Walls (portão, muro, telhado e Gatehouse)

Fonte para esta seção: LP:01, LP:05, LP:16; W:Caretaker's_Quarters (seção Gatehouse); W:Koudelka_Iasant. Não existe página wiki "Gates and Walls"; a área é reconstruída a partir de três momentos. Confiança MÉDIA.

1. Ordem/enredo: primeira cena do jogo (Koudelka, 1898, 31 de outubro). Depois, de novo no fim do Caretaker's (Gatehouse, com James e Edward); por fim, no Disc 3 (portão principal trancado e estátua do Sacnoth).
2. Rota:
   - Abertura: o portão principal está trancado; Koudelka usa corda e sobe pela lateral até o telhado (LP:01; W:Koudelka_Iasant). Ela escorrega, agarra um toldo e perde o pendant (LP:01). Entra por uma janela (cai na sala com Edward; ver seção 4).
   - Gatehouse: sobre o portão principal, ligação ao Dungeon. Fica barrada até James ser resgatado no Herb Garden; então Ogden e Bessy atiram da lateral (a LP vê como tiros da janela do corredor, 2nd floor), e o Seeker Trio ataca ao abrir a porta (W:Caretaker's_Quarters, seção Gatehouse; LP:05).
   - Saída: porta ao fim do corredor leva ao "dungeon tower" (LP:05 final, LP:06).
   - Disc 3: o portão principal continua trancado (LP:16: "Unfortunately, it's locked and cannot be opened"). À direita do portão fica a estátua que segura o Sacnoth Sword (ver Inner Grounds, seção 9).
3. Itens: Tornado Spell (Seeker Trio, no Gatehouse) [W:Caretaker's_Quarters]. Nada mais listado para Gates and Walls.
4. Inimigos/chefe: Seeker Trio (chefe; Blue, Green/Wind e Red/Fire, cores = elemento). Dica (LP:05): martelo de Fire derruba o azul de um golpe; Fire Seeker (1200 HP) é fraco a Geyser (Water); os outros têm ~800 HP. Recompensas citadas na LP:05: Tornado, Axe (tabar), Earth Rapier, Water J Ring (acessórios/armas têm elemento aleatório). Confiança MÉDIA.
5. Puzzles: nenhum.
6. Mapa: a wiki não tem mapa próprio. Provável 2nd floor (corredor) em `2ndfloor.jpg` (INFERIDO, BAIXA). Há o "Monastery Map" do item no início (LP:03).
7. Spoiler: leve (a cena do telhado e os tiros dos Hartman são do início; revelam que o casal é hostil).

## 4. Stables (sala inicial: Grain Storage / hay storeroom, andar e sótão)

Fonte: W:Caretaker's_Quarters (seção Grain Storage; a wiki chama o ponto de partida de Grain Storage; W:Koudelka_Iasant diz "stable rafters"); LP:01, LP:03. Confiança MÉDIA no nome ("Stables" parece ser o rótulo informal; a página de Caretaker's Quarters usa a imagem `Stablekande.jpg`). Não existe página própria.

1. Ordem/enredo: PRIMEIRA área do jogo; Koudelka e Edward Plunkett (James só depois).
2. Rota:
   - Cena: Koudelka cai, encontra Edward ferido; o Werewolf (chefe) ataca; Edward joga a arma.
   - Vença o Werewolf (3 tiros bastam, LP:01) e cure Edward (cena). O jogador aprende o básico do combate em grade (LP:02).
   - Examine o desenho/quadro do navio perto da escada: Dirk (W:Caretaker's_Quarters). A LP:03 descreve o Dirk como item "atrás de um quadro" no corredor; pode ser o mesmo ou outro quadro, NÃO VERIFICADO.
   - Suba a escada de mão ao sótão (um quarto) e pegue o Monastery Map no barril coberto por pano (LP:03).
   - Saída: porta a oeste trancada por dentro (volta depois pelo Storage Room, LP:03/LP:11); porta ao sul segue; escadas ao 1st floor.
3. Itens a NÃO perder: Flare Spell (derrotar Werewolf), Potion, Pistol Rounds x2, Listel, Monastery Map (mapa de toda a área; some a utilidade se perder), Bread, Dirk (examinar o quadro do navio) [W:Caretaker's_Quarters]. Missable: o jogo não diz nada; o Monastery Map está camuflado no cenário do sótão (LP:03). Nenhuma fonte diz que se perde para sempre.
4. Inimigos (W:Caretaker's_Quarters, lista conjunta com o Caretaker's): Black Cat, Sucker, Explode Corpse, Face, Giant Roach, Hand of Glory, Headless Corpse, Inverse (Type A) etc.; Chairs/Jester no sótão (LP:03). Chefe: Werewolf. Dica: o Inverse atira e pode matar a dupla em poucos turnos logo no início (LP:10); salve com frequência (temporary save existe).
5. Puzzles: nenhum.
6. Mapa: a wiki usa a miniatura Caretakersquatersmap.jpg (ver seção 2). Andar: térreo + 2nd + sótão (3rd). 1stfloor.jpg / 2ndfloor.jpg (INFERIDO).
7. Spoiler: nenhum.

## 5. Caretaker's Quarters (Living Quarters, Kitchen, Herb Garden, Well, Toolroom)

Fonte: W:Caretaker's_Quarters; LP:03, LP:04, LP:05, LP:12.

1. Ordem/enredo: logo após a Stables; Koudelka + Edward; James entra no Herb Garden. Revisita no Disc 2 com a Red Key.
2. Rota:
   - Do corredor (1st floor), a primeira porta leva ao Living Quarters (jantar com Ogden e Bessy Hartman; sopa envenenada; Ogden dá munição). A porta fica trancada por "Red Key" depois (LP:03).
   - Cozinha: a faca na mesa; saída NE leva à frente; saída NW dá no Well (Shams) com Panacea (LP:04).
   - Pelo segundo caminho, Toolroom (martelo, pipe, wine; Spectre) e sala das caldeiras; segue ao Herb Garden (aviso "Something's not right").
   - Herb Garden: Giant Plant (chefe) => Holy Font (primeiro Permanent Save). James está desacordado no chão; fale com ele para entrar no grupo (LP:04).
   - Corredor do 2nd floor ao Gatehouse (ver seção 3).
3. Itens a NÃO perder (W:Caretaker's_Quarters):
   - Grain Storage: ver seção 4.
   - Living Quarters (1ª visita): Pistol Rounds (automático, dado por Ogden).
   - Kitchen/Herb Garden: Knife, Cheese, Antidote, Listel, Pipe, Hammer, Geyser Spell (derrotar Giant Plant), Icon's Necklace (chave para estátua do pátio no Disc 3; ITEM-CHAVE; guarde).
   - Revisita (Red Key aberto): Rifle Rounds; Badge (examine a gaveta); Dragon Statue (na mesa de jantar; parte do trio Goat/Lion/Dragon, ver Library); Valna's Doll (sala dos fundos, quadros do navio); Mask (sala dos fundos; reduz encontros aleatórios enquanto no inventário, W:Item Mask).
   - Examinar o quadro central do Princess Alice (sala dos fundos) dispara uma FMV opcional da tragédia (LP:12; contexto: https://shadowhearts.fandom.com/wiki/Princess_Alice, confiança MÉDIA).
   - MISSABLE: a wiki não marca nada como perdível para sempre aqui; a LP indica que o Mask só vale se mantido no inventário (LP:12).
4. Inimigos: Black Cat, Sucker, Explode Corpse, Face, Giant Roach, Hand of Glory, Headless Corpse, Inverse, Jester, Sham, Possessed Armor/Chair/Table, Puppet, Shadow, Spectre. Chefes: Werewolf, Giant Plant, Seeker Trio. Dica Giant Plant (1500 HP): fraca a Fire (LP:04); Flare de Koudelka funciona e o Fire Hammer (achado na Toolroom) tirou quase 1/3 do HP por golpe; aproxime Koudelka para a magia não perder força com a distância. Hand of Glory solta Dried Food (LP:05).
5. Puzzles: nenhum. Segredo opcional: itens "temporais" (ex.: Bessy's Ring, Ogden's Shirt) aparecem se salvar num tempo exato com 10/21/32/43 itens no inventário (LP:05, LP:08); confiança MÉDIA, não cobrir como regra oficial.
6. Mapa: miniatura Caretakersquatersmap.jpg; andares 1st, 2nd (1stfloor.jpg, 2ndfloor.jpg; INFERIDO).
7. Spoiler: leve (o casal envenena os heróis; James é apresentado).

## 6. Storage Room (Store Room, Holy Water Font, Alias' Den, Puzzle Room)

Fonte: W:Storage_Room; LP:10, LP:11, LP:12. Fica no Disc 2 (depois do acid pit).

1. Ordem/enredo: Disc 2, após o Underground Shrine (Mad Fly). Trio completo.
2. Rota:
   - Saindo do Underground Shrine, entra-se numa sala de depósito com cena (James e Edward discutem) e uma porta trancada por Red Key (LP:10).
   - Pegue Bow Gun, Arrows, Pistol Rounds; do canto superior, o Stone Tablet e o Lion Statue (LP:10; lista W).
   - Suba a escada: no meio da parede há gesso que desmorona se jogar água de cima (Holy Water Font), liberando o Goat Statue (ver Dark Young).
   - Sala do Holy Water Font: chefe Dark Young; depois o Font vira Permanent Save e a água cai no andar de baixo, soltando o Goat Statue (W:Storage_Room: "After defeating the Dark Young, and re-examining the plaster-covered wall").
   - Store Room (foyer): cena do lustre derrubado por Alias; pegue Daniel's Arm perto do lustre; suba ao balcão: luta com Alias (chefe); saquear: DA Pistol, Pistol Rounds, Red Key, Brown Glass Part (LP:11/12).
   - Alias' Den (porta trancada; abre com a Red Key tirada de Alias): Music Box (gaveta), Roman Nuts, Pistol Rounds. Puzzle Room (atrás do corpo): ver 5. Shotgun Shells na Puzzle Room.
3. Itens a NÃO perder (W:Storage_Room): Bow Gun, Arrows, Pistol Rounds, Goat Statue (só depois do Dark Young), High Listel, Stone Tablet (leva à Printing Press: mapa completo), Lion Statue, Old Letter (SOLUÇÃO do órgão final; ver Church), Evil Horn (queda do Dark Young; lança especial), Daniel's Arm (ITEM-CHAVE: precisa no Church), DA Pistol, Red Key (abre Caretaker's e o Den), Brown Glass Part (vitral), Music Box (para o Music Puzzle da Library), Roman Nuts (recupera HP/MP total), Shotgun Shells. Missable: Daniel's Arm vem de cena obrigatória; a wiki não marca nada como perdível para sempre. A LP nota o limite de 50 itens, que pode forçar descarte de coisas úteis (LP:12).
4. Inimigos: Black Cat (solta Cat's Eye, LP:11), Sucker B, Explode Corpse B, Face B, Hand of Glory, Giant Roach B, Inverse B, Jester B, Sham B, Nobleman's Spirit B, Possessed Armor B, Puppet B, Shadow B. Chefes: Dark Young (2916 HP, Earth: fraco a Wind; ~300-350 de dano com Flare nv2 (LP:10); lança Silence em todos: leve Panacea), Alias (2116 HP; atira de longe; ataque mágico erra sempre; destrua primeiro as duas pilhas de caixas (1296 HP cada) com Bow Gun/Fire, então bata nele; LP:11).
5. Puzzle (Puzzle Room, piso de símbolos): caminho (LP:12): triangle, mixed-drink glass, flask, Roman number 4, flask de novo, round flask, pitchfork, spooky eye, Mercury symbol. Pistas: a nota no topo da escada perto do Font (Bong, Pitchfork, Eye, Ankh with Devil Horns) e um desenho numa caixa na sala de Ogden/Alias. A wiki só tem imagem da solução (StorageRoomPuzzleSolution.jpg, ver seção 2). Confiança MÉDIA: a descrição da LP usa nomes de símbolos informais; confirmar contra a imagem.
6. Mapa: Storageroommap.jpg (miniatura); andar: 1st floor + subsolo (1stfloor.jpg / 0floor.jpg, INFERIDO).
7. Spoiler: leve (Alias é morto por Edward; revela Alias como o atirador).

## 7. Library (office, saferoom, Music Puzzle Room, sala secreta de Roger Bacon; Archives anexa)

Fonte: W:Library, W:Archives (sala anexa, também citada na lista de locais da W:NM); LP:13, LP:14, LP:15, LP:20.

1. Ordem/enredo: Disc 2, depois do Storage Room. Trio completo. Revisita no Disc 3 (reencontro após a fuga solo de Koudelka).
2. Rota:
   - Entre pelo puzzle do Storage Room; a Library tem o andar de cima (escritório) e o térreo.
   - Escritório: um fragmento de vitral; gaveta com cofre (só abre após juntar todos os fragmentos).
   - No térreo: relógio de pêndulo gigante; Mars (inimigo) perambula.
   - Printing Press Room (fundos): FMV; usar o Stone Tablet na prensa pequena do canto (a grande está quebrada) imprime o Original Map; parede desaba revelando alcove com Arrows e a Disk (gramofone), mas o resto é bloqueado até o chefe cair (LP:13).
   - Porta à esquerda da prensa: wine storage com fragmento de vitral e a porta dos 3 "paperweights" (Goat, Lion, Dragon) para a sala do Chimera (Archives).
   - Archives: chefe Chimera (4225 HP, fraquíssimo a Water; Geyser nv2 tira ~62%). Depois: Blue Glass Part, Icon's Crown, Rifle Rounds, Disk, Arrows (W:Archives) e Holy Font/Permanent Save.
   - Relógio: com o Relief Piece da Church Nave, suba no relógio de pêndulo e encaixe a peça no buraco acima dele (LP:14); isso abre a passagem para o Music Puzzle Room e, depois, para a sala secreta de Roger Bacon (ver 5).
3. Itens a NÃO perder:
   - Library (W:Library): High Listel, Rifle Rounds; Saferoom: Ochre Glass Part, Sophia's Letters (opcional; necessárias para o final bom de Charlotte); Secret Room: Green Glass Part.
   - Archives (W:Archives): Full Map of Nemeton Monastery (Printing Press), Blue Glass Part, Icon's Crown (ITEM-CHAVE para a estátua do pátio), Disk (gramofone, abre o arquivo de Patrick no Disc 3), Rifle Rounds, Arrows.
   - A LP:13 e W divergem na atribuição exata de cada fragmento de vitral (W: Brown/Ochre/Green/Blue/Red; LP descreve peças em escritório, wine storage, Chimera e cripta). NÃO VERIFICADO: qual peça vem de qual sala.
   - Sophia's Letters: MISSABLE em sentido de ramificação (ver Charlotte's Cell): sem as cartas e sem orar no túmulo de Charlotte, o jogador luta contra Charlotte's Wrath e ganha Star Brooch em vez de Flare Brooch (W:Charlotte's_Cell; LP:20).
4. Inimigos (W:Library): Chikon B, Headless Corpse B, Inverse B, Mars A (solta Scrolls raros), Minotauros A, Tamacoss B, Watcher B; Archives: Chikon, Demonic Bead, Eyeball, Inverse, Mars, Minotauros, Pricktail, Spectre. Chefe: Chimera. Dica: Water Knuckles em Edward + Geyser em Koudelka; cuidado com cabeçadas (800-900 de dano; Poison/Silence/Paralysis) (LP:13).
5. Puzzles:
   - Music Puzzle (W:Library): comece em "blue Earth symbol", cruze o central Mercury, vá ao "pale orange Venus", suba ao "red Mars", cruze Mercury de novo, termine em "orange Moon/Sun". Errou: pise no Mercury para resetar. Alternativa na LP:14: a ordem em quatro pisos é Right, Left, Top, Bottom (descrição diferente do mesmo puzzle; NÃO VERIFICADO se são puzzles diferentes: a wiki descreve um com símbolos, a LP descreve 4 pisos com tons da Music Box). Depois do puzzle a Music Box quebra e é descartada.
   - Vitral/cofre: a combinação "θυσία" (sacrifice) é auto-inserida; não há puzzle real (LP:15; W:Church_Nave).
   - Relief Piece: enfiar no buraco acima do relógio (LP:14).
6. Mapa: Librarymapmap.jpg e Archivesmap.jpg (miniaturas); andar: 1st e 2nd (1stfloor.jpg/2ndfloor.jpg, INFERIDO).
7. Spoiler: leve a médio na parte do coffin; GRAVE na cena de Roger Bacon (ele acorda e fala da Émigré Document e dos Formors; identidade/história revelada).

## 8. Church Nave (Stain Glass Room, nave, primeiro encontro com o Gargoyle)

Fonte: W:Church_Nave; LP:14, LP:15, LP:27. Fim do Disc 2.

1. Ordem/enredo: logo após a Library (via "Triangular Hallway" com portão trancado, LP:14). Trio completo; o disco acaba aqui.
2. Rota:
   - Da Printing Press/alcove, passagem abre para o corredor da nave; Minotauros guarda o Relief Piece no centro (pegue).
   - Stain Glass Room: coloque os fragmentos; falta uma peça, que vem da sala secreta de Roger.
   - Corredor da nave: porta final que só abre por "chave" (mecanismo) até restaurar o vitral.
   - Quando o vitral é restaurado: abre a porta do corredor da nave e dispara o cofre da Library (Sophia's Letters).
   - Church (parte frontal da nave): Ravens, Wights, Chikon (solta Rosario). Pegue a Shotgun 2 (corpo à direita da nave).
   - Ao tentar prosseguir, cena do portal e o Gargoyle: luta forçada e impossível; fugir (comando Escape, tecla O). Disco acaba.
3. Itens (W:Church_Nave): Relief Piece (ITEM-CHAVE), Shotgun 2 (examine o corpo no lado direito da nave). MISSABLE (LP:15): "there's a weapon here that will be lost forever if we don't pick it up now" = Shotgun 2. Confiança MÉDIA (só LP afirma "perdida para sempre"; a wiki confirma só o local).
4. Inimigos: Chikon B, Headless Corpse B, Inverse B, Minotauros A, Spectre B, Watcher B. Chefe: Gargoyle (Disc 2 obrigatório e impossível: fuja; Disc 3/4 opcional, ver Inner Grounds). Dica: o Gargoyle desvia de tudo no D2 (LP:15).
5. Puzzle: vitral (θυσία), auto-resolvido.
6. Mapa: Navemap.jpg (miniatura); andar: 2nd / 1st (INFERIDO).
7. Spoiler: médio (o Gargoyle aparece; vincula-se à revelação do monstro posterior).

## 9. Inner Grounds (pátio, estátuas, fonte, Sacnoth Statue)

Fonte: W:Inner_Grounds; LP:16, LP:21, LP:27. Início do Disc 3.

1. Ordem/enredo: Disc 3, Koudelka SOZINHA (separada de Edward/James na fuga); LP:16. Revisita no Disc 4 para o Gargoyle e a Sacnoth.
2. Rota (LP:16):
   - Chegue ao pátio; a fonte atrás do prédio central é o Permanent Save (Holy Font); a porta do prédio central está barrada pela cachoeira/fonte.
   - Caminhe a leste: o portão principal (trancado); à direita dele, a Sacnoth Statue.
   - Coloque as joias nas estátuas: Icon's Necklace, Icon's Ring, Icon's Earrings (duas estátuas "Twin"), Icon's Crown (última estátua, fica "correndo em direção à câmera").
   - Salve (permanent save) ANTES da última joia: ao ligar, o Holy Font desliga para sempre.
   - Vá à fonte seca e pegue Koudelka's Pendant.
   - Entre no prédio central: Underground Passage (seção 11).
3. Itens: Rifle Rounds, High Listel, High Potion, Koudelka's Pendant (após esvaziar a fonte), Sacnoth Sword (derrotar Gargoyle), em W:Inner_Grounds. MISSABLE CRÍTICO: Koudelka's Pendant. A LP:16 diz que o jogo não o torna obrigatório explicitamente, mas sem ele a luta final termina em game over de "face melting" (LP:29; W:Char: "non-standard game over if the player doesn't find, or discards Koudelka's Pendant"). Se perdido, o Black Cat (ou inimigo tardio) tem chance mínima de dropar outro (LP:29, confiança MÉDIA). Guia: https://shadowhearts.fandom.com/wiki/Koudelka%27s_Pendant (leitura parcial, W). Confiança ALTA no efeito (duas fontes).
4. Inimigos (W:Inner_Grounds): Brute, Corpse Hound, Explode Corpse, Ghoul, Giant (6000+ HP; Wind: Megalith nv2), Headless Corpse, Wight. Dica solo (LP:16): coloque Koudelka na back row; Brutes dão Paralysis.
5. Puzzles: nas estátuas (ver rota). Joias vêm dos chefes: Necklace (Giant Plant), Ring (Mad Fly), Earrings (Doppelgänger Trio), Crown (Chimera).
6. Mapa: Innergroundsmap.jpg (miniatura); andar: 1st / 0 (1stfloor.jpg; INFERIDO).
7. Spoiler: leve (Sacnoth, Pendant); GRAVE se ler a explicação do Pendant.

## 10. Nemeton Graveyard

Fonte: W:Nemeton_Graveyard; LP:19. Disc 3, depois do Underground Passage.

1. Ordem/enredo: saída do Altar of Darkness; Koudelka sozinha; Roger Bacon aparece; depois reencontro com Edward/James.
2. Rota (LP:19): saia do túnel; vá ao fundo e ore no túmulo de Charlotte (pegue Vigna's Doll); continue pelo caminho até o túmulo de St. Daniel (Roger Bacon fala; é preciso orar para progredir); suba a escada que leva ao portão que Roger abre para a Library; reencontro.
3. Itens: Vigna's Doll (túmulo de Charlotte; ITEM-CHAVE para Valna & Vigna), Daniel's Cross (examinar atrás do túmulo de St. Daniel; SÓ versões não NTSC-U; a LP:19 confirma que foi removido da versão NA), Roman Nuts. Orar no túmulo de Charlotte é parte da condição para o final bom dela (W:Charlotte's_Cell; LP:19/20). Missable: sem orar, perde-se o Flare Brooch (ver Charlotte's Cell).
4. Inimigos: Corpse Hound, Ghoul, Raven, Skeleton, Wight (versões mais fortes). Sem chefe.
5. Puzzles: nenhum.
6. Mapa: Graveyardmap.jpg (miniatura); andar: externo (INFERIDO).
7. Spoiler: médio (Roger Bacon e o túmulo de Daniel).

## 11. Underground Passage (Punitive Room, 'Neath the Fountain, Altar of Darkness)

Fonte: W:Underground_Passage; LP:16-19. Disc 3.

1. Ordem/enredo: logo após o Inner Grounds; Koudelka sozinha. Cena de Ogden e Bessy.
2. Rota:
   - Prédio central: guilhotina; escada para baixo: Punitive Room; visão (cena) e Ogden tenta matá-la com machado; Bessy atira nele e se mata. Pegue Rifle RD (Bessy) e a Blue Key (abre Patrick's Quarters, LP:18).
   - Examine as portas duplas e depois a porta do outro lado; fale com Edward/James pela cena (ponto de reencontro: Library).
   - Sala 'Neath the Fountain: chefe Gug (5329 HP, Earth: fraco a Wind; 2-3 casts de Tornado). Depois Holy Font/save.
   - Bottle of Blood: examine a parede sangrando perto do rack na Torture room (W). Jogue o sangue na estátua incrustada no corredor: abre passagem para o Altar of Darkness (The Creature dá dicas).
   - Siga os corredores para a saída que dá no Nemeton Graveyard.
3. Itens (W:Underground_Passage): Rifle Rounds x2, Roman Nuts x2, Rifle RD, Blue Key, Bottle of Blood (ITEM-CHAVE). Gug dropa shotgun melhorada (LP:18; wiki não lista; confiança MÉDIA).
4. Inimigos: Brute, Corpse Hound, Explode Corpse, Face, Ghoul, Hand of Glory, Headless Corpse, Inverse, Raven, Skeleton, Wight. Chefe: Gug. Dica: Tornado em Gug.
5. Puzzle: jogar o Bottle of Blood na estátua (texto em inglês na estátua; solução = usar o item).
6. Mapa: Undergroundpassagemap.jpg (miniatura); andar 0 (0floor.jpg, INFERIDO).
7. Spoiler: GRAVE (mortes de Ogden e Bessy; The Creature).

## 12. Patrick's Quarters (Music Room, Research Library, Laboratory, Portrait Room)

Fonte: W:Patrick's_Quarters; LP:20-25. Disc 3 (final).

1. Ordem/enredo: Disc 3, depois de Charlotte's Cell (a porta abre pela Blue Key). Trio completo.
2. Rota:
   - Entrada: hall principal; Roger Bacon na biblioteca escondida (cena).
   - Music Room: gramofone; use a Disk, abre gaveta com Research Notes (LP:22).
   - Portrait Room (acima, após o estátua-botão): chefe Scapegoat; depois cena com Elaine (pelo retrato).
   - Research Library/estante e Laboratory: Patrick's Memo (70 kg), Empty Bottle (armário), escala.
   - Hearth: pista "Hestia" nos livros; levanta alçapão na lareira; porta secreta com balança.
3. Itens (W:Patrick's_Quarters): Shotgun Shells x2, Research Notes, Reflect Spell (Scapegoat), Arrows, Patrick's Memo, Rifle Rounds, Empty Bottle (ITEM-CHAVE: necessário para o Bottle of Acid), Roman Nuts, Antidote. Ainda: Automatic Pistol (Scapegoat, LP:23), Tinderbox e Shotgun 6 (corpo atrás do puzzle da balança; Tinderbox é necessário no Vestry). Confiança MÉDIA para os últimos (LP).
4. Inimigos: Black Cat, Explode Corpse, Face, Giant Roach, Hand of Glory, Headless Corpse, Inverse, Jester, Nobleman's Spirit, Possessed Armor/Chair/Shelf/Table, Puppet, Scapegoat, Shadow, Sham, Sucker, Watcher. Chefe: Scapegoat (9216 HP, Water: fraco a Fire; Edward é só tanque; Flare nv3 resolve em 2-3 turnos, LP:23).
5. Puzzles:
   - Balança (LP:24): a escala pede 70 kg (Patrick's Memo); Koudelka pesa 45 kg; ajuste o contrapeso para 25 kg. NÃO VERIFICADO em outra fonte.
   - Hestia: examine a estante de 5 volumes no escritório (pista "Hestia" = Hearth); use a lareira apagada no laboratório (LP:24).
   - Quatro bonecas no corredor Vestry/Patrick's: virar as bonecas 1 e 4 para o centro abre o portão (LP:25).
6. Mapa: Patricksquatersmap.jpg (miniatura); andar: 2nd e 1st (INFERIDO).
7. Spoiler: GRAVE (Patrick, Elaine, a ressurreição).

## 13. Prison / Dungeon (cela, torture chamber, Boneroom, Red Room, Priest's Quarters)

Fonte: W:Dungeon, W:Prison; LP:05-09, LP:20. Duas visitas: Dungeon superior no Disc 1; Prison no fim do Disc 1/início do Disc 2; revisita Prison no Disc 3 (entrega das bonecas).

1. Ordem/enredo: Disc 1: Gatehouse -> Dungeon (corredor, Boneroom, Red Room, Priest's Quarters). Disc 1 acaba ao cair na cela. Disc 2: Prison (cela, torture chamber, hallway). Disc 3: volta à Prison com as bonecas.
2. Rota (Dungeon, LP:06/07):
   - Corredor longo; a primeira porta leva à Boneroom (cadeado de baú com código 7038, W:Dungeon; a LP:08 diz que o código aparece no vitral do Priest's Quarters após usar a Red Glass Part). Dentro: Skeletons. Guard's Diary (lore).
   - Red Room: quarto sujo com armário: Mira/Mummy Bride (chefe); Rope Ladder (examine o armário DE NOVO depois da luta).
   - Charlotte aparece no fim do corredor; com a Rope Ladder desça o buraco.
   - Priest's Quarters (pequena capela, Holy Font bloqueado): chefe Doppelgänger Trio. Depois: Red Glass Part (chão), Revive Spell, Icon's Earrings, Permanent Save.
   - Passe pela sala "chair storage": piso cede, queda na Prison (fim do Disc 1).
   - Prison cell: Charlotte conversa; Nobleman's Spirit (rifle); parede cai para a Torture Chamber (Knuckles, Mace); Hallway: dois corpos Valna e Vigna com a Green Key.
   - Disc 3: devolva as duas bonecas (Valna's Doll em Caretaker's; Vigna's Doll no Graveyard); pegue a Green Key (abre a porta para Charlotte's Cell, seção 14).
3. Itens (W:Dungeon): Dried Food, Pistol Rounds, Listel, Guard's Diary (baú 7038), Megalith Spell (Mummy Bride), Rope Ladder, Red Glass Part, Revive Spell, Icon's Earrings. (W:Prison): Pistol Rounds, Antidote, Rifle (Nobleman's Spirit, drop garantido), Potion x2 (após Green Key), Knuckles, Mace, Green Key (só DEPOIS de devolver as bonecas). A cena do Dungeon "Disc 1 ends" implica que o baú 7038 fica fora de alcance por muito tempo (LP:08), mas pode ser aberto antes (código fixo).
4. Inimigos: Dungeon: Corpse Hound, Demonic Bead, Explode Corpse, Ghoul, Hand of Glory, Inverse, Jester, Mummy Bride, Possessed Chair/Shelf, Puppet, Skeleton, Wight. Prison: Brute, Corpse Hound, Explode Corpse, Face, Hand of Glory, Headless Corpse, Inverse, Nobleman's Spirit, Raven, Valna and Vigna. Chefes: Mummy Bride (1225 HP; fraca a Fire/healing, Edward inútil), Doppelgänger Trio (Edward 961, James 841, Koudelka 784 HP; mate Koudelka-clone primeiro; James-clone se cura), Nobleman's Spirit (mid-boss, absorve Geyser), Valna and Vigna (invencíveis: use para treinar magia/arma e fuja com Escape (O)); LP:06, 07, 09.
5. Puzzles: baú 7038 (W). Valna/Vigna: entregar as bonecas encerra a luta de treino (LP:20).
6. Mapa: Dungeonmap.jpg, Prisonmap.jpg (miniaturas); andar 0 (0floor.jpg, INFERIDO) com o Dungeon superior possivelmente no 1st.
7. Spoiler: médio (Charlotte, Valna & Vigna); a seção da Guard's Diary é lore pesada, leve.

## 14. Charlotte's Cell

Fonte: W:Charlotte's_Cell; LP:20; W:Sophia's_Letters (cartas, https://shadowhearts.fandom.com/wiki/Sophia%27s_Letters, baixada no raw). Disc 3.

1. Ordem/enredo: depois da Green Key; trio completo.
2. Rota: Prison hallway -> porta da Green Key -> sala de celas -> escada -> sala de Charlotte (a porta direita "held shut" até o mini-boss cair) -> mini-boss de móveis (Possessed Chairs/Shelves, 5000+ HP, fracos a magia) -> cena. Depois a porta de saída cai e o corredor leva à porta da Blue Key de Patrick's Quarters.
3. Itens (W:Charlotte's_Cell): Flare Brooch (ramo bom: orar no túmulo de Charlotte E ter Sophia's Letters); Star Brooch (ramo ruim: derrotar Charlotte's Wrath); Listel e Pistol Rounds (pise na pilha de corpos). MISSABLE por ramificação: só dá para obter UM dos dois Brooches por jogo (LP:20).
4. Inimigos: Possessed Chair, Possessed Shelf; chefe opcional: Charlotte's Wrath (4761 HP, Fire: Geyser nv2, vomita intestinos mágicos).
5. Puzzle: nenhum; a escolha moral está no passado (cartas + oração).
6. Mapa: Prisonmap.jpg (miniatura, compartilhada); andar 0.
7. Spoiler: GRAVE (destino de Charlotte).

## 15. Underground Shrine (acid pit, Mad Fly)

Fonte: W:Underground_Shrine; LP:09, LP:10, LP:26. Disc 2 (e revisita no Disc 4 para o ácido).

1. Ordem/enredo: Disc 2, logo depois da Prison. Trio completo.
2. Rota (LP:09): corredor/hallway com temp save; "Underground Tunnel"; acid pit (estilo arena); aparelho de ácido à direita da entrada (inútil sem frasco); porta para sala com portão bloqueado "mysterious force"; volte e corra em direção à câmera: caminho oculto até a sala do chefe (símbolo no chão). Mad Fly.
3. Itens (W:Underground_Shrine): Whiskey, Rifle Rounds, Bottle of Acid (depois de ter o Empty Bottle de Patrick's Quarters; Disc 4, LP:26), Icon's Ring (Mad Fly). Pure missable: nada dito.
4. Inimigos: Chikon, Eyeball, Hand of Glory, Mad Fly (chefe), Pricktail, Skeleton, Tamacoss, Watcher. Dica Mad Fly (3025 HP, Wind; fraco a Earth; Megalith ~500/turno; Silence ocasional; LP:09).
5. Puzzle: acid tank + Empty Bottle (Disc 4) para a nitroglicerina; caminho oculto "para a câmera".
6. Mapa: Undergroundshrinemap.jpg (miniatura); andar 0 (0floor.jpg).
7. Spoiler: leve.

## 16. Church (Vestry, crypt/cauldron, Tree of Life)

Fonte: W:Church, W:Vestry; LP:24, 25, 26, 28; W:Char (Edward, James). Disc 3 (Vestry) e Disc 4 (Church).

1. Ordem/enredo: Vestry no fim do Disc 3 (Apostle); Church e crypt no Disc 4. Penúltima área.
2. Rota:
   - Vestry (LP:25): do corredor de Patrick's Quarters, passe o portão destrancado pelas bonecas; no Vestry: reto = chefe Apostle; esquerda = portão da torre oeste; direita = sala escura com o altar (use o Tinderbox, pule no altar: Lifedrinker).
   - Derrote o Apostle (8281 HP; Wind/Light; absorve magia quando "treme": use só ataque físico com Edward + Ogden's Axe quando parado). Recompensas: Crossbow; Holy Font; o portão da esquerda some.
   - Disc 4: James cria nitroglicerina (precisa de Bottle of Acid + frasco; LP:26), Edward atira, a porta explode.
   - Sanctuary: caixão deslocado; no andar de cima o pipe organ: teclas People, Secret, Pain, Light; a ordem vem da Old Letter (W:Old_Letter: "SECRET ... PAIN ... PEOPLE ... LIGHTS"): Secret-Pain-People-Light (LP:28; ALTA, duas fontes).
   - O caixão desliza: crypt com Patrick (corpo) e o Cauldron of Life. Clicar no Cauldron é o ponto sem retorno (LP:28). James joga o Daniel's Arm; vinhas explodem; saída em chamas para a Bell Tower Spire.
3. Itens (W:Vestry): Tinderbox (ITEM-CHAVE; consumido), Shotgun 6 (examinar o corpo), Shotgun Shells x2, Roman Nuts, Pistol Rounds, Lifedrinker (altar escuro; examinar atrás com o Tinderbox), Crossbow (Apostle). Missable: após o ponto sem retorno, a Church queima e não há retorno à Library/Vestry (LP:28 "the way back is literally on fire"); veja o checklist dos itens do Disc 4 e do Gargoyle (seção 9). Gargoyle (Sacnoth) é opcional e só alcançável antes do ponto sem retorno (LP:27/28). Confiança MÉDIA.
4. Inimigos (W:Church): Chikon, Explode Corpse, Ghoul, Giant, Hand of Glory, Headless Corpse, Inverse, Nobleman's Spirit, Puppet, Sham, Spectre, Watcher. Vestry: Apostle (chefe), Brute, Chikon, Demonic Bead, Eyeball, Ghoul, Mars, Minotauros, Pricktail, Raven, Spectre, Tamacoss, Watcher.
5. Puzzles: bonecas (virar 1 e 4), pipe organ (Secret-Pain-People-Light), Tinderbox no altar.
6. Mapa: Churchmap.jpg, Vestrymap.jpg (miniaturas); andar 2nd/1st (INFERIDO).
7. Spoiler: GRAVE (Patrick morto, Cauldron, a árvore).

## 17. Bell Tower Spire

Fonte: W:Bell_Tower_Spire; LP:28-31. Disc 4, área final.

1. Ordem/enredo: logo após o Cauldron; trio completo; final do jogo.
2. Rota: sobe por andaimes de madeira; Vines (mini-chefe, 3 x 5329 HP); sobe ao 4th floor: Vine + Patrick's Vine (10201 HP); save oculto num ponto do pátio (LP:29); entra na flor (Elaine); com o Pendant bloqueia o sopro; Elaine foge; 5th floor/spire; chefe final Elaine (11811 HP).
3. Itens: Shotgun Shells; Idols (aumentam 1 stat, dropam de Giant/chefes finais; LP:28). Rod acessório (drop; LP:28). Keep Koudelka's Pendant (obrigatório).
4. Inimigos (W:Bell_Tower_Spire): Black Cat (pode dropar Pendant), Corpse Hound, Demonic Bead, Elaine, Elaine (Final Form), Explode Corpse, Giant, Headless Corpse, Minotauros, Patrick's Vine, Tamacoss, Vine, Watcher. Dica: Reflect (do Scapegoat) reflete o sopro de Elaine; Edward com Lifedrinker (LP:28/30).
5. Puzzles: nenhum.
6. Mapa: Bellspiremap.jpg (miniatura); 3rdfloor.jpg (torre; INFERIDO).
7. Spoiler: GRAVE (três finais, morte de James).

---

## 18. Ordem recomendada do jogo inteiro (ordem real de visita, LP + wiki)

Disc 1 (confiança MÉDIA; fronteiras só pela LP):
1. Gates and Walls (abertura no telhado).
2. Stables / Grain Storage (Werewolf; Monastery Map no sótão).
3. Caretaker's Quarters: Living Quarters (jantar), Kitchen, Well, Toolroom, Herb Garden (Giant Plant; James entra).
4. Gatehouse / corredor do 2nd floor (Seeker Trio).
5. Dungeon: Boneroom, Red Room (Mummy Bride, Rope Ladder), Priest's Quarters (Doppelgänger Trio); fim do Disc 1 ao cair pela sala de cadeiras.

Disc 2:
6. Prison: cela, Torture Chamber, hallway (Valna e Vigna).
7. Underground Shrine / acid pit (Mad Fly).
8. Storage Room: Font (Dark Young), Store Room (Daniel's Arm), Alias, Alias' Den, Puzzle Room.
9. Caretaker's Quarters (revisita): Red Key, Dragon Statue, Valna's Doll, Mask.
10. Library: Printing Press (Stone Tablet), wine storage e Archives (Chimera), relógio, Music Puzzle, sala de Roger Bacon.
11. Church Nave: Stain Glass Room, Relief Piece, Shotgun 2 (fim do Disc 2 com o Gargoyle). CONFIRMADO.

Disc 3:
12. Inner Grounds: estátuas, fonte, Koudelka's Pendant.
13. Underground Passage: Punitive Room (Ogden/Bessy), Gug, Altar of Darkness.
14. Nemeton Graveyard: Vigna's Doll, orar em Charlotte e Daniel, Roger Bacon.
15. Library (reencontro); Prison (revisita: dar as bonecas, Green Key).
16. Charlotte's Cell.
17. Patrick's Quarters: Music Room, Portrait Room (Scapegoat), laboratório, balança.
18. Vestry (Tinderbox, Lifedrinker, Apostle). Fim do Disc 3.

Disc 4:
19. Backtrack: Bottle of Acid (Underground Shrine) -> Patrick's laboratory (nitroglicerina).
20. Opcional: Gargoyle no Church Nave (Gargoyle Killer, Sacnoth em Inner Grounds). Só antes do Cauldron.
21. Church: Sanctuary, pipe organ, crypt (Patrick), Cauldron (ponto sem retorno).
22. Bell Tower Spire: Vines, Patrick's Vine, Elaine.

## 19. Lacunas (o que NÃO foi possível verificar)

1. Nenhum guia do GameFAQs foi lido (HTTP 403). Precisa de abertura manual: https://gamefaqs.gamespot.com/ps/197752-koudelka/faqs/12644 , /7338 , /14373. Eles podem confirmar os nomes "Gates and Walls" e "Stables" e as fronteiras de disco.
2. "Gates and Walls" e "Stables" não existem como nomes de área na wiki; foram reconstruídos (confiança MÉDIA). Verificar se são rótulos do Prima Official Guide ou de um guia do GameFAQs.
3. As imagens de mapa não puderam ser baixadas (403, hotlink) nem vistas; o mapeamento andar -> área é inferência. K-mat1/2/3-1-.jpg: conteúdo NÃO VERIFICADO.
4. Fronteiras de disco 1/3/4 só pela LP (uma fonte). Fim do Disc 2 é confirmado (wiki + LP).
5. Distribuição exata dos 5 fragmentos de vitral entre as salas diverge entre W e LP.
6. A solução do puzzle de símbolos do Storage Room e a do Music Puzzle têm descrições diferentes entre wiki e LP; a imagem de solução da wiki não foi vista.
7. HP do Gargoyle: a wiki mostra uma aba com 8836 HP (Level 30); a LP mediu 31684 HP no Disc 4. NÃO VERIFICADO qual é o valor correto na versão NTSC-U.
8. "Disc 3 end / Disc 4 start" e a existência de um save no topo da torre vêm apenas da LP.
9. Itens temporais (Bessy's Ring, Ogden's Shirt, Ogden's Axe, Gargoyle Killer, Roger's Cane): só LP; não coberto por wiki.
10. Roteiro dos vídeos do YouTube (listas no resultado da busca) não foi assistido.
