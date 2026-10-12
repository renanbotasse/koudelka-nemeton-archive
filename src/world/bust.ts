import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { createPsxMaterial } from './psx-material';

/**
 * Original low-poly character busts in the same PS1 look as the monastery.
 * They are stylised portraits made for this site, not copies of any official art or model.
 */
class Parts {
  private list: THREE.BufferGeometry[] = [];
  private add(g: THREE.BufferGeometry, color: number, x: number, y: number, z: number): void {
    const ng = g.index ? g.toNonIndexed() : g;
    ng.translate(x, y, z);
    ng.deleteAttribute('uv');
    const c = new THREE.Color(color);
    const arr = new Float32Array(ng.attributes.position!.count * 3);
    for (let i = 0; i < arr.length; i += 3) { arr[i] = c.r; arr[i + 1] = c.g; arr[i + 2] = c.b; }
    ng.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    this.list.push(ng);
  }
  box(w: number, h: number, d: number, x: number, y: number, z: number, color: number): this { this.add(new THREE.BoxGeometry(w, h, d), color, x, y, z); return this; }
  ball(r: number, x: number, y: number, z: number, color: number, sx = 1, sy = 1, sz = 1, seg = 8): this {
    const g = new THREE.SphereGeometry(r, seg, Math.max(4, seg - 2)); g.scale(sx, sy, sz); this.add(g, color, x, y, z); return this;
  }
  cyl(rt: number, rb: number, h: number, x: number, y: number, z: number, color: number, seg = 8): this { this.add(new THREE.CylinderGeometry(rt, rb, h, seg), color, x, y, z); return this; }
  build(): THREE.BufferGeometry { const g = mergeGeometries(this.list, false); this.list.forEach((p) => p.dispose()); g.computeVertexNormals(); return g; }
}

const EYE = 0x15120f;

/** Head, neck and eyes shared by everyone; `skin` and proportions vary per character. */
function face(p: Parts, skin: number, s = 1, hollow = false): void {
  p.cyl(0.2 * s, 0.24 * s, 0.4 * s, 0, 1.12 * s, 0, skin, 6); // neck
  p.ball(0.5 * s, 0, 1.62 * s, 0, skin, 0.9, 1.1, 0.95); // head
  p.box(0.12 * s, 0.1 * s, 0.1 * s, -0.17 * s, 1.68 * s, 0.44 * s, EYE).box(0.12 * s, 0.1 * s, 0.1 * s, 0.17 * s, 1.68 * s, 0.44 * s, EYE);
  if (hollow) p.box(0.2 * s, 0.18 * s, 0.1 * s, -0.17 * s, 1.68 * s, 0.43 * s, EYE).box(0.2 * s, 0.18 * s, 0.1 * s, 0.17 * s, 1.68 * s, 0.43 * s, EYE);
  p.box(0.09 * s, 0.16 * s, 0.1 * s, 0, 1.55 * s, 0.5 * s, skin); // nose
  p.box(0.22 * s, 0.04 * s, 0.08 * s, 0, 1.4 * s, 0.44 * s, 0x6b3a32); // mouth
}

function shoulders(p: Parts, color: number, w = 1.9): void {
  p.box(w, 0.55, 0.85, 0, 0.7, 0, color); // shoulders
  p.box(w * 0.78, 1.3, 0.7, 0, -0.05, 0, color); // chest
}

type Builder = (p: Parts) => void;

const BUILDERS: Record<string, Builder> = {
  'koudelka-iasant': (p) => {
    shoulders(p, 0x6a1a22); p.box(1.6, 0.3, 0.9, 0, 0.95, 0.05, 0x8e1b22); // red shawl
    face(p, 0xc79b78);
    p.ball(0.56, 0, 1.7, -0.12, 0x14100e, 1, 1.08, 1, 8).box(1.2, 1.5, 0.35, 0, 1.0, -0.42, 0x14100e); // long black hair
    p.box(1.05, 0.14, 0.95, 0, 1.98, 0.02, 0x8e1b22); // headscarf band
    p.box(0.14, 0.2, 0.08, 0, 0.5, 0.45, 0xc9a24a); // pendant
  },
  'edward-plunkett': (p) => {
    shoulders(p, 0x2b2a2e); p.box(0.5, 1.2, 0.1, -0.3, 0.1, 0.38, 0x3a393e).box(0.5, 1.2, 0.1, 0.3, 0.1, 0.38, 0x3a393e); // coat lapels
    p.box(0.45, 0.35, 0.2, 0, 0.8, 0.42, 0xe8dfc9); // cravat
    face(p, 0xe0c2a4);
    p.ball(0.55, 0, 1.78, -0.05, 0x5a3b26, 1, 0.8, 1); p.box(0.9, 0.25, 0.2, 0, 1.92, 0.4, 0x5a3b26); // short brown hair, fringe
  },
  'james-oflaherty': (p) => {
    shoulders(p, 0x17171a, 2.0); p.box(0.55, 0.16, 0.2, 0, 0.98, 0.42, 0xe8dfc9); // white collar
    p.box(0.12, 0.5, 0.08, 0, 0.45, 0.5, 0xc9a24a).box(0.34, 0.1, 0.08, 0, 0.55, 0.5, 0xc9a24a); // pectoral cross
    face(p, 0xdcc3ab);
    p.ball(0.52, 0, 1.72, -0.1, 0x8a8a90, 1, 0.85, 0.95); p.box(0.55, 0.14, 0.08, 0, 1.52, 0.45, 0x8a8a90); // grey hair and moustache
  },
  'roger-bacon': (p) => {
    shoulders(p, 0x5a4a38, 2.1); p.ball(0.9, 0, 0.95, -0.2, 0x4a3c2d, 1.1, 0.7, 0.9); // friar's hood on the shoulders
    face(p, 0xe8e0c8, 1, true); p.box(0.6, 0.12, 0.08, 0, 1.3, 0.46, 0x2a241e); // pale, hollow-eyed
  },
  'the-caretakers': (p) => {
    shoulders(p, 0x35507a); p.box(1.0, 1.2, 0.12, 0, 0.1, 0.44, 0xdad3c2); // apron
    face(p, 0xdcb99a);
    p.ball(0.52, 0, 1.75, -0.12, 0x9a9a9a, 1, 0.85, 1).ball(0.28, 0, 2.15, -0.2, 0x9a9a9a); // grey hair in a bun
  },
  charlotte: (p) => {
    shoulders(p, 0xd8d2c0, 1.5); face(p, 0xcfd4cc, 0.92, true);
    p.ball(0.52, 0, 1.64, -0.14, 0xcdc4a8, 1, 1.1, 1).box(1.0, 1.5, 0.3, 0, 0.8, -0.4, 0xcdc4a8); // long pale hair
  },
  elaine: (p) => {
    shoulders(p, 0xb8c4c8, 1.7); face(p, 0xd9e0dc);
    p.ball(0.6, 0, 1.72, -0.26, 0x9aa8ae, 1, 1.12, 1, 8).box(1.4, 1.8, 0.25, 0, 0.6, -0.52, 0x9aa8ae); // veil, behind the face
    p.box(0.7, 0.14, 0.9, 0, 0.96, 0.05, 0xe8dfc9);
  },
  alias: (p) => {
    shoulders(p, 0x2a2a2c, 2.0); p.ball(0.62, 0, 1.76, -0.27, 0x2c2c30, 1.05, 1.15, 1, 8).box(0.9, 0.18, 0.2, 0, 2.02, 0.36, 0x2c2c30); // deep hood, brim over the eyes
    face(p, 0x9a7a60); p.box(0.9, 0.3, 0.25, 0, 1.0, 0.4, 0x54484a); // scarf
  },
};

export const BUST_SLUGS = Object.keys(BUILDERS);

export interface BustWorld { dispose(): void; setPaused(v: boolean): void }

/** Renders a slowly turning bust at 160×200 with the PS1 material. Pass `still` for a fixed pose. */
export function createBust(canvas: HTMLCanvasElement, slug: string, opts: { still?: boolean } = {}): BustWorld {
  const parts = new Parts();
  (BUILDERS[slug] ?? BUILDERS['edward-plunkett']!)(parts);
  const geometry = parts.build();
  const bg = new THREE.Color(0x1a2624);
  const resolution = new THREE.Vector2(160, 200);
  const material = createPsxMaterial({ resolution, fogColor: bg, fogNear: 9, fogFar: 16, psx: 0.7 });
  const mesh = new THREE.Mesh(geometry, material);
  const scene = new THREE.Scene(); scene.add(mesh);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(1); renderer.setSize(160, 200, false); renderer.setClearColor(bg, 1);
  const camera = new THREE.PerspectiveCamera(34, 160 / 200, 0.5, 30);
  camera.position.set(0, 1.25, 6.4); camera.lookAt(0, 1.15, 0);

  let paused = false; let visible = true; let raf = 0; let last = 0;
  const io = new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }); io.observe(canvas);
  const draw = (t: number): void => {
    if (!opts.still) raf = requestAnimationFrame(draw);
    if (!opts.still && (paused || !visible || document.hidden || t - last < 1000 / 24)) return;
    last = t;
    mesh.rotation.y = opts.still ? -0.45 : Math.sin(t / 1800) * 0.55; // 3/4 view, swaying like a turntable
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(draw);
  return {
    setPaused(v) { paused = v; },
    dispose() { cancelAnimationFrame(raf); io.disconnect(); geometry.dispose(); material.dispose(); renderer.dispose(); },
  };
}
