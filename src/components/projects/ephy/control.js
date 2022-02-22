import { Vec2 } from '../../../js/vec.min';
import { canvasSide } from '../previewUtil';

const
  RADIAN = Math.PI * 2,
  P = 31,
  Q = 23,
  K = P / Q,
  RADIUS_FRACTION = (canvasSide * .5 - 10) / (K + 2),
  R1 = RADIUS_FRACTION * K,
  R2 = RADIUS_FRACTION,
  ORBIT = R1 + R2,
  ROTATION = 0.005,
  OUTER_ROTATION = ROTATION * (K + 1),
  ITERATIONS_PER_FRAME = 25,
  END = RADIAN * Q;

let animation, context, current, outerVec, orbitVec;

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

  current = 0;
  outerVec = new Vec2(-R2, 0);
  orbitVec = new Vec2(ORBIT, 0);

  drawCycloid();
}

function drawCycloid() {

  for (let i = 0; i < ITERATIONS_PER_FRAME; i++) {
    /* const SUM = Vec2.add(outerVec, orbitVec).angleX;
    context.strokeStyle = `hsl(${SUM / RADIAN * 360}, 100%, 50%)`; */

    context.beginPath();

    // Draw from current position...
    context.moveTo(...Vec2.add(orbitVec, outerVec).xy);

    // To the next one.
    outerVec.rotateAxisZ(-OUTER_ROTATION);
    orbitVec.rotateAxisZ(-ROTATION);

    current += ROTATION;
    if (current >= END) {
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
