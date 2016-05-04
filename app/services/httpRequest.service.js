(function() {
    angular
        .module('weatherServices')
        .factory('WeatherService', WeatherService)
        .factory('CityIPService', CityIPService)
        .factory('CityListService', CityListService)
        .value('CityValue', {cityValue: 'Donetsk'});

        WeatherService.$inject = ['$resource'];
        CityIPService.$inject = ['$http'];
        CityListService.$inject = ['$http'];

      
      function WeatherService($resource){
       
        return $resource('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=620dfd5bd50a4b91b8e200858160904&format=json&num_of_days=10&tp=3' 
          , {}, {
            get: {metod: 'GET', params: {q: 'Poltava'}, isArray:false}
          });
      }

      function CityIPService($http){
        return $http.get('http://ua.sxgeo.city', {cache: true});        
      }

      function CityListService($http){
        return $http.get('../../data/sityArray.json', {cache: true});        
      }     
  })();

     
       