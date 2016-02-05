const { EARTH_RADIUS, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG } = require('./utils');
const toDegrees = require('./to-degrees');
const toRad = require('./to-rad');

module.exports = (position, distance) => {
	var minLat, maxLat, minLng, maxLng;
	var deltaLng;
	var radDist = distance / EARTH_RADIUS;
	var radLat = toRad(position.lat), radLng = toRad(position.lng);

	minLat = radLat - radDist;
	maxLat = radLat + radDist;

	if (minLat > MIN_LAT && maxLat < MAX_LAT) {
		deltaLng = Math.asin(Math.sin(radDist) / Math.cos(radLat));
		minLng = radLng - deltaLng;
		if (minLng < MIN_LNG) minLng += 2 * Math.PI;
		maxLng = radLng + deltaLng;
		if (maxLng > MAX_LNG) maxLng -= 2 * Math.PI;
	} else {
		minLat = Math.max(minLat, MIN_LAT);
		maxLat = Math.min(maxLat, MAX_LAT);
		minLng = MIN_LNG;
		maxLng = MAX_LNG;
	}

	return [
		{ lat: toDegrees(minLat), lng: toDegrees(minLng) }, // Southwest
		{ lat: toDegrees(maxLat), lng: toDegrees(maxLng) } // Northeast
	];
};
