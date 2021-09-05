import WOLREY from "./worley";
import { Vec2 } from '../../../js/vec.min';

let initialized = false;

// Canvas context and cfg. vars.
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
const spots = [
  [29, 45],
  [96, 22],
  [20, 108],
  [74, 76],
  [138, 55],
  [185, 3],
  [25, 163],
  [110, 128],
  [166, 102],
  [86, 170],
  [166, 157]
];
const spotsN = spots.length;
for (let i = 0; i < spotsN; i++) {
  spots[i] = {
    pos: new Vec2(spots[i][0], spots[i][1])
  }
}

// Init noise canvas context.
export function delegateNoiseCtxTo(ctx) {
  noiseCtx = ctx;
  tryToInit();
  ctx.canvas.addEventListener('mousedown', nextMode);
}

// Init skin canvas context.
export function delegateSkinCtxTo(ctx) {
  skinCtx = ctx;
  if (!skinImg.src) skinImg.src = './images/tfp-colors.png';
}

// Initialize only if noise context and skin data are both ready.
function tryToInit() {
  if (!initialized && skinData.length) {
    initialized = true;
    nextMode();
  } else printImage();
}

let modeIndex = 1;
let toFade, factor, shift;

// Run next available mode of worley noise.
function nextMode() {
  modeIndex++;
  if (modeIndex > 4) modeIndex = 0;
  // Set specific cfg. for each mode.
  switch (modeIndex) {
    case 0:
      toFade = true; factor = 3; shift = 4;
      generateImageData(WOLREY.st);
      break;
    case 1:
      toFade = false; factor = 4; shift = -22;
      generateImageData(WOLREY.nd);
      break;
    case 2:
      toFade = false; factor = 3; shift = 12;
      generateImageData(WOLREY.ndMinusSt);
      break;
    case 3:
      toFade = false; factor = 5; shift = 0;
      generateImageData(WOLREY.chebyshev);
      break;
    case 4:
      toFade = false; factor = 40; shift = -2.4;
      generateImageData(WOLREY.manhattan);
      break;
    default: return;
  }
}

// Util. to generate data.
const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const index = (x, y) => y * side + x;

function generateImageData(mode) {
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      noiseData[index(x, y)] = mode(spots, { x, y });
    }
  }
  printImage();
}

// Output cfg.
const colorRangeInverse = 1 / 255;

// Use distances as pixel colors.
function printImage() {
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      let i = index(x, y);
      let value = (noiseData[i] + shift) * factor;
      if (toFade) value = fade(value * colorRangeInverse) * 255;
      if (value < 0) value = 0;
      if (value > 255) value = 255;
      value = Math.trunc(value) * 4;
      i *= 4;
      noiseImg.data[i + 0] = skinData[value + 0];
      noiseImg.data[i + 1] = skinData[value + 1];
      noiseImg.data[i + 2] = skinData[value + 2];
      noiseImg.data[i + 3] = skinData[value + 3];
    }
  }
  noiseCtx.clearRect(0, 0, side, side);
  noiseCtx.putImageData(noiseImg, 0, 0);
}
