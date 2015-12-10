'use strict';

function parseGame(game) { 
    var setup = makeRulesEngine();
    var parsedLog = parseLog(parser, game.gamelog);

    var engineSetup = setupEngine(parsedLog, game.gamelog);

    var scoreCards = processCommands(engineSetup, setup.rules, parsedLog, game.gamelog);

    return { factions: scoreCards, rounds: engineSetup.rounds };
}

angular.module('wd.analyze.game', ['ngRoute', 'wd.shared'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

.controller('AnalyzeGameCtrl', ['$scope', '$http', 'd3', 'shared',
    function($scope, $http, d3, shared) {    
        $scope.detailedOrdering = shared.buildDetailedOrdering();
        $scope.simpleOrdering = buildSimpleOrdering();

        $scope.analyzeGame = function(game) { 
            $('#load-block-error').addClass('hidden');
            $('#load-block-loading').removeClass('hidden');
            $scope.gamestats = null;

            //TODO refactor this to a service?
            $http({ method: 'GET', url: '/data/game/' + game })
                .then(function(response) { 
                    if(response.data) { 
                        $scope.gamestats = parseGame({ gamelog: response.data });
                        $scope.pretty = shared.buildPrettyStrings($scope.gamestats.rounds);
                    } else {
                        $('#load-block-error').removeClass('hidden');
                    }
                    $('#load-block-loading').addClass('hidden');
                });
            };
        
        //load test data
        $http({ method: 'GET', url: '/data/test' })
            .then(function(response) { 
                $scope.gamestats = parseGame({ gamelog: response.data });
                $scope.pretty = buildPrettyStrings($scope.gamestats.rounds);
        });
}]);
