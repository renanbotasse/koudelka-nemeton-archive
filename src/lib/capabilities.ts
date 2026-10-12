/** How much of the 3D world a device should get. */
export type WorldTier = 'full' | 'lite' | 'still';

export interface DeviceInfo {
  webgl2: boolean;
  reducedMotion: boolean;
  motionOff: boolean;
  saveData: boolean;
  width: number;
  cores: number;
}

/**
 * Decides the world tier from device facts. Pure so every branch is testable.
 * Weak or opted-out devices get the pre-rendered still: the page never depends on WebGL.
 */
export function pickTier(d: DeviceInfo): WorldTier {
  if (!d.webgl2 || d.reducedMotion || d.motionOff || d.saveData) return 'still';
  if (d.width < 768 || d.cores < 4) return 'lite';
  return 'full';
}
