import IKModule from './IKModule';
import { Vec2 } from "../../js/vec.min";

let ctx;
const PI = 3.1416;
const side = 200;
export const joints = 42;
const jointsLength = 2;
export const chain = new IKModule(
  joints,
  jointsLength,
  new Vec2(Math.random() * side, Math.random() * side),
  new Vec2(side * .5, side * .5)
);

export function initControl(ikCtx) {
  ctx = ikCtx;
  ctx.lineWidth = .8;
  draw();
}

function draw() {
  ctx.clearRect(0, 0, side, side);

  const a = chain.anchor;
  if (a) {
    ctx.beginPath();
    ctx.arc(a.x, a.y, 3, 0, PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  for (let i = 0; i < joints; i++) {
    ctx.beginPath();
    ctx.moveTo(
      chain.body[i].base.x,
      chain.body[i].base.y);
    ctx.lineTo(
      chain.body[i].end.x,
      chain.body[i].end.y);
    ctx.stroke();
    ctx.closePath();
  }

  chain.update();
  requestAnimationFrame(draw);
}
