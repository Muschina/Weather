'use strict';
(function() {
  angular
    .module('weatherApp')
    .config(config);

    function config($routeProvider) {
      $routeProvider
        .when('/weather', {
          templateUrl: 'app/components/weather.html',
          controller: 'weatherCtrl',
          controllerAs: 'weather',
          resolve: {
            CityIPPrepService: function(CityIPService) {
              console.log(CityIPService.get());
              return CityIPService.get().$promise.then(function (response) {
                    return response.city.name_en;                       
                }, function (reason) {
                    console.log(reason.message);
                });   
            },
            WeatherPrepService: function(WeatherService) {
              console.log(WeatherService.get());
              return WeatherService.get().$promise.then(function (response) {
                    return response.data.weather;                       
                }, function (reason) {
                    console.log(reason.message);
                }); 
            }
          }
        })
        .otherwise({
          redirectTo: '/weather'
        });
    }
})();
