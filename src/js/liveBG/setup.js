import Particle from "./particle.js";

// General state.
const canvasArray = [];
const ctxArray = [];
let w, h;

// Particles state.
const particles = 8;
const particleSystem = [];
let particlesRAF;

// Birds state.
const birdLenUnit = 4;
const birdColor = '#25f3';
const humerusLen = birdLenUnit;
const ulnaLen = humerusLen * 2;
const birdRevOffset = -.8;

// Fireflies state.
const fireflyRadius = .5;
const fireflyColor = '#ff2c';

export function initLiveBG() {
  canvasArray[0] = document.getElementsByClassName('live-bg__canvas--birds')[0];
  canvasArray[1] = document.getElementsByClassName('live-bg__canvas--fireflies')[0];

  resetDimentions();
  resetParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resetDimentions();
    resetParticles();
  });
}

function resetDimentions() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvasArray.forEach((canvas, i) => {
    canvas.width = w;
    canvas.height = h;
    ctxArray[i] = canvas.getContext('2d');
  });
  ctxArray[0].strokeStyle = birdColor;
  ctxArray[0].fillStyle = birdColor;
  ctxArray[1].fillStyle = fireflyColor;
}

function resetParticles() {
  cancelAnimationFrame(particlesRAF);
  for (let i = 0; i < particles; i++) {
    particleSystem[i] = new Particle(0, 0, w, h);
  }
  initParticlesAnimation();
}

function initParticlesAnimation() {
  for (let i = 0; i < particles; i++) {
    particleSystem[i].update();
  }
  particlesRAF = requestAnimationFrame(initParticlesAnimation);
}

function drawParticles() {
  ctxArray[0].clearRect(0, 0, w, h);
  ctxArray[1].clearRect(0, 0, w, h);
  for (let i = 0; i < particles; i++) {
    const { pos, rev } = particleSystem[i];

    // Birds.
    const humerusY = Math.sin(rev);
    const ulnaY = Math.sin(rev + birdRevOffset);
    ctxArray[0].beginPath();
    ctxArray[0].moveTo(pos.x - ulnaLen, pos.y + ulnaY * birdLenUnit * 1.2);
    ctxArray[0].lineTo(pos.x - humerusLen, pos.y + humerusY * birdLenUnit * 0.6);
    ctxArray[0].lineTo(pos.x, pos.y);
    ctxArray[0].lineTo(pos.x + humerusLen, pos.y + humerusY * birdLenUnit * 0.6);
    ctxArray[0].lineTo(pos.x + ulnaLen, pos.y + ulnaY * birdLenUnit * 1.2);
    ctxArray[0].stroke();
    ctxArray[0].closePath();

    // Fireflies.
    const size = fireflyRadius * (Math.sin(rev * .4));
    ctxArray[1].beginPath();
    ctxArray[1].arc(pos.x, pos.y, size >= 0 ? size : 0, 0, 360);
    ctxArray[1].fill();
    ctxArray[1].closePath();
  }
  requestAnimationFrame(drawParticles);
}
