'use strict';

var parseGame = function(game) { 
    var setup = makeRulesEngine();
    var parsedLog = parseLog(parser, game.gamelog);

    var engineSetup = setupEngine(parsedLog, game.gamelog);

    var scoreCards = processCommands(engineSetup, setup.rules, parsedLog, game.gamelog);

    var players = _.sortBy(scoreCards, 'total').reverse();

    return { factions: players, rounds: engineSetup.rounds };
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
        $scope.analyzeGame = function(game) { 
            $('#load-block-error').addClass('hidden');
            $('#load-block-loading').removeClass('hidden');
            $scope.gamestats = null;
            $scope.detailedStats = null;

            //TODO refactor this to a service?
            $http({ method: 'GET', url: '/data/game/' + game })
                .then(function(response) { 
                    if(response.data) { 
                        $scope.gamestats = parseGame({ gamelog: response.data });
                        var s = shared.init($scope.gamestats);
                        $scope.simpleOrdering = s.simpleOrdering;
                        $scope.detailedOrdering = s.detailedOrdering;
                        $scope.pretty = s.pretty;
                        $scope.detailedStats = s.detailedStats;
                    } else {
                        $('#load-block-error').removeClass('hidden');
                    }
                    $('#load-block-loading').addClass('hidden');
                });
            };
        
        //load test data
        $scope.analyzeGame('onion');
}]);
