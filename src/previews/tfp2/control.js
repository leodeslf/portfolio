import { Vec2 } from '../../js/vec.min';
import PERLIN_3D from './perlin.min';

// Pixels per data.
const PPD = 5;
// Inverse mult. of pixels per data.
const invMultPPD = 1 / PPD;
const index = (x, y) => y * invMultPPD * noiseW * invMultPPD + x * invMultPPD;
const trunc = Math.trunc;
const colorRange = 255;
const halfColorRange = 127;

const zoomRatio = 1.5;
const pixel = [0, 0, 0, 0];

let noiseCtx = undefined;
let noiseData = [];
const noiseW = 175;
const noiseH = 85;
const noiseImg = new ImageData(noiseW, noiseH);

let skinCtx = undefined;
let skinData = [];
const skinW = 256;
const skinH = 1;
const skinImg = new Image(skinW, skinH);
skinImg.onload = () => {
  skinCtx.clearRect(0, 0, skinW, skinH);
  skinCtx.drawImage(skinImg, 0, 0);
  skinData = skinCtx.getImageData(0, 0, skinW, skinH).data;
}

export const CFG = {
  /* Animation */
  step: 0.01,
  seed: 0.0,
  /* Noise */
  frequency: 1.0,
  amplitude: 2.0,
  octaves: 2,
  lacunarity: 2.0,
  persistence: 0.5,
  /* View */
  traslation: new Vec2(0, 0),
  scale: 1 / noiseW * zoomRatio,
  /* Pixels per data */
  ppd: PPD,
  u(x) { return (x + this.traslation.x) * this.scale; },
  v(y) { return (y + this.traslation.y) * this.scale; },
};

// Init noise canvas context.
export function delegateNoiseCtxTo(ctx) {
  noiseCtx = ctx;
  noise3D();
}

// Init skin canvas context.
export function delegateSkinCtxTo(ctx) {
  skinCtx = ctx;
  skinImg.src = './images/skin-tfp2.png';
}

function printFrame() {
  for (let y = 0; y < noiseH; y += CFG.ppd) {
    for (let x = 0; x < noiseW; x += CFG.ppd) {
      let value = noiseData[index(x, y)];
      if (value > colorRange) value = colorRange;
      if (value < 0) value = 0;
      pixel[0] = skinData[value * 4 + 0];
      pixel[1] = skinData[value * 4 + 1];
      pixel[2] = skinData[value * 4 + 2];
      pixel[3] = skinData[value * 4 + 3];
      // Loop through sub-square and fill it.
      for (let subY = 0; subY < CFG.ppd; subY++) {
        if (y + subY >= noiseH) break;
        for (let subX = 0; subX < CFG.ppd; subX++) {
          if (x + subX >= noiseW) break;
          const pixelIndex = (y + subY) * (noiseW) + (x + subX);
          noiseImg.data[pixelIndex * 4 + 0] = pixel[0];
          noiseImg.data[pixelIndex * 4 + 1] = pixel[1];
          noiseImg.data[pixelIndex * 4 + 2] = pixel[2];
          noiseImg.data[pixelIndex * 4 + 3] = pixel[3];
        }
      }
    }
  }
  noiseCtx.clearRect(0, 0, noiseW, noiseH);
  noiseCtx.putImageData(noiseImg, 0, 0);
}

function noise3D() {
  for (let y = 0; y < noiseH; y += CFG.ppd) {
    for (let x = 0; x < noiseW; x += CFG.ppd) {
      const U = CFG.u(x);
      const V = CFG.v(y);
      let n = 0;
      let freK = CFG.frequency;
      let ampK = CFG.amplitude;
      for (let k = 0; k < CFG.octaves; k++) {
        n += PERLIN_3D(
          (U + k) * freK,
          (V + k) * freK,
          CFG.seed) * ampK;
        freK *= CFG.lacunarity;
        ampK *= CFG.persistence;
      }
      // Take the integer and center the noise at 128.
      noiseData[index(x, y)] = trunc(n * halfColorRange + halfColorRange);
    }
  }
  printFrame();
  CFG.seed += CFG.step;
  requestAnimationFrame(noise3D);
}
