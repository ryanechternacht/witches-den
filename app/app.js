'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'wd.analyze.game',
  'wd.shared',
  'wd.process',
  'wd.parse',
  'd3'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/analyze/game'});
}]);