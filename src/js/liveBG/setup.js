import Particle from "./particle.js";

// General state.
let raf;
let w, h;
let debounceReset;
let birdCanvas, firefliyCanvas;
let birdCtx, fireflyCtx;

// Particles config.
const particles = 32;
const particleSystem = [];
const birdColor = '#fff';
const fireflyColor = '#ff0';

// Init.
export function initLiveBG() {
  birdCanvas = document.getElementsByClassName('live-bg__canvas--birds')[0];
  firefliyCanvas = document.getElementsByClassName('live-bg__canvas--fireflies')[0];

  resetDimentions();
  resetParticles();

  // Resize canvas and particles at resize with debouncing.
  window.addEventListener('resize', () => {
    clearTimeout(debounceReset);

    debounceReset = setTimeout(() => {
      resetDimentions();
      resetParticles();
    }, 1000);
  });
}

// Draw.
function drawParticles() {
  birdCtx.clearRect(0, 0, w, h);
  fireflyCtx.clearRect(0, 0, w, h);

  for (let i = 0; i < particles; i++) {
    particleSystem[i].update();
    let { pos, rev, size } = particleSystem[i];

    // Birds.
    const wingW = 4 + 4 * size;
    const innerWingH = Math.sin(rev) * (2 + 2 * size * .2);
    const outerWingH = Math.sin(rev - .7) * (2 + 2 * size * .8);

    birdCtx.translate(pos.x, pos.y);
    birdCtx.beginPath();
    birdCtx.moveTo(-wingW, outerWingH);
    birdCtx.lineTo(-wingW * .6, innerWingH);
    birdCtx.lineTo(0, 0);
    birdCtx.lineTo(wingW * .6, innerWingH);
    birdCtx.lineTo(wingW, outerWingH);
    birdCtx.lineWidth = size;
    birdCtx.stroke();
    birdCtx.closePath();
    birdCtx.translate(-pos.x, -pos.y);

    // Fireflies.
    const radius = size * Math.sin(rev * .25);

    fireflyCtx.beginPath();
    fireflyCtx.arc(pos.x, pos.y, radius >= 0 ? radius : 0, 0, 360);
    fireflyCtx.fill();
    fireflyCtx.closePath();
  }

  raf = requestAnimationFrame(drawParticles);
}

// Util.
function resetParticles() {
  cancelAnimationFrame(raf);

  for (let i = 0; i < particles; i++) {
    particleSystem[i] = new Particle(0, 0, w, h, Math.random());
  }

  drawParticles();
}

function resetDimentions() {
  w = window.innerWidth;
  h = window.innerHeight;

  birdCanvas.width = w;
  birdCanvas.height = h;
  birdCtx = birdCanvas.getContext('2d');
  birdCtx.strokeStyle = birdColor;

  firefliyCanvas.width = w;
  firefliyCanvas.height = h;
  fireflyCtx = firefliyCanvas.getContext('2d');
  fireflyCtx.fillStyle = fireflyColor;
}
