import { Vec2 } from "../../js/vec.min";

// Second closest minus first closest.
export default function worleyNdMinusSt(spots, pixel) {
	const stNd = [Infinity, Infinity];
	const n = spots.length;
	for (let i = 0; i < n; i++) {
		const dist = Vec2.distance(pixel, spots[i].pos);
		if (dist < stNd[0]) {
			stNd[1] = stNd[0];
			stNd[0] = dist;
		} else if (dist < stNd[1]) {
			stNd[1] = dist;
		}
	}
	return stNd[1] - stNd[0];
}
