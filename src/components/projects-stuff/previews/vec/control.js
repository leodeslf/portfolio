import { Vec2 } from '../../../../js/vec.min';

// First time.
let justStarted = true;
let raf;

// Util vars.
const PI = 3.1416;
const side = 200;
const center = side * .5;

// Ratios for different patterns.
const ratios = [[9, 7], [17, 10], [45, 38], [64, 41], [85, 48], [100, 73]];
const innerRadius = center * .33;
let ratioIndex = 2
let ratio = ratios[ratioIndex][0] / ratios[ratioIndex][1];
let degreesPerFrame = 4.8;
const rotationSpeed = 2 * PI / (360 / degreesPerFrame);

// Minor axis, revs arround the main axis.
let penRadius = innerRadius / ratio;
let penRotation = rotationSpeed * (1 + ratio);
const pen = Vec2.fromPolarCoords(penRadius, -PI);

// Mayor axis.
let pathRadius = innerRadius + penRadius;
let pathRotation = rotationSpeed;
const path = Vec2.fromPolarCoords(pathRadius, 0);

let canvas, ctx, debugCanvas, debugCtx;

/**
 * Initialize process, define rendering context from the
 * given canvas and start generating and printing data.
 */
export function initControl(vecCanvas, vecDebugCanvas) {
  // Save current state if any.
  if (ctx) var oldImgState = ctx.getImageData(0, 0, side, side);

  canvas = vecCanvas;
  ctx = canvas.getContext('2d');

  // Repaint current state (if any) on new canvas context.
  if (oldImgState) ctx.putImageData(oldImgState, 0, 0);

  ctx.translate(center, center);
  ctx.lineWidth = .5;

  debugCanvas = vecDebugCanvas;
  debugCtx = debugCanvas.getContext('2d');
  debugCtx.translate(center, center);
  debugCtx.lineWidth = .75;

  // Avoid repeating animations.
  if (!oldImgState) draw();
}

function draw() {
  // Check if the loop has reached the end (same position as it started).
  const pathAtStart = +path.angleX.toFixed(1) === 0;
  const penAtStart = +pen.angleX.toFixed(2) === 3.14;
  if (!justStarted && pathAtStart && penAtStart) {
    debugCtx.clearRect(-center, -center, side, side);
    cancelAnimationFrame(raf);
    canvas.classList.add('finish');
    return;
  }
  if (justStarted) justStarted = false;

  // Save current position.
  const { x, y } = Vec2.add(path, pen);
  // Update to next position.
  path.rotateAxisZ(-pathRotation);
  pen.rotateAxisZ(-penRotation);

  drawPattern(x, y);
  drawDebug();
  raf = requestAnimationFrame(draw);
}

// Trace a line from the previouse position to the current one.
function drawPattern(prevX, prevY) {
  const current = Vec2.add(path, pen);

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(current.x, current.y);
  ctx.strokeStyle = `hsl(
      ${current.angleX / PI * 180},
      100%,
      50%
    )`;
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
  // Stop animation and reset state.
  cancelAnimationFrame(raf);
  ctx.clearRect(-center, -center, side, side);
  justStarted = true;
  canvas.classList.remove('finish');  

  // Initialize again.
  ratioIndex++;
  if (ratioIndex >= ratios.length) ratioIndex = 0;
  ratio = ratios[ratioIndex][0] / ratios[ratioIndex][1];

  penRadius = innerRadius / ratio;
  penRotation = rotationSpeed * (1 + ratio);
  pathRadius = innerRadius + penRadius;

  pen.copy(Vec2.fromPolarCoords(penRadius, -PI));
  path.copy(Vec2.fromPolarCoords(pathRadius, 0));

  draw();
}

/**
 * Docs.
 *
 * https://en.wikipedia.org/wiki/Epicycloid
 * https://de.maplesoft.com/support/help/maple/view.aspx?path=MathApps/EpicycloidAndHypocycloid
 *
 * https://mathcurve.com/courbes2d.gb/epicycloid/epicycloid.shtml
 * https://teachingcalculus.com/2014/06/27/epicycloids-2/
 *
 * https://tex.stackexchange.com/questions/283810/generating-all-coprime-pairs-m-n
 */
