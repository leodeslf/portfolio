import { Vec2 } from '../preview-util/vec.min';
import { canvasH, canvasW } from '../preview-util/util';
import PERLIN_3D from './perlin.min';

let initialized = false;

// Canvas rendering context and cfg. vars.
let noiseCtx;
let noiseData = [];
const noiseImg = new ImageData(canvasW, canvasH);
let skinCtx;
let skinData = [];
const skinImg = new Image(256, 1);
skinImg.onload = () => {
  skinCtx.clearRect(0, 0, 256, 1);
  skinCtx.drawImage(skinImg, 0, 0);
  skinData = skinCtx.getImageData(0, 0, 256, 1).data;
  tryToInit();
}
const RGBA = 255;
const RGBACenter = 127;
const PixelSize = 5; // Pixels per data.
const inversePixelSize = 1 / PixelSize;
const index = (x, y) =>
  Math.trunc(inversePixelSize * y *
    inversePixelSize * canvasW +
    inversePixelSize * x);
const pixel = [0, 0, 0, 0];

export const CFG = {
  // Animation.
  step: 0.01,
  seed: 0.0,
  // Noise.
  frequency: 1.0,
  amplitude: 2.0,
  octaves: 2,
  lacunarity: 2.0,
  persistence: 0.5,
  // View.
  traslation: new Vec2(),
  scale: 1 / canvasW * 1.5,
  pixelSize: PixelSize,
  u(x) { return (x + this.traslation.x) * this.scale; },
  v(y) { return (y + this.traslation.y) * this.scale; },
};

// Init noise canvas context.
export function delegateNoiseCtxTo(ctx) {
  noiseCtx = ctx;
  tryToInit();
}

// Init skin canvas context.
export function delegateSkinCtxTo(ctx) {
  skinCtx = ctx;
  if (!skinImg.src) skinImg.src = './images/skin-tfp2.png';
}

// Initialize only if noise context and skin data are both ready.
function tryToInit() {
  if (!initialized && (skinData.length && skinCtx)) {
    initialized = true;
    noise3D();
  }
}

function noise3D() {
  for (let y = 0; y < canvasH; y += CFG.pixelSize) {
    for (let x = 0; x < canvasW; x += CFG.pixelSize) {
      const U = CFG.u(x);
      const V = CFG.v(y);
      let n = 0;
      let freK = CFG.frequency;
      let ampK = CFG.amplitude;
      for (let k = 0; k < CFG.octaves; k++) {
        n += PERLIN_3D((U + k) * freK, (V + k) * freK, CFG.seed) * ampK;
        freK *= CFG.lacunarity;
        ampK *= CFG.persistence;
      }
      // Take the integer and center the noise.
      noiseData[index(x, y)] = Math.trunc(n * RGBACenter + RGBACenter);
    }
  }
  printFrame();
  CFG.seed += CFG.step;
  requestAnimationFrame(noise3D);
}

function printFrame() {
  for (let y = 0; y < canvasH; y += CFG.pixelSize) {
    for (let x = 0; x < canvasW; x += CFG.pixelSize) {
      let value = noiseData[index(x, y)];
      if (value > RGBA) value = RGBA;
      if (value < 0) value = 0;
      // Read skin data a single time (RGBA).
      pixel[0] = skinData[value * 4 + 0];
      pixel[1] = skinData[value * 4 + 1];
      pixel[2] = skinData[value * 4 + 2];
      pixel[3] = skinData[value * 4 + 3];
      // Use skin data multiple times to fill the pixel size.
      for (let subY = 0; subY < CFG.pixelSize; subY++) {
        if (y + subY >= canvasH) break;
        for (let subX = 0; subX < CFG.pixelSize; subX++) {
          if (x + subX >= canvasW) break;
          const pixelIndex = (y + subY) * (canvasW) + (x + subX);
          noiseImg.data[pixelIndex * 4 + 0] = pixel[0];
          noiseImg.data[pixelIndex * 4 + 1] = pixel[1];
          noiseImg.data[pixelIndex * 4 + 2] = pixel[2];
          noiseImg.data[pixelIndex * 4 + 3] = pixel[3];
        }
      }
    }
  }
  noiseCtx.clearRect(0, 0, canvasW, canvasH);
  noiseCtx.putImageData(noiseImg, 0, 0);
}
