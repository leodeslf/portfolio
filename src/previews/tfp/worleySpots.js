import { Vec2 } from "../../js/vec.min";

const speedLim = 1;

export default class WorleySpotSystem {
	constructor(frameW, frameH, spotAmount) {
		this.w = frameW;
		this.h = frameH;
		this.spots = [];
		for (let i = 0; i < spotAmount; i++) {
			this.spots[i] = new WorleySpot(
				Math.random() * frameW,
				Math.random() * frameH
			);
		}
	}

	edges() {
		this.spots.forEach(spot => {
			if (spot.pos.x < 0 || spot.pos.x > this.w) {
				if (spot.pos.x < 0) spot.pos.x = 0;
				else spot.pos.x = this.w;
				spot.vel.x = -spot.vel.x;
			}
			if (spot.pos.y < 0 || spot.pos.y > this.h) {
				if (spot.pos.y < 0) spot.pos.y = 0;
				else spot.pos.y = this.h;
				spot.vel.y = -spot.vel.y;
			}
		});
	}

	repulsion() {
		this.spots.forEach(spot => {
			let minDistance = Infinity;
			let minSpotPosition = new Vec2(0, 0);
			let force = new Vec2(0, 0);
			this.spots.forEach(neighbour => {
				let dis = Vec2.distance(spot.pos, neighbour.pos);
				if (dis > 0 && dis < minDistance) {
					minDistance = dis;
					minSpotPosition.copy(neighbour.pos);
				}
			});
			force.copy(minSpotPosition);
			force.subtract(spot.pos);
			force.normalize();
			spot.acc.subtract(force);
			spot.acc.scale(0.01);
		});
	}

	update() {
		this.repulsion();
		this.spots.forEach(spot => {
			spot.vel.add(spot.acc);
			spot.acc.scale(0);
			spot.vel.clamp(speedLim, -Infinity);
			spot.pos.add(spot.vel);
		})
		this.edges();
	}
}

class WorleySpot {
	constructor(x, y) {
		this.pos = new Vec2(x, y);
		this.vel = new Vec2(
			Math.random() * speedLim,
			Math.random() * speedLim
		);
		this.acc = new Vec2(0, 0);
	}
}
