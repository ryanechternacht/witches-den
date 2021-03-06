'use strict';

var _ = require('underscore');

AnalyzeGameCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'd3', 'format', 'rulesengine', 'parser'];
module.exports = AnalyzeGameCtrl;

function AnalyzeGameCtrl($scope, $http, $location, $routeParams, d3, format, rulesengine, parser) {
    // text box on top of screen
        $scope.analyzeGame = function(game) { 
        var path = "/analyze/game/" + game;
        $location.path(path);
    }

    $scope.loading = false;
    $scope.loaded = false;

    if($routeParams.game) {
        $scope.loaded = false;
        $scope.loading = true;
        $scope.gamestats = null;
        $scope.format = null;
        $scope.gamename = $routeParams.game;

        //TODO refactor this to a service?
        $http({ method: 'GET', url: '/data/game/' + $routeParams.game })
            .then(function(response) { 
                if(response.data) { 
                    $scope.loaded = true;
                    $scope.gamestats = parseGame(response.data, rulesengine, 
                        parser);
                    $scope.format = format.buildFormatForAnalyzeGame($scope.gamestats);
                    $scope.gameIncomplete = !$scope.gamestats.gameComplete;
                } else {
                    $scope.loadError = true;
                }
                $scope.loading = false;
            });
    }
}

var parseGame = function(gamelog, rulesengine, parser) { 
    var parsedLog = parser.parseLog(gamelog);

    var engineSetup = rulesengine.setupEngine(parsedLog, gamelog);

    var scoreCards = rulesengine.processCommands(engineSetup, parsedLog, gamelog);
    var players = _.sortBy(scoreCards, 'total').reverse();

    var gameComplete = rulesengine.checkGameComplete(parsedLog);

    var results = rulesengine.buildGameResults(players);

    return { 
        factions: players, 
        bonuses: engineSetup.bonuses,
        rounds: engineSetup.rounds,
        fireAndIceBonus: engineSetup.fireAndIceBonus,
        gameComplete: gameComplete,
        results: results
    };
}