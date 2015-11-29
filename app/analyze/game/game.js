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

// I could use this for localization
function buildPrettyStrings() { 
    var a = new Array();

    //Factions
    a["swarmlings"] = "Swarmlings";
    a["mermaids"] = "Mermaids";
    a["witches"] = "Witches";
    a["auren"] = "Auren";
    a["dwarves"] = "Dwarves";
    a["engineers"] = "Engineers";
    a["chaosmagicians"] = "Chaos Magicians";
    a["giants"] = "Giants";
    a["nomads"] = "Nomads";
    a["fakirs"] = "Fakirs";
    a["halflings"] = "Halflings";
    a["cultists"] = "Cultists";
    a["darklings"] = "Darklings";
    a["alchemists"] = "Alchemists";

    // simple
    a["starting"] = "Starting";
    a["round"] = "Round";
    a["bonus"] = "Bonus";
    a["town"] = "Town";
    a["advance"] = "Ship/Dig Track";
    a["endGameCult"] = "Cult Track";
    a["endGameNetwork"] = "Network";
    a["endGameResources"] = "Unused Resources";
    a["leech"] = "Leech";
    a["fav"] = "Favors";
    a["faction"] = "Faction";

    return a;
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

        $scope.pretty = buildPrettyStrings();
}]);