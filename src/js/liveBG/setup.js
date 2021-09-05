import Particle from "./particle.js";

// General state.
const canvasArray = [];
const ctxArray = [];
let w, h, debounceReset;

// Particles state.
const particles = 8;
const particleSystem = [];
let particlesRAF;
const birdColor = '#fffc';
const fireflyColor = '#ff28';

export function initLiveBG() {
  canvasArray[0] = document.getElementsByClassName('live-bg__canvas--birds')[0];
  canvasArray[1] = document.getElementsByClassName('live-bg__canvas--fireflies')[0];

  resetDimentions();
  resetParticles();
  drawParticles();

  // Resize canvas and particles at resize with debouncing.
  window.addEventListener('resize', () => {
    clearTimeout(debounceReset);
    debounceReset = setTimeout(() => {
      resetDimentions();
      resetParticles();
    }, 1000)
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
    particleSystem[i] = new Particle(0, 0, w, h, 4 + Math.random() * 4);
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
    let { pos, rev, size } = particleSystem[i];
    size *= 1

    // Birds.
    const innerY = Math.sin(rev);
    const outerY = Math.sin(rev - .8);
    ctxArray[0].translate(pos.x, pos.y);
    ctxArray[0].beginPath();
    ctxArray[0].moveTo(-size, outerY * size * .7);
    ctxArray[0].lineTo(-size * .5, innerY * size * 0.25);
    ctxArray[0].lineTo(0, 0);
    ctxArray[0].lineTo(size * .5, innerY * size * 0.25);
    ctxArray[0].lineTo(size, outerY * size * .7);
    ctxArray[0].stroke();
    ctxArray[0].beginPath();
    ctxArray[0].translate(-pos.x, -pos.y);

    // Fireflies.
    const r = size * Math.sin(rev * .3) / 6;
    ctxArray[1].beginPath();
    ctxArray[1].arc(pos.x, pos.y, r >= 0 ? r : 0, 0, 360);
    ctxArray[1].fill();
    ctxArray[1].closePath();
  }
  requestAnimationFrame(drawParticles);
}
