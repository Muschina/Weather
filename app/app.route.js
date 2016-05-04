'use strict';
(function() {
  angular
    .module('weatherApp')
    .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
      $routeProvider
        .when('/weather', {
          templateUrl: 'app/weather/weather.html',
          controller: 'weatherCtrl',
          controllerAs: 'weather',
          resolve: {
            CityIPPrepService: function(CityIPService) {
              console.log(CityIPService);
              return CityIPService.success(function (response) {
                    return response;                       
                });
            },
            CityListPrepService: function(CityListService) {
              console.log(CityListService);
              return CityListService.success(function (response) {
                    return response;                       
                });
            }
          }
        })
        .otherwise({
          redirectTo: '/weather'
        });
    }
})();
