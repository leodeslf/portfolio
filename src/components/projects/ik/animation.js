import { Vec2 } from '../../../js/vec.min';
import { canvasSide } from '../previewUtil';
import IKModule from './IKModule';

const
  pi = 3.1416,
  moveSpeed = 8,
  joints = 8,
  jointsLength = (canvasSide * .6) / joints,
  iKModule = new IKModule(
    joints,
    jointsLength,
    new Vec2(canvasSide - jointsLength, jointsLength),
    new Vec2(jointsLength, canvasSide - jointsLength)
  ),
  nextTarget = Vec2.clone(iKModule.target);
let context;

// Function to hanlde the hole process animation.
function run() {
  update()
  draw();
  requestAnimationFrame(run);
}

function setContext(newContext) {
  context = newContext;
}

function setTarget(x, y) {
  nextTarget.xy = [x, y];
}

function update() {
  const diff = Vec2
    .subtract(nextTarget, iKModule.target)
    .normalize()
    .scale(moveSpeed);
  if (Vec2.distance(nextTarget, Vec2.add(iKModule.target, diff)) > moveSpeed) {
    // Get closer to the target.
    iKModule.target.add(diff);
  } else {
    // If close enough, get to the final position.
    iKModule.target.copy(nextTarget);
  }
}

// Draw the anchor, all the joints (heads and tails), and the target.
function draw() {
  context.clearRect(0, 0, canvasSide, canvasSide);

  // Target.
  context.fillStyle = 'red';
  context.beginPath();
  context.arc(nextTarget.x, nextTarget.y, 6, 0, 2 * pi);
  context.fill();
  context.closePath();
  context.beginPath();
  context.fillStyle = 'white';
  context.arc(nextTarget.x, nextTarget.y, 4, 0, 2 * pi);
  context.fill();
  context.closePath();
  context.beginPath();
  context.fillStyle = 'red';
  context.arc(nextTarget.x, nextTarget.y, 2, 0, 2 * pi);
  context.fill();
  context.closePath();

  // Anchor.
  context.fillStyle = 'black';
  context.beginPath();
  context.fillRect(iKModule.anchor.x - 3, iKModule.anchor.y - 3, 6, 6);
  context.fill();
  context.closePath();

  // Joints.
  context.strokeStyle = 'black';
  for (let i = 1; i < joints; i++) {
    const { base, end } = iKModule.body[i]
    context.beginPath();
    context.moveTo(base.x, base.y);
    context.lineTo(end.x, end.y);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.arc(base.x, base.y, 2, 0, 2 * pi);
    context.closePath();
    context.fill();
  }

  // Target joint (the arrow).
  const arrow = Vec2.subtract(iKModule.body[0].end, iKModule.body[1].end);
  arrow.magnitude = jointsLength;

  context.fillStyle = 'black';
  context.save();
  context.translate(iKModule.body[0].end.x, iKModule.body[0].end.y);
  context.beginPath();
  context.moveTo(0, 0);
  context.translate(-arrow.x, -arrow.y);
  context.lineTo(-arrow.y * .3, +arrow.x * .3);
  context.lineTo(+arrow.y * .3, -arrow.x * .3);
  context.translate(arrow.x, arrow.y);
  context.lineTo(0, 0);
  context.closePath();
  context.fill();
  context.restore();

  iKModule.update();
}

export { run, setContext, setTarget };
