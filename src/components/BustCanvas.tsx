import { onCleanup, onMount } from 'solid-js';

/**
 * A live, slowly turning low-poly bust. The pre-rendered still (an <img> beside it) is always the
 * baseline; this only upgrades it when WebGL and motion are available.
 */
export default function BustCanvas(props: { slug: string }) {
  let canvas!: HTMLCanvasElement;
  onMount(() => {
    const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.dataset.motion !== 'off';
    if (!motionOk || !document.createElement('canvas').getContext('webgl2')) return;
    let disposed = false;
    let world: import('../world/bust').BustWorld | undefined;
    const mo = new MutationObserver(() => world?.setPaused(document.documentElement.dataset.motion === 'off'));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    import('../world/bust').then(({ createBust }) => {
      if (disposed) return;
      world = createBust(canvas, props.slug);
      canvas.dataset.live = 'true';
    }).catch(() => {});
    onCleanup(() => { disposed = true; mo.disconnect(); world?.dispose(); });
  });
  return <canvas ref={canvas} class="bust-live" width="160" height="200" aria-hidden="true" />;
}
