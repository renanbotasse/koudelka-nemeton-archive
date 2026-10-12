import * as THREE from 'three';
import { buildMonastery, stoneTexture } from './monastery';
import { createPsxMaterial } from './psx-material';

export interface WorldOptions {
  canvas: HTMLCanvasElement;
  /** 'lite' renders at a lower frame rate. */
  tier: 'full' | 'lite';
  /** Initial PS1 intensity, 0..1. */
  psx?: number;
}

export interface World {
  /** Scroll progress 0..1 along the descent. */
  setProgress(p: number): void;
  setPsx(v: number): void;
  /** Flies the camera to a fixed view (map mode). Pass null to return to the scroll path. */
  setView(view: { pos: [number, number, number]; look: [number, number, number] } | null): void;
  setPaused(paused: boolean): void;
  dispose(): void;
}

const INTERNAL_HEIGHT = 240;
const FOG = new THREE.Color(0x1a2624);

/**
 * One camera key per section of the home page, in order. Each is a clearly different place:
 * the progress value maps section index -> key, so every section lands on its own view.
 */
export const KEYS: Array<{ pos: [number, number, number]; look: [number, number, number] }> = [
  { pos: [26, 22, 58], look: [-42, 8, 4] }, // cliff: the whole ring from the sea road, church and spire at the left
  { pos: [47, 3.6, -6], look: [28, 4.5, -6] }, // gate: low, in front of the east gate, its bars and lanterns
  { pos: [34, 4, 3], look: [27, 4.5, -7] }, // name: close on a gate pier and its lantern
  { pos: [27, 6, 20], look: [12.5, 4, 5.6] }, // house: the caretakers' brick manor and its dormers
  { pos: [-5, 3.4, -0.8], look: [-14, 5, -0.8] }, // nave: the church wall and its door across the courtyard
  { pos: [-6, 2.4, 4.5], look: [-37, 27, -0.8] }, // midnight: craning up the great spire
  { pos: [2.4, -7.1, -4], look: [2.4, -7.5, -16] }, // cells: the barred dungeon corridor
  { pos: [-6, -7.1, 1], look: [-15, -7.5, 1.9] }, // sound: the tunnel to the altar
  { pos: [-24, -7.1, 1.1], look: [-37.2, -7.8, 0.8] }, // crypt: the cauldron chamber under the church
  { pos: [-10, 52, 50], look: [-27.4, 30, -0.8] }, // dawn: rising above the roofs, toward the spire
];

const smooth = (u: number): number => u * u * (3 - 2 * u);

/** Camera pose for progress p in [0,1]: eased between neighbouring keys so it lingers on each. */
function poseAt(p: number, pos: THREE.Vector3, look: THREE.Vector3): void {
  const f = Math.min(1, Math.max(0, p)) * (KEYS.length - 1);
  const i = Math.min(KEYS.length - 2, Math.floor(f));
  const u = smooth(f - i);
  const a = KEYS[i]!;
  const b = KEYS[i + 1]!;
  pos.set(...a.pos).lerp(new THREE.Vector3(...b.pos), u);
  look.set(...a.look).lerp(new THREE.Vector3(...b.look), u);
}

/**
 * Creates the PS1-style world. Everything allocated here is released in `dispose`,
 * so the host component can call it from `onCleanup`.
 */
export function createWorld(opts: WorldOptions): World {
  const { canvas } = opts;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(1);
  renderer.setClearColor(FOG, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(58, 4 / 3, 0.5, 220);
  const resolution = new THREE.Vector2(320, 240);

  const tex = stoneTexture();
  const material = createPsxMaterial({ resolution, fogColor: FOG, fogNear: 38, fogFar: 125, psx: opts.psx ?? 0.5, map: tex });
  const geometry = buildMonastery();
  scene.add(new THREE.Mesh(geometry, material));


  function resize(): void {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    const aspect = w / h;
    const ih = INTERNAL_HEIGHT;
    const iw = Math.max(2, Math.round(ih * aspect));
    resolution.set(iw, ih);
    // false = don't touch CSS size; CSS upscales the small buffer with pixelated sampling.
    renderer.setSize(iw, ih, false);
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let view: { pos: THREE.Vector3; look: THREE.Vector3 } | null = null;
  const camPos = new THREE.Vector3(...KEYS[0]!.pos);
  const camLook = new THREE.Vector3(...KEYS[0]!.look);
  let target = 0;
  let current = 0;
  let paused = false;
  let visible = true;
  let raf = 0;
  let last = 0;
  const pointer = new THREE.Vector2();
  const minFrame = 1000 / (opts.tier === 'lite' ? 20 : 30);
  const look = new THREE.Vector3();
  const p = new THREE.Vector3();

  function onPointer(e: PointerEvent): void {
    pointer.set((e.clientX / innerWidth - 0.5) * 2, (e.clientY / innerHeight - 0.5) * 2);
  }
  addEventListener('pointermove', onPointer, { passive: true });

  function frame(now: number): void {
    raf = requestAnimationFrame(frame);
    if (paused || !visible || document.hidden) return;
    if (now - last < minFrame) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    current += (target - current) * Math.min(1, dt * 5); // smooth the scroll
    if (view) {
      p.copy(view.pos);
      look.copy(view.look);
    } else {
      poseAt(current, p, look);
      // On portrait screens there is no text plate beside the scene, so drop the sideways framing offset.
      if (current < 0.11) look.x *= Math.min(1, Math.max(0, camera.aspect - 0.7)); // only the cliff view is framed beside the text plate
    }
    // Ease the real camera toward the wanted pose so view changes glide instead of cutting.
    const k = Math.min(1, dt * 3.2);
    camPos.lerp(p, k);
    camLook.lerp(look, k);
    p.copy(camPos);
    // Slow sway plus pointer parallax; ≤ ~3° of apparent rotation.
    p.x += Math.sin(now / 4200) * 0.35 + pointer.x * 0.5;
    p.y += Math.cos(now / 5100) * 0.2 - pointer.y * 0.25;
    camera.position.copy(p);
    camera.lookAt(camLook);
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  // Pause when scrolled out of view: no GPU work for a hidden canvas.
  const io = new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; });
  io.observe(canvas);

  return {
    setProgress(v) { target = Math.min(1, Math.max(0, v)); },
    setView(v) { view = v ? { pos: new THREE.Vector3(...v.pos), look: new THREE.Vector3(...v.look) } : null; },
    setPsx(v) { material.uniforms.uPsx!.value = Math.min(1, Math.max(0, v)); },
    setPaused(v) { paused = v; },
    dispose() {
      cancelAnimationFrame(raf);
      removeEventListener('pointermove', onPointer);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      tex.dispose();
      renderer.dispose();
    },
  };
}
