'use strict';

angular.module('wd.shared', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: 'shared/about.html',
        controller: 'AboutCtrl'
    });
}])

.controller('AboutCtrl', ['$scope', function($scope) { 



}]);