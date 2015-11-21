'use strict';

function parseAurenGame(game) { 
    var engineSetup = {
        // players: [
        //     { swarmlings: makePlayer("swarmlings") },
        //     { auren: makePlayer("auren") },
        //     { alchemists: makePlayer("alchemists") },
        //     { chaosmagicians: makePlayer("chaosmagicians") }
        // ],
        players: [
            makePlayer("swarmlings"),
            makePlayer("auren"),
            makePlayer("alchemists"),
            makePlayer("chaosmagicians"),
        ],
        rounds: [
            { roundNum: 1, scoreTile: "SCORE5" },
            { roundNum: 2, scoreTile: "SCORE8" },
            { roundNum: 3, scoreTile: "SCORE2" },
            { roundNum: 4, scoreTile: "SCORE6" },
            { roundNum: 5, scoreTile: "SCORE7" },
            { roundNum: 6, scoreTile: "SCORE4" }
        ]
    };

    var setup = makeRulesEngine();
    var parsedLog = parseLog(parser, game.gamelog);

    var scoreCards = processCommands(engineSetup, setup.rules, parsedLog, game.gamelog);



    return { factions: scoreCards };
}



angular.module('wd.analyze.game', ['ngRoute', 'wd.data.game'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

.controller('AnalyzeGameCtrl', ['$scope', 'DataGameSrv', 'd3',
    function($scope, DataGameSrv, d3) {    
        var game = DataGameSrv.game;
        $scope.gamestats = parseAurenGame(game);   
}]);