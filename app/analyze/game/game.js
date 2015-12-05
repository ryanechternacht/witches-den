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

    return { factions: scoreCards, rounds: engineSetup.rounds };
}

// I could use this for localization
function buildPrettyStrings(rounds) { 
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

    // detailed
    a["bon6"] = "Bonus 6 (pass SH/SA * 4)";
    a["bon7"] = "Bonus 7 (pass TP * 2)";
    a["bon9"] = "Bonus 9 (pass D * 1)";
    a["bon10"] = "Bonus 10 (pass ship * 3)";
    a["advanceDig"] = "Advance Dig";
    a["advanceShip"] = "Advance Ship";
    a["endGameFire"] = "Fire Track";
    a["endGameWater"] = "Water Track";
    a["endGameEarth"] = "Earth Track";
    a["endGameAir"] = "Air Track";
    a["fav10"] = "Favor 10 (TP >> 3)";
    a["fav11"] = "Favor 11 (D >> 2)";
    a["fav12"] = "Favor 12 (pass TP [0,2,2,3,4])"

    var s = new Array();
    s["SCORE1"] = "Score 1 (SPD >> 2)";
    s["SCORE2"] = "Score 2 (TOWN >> 5)";
    s["SCORE3"] = "Score 3 (D >> 2)";
    s["SCORE4"] = "Score 4 (SH/SA >> 5)";
    s["SCORE5"] = "Score 5 (D >> 2)";
    s["SCORE6"] = "Score 6 (TP >> 3)";
    s["SCORE7"] = "Score 7 (SH/SA >> 5)";
    s["SCORE8"] = "Score 8 (TP >> 3)";
    s["SCORE9"] = "Score 9 (TE >> 4)";




    // rounds (built from round info)
    for(var i = 0; i < rounds.length; i++) { 
        var r = rounds[i];
        a[r.scoreTile] = "Round " + r.roundNum + " - " + s[r.scoreTile];
    }

    return a;
}



angular.module('wd.analyze.game', ['ngRoute', 'wd.data.game'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

// .filter('toKeyValue', function() { 
//     return function(obj) {
//         if (!(obj instanceof Object)) return obj;
        
//         var list = [];
//         // var keys = _.sortBy(_.keys(obj), function(k) { return k; });
//         var raw = _.keys(obj);
//         var keys = _.sortBy(raw, function(k) { return k; });

//         for(var i = 0; i < keys.length; i++) { 
//             var key = keys[i];
//             list.push({key: key, value: obj[key]});
//         }

//         return list;

//         // return _.map(obj, function(val, key) {
//         //     return Object.defineProperty(val, '$key', {__proto__: null, value: key});
//         // });
//         // return _.sortBy(obj, function(item) { return item.key; });
//     }
// })

.controller('AnalyzeGameCtrl', ['$scope', 'DataGameSrv', 'd3',
    function($scope, DataGameSrv, d3) {    
        var game = DataGameSrv.game;
        $scope.gamestats = parseAurenGame(game);

        $scope.pretty = buildPrettyStrings($scope.gamestats.rounds);
}]);
