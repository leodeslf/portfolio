import { Vec2 } from '../../../js/vec.min';
import IKModule from './IKModule';

const PI = 3.1416;
const side = 192;
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

  // Anchor.
  ctx.beginPath();
  ctx.arc(iKModule.anchor.x, iKModule.anchor.y, 3, 0, 2 * PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();

  // Joints.
  ctx.strokeStyle = 'black';
  for (let i = 0; i < joints; i++) {
    ctx.beginPath();
    ctx.moveTo(iKModule.body[i].base.x, iKModule.body[i].base.y);
    ctx.lineTo(iKModule.body[i].end.x, iKModule.body[i].end.y);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(iKModule.body[i].base.x, iKModule.body[i].base.y, 2, 0, 2 * PI);
    ctx.fill();
    ctx.closePath();
  }

  // Target joint end.
  ctx.beginPath();
  ctx.arc(iKModule.body[0].end.x, iKModule.body[0].end.y, 3, 0, 2 * PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();

  // Target.
  ctx.beginPath();
  ctx.arc(nextTarget.x, nextTarget.y, 2.5, 0, 2 * PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();

  iKModule.update();
}

export { run, setCtx, setTarget };
