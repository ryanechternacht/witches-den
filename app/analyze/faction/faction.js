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
    
        $scope.faction = $routeParams.faction;

        if($scope.faction) { 
            $http({ method: 'GET', url: '/data/faction/' + $scope.faction })
                .then(function(response) { 
                    if(response.data)  {
                        $scope.factionData = response.data;
                    }
                });
        }

        $scope.factionImg = getFactionImage($scope.faction)

        function getFactionImage(faction) { 
            var img = "";
            if(faction.toUpperCase() == "DWARVES") { img = "volk_7_300.jpg"; }
            else if(faction.toUpperCase() == "ENGINEERS") { img = "volk_8_300.jpg"; }
            else if(faction.toUpperCase() == "CHAOSMAGICIANS") { img = "volk_3_300.jpg"; }
            else if(faction.toUpperCase() == "GIANTS") { img = "volk_4_300.jpg"; }
            else if(faction.toUpperCase() == "FAKIRS") { img = "volk_1_300.jpg"; }
            else if(faction.toUpperCase() == "NOMADS") { img = "volk_2_300.jpg"; }
            else if(faction.toUpperCase() == "HALFLINGS") { img = "volk_9_300.jpg"; }
            else if(faction.toUpperCase() == "CULTISTS") { img = "volk_10_300.jpg"; }
            else if(faction.toUpperCase() == "ALCHEMISTS") { img = "volk_11_300.jpg"; }
            else if(faction.toUpperCase() == "DARKLINGS") { img = "volk_12_300.jpg"; }
            else if(faction.toUpperCase() == "SWARMLINGS") { img = "volk_5_300.jpg"; }
            else if(faction.toUpperCase() == "MERMAIDS") { img = "volk_6_300.jpg"; }
            else if(faction.toUpperCase() == "AUREN") { img = "volk_13_300.jpg"; }
            else if(faction.toUpperCase() == "WITCHES") { img = "volk_14_300.jpg"; }

            return "http://www.terra-mystica-spiel.de/img/" + img;
        }
}]);
