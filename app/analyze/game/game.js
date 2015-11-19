'use strict';

function makeRounds(gamelog) {
    var r1start, r2start, r3start, r4start, r5start, r6start, poststart;

    for(var i = 0; i < gamelog.length; i++) { 
        var action = gamelog[i];
        if(action.comment === "Round 1 income" && !r1start) { 
            r1start = i;
        }
        else if(action.comment === "Round 2 income" && !r2start) { 
            r2start = i;
        }
        else if(action.comment === "Round 3 income" && !r3start) { 
            r3start = i;
        }
        else if(action.comment === "Round 4 income" && !r4start) { 
            r4start = i;
        }
        else if(action.comment === "Round 5 income" && !r5start) { 
            r5start = i;
        }
        else if(action.comment === "Round 6 income" && !r6start) { 
            r6start = i;
        }
        else if(action.comment && action.comment.indexOf("Scoring") > -1 && 
            poststart == undefined) { 
            poststart = i;
        }
    }

    var pre, r1, r2, r3, r4, r5, r6, post;

    pre = gamelog.slice(0, r1start);
    r1 = gamelog.slice(r1start, r2start);
    r2 = gamelog.slice(r2start, r3start);
    r3 = gamelog.slice(r3start, r4start);
    r4 = gamelog.slice(r4start, r5start);
    r5 = gamelog.slice(r5start, r6start);
    r6 = gamelog.slice(r6start, poststart);
    post = gamelog.slice(poststart);

    return [pre, r1, r2, r3, r4, r5, r6, post];
}

function analyzeRound(round, factions) { 
    var turns = {};
    for(var i = 0; i < factions.length; i++) { 
        turns[factions[i]] = 0;
    }

    for(var i = 0; i < round.length; i++) { 
        if(round[i].faction) { 
            turns[round[i].faction]++;
        }
    }

    return turns;
}

function analyzeGame(game) { 
    var stats = {};

    var rounds = makeRounds(game.gamelog);
    var pre, r1, r2, r3, r4, r5, r6, post;
    pre = rounds[0];
    r1 = rounds[1];
    r2 = rounds[2];
    r3 = rounds[3];
    r4 = rounds[4];
    r5 = rounds[5];
    r6 = rounds[6];
    post = rounds[7];

    var factions = ["swarmlings", "auren", "chaosmagicians", "alchemists"];
    var r1turns = analyzeRound(r1, factions);
    var r2turns = analyzeRound(r2, factions);
    var r3turns = analyzeRound(r3, factions);
    var r4turns = analyzeRound(r4, factions);
    var r5turns = analyzeRound(r5, factions);
    var r6turns = analyzeRound(r6, factions);

    var factionTurns = {};
    for(var i = 0; i < factions.length; i++) { 
        var ft = [];
        ft.push(r1turns[factions[i]]);
        ft.push(r2turns[factions[i]]);
        ft.push(r3turns[factions[i]]);
        ft.push(r4turns[factions[i]]);
        ft.push(r5turns[factions[i]]);
        ft.push(r6turns[factions[i]]);
        factionTurns[factions[i]] = ft;
    }

    stats.factions = [];
    for(var i = 0; i < factions.length; i++) { 
        var faction = {};
        faction.name = factions[i];
        faction.turns = factionTurns[faction.name];
        stats.factions.push(faction);
    }

    return stats;
}

function parseFakeWitchesData(game) { 
    var engineSetup = {
        players: {
            witches: makePlayer("witches")
        },
        rounds: {
            "1": { roundNum: 1, scoreTile: "SCORE1" },
            "2": { roundNum: 2, scoreTile: "SCORE5" }
        }
    };

    var setup = makeRulesEngine();
    var parsedLog = parseLog(parser, game.gamelog);

    var scorecards = processCommands(engineSetup, setup.rules, parsedLog, game.gamelog);

    return scorecards;
}

function parseAurenGame(game) { 
    var engineSetup = {
        players: {
            "swarmlings": makePlayer("swarmlings"),
            "auren": makePlayer("auren"),
            "alchemists": makePlayer("alchemists"),
            "chaosmagicians": makePlayer("chaosmagicians")
        },
        rounds: {
            "1": { roundNum: 1, scoreTile: "SCORE5" },
            "2": { roundNum: 2, scoreTile: "SCORE8" },
            "3": { roundNum: 3, scoreTile: "SCORE2" },
            "4": { roundNum: 4, scoreTile: "SCORE6" },
            "5": { roundNum: 5, scoreTile: "SCORE7" },
            "6": { roundNum: 6, scoreTile: "SCORE4" },
        }
    };

    var setup = makeRulesEngine();
    var parsedLog = parseLog(parser, game.gamelog);

    var scoreCards = processCommands(engineSetup, setup.rules, parsedLog, game.gamelog);

    return scoreCards;

}



angular.module('wd.analyze.game', ['ngRoute', 'wd.data.game', 'wd.data.fake'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

.controller('AnalyzeGameCtrl', ['$scope', 'DataGameSrv', 'FakeDataGameSrv', 'd3',
    function($scope, DataGameSrv, FakeDataGameSrv, d3) {    
        var game = DataGameSrv.game;
        $scope.gamestats = analyzeGame(game);   
        $scope.auren = parseAurenGame(game);


        // var fake = FakeDataGameSrv.game;
        // $scope.fakeWitches = parseFakeWitchesData(fake);
}]);