import { Vec2 } from '../../../js/vec.min';

const WOLREY = {
	// First closest.
	st(spots, pixel) {
		let st = Infinity;
		const n = spots.length;
		for (let i = 0; i < n; i++) {
			let dist = Vec2.distance(pixel, spots[i].pos);
			if (dist < st) {
				st = dist;
			}
		}
		return st;
	},
	// Second closest.
	nd(spots, pixel) {
		let stAndNd = [Infinity, Infinity];
		const n = spots.length;
		for (let i = 0; i < n; i++) {
			let dist = Vec2.distance(pixel, spots[i].pos);
			if (dist < stAndNd[0]) {
				stAndNd[1] = stAndNd[0];
				stAndNd[0] = dist;
			} else if (dist < stAndNd[1]) {
				stAndNd[1] = dist;
			}
		}
		return stAndNd[1];
	},
	// Second minus first closest.
	ndMinusSt(spots, pixel) {
		const stAndNd = [Infinity, Infinity];
		const n = spots.length;
		for (let i = 0; i < n; i++) {
			const dist = Vec2.distance(pixel, spots[i].pos);
			if (dist < stAndNd[0]) {
				stAndNd[1] = stAndNd[0];
				stAndNd[0] = dist;
			} else if (dist < stAndNd[1]) {
				stAndNd[1] = dist;
			}
		}
		return stAndNd[1] - stAndNd[0];
	},
	// Distance with Chebyshev metric.
	chebyshev(spots, pixel) {
		let st = Infinity;
		const n = spots.length;
		for (let i = 0; i < n; i++) {
			let dist = Vec2.distanceChebyshev(pixel, spots[i].pos);
			if (dist < st) st = dist;
		}
		return st;
	},
	// Distance with Manhattan metric.
	manhattan(spots, pixel) {
		let st = Infinity;
		const n = spots.length;
		for (let i = 0; i < n; i++) {
			let dist = Vec2.distanceManhattan(pixel, spots[i].pos);
			if (dist < st) st = dist;
		}
		return st;
	},
	// Distance with Minkowski metric.
	minkowski(spots, pixel) {
		let st = Infinity;
		const n = spots.length;
		for (let i = 0; i < n; i++) {
			let dist = Vec2.distanceMinkowski(pixel, spots[i].pos, 3);
			if (dist < st) st = dist;
		}
		return st;
	}
}

export default WOLREY;
