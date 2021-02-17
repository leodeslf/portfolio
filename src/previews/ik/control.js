import IKModule from './IKModule';
import { Vec2 } from "../../js/vec.min";

let canvas, ctx;
const PI = 3.1416;
const canvasW = 200;
const canvasH = 200;
const joints = 42;
const jointsLength = 2;
let target = new Vec2(0, 0);
let anchor = new Vec2(canvasW * .5, canvasH * .5);
const IKM = new IKModule(joints, jointsLength, target, anchor);

export function initControl(IKCanvas) {
  canvas = IKCanvas;
  ctx = canvas.getContext('2d');
  ctx.lineWidth = .75;
  draw();

  canvas.onmousedown = () => IKM.anchor = false;

  canvas.onmousemove = m => {
    target.x = m.offsetX;
    target.y = m.offsetY;
  }

  window.addEventListener('mouseup', () => {
    anchor = Vec2.fromCopy(IKM.body[joints - 1].base);
    IKM.anchor = anchor;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvasW, canvasH);

  const a = IKM.anchor;
  if (a) {
    ctx.beginPath();
    ctx.arc(a.x, a.y, 3, 0, PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  for (let i = 0; i < joints; i++) {
    ctx.beginPath();
    ctx.moveTo(
      IKM.body[i].base.x,
      IKM.body[i].base.y);
    ctx.lineTo(
      IKM.body[i].end.x,
      IKM.body[i].end.y);
    ctx.stroke();
    ctx.closePath();
  }

  IKM.update();
  requestAnimationFrame(draw);
}
