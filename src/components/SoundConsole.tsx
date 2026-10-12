import { For, createSignal, onCleanup } from 'solid-js';
import { CHANNELS, PRESETS, mix, type Channel, type Levels, type Stratum } from '../lib/mixer';

const LABEL: Record<Channel, string> = { wind: 'Wind', bell: 'Bell', drone: 'Organ drone', drip: 'Water in stone' };
const STRATA: Stratum[] = ['cliff', 'gate', 'house', 'nave', 'cells', 'crypt'];

/**
 * Generative ambience made live with Web Audio: four channels, one preset per depth of the monastery.
 * It never autoplays. Zero audio files, so nothing of anyone else's is hosted.
 */
export default function SoundConsole() {
  const [on, setOn] = createSignal(false);
  const [stratum, setStratum] = createSignal<Stratum>('nave');
  const [faders, setFaders] = createSignal<Levels>({ wind: 1, bell: 1, drone: 1, drip: 1 });
  const supported = typeof window !== 'undefined' && 'AudioContext' in window;
  let ctx: AudioContext | undefined;
  const gains = {} as Record<Channel, GainNode>;
  const timers: number[] = [];

  /** Pushes the current mix to the gain nodes with a short ramp (no clicks). */
  function apply(): void {
    if (!ctx) return;
    const target = mix(PRESETS[stratum()], faders(), 0.6);
    for (const c of CHANNELS) gains[c].gain.setTargetAtTime(target[c], ctx.currentTime, 0.6);
  }

  function noiseBuffer(c: AudioContext): AudioBuffer {
    const buf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function start(): void {
    const c = new AudioContext();
    ctx = c;
    const master = c.createGain();
    master.gain.setValueAtTime(0, c.currentTime);
    master.gain.linearRampToValueAtTime(1, c.currentTime + 1.5); // gentle fade-in
    master.connect(c.destination);
    for (const ch of CHANNELS) { gains[ch] = c.createGain(); gains[ch].gain.value = 0; gains[ch].connect(master); }

    // Wind: looped noise through a slowly sweeping band-pass.
    const wind = c.createBufferSource(); wind.buffer = noiseBuffer(c); wind.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 380; bp.Q.value = 0.8;
    const lfo = c.createOscillator(); lfo.frequency.value = 0.08;
    const lfoAmt = c.createGain(); lfoAmt.gain.value = 220;
    lfo.connect(lfoAmt).connect(bp.frequency);
    wind.connect(bp).connect(gains.wind);
    wind.start(); lfo.start();

    // Organ drone: a low fifth with a slow beating detune, softened by a low-pass.
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600;
    lp.connect(gains.drone);
    for (const [f, g] of [[55, 0.5], [82.4, 0.3], [110.6, 0.18]] as const) {
      const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
      const og = c.createGain(); og.gain.value = g * 0.25;
      o.connect(og).connect(lp); o.start();
    }

    // Bell: three inharmonic partials, struck at irregular intervals.
    const ring = (): void => {
      if (!ctx) return;
      const t = ctx.currentTime;
      for (const [f, g] of [[220, 1], [330, 0.5], [557, 0.25]] as const) {
        const o = ctx.createOscillator(); const e = ctx.createGain();
        o.frequency.value = f;
        e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(g * 0.3, t + 0.02); e.gain.exponentialRampToValueAtTime(0.0001, t + 6);
        o.connect(e).connect(gains.bell); o.start(t); o.stop(t + 6.2);
      }
      timers.push(window.setTimeout(ring, 9000 + Math.random() * 9000));
    };
    timers.push(window.setTimeout(ring, 2500));

    // Water in stone: short high blips with a falling pitch.
    const drip = (): void => {
      if (!ctx) return;
      const t = ctx.currentTime;
      const o = ctx.createOscillator(); const e = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(1400 + Math.random() * 600, t); o.frequency.exponentialRampToValueAtTime(500, t + 0.12);
      e.gain.setValueAtTime(0.25, t); e.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.connect(e).connect(gains.drip); o.start(t); o.stop(t + 0.3);
      timers.push(window.setTimeout(drip, 700 + Math.random() * 2600));
    };
    timers.push(window.setTimeout(drip, 1200));

    setOn(true);
    apply();
  }

  function stop(): void {
    timers.splice(0).forEach((t) => clearTimeout(t));
    void ctx?.close();
    ctx = undefined;
    setOn(false);
  }

  onCleanup(stop); // releases the AudioContext and timers when the island is destroyed

  if (!supported) return <div class="sheet"><p class="mono">SOUND UNAVAILABLE</p></div>;

  return (
    <div class="sheet" role="group" aria-label="Sound of this site">
      <p class="mono">THE SOUND OF THIS SITE · MADE LIVE · NO AUDIO FILES</p>
      <button class="btn" type="button" onClick={() => (on() ? stop() : start())}>
        {on() ? 'Turn the sound off' : 'Turn on the sound'}
      </button>
      <fieldset class="mixer">
        <legend class="mono">DEPTH</legend>
        <div class="chips">
          <For each={STRATA}>{(s) => (
            <button class="chip" type="button" aria-pressed={stratum() === s} onClick={() => { setStratum(s); apply(); }}>{s}</button>
          )}</For>
        </div>
      </fieldset>
      <fieldset class="mixer">
        <legend class="mono">CHANNELS</legend>
        <For each={[...CHANNELS]}>{(ch) => (
          <label class="fader mono">
            <span>{LABEL[ch]}</span>
            <input type="range" min="0" max="1" step="0.05" value={faders()[ch]}
              onInput={(e) => { const v = Number(e.currentTarget.value); setFaders({ ...faders(), [ch]: v }); apply(); }} />
          </label>
        )}</For>
      </fieldset>
    </div>
  );
}
