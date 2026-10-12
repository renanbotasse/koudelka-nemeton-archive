export type Channel = 'wind' | 'bell' | 'drone' | 'drip';
export type Levels = Record<Channel, number>;
export type Stratum = 'cliff' | 'gate' | 'house' | 'nave' | 'cells' | 'crypt';

export const CHANNELS: readonly Channel[] = ['wind', 'bell', 'drone', 'drip'];

/** Each depth of the descent has its own air (TASKS §0.12). Values are 0..1 mix levels. */
export const PRESETS: Record<Stratum, Levels> = {
  cliff: { wind: 0.9, bell: 0.1, drone: 0, drip: 0 },
  gate: { wind: 0.7, bell: 0.5, drone: 0.1, drip: 0 },
  house: { wind: 0.3, bell: 0.2, drone: 0.5, drip: 0 },
  nave: { wind: 0.2, bell: 0.6, drone: 0.8, drip: 0 },
  cells: { wind: 0.1, bell: 0, drone: 0.3, drip: 0.8 },
  crypt: { wind: 0, bell: 0, drone: 0.15, drip: 0.3 },
};

const clamp01 = (v: number): number => (Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0);

/** Effective gain per channel: preset × the visitor's own fader × master. Never above 1. */
export function mix(preset: Levels, faders: Levels, master: number): Levels {
  const m = clamp01(master);
  return Object.fromEntries(CHANNELS.map((c) => [c, clamp01(preset[c] * clamp01(faders[c]) * m)])) as Levels;
}

/** Linear step toward a target, so preset changes glide instead of jumping (dt in seconds). */
export function approach(current: number, target: number, dt: number, perSecond = 0.5): number {
  const step = perSecond * Math.max(0, dt);
  return Math.abs(target - current) <= step ? target : current + Math.sign(target - current) * step;
}
