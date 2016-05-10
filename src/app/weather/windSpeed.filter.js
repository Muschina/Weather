'use strict';
(function() {
	angular.module('weatherControllers')
	.filter('windSpeed', windSpeed);

	function windSpeed () {
		return function (speed) {
			if(angular.isString(speed)) {
				return Math.round(speed/3600*1000) + '';
			}

			return speed;
		};
	}
})();