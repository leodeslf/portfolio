import { Vec2 } from '../../../js/vec.min';
import { canvasSide } from '../previewUtil';
import perlin3D from './perlin';

const
  noiseImage = new ImageData(canvasSide, canvasSide),
  skinImage = new Image(256, 1),
  traslation = new Vec2(),
  pixelSize = 5,
  scale = 1 / canvasSide,
  u = (x) => (x + traslation.x) * scale,
  v = (y) => (y + traslation.y) * scale,
  pixelData = [0, 0, 0];

let
  noiseContext,
  skinContext,
  skinData = [],
  initialized = false,
  raf = -500;

skinImage.onload = () => {
  skinContext.clearRect(0, 0, 256, 1);
  skinContext.drawImage(skinImage, 0, 0);
  skinData = skinContext.getImageData(0, 0, 256, 1).data;
  tryToInit();
}

function noise3D() {
  let y, x, k, n, frequencyK, amplitudeK, noiseValue, subX, subY, pixelIndex;
  for (y = 0; y < canvasSide; y += pixelSize) {
    for (x = 0; x < canvasSide; x += pixelSize) {
      frequencyK = 1; 
      amplitudeK = 2;
      n = 0

      for (k = 0; k < 2; k++, frequencyK *= 2, amplitudeK *= .5) {
        n += perlin3D(
          (u(x) + k) * frequencyK,
          (v(y) + k) * frequencyK,
          raf * .003
        ) * amplitudeK;
      }

      noiseValue = Math.trunc(n * 127 + 128);
      if (noiseValue < 0) noiseValue = 0;
      if (noiseValue > 255) noiseValue = 255;
      noiseValue *= 4; // Pixel data position.

      pixelData[0] = skinData[noiseValue + 0];
      pixelData[1] = skinData[noiseValue + 1];
      pixelData[2] = skinData[noiseValue + 2];
      pixelData[3] = skinData[noiseValue + 3];

      for (subY = 0; subY < pixelSize; subY++) {
        for (subX = 0; subX < pixelSize; subX++) {
          pixelIndex = ((y + subY) * canvasSide + x + subX) * 4;
          noiseImage.data[pixelIndex + 0] = pixelData[0];
          noiseImage.data[pixelIndex + 1] = pixelData[1];
          noiseImage.data[pixelIndex + 2] = pixelData[2];
          noiseImage.data[pixelIndex + 3] = pixelData[3];
        }
      }
    }
  }

  noiseContext.clearRect(0, 0, canvasSide, canvasSide);
  noiseContext.putImageData(noiseImage, 0, 0);
  raf = requestAnimationFrame(noise3D);
}

function delegateNoiseContextTo(context) {
  noiseContext = context;
  tryToInit();
}

function delegateSkinContextTo(context) {
  skinContext = context;
  if (!skinImage.src) skinImage.src = './images/tfp2-colors.png';
}

function tryToInit() {
  if (!initialized && skinData.length && noiseContext) {
    initialized = true;
    noise3D();
  }
}

export { traslation, delegateNoiseContextTo, delegateSkinContextTo };
