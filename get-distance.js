const { EARTH_RADIUS } = require('./utils');
const toRad = require('./to-rad');

module.exports = (a, b) => {
	var a, c, dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng);
	a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat));
	c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return c * EARTH_RADIUS;
};
