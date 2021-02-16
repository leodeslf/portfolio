import WorleySpotSystem from "./worleySpots";
import worleyNdMinusSt from "./worley";

const index = (x, y) => y * noiseW + x;
const trunc = Math.trunc;
const colorRange = 255;

let noiseCtx = undefined;
const noiseData = [];
const noiseW = 200;
const noiseH = 100;
const noiseImg = new ImageData(noiseW, noiseH);

const factor = 3;
let spotsSystem = [];

// Init noise canvas context.
export function delegateNoiseCtxTo(ctx) {
  noiseCtx = ctx;
  initSpots();
  ndMinusSt();
}

function initSpots() {
  spotsSystem = new WorleySpotSystem(noiseW, noiseH, 6);
}

function ndMinusSt() {
  for (let y = 0; y < noiseH; y++) {
    for (let x = 0; x < noiseW; x++) {
      noiseData[index(x, y)] = trunc(worleyNdMinusSt(
        spotsSystem.spots, { x, y }
      ));
    }
  }
  printFrame();
  spotsSystem.update();
  requestAnimationFrame(ndMinusSt);
}

function printFrame() {
  for (let y = 0; y < noiseH; y++) {
    for (let x = 0; x < noiseW; x++) {
      const i = index(x, y);
      let value = noiseData[i] * factor;
      if (value > colorRange) value = colorRange;
      if (value < 0) value = 0;
      noiseImg.data[i * 4 + 0] = value;
      noiseImg.data[i * 4 + 1] = value;
      noiseImg.data[i * 4 + 2] = value;
      noiseImg.data[i * 4 + 3] = 255;
    }
  }
  noiseCtx.clearRect(0, 0, noiseW, noiseH);
  noiseCtx.putImageData(noiseImg, 0, 0);
}
