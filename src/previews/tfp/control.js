import WorleySpotSystem from "./worleySpots";
import WOLREY from "./worley";

let noiseCtx = undefined;
const colorRange = 255;
const side = 200;
const noiseData = [];
const noiseImg = new ImageData(side, side);

let spotsSystem = [];
const spots = [[156, 198], [191, 56], [147, 14], [199, 158], [55, 178],
[4, 50], [86, 15], [0, 144], [175, 95], [8, 198], [68, 128], [32, 7],
[77, 63], [101, 196], [33, 91], [117, 82], [127, 132]];

const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
const index = (x, y) => y * side + x;

let modeIndex = -1;
let toFade, factor, shift;

function generateImageData(mode) {
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      noiseData[index(x, y)] = mode(spotsSystem.spots, { x, y });
    }
  }
  printImage();
}

function printImage() {
  noiseCtx.clearRect(0, 0, side, side);

  // Convert distances into pixel color values.
  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      const i = index(x, y);
      let value = (noiseData[i] + shift) * factor;
      if (toFade) value = fade(value / colorRange) * colorRange;
      if (value > colorRange) value = colorRange;
      else if (value < 0) value = 0;
      noiseImg.data[i * 4 + 0] = value;
      noiseImg.data[i * 4 + 1] = value;
      noiseImg.data[i * 4 + 2] = value;
      noiseImg.data[i * 4 + 3] = 255;
    }
  }

  noiseCtx.putImageData(noiseImg, 0, 0);
}

export function initControl(tfpCanvas) {
  noiseCtx = tfpCanvas.getContext('2d');

  spotsSystem = new WorleySpotSystem(side, side, spots);
  runNextMode();

  tfpCanvas.addEventListener('mousedown', runNextMode);
}

function runNextMode() {
  modeIndex++;
  if (modeIndex > 4) modeIndex = 0;
  switch (modeIndex) {
    case 0:
      toFade = true; factor = 4.4; shift = 0;
      generateImageData(WOLREY.st);
      break;
    case 1:
      toFade = false; factor = 6.6; shift = -22;
      generateImageData(WOLREY.nd);
      break;
    case 2:
      toFade = false; factor = 4.5; shift = 0;
      generateImageData(WOLREY.ndMinusSt);
      break;
    case 3:
      toFade = false; factor = 7.2; shift = -2;
      generateImageData(WOLREY.chebyshev);
      break;
    case 4:
      toFade = false; factor = 48; shift = -2;
      generateImageData(WOLREY.manhattan);
      break;
    case 5:
      toFade = true; factor = 4.65; shift = 0;
      generateImageData(WOLREY.minkowski);
      break;
    default: return;
  }
}
