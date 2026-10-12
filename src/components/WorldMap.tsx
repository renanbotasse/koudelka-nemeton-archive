import { For, Show, createSignal, onCleanup, onMount } from 'solid-js';
import { pickTier } from '../lib/capabilities';
import { ANCHORS, PINS } from '../world/anchors';
import type { Explorer, PinScreen } from '../world/explorer';

interface Room { id: string; name: string; layer: string; href: string; order: number; summary: string }

/**
 * The interactive monastery. Drag to orbit, wheel or pinch to zoom, press a pin (or its name in the list)
 * to fly to an area, and slide the cutaway down to slice the building open. Every area is also a plain
 * link in the list, so the 3D view is one route to the rooms and never the only one.
 */
export default function WorldMap(props: { rooms: Room[] }) {
  let canvas!: HTMLCanvasElement;
  const pinEls: Record<string, HTMLButtonElement | undefined> = {};
  const depth = Object.fromEntries(PINS.map((p) => [p.id, p.pos[1]]));
  let cutNow = 0;
  let activeNow: string | null = null;
  const [active, setActive] = createSignal<string | null>(null);
  const [live, setLive] = createSignal(false);
  const [cut, setCut] = createSignal(0);
  const [auto, setAuto] = createSignal(true);
  let ex: Explorer | undefined;
  const byId = (id: string | null): Room | undefined => props.rooms.find((r) => r.id === id);

  function pick(id: string | null): void { setActive(id); activeNow = id; ex?.focus(id); }

  onMount(() => {
    const tier = pickTier({
      webgl2: !!document.createElement('canvas').getContext('webgl2'),
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      motionOff: document.documentElement.dataset.motion === 'off',
      saveData: false, width: innerWidth, cores: navigator.hardwareConcurrency || 2,
    });
    if (tier === 'still') return;
    let disposed = false;
    // Moves each pin button to its projected screen position (written straight to the DOM, 30 times a second).
    const onFrame = (list: PinScreen[]): void => {
      for (const p of list) {
        const el = pinEls[p.id]; if (!el) continue;
        el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -100%)`;
        // Rooms under the ground would float over the grass, so they only show once the model is cut or they are selected.
        const deep = (depth[p.id] ?? 0) < 0 && cutNow < 0.3 && activeNow !== p.id;
        el.style.visibility = p.visible && !deep ? 'visible' : 'hidden';
      }
    };
    import('../world/explorer').then(({ createExplorer }) => {
      if (disposed) return;
      ex = createExplorer(canvas, PINS, onFrame, ANCHORS);
      setLive(true);
    }).catch((err) => { console.warn('3D explorer unavailable:', err); }); // the list below always works
    // Observes MOTION: OFF being switched on after load and pauses the render loop.
    const mo = new MutationObserver(() => ex?.setPaused(document.documentElement.dataset.motion === 'off'));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    onCleanup(() => { disposed = true; mo.disconnect(); ex?.dispose(); });
  });

  const room = (): Room | undefined => byId(active());

  return (
    <div class="explorer">
      <div class="mapwrap">
        <canvas ref={canvas} tabindex="0" aria-label="Interactive 3D model of the monastery. Arrow keys orbit, plus and minus zoom." />
        <Show when={live()}>
          <For each={props.rooms}>{(r) => (
            <button type="button" class="pin" classList={{ on: active() === r.id }} tabindex="-1" aria-hidden="true"
              ref={(el) => { pinEls[r.id] = el; }} onClick={() => pick(r.id)}>
              <span>{String(r.order).padStart(2, '0')}</span>
            </button>
          )}</For>
          <p class="mono map-hint">DRAG TO TURN · WHEEL TO ZOOM · DOUBLE-CLICK TO RESET</p>
        </Show>
        <Show when={!live()}><p class="mono" style="position:absolute;left:16px;top:12px;margin:0">NO SIGNAL FROM THE MODEL — use the list below.</p></Show>
      </div>

      <Show when={live()}>
        <div class="map-ctrl">
          <label class="mono">CUTAWAY
            <input type="range" min="0" max="1" step="0.02" value={cut()} aria-label="Cut the building open from the top"
              onInput={(e) => { const v = Number(e.currentTarget.value); setCut(v); cutNow = v; ex?.setCut(v); }} />
          </label>
          <button class="chip" type="button" onClick={() => { const a = !auto(); setAuto(a); ex?.setAuto(a); }}>{auto() ? 'Stop turning' : 'Turn slowly'}</button>
          <button class="chip" type="button" onClick={() => { setCut(0); cutNow = 0; ex?.setCut(0); setActive(null); activeNow = null; ex?.reset(); }}>Reset view</button>
        </div>
      </Show>

      <div class="map-panel" role="status" aria-live="polite">
        <Show when={room()} fallback={<p class="mono">SELECT A PIN OR AN AREA BELOW TO FLY THERE.</p>}>
          <p class="mono">AREA {String(room()!.order).padStart(2, '0')} · {room()!.layer.toUpperCase()}</p>
          <h3>{room()!.name}</h3>
          <p>{room()!.summary}</p>
          <p><a class="btn" href={room()!.href}>Open the walkthrough for this area</a></p>
        </Show>
      </div>

      <div class="chips" role="group" aria-label="Fly to an area">
        <For each={props.rooms}>{(r) => (
          <button class="chip" type="button" aria-pressed={active() === r.id} onClick={() => pick(r.id)}>{String(r.order).padStart(2, '0')} {r.name}</button>
        )}</For>
      </div>
    </div>
  );
}
