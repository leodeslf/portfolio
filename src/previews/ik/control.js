import IKModule from './IKModule';
import { Vec2 } from "../../js/vec.min";

let ctx;
const PI = 3.1416;
const side = 200;
const sizeA = side * .618;
const sizeAPlusHalfSizeB = sizeA + (side - sizeA) * .5;
const joints = 4;
const jointsLength = sizeA / joints;
const chain = new IKModule(
  joints,
  jointsLength,
  new Vec2(sizeAPlusHalfSizeB, side - sizeAPlusHalfSizeB),
  new Vec2(side - sizeAPlusHalfSizeB, sizeAPlusHalfSizeB)
);
let nextTarget = Vec2.clone(chain.target);

export function initControl(ikCtx) {
  ctx = ikCtx;
  ctx.lineWidth = 1;
  run();
}

export function setTarget(x, y) {
  nextTarget.xy = [x, y];
}

function run() {
  update()
  draw();
  requestAnimationFrame(run);
}

function update() {
  const diff = Vec2.subtract(nextTarget, chain.target).normalize().scale(5);
  if (Vec2.distance(nextTarget, Vec2.add(chain.target, diff)) > 5) {
    chain.target.add(diff);
  } else {
    chain.target.copy(nextTarget);
  }
}

function draw() {
  ctx.clearRect(0, 0, side, side);

  // Anchor.
  ctx.beginPath();
  ctx.arc(chain.anchor.x, chain.anchor.y, 3, 0, 2 * PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.closePath();

  // Joints.
  ctx.strokeStyle = 'black';
  for (let i = 0; i < joints; i++) {
    ctx.beginPath();
    ctx.moveTo(chain.body[i].base.x, chain.body[i].base.y);
    ctx.lineTo(chain.body[i].end.x, chain.body[i].end.y);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(chain.body[i].base.x, chain.body[i].base.y, 2, 0, 2 * PI);
    ctx.fill();
    ctx.closePath();
  }

  // Target joint end.
  ctx.beginPath();
  ctx.arc(chain.body[0].end.x, chain.body[0].end.y, 3, 0, 2 * PI);
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

  chain.update();
}
