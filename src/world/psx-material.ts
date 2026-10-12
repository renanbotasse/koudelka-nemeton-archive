import * as THREE from 'three';

export interface PsxOptions {
  /** Internal render size; drives the vertex-snap grid and the dither. */
  resolution: THREE.Vector2;
  fogColor: THREE.Color;
  fogNear: number;
  fogFar: number;
  /** 0 = clean render, 1 = full PS1. Scales snap, affine warp and dither together. */
  psx: number;
  map?: THREE.Texture;
}

const vertexShader = /* glsl */ `
uniform vec2 uResolution;
uniform float uPsx;
uniform float uFogNear;
uniform float uFogFar;
uniform vec3 uLightDir;
varying float vY;
varying vec3 vColor;
varying vec3 vUvW;   // uv * w, for affine mapping
varying vec2 vUv;
varying float vW;
varying float vFog;

void main() {
  vY = (modelMatrix * vec4(position, 1.0)).y; // world height, for the cutaway
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec4 clip = projectionMatrix * mv;

  // Vertex snapping: quantise screen position to the virtual pixel grid.
  // This is the "wobble" of 1990s hardware; uPsx blends it in from nothing.
  vec2 grid = uResolution * 0.5;
  vec2 ndc = clip.xy / clip.w;
  vec2 snapped = floor(ndc * grid + 0.5) / grid;
  clip.xy = mix(ndc, snapped, uPsx) * clip.w;
  gl_Position = clip;

  // Per-vertex (Gouraud) lighting: the faceted look with soft shading across faces.
  vec3 n = normalize(normalMatrix * normal);
  float diff = max(dot(n, normalize(uLightDir)), 0.0);
  vColor = color * (0.62 + 0.95 * diff);

  // Affine texture mapping: interpolating uv*w and w separately and dividing in
  // the fragment shader recovers screen-linear (affine) uv from the hardware's
  // perspective-correct interpolation.
  vUv = uv;
  vUvW = vec3(uv * clip.w, 0.0);
  vW = clip.w;

  float dist = length(mv.xyz);
  vFog = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D uMap;
uniform float uHasMap;
uniform float uPsx;
uniform vec3 uFogColor;
uniform float uClipY;
varying float vY;
varying vec3 vColor;
varying vec3 vUvW;
varying vec2 vUv;
varying float vW;
varying float vFog;

// 4x4 ordered (Bayer) dither threshold in [0,1).
float bayer4(vec2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  float m[16] = float[16](0., 8., 2., 10., 12., 4., 14., 6., 3., 11., 1., 9., 15., 7., 13., 5.);
  return m[i] / 16.0;
}

void main() {
  if (vY > uClipY) discard; // cutaway: everything above this height is sliced off
  vec2 affine = vUvW.xy / vW;
  vec2 uv = mix(vUv, affine, uPsx);
  vec3 base = vColor;
  if (uHasMap > 0.5) base *= texture2D(uMap, uv).rgb * 1.5;
  vec3 col = mix(base, uFogColor, vFog);

  // 15-bit colour (5 bits per channel) with ordered dither, blended by uPsx.
  float t = (bayer4(gl_FragCoord.xy) - 0.5) / 31.0;
  vec3 q = floor(clamp(col + t, 0.0, 1.0) * 31.0 + 0.5) / 31.0;
  gl_FragColor = vec4(mix(col, q, uPsx), 1.0);
}
`;

/** ShaderMaterial implementing the PS1 look. All effects scale with `psx`. */
export function createPsxMaterial(o: PsxOptions): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    vertexColors: true,
    uniforms: {
      uResolution: { value: o.resolution },
      uPsx: { value: o.psx },
      uClipY: { value: 1e4 },
      uFogColor: { value: o.fogColor },
      uFogNear: { value: o.fogNear },
      uFogFar: { value: o.fogFar },
      uLightDir: { value: new THREE.Vector3(-0.4, 0.8, 0.5) },
      uMap: { value: o.map ?? null },
      uHasMap: { value: o.map ? 1 : 0 },
    },
  });
}
