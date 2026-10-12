/** Where each walkthrough area sits on the model (pin position), following the community floor plans. */
export const PINS: Array<{ id: string; pos: [number, number, number] }> = [
  { id: 'gates-and-walls', pos: [12, 11, -6] },
  { id: 'stables', pos: [7.2, 5.5, 3.6] },
  { id: 'caretakers-quarters', pos: [12.5, 13, 5.6] },
  { id: 'prison', pos: [2.4, 9.5, -14] },
  { id: 'underground-shrine', pos: [7, -6, 1.2] },
  { id: 'storage-room', pos: [0.4, 10.5, 12.8] },
  { id: 'library', pos: [-11.2, 12.5, 12] },
  { id: 'church-nave', pos: [-20.8, 12.5, -0.8] },
  { id: 'inner-grounds', pos: [0, 4.6, -0.8] },
  { id: 'underground-passage', pos: [-13.4, -4.5, 6.6] },
  { id: 'graveyard', pos: [-19.6, 3.6, 19] },
  { id: 'charlottes-cell', pos: [6.4, -6.5, -16.6] },
  { id: 'patricks-quarters', pos: [-10, 14, -11.2] },
  { id: 'church-crypt', pos: [-31, 7.5, -8.4] },
  { id: 'bell-tower', pos: [-27.4, 47, -0.8] },
];

export const ANCHORS: Record<string, { target: [number, number, number]; r: number; pitch: number }> = Object.fromEntries(
  PINS.map((p) => {
    const under = p.pos[1] < 0;
    const tall = p.id === 'bell-tower';
    return [p.id, { target: [p.pos[0], tall ? 30 : under ? p.pos[1] - 1 : 3, p.pos[2]] as [number, number, number], r: tall ? 46 : under ? 17 : 30, pitch: under ? 0.7 : 0.35 }];
  }),
);
