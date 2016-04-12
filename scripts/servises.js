
var weatherServices = angular.module('weatherServices', ['ngResource']);

weatherServices.factory('WeatherList', ['$resource',
  function($resource){
    return $resource('http://api.worldweatheronline.com/premium/v1/weather.ashx?'+
            'key=:key&' + 
            'q=:q&' +
            'num_of_days=:num_of_days&' +
            'tp=:tp&' +
            'format=:format&', 
            {}, {
        get: {method:'GET', params:{             
            key:'620dfd5bd50a4b91b8e200858160904',
            q: 'Kiev',
            num_of_days: 4,
            tp: 6,
            format: 'json'
        }, isArray:false}
    });
  }]);

var cityIPServices = angular.module('cityIPServices', ['ngResource']);

cityIPServices.factory('cityIP', ['$resource',
  function($resource){
    return $resource('http://ua.sxgeo.city', {}, {get: {method: 'GET', isArray:false}
    });
  }]);