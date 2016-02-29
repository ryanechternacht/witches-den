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
    
        // $scope.faction = {
        //     name: 'cultists',
        //     total: [
        //         {key: '90-99',   value: 1},
        //         {key: '100-109', value: 3},
        //         {key: '110-119', value: 3},
        //         {key: '120-129', value: 5},
        //         {key: '130-139', value: 8},
        //         {key: '140-149', value: 15},
        //         {key: '150-159', value: 7},
        //         {key: '160-169', value: 6},
        //         {key: '170-179', value: 4},
        //         {key: '180-189', value: 1}
        //     ]
        // };

        // $scope.getFactionData = function(faction) { 
        //     var path = "/analyze/faction/" + faction;
        //     $location.path(path);
        // }

        if($routeParams.faction) { 
            $http({ method: 'GET', url: '/data/faction/' + $routeParams.faction })
                .then(function(response) { 
                    if(response.data)  {
                        $scope.faction = response.data;
                    }
                });
        }
}]);
