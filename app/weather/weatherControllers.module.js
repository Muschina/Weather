'use strict';
(function() {
		angular
		.module('weatherControllers', [
			'ui.bootstrap', 
			'ngSanitize'])
		.config(config);

		config.$inject = ['$uibTooltipProvider'];

		function config($uibTooltipProvider) {
			$uibTooltipProvider.setTriggers({'focus':'blur'});
		}	
})()