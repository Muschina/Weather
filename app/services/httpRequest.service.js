(function() {
    angular
        .module('weatherServices', ['ngResource'])
        .factory('WeatherService', WeatherService)
        .factory('CityIPService', CityIPService);

        WeatherService.$inject = ['$resource'];
        CityIPService.$inject = ['$resource'];

      
      function WeatherService($resource){
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
      }

      function CityIPService($resource){
        return $resource('http://ua.sxgeo.city', {}, {get: {method: 'GET', isArray:false}
        });        
      }
  })();