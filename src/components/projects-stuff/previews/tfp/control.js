import WOLREY from "./worley";
import { canvasH, canvasW } from "../preview-util/util";
import { Vec2 } from '../../../../js/vec.min';

let initialized = false;

// Canvas context and cfg. vars.
let noiseCtx;
const noiseData = [];
const noiseImg = new ImageData(canvasW, canvasH);
const spots = [
  [4, -30], [94, -12], [-10, -5], [39, 34], [-15, 88],
  [-2, 140], [94, 128], [35, 85], [85, 72], [138, 18],
  [137, 71], [175, 131], [192, 62], [210, 1], [202, 103]
];
const spotsN = spots.length;
for (let i = 0; i < spotsN; i++) {
  spots[i] = {
    pos: new Vec2(spots[i][0], spots[i][1])
  }
}

/**
 * Initialize process, define context from the
 * given canvas and start generating and printing data.
 */
export function initControl(tfpCanvas) {
  noiseCtx = tfpCanvas.getContext('2d');
  tfpCanvas.addEventListener('mousedown', nextMode);
  if (!initialized) {
    initialized = true;
    nextMode();
  } else printImage();
}

let modeIndex = -1;
let toFade, factor, shift;

// Run next available mode of worley noise.
function nextMode() {
  modeIndex++;
  if (modeIndex > 4) modeIndex = 0;
  // Set specific cfg. for each mode.
  switch (modeIndex) {
    case 0:
      toFade = true; factor = 3; shift = 0;
      generateImageData(WOLREY.st);
      break;
    case 1:
      toFade = false; factor = 4; shift = -15;
      generateImageData(WOLREY.nd);
      break;
    case 2:
      toFade = false; factor = 3.6; shift = 0;
      generateImageData(WOLREY.ndMinusSt);
      break;
    case 3:
      toFade = false; factor = 5; shift = -2;
      generateImageData(WOLREY.chebyshev);
      break;
    case 4:
      toFade = false; factor = 30; shift = -2.4;
      generateImageData(WOLREY.manhattan);
      break;
    default: return;
  }
}

// Util. to generate data.
const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const index = (x, y) => y * canvasW + x;

function generateImageData(mode) {
  for (let y = 0; y < canvasH; y++) {
    for (let x = 0; x < canvasW; x++) {
      noiseData[index(x, y)] = mode(spots, { x, y });
    }
  }
  printImage();
}

// Output cfg.
const colorRange = 255;
const colorRangeInverse = 1 / colorRange;

// Use distances as pixel colors.
function printImage() {
  for (let y = 0; y < canvasH; y++) {
    for (let x = 0; x < canvasW; x++) {
      const i = index(x, y);
      let value = (noiseData[i] + shift) * factor;
      if (toFade) value = fade(value * colorRangeInverse) * colorRange;
      if (value > colorRange) value = colorRange;
      else if (value < 0) value = 0;
      noiseImg.data[i * 4 + 0] = value;
      noiseImg.data[i * 4 + 1] = value;
      noiseImg.data[i * 4 + 2] = value;
      noiseImg.data[i * 4 + 3] = 255;
    }
  }
  noiseCtx.clearRect(0, 0, canvasW, canvasH);
  noiseCtx.putImageData(noiseImg, 0, 0);
}
