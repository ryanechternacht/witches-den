'use strict';

function parseGame(game) { 
    var setup = makeRulesEngine();
    var parsedLog = parseLog(parser, game.gamelog);

    var engineSetup = setupEngine(parsedLog, game.gamelog);

    var scoreCards = processCommands(engineSetup, setup.rules, parsedLog, game.gamelog);

    var players = _.sortBy(scoreCards, 'total').reverse();

    return { factions: players, rounds: engineSetup.rounds };
}

function buildDetailedStats(scoreCards, ordering, pretty) { 
    var obj = {};

    for(var i = 0; i < ordering.length; i++) { 
        var key = ordering[i];
        var players = [];
        for(var j = 0; j < scoreCards.length; j++) { 
            var sc = scoreCards[j];
            players.push(sc.detailed[key]);
        }
        obj[pretty[key] || key] = players;
    }

    return obj;
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
                        $scope.detailedStats = buildDetailedStats($scope.gamestats.factions, 
                            $scope.detailedOrdering, $scope.pretty);
                    } else {
                        $('#load-block-error').removeClass('hidden');
                    }
                    $('#load-block-loading').addClass('hidden');
                });
            };
        
        //load test data
        $scope.analyzeGame('onion');
}]);
