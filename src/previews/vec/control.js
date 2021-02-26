import { Vec2 } from "../../js/vec.min";

let raf, canvas, ctx, debugCanvas, debugCtx;

const PI = 3.1416;
const side = 200;
const center = side * .5;

// Cfg.
let start = true;
const ratios = [[9, 7], [17, 10], [45, 38], [64, 41], [85, 48], [100, 73]];
const rotationSpeed = 2 * PI / 74;
const innerRadius = center * .33;
let ratio = 45 / 38;

// Pen and it´s (rotation axis) path.
let penRadius = innerRadius / ratio;
let penRotation = rotationSpeed * (1 + ratio);
const pen = Vec2.fromPolarCoords(penRadius, -PI);

let pathRadius = innerRadius + penRadius;
const pathRotation = rotationSpeed;
const path = Vec2.fromPolarCoords(pathRadius, 0);

function draw() {
  // Check if it's at the start position (ended).
  const pathAtStart = +path.angleX.toFixed(1) === 0;
  const penAtStart = +pen.angleX.toFixed(2) === 3.14;
  if (!start && pathAtStart && penAtStart) {
    debugCtx.clearRect(-center, -center, side, side);
    cancelAnimationFrame(raf);
    return;
  }
  if (start) start = false;

  // Save current position.
  const { x, y } = Vec2.add(path, pen);
  // Update to next position.
  path.rotateAxisZ(-pathRotation);
  pen.rotateAxisZ(-penRotation);

  drawPattern(x, y);
  drawDebug();
  raf = requestAnimationFrame(draw);
}

function drawPattern(prevX, prevY) {
  const { x, y } = Vec2.add(path, pen);

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = `hsl(
    ${Vec2.add(path, pen).angleX / PI * 180 + 180},
    0%, 0%)`;
  ctx.stroke();
  ctx.closePath();
}

function drawDebug() {
  debugCtx.clearRect(-center, -center, side, side);

  // Lines.
  debugCtx.beginPath();
  debugCtx.moveTo(0, 0);
  debugCtx.lineTo(path.x, path.y);
  debugCtx.lineTo(path.x + pen.x, path.y + pen.y);
  debugCtx.strokeStyle = 'black';
  debugCtx.stroke();
  debugCtx.closePath();

  // Dots.
  debugCtx.beginPath();
  debugCtx.arc(0, 0, 2, 0, 2 * PI);
  debugCtx.fillStyle = 'black';
  debugCtx.fill();
  debugCtx.closePath();
  debugCtx.beginPath();
  debugCtx.arc(path.x, path.y, 2, 0, 2 * PI);
  debugCtx.fill();
  debugCtx.closePath();

  // Circles.
  debugCtx.beginPath();
  debugCtx.arc(0, 0, innerRadius, 0, PI * 2);
  debugCtx.stroke();
  debugCtx.closePath();
  debugCtx.beginPath();
  debugCtx.arc(path.x, path.y, penRadius, 0, PI * 2);
  debugCtx.stroke();
  debugCtx.closePath();

  // Pen tip.
  debugCtx.beginPath();
  debugCtx.arc(path.x + pen.x, path.y + pen.y, 3, 0, PI * 2);
  debugCtx.fillStyle = 'red';
  debugCtx.fill();
  debugCtx.closePath();
}

export function reset() {
  cancelAnimationFrame(raf);
  ctx.clearRect(-center, -center, side, side);
  start = true;

  // Reset.
  const ratioI = Math.round(Math.random() * (ratios.length - 1));
  ratio = ratios[ratioI][0] / ratios[ratioI][1];

  penRadius = innerRadius / ratio;
  penRotation = rotationSpeed * (1 + ratio);
  pathRadius = innerRadius + penRadius;

  pen.copy(Vec2.fromPolarCoords(penRadius, -PI));
  path.copy(Vec2.fromPolarCoords(pathRadius, 0));

  draw();
}

export function initControl(vecCanvas, vecDebugCanvas) {
  canvas = vecCanvas;
  ctx = canvas.getContext('2d');
  ctx.translate(center, center);
  ctx.lineWidth = .6;

  debugCanvas = vecDebugCanvas;
  debugCtx = debugCanvas.getContext('2d');
  debugCtx.translate(center, center);
  debugCtx.lineWidth = 1;

  draw();
}

// Docs.

// https://en.wikipedia.org/wiki/Epicycloid
// https://de.maplesoft.com/support/help/maple/view.aspx?path=MathApps/EpicycloidAndHypocycloid

// https://mathcurve.com/courbes2d.gb/epicycloid/epicycloid.shtml
// https://teachingcalculus.com/2014/06/27/epicycloids-2/

// https://tex.stackexchange.com/questions/283810/generating-all-coprime-pairs-m-n
