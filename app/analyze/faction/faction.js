'use strict';

angular.module('wd.analyze.faction', ['ngRoute', 'wd.shared'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/faction/:faction?', {
        templateUrl: '/analyze/faction/faction.html', 
        controller: 'AnalyzeFactionCtrl'
    });
}])

.controller('AnalyzeFactionCtrl', ['$scope', '$http', '$location', '$routeParams', 'd3', 'format', 
    function($scope, $http, $location, $routeParams, d3, format) {    
    
        if($routeParams.faction) { 
            $http({ method: 'GET', url: '/data/faction/' + $routeParams.faction })
                .then(function(response) { 
                    if(response.data)  {
                        $scope.faction = response.data;
                    }
                });
        }
}]);
