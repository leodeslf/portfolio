import Worley from "./worley";
import { Vec2 } from '../../../js/vec.min';
import { canvasSide } from "../previewUtil";

const
  noiseData = [],
  noiseImage = new ImageData(canvasSide, canvasSide),
  skinImage = new Image(256, 1),
  spots = [
    [.15, .15], [.50, .15], [.85, .15],
    [.15, .50], [.50, .50], [.85, .50],
    [.15, .85], [.50, .85], [.85, .85]
  ];

let
  noiseContext,
  skinContext,
  skinData = [],
  initialized = false;

// Move each spot from its original position to make them look more natural.
for (let i = 0; i < 9; i++) {
  const randomVec = Vec2.random();
  randomVec.magnitude = .1;
  spots[i] = {
    pos: new Vec2(
      canvasSide * (randomVec.x + spots[i][0]),
      canvasSide * (randomVec.y + spots[i][1])
    )
  };
}

skinImage.onload = () => {
  skinContext.clearRect(0, 0, 256, 1);
  skinContext.drawImage(skinImage, 0, 0);
  skinData = skinContext.getImageData(0, 0, 256, 1).data;
  tryToInit();
}

let
  modeIndex = 1,
  needsFade,
  factor,
  shift;

// Run next available mode of worley noise.
function nextMode() {
  modeIndex++;
  if (modeIndex > 4) modeIndex = 0;
  // Set specific cfg. for each mode.
  switch (modeIndex) {
    case 0:
      needsFade = true; factor = 3; shift = 4;
      generateImageData(Worley.st);
      break;
    case 1:
      needsFade = false; factor = 4; shift = -22;
      generateImageData(Worley.nd);
      break;
    case 2:
      needsFade = false; factor = 3.4; shift = 5;
      generateImageData(Worley.ndMinusSt);
      break;
    case 3:
      needsFade = false; factor = 5; shift = 0;
      generateImageData(Worley.chebyshev);
      break;
    case 4:
      needsFade = false; factor = 40; shift = -2.4;
      generateImageData(Worley.manhattan);
      break;
    default: return;
  }
}

const index = (x, y) => y * canvasSide + x;

function generateImageData(mode) {
  for (let y = 0; y < canvasSide; y++) {
    for (let x = 0; x < canvasSide; x++) {
      noiseData[index(x, y)] = mode(spots, { x, y });
    }
  }
  printImage();
}

const
  colorRangeInverse = 1 / 255,
  fade = t => t * t * t * (t * (t * 6 - 15) + 10);

// Use distances as pixel colors.
function printImage() {
  for (let y = 0; y < canvasSide; y++) {
    for (let x = 0; x < canvasSide; x++) {
      let i = index(x, y);
      let value = (noiseData[i] + shift) * factor;
      if (needsFade) value = fade(value * colorRangeInverse) * 255;
      if (value < 0) value = 0;
      if (value > 255) value = 255;
      value = Math.trunc(value) * 4;
      i *= 4;
      noiseImage.data[i + 0] = skinData[value + 0];
      noiseImage.data[i + 1] = skinData[value + 1];
      noiseImage.data[i + 2] = skinData[value + 2];
      noiseImage.data[i + 3] = skinData[value + 3];
    }
  }
  noiseContext.clearRect(0, 0, canvasSide, canvasSide);
  noiseContext.putImageData(noiseImage, 0, 0);
}

function tryToInit() {
  if (!initialized && skinData.length) {
    initialized = true;
    nextMode();
  } else printImage();
}

function delegateNoiseContextTo(context) {
  noiseContext = context;
  tryToInit();
  context.canvas.addEventListener('mousedown', nextMode);
}

function delegateSkinContextTo(context) {
  skinContext = context;
  if (!skinImage.src) skinImage.src = './images/tfp-colors.png';
}

export { delegateNoiseContextTo, delegateSkinContextTo };
