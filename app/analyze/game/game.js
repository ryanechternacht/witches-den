'use strict';

var parseGame = function(gamelog, rulesengine) { 
    // var setup = makeRulesEngine();
    var parsedLog = parseLog(parser, gamelog);

    // var engineSetup = setupEngine(parsedLog, gamelog);
    var engineSetup = rulesengine.setupEngine(parsedLog, gamelog);

    // var scoreCards = processCommands(engineSetup, setup.rules, parsedLog, gamelog);
    var scoreCards = rulesengine.processCommands(engineSetup, parsedLog, gamelog);
    var players = _.sortBy(scoreCards, 'total').reverse();

    return { factions: players, rounds: engineSetup.rounds };
}

angular.module('wd.analyze.game', ['ngRoute', 'wd.shared', 'wd.process'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

.controller('AnalyzeGameCtrl', ['$scope', '$http', 'd3', 'shared', 'rulesengine',
    function($scope, $http, d3, shared, rulesengine) {    
        $scope.analyzeGame = function(game) { 
            $('#load-block-error').addClass('hidden');
            $('#load-block-loading').removeClass('hidden');
            $scope.gamestats = null;

            //TODO refactor this to a service?
            $http({ method: 'GET', url: '/data/game/' + game })
                .then(function(response) { 
                    if(response.data) { 
                        $scope.gamestats = parseGame(response.data, rulesengine);
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
