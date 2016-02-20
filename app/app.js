'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'wd.analyze.game',
  'wd.analyze.faction',
  'wd.shared',
  'wd.process',
  'wd.parse',
  'd3'
])
.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
        $routeProvider.otherwise({redirectTo: '/analyze/game'});

        $locationProvider.html5Mode(true);
}]);