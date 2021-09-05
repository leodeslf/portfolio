import { Vec2 } from '../../../js/vec.min';
import { perlin3D } from './perlin';

let initialized = false;

// Canvas rendering context and cfg. vars.
let noiseCtx;
const side = 192;
const noiseData = [];
const noiseImg = new ImageData(side, side);
let skinCtx;
let skinData = [];
const skinImg = new Image(256, 1);
skinImg.onload = () => {
  skinCtx.clearRect(0, 0, 256, 1);
  skinCtx.drawImage(skinImg, 0, 0);
  skinData = skinCtx.getImageData(0, 0, 256, 1).data;
  tryToInit();
}
const RGBACenter = 127;
const PixelSize = 6; // Pixels per data.
const inverse = 1 / PixelSize;
const index = (x, y) => inverse * y * inverse * side + inverse * x;
const pixel = [0, 0, 0];

export const CFG = {
  // Animation.
  step: .01,
  seed: .0,
  // Noise.
  frequency: 1,
  amplitude: 1.8,
  octaves: 2,
  lacunarity: 2,
  persistence: .5,
  // View.
  traslation: new Vec2(),
  scale: 1 / side,
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
  if (!skinImg.src) skinImg.src = './images/tfp2-colors.png';
}

// Initialize only if noise context and skin data are both ready.
function tryToInit() {
  if (!initialized && (skinData.length && skinCtx)) {
    initialized = true;
    noise3D();
  }
}

function noise3D() {
  for (let y = 0; y < side; y += CFG.pixelSize) {
    for (let x = 0; x < side; x += CFG.pixelSize) {
      let n = 0;
      let freK = CFG.frequency;
      let ampK = CFG.amplitude;
      for (let k = 0; k < CFG.octaves; k++) {
        n += perlin3D(
          (CFG.u(x) + k) * freK,
          (CFG.v(y) + k) * freK,
          CFG.seed
        ) * ampK;
        freK *= CFG.lacunarity;
        ampK *= CFG.persistence;
      }
      // Take the integer and center the noise.
      noiseData[index(x, y)] = Math.trunc(n * RGBACenter + RGBACenter);
    }
  }
  CFG.seed += CFG.step;
  printFrame();
  requestAnimationFrame(noise3D);
}

function printFrame() {
  for (let y = 0; y < side; y += CFG.pixelSize) {
    for (let x = 0; x < side; x += CFG.pixelSize) {
      let value = noiseData[index(x, y)];
      // Read skin data a single time (RGBA).
      if (value < 0) value = 0;
      if (value > 255) value = 255;
      value *= 4;
      pixel[0] = skinData[value + 0];
      pixel[1] = skinData[value + 1];
      pixel[2] = skinData[value + 2];
      pixel[3] = skinData[value + 3];
      // Use skin data multiple times to fill the pixel size.
      for (let subY = 0; subY < CFG.pixelSize; subY++) {
        //if (y + subY >= side) break;
        for (let subX = 0; subX < CFG.pixelSize; subX++) {
          //if (x + subX >= side) break;
          const pixelIndex = ((y + subY) * side + x + subX) * 4;
          noiseImg.data[pixelIndex + 0] = pixel[0];
          noiseImg.data[pixelIndex + 1] = pixel[1];
          noiseImg.data[pixelIndex + 2] = pixel[2];
          noiseImg.data[pixelIndex + 3] = pixel[3];
        }
      }
    }
  }
  noiseCtx.clearRect(0, 0, side, side);
  noiseCtx.putImageData(noiseImg, 0, 0);
}
