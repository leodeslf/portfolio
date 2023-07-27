import { Vec2 } from '../../../js/vec.min';
import { canvasSide } from '../previewUtil';

// Config.
const
  radian = Math.PI * 2,
  p = 31,
  q = 23,
  k = p / q,
  innerFinalRotation = radian * q,
  radiusFraction = (canvasSide * .5 - 10) / (k + 2),
  innerRadius = radiusFraction * k,
  outerRadius = radiusFraction,
  outerOrbitRadius = innerRadius + outerRadius,
  innerRotation = 0.005,
  outerRotation = innerRotation * (k + 1),
  iterationsPerFrame = 25;

let animation, context, innerCurrentRotation, outerVec, orbitVec;

function initControl(canvas) {
  context = canvas.getContext('2d');
  context.translate(canvasSide * 0.5, canvasSide * 0.5);
  context.globalCompositeOperation = "luminosity";
  context.strokeStyle = "#000";
  context.lineCap = "round";
  context.lineWidth = 0.35;
  reset();
}

function reset() {
  cancelAnimationFrame(animation);
  context.clearRect(-canvasSide * .5, -canvasSide * .5, canvasSide, canvasSide);

  innerCurrentRotation = 0;
  outerVec = new Vec2(-outerRadius, 0);
  orbitVec = new Vec2(outerOrbitRadius, 0);

  drawCycloid();
}

function drawCycloid() {
  for (let i = 0; i < iterationsPerFrame; i++) {
    /* const SUM = Vec2.add(outerVec, orbitVec).angleX;
    context.strokeStyle = `hsl(${SUM / RADIAN * 360}, 100%, 50%)`; */

    context.beginPath();
    context.moveTo(...Vec2.add(orbitVec, outerVec).xy);

    outerVec.rotateAxisZ(-outerRotation);
    orbitVec.rotateAxisZ(-innerRotation);

    innerCurrentRotation += innerRotation;
    if (innerCurrentRotation >= innerFinalRotation) {
      context.closePath();
      return cancelAnimationFrame(animation);
    }

    context.lineTo(...Vec2.add(orbitVec, outerVec).xy);
    context.closePath();
    context.stroke();
  }

  animation = requestAnimationFrame(drawCycloid);
}

export { initControl, reset };
