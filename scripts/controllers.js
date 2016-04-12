'use strict';

var weatherControllers = angular.module('weatherControllers', ['ui.bootstrap', 'ngSanitize'])

//----------------------------------------------------------------------------------------------
//                          GETTING NEWS LIST
//----------------------------------------------------------------------------------------------

weatherControllers.controller('weatherCtrl', ['WeatherList', 'cityIP',
	function( WeatherList, cityIP) {
		var context = this;
		this.city = "Donetsk";
		this.listOfWeatherResults = [];

		cityIP.get({}, function(result) {
			console.log(result);
			result.$promise.then(function (response) {
				context.city = response.city.name_en;
				weatherSendRequest(context.city);
			}, function (reason) {
				console.log(reason.message);
			});
			
		});

		function weatherSendRequest(town) {
			WeatherList.get({q: town}, function(result) {		
			result.$promise.then(function (response) {
				context.weather = response.data.weather;		
				fillArrayWithWetherData(context.weather);	
			}, function (reason) {
				console.log(reason.message);
			});	
						
			});
		}
		function fillArrayWithWetherData (obj) {
			obj.forEach( function(element, index) {
				context.listOfWeatherResults[index] = {};
				context.listOfWeatherResults[index].date = element.date;
				context.listOfWeatherResults[index].minTemperature = element.maxtempC;
				context.listOfWeatherResults[index].maxTemperature = element.mintempC;
				context.listOfWeatherResults[index].img = element.hourly[1].weatherIconUrl[0].value;
				context.listOfWeatherResults[index].alt = element.hourly[1].weatherDesc[0].value;
				
			});
			
		}
	}]);