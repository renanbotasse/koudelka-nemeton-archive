import { Show, createSignal, onCleanup, onMount } from 'solid-js';
import { pickTier } from '../lib/capabilities';

/**
 * Full-viewport PS1-style world behind the home page.
 * Loads three.js only on capable devices and only after first paint,
 * so the page stays complete and fast without WebGL.
 */
/** Pauses the render loop when the visitor flips MOTION to OFF after the world has loaded. */
function watchMotion(w: import('../world/engine').World): MutationObserver {
  const mo = new MutationObserver(() => w.setPaused(document.documentElement.dataset.motion === 'off'));
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
  return mo;
}

export default function WorldCanvas() {
  let canvas!: HTMLCanvasElement;
  const [off, setOff] = createSignal<'' | 'motion' | 'system' | 'device'>('');

  onMount(() => {
    const gl = document.createElement('canvas').getContext('webgl2');
    const tier = pickTier({
      webgl2: !!gl,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      motionOff: document.documentElement.dataset.motion === 'off',
      saveData: Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData),
      width: innerWidth,
      cores: navigator.hardwareConcurrency || 2,
    });
    if (tier === 'still') {
      // The still stays, but say why: a motionless castle should never look like a bug.
      setOff(document.documentElement.dataset.motion === 'off' ? (localStorage.getItem('nemeton:motion') === 'off' ? 'motion' : 'system') : 'device');
      return;
    }

    let disposed = false;
    let dispose: (() => void) | undefined;
    // Maps the scroll position to the descent: section i of n lands exactly on camera key i.
    const onScroll = (): void => {
      const secs = Array.from(document.querySelectorAll<HTMLElement>('.descent > section'));
      if (!world || secs.length < 2) return;
      const mid = scrollY + innerHeight / 2;
      const centers = secs.map((el) => el.offsetTop + el.offsetHeight / 2);
      let i = 0;
      while (i < centers.length - 2 && mid > centers[i + 1]!) i++;
      const span = centers[i + 1]! - centers[i]!;
      const frac = span > 0 ? Math.min(1, Math.max(0, (mid - centers[i]!) / span)) : 0;
      world.setProgress((i + frac) / (secs.length - 1));
    };
    let world: import('../world/engine').World | undefined;

    // requestIdleCallback keeps three.js parsing off the critical path (after LCP).
    const start = (): void => {
      import('../world/engine')
        .then(({ createWorld }) => {
          if (disposed) return;
          world = createWorld({ canvas, tier });
          dispose = () => world?.dispose();
          canvas.dataset.live = 'true';
          watchMotion(world);
          addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        })
        .catch(() => { /* any failure leaves the still in place */ });
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) idle(start); else setTimeout(start, 300);

    onCleanup(() => {
      disposed = true;
      removeEventListener('scroll', onScroll);
      dispose?.();
    });
  });

  return (
    <>
      <canvas ref={canvas} class="world" aria-hidden="true" />
      <Show when={off()}>
        <p class="mono still-note">
          3D IS OFF ({off() === 'motion' ? 'MOTION: OFF' : off() === 'system' ? 'YOUR SYSTEM ASKS FOR REDUCED MOTION' : 'THIS DEVICE HAS NO WEBGL2'}).
          <Show when={off() === 'motion'}> <button class="chip" type="button" onClick={() => { try { localStorage.setItem('nemeton:motion', 'on'); } catch {} location.reload(); }}>Turn 3D on</button></Show>
        </p>
      </Show>
    </>
  );
}
