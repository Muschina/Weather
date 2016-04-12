'use strict';

var weatherApp = angular.module('weatherApp', [
   'ngRoute',
   'weatherControllers',
   'weatherServices',
   'cityIPServices'
]);

weatherApp.config(function ($routeProvider) {
    $routeProvider
      .when('/weather', {
        templateUrl: 'partials/weather-list.html',
        controller: 'weatherCtrl'
      })
      .otherwise({
        redirectTo: '/weather'
      });
  });