import * as THREE from 'three';
import { buildMonastery, stoneTexture } from './monastery';
import { createPsxMaterial } from './psx-material';

export interface Pin { id: string; pos: [number, number, number] }
export interface PinScreen { id: string; x: number; y: number; visible: boolean }

export interface Explorer {
  /** Glide the camera to look at an area. */
  focus(id: string | null): void;
  /** 0 = whole building, 1 = fully cut away to the deepest rooms. */
  setCut(v: number): void;
  setAuto(on: boolean): void;
  reset(): void;
  setPaused(p: boolean): void;
  dispose(): void;
}

const FOG = new THREE.Color(0x1a2624);
const HOME = { tx: -10, ty: 6, tz: 2, yaw: 0.5, pitch: 0.52, r: 78 };

/**
 * The interactive monastery for the walkthrough: drag to orbit, wheel or pinch to zoom, arrow keys too.
 * Area pins are projected to the screen every frame so the page can draw real buttons over the model.
 */
export function createExplorer(
  canvas: HTMLCanvasElement,
  pins: Pin[],
  onFrame: (p: PinScreen[]) => void,
  anchors: Record<string, { target: [number, number, number]; r: number; pitch: number }>,
): Explorer {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(1); renderer.setClearColor(FOG, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.5, 360);
  const resolution = new THREE.Vector2(320, 240);
  const tex = stoneTexture();
  const material = createPsxMaterial({ resolution, fogColor: FOG, fogNear: 90, fogFar: 260, psx: 0.55, map: tex });
  const geometry = buildMonastery();
  scene.add(new THREE.Mesh(geometry, material));

  // Orbit state: `want` is where the visitor is steering, `cur` is what is drawn (eased toward it).
  const want = { ...HOME };
  const cur = { ...HOME };
  let auto = true; let paused = false; let visible = true; let dragging = false; let raf = 0; let last = 0;
  let idleSince = 0;

  const resize = (): void => {
    const w = canvas.clientWidth || 1; const h = canvas.clientHeight || 1;
    const ih = 240; const iw = Math.max(2, Math.round(ih * (w / h)));
    resolution.set(iw, ih); renderer.setSize(iw, ih, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  // Pointer: one finger or the mouse orbits; two fingers (or the wheel) zoom.
  const ptrs = new Map<number, { x: number; y: number }>();
  let pinch = 0;
  const down = (e: PointerEvent): void => { canvas.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY }); dragging = true; idleSince = performance.now(); };
  const move = (e: PointerEvent): void => {
    const p = ptrs.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x; const dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
    if (ptrs.size === 1) { want.yaw -= dx * 0.008; want.pitch = clamp(want.pitch + dy * 0.006, -0.25, 1.35); }
    else if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()] as [{ x: number; y: number }, { x: number; y: number }];
      const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch) want.r = clamp(want.r * (pinch / d), 8, 150); pinch = d;
    }
    idleSince = performance.now();
  };
  const up = (e: PointerEvent): void => { ptrs.delete(e.pointerId); pinch = 0; if (!ptrs.size) dragging = false; };
  const wheel = (e: WheelEvent): void => { e.preventDefault(); want.r = clamp(want.r * (1 + Math.sign(e.deltaY) * 0.1), 8, 150); idleSince = performance.now(); };
  const key = (e: KeyboardEvent): void => {
    const k = e.key;
    if (k === 'ArrowLeft') want.yaw += 0.15; else if (k === 'ArrowRight') want.yaw -= 0.15;
    else if (k === 'ArrowUp') want.pitch = clamp(want.pitch + 0.1, -0.25, 1.35); else if (k === 'ArrowDown') want.pitch = clamp(want.pitch - 0.1, -0.25, 1.35);
    else if (k === '+' || k === '=') want.r = clamp(want.r * 0.9, 8, 150); else if (k === '-') want.r = clamp(want.r * 1.1, 8, 150);
    else return;
    e.preventDefault(); idleSince = performance.now();
  };
  canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', wheel, { passive: false }); canvas.addEventListener('keydown', key);
  canvas.addEventListener('dblclick', () => Object.assign(want, HOME));
  const io = new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }); io.observe(canvas);

  const v = new THREE.Vector3();
  const frame = (now: number): void => {
    raf = requestAnimationFrame(frame);
    if (paused || !visible || document.hidden || now - last < 1000 / 30) return;
    const dt = Math.min((now - last) / 1000, 0.1); last = now;
    // Gentle turntable until the visitor takes over (or focuses an area).
    if (auto && !dragging && now - idleSince > 2500 && !focused) want.yaw += dt * 0.12;
    const k = Math.min(1, dt * 6);
    for (const key of ['tx', 'ty', 'tz', 'yaw', 'pitch', 'r'] as const) cur[key] += (want[key] - cur[key]) * k;
    camera.position.set(cur.tx + Math.sin(cur.yaw) * Math.cos(cur.pitch) * cur.r, cur.ty + Math.sin(cur.pitch) * cur.r, cur.tz + Math.cos(cur.yaw) * Math.cos(cur.pitch) * cur.r);
    camera.lookAt(cur.tx, cur.ty, cur.tz);
    renderer.render(scene, camera);
    camera.updateMatrixWorld();
    onFrame(pins.map((p) => {
      v.set(...p.pos).project(camera);
      const sx = (v.x * 0.5 + 0.5) * canvas.clientWidth; const sy = (-v.y * 0.5 + 0.5) * canvas.clientHeight;
      return { id: p.id, x: sx, y: sy, visible: v.z < 1 && v.x > -1.05 && v.x < 1.05 && v.y > -1.05 && v.y < 1.05 };
    }));
  };
  let focused = false;
  raf = requestAnimationFrame(frame);

  return {
    focus(id) {
      const a = id ? anchors[id] : undefined;
      focused = !!a; idleSince = performance.now();
      if (!a) { Object.assign(want, HOME); return; }
      want.tx = a.target[0]; want.ty = a.target[1]; want.tz = a.target[2]; want.r = a.r; want.pitch = a.pitch;
    },
    setCut(t) { // First half of the slider shaves roofs and upper floors; the second half goes below ground and opens the vaults.
      material.uniforms.uClipY!.value = t <= 0 ? 1e4 : t < 0.5 ? 48 - (t / 0.5) * 40 : 8 - ((t - 0.5) / 0.5) * 21; },
    setAuto(on) { auto = on; },
    reset() { focused = false; Object.assign(want, HOME); },
    setPaused(p) { paused = p; },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('wheel', wheel); canvas.removeEventListener('keydown', key);
      geometry.dispose(); material.dispose(); tex.dispose(); renderer.dispose();
    },
  };
}

function clamp(n: number, lo: number, hi: number): number { return Math.min(hi, Math.max(lo, n)); }
