import IKModule from './IKModule';
import { Vec2 } from "../preview-util/vec.min";
import { canvasH, canvasW } from '../preview-util/util';

let initialized = false;

// Canvas rendering context and cfg. vars.
let ctx;
const joints = 5;
const jointsLength = (canvasH * .8) / joints;
const iKModule = new IKModule(
  joints,
  jointsLength,
  new Vec2(canvasW - jointsLength, jointsLength),
  new Vec2(jointsLength, canvasH - jointsLength)
);
let nextTarget = Vec2.clone(iKModule.target);

/**
 * Initialize process, define rendering context from the
 * given canvas and start generating and printing data.
 */
export function initControl(ikCtx) {
  ctx = ikCtx;
  ctx.lineWidth = 1;
  if (!initialized) {
    initialized = true;
    run();
  }
}

// Function to hanlde the hole process animation.
function run() {
  update()
  draw();
  requestAnimationFrame(run);
}

// Reduce the distance to the target by 8px at a time.
function update() {
  const diff = Vec2.subtract(nextTarget, iKModule.target).normalize().scale(8);
  if (Vec2.distance(nextTarget, Vec2.add(iKModule.target, diff)) > 8) {
    iKModule.target.add(diff);
  } else {
    iKModule.target.copy(nextTarget);
  }
}

const PI = 3.1416;

// Draw the anchor, all the joints (heads and tails), and the target.
function draw() {
  ctx.clearRect(0, 0, canvasW, canvasH);

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

// To be called when the user clicks/touches the canvas.
export function setTarget(x, y) {
  nextTarget.xy = [x, y];
}
