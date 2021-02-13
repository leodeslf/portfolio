import { PERLIN_3D } from '../../js/perlin.min.js';

// Utils.
const INDEX = (x, y) => y * iMPPD * NOISE_CAN_W * iMPPD + x * iMPPD;
const TRUNC = Math.trunc;
const NOISE_CAN_W = 200;
const NOISE_CAN_H = 100;
const COLOR_RANGE = 255;
const HALF_COLOR_RANGE = 127;
const INIT_ZOOM = 4;
const PIXEL = [0, 0, 0, 0];
// Inverse mult. of pixels per data.
let iMPPD = 1;

// Canvas contexts and data holders.
let noiseCtx = undefined;
let noiseData = [];
const NOISE_IMG = new ImageData(NOISE_CAN_W, NOISE_CAN_H);

// General configuration.
export const CFG = {
  /* Animation */
  step: 0.015,
  seed: 0.0,
  /* Noise */
  frequency: 1.0,
  amplitude: 1.25,
  octaves: 1,
  lacunarity: 2.0,
  persistence: 0.5,
  /* View */
  traslationX: 0,
  traslationY: 0,
  scaleW: 1 / 200 * INIT_ZOOM,
  scaleH: 1 / 200 * INIT_ZOOM,
  /* Pixels per data */
  ppd: 2,
  u(x) { return (x + this.traslationX) * this.scaleW; },
  v(y) { return (y + this.traslationY) * this.scaleH; }
};

// Init noise canvas context.
export function delegateNoiseCtxTo(ctx) {
  noiseCtx = ctx;
  resetLoop();
}

function resetLoop() {
  _3D();
}

// Print used for 2 or 3D.
function printFrame() {
  for (let y = 0; y < NOISE_CAN_H; y += CFG.ppd) {
    for (let x = 0; x < NOISE_CAN_W; x += CFG.ppd) {
      // Make it integer and clamp between 0 and 255
      let value = noiseData[INDEX(x, y)];
      if (value > COLOR_RANGE) value = COLOR_RANGE;
      if (value < 0) value = 0;
      PIXEL[0] = value;
      PIXEL[1] = value;
      PIXEL[2] = value;
      PIXEL[3] = 64 + value;
      // Loop through sub square (all the same color).
      for (let subY = 0; subY < CFG.ppd; subY++) {
        // Boudary control Y.
        if (y + subY >= NOISE_CAN_H) break;
        for (let subX = 0; subX < CFG.ppd; subX++) {
          // Boudary control X.
          if (x + subX >= NOISE_CAN_W) break;
          const PIXEL_INDEX = (y + subY) * (NOISE_CAN_W) + (x + subX);
          NOISE_IMG.data[PIXEL_INDEX * 4 + 0] = PIXEL[0];
          NOISE_IMG.data[PIXEL_INDEX * 4 + 1] = PIXEL[1];
          NOISE_IMG.data[PIXEL_INDEX * 4 + 2] = PIXEL[2];
          NOISE_IMG.data[PIXEL_INDEX * 4 + 3] = PIXEL[3];
        }
      }
    }
  }
  noiseCtx.clearRect(0, 0, NOISE_CAN_W, NOISE_CAN_H);
  noiseCtx.putImageData(NOISE_IMG, 0, 0);
}

function _3D() {
  for (let y = 0; y < NOISE_CAN_H; y += CFG.ppd) {
    for (let x = 0; x < NOISE_CAN_W; x += CFG.ppd) {
      const U = CFG.u(x), V = CFG.v(y);
      let n = 0, freK = CFG.frequency, ampK = CFG.amplitude;
      for (let k = 0; k < CFG.octaves; k++) {
        n += PERLIN_3D(
          (U + k) * freK,
          (V + k) * freK,
          CFG.seed) * ampK;
        freK *= CFG.lacunarity;
        ampK *= CFG.persistence;
      }
      noiseData[INDEX(x, y)] = TRUNC(n * HALF_COLOR_RANGE + HALF_COLOR_RANGE);
    }
  }
  printFrame();
  CFG.seed += CFG.step;
  requestAnimationFrame(_3D);
}
