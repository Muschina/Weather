'use strict';
(function() {
	angular.module('weatherControllers')
	.filter('timeFilter', timeFilter);

	function timeFilter () {
		return function (time) {
			if(angular.isString(time)) {
				var processedValue = time.split('');
				return (processedValue.length === 3) ? 
					('0' + processedValue[0] + ':00') :
					(processedValue[0] + processedValue[1] +':00');
			}
			return time;
		}
	}
})()