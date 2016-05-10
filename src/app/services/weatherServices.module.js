'use strict';
(function() {
    angular.module('weatherServices', ['ngResource'])
    .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
    	$httpProvider.interceptors.push(weatherResponseError);

    	function weatherResponseError() {
    		return {
    			response: function(response) {
    				if (response.data.data) {
	    				if(response.data.data.error || response.data.data.ClimateAverages === null) {  
                            response.data.data.errorMessage = 'Unable to find any matching weather location to the query submitted!';/* jshint ignore:line */ 
	    				}
	    			}
    				return response;
    			}
    		};
    	}
    }
})();