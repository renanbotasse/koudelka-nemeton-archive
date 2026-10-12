import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import { STAGE_LABELS } from '../world/case-labels';

/**
 * The four-disc case, turnable in 3D. The flat front cover is the baseline; the 3D case replaces it
 * only when WebGL and motion are available.
 */
export default function CaseViewer() {
  let canvas!: HTMLCanvasElement;
  const [live, setLive] = createSignal(false);
  const [stage, setStage] = createSignal(0);
  let world: import('../world/case').CaseWorld | undefined;

  onMount(() => {
    const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.dataset.motion !== 'off';
    if (!motionOk || !document.createElement('canvas').getContext('webgl2')) return;
    let disposed = false;
    // The fonts drawn onto the spine must be loaded first, or the canvas falls back to a default face.
    const fonts = Promise.all([document.fonts.load("700 30px 'Cinzel Decorative'")]).catch(() => undefined);
    Promise.all([import('../world/case'), fonts]).then(([{ createCase }]) => {
      if (disposed) return;
      world = createCase(canvas, { base: '/images/case' }, setStage);
      setLive(true);
    }).catch(() => {});
    onCleanup(() => { disposed = true; world?.dispose(); });
  });

  return (
    <figure class="case-viewer">
      <div class="case-stage">
        <Show when={!live()}>
          <img src="/images/case/front.jpg" alt="The front cover of the four-disc case" width="742" height="639" />
        </Show>
        <canvas ref={canvas} classList={{ 'case-canvas': true, 'is-live': live() }} width="400" height="300" tabindex="0"
          aria-label="Three-dimensional four-disc case. Drag or use the arrow keys to turn it; press space to turn a page." />
      </div>
      <Show when={live()}>
        <div class="case-controls">
          <button class="btn btn--sm btn--ghost" type="button" disabled={stage() < 2} onClick={() => world?.go(-1)}>‹ Previous</button>
          <button class="btn btn--sm btn--ghost" type="button" disabled={stage() === 0 || stage() === 3} onClick={() => world?.go(1)}>Next ›</button>
          <span class="case-sep" aria-hidden="true" />
          <button class="btn btn--sm" type="button" onClick={() => world?.go(stage() === 0 ? 1 : -stage())}>{stage() === 0 ? 'Open' : 'Close'}</button>
          <button class="btn btn--sm btn--ghost" type="button" onClick={() => world?.turnOver()}>Flip</button>
        </div>
        <figcaption aria-live="polite">{STAGE_LABELS[stage()]}</figcaption>
      </Show>
    </figure>
  );
}
