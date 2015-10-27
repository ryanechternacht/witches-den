'use strict';

angular.module('myApp.analyze', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

.factory('AnalyzeGameSrv', ['$resource', function($resource){
    return $resource('data/:game.json', {}, {
        get: {method:'GET'}
    });
}])

.controller('AnalyzeGameCtrl', ['$scope', 'AnalyzeGameSrv', function($scope, AnalyzeGameSrv) { 
    $scope.gamelog = AnalyzeGameSrv.get({game:'game1'});
}]);