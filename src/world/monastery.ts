import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * An ORIGINAL monastery, laid out like the community floor plans: a ring of tilted buildings around an
 * open courtyard (the Inner Grounds), a long church on the west side with a tall spire, a gatehouse to the
 * east, and a second ring of passages underneath. Proportions follow the plans and a Pembrokeshire
 * cathedral (grey-violet stone, lead roofs, a square tower with pinnacles); no game model or texture is used.
 * Everything is built from primitives and merged into one geometry.
 *
 * World units: 1 unit ≈ 1 metre-ish. x = east, z = south, y = up. The courtyard centre is the origin.
 */
const parts: THREE.BufferGeometry[] = [];
/** Transform of the building being built; lets a whole building be placed and tilted as one. */
let T = new THREE.Matrix4();

/** One repeat of the 64px stone texture per ~3.3 units, so masonry courses keep the same size everywhere. */
const TEXEL = 0.3;

/** Scales a geometry's uv so the texture density is constant in world units (not stretched per primitive). */
function fitUv(g: THREE.BufferGeometry): void {
  if (g.userData.uvFitted) return;
  g.computeBoundingBox();
  const s = g.boundingBox!.getSize(new THREE.Vector3());
  const horizontal = Math.max(s.x, s.z);
  const flat = s.y < horizontal * 0.2;
  const su = horizontal * TEXEL; const sv = (flat ? horizontal : Math.max(s.y, 0.01)) * TEXEL;
  const uv = g.attributes.uv!;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  g.userData.uvFitted = true;
}

function push(g: THREE.BufferGeometry, color: number, m: THREE.Matrix4): void {
  fitUv(g);
  const ng = g.index ? g.toNonIndexed() : g;
  ng.applyMatrix4(T.clone().multiply(m));
  const c = new THREE.Color(color);
  const n = ng.attributes.position!.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  ng.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  parts.push(ng);
}

const M = (x: number, y: number, z: number, ry = 0) =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0)), new THREE.Vector3(1, 1, 1));

/** Places everything built inside `fn` at (x, z), tilted by `ry` around Y. */
function building(x: number, z: number, ry: number, fn: () => void): void {
  const prev = T;
  T = prev.clone().multiply(M(x, 0, z, ry));
  fn();
  T = prev;
}

/** Box with its BOTTOM at y. */
function box(w: number, h: number, d: number, x: number, y: number, z: number, color: number, ry = 0): void {
  // Long faces are split into ~4 m tiles: PS1 affine texturing smears huge polygons, so big walls need more vertices.
  const sx = Math.min(10, Math.max(1, Math.ceil(w / 4))); const sy = Math.min(6, Math.max(1, Math.ceil(h / 4))); const sz = Math.min(10, Math.max(1, Math.ceil(d / 4)));
  const g = new THREE.BoxGeometry(w, h, d, sx, sy, sz);
  // Each of the six faces gets uv sized to its own width and height: undistorted masonry on any wall.
  const faces: Array<{ n: number; u: number; v: number }> = [
    { n: (sz + 1) * (sy + 1), u: d, v: h }, { n: (sz + 1) * (sy + 1), u: d, v: h },
    { n: (sx + 1) * (sz + 1), u: w, v: d }, { n: (sx + 1) * (sz + 1), u: w, v: d },
    { n: (sx + 1) * (sy + 1), u: w, v: h }, { n: (sx + 1) * (sy + 1), u: w, v: h },
  ];
  const uv = g.attributes.uv!;
  let i = 0;
  for (const f of faces) for (let k = 0; k < f.n; k++, i++) uv.setXY(i, uv.getX(i) * f.u * TEXEL, uv.getY(i) * f.v * TEXEL);
  g.userData.uvFitted = true;
  push(g, color, M(x, y + h / 2, z, ry));
}
/** Gable roof: ridge runs along local x when `alongX`, else along z. */
function gable(w: number, h: number, len: number, x: number, y: number, z: number, color: number, alongX = false): void {
  const g = new THREE.CylinderGeometry(w / 1.55, w / 1.55, len, 3, 1);
  g.rotateX(Math.PI / 2); g.rotateZ(Math.PI); g.scale(1, (h * 2) / w, 1);
  push(g, color, M(x, y + h * 0.5, z, alongX ? Math.PI / 2 : 0));
}
/** Four-sided pyramid roof (hip) over a w×d footprint. */
function hip(w: number, d: number, h: number, x: number, y: number, z: number, color: number): void {
  const g = new THREE.ConeGeometry(Math.SQRT1_2, h, 4);
  g.rotateY(Math.PI / 4); g.scale(w, 1, d);
  push(g, color, M(x, y + h / 2, z));
}
/** Mansard: a steep sloped skirt narrowing from w×d to top×top, capped by a flat roof. */
function mansard(w: number, d: number, h: number, x: number, y: number, z: number, color: number, inset = 0.72): void {
  const g = new THREE.CylinderGeometry(Math.SQRT1_2 * inset, Math.SQRT1_2, h, 4);
  g.rotateY(Math.PI / 4); g.scale(w, 1, d);
  push(g, color, M(x, y + h / 2, z));
}
function cone(r: number, h: number, x: number, y: number, z: number, color: number, seg = 8): void {
  push(new THREE.ConeGeometry(r, h, seg), color, M(x, y + h / 2, z));
}
function pillar(r: number, h: number, x: number, y: number, z: number, color: number, seg = 6): void {
  push(new THREE.CylinderGeometry(r, r * 1.1, h, seg), color, M(x, y + h / 2, z));
}
/** A pointed (lancet) window: dark opening with a small gabled head. */
function lancet(x: number, y: number, z: number, w: number, h: number, ry = 0, color = VOID): void {
  box(w, h, 0.4, x, y, z, color, ry);
  const g = new THREE.CylinderGeometry(w * 0.62, w * 0.62, 0.4, 3);
  g.rotateX(Math.PI / 2); g.rotateZ(Math.PI);
  push(g, color, M(x, y + h + w * 0.28, z, ry));
}

/** Deterministic hash noise in [0,1): keeps the world identical on every load. */
function hash(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// ── Palette: every building has its own stone and roof, so the ring reads as a place, not one block. ──
const VOID = 0x14110f;
/** Underground masonry is lit by candles only, so it is painted lighter than it looks to read in the cutaway. */
const UG = { floor: 0x6e675b, ceil: 0x4d4840, wall: 0x857d6f };
const GLOW = 0xe0a84a; // candlelight, bright enough to survive the vertex lighting
const GREEN = 0x6fa89a; // the sickly lantern green
const C = {
  church: 0x8d8a99, churchDark: 0x6d6a7a, lead: 0x59616d, spire: 0x3b4350,
  brick: 0x7d4e3f, brickRoof: 0x2d343d,
  patrick: 0x6b7079, copper: 0x4f8272,
  library: 0x9d8c70, libRoof: 0x3a4a5e,
  storage: 0x80776a, storRoof: 0x4b3f37,
  dungeon: 0x4d4944, dungRoof: 0x2b2926,
  gate: 0x8b857a, paving: 0x625d53, ground: 0x47573d, wall: 0x6f6a60,
  marble: 0xb6b2a8, bone: 0xb5ad9c,
};

/** The island: a flat top covering the whole ring, falling away to the sea over a few metres. */
const PLATEAU = { x0: -50, x1: 30, z0: -26, z1: 30 };

function terrain(): void {
  const size = 190; const seg = 38;
  const g = new THREE.PlaneGeometry(size, size, seg, seg);
  g.rotateX(-Math.PI / 2);
  g.translate(-10, 0, 2);
  const pos = g.attributes.position!;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i); const z = pos.getZ(i);
    const dx = Math.max(PLATEAU.x0 - x, 0, x - PLATEAU.x1);
    const dz = Math.max(PLATEAU.z0 - z, 0, z - PLATEAU.z1);
    const d = Math.hypot(dx, dz);
    const drop = Math.min(d / 9, 1);
    const rough = (hash(Math.round(x / 2), Math.round(z / 2)) - 0.5) * (d > 0 ? 1.2 + drop * 4 : 0.25);
    pos.setY(i, -drop * drop * 22 + rough);
  }
  fitUv(g);
  const ng = g.toNonIndexed();
  const p = ng.attributes.position!;
  const col = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i += 3) {
    const y = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3;
    const cx = (p.getX(i) + p.getX(i + 1) + p.getX(i + 2)) / 3; const cz = (p.getZ(i) + p.getZ(i + 1) + p.getZ(i + 2)) / 3;
    const patch = hash(Math.round(cx / 3), Math.round(cz / 3)) > 0.78;
    const c = new THREE.Color(y > -2 ? (patch ? 0x3d4a35 : C.ground) : y > -9 ? 0x5a5244 : 0x3a3630);
    for (let k = 0; k < 3; k++) { col[(i + k) * 3] = c.r; col[(i + k) * 3 + 1] = c.g; col[(i + k) * 3 + 2] = c.b; }
  }
  ng.setAttribute('color', new THREE.BufferAttribute(col, 3));
  parts.push(ng);
}

function sea(): void {
  const g = new THREE.PlaneGeometry(320, 320, 6, 6);
  g.rotateX(-Math.PI / 2);
  push(g, 0x2d5a63, M(-10, -24, 2));
}

function deadTree(x: number, z: number, h: number): void {
  pillar(0.28, h, x, 0, z, 0x3a3128, 5);
  for (let i = 0; i < 4; i++) { const a = i * 1.7 + x; box(0.16, h * 0.45, 0.16, x + Math.cos(a) * 0.5, h * 0.6, z + Math.sin(a) * 0.5, 0x3a3128, a); }
}

/** A statue of a woman on a plinth, as in the courtyard of the plan. */
function statue(x: number, z: number): void {
  box(1.1, 0.9, 1.1, x, 0, z, C.marble);
  box(0.55, 1.5, 0.4, x, 0.9, z, C.marble);
  push(new THREE.SphereGeometry(0.28, 6, 5), C.marble, M(x, 2.6, z));
}

/** Ground-floor windows in a row along a wall; `lit` windows glow. */
function windows(n: number, spacing: number, x0: number, y: number, z: number, ry: number, lit: number): void {
  for (let i = 0; i < n; i++) {
    const x = x0 + i * spacing;
    if (i % lit === 0) box(0.8, 1.5, 0.12, x, y + 0.05, z, GLOW, ry);
    box(1.0, 1.8, 0.25, x, y, z - 0.05, VOID, ry);
  }
}

function build(): void {
  T = new THREE.Matrix4();
  terrain();
  sea();

  // ── The courtyard: paving, a fountain with steps, an arbor and five statues of women. ──
  box(24, 0.12, 20, 0, 0, -1, C.paving);
  pillar(1.9, 0.7, 0, 0, -0.8, C.marble, 10); pillar(1.1, 0.5, 0, 0.7, -0.8, C.marble, 10);
  pillar(0.3, 1.8, 0, 1.2, -0.8, C.marble, 6); pillar(0.7, 0.3, 0, 2.9, -0.8, C.marble, 8);
  for (let i = 0; i < 4; i++) box(5.2, 0.25, 0.9, 0, i * 0.18, 2.6 + i * 0.7, C.paving); // steps down from the south
  for (const x of [-2.6, 2.6]) box(0.25, 3, 0.25, x, 0, -4.4, 0x4d5a40); // arbor posts
  box(5.8, 0.25, 0.3, 0, 3, -4.4, 0x4d5a40);
  for (const [x, z] of [[-4, -7.6], [-13.4, -4.2], [-12.4, 5.4], [0, 7.2], [7.4, 2.4]] as const) statue(x, z);

  // ── The church: a long hall on the west side, an apse, a crossing tower with pinnacles and a tall spire. ──
  building(-20.8, -0.8, 0, () => {
    box(14.4, 8.4, 8, 0, 0, 0, C.church);                       // nave walls
    gable(8, 3.4, 14.8, 0, 8.4, 0, C.lead, true);              // lead roof (low pitch)
    box(14.8, 0.5, 8.6, 0, 8.2, 0, C.churchDark);              // parapet course
    for (let i = 0; i < 6; i++) {                              // tall windows and buttresses on both flanks
      const x = -6 + i * 2.4;
      for (const s of [-1, 1] as const) {
        box(1.0, 6.6, 1.2, x + 1.2, 0, s * 4.2, C.churchDark);
        box(0.5, 0.5, 0.5, x + 1.2, 6.6, s * 4.2, C.churchDark);   // pinnacle base
        cone(0.3, 1.4, x + 1.2, 7.1, s * 4.2, C.churchDark, 4);
        lancet(x, 2.2, s * 4.05, 1.1, 3.6, s > 0 ? 0 : Math.PI);
      }
    }
    box(0.5, 4.5, 2.6, 7.3, 0.2, 0, VOID);                     // east door facing the courtyard
    box(2.4, 0.3, 3.2, 8.3, 0, 0, C.paving);
  });
  // sanctuary and its rounded apse
  building(-34.8, -0.8, 0, () => {
    box(13.2, 7.4, 8, 0, 0, 0, C.church);
    gable(8, 2.8, 13.6, 0, 7.4, 0, C.lead, true);
    for (let i = 0; i < 3; i++) for (const s of [-1, 1] as const) { box(1.0, 5.6, 1.2, -4 + i * 3.6, 0, s * 4.2, C.churchDark); lancet(-5.6 + i * 3.6, 2, s * 4.05, 1.0, 3.2, s > 0 ? 0 : Math.PI); }
    pillar(4, 7.4, -6.6, 0, 0, C.church, 12);                  // apse
    cone(4.4, 3.6, -6.6, 7.4, 0, C.lead, 12);
    for (let i = 0; i < 3; i++) lancet(-9.9 + Math.abs(i - 1) * 0.5, 2.2, (i - 1) * 2.6, 0.9, 3.2, Math.PI / 2 + (i - 1) * 0.5);
  });
  // the crossing tower: St Davids-style square tower, corner pinnacles, belfry, then a very tall octagonal spire
  building(-27.4, -0.8, 0, () => {
    box(6, 24, 6, 0, 0, 0, C.church);
    box(6.8, 0.6, 6.8, 0, 17, 0, C.churchDark);
    for (const [dx, dz, ry] of [[0, 3.05, 0], [0, -3.05, Math.PI], [3.05, 0, Math.PI / 2], [-3.05, 0, -Math.PI / 2]] as const) {
      lancet(dx, 18, dz, 1.2, 3.8, ry); lancet(dx, 6, dz, 1.0, 3.2, ry);
    }
    box(5, 0.4, 0.5, 0, 14, 3.1, C.marble); // a clock face
    for (const [dx, dz] of [[-3.2, -3.2], [3.2, -3.2], [-3.2, 3.2], [3.2, 3.2]] as const) { box(0.9, 2.6, 0.9, dx, 24, dz, C.churchDark); cone(0.55, 2.4, dx, 26.6, dz, C.spire, 4); }
    cone(3.9, 20, 0, 24.6, 0, C.spire, 8);                      // the spire
    pillar(0.14, 4, 0, 44.4, 0, C.churchDark, 4);
  });
  // chapel, confessional and vestry: two low wings with rounded west ends
  building(-31, -8.4, 0, () => {
    box(14, 4.4, 3.2, 0, 0, 0, C.church); gable(3.2, 1.6, 14.4, 0, 4.4, 0, C.lead, true);
    pillar(1.6, 4.4, -7, 0, 0, C.church, 8); cone(1.8, 1.8, -7, 4.4, 0, C.lead, 8);
    box(14, 4.4, 3.6, 0, 0, -3.6, C.church); gable(3.6, 1.6, 14.4, 0, 4.4, -3.6, C.lead, true);
    pillar(1.8, 4.4, -7, 0, -3.6, C.church, 8); cone(2, 1.8, -7, 4.4, -3.6, C.lead, 8);
    for (let i = 0; i < 4; i++) lancet(-4 + i * 3, 1.4, 1.62, 0.7, 2, 0);
  });
  // the ruins: a roofless run of walls and broken arches linking the church to Patrick's wing
  building(-20, -9.2, 0, () => {
    for (const s of [-1, 1] as const) for (let i = 0; i < 6; i++) box(1.4, 2.6 + hash(i, s) * 2.8, 0.7, -4.2 + i * 1.7, 0, s * 1.5, C.wall);
    for (let i = 0; i < 3; i++) { pillar(0.35, 4.2 - i, -3.4 + i * 3.4, 0, 0, C.wall, 6); box(2.8, 0.4, 0.5, -1.7 + i * 3.4, 3.4 - i * 0.6, 0, C.wall, 0.15); }
  });

  // ── Patrick's Quarters: a dark manor with a copper mansard roof, lit windows and a cupola. ──
  building(-10, -11.2, 0.34, () => {
    box(12.8, 7, 8.8, 0, 0, 0, C.patrick);
    box(13.2, 0.4, 9.2, 0, 7, 0, C.churchDark);
    mansard(12.8, 8.8, 3.4, 0, 7.4, 0, C.copper, 0.66);
    box(8, 0.3, 5.4, 0, 10.8, 0, C.copper);
    for (let i = 0; i < 3; i++) { box(1.2, 1.7, 1.2, -4 + i * 4, 7.6, 3.4, C.patrick); hip(1.6, 1.6, 1.1, -4 + i * 4, 9.3, 3.4, C.copper); box(0.7, 0.9, 0.1, -4 + i * 4, 8, 4.05, GLOW); } // dormers
    windows(5, 2.3, -4.6, 1.8, 4.42, 0, 2); windows(5, 2.3, -4.6, 4.8, 4.42, 0, 3);
    for (const x of [-5, 4]) { box(1, 3.4, 1, x, 10.5, -2, C.patrick); box(1.3, 0.3, 1.3, x, 13.9, -2, C.churchDark); } // chimneys
    pillar(1.1, 1.6, 0, 11, 0, C.copper, 8); cone(1.3, 1.8, 0, 12.6, 0, C.copper, 8); // laboratory cupola
  });

  // ── The dungeon: heavy dark stone, barred slits and a low roof. ──
  building(2.4, -14, 0.05, () => {
    box(12, 6.4, 9.6, 0, 0, 0, C.dungeon);
    gable(9.6, 2.2, 12.4, 0, 6.4, 0, C.dungRoof, true);
    for (let i = 0; i < 5; i++) { box(0.3, 1.6, 0.2, -4.4 + i * 2.2, 2.6, 4.82, VOID); for (let b = 0; b < 3; b++) box(0.05, 1.6, 0.06, -4.55 + i * 2.2 + b * 0.15, 2.6, 4.9, 0x3a3733); }
    box(2, 3, 0.3, 0, 0, 4.84, VOID); // the door to the courtyard
    for (const x of [-5.7, 5.7]) { box(1.2, 8, 1.2, x, 0, -4.4, C.dungeon); hip(1.6, 1.6, 1.6, x, 8, -4.4, C.dungRoof); }
  });

  // ── The main gate: a long diagonal gatehouse with two round towers, east of the courtyard. ──
  building(12, -6, -0.75, () => {
    box(11, 6.4, 4, 0, 0, 0, C.gate);
    gable(4, 1.9, 11.4, 0, 6.4, 0, C.brickRoof, true);
    for (const x of [-5.5, 5.5]) { pillar(2.1, 9, x, 0, 0, C.gate, 8); cone(2.5, 3.8, x, 9, 0, C.brickRoof, 8); box(0.7, 1.8, 0.2, x, 4, 2.0, GLOW); }
    box(3, 4.4, 0.4, 0, 0, 2.05, VOID);
    for (let b = 0; b < 7; b++) box(0.1, 4.2, 0.1, -1.2 + b * 0.4, 0, 2.2, 0x2a2622);
  });

  // ── The caretakers' quarters: a brick manor with a mansard roof, dormers, kitchen, well and herb garden. ──
  building(12.5, 5.6, 0.5, () => {
    box(10.4, 5.6, 5.8, 0, 0, 0, C.brick);
    mansard(10.4, 5.8, 2.6, 0, 5.6, 0, C.brickRoof, 0.7);
    box(7, 0.3, 4, 0, 8.2, 0, C.brickRoof);
    for (let i = 0; i < 3; i++) { box(1.1, 1.5, 1.1, -3 + i * 3, 5.8, 2.6, C.brick); hip(1.5, 1.5, 1, -3 + i * 3, 7.3, 2.6, C.brickRoof); box(0.6, 0.8, 0.1, -3 + i * 3, 6.1, 3.2, GLOW); }
    windows(4, 2.4, -3.6, 1.4, 2.95, 0, 2);
    box(1.1, 3.4, 1.1, 3, 8, -1, C.brick); box(1.4, 0.3, 1.4, 3, 11.3, -1, C.churchDark); // chimney
    box(5, 3.4, 3.6, -7, 0, 1, C.brick); gable(3.6, 1.6, 5.2, -7, 3.4, 1, C.brickRoof, true); // kitchen and forging room
    box(4, 2.6, 3, -2, 0, -4.6, C.brick); gable(3, 1.3, 4.4, -2, 2.6, -4.6, C.brickRoof, true); // lumber room
    pillar(0.8, 0.9, 5.6, 0, -4.6, C.wall, 8); box(1.6, 0.15, 0.15, 5.6, 2.1, -4.6, C.wall); // the well
    for (let i = 0; i < 6; i++) box(0.15, 0.7, 0.15, 5.2 + i * 0.45, 0, 2.2, 0x6a5a3a); box(2.8, 0.1, 2.2, 6.5, 0, 3.6, 0x35432e); // herb garden fence and beds
  });

  // ── The storage room: a long grey warehouse with an outside stair and the holy-water font. ──
  building(0.4, 12.8, 0.05, () => {
    box(11, 6.2, 8.8, 0, 0, 0, C.storage);
    gable(8.8, 3, 11.4, 0, 6.2, 0, C.storRoof, true);
    windows(4, 2.6, -3.9, 1.6, -4.5, Math.PI, 3);
    for (let i = 0; i < 5; i++) box(2.4, 0.3, 0.9, 6.4 + i * 0.5, i * 0.5, 2 - i * 0.2, C.paving); // outside stair
    box(0.9, 0.9, 0.9, -6.4, 0, 2, C.marble); // the font
    box(2.4, 3, 0.4, 0, 0, 4.5, VOID);
  });

  // ── The library: tan stone with a slate hip roof and a round "angel room" cupola. ──
  building(-11.2, 12, 0.25, () => {
    box(12, 7, 10, 0, 0, 0, C.library);
    hip(12.6, 10.6, 3.6, 0, 7, 0, C.libRoof);
    pillar(2, 3, -3, 7, 0, C.library, 8); cone(2.3, 2.2, -3, 10, 0, C.libRoof, 8);
    windows(5, 2.2, -4.4, 2, 5.05, 0, 3);
    box(1.6, 2.6, 0.4, 3, 0, 5.05, VOID);
    box(3, 5, 3, 6.4, 0, -1, C.library); gable(3, 1.5, 3.4, 6.4, 5, -1, C.libRoof); // printing room annex
  });
  // the stained-glass room and its curved passage
  building(-24, 6.8, 0.2, () => {
    box(5.6, 5, 4.6, 0, 0, 0, C.church); gable(4.6, 1.8, 6, 0, 5, 0, C.lead, true);
    pillar(2.3, 5, -2.8, 0, 0, C.church, 8); cone(2.5, 2, -2.8, 5, 0, C.lead, 8);
    lancet(0, 1.4, 2.4, 1.6, 2.6, 0);
  });

  // ── The graveyard: leaning stones, crosses, two named graves and bare trees. ──
  building(-19.6, 19, -0.5, () => {
    box(11, 0.1, 9, 0, 0, 0, 0x3f4d38);
    for (let i = 0; i < 15; i++) {
      const x = -4.4 + (i % 5) * 2.2; const z = -3 + Math.floor(i / 5) * 2.8; const h = 1.2 + hash(i, 3) * 1.0;
      box(0.7, h, 0.25, x, 0, z, 0x7a7568, (hash(i, 9) - 0.5) * 0.6);
      if (i % 3 === 0) box(0.55, 0.2, 0.2, x, h * 0.7, z, 0x7a7568, (hash(i, 9) - 0.5) * 0.6);
    }
    box(1.2, 0.5, 2.4, 4.6, 0, 3.6, C.marble); // St. Daniel's tomb
    box(0.6, 1.2, 0.2, -4.6, 0, 3.6, C.marble); // Charlotte's small stone
    for (let i = 0; i < 6; i++) box(0.12, 1.1, 0.12, -5.3 + i * 2.1, 0, 4.7, 0x3a3128); // iron railing
  });
  deadTree(-27, 25, 6); deadTree(-14, 27, 5); deadTree(26, 14, 5.5); deadTree(-48, 8, 6.5);

  // ── The perimeter wall: kept INSIDE the plateau, with a gap and two piers for the gate on the east. ──
  const W = { x0: PLATEAU.x0 + 3, x1: PLATEAU.x1 - 3, z0: PLATEAU.z0 + 3, z1: PLATEAU.z1 - 3 };
  box(W.x1 - W.x0, 2.6, 0.9, (W.x0 + W.x1) / 2, 0, W.z0, C.wall); // north
  box(W.x1 - W.x0, 2.6, 0.9, (W.x0 + W.x1) / 2, 0, W.z1, C.wall); // south
  box(0.9, 2.6, W.z1 - W.z0, W.x0, 0, (W.z0 + W.z1) / 2, C.wall); // west
  box(0.9, 2.6, (-9 - W.z0), W.x1, 0, (W.z0 - 9) / 2, C.wall);    // east, north of the gate
  box(0.9, 2.6, (W.z1 + 3), W.x1, 0, (W.z1 - 3) / 2, C.wall);     // east, south of the gate
  for (const z of [-9, -3]) { box(1.8, 5.4, 1.8, W.x1, 0, z, C.gate); hip(2.2, 2.2, 1.8, W.x1, 5.4, z, C.brickRoof); box(0.4, 0.5, 0.4, W.x1 + 1.1, 4.4, z, GLOW); }
  box(1.6, 1.0, 6.4, W.x1, 5.4, -6, C.gate); // gate lintel
  for (let b = 0; b < 9; b++) box(0.12, 4.6, 0.12, W.x1, 0, -8 + b * 0.5, 0x2a2622);
  for (let i = 0; i < 10; i++) { box(1, 1, 1, W.x0 + 4 + i * 7.6, 2.6, W.z0, C.wall); box(1, 1, 1, W.x0 + 4 + i * 7.6, 2.6, W.z1, C.wall); } // crenellations

  underground();
}

/** A corridor between two points (floor, ceiling, two walls) at floor height `y`. */
function hall(x1: number, z1: number, x2: number, z2: number, w: number, y: number, h = 3.6): void {
  const len = Math.hypot(x2 - x1, z2 - z1); const ry = -Math.atan2(z2 - z1, x2 - x1);
  const mx = (x1 + x2) / 2; const mz = (z1 + z2) / 2;
  const prev = T;
  T = prev.clone().multiply(M(mx, 0, mz, ry));
  box(len, 0.4, w, 0, y - 0.4, 0, UG.floor);
  box(len, 0.5, w, 0, y + h, 0, UG.ceil);
  box(len, h, 0.5, 0, y, w / 2, UG.wall); box(len, h, 0.5, 0, y, -w / 2, UG.wall);
  T = prev;
}
/** A vault. `open` lists the sides ('n','s','e','w') left without a wall, so corridors can walk straight in. */
function room(x: number, z: number, w: number, d: number, y: number, open = '', h = 4.4): void {
  box(w, 0.4, d, x, y - 0.4, z, UG.floor); box(w, 0.5, d, x, y + h, z, UG.ceil);
  if (!open.includes('s')) box(w, h, 0.6, x, y, z + d / 2, UG.wall);
  if (!open.includes('n')) box(w, h, 0.6, x, y, z - d / 2, UG.wall);
  if (!open.includes('e')) box(0.6, h, d, x + w / 2, y, z, UG.wall);
  if (!open.includes('w')) box(0.6, h, d, x - w / 2, y, z, UG.wall);
  box(0.5, 0.5, 0.5, x, y + 0.2, z, GLOW); // a candle on the floor so every vault has a point of light
}

/** The underground ring from the plan: dungeon cells, the acid tank hub, tunnels, the altar and the cauldron. */
function underground(): void {
  const y = -9;
  // Bedrock under the vaults, so a cutaway shows rooms resting on rock instead of floating over the sea.
  box(PLATEAU.x1 - PLATEAU.x0 - 2, 1, PLATEAU.z1 - PLATEAU.z0 - 2, (PLATEAU.x0 + PLATEAU.x1) / 2, -10.6, (PLATEAU.z0 + PLATEAU.z1) / 2, 0x5a5448);
  // Dungeon cells under the dungeon block: stairs, a cell with bars, the torture room.
  room(2.4, -14, 11, 8.6, y, 's');
  for (let b = 0; b < 6; b++) box(0.1, 3.6, 0.1, 5 + b * 0.5, y, -14, 0x4a4742);
  box(3, 0.3, 2.4, 6.4, y + 0.1, -16.6, 0x6b6558);
  box(1.4, 1.1, 2.2, 0, y, -12, 0x6b6558); box(0.4, 0.4, 0.4, 0.8, y + 1.1, -12, GREEN);
  // The south tunnel to the hub, and the hub: a round acid tank with a cellar and a shrine beside it.
  hall(2.4, -9.7, 2.4, -2.6, 3.4, y);
  pillar(3.2, 4.4, 2, y, 0.8, 0x3f3b35, 10);                          // the acid tank (rendered as a pit rim)
  pillar(2.9, 0.3, 2, y + 0.2, 0.8, 0x6fa89a, 10);                     // acid surface
  room(-2.8, 0.8, 4, 4, y, 'ew'); room(7, 1.2, 4, 3.6, y, 'w');                    // cellar and shrine
  box(1.4, 1.2, 1.4, 7, y, 1.2, C.bone); box(0.4, 0.4, 0.4, 7, y + 1.2, 1.2, GREEN);
  // The south tunnel to the underground storage room.
  hall(2, 3.6, 0.4, 9.7, 3.4, y);
  room(0.4, 14, 11, 8.6, y, 'n');
  box(1, 1, 1, -3, y, 14, C.bone); for (let s = 0; s < 4; s++) box(2.2, 0.3, 0.8, 4 + s * 0.5, y + s * 0.4, 14, 0x6b6558);
  // The west corridor: sub-hall, two long corridors, a bridge and the altar of darkness.
  hall(-4.8, 0.8, -12, 1.4, 3.4, y);
  hall(-12, 1.4, -17.4, 8, 3.4, y);
  hall(-17.4, 8, -18.6, 25, 3.4, y);
  pillar(2.2, 4.4, -13.4, y, 6.6, 0x3f3b35, 10); pillar(1.9, 0.2, -13.4, y + 0.2, 6.6, 0x2a2622, 10); // the altar room
  box(0.4, 1, 0.4, -13.4, y + 0.2, 6.6, C.bone); box(0.3, 0.3, 0.3, -13.4, y + 1.2, 6.6, GREEN);
  for (let s = 0; s < 6; s++) box(2.4, 0.3, 0.7, -18.6, y + s * 0.25, 23 + s * 0.5, 0x6b6558); // the stairs at the bridge end
  // The far west chamber under the church: the cauldron of life.
  hall(-12, 1.4, -34.7, 0.8, 3.4, y);
  room(-37.2, 0.8, 5, 6.4, y, 'e');
  pillar(1.5, 1.4, -37.2, y, 0.8, 0x2f2b27, 10); pillar(1.3, 0.2, -37.2, y + 1.4, 0.8, GREEN, 10);
  box(1.6, 0.4, 1.6, -37.2, y, -2.2, 0x6b6558);
}

/** Merges the whole monastery into one geometry (one draw call). */
export function buildMonastery(): THREE.BufferGeometry {
  parts.length = 0;
  build();
  const merged = mergeGeometries(parts, false);
  parts.forEach((p) => p.dispose());
  parts.length = 0;
  merged.computeVertexNormals();
  return merged;
}

/** 64×64 stone noise. Nearest filtering on purpose: this is the PS1 texture look. */
export function stoneTexture(): THREE.DataTexture {
  const n = 64;
  const data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const v = 150 + hash(x, y) * 70 - (y % 16 === 0 || (x + (Math.floor(y / 16) % 2) * 16) % 32 === 0 ? 55 : 0);
      const i = (y * n + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = Math.max(60, Math.min(255, v));
      data[i + 3] = 255;
    }
  }
  const t = new THREE.DataTexture(data, n, n, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.magFilter = t.minFilter = THREE.NearestFilter;
  t.needsUpdate = true;
  return t;
}
