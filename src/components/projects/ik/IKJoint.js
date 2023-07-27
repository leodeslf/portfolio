import { Vec2 } from '../../../js/vec.min';

export default class IKJoint {
  base = new Vec2();
  end = new Vec2();
  anchor = new Vec2();
  angle = 0;
  constructor(length, target) {
    this.target = target;
    this.length = length;
  }

  reach() {
    let newBase = Vec2.subtract(this.target, this.base);
    this.angle = newBase.angleX;
    newBase.magnitude = this.length;
    newBase.scale(-1);
    this.base.copy(Vec2.add(this.target, newBase));
    this.update();
  }

  fix() {
    this.base.copy(this.anchor);
    this.update();
  }

  update() {
    this.end.copy(Vec2.fromPolarCoords(this.length, this.angle));
    this.end.add(this.base);
  }
}
