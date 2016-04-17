'use strict';
(function() {
		angular
		.module('weatherControllers', ['ngSanitize'])
		.controller('weatherCtrl', weatherCtrl);

		weatherCtrl.$inject = ['WeatherPrepService',	'CityIPPrepService'];

		function weatherCtrl( WeatherPrepService, CityIPPrepService) {
			var vm = this;
			vm.city = "";
			vm.listOfWeatherResults = [];

			vm.city = CityIPPrepService;
			vm.weather = WeatherPrepService;		
				
			vm.weather.forEach( function(element, index) {
				vm.listOfWeatherResults[index] = {};
				vm.listOfWeatherResults[index].date = element.date;
				vm.listOfWeatherResults[index].maxTemperature = element.maxtempC;
				vm.listOfWeatherResults[index].minTemperature = element.mintempC;
				vm.listOfWeatherResults[index].img = element.hourly[1].weatherIconUrl[0].value;
				vm.listOfWeatherResults[index].alt = element.hourly[1].weatherDesc[0].value;				
			});
						
		}
})();