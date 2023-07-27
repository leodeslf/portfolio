import { Vec2 } from '../../js/vec.min';

const step = 0.21;

export default class Particle {
  constructor(minX, minY, maxX, maxY) {
    this.lim = { minX, minY, maxX, maxY };
    this.pos = new Vec2(Math.random() * maxX - 1, Math.random() * maxY - 1);
    this.rev = Math.random() * 3.1415 * 5;
    this.size = Math.random();
    this.vel = Vec2.random();
    this.vel.y *= .1;
    this.vel.magnitude = this.size * .8;
  }
  update() {
    if (this.pos.x <= this.lim.minX || this.pos.x >= this.lim.maxX)
      this.vel.x *= -1;
    if (this.pos.y <= this.lim.minY || this.pos.y >= this.lim.maxY)
      this.vel.y *= -1;

    this.rev += step;
    if (this.rev >= 3.1415 * 2000) this.rev = 0; // Avoid big numbers.
    this.pos.add(this.vel);
  }
}
