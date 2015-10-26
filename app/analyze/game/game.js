'use strict';

angular.module('myApp.analyze', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])
.controller('AnalyzeGameCtrl', [function() { 

}]);