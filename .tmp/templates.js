angular.module("weatherApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/header/header.html","<div class=header><div class=\"navbar navbar-default\" role=navigation><div class=container><div class=navbar-header><span class=GithubLink><a href=https://github.com/Muschina/Weather>Code on Github</a></span></div></div></div></div>");
$templateCache.put("app/weather/weather.html","<div class=container><div class=row><div class=col-sm-12><h2 class=\"title margin-bottom-20\">Weather in the {{weather.city}}, {{weather.date | date:\'longDate\'}}</h2></div></div><div class=row><div class=col-sm-3><form name=datepicker class=input-group><input type=text class=form-control uib-datepicker-popup ng-model=weather.date is-open=weather.popup.opened datepicker-options=weather.options dp.select=weather.changeDate(weather.date) ng-required=true close-text=Close uib-tooltip=\"Enter the date in format: \'yyyy-mm-dd\' or select it in the calendar\" tooltip-placement=top placeholder={{weather.date}}> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=weather.openPopup()><i class=\"glyphicon glyphicon-calendar\"></i></button></span></form></div><div class=col-sm-9><div class=\"row container-height\"><form name=cityForm ng-submit=weather.cityChange(city) class=form-horizontal novalidate><div class=col-sm-4><div class=\"form-group form-group-md\"><label class=\"col-sm-3 control-label\" for=City>City:</label><div class=col-sm-9><select name=citySelect class=form-control ng-model=$parent.city ng-options=\"f for f in weather.cityList\"><option value>{{weather.city}}</option></select></div></div></div><div class=col-sm-6><div class=form-group><div class=right-inner-addon><span class=\"glyphicon glyphicon-search\"></span> <input name=cityInput type=search class=form-control ng-model=$parent.city ng-pattern=weather.matchPattern required placeholder=\"Input city or coordinates\" uib-tooltip=\"Write the city on Latin letters or enter the latitude and longitude coordinates in the format \'11.11,22.22\'(latitude range - [-45, 45], longitude range - [-180, 180])\" tooltip-placement=top></div><div class=\"panel panel-danger margin-bottom-0\" ng-show=\"cityForm.cityInput.$invalid && cityForm.cityInput.$dirty\"><div class=\"panel-title error\">{{weather.getError(cityForm.cityInput.$error)}}</div></div><div class=\"panel panel-danger margin-bottom-0\" ng-show=weather.responseError.status><div class=\"panel-title error\">{{weather.responseError.message}}</div></div></div></div><div class=col-sm-2><button type=submit class=\"btn btn-default\" ng-disabled=cityForm.$invalid>Select</button></div></form></div></div></div><div class=row><ul><li ng-repeat=\"itemWeather in weather.listOfWeatherResults\" class=\"col-sm-4 col-lg-3 post-container\"><h4 class=title>Time: <strong>{{itemWeather.time | timeFilter}}</strong></h4><div class=col-sm-4><img class=\"img-responsive image-size\" ng-src={{itemWeather.img}} alt={{itemWeather.alt}}></div><div class=col-sm-8><p>C&deg; - {{itemWeather.tempC}}</p><p>Wind speed - {{itemWeather.windSpeed | windSpeed}}(m/s)</p><p>{{itemWeather.alt}}</p></div></li></ul></div><div class=footer><p>Weather footer</p></div></div>");}]);