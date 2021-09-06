import { Vec2 } from '../../../js/vec.min';
import { side } from '../previewUtil';
import IKModule from './IKModule';

const PI = 3.1416;
const speed = 8;
const joints = 8;
const jointsLength = (side * .6) / joints;
const iKModule = new IKModule(
  joints,
  jointsLength,
  new Vec2(side - jointsLength, jointsLength),
  new Vec2(jointsLength, side - jointsLength)
);
let nextTarget = Vec2.clone(iKModule.target);
let ctx;

// Function to hanlde the hole process animation.
function run() {
  update()
  draw();
  requestAnimationFrame(run);
}

function setCtx(newCtx) {
  ctx = newCtx;
}

function setTarget(x, y) {
  nextTarget.xy = [x, y];
}

// Get closer to the target, if close enough, copy its position.
function update() {
  const diff = Vec2
    .subtract(nextTarget, iKModule.target)
    .normalize()
    .scale(speed);
  if (Vec2.distance(nextTarget, Vec2.add(iKModule.target, diff)) > speed) {
    iKModule.target.add(diff);
  } else {
    iKModule.target.copy(nextTarget);
  }
}

// Draw the anchor, all the joints (heads and tails), and the target.
function draw() {
  ctx.clearRect(0, 0, side, side);

  // Target.
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(nextTarget.x, nextTarget.y, 6, 0, 2 * PI);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(nextTarget.x, nextTarget.y, 4, 0, 2 * PI);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(nextTarget.x, nextTarget.y, 2, 0, 2 * PI);
  ctx.fill();
  ctx.closePath();

  // Anchor.
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.fillRect(iKModule.anchor.x - 3, iKModule.anchor.y - 3, 6, 6);
  ctx.fill();
  ctx.closePath();

  // Joints.
  ctx.strokeStyle = 'black';
  for (let i = 1; i < joints; i++) {
    const { base, end } = iKModule.body[i]
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(base.x, base.y, 2, 0, 2 * PI);
    ctx.closePath();
    ctx.fill();
  }

  // Target joint end.
  const arrow = Vec2.subtract(iKModule.body[0].end, iKModule.body[1].end);
  arrow.magnitude = jointsLength;

  ctx.fillStyle = 'black';
  ctx.save();
  ctx.translate(iKModule.body[0].end.x, iKModule.body[0].end.y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.translate(-arrow.x, -arrow.y);
  ctx.lineTo(-arrow.y * .3, +arrow.x * .3);
  ctx.lineTo(+arrow.y * .3, -arrow.x * .3);
  ctx.translate(arrow.x, arrow.y);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  iKModule.update();
}

export { run, setCtx, setTarget };
