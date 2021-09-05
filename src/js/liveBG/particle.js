import { Vec2 } from '../../js/vec.min';

const PI = 3.1415;
const step = 0.25;

export default class Particle {
  constructor(minX, minY, maxX, maxY, size) {
    this.rev = Math.random() * PI * 4;
    this.pos = new Vec2(Math.random() * maxX - 1, Math.random() * maxY - 1);
    this.lim = { minX, minY, maxX, maxY };
    this.vel = Vec2.random();
    this.vel.y *= .1;
    this.vel.limitMinMagnitude(.6);
    this.size = size;
  }
  update() {
    if (this.pos.x <= this.lim.minX || this.pos.x >= this.lim.maxX)
      this.vel.x *= -1;
    if (this.pos.y <= this.lim.minY || this.pos.y >= this.lim.maxY)
      this.vel.y *= -1;

    this.rev += step;
    if (this.rev >= PI * 200) this.rev = 0;
    this.pos.add(this.vel);
  }
}
