'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'wd.analyze.game',
  'wd.data.game',
  'wd.data.fake',
  'd3'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/analyze/game'});
}]);
