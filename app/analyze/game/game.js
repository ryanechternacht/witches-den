'use strict';

function makeRounds(gamelog) {
    var r1start, r2start, r3start, r4start, r5start, r6start, poststart;

    for(var i = 0; i < gamelog.length; i++) { 
        var action = gamelog[i];
        if(action.comment === "Round 1 income") { 
            r1start = i;
        }
        else if(action.comment === "Round 2 income") { 
            r2start = i;
        }
        else if(action.comment === "Round 3 income") { 
            r3start = i;
        }
        else if(action.comment === "Round 4 income") { 
            r4start = i;
        }
        else if(action.comment === "Round 5 income") { 
            r5start = i;
        }
        else if(action.comment === "Round 6 income") { 
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

    stats.pre = pre;
    stats.r1 = r1;
    stats.r2 = r2;
    stats.r3 = r3;
    stats.r4 = r4;
    stats.r5 = r5;
    stats.r6 = r6;
    stats.post = post;

    return stats;
}



angular.module('wd.analyze.game', ['ngRoute', 'wd.data.game'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/analyze/game', {
        templateUrl: 'analyze/game/game.html', 
        controller: 'AnalyzeGameCtrl'
    });
}])

.controller('AnalyzeGameCtrl', ['$scope', 'DataGameSrv', 
            function($scope, DataGameSrv) {    
    $scope.gamestats = analyzeGame(DataGameSrv.gamelog);   
}]);