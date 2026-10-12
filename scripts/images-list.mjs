// Writes IMAGES.md from content/images.yaml: the curation checklist, grouped and prioritised.
import { parse } from 'yaml';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const rows = parse(readFileSync('content/images.yaml', 'utf8'));
const have = (id) => ['jpg', 'jpeg', 'png', 'webp', 'avif'].some((e) => existsSync(`public/images/${id}.${e}`));
const out = [`# Images to curate`, ``, `Put each file in \`public/images/\`, named **exactly** as the slot id (any of .jpg .jpeg .png .webp .avif). Pages pick it up on the next build; nothing else to change. An empty slot shows nothing on the site; \`/system/images\` lists every slot.`, ``, `**P0** = needed for launch · **P1** = makes the page feel finished · **P2** = nice to have. Rights: *official* = cited evidence, small and credited (see PRD §10.2); *public-domain* and *photo* need the source named: add a \`credit:\` line to that slot in \`content/images.yaml\` and it appears under the picture.`, ``, `Filled: ${rows.filter((r) => have(r.id)).length} / ${rows.length}`, ``];
for (const prio of ['P0', 'P1', 'P2']) {
  out.push(`## ${prio}`, ``);
  for (const g of [...new Set(rows.map((r) => r.group))]) {
    const list = rows.filter((r) => r.priority === prio && r.group === g);
    if (!list.length) continue;
    out.push(`### ${g}`, ``);
    for (const r of list) out.push(`- [${have(r.id) ? 'x' : ' '}] \`${r.id}\` · ${r.ratio} · ${r.minWidth}px+ · ${r.kind}  \n  **${r.title}.** ${r.what} Used on ${r.where}.${r.tips ? ` _${r.tips}_` : ''}`);
    out.push('');
  }
}
writeFileSync('IMAGES.md', out.join('\n'));
console.log('IMAGES.md', rows.length, 'slots');
