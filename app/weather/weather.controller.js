'use strict';
(function() {
		angular
		.module('weatherControllers', ['ui.bootstrap'])		
		.controller('weatherCtrl', weatherCtrl);

		weatherCtrl.$inject = ['WeatherService',	'CityIPPrepService', 'CityListPrepService', '$filter', '$scope'];

		function weatherCtrl(WeatherService, CityIPPrepService, CityListPrepService, $filter, $scope) {
			var weather = this;
			weather.listOfWeatherResults = [];

			weather.city = CityIPPrepService.data.city.name_en;
			weather.weatherData = null;			
			weather.cityList = CityListPrepService.data.cityList;
			
			weather.date = $filter('date')(new Date(), 'yyyy-MM-dd');;
			weather.cityChange = cityChange;		
			
			weather.popup = {opened: false};
			weather.openPopup = openPopup;
			weather.options = {
		    startingDay: "1",
		    minDate: new Date(),
		    maxDate: getDate(new Date())
		  }
		  weather.matchPattern = new RegExp("^[A-z- ]{0,50}$|^[0-9,.]{0,20}$");
		  weather.getError = getError;
		  weatherSendRequest(weather.city);

		  $scope.$watch('weather.date', function(newValue) {
		  	if(weather.weatherData) {
				sendRequest(newValue);
			}
			});
	 
	 		function weatherSendRequest(town) {
	 			WeatherService.get({q: town}, function(result) {		
		 			result.$promise.then(function (response) {
		 				weather.weatherData = response.data.weather;		
		 				viewWetherData(weather.date);	
		 			}, function (reason) {
		 				console.log(reason.message);
		 			});		 						
	 			});
	 		}		

			function sendRequest(newDate) {
				weather.date = $filter('date')(newDate, 'yyyy-MM-dd');
				viewWetherData(weather.date);
			}

			function viewWetherData(date) {
				var wetherDataOfChooseDate = weather.weatherData.filter(function (item) {
					return item.date === date;
				});
				console.log(wetherDataOfChooseDate);
				wetherDataOfChooseDate[0].hourly.forEach( function(element, index) {
					weather.listOfWeatherResults[index] = {};
					weather.listOfWeatherResults[index].time = element.time;
					weather.listOfWeatherResults[index].tempC = element.tempC;	
					weather.listOfWeatherResults[index].windSpeed = element.windspeedKmph;				
					weather.listOfWeatherResults[index].img = element.weatherIconUrl[0].value;
					weather.listOfWeatherResults[index].alt = element.weatherDesc[0].value;				
				});
			}		

			function openPopup() {
				weather.popup.opened = true;
			}

			function cityChange(city) {
					weather.city = city;
					weather.weatherData = weatherSendRequest(weather.city);				
			}

			function getError (error) {
				if (angular.isDefined(error)) {
          if (error.pattern) {
                return "City name should to consist only Latin letters, numbers and characters '-', ',' and '.'";           
        	}
				}
			}

			function getDate(date) {
				var day = date.getDate() + 9;
				var month = date.getMonth();
				var year = date.getFullYear();
				return new Date(year, month, day);
			}
		}
})();