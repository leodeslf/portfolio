import IKModule from './IKModule';
import { Vec2 } from "../../js/vec.min";

const PI2 = 6.2832;
const canvasW = 200;
const canvasH = 100;
const joints = 30;
const jointsLength = 2;
let boundary = new Vec2(0, 0);
let target = new Vec2(0, 0);
let anchor = new Vec2(canvasW * .5, canvasH * .5);
let canvas, ctx;
const IKM = new IKModule(joints, jointsLength, target, anchor);

export function initControl(IKCanvas) {
  canvas = IKCanvas;
  ctx = canvas.getContext('2d');
  draw();

  canvas.onmousedown = () => IKM.anchor = false;

  window.addEventListener('mouseup', () => {
    anchor = Vec2.fromCopy(IKM.body[joints - 1].base);
    IKM.anchor = anchor;
  });

  window.addEventListener('mousemove', e => {
    target.x = e.x - boundary.x;
    target.y = e.y - boundary.y;
  });

  ['load', 'scroll', 'resize'].forEach(e => {
    window.addEventListener(e, () => resetBoundary());
  })
}

function draw() {
  ctx.clearRect(0, 0, canvasW, canvasH);
  const a = IKM.anchor;
  if (a) {
    ctx.beginPath();
    ctx.arc(a.x, a.y, 3, 0, PI2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  for (let i = 0; i < joints; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `white`;
    ctx.moveTo(
      IKM.body[i].base.x,
      IKM.body[i].base.y);
    ctx.lineTo(
      IKM.body[i].end.x,
      IKM.body[i].end.y);
    ctx.closePath();
    ctx.stroke();
  }
  IKM.update();
  requestAnimationFrame(draw);
}

function resetBoundary() {
  boundary = canvas.getBoundingClientRect();
}
