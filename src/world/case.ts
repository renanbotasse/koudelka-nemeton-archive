import * as THREE from 'three';

export interface CaseWorld {
  /** Moves through the case: 0 closed, 1 lid open (disc 1), 2 first page turned (discs 2 and 3), 3 second page turned (disc 4). */
  go(delta: number): void;
  turnOver(): void;
  setPaused(v: boolean): void;
  dispose(): void;
}

const W = 1.5; // the supplied front cover is 742 x 639, so the case keeps that shape
const H = 1.29;
const D = 0.3; // four discs make it thicker than a single case
const WALL = 0.05;
const ZH = 0.125; // every leaf hinges on the same line as the lid, so turned pages land on top of it
const PAGE_Z = [0.04, -0.04]; // the two swinging trays, front to back
const DISC_R = 0.54;
const BG = new THREE.Color(0x1a2624);
const PLASTIC = 0x10181a;

function tex(c: HTMLCanvasElement): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter; // chunky texels, like the monastery stone
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  return t;
}

function canvas(w: number, h: number): { c: HTMLCanvasElement; g: CanvasRenderingContext2D } {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  return { c, g: c.getContext('2d')! };
}

const TITLE = "700 64px 'Cinzel Decorative', Cinzel, Georgia, serif";
const LABEL = "600 22px 'Cinzel', Georgia, serif";

/** Plain noise so flat colours do not look like a UI rectangle. */
function grain(g: CanvasRenderingContext2D, w: number, h: number, alpha: number): void {
  for (let i = 0; i < w * h * 0.05; i++) {
    g.fillStyle = `rgba(${Math.random() < 0.5 ? '0,0,0' : '255,255,255'},${alpha})`;
    g.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  }
}

function spine(): THREE.CanvasTexture {
  const { c, g } = canvas(64, 256);
  g.fillStyle = '#170f0d'; g.fillRect(0, 0, 64, 256); grain(g, 64, 256, 0.1);
  g.fillStyle = '#8a1d2c'; g.fillRect(0, 0, 64, 14); g.fillRect(0, 242, 64, 14);
  g.save(); g.translate(32, 128); g.rotate(-Math.PI / 2); g.textAlign = 'center'; g.fillStyle = '#e4d6b4';
  g.font = "700 30px 'Cinzel Decorative', Cinzel, Georgia, serif"; g.fillText('KOUDELKA', 0, 10);
  g.restore();
  return tex(c);
}

function tray(): THREE.CanvasTexture {
  const { c, g } = canvas(256, 256);
  g.fillStyle = '#0b1214'; g.fillRect(0, 0, 256, 256); grain(g, 256, 256, 0.07);
  g.strokeStyle = '#243236'; g.lineWidth = 2;
  g.beginPath(); g.arc(128, 128, 100, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.arc(128, 128, 22, 0, Math.PI * 2); g.stroke();
  return tex(c);
}

function fallbackFront(): THREE.CanvasTexture {
  const { c, g } = canvas(256, 256);
  g.fillStyle = '#16100e'; g.fillRect(0, 0, 256, 256); grain(g, 256, 256, 0.08);
  g.textAlign = 'center'; g.fillStyle = '#e4d6b4'; g.font = TITLE.replace('64px', '40px'); g.fillText('KOUDELKA', 128, 130);
  g.font = LABEL.replace('22px', '14px'); g.fillStyle = '#c9a24a'; g.fillText('FOUR DISCS', 128, 170);
  return tex(c);
}

const plastic = (): THREE.MeshBasicMaterial => new THREE.MeshBasicMaterial({ color: PLASTIC });

/**
 * A four-disc PlayStation case in the same low-resolution look as the monastery: drag to turn it,
 * open the lid, and lift each disc. The covers and discs are the supplied photographs; the spine, tray and leaflet are drawn here.
 */
/** Loads a photo as a texture; the case already renders with a plain fallback while it arrives. */
function photo(url: string, onLoad: (t: THREE.Texture) => void): void {
  new THREE.TextureLoader().load(url, (t) => {
    t.colorSpace = THREE.SRGBColorSpace; t.magFilter = THREE.NearestFilter; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
    onLoad(t);
  });
}

export function createCase(
  canvasEl: HTMLCanvasElement,
  opts: { base: string },
  onStage: (stage: number) => void,
): CaseWorld {
  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(1); renderer.setClearColor(BG, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 4 / 3, 0.5, 20);
  camera.position.set(0, 0, 3.9);

  const disposables: Array<{ dispose(): void }> = [];
  const keep = <T extends { dispose(): void }>(x: T): T => { disposables.push(x); return x; };

  const group = new THREE.Group(); scene.add(group);
  const frontTex = keep(fallbackFront());
  const frontMat = new THREE.MeshBasicMaterial({ map: frontTex });
  photo(`${opts.base}/front.jpg`, (x) => { frontMat.map = x; frontMat.needsUpdate = true; disposables.push(x); });

  const backMat = new THREE.MeshBasicMaterial({ color: 0x16100e });
  photo(`${opts.base}/back.jpg`, (x) => { backMat.map = x; backMat.color.set(0xffffff); backMat.needsUpdate = true; disposables.push(x); });

  // Body: back panel with its cover on the outside and the disc tray on the inside, plus the three open edges.
  const back = new THREE.Mesh(
    keep(new THREE.BoxGeometry(W, H, WALL)),
    [plastic(), plastic(), plastic(), plastic(), new THREE.MeshBasicMaterial({ map: keep(tray()) }), backMat],
  );
  back.position.z = -D / 2 + WALL / 2;
  const edges = new THREE.Group();
  const edgeGeo = keep(new THREE.BoxGeometry(1, 1, 1));
  const edgeMat = keep(plastic());
  const edge = (sx: number, sy: number, sz: number, x: number, y: number): void => {
    const m = new THREE.Mesh(edgeGeo, edgeMat); m.scale.set(sx, sy, sz); m.position.set(x, y, 0); edges.add(m);
  };
  edge(W, WALL, D, 0, H / 2 - WALL / 2);
  edge(W, WALL, D, 0, -H / 2 + WALL / 2);
  edge(WALL, H, D, W / 2 - WALL / 2, 0);
  const spineMesh = new THREE.Mesh(
    keep(new THREE.BoxGeometry(WALL, H, D)),
    [plastic(), new THREE.MeshBasicMaterial({ map: keep(spine()) }), plastic(), plastic(), plastic(), plastic()],
  );
  spineMesh.position.x = -W / 2 + WALL / 2;
  group.add(back, edges, spineMesh);

  // Every leaf (the lid and the two trays) hinges on the spine line at the lid's depth. Turning a leaf by half a
  // circle lays it flat to the left, and leaves that were deeper in the case land on top of those turned before.
  const leaf = (z: number, mats: THREE.Material[]): THREE.Group => {
    const pivot = new THREE.Group(); pivot.position.set(-W / 2, 0, ZH); group.add(pivot);
    const m = new THREE.Mesh(keep(new THREE.BoxGeometry(W, H, WALL * 0.5)), mats);
    m.position.set(W / 2, 0, z - ZH); pivot.add(m);
    return pivot;
  };
  const lidPivot = (() => {
    const pivot = new THREE.Group(); pivot.position.set(-W / 2, 0, ZH); group.add(pivot);
    const m = new THREE.Mesh(keep(new THREE.BoxGeometry(W, H, WALL)), [plastic(), plastic(), plastic(), plastic(), frontMat, new THREE.MeshBasicMaterial({ color: 0x2e4046 })]);
    m.position.x = W / 2; pivot.add(m);
    return pivot;
  })();

  // Each tray carries a disc on both faces: disc 1 and 2 on the first, 3 and 4 on the second.
  const discGeo = keep(new THREE.CylinderGeometry(DISC_R, DISC_R, 0.022, 32));
  const disc = (n: number, parent: THREE.Object3D, side: 1 | -1): void => {
    const face = new THREE.MeshBasicMaterial({ color: 0x2b363a, transparent: true, alphaTest: 0.5 });
    photo(`${opts.base}/disc-${n}.png`, (x) => { x.center.set(0.5, 0.5); x.rotation = side * (Math.PI / 2); face.map = x; face.color.set(0xffffff); face.needsUpdate = true; disposables.push(x); });
    const rim = new THREE.MeshBasicMaterial({ color: 0x4a5a60 });
    const m = new THREE.Mesh(discGeo, [rim, face, rim]);
    m.rotation.x = side * (Math.PI / 2); // the printed face looks away from the tray
    m.position.set(0.02, 0, side * (WALL * 0.25 + 0.012)); // the holder already sits mid-page
    parent.add(m);
  };
  const trayMat = (): THREE.Material => new THREE.MeshBasicMaterial({ color: 0x2e4046 });
  const pages = PAGE_Z.map((z, k) => {
    const pivot = leaf(z, [plastic(), plastic(), plastic(), plastic(), trayMat(), trayMat()]);
    const holder = pivot.children[0] as THREE.Object3D;
    disc(k * 2 + 1, holder, 1); disc(k * 2 + 2, holder, -1);
    return pivot;
  });

  // `stage` is where the visitor is in the case; the leaves ease toward the angles that stage asks for.
  let stage = 0;
  const angles = (s: number): [number, number, number] => [s >= 1 ? Math.PI : 0, s >= 2 ? Math.PI : 0, s >= 3 ? Math.PI : 0];
  const want = { yaw: -0.5, pitch: 0.18, shift: 0, dist: 3.9, a: angles(0) };
  const cur = { yaw: want.yaw, pitch: want.pitch, shift: 0, dist: 3.9, a: [0, 0, 0] as [number, number, number] };
  let paused = false; let visible = true; let raf = 0; let last = 0; let idleSince = 0;
  const setStage = (s: number): void => {
    stage = Math.max(0, Math.min(3, s));
    want.a = angles(stage);
    const open = stage > 0;
    want.shift = open ? 0.75 : 0; want.dist = open ? 5.4 : 3.9;
    if (open) want.yaw = 0.1;
    idleSince = performance.now();
    onStage(stage);
  };

  const resize = (): void => {
    const w = canvasEl.clientWidth || 1; const h = canvasEl.clientHeight || 1;
    const ih = 300; const iw = Math.max(2, Math.round(ih * (w / h)));
    renderer.setSize(iw, ih, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize); ro.observe(canvasEl); resize();
  const io = new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }); io.observe(canvasEl);

  // Pointer: drag turns the whole case; a press that barely moves turns a page (right half forward, left half back).
  let downAt: { x: number; y: number; moved: number } | null = null;
  const down = (e: PointerEvent): void => { canvasEl.setPointerCapture(e.pointerId); downAt = { x: e.clientX, y: e.clientY, moved: 0 }; idleSince = performance.now(); };
  const move = (e: PointerEvent): void => {
    if (!downAt) return;
    const dx = e.clientX - downAt.x; const dy = e.clientY - downAt.y;
    downAt.moved += Math.abs(dx) + Math.abs(dy); downAt.x = e.clientX; downAt.y = e.clientY;
    want.yaw += dx * 0.01; want.pitch = Math.max(-0.7, Math.min(0.7, want.pitch + dy * 0.008)); idleSince = performance.now();
  };
  const up = (e: PointerEvent): void => {
    if (downAt && downAt.moved < 6 && stage > 0) {
      const r = canvasEl.getBoundingClientRect();
      setStage(stage + (e.clientX - r.left > r.width / 2 ? 1 : -1));
    }
    downAt = null;
  };
  const key = (e: KeyboardEvent): void => {
    const k = e.key;
    if (k === 'ArrowLeft') want.yaw -= 0.3; else if (k === 'ArrowRight') want.yaw += 0.3;
    else if (k === 'ArrowUp') want.pitch = Math.max(-0.7, want.pitch - 0.2); else if (k === 'ArrowDown') want.pitch = Math.min(0.7, want.pitch + 0.2);
    else if (k === 'PageDown' || k === ' ') setStage(stage + 1); else if (k === 'PageUp') setStage(stage - 1);
    else return;
    e.preventDefault(); idleSince = performance.now();
  };
  canvasEl.addEventListener('pointerdown', down); canvasEl.addEventListener('pointermove', move);
  canvasEl.addEventListener('pointerup', up); canvasEl.addEventListener('pointercancel', () => { downAt = null; });
  canvasEl.addEventListener('keydown', key);

  const draw = (t: number): void => {
    raf = requestAnimationFrame(draw);
    if (paused || !visible || document.hidden || t - last < 1000 / 30) return;
    const dt = Math.min(0.1, (t - last) / 1000 || 0.033); last = t;
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent easing
    cur.yaw += (want.yaw - cur.yaw) * k; cur.pitch += (want.pitch - cur.pitch) * k;
    cur.shift += (want.shift - cur.shift) * k; cur.dist += (want.dist - cur.dist) * k;
    for (let i = 0; i < 3; i++) cur.a[i] = cur.a[i]! + (want.a[i]! - cur.a[i]!) * k;
    const idle = t - idleSince > 3500 && downAt === null && stage === 0;
    const sway = idle ? Math.sin(t / 1700) * 0.28 : 0; // a slow turntable only while the case is shut
    group.rotation.set(cur.pitch, cur.yaw + sway, 0);
    group.position.x = cur.shift; camera.position.z = cur.dist;
    lidPivot.rotation.y = -cur.a[0]!;
    pages.forEach((pg, i) => { pg.rotation.y = -cur.a[i + 1]!; });
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(draw);

  return {
    go(delta) { setStage(stage + delta); },
    turnOver() { want.yaw += Math.PI; idleSince = performance.now(); },
    setPaused(v) { paused = v; },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvasEl.removeEventListener('pointerdown', down); canvasEl.removeEventListener('pointermove', move);
      canvasEl.removeEventListener('pointerup', up); canvasEl.removeEventListener('keydown', key);
      disposables.forEach((d) => d.dispose()); renderer.dispose();
    },
  };
}
