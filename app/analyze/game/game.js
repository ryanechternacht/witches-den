'use strict';

var parseGame = function(gamelog, rulesengine, parser) { 
    var parsedLog = parser.parseLog(gamelog);

    var engineSetup = rulesengine.setupEngine(parsedLog, gamelog);

    var scoreCards = rulesengine.processCommands(engineSetup, parsedLog, gamelog);
    var players = _.sortBy(scoreCards, 'total').reverse();

    return { 
        factions: players, 
        rounds: engineSetup.rounds,
        fireAndIceBonus: engineSetup.fireAndIceBonus
    };
}

angular.module('wd.analyze.game', ['ngRoute', 'wd.shared', 'wd.process', 'wd.parse'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

.controller('AnalyzeGameCtrl', ['$scope', '$http', 'd3', 'format', 'rulesengine', 
    'parser', function($scope, $http, d3, format, rulesengine, parser) {    
        $scope.analyzeGame = function(game) { 
            $scope.loaded = false;
            $scope.loading = true;
            $scope.gamestats = null;
            $scope.format = null;
            $scope.gamename = game;

            //TODO refactor this to a service?
            $http({ method: 'GET', url: '/data/game/' + game })
                .then(function(response) { 
                    if(response.data) { 
                        $scope.loaded = true;
                        $scope.gamestats = parseGame(response.data, rulesengine, 
                            parser);
                        $scope.format = format.buildFormat($scope.gamestats);
                    } else {
                        $scope.loaded = false;
                        $scope.loadError = true;
                    }
                    $scope.loading = false;
                });
        };
        
        $scope.loading = false;
        $scope.loaded = false;
        $scope.game = '';

        //load test data
        // $scope.analyzeGame('onion');
}]);
