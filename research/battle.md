# Koudelka (PS1, 1999) - Batalha, personagens e inimigos

Pesquisa para o site de fã. Nomes, termos de jogo e citações em inglês; texto em português do Brasil.

## Aviso sobre a qualidade das fontes (ler primeiro)

- GameFAQs (guias e boards), Shadow Hearts Wiki (fandom, HTTP 402), RPGamer e Neoseeker retornaram 402/403 e NÃO puderam ser lidos. Nenhuma tabela de stats iniciais, lista oficial de magias com MP, nem o Weapon Guide do pantibonico foram lidos na íntegra. Só os resumos de snippets de busca deles aparecem abaixo, marcados como tais.
- A fonte mais rica que consegui ler é um Let's Play comentado no LPArchive, "Koudelka (by The Dark Id)", 32 episódios. Abreviado aqui como **LP#N**. URL base: `https://lparchive.org/Koudelka-(by-The-Dark-Id)/Update%20NN/` (NN com dois dígitos, p.ex. `Update%2007/`). É UMA única partida e um único autor. Todo número vindo só dele recebe confiança **média** ou **baixa**.
- O jogo randomiza propriedades de equipamento a cada partida (HardcoreGaming101). Bônus de arma/armadura/acessório e durabilidade do LP podem não bater com a sua partida. Já HP de inimigo e comportamento de boss parecem fixos, mas isso também não está confirmado por segunda fonte.
- Regra do pedido: nada inventado. Onde não achei, está escrito NÃO VERIFICADO.

Resultado honesto sobre os pontos 1 a 6 por personagem: estatísticas **iniciais**, faixas por nível, listas completas de magia/MP e melhores armas por personagem NÃO foram obtidas. Vale o que está abaixo.

---

## 1. Sistema de batalha

### Stats do jogo (nomes exatos) - confiança ALTA
São 8 atributos. Nomes confirmados por 3 fontes independentes: abreviações no guia de códigos do Almar's Guides, lista no review da honestgamers e descrições no LP#2.

| Sigla | Nome (LP#2) | Função (paráfrase do LP#2) |
|---|---|---|
| STR | Strength | dano físico causado |
| VIT | Vitality | defesa física e HP máximo |
| DEX | Dexterity | chance de acertar ataques físicos |
| AGL | Agility | velocidade (ordem de turno) |
| INT | Intelligence | poder da magia (ataque e cura) |
| MND | Mind | chance de a magia funcionar |
| PIE | Piety | resistência a magia inimiga e MP máximo |
| LUC | Luck | "boa sorte", efeitos pouco perceptíveis |

Fontes: https://almarsguides.com/retro/walkthroughs/ps1/games/koudelka/codebreaker/charactercodes/james/ ; https://www.honestgamers.com/5811/playstation/koudelka/review.html ; https://lparchive.org/Koudelka-(by-The-Dark-Id)/Update%2002/

Nota: o LP#2 diz que PIE define o MP máximo e VIT o HP máximo. Isso vem do LP (média). O LP#5 chama a sigla de "Mind"; o jogo usa MND.

### Progressão
- A cada level up o jogador recebe **4 pontos** para distribuir livremente entre os 8 stats (honestgamers 5811, infinityretro, LP#2, honestgamers 566, RPGFan). Confiança ALTA.
- Level up restaura HP e MP de quem subiu (HG101). Confiança MÉDIA (uma fonte).
- Proficiência de arma sobe com o uso, por personagem e por classe. Em níveis mais altos o personagem ganha golpes extras no mesmo turno e, para punho, novos golpes (LP#5: roundhouse/sweep kick). Confiança MÉDIA.
- Magias também sobem com o uso. Nível 2 de Flare acerta alvos adjacentes (esquerda e direita) por mais MP (LP#6, LP#8: Flare 16 MP no nível 1 e 18 MP no nível 2). Subir magia é bem mais lento que subir arma (LP#5). Confiança MÉDIA.
- Existem habilidades "Fortify" por stat, com experiência própria (código "Max Exp-Fortify STR/VIT/AGL/DEX/PIE/MND/INT/LUC" no Almar's). Confiança ALTA para a existência dos 8 Fortify. O LP#7 diz que o mesmo buff vira debuff quando lançado em inimigo (também no beforeiplay.com). Confiança MÉDIA.

### Grade e movimento - confiança MÉDIA, com divergência
- **5x7**: HardcoreGaming101 ("flat 5x7 grid"), RPGFan e psxdatacenter (via snippet "5x7 Grid", "full 3D").
- **7x7**: apenas honestgamers 566. Provável erro ou variação. Usar 5x7 no site, com ressalva.
- Heróis e inimigos começam em extremos opostos. Cada unidade pode se mover e agir uma vez por turno; HG101 diz até 3 casas de movimento. Fontes: https://www.hardcoregaming101.net/koudelka/ ; https://classic.rpgfan.com/news/1999/604.html ; https://psxdatacenter.com/games/J/K/SLPS-02460.html
- Não dá para andar além do inimigo mais avançado, então não há cerco (infinityretro).
- **Spear** ataca a uma casa de distância; outras armas corpo a corpo exigem adjacência; armas de fogo atingem à distância (Wikipedia, TV/infinityretro, LP#5).
- Linha da frente e de trás importam: ataques de boss como o Apostle atingem só a fileira da frente ou só as de trás (LP#25). Confiança MÉDIA.
- Dano de magia varia com a distância entre conjurador e alvo (LP#5). Confiança BAIXA (uma frase).
- Magia exige carga: "usually takes two turns to use" (honestgamers 5811) e pode ser interrompida por Silence (LP#5). RPGFan menciona "2 commands each turn" (mover e agir).
- Fonte Wikipedia (https://en.wikipedia.org/wiki/Koudelka): grade com 3 heróis e inimigos que podem mover e agir a cada turno.

### Ordem de turnos
- Cada unidade acumula "Action Points"; quem tem mais age primeiro. Não há indicador de quem é o próximo (LP#2, LP#5). Confiança MÉDIA.
- AGL é a velocidade (LP#2). Esperar ("wait") dá prioridade de turno mais rápida (HG101).

### Encontros aleatórios
- Frequentes em exploração (turnbasedlovers cita "a cada 3-6 segundos", baixa confiança; infinityretro diz que não há como evitá-los).
- Existe item de evento que reduz permanentemente a taxa de encontros (LP#12). Confiança BAIXA (um relato).
- Fuga: botão O durante o turno (LP#9, citado para Valna and Vigna). Chefes: HG101 diz que se pode fugir de muitos.
- Animações lentas e batalhas longas são a crítica mais repetida (infinityretro, honestgamers 5811).

### Durabilidade de armas - confiança ALTA para o conceito
- Armas corpo a corpo quebram e somem do inventário. Durabilidade não é exibida. Não há reparo nem loja (LP#2, infinityretro, HG101).
- Sete (ou oito, o LP tem uma divergência entre #2 e outras fontes) classes corpo a corpo, das quais sete quebram. Armas de fogo não quebram, mas usam munição (resumo do Weapon Guide de pantibonico via Scribd/GameFAQs: "almost ALL the weapons in this game are BREAKABLE"; firearms never break).
- Quanto maior a arma e mais forte quem a usa (STR), mais rápido quebra (snippet GameFAQs boards "Weapon durability"; resumo do pantibonico). Não li o board; confiança MÉDIA.
- Valores concretos de LP (medium/baixa): arma comum quebra em cerca de 15-30 usos; armas especiais 100-255 usos (LP#10 Evil Horn; LP#16 Galahad's Sword); Fire Hammer quebrou em 2-3 usos no começo (LP#5); Sacnoth Sword 100+ golpes (LP#27). O guia do pantibonico diz que Sacnoth Sword e Roger's Cane também quebram.
- Armas de classe e elemento: Normal, Fire, Water, Light, Dark, Air, Earth, Mystic, Vital; propriedades como Poison Hit, Paralysis Hit, Specialty Hit (95% de precisão, quebra mais rápido) (LP#3). Confiança MÉDIA.
- Ter reservas no inventário é essencial (beforeiplay).

### Dez classes de arma (ALTA para a lista)
Fist, Club, Knife, Saber, 2-Handed Sword, Axe, Spear, Bowgun, Rifle, Single Action Pistol (guia de códigos do Almar's). O LP mostra mais tipos de pistola (SA Pistol, DA Pistol, Automatic Pistol/Mauser C96 com 10 tiros; Shotgun 2) e que Rifle tem 12 tiros. Confiança MÉDIA.

### Munição
- Caixa de balas de pistola: 20 por caixa, 6 por carregador (LP#3). Rifle: 12 tiros (LP#9). Shotgun 2: dois tiros, munição separada (LP#15). A munição de cada arma é de tipo próprio.
- Pistolas exigem recarga manual entre batalhas. Esquecer significa gastar um turno (LP#2).

### Save, inventário e economia
- Não há lojas de arma ou item. Tudo vem de drops e do cenário (psxdatacenter via RPGFan: "neither Weapon nor Item shops exist"). ALTA.
- Existem save points temporários e permanentes. Permanentes restauram HP/MP (LP#5). MÉDIA.
- Um bloco de memory card (psxdatacenter SLPS-02460).
- Curiosidade LP#5 (BAIXA): item oculto liga a salvar em 1:11:11 no timer com certo número de itens.
- Reviver: se o personagem cair e o grupo avançar além do local, não dá para revivê-lo (beforeiplay; MÉDIA).
- Se Koudelka cair, é Game Over imediato (LP#16).

### O que realmente importa para o jogador (resumo)
1. Distribuir os 4 pontos por nível segundo o papel (ver seções por personagem).
2. Guardar armas reservas e usar armas "descartáveis" nas lutas fáceis; salvar as boas para chefes.
3. Elemento importa nos chefes (tabela no fim).
4. Pendant da Koudelka é obrigatório (ver "Itens que não pode perder").
5. Magia exige posicionamento e carga; Silence a bloqueia.

---

## 2. Koudelka Iasant

### Estatísticas
- Valores iniciais por stat, HP e MP iniciais: **NÃO VERIFICADO**. Nenhuma fonte legível trouxe a tabela.
- Dado solto: HP 169 no LP#1 (momento exato não especificado; confiança BAIXA). "Significativamente menos HP que Edward; MP muito superior ao dele" (LP#2, MÉDIA).
- Força: magia (INT, PIE, MND). Fraqueza: fragilidade física, apesar de VIT razoável; "quite fragile" (LP#16). Morrer dela encerra o jogo.

### Arquétipo e papel (MÉDIA)
- Principal dano mágico e cura inicial: começa com Heal e Flare (LP#2). beforeiplay.com: foque stats mágicos, com um pouco de VIT e AGL.
- Posição ideal: fileira de trás (LP#16, LP#7). Pode ir à frente com acessório de VIT, como contra o Chimera (LP#13), mas é exceção.
- O jogo a distingue por MP alto e por ser a única com magias de elemento (Flare, Geyser, Tornado, Megalith) nos relatos do LP. Quem aprende o quê no resto do elenco: NÃO VERIFICADO.

### Armas
- Começa com um revólver de seis tiros (LP#2). Usou Water Spear (LP#5), Bowgun (LP#11). Pode ter qualquer classe; restrições NÃO VERIFICADAS.
- Melhores armas conhecidas: NÃO VERIFICADO para o caso dela. Acessórios mágicos importam mais que arma: Koudelka's Pendant (+7 INT, +6 PIE, +10 MND, +15 LUC no LP#16), Star Brooch (+10 INT, +7 PIE, +6 MND, +18 AGL, LP#20), Flare Brooch (+9 VIT, +9 INT, +8 PIE, +6 MND, LP#20).

### Magias (fonte: LP, MÉDIA/BAIXA; custos de MP não são mostrados no jogo, LP#2)
| Magia | Elemento/efeito | MP | Fonte |
|---|---|---|---|
| Heal | cura; curativos também ferem mortos-vivos (LP#6) | NÃO VERIFICADO | LP#2, LP#6 |
| Flare | Fire; Nv2 acerta alvos adjacentes | 16 (Nv1), 18 (Nv2) | LP#1, LP#6, LP#8 |
| Geyser | Water; Nv2 "quase mata" Charlotte's Wrath e Mars | NÃO VERIFICADO | LP#13, LP#20 |
| Tornado | Wind | NÃO VERIFICADO | LP#5 (ganha do Seeker Trio) |
| Megalith | Earth | NÃO VERIFICADO | LP#6 |
- Aprendizado: Flare ao vencer o werewolf (LP#1); Tornado ao vencer os Seekers (LP#5); Megalith em LP#6 (local não confirmado). Ordem exata: NÃO VERIFICADO. Magias sobem de nível com uso.
- Mais úteis nos relatos: Geyser/Flare nível 2 vs. chefes fracos a água/fogo; Tornado nível 2 vs. Gug e Giants; Megalith vs. Mad Fly e Giants.

### Dicas (a partir do LP; MÉDIA)
1. Mantenha-a atrás; deixe Edward na frente.
2. Treine magia ao menos até o nível 2 antes do trecho solo do Disc 3 (LP#16).
3. Priorize INT/MND/PIE e algo de VIT e AGL; PIE também sobe o MP.
4. Acessórios de INT/PIE/MND (Pendant, Rosario, Brooches) valem mais que arma.
5. Carregue Bowgun ou arma de longa distância para inimigos que anulam magia (Alias, LP#11).
6. Nunca avance sem o Pendant (ver abaixo).

### Notas de design
- Wikipedia: Kikuta queria originalmente uma batalha em tempo real com movimento livre, mas desentendimentos da equipe levaram ao sistema em grade; ele depois lamentou ter pouca influência direta no design. Machida (art director) disse que a batalha foi pensada para ser fácil, de modo que adultos sem hábito de jogar chegassem ao final, e a equipe reconhece depois que mais dificuldade teria ajudado. https://en.wikipedia.org/wiki/Koudelka (MÉDIA, via resumo; não confirmei no texto original).
- Falas específicas sobre o papel de Koudelka em batalha: NÃO VERIFICADO.

---

## 3. Edward Plunkett

### Estatísticas
- Valores iniciais: **NÃO VERIFICADO**. LP#3: Edward com 126 HP máx, caindo para 121 após um debuff do "Joker" (BAIXA, momento da partida não fixo).
- Força: HP e físico; MP "lixo" (LP#2). Fraqueza: PIE muito baixo, logo muito vulnerável a magia (LP#7, LP#8; "extremely low PIE") e a Silence. Mid-game: tomou 200+ de dano mágico da Mummy Bride (LP#6).

### Arquétipo e papel (MÉDIA)
- Tanque/bruto de linha de frente. beforeiplay: foco em stats físicos, tank absorvendo dano frontal. LP#2: sugere punhos desarmados para o começo.
- Posição: front row. O jogo o distingue por muito HP, quase nenhum MP e uso de punhos, machados, martelos e rapiers.

### Armas
- Relatos: Bare fists (com Knuckleduster/Water Knuckles nas lutas de Alias e Chimera), Fire Hammer, Water Spear, Earth Rapier, Tabar (axe), Ogden's Axe (+40 STR, LP#25), Sacnoth Sword, Lifedrinker Sword (rouba HP), Gargoyle Killer. Armas de fogo foram vistas com ele no começo (LP#3: "no longer carrying a gun"). Ele não é descrito como atirador exclusivo em nenhuma fonte; a premissa "munição (Edward)" do pedido NÃO se confirma. Qualquer personagem parece poder equipar arma de fogo.
- Melhores armas conhecidas (LP, uma partida; valores variam por partida):
  - Sacnoth Sword: +70 STR, +24 DEX, +10 AGL, sem desvantagens (LP#27). Fica na estátua que a segura no portão principal (Nemeton Monastery). Durabilidade 100+ golpes; o guia do pantibonico (resumo) diz que também quebra.
  - Gargoyle Killer: +99 VIT, usável 3 vezes, ~7.500 de dano por golpe (LP#27). Onde achar: NÃO VERIFICADO.
  - Lifedrinker Sword: rouba HP; 3ª espada mais forte (LP#28).
  - Ogden's Axe: +40 STR (LP#25).
- Munição: 20 por caixa de pistola, carregador de 6 (LP#3). Shotgun e rifle usam munição própria.

### Magias/habilidades
- Edward não tem MP suficiente para conjurar (LP#2). Lista de magias dele: **NÃO VERIFICADO** (provavelmente nenhuma). Habilidades dele vêm de proficiência de arma (golpes extras, chutes com punho).

### Dicas (MÉDIA)
1. Fique na frente; knockback pode empurrá-lo, reposicione (LP#9).
2. Dê pontos de PIE mesmo assim, ao menos o mínimo, para não morrer de magia.
3. Trabalhe a proficiência de Fist cedo; é grátis e não quebra.
4. Use armas com elemento certo (Fire Hammer vs. Giant Plant, Water Knuckles vs. Chimera).
5. Contra chefes fortes só contra magia, ele serve de escudo (Scapegoat, LP#18; Patrick's Vine com Lifedrinker, LP#28).
6. Ataques físicos dele não adiantam contra Elaine 1ª forma (LP#30).

### Notas de design
Nenhuma fonte encontrada sobre a intenção da equipe para Edward: NÃO VERIFICADO.

---

## 4. James O'Flaherty

### Estatísticas
- Valores iniciais e faixas: **NÃO VERIFICADO**.
- Força: suporte (buffs, revive). Fraqueza: físico e resistência a magia, "weakness to magic attacks noted as 'starting to be an issue'" (LP#6). Descrito como não equipado para combate (LP#21: Air Robe "useless for James's physical deficiencies").

### Arquétipo e papel (MÉDIA)
- Segundo mago e "buff bot" (beforeiplay). Cura e Fortify (LP#9 usa Fortify Agility Nv2; LP#7 usa Fortify Intelligence em inimigos). Posição ideal: fileira de trás junto de Koudelka (LP#7: perto uma da outra, magia inimiga nível 2 erra por PIE alto).
- O jogo o distingue por buffs (Fortify) e revive.

### Armas
- Relatos: Rod (+9 INT/PIE/MND, LP#28), Magical girl Rod (PIE, LP#30). Restrições NÃO VERIFICADAS. LP#5 diz que ele "foi equipado com magias em vez de armas".

### Magias/habilidades (LP, MÉDIA/BAIXA)
| Magia | Efeito | MP |
|---|---|---|
| Fortify STR/VIT/DEX/AGL/INT/PIE/MND/LUC | sobe o stat de um aliado; nível 2 existe; vira debuff em inimigo | NÃO VERIFICADO |
| Revive | revive; HP restaurado depende do PIE do alvo | 18 (LP#7) |
| Reflect | rebate magia inimiga; essencial contra Elaine | NÃO VERIFICADO (LP#18, LP#30) |
| Heal | NÃO VERIFICADO se aprende | NÃO VERIFICADO |
- Quem aprende cada magia e em que momento: NÃO VERIFICADO para a maioria. Reflect vem como "final spell" após o Scapegoat (LP#18); quem a lança: NÃO VERIFICADO (LP#30 sugere James e Koudelka a usam em equipe).
- Panacea: nos relatos aparece como item que cura Silence/Paralysis (LP#25 "Items Used"); tratada aqui como item.

### Dicas (MÉDIA)
1. Antes de chefes, Fortify AGL e STR no Edward e INT na Koudelka.
2. Em Doppelganger e Elaine, debuff nos inimigos com Fortify nos mesmos.
3. Revive cedo: se o grupo avança, não dá para reviver (beforeiplay).
4. Leve ao menos um Panacea para Silence (LP#10).
5. Proteja-o de magia; fica atrás.
6. Use acessórios de PIE.

### Notas de design
NÃO VERIFICADO.

---

## 5. Inimigos e NPCs com nota de batalha

Fontes: LP (partida única; HP e fraquezas confiança MÉDIA/BAIXA). Spoilers marcados.

| Nome | Tipo | Fraqueza conhecida | Dica |
|---|---|---|---|
| **Gargoyle** (SUPERBOSS, disc 3; SPOILER leve) | Chefe opcional | Nenhuma útil no primeiro encontro (disc 2, LP#15: "unwinnable", fuga). Disc 3: HP 31.684 (LP#27) | Só vencer com nível ~60+ e Gargoyle Killer no Edward (~7.500/golpe), James com Fortify. Ataque físico 3.000+; Tornado 1.400-1.500 (Paralysis/Poison/Silence). Padrão: dois físicos e Tornado (LP#27). |
| **Charlotte** (Charlotte's Wrath; **SPOILER**) | Chefe condicional; HP 4.761 (LP#20) | Água (Geyser Nv2 quase a mata) | Só ocorre se a subtrama dela não for resolvida. Se resolvida, sem luta e recompensa Flare Brooch; senão Star Brooch. |
| **Alias** (The Thief, disc 1) | Chefe; HP 2.116 (LP#11) | Magia sempre erra; só físico | Destrua as pilhas de barris (1.296 HP cada) para alcançar; Bowgun à distância. Revólver 400-500/tiro. Dropa Glass piece, key e DA Pistol (LP#12). |
| **Elaine** (Elaine Heyworth; **SPOILER GRAVE**, final) | Chefe em 3 formas | 1ª: fogo e vento (imune a terra e água), HP 11.811. 2ª: água e terra (imune vento e fogo), vulnerável a físico. Final: HP 22.801 (LP#30, LP#31) | Reflect em todos. Sacnoth Sword com Edward na 2ª. Atenção: LP#29 menciona condição de bad ending se Koudelka não tiver o Pendant. |
| **Jailer** | NÃO VERIFICADO | NÃO VERIFICADO | Não achei em nenhuma fonte legível. |
| **The Creature** (**SPOILER leve**) | NPC no Altar of Darkness; não é lutável | n/a | Funciona como "vague hint system" (LP#19): uma dica por visita, reseta ao reentrar. Nenhum dado de batalha. |

### Chefes e inimigos adicionais (LP, MÉDIA/BAIXA)
- Seeker Trio (LP#5): Blue 800, Green 800, Red 1.200 HP; Red é fraco a água; vira inimigo "Watcher" depois (LP#10).
- Giant Plant (LP#4): HP 1.500, fogo.
- Mummy Bride (LP#6): HP 1.225; cura e fogo; resistente a físico.
- Doppelganger Trio (LP#7): Edward 961, James 841, Koudelka 784. Mate o James falso rápido, Fortify INT na Koudelka falsa.
- Mad Fly (LP#9): 3.025 HP, vento, fraco a terra.
- Dark Young (LP#10): 2.916 HP, fraco a vento (relato inconsistente), Silence.
- Chimera (LP#13): 4.225 HP, fraco a água; Poison/Silence/Paralysis pelas cabeças.
- Gug (LP#18): 5.329 HP, fraco a vento; Tornado Nv2 duas vezes.
- Possessed furniture (LP#20): 5.000+ HP, fraco a frost e terra, resistente a fogo.
- Apostle (LP#25): 8.281 HP; estados de calma vs. tremor (físico erra, magia cura o chefe no tremor).
- Patrick's Vine (LP#28; SPOILER): 10.201 HP; Lifedrinker no Edward.
- Scapegoat (LP#18 do boss list, 9.216 HP): fogo (dano em LP#23 na verdade). A atribuição de episódio no resumo da busca foi confusa; confiança BAIXA.

---

## 6. Itens e armas importantes que não se pode perder

1. **Koudelka's Pendant** (fonte do LP#16, MÉDIA; também beforeiplay): "the game literally cannot be completed without obtaining this pendant". Fica na fonte de água benta seca depois de desativar as estátuas. Sem ele, o confronto com Elaine pode resultar em bad ending (LP#29). Nota: o resumo diz que há solução do puzzle da água antes.
2. **Sacnoth Sword** (LP#27): na estátua do portão principal; melhor arma sem as limitações do Gargoyle Killer.
3. **Gargoyle Killer** (LP#27): arma específica para o superboss; onde achar NÃO VERIFICADO.
4. **Acessórios de INT/PIE/MND**: Rosario (+8 INT, +6 PIE, +10 MND, LP#15), Star Brooch, Flare Brooch, Cat's Eye, Bessy's Ring, Water J Ring. Valores variam por partida.
5. **Reflect** (spell final, LP#18) e **Revive** (18 MP, LP#7): a base da defesa contra Elaine.
6. **Roman Nuts**: revive total de HP/MP (LP#12). **High Potion**: 1.500 HP (LP#7). **Dried Food**: 350 HP (LP#5).
7. **Panacea**: cura Silence/Paralysis.
8. **Scrolls elementais** (Charlotte's Book = Fire Scroll): consumíveis de uso único para quem não aprende a magia (LP#12, LP#27).
9. **Guard's Diary** (LP#8): libera o menu Read com lore. Código do baú: 7-0-3-8, mas o LP diz "non-randomized", sem segunda fonte.

---

## Lacunas

- GameFAQs (FAQs de Gobi e MMalekzandi, Weapon Guide de pantibonico, boards sobre stats e durabilidade), Shadow Hearts Wiki e Neoseeker bloquearam a leitura. O que existe delas aqui são só resumos de snippets.
- Stats iniciais por personagem, HP/MP iniciais, ganho por nível, tabela completa de magias e MP: NÃO VERIFICADO.
- Quais classes de arma cada personagem pode ou não equipar: NÃO VERIFICADO. Evidência sugere que não há restrição forte (Edward com pistola, Koudelka com Water Spear e Bowgun).
- Jailer: sem informação. Local, fraqueza e HP: NÃO VERIFICADO.
- Grade 5x7 vs. 7x7 (maioria de 5x7).
- Declarações diretas de Kikuta/Machida sobre o papel de cada personagem: nenhuma achada; só as notas gerais da Wikipedia (e sem texto original lido).
- Todos os HP de chefe e valores de itens do LP são de uma única partida; precisam de segunda fonte (idealmente dados do jogo ou GameFAQs).
- Manual original do jogo (NTSC-U, PAL, NTSC-J): não achado.
- Próximo passo sugerido: ler os guias do GameFAQs por acesso manual (navegador) ou espelho no Wayback Machine, e conferir em partida.
