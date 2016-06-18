webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	// Declare app level module which depends on views, and components
	angular.module('myApp', ['ngRoute', 'wd.analyze.game', 'wd.analyze.faction', 'wd.shared', 'wd.process', 'wd.parse', 'd3']).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	  $routeProvider.otherwise({ redirectTo: '/analyze/game' });

	  $locationProvider.html5Mode(true);
	}]);

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(6);
	__webpack_require__(10);
	__webpack_require__(12);
	__webpack_require__(14);
	__webpack_require__(19);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	var shared = __webpack_require__(4);
	var process = __webpack_require__(6);

	angular.module('wd.analyze.game', ['ngRoute', 'wd.shared', 'wd.process', 'wd.parse']).controller('AnalyzeGameCtrl', __webpack_require__(9))
	// from game.js
	.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when('/analyze/game/:game?', {
	        templateUrl: '/analyze/game/game.html',
	        controller: 'AnalyzeGameCtrl'
	    });
	}]);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	var shared = __webpack_require__(5);

	angular.module('wd.shared', []).factory('format', shared.format).controller('AboutCtrl', shared.about).controller('ChangeLogCtrl', shared.changeLog)
	// from shared.js
	.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when('/about', {
	        templateUrl: 'shared/about.html',
	        controller: 'AboutCtrl'
	    });
	    $routeProvider.when('/changelog', {
	        templateUrl: 'shared/changelog.html',
	        controller: 'ChangeLogCtrl'
	    });
	}]);

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Format.$inject = [];
	AboutCtrl.$inject = ['$scope'];
	ChangeLogCtrl.$inject = ['$scope'];
	module.exports = {
	    format: Format,
	    about: AboutCtrl,
	    changeLog: ChangeLogCtrl
	};

	function Format() {
	    return {
	        buildFormatForAnalyzeGame: buildFormatForAnalyzeGame,
	        buildFormat: buildFormat
	    };

	    /// START PUBLIC
	    function buildFormatForAnalyzeGame(gameInfo) {
	        var format = {};

	        format.labels = buildLabelFunction(gameInfo.rounds);
	        format.detailedOrdering = buildDetailedOrdering(gameInfo.rounds);
	        format.detailedStats = buildDetailedStats(format.detailedOrdering, format.labels, gameInfo.factions);
	        format.simpleOrdering = buildSimpleOrdering(gameInfo.fireAndIceBonus);

	        return format;
	    }

	    function buildFormat() {
	        return { labels: buildLabelFunction() };
	    }
	    /// END PUBLIC

	    /// START PRIVATE
	    // I could use this for localization
	    function buildLabels(rounds) {
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
	        a["yetis"] = "Yetis";
	        a["icemaidens"] = "Ice Maidens";
	        a["riverwalkers"] = "Riverwalkers";
	        a["shapeshifters"] = "Shapeshifters";
	        a["dragonlords"] = "Dragonlords";
	        a["acolytes"] = "Acolytes";
	        a["all"] = "All Factions";

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
	        a["endGameBonus"] = "F&I End Bonus";
	        a["unknown"] = "Unknown";

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
	        a["endGameConnectedClusters"] = "F&I Connected Clusters";
	        a["endGameConnectedDistance"] = "F&I Connected Distance";
	        a["endGameConnectedSaShDistance"] = "F&I Connected Sh/Sa Distance";
	        a["endGameBuildingOnEdge"] = "F&I Building on Edge";
	        a["fav10"] = "Favor 10 (TP >> 3)";
	        a["fav11"] = "Favor 11 (D >> 2)";
	        a["fav12"] = "Favor 12 (pass TP [0,2,2,3,4])";

	        var s = new Array();
	        s["SCORE1"] = "Score 1 (SPD >> 2) (1Earth > C)";
	        s["SCORE2"] = "Score 2 (TOWN >> 5) (4Earth > SPD)";
	        s["SCORE3"] = "Score 3 (D >> 2) (4Water > P)";
	        s["SCORE4"] = "Score 4 (SH/SA >> 5) (2Fire > W)";
	        s["SCORE5"] = "Score 5 (D >> 2) (4Fire > 4PW)";
	        s["SCORE6"] = "Score 6 (TP >> 3) (4Water > SPD)";
	        s["SCORE7"] = "Score 7 (SH/SA >> 5) (2Air > W)";
	        s["SCORE8"] = "Score 8 (TP >> 3) (4Air > SPD)";
	        s["SCORE9"] = "Score 9 (TE >> 4) (P -> 2C)";

	        if (rounds) {
	            // rounds (built from round info)
	            for (var i = 0; i < rounds.length; i++) {
	                var r = rounds[i];
	                a[r.scoreTile] = "Round " + r.roundNum + " - " + s[r.scoreTile];
	            }
	        }
	        return a;
	    }

	    function buildSimpleOrdering(fireAndIceBonus) {
	        var a = new Array();

	        // simple
	        a.push("bonus");
	        a.push("endGameCult"); // cult track
	        a.push("faction");
	        a.push("fav");
	        a.push("leech");
	        a.push("endGameNetwork"); // network
	        if (fireAndIceBonus) {
	            a.push("endGameBonus");
	        }
	        a.push("round");
	        a.push("town");
	        a.push("advance");

	        return a;
	    }

	    function buildDetailedOrdering(rounds) {
	        var a = new Array();

	        // detailed
	        a.push("advanceDig");
	        a.push("advanceShip");
	        a.push("bon6");
	        a.push("bon7");
	        a.push("bon9");
	        a.push("bon10");
	        a.push("endGameFire"); // 'cult'
	        a.push("endGameWater"); // 'cult'
	        a.push("endGameEarth"); // 'cult'
	        a.push("endGameAir"); // 'cult'
	        a.push("faction");
	        a.push("fav10");
	        a.push("fav11");
	        a.push("fav12");
	        a.push("leech");
	        a.push("endGameNetwork"); // network
	        for (var i = 0; i < rounds.length; i++) {
	            var r = rounds[i];
	            a.push(r.scoreTile);
	        }
	        a.push("starting");
	        a.push("town");
	        a.push("endGameResources"); // unused resources
	        a.push("unknown");

	        return a;
	    }

	    // return a function that converts strings into a prettier form.
	    // if the string exists in the passed in diciontary, return that value;
	    // otherwise return the original string.
	    function buildLabelFunction(rounds) {
	        var labels = buildLabels(rounds);

	        return function (item) {
	            return labels[item] || item;
	        };
	    }

	    function buildDetailedStats(ordering, labels, scoreCards) {
	        var obj = {};

	        for (var i = 0; i < ordering.length; i++) {
	            var key = ordering[i];
	            var players = [];
	            for (var j = 0; j < scoreCards.length; j++) {
	                var sc = scoreCards[j];
	                players.push(sc.detailed[key]);
	            }
	            obj[labels[key] || key] = players;
	        }

	        return obj;
	    }
	    /// END PRIVATE
	}

	function AboutCtrl($scope) {}

	function ChangeLogCtrl($scope) {}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('wd.process', []).factory('rulesengine', __webpack_require__(7));

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(8);

	RulesEngine.$inject = [];
	module.exports = RulesEngine;

	function RulesEngine() {

	    var rules = [score1_onSpd, score2_onTw, score3_onD, score4_onShsa, score5_onD, score6_onTp, score7_onShsa, score8_onTp, score9_onTe, witches_onTw, darklings_onDig, alchemists_onConvert, halflings_onSpd, halflings_onSh, halflings_onCultIncome, mermaids_onSh, cultists_onSh, icemaidens_onPassTe, shapeshifters_gainPowerToken, shapeshifters_factionAbility, bon6_onPassShsa, bon7_onPassTp, bon9_onPassD, bon10_onPassShip, onLeech, onTw, fav10_onTp, fav11_onD, fav12_onPassTp, advanceDig, advanceShip, endGameCult, endGameNetwork, endGameResources, endGameBonus, onConvertToVp];

	    return {
	        setupEngine: setupEngine,
	        processCommands: processCommands,
	        checkGameComplete: checkGameComplete,
	        buildGameResults: buildGameResults
	    };

	    /// START PUBLIC
	    function setupEngine(parsedLog, log) {
	        // f&i endgame
	        // other options?

	        var rounds = [],
	            bonuses = ['bon1', 'bon2', 'bon3', 'bon4', 'bon5', 'bon6', 'bon7', 'bon8', 'bon9'],
	            players = [],
	            options = [],
	            fireAndIceBonus = null,
	            names = []; // holds player info and pick order until faction selection

	        for (var i = 0; i < parsedLog.length; i++) {
	            var parsedAction = parsedLog[i];
	            var action = log[i];

	            if (parsedAction.setup == undefined) {
	                continue;
	            }

	            if (parsedAction.setup.round != undefined) {
	                rounds.push({
	                    roundNum: parsedAction.setup.round,
	                    scoreTile: parsedAction.setup.tile
	                });
	            }

	            if (parsedAction.setup.bonus != undefined) {
	                var index = bonuses.indexOf(parsedAction.setup.bonus.toLowerCase());
	                bonuses.splice(index, 1);
	            }

	            if (parsedAction.setup.player != undefined) {
	                var order = names.length;
	                names.push({
	                    name: parsedAction.setup.player.name,
	                    startOrder: order + 1
	                });
	            }

	            if (parsedAction.setup.additionalScoring != undefined) {
	                fireAndIceBonus = parsedAction.setup.additionalScoring;
	            }

	            if (parsedAction.setup.factionSelection) {
	                var name = names.shift();
	                players.push(makePlayer(name, action.faction));
	            }

	            if (parsedAction.setup.option != undefined) {
	                if (parsedAction.setup.option.toLowerCase() === "mini-expansion-1") {
	                    bonuses.push('bon10');
	                }
	            }
	        }

	        return {
	            rounds: rounds,
	            players: players,
	            options: [],
	            bonuses: bonuses,
	            fireAndIceBonus: fireAndIceBonus
	        };
	    }

	    function processCommands(engineSetup, parsedLog, log) {
	        var players = engineSetup.players,
	            rounds = engineSetup.rounds,
	            round = null;

	        var playerLookup = [];
	        for (var i = 0; i < players.length; i++) {
	            var p = players[i];
	            playerLookup[p.faction] = p;
	        }
	        var roundLookup = [];
	        for (var i = 0; i < rounds.length; i++) {
	            var r = rounds[i];
	            roundLookup[r.roundNum] = r;
	        }

	        for (var i = 0; i < parsedLog.length; i++) {
	            var parsedAction = parsedLog[i];
	            var action = log[i];

	            // var p = players[action.faction];
	            var p = playerLookup[action.faction];

	            // for now, skip non player actions -- we may do this differnetly
	            // in the future
	            if (p != undefined) {
	                var result = processCommand(rules, p, round, parsedAction, action);
	            }

	            if (parsedAction.round != undefined) {
	                round = roundLookup[parsedAction.round];
	            }
	        }

	        // sum player's total points
	        for (var i = 0; i < players.length; i++) {
	            sumPoints(players[i]);
	        }

	        return players;
	    }

	    function checkGameComplete(parsedLog) {
	        for (var i = 0; i < parsedLog.length; i++) {
	            var parsedAction = parsedLog[i];
	            if (parsedAction.endGame) {
	                return true;
	            }
	        }

	        return false; // if we don't find an endGame action
	    }

	    function buildGameResults(scoreCards) {
	        var ordered = _.sortBy(scoreCards, function (x) {
	            return x.total;
	        }).reverse();

	        return _.map(ordered, function (x, i) {
	            return {
	                faction: x.faction,
	                player: x.name,
	                startOrder: x.startOrder,
	                place: i + 1
	            };
	        });
	    }
	    /// END PUBLIC

	    /// START PRIVATE
	    function makePlayer(player, faction) {
	        var shipStart, shipLevels;

	        if (faction.toUpperCase() == "NOMADS" || faction.toUpperCase() == "CHAOSMAGICIANS" || faction.toUpperCase() == "GIANTS" || faction.toUpperCase() == "SWARMLINGS" || faction.toUpperCase() == "ENGINEERS" || faction.toUpperCase() == "HALFLINGS" || faction.toUpperCase() == "CULTISTS" || faction.toUpperCase() == "ALCHEMISTS" || faction.toUpperCase() == "DARKLINGS" || faction.toUpperCase() == "AUREN" || faction.toUpperCase() == "WITCHES" || faction.toUpperCase() == "ICEMAIDENS" || faction.toUpperCase() == "YETIS" || faction.toUpperCase() == "SHAPESHIFTERS" || faction.toUpperCase() == "DRAGONLORDS" || faction.toUpperCase() == "ACOLYTES") {
	            shipStart = 0;
	            shipLevels = {
	                "1": { points: 2 },
	                "2": { points: 3 },
	                "3": { points: 4 }
	            };
	        } else if (faction.toUpperCase() == "FAKIRS" || faction.toUpperCase() == "DWARVES") {
	            shipStart = 0;
	            shipLevels = {};
	        } else if (faction.toUpperCase() == "MERMAIDS") {
	            shipStart = 1;
	            shipLevels = {
	                "2": { points: 2 },
	                "3": { points: 3 },
	                "4": { points: 4 },
	                "5": { points: 5 }
	            };
	        } else if (faction.toUpperCase() == "RIVERWALKERS") {
	            shipStart = 1;
	            shipLevels = {};
	        } else {
	            throw "Faction [" + faction + "] unrecognized";
	        }

	        return {
	            faction: faction,
	            name: player.name,
	            startOrder: player.startOrder,
	            d: 0,
	            tp: 0,
	            te: 0,
	            sh: 0,
	            sa: 0,
	            fav10: false,
	            fav11: false,
	            fav12: false,
	            favors: [],
	            passBonus: '',
	            shipLevel: shipStart,
	            shipLevels: shipLevels,
	            detailed: {
	                starting: 20
	            },
	            simple: {
	                starting: 20
	            }
	        };
	    }

	    function addTurnToScorecard(player, effects) {
	        for (var i = 0; i < effects.length; i++) {
	            var effect = effects[i];

	            // simple
	            if (effect.simple.round != undefined) {
	                if (player.simple.round == undefined) {
	                    player.simple.round = 0;
	                }
	                player.simple.round += effect.simple.round;
	            }
	            if (effect.simple.faction != undefined) {
	                if (player.simple.faction == undefined) {
	                    player.simple.faction = 0;
	                }
	                player.simple.faction += effect.simple.faction;
	            }
	            if (effect.simple.bonus != undefined) {
	                if (player.simple.bonus == undefined) {
	                    player.simple.bonus = 0;
	                }
	                player.simple.bonus += effect.simple.bonus;
	            }
	            if (effect.simple.town != undefined) {
	                if (player.simple.town == undefined) {
	                    player.simple.town = 0;
	                }
	                player.simple.town += effect.simple.town;
	            }
	            if (effect.simple.advance != undefined) {
	                if (player.simple.advance == undefined) {
	                    player.simple.advance = 0;
	                }
	                player.simple.advance += effect.simple.advance;
	            }
	            if (effect.simple.fav != undefined) {
	                if (player.simple.fav == undefined) {
	                    player.simple.fav = 0;
	                }
	                player.simple.fav += effect.simple.fav;
	            }
	            if (effect.simple.endGameCult != undefined) {
	                if (player.simple.endGameCult == undefined) {
	                    player.simple.endGameCult = 0;
	                }
	                player.simple.endGameCult += effect.simple.endGameCult;
	            }
	            if (effect.simple.endGameNetwork != undefined) {
	                if (player.simple.endGameNetwork == undefined) {
	                    player.simple.endGameNetwork = 0;
	                }
	                player.simple.endGameNetwork += effect.simple.endGameNetwork;
	            }
	            if (effect.simple.endGameResources != undefined) {
	                if (player.simple.endGameResources == undefined) {
	                    player.simple.endGameResources = 0;
	                }
	                player.simple.endGameResources += effect.simple.endGameResources;
	            }
	            if (effect.simple.endGameBonus != undefined) {
	                if (player.simple.endGameBonus == undefined) {
	                    player.simple.endGameBonus = 0;
	                }
	                player.simple.endGameBonus += effect.simple.endGameBonus;
	            }
	            if (effect.simple.leech != undefined) {
	                if (player.simple.leech == undefined) {
	                    player.simple.leech = 0;
	                }
	                player.simple.leech += effect.simple.leech;
	            }
	            if (effect.simple.unknown != undefined) {
	                if (player.simple.unknown == undefined) {
	                    player.simple.unknown = 0;
	                }
	                player.simple.unknown += effect.simple.unknown;
	            }

	            // detailed
	            if (effect.detailed.round != undefined) {
	                var round = effect.detailed.round;

	                if (player.detailed[round.scoreTile] == undefined) {
	                    player.detailed[round.scoreTile] = 0;
	                }
	                player.detailed[round.scoreTile] += round.points;
	            }
	            if (effect.detailed.faction != undefined) {
	                if (player.detailed.faction == undefined) {
	                    player.detailed.faction = 0;
	                }
	                player.detailed.faction += effect.detailed.faction;
	            }
	            if (effect.detailed["faction-ssOnLeech"] != undefined) {
	                if (player.detailed["faction-ssOnLeech"] == undefined) {
	                    player.detailed["faction-ssOnLeech"] = 0;
	                }
	                player.detailed["faction-ssOnLeech"] += effect.detailed["faction-ssOnLeech"];
	            }
	            if (effect.detailed["faction-ssAbility"] != undefined) {
	                if (player.detailed["faction-ssAbility"] == undefined) {
	                    player.detailed["faction-ssAbility"] = 0;
	                }
	                player.detailed["faction-ssAbility"] += effect.detailed["faction-ssAbility"];
	            }
	            if (effect.detailed.bon6 != undefined) {
	                if (player.detailed.bon6 == undefined) {
	                    player.detailed.bon6 = 0;
	                }
	                player.detailed.bon6 += effect.detailed.bon6;
	            }
	            if (effect.detailed.bon7 != undefined) {
	                if (player.detailed.bon7 == undefined) {
	                    player.detailed.bon7 = 0;
	                }
	                player.detailed.bon7 += effect.detailed.bon7;
	            }
	            if (effect.detailed.bon9 != undefined) {
	                if (player.detailed.bon9 == undefined) {
	                    player.detailed.bon9 = 0;
	                }
	                player.detailed.bon9 += effect.detailed.bon9;
	            }
	            if (effect.detailed.bon10 != undefined) {
	                if (player.detailed.bon10 == undefined) {
	                    player.detailed.bon10 = 0;
	                }
	                player.detailed.bon10 += effect.detailed.bon10;
	            }
	            if (effect.detailed.town != undefined) {
	                if (player.detailed.town == undefined) {
	                    player.detailed.town = 0;
	                }
	                player.detailed.town += effect.detailed.town;
	            }
	            if (effect.detailed.advanceShip != undefined) {
	                if (player.detailed.advanceShip == undefined) {
	                    player.detailed.advanceShip = 0;
	                }
	                player.detailed.advanceShip += effect.detailed.advanceShip;
	            }
	            if (effect.detailed.advanceDig != undefined) {
	                if (player.detailed.advanceDig == undefined) {
	                    player.detailed.advanceDig = 0;
	                }
	                player.detailed.advanceDig += effect.detailed.advanceDig;
	            }
	            if (effect.detailed.fav10 != undefined) {
	                if (player.detailed.fav10 == undefined) {
	                    player.detailed.fav10 = 0;
	                }
	                player.detailed.fav10 += effect.detailed.fav10;
	            }
	            if (effect.detailed.fav11 != undefined) {
	                if (player.detailed.fav11 == undefined) {
	                    player.detailed.fav11 = 0;
	                }
	                player.detailed.fav11 += effect.detailed.fav11;
	            }
	            if (effect.detailed.fav12 != undefined) {
	                if (player.detailed.fav12 == undefined) {
	                    player.detailed.fav12 = 0;
	                }
	                player.detailed.fav12 += effect.detailed.fav12;
	            }
	            if (effect.detailed.endGameFire != undefined) {
	                if (player.detailed.endGameFire == undefined) {
	                    player.detailed.endGameFire = 0;
	                }
	                player.detailed.endGameFire += effect.detailed.endGameFire;
	            }
	            if (effect.detailed.endGameWater != undefined) {
	                if (player.detailed.endGameWater == undefined) {
	                    player.detailed.endGameWater = 0;
	                }
	                player.detailed.endGameWater += effect.detailed.endGameWater;
	            }
	            if (effect.detailed.endGameEarth != undefined) {
	                if (player.detailed.endGameEarth == undefined) {
	                    player.detailed.endGameEarth = 0;
	                }
	                player.detailed.endGameEarth += effect.detailed.endGameEarth;
	            }
	            if (effect.detailed.endGameAir != undefined) {
	                if (player.detailed.endGameAir == undefined) {
	                    player.detailed.endGameAir = 0;
	                }
	                player.detailed.endGameAir += effect.detailed.endGameAir;
	            }
	            if (effect.detailed.endGameNetwork != undefined) {
	                if (player.detailed.endGameNetwork == undefined) {
	                    player.detailed.endGameNetwork = 0;
	                }
	                player.detailed.endGameNetwork += effect.detailed.endGameNetwork;
	            }
	            if (effect.detailed.endGameResources != undefined) {
	                if (player.detailed.endGameResources == undefined) {
	                    player.detailed.endGameResources = 0;
	                }
	                player.detailed.endGameResources += effect.detailed.endGameResources;
	            }
	            if (effect.detailed.endGameConnectedDistance != undefined) {
	                if (player.detailed.endGameConnectedDistance == undefined) {
	                    player.detailed.endGameConnectedDistance = 0;
	                }
	                player.detailed.endGameConnectedDistance += effect.detailed.endGameConnectedDistance;
	            }
	            if (effect.detailed.endGameConnectedSaShDistance != undefined) {
	                if (player.detailed.endGameConnectedSaShDistance == undefined) {
	                    player.detailed.endGameConnectedSaShDistance = 0;
	                }
	                player.detailed.endGameConnectedSaShDistance += effect.detailed.endGameConnectedSaShDistance;
	            }
	            if (effect.detailed.endGameConnectedClusters != undefined) {
	                if (player.detailed.endGameConnectedClusters == undefined) {
	                    player.detailed.endGameConnectedClusters = 0;
	                }
	                player.detailed.endGameConnectedClusters += effect.detailed.endGameConnectedClusters;
	            }
	            if (effect.detailed.endGameBuildingOnEdge != undefined) {
	                if (player.detailed.endGameBuildingOnEdge == undefined) {
	                    player.detailed.endGameBuildingOnEdge = 0;
	                }
	                player.detailed.endGameBuildingOnEdge += effect.detailed.endGameBuildingOnEdge;
	            }
	            if (effect.detailed.leech != undefined) {
	                if (player.detailed.leech == undefined) {
	                    player.detailed.leech = 0;
	                }
	                player.detailed.leech += effect.detailed.leech;
	            }
	            if (effect.detailed.unknown != undefined) {
	                if (player.detailed.unknown == undefined) {
	                    player.detailed.unknown = [];
	                }
	                player.detailed.unknown.push(effect.detailed);
	            }
	        }
	    }

	    function processCommand(rules, player, round, parsedAction, action) {
	        var effects = [];

	        if (parsedAction.round != undefined) {
	            return { round: parsedAction.round };
	        }

	        if (parsedAction.d != undefined) {
	            player.d += parsedAction.d.length;
	        }
	        if (parsedAction.tp != undefined) {
	            player.tp += parsedAction.tp.length;
	            player.d -= parsedAction.tp.length;
	        }
	        if (parsedAction.te != undefined) {
	            player.te += parsedAction.te.length;
	            player.tp -= parsedAction.te.length;
	        }
	        if (parsedAction.sh != undefined) {
	            player.sh = 1;
	            player.tp -= 1;
	        }
	        if (parsedAction.sa != undefined) {
	            player.sa += 1;
	            player.te -= 1;
	        }
	        if (parsedAction.fav != undefined) {
	            for (var i = 0; i < parsedAction.fav.length; i++) {
	                var f = parsedAction.fav[i];
	                if (f == 10) {
	                    player.fav10 = true;
	                } else if (f == 11) {
	                    player.fav11 = true;
	                } else if (f == 12) {
	                    player.fav12 = true;
	                }
	                player.favors.push("fav" + f);
	            }
	        }

	        for (var i = 0; i < rules.length; i++) {
	            var rule = rules[i];

	            var effect = rule(player, round, parsedAction, action);

	            if (effect != null) {
	                effects.push(effect);
	            }
	        }

	        markUnmappedPoints(player, effects, parsedAction, action);

	        addTurnToScorecard(player, effects);

	        if (parsedAction.pass != undefined) {
	            player.pass = parsedAction.pass;
	        }

	        return;
	    }

	    function handleHardPoints(player, parsedAction, action, diff) {
	        if (player.faction.toUpperCase() == "ENGINEERS") {
	            if (diff % 3 == 0 && player.sh == 1 && parsedAction.pass != undefined)
	                // if 3,6,9 points unaccounted for and we have a sh and we're passing
	                return {
	                    simple: { faction: diff },
	                    detailed: { faciton: diff }
	                };
	        } else if (player.faction.toUpperCase() == "FAKIRS") {
	            if (diff == 4 && (parsedAction.d && parsedAction.d.length > 0 || parsedAction.transform != undefined)) {
	                // if 4 points unaccounted for and we built or transformed
	                return {
	                    simple: { faction: diff },
	                    detailed: { faction: diff }
	                };
	            }
	        } else if (player.faction.toUpperCase() == "DWARVES") {
	            // if 4 points unaccounted for and we built or transformed
	            if (diff == 4 && (parsedAction.d && parsedAction.d.length > 0 || parsedAction.transform != undefined)) {
	                return {
	                    simple: { faction: diff },
	                    detailed: { faction: diff }
	                };
	            }
	        }
	    }

	    function markUnmappedPoints(player, effects, parsedAction, action) {
	        var points = 0;

	        for (var i = 0; i < effects.length; i++) {
	            var effect = effects[i];

	            if (effect.simple.round != undefined) {
	                points += effect.simple.round;
	            }
	            if (effect.simple.faction != undefined) {
	                points += effect.simple.faction;
	            }
	            if (effect.simple.bonus != undefined) {
	                points += effect.simple.bonus;
	            }
	            if (effect.simple.town != undefined) {
	                points += effect.simple.town;
	            }
	            if (effect.simple.advance != undefined) {
	                points += effect.simple.advance;
	            }
	            if (effect.simple.fav != undefined) {
	                points += effect.simple.fav;
	            }
	            if (effect.simple.endGameCult != undefined) {
	                points += effect.simple.endGameCult;
	            }
	            if (effect.simple.endGameNetwork != undefined) {
	                points += effect.simple.endGameNetwork;
	            }
	            if (effect.simple.endGameResources != undefined) {
	                points += effect.simple.endGameResources;
	            }
	            if (effect.simple.endGameBonus != undefined) {
	                points += effect.simple.endGameBonus;
	            }
	            if (effect.simple.vp != undefined) {
	                points += effect.simple.vp;
	            }
	            if (effect.simple.leech != undefined) {
	                points += effect.simple.leech;
	            }
	        }

	        if (action.VP.delta != points) {
	            var diff = action.VP.delta - points;
	            var effect = handleHardPoints(player, parsedAction, action, diff);

	            if (effect != null) {
	                effects.push(effect);
	                points += effect.simple.faction;
	            }
	        }

	        if (action.VP.delta != points) {
	            var diff = action.VP.delta - points;
	            effects.push({
	                simple: { unknown: diff },
	                detailed: { unknown: diff, action: action.commands }
	            });
	        }
	    }

	    function sumPoints(player) {
	        var points = 0;

	        points += player.simple.starting || 0;
	        points += player.simple.round || 0;
	        points += player.simple.faction || 0;
	        points += player.simple.bonus || 0;
	        points += player.simple.town || 0;
	        points += player.simple.advance || 0;
	        points += player.simple.fav || 0;
	        points += player.simple.endGameNetwork || 0;
	        points += player.simple.endGameResources || 0;
	        points += player.simple.endGameCult || 0;
	        points += player.simple.endGameBonus || 0;
	        points += player.simple.leech || 0;
	        points += player.simple.unknown || 0;

	        player.total = points;
	    }
	    /// END PRIVATE

	    /// START RULES
	    //
	    // Round scoring
	    //

	    //SCORE 1: spd >> 2; 1earth -> 1c
	    function score1_onSpd(player, round, parsedAction, action) {

	        // dragonlords, acolytes, and riverwalkers don't actually get spades,
	        // so they can't score off of them
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE1" || player.faction.toUpperCase() == "DRAGONLORDS" || player.faction.toUpperCase() == "ACOLYTES" || player.faction.toUpperCase() == "RIVERWALKERS") {
	            return null;
	        }

	        var points = parsedAction.spd * 2;

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }

	        return null;
	    }

	    //SCORE2: town >> 5; 4earth -> 1spd
	    function score2_onTw(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE2" || parsedAction.tw == undefined) {
	            return null;
	        }

	        var points = parsedAction.tw.length * 5;

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }
	    }

	    //SCORE3: d >> 2; 4water -> 1p
	    function score3_onD(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE3") {
	            return null;
	        }

	        var points = (parsedAction.d ? parsedAction.d.length : 0) * 2;

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }
	    }

	    //SCORE4: sh/sa >> 5; 2fire -> 1w
	    function score4_onShsa(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE4") {
	            return null;
	        }

	        var points = 0;
	        if (parsedAction.sh) {
	            points += 5;
	        }
	        if (parsedAction.sa) {
	            points += 5;
	        }

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }
	    }

	    // SCORE5: d >> 2; 4fire -> 4pw
	    function score5_onD(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE5") {
	            return null;
	        }

	        var points = (parsedAction.d ? parsedAction.d.length : 0) * 2;

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }

	        return null;
	    }

	    // SCORE6: tp >> 3; 4water -> 1spd
	    function score6_onTp(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE6") {
	            return null;
	        }

	        var points = (parsedAction.tp ? parsedAction.tp.length : 0) * 3;

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }

	        return null;
	    }

	    // SCORE7: SHSA >> 3; 4water -> 1spd
	    function score7_onShsa(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE7") {
	            return null;
	        }

	        var points = 0;
	        if (parsedAction.sh) {
	            points += 5;
	        }
	        if (parsedAction.sa) {
	            points += 5;
	        }

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }

	        return null;
	    }

	    // SCORE8: tp >> 3; 4air -> 1spd
	    function score8_onTp(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE8") {
	            return null;
	        }

	        var points = (parsedAction.tp ? parsedAction.tp.length : 0) * 3;

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }

	        return null;
	    }

	    // SCORE9: te >> 4; 1cult_p -> 2c
	    function score9_onTe(player, round, parsedAction, action) {
	        if (round == undefined || round.scoreTile.toUpperCase() != "SCORE9") {
	            return null;
	        }

	        var points = (parsedAction.te ? parsedAction.te.length : 0) * 4;

	        if (points > 0) {
	            return {
	                simple: { round: points },
	                detailed: {
	                    round: {
	                        roundNum: round.roundNum,
	                        scoreTile: round.scoreTile,
	                        points: points
	                    }
	                }
	            };
	        }

	        return null;
	    }

	    //
	    // Faction Bonuses
	    //

	    function witches_onTw(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "WITCHES" || parsedAction.tw == undefined) {
	            return null;
	        }

	        var points = parsedAction.tw.length * 5;
	        if (points > 0) {
	            return {
	                simple: { faction: points },
	                detailed: { faction: points }
	            };
	        }

	        return null;
	    }

	    function alchemists_onConvert(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "ALCHEMISTS" || parsedAction.vp == undefined) {
	            return null;
	        }

	        var points = parsedAction.vp;
	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { faction: points }
	            };
	        }

	        return null;
	    }

	    function cultists_onSh(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "CULTISTS" || parsedAction.sh == undefined) {
	            return null;
	        }

	        var points = 7; // it's always 7 :)
	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { faction: points }
	            };
	        }
	    }

	    function halflings_onSpd(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "HALFLINGS" || parsedAction.spd == undefined) {
	            return null;
	        }

	        var points = parsedAction.spd * 1;
	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { faction: points }
	            };
	        }
	    }

	    function halflings_onSh(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "HALFLINGS" || parsedAction.sh == undefined) {
	            return null;
	        }

	        // handle this manually... not the best but w/e
	        var fakeParsedAction = { spd: 3 },
	            fakeAction = {},
	            returnValue = { simple: {}, detailed: {} };

	        var onAbility = halflings_onSpd(player, round, fakeParsedAction, fakeAction);
	        if (onAbility != null) {
	            returnValue.simple.faction = onAbility.simple.faction;
	            returnValue.detailed.faction = onAbility.detailed.faction;
	        }

	        var onRound = score1_onSpd(player, round, fakeParsedAction, fakeAction);
	        if (onRound != null) {
	            returnValue.simple.round = onRound.simple.round;
	            returnValue.detailed.round = onRound.detailed.round;
	        }

	        return returnValue;
	    }

	    // right now, the only way for anyone (and specifically halfings) to gain points
	    // from cult income is to gain a spd (which is worth a vp for halflings)
	    function halflings_onCultIncome(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "HALFLINGS" || parsedAction.income != "cult") {
	            return null;
	        }

	        var points = action.VP.delta;
	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { faction: points }
	            };
	        }
	    }

	    function mermaids_onSh(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "MERMAIDS" || parsedAction.sh == undefined) {
	            return null;
	        }

	        var fakeParsedAction = { advanceShip: 1 },
	            fakeAction = {};

	        return advanceShip(player, round, fakeParsedAction, fakeAction);
	    }

	    function darklings_onDig(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "DARKLINGS" || parsedAction.dig == undefined) {
	            return null;
	        }

	        var points = parsedAction.dig * 2;
	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { faction: points }
	            };
	        }
	    }

	    function icemaidens_onPassTe(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "ICEMAIDENS" || parsedAction.pass == undefined || player.sh == 0) {
	            return null;
	        }

	        var points = player.te * 3;

	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { faction: points }
	            };
	        }
	    }

	    function shapeshifters_gainPowerToken(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "SHAPESHIFTERS" || parsedAction.gainPowerToken == undefined || parsedAction.gainPowerToken == false) {
	            return null;
	        }

	        // do some logic around which version of shape shifters we're playing
	        var points = -1;
	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { "faction-ssOnLeech": points }
	            };
	        }
	    }

	    function shapeshifters_factionAbility(player, round, parsedAction, action) {
	        if (player.faction.toUpperCase() != "SHAPESHIFTERS" || parsedAction.action == undefined) {
	            return null;
	        }

	        // do some logic aorund which version of shape shifters we're playing with
	        var points = 0;
	        if (points != 0) {
	            return {
	                simple: { faction: points },
	                detailed: { "faction-ssAbility": points }
	            };
	        }
	    }

	    //
	    // Pass Bonuses
	    //

	    // bon6: sh/sa * 4
	    function bon6_onPassShsa(player, round, parsedAction, action) {
	        if (parsedAction.pass == undefined || player.pass == undefined || player.pass.toUpperCase() != "BON6") {
	            return null;
	        }

	        var points = (player.sh + player.sa) * 4;
	        if (points > 0) {
	            return {
	                simple: { bonus: points },
	                detailed: { bon6: points }
	            };
	        }
	    }

	    // bon7: tp*2
	    function bon7_onPassTp(player, round, parsedAction, action) {
	        if (parsedAction.pass == undefined || player.pass == undefined || player.pass.toUpperCase() != "BON7") {
	            return null;
	        }

	        var points = player.tp * 2;
	        if (points > 0) {
	            return {
	                simple: { bonus: points },
	                detailed: { bon7: points }
	            };
	        }

	        return null;
	    }

	    // bon9: d*1
	    function bon9_onPassD(player, round, parsedAction, action) {
	        if (parsedAction.pass == undefined || player.pass == undefined || player.pass.toUpperCase() != "BON9") {
	            return null;
	        }

	        var points = player.d * 1;
	        if (points > 0) {
	            return {
	                simple: { bonus: points },
	                detailed: { bon9: points }
	            };
	        }

	        return null;
	    }

	    // bon10: ship*3
	    function bon10_onPassShip(player, round, parsedAction, action) {
	        if (parsedAction.pass == undefined || player.pass == undefined || player.pass.toUpperCase() != "BON10") {
	            return null;
	        }

	        var points = player.shipLevel * 3;
	        if (points > 0) {
	            return {
	                simple: { bonus: points },
	                detailed: { bon10: points }
	            };
	        }

	        return null;
	    }

	    //
	    // Leech
	    //
	    function onLeech(player, round, parsedAction, action) {
	        if (parsedAction.leech == undefined || !parsedAction.leech.accept) {
	            return null;
	        }

	        // shapeshifters can have lines like "gain P3 for VP. Leech 2 from giants"
	        // so we look at power change, not vp change (they lose 1vp when gaining)
	        if (player.faction.toUpperCase() == "SHAPESHIFTERS") {
	            var delta = action.PW.delta;

	            // if they take a token, it goes to P3 which is effectively +2pw,
	            // so we offset that part
	            if (parsedAction.gainPowerToken) {
	                delta -= 2;
	            }

	            if (delta > 1) {
	                var points = -(delta - 1);
	                if (points != 0) {
	                    return {
	                        simple: { leech: points },
	                        detailed: { leech: points }
	                    };
	                }
	            }
	        } else {
	            // for everyone else, just look at the point change
	            var points = action.VP.delta;
	            if (points != 0) {
	                return {
	                    simple: { leech: points },
	                    detailed: { leech: points }
	                };
	            }
	        }
	    }

	    //
	    // Town
	    //
	    function onTw(player, round, parsedAction, action) {
	        if (parsedAction.tw == undefined) {
	            return null;
	        }

	        var points = 0;
	        for (var i = 0; i < parsedAction.tw.length; i++) {
	            var tw = parsedAction.tw[i];

	            if (tw == 1) {
	                points += 5;
	            } else if (tw == 2) {
	                points += 7;
	            } else if (tw == 3) {
	                points += 9;
	            } else if (tw == 4) {
	                points += 6;
	            } else if (tw == 5) {
	                points += 8;
	            } else if (tw == 6) {
	                points += 2;
	            } else if (tw == 7) {
	                points += 4;
	            } else if (tw == 8) {
	                points += 11;
	            }
	        }

	        return {
	            simple: { town: points },
	            detailed: { town: points }
	        };
	    }

	    //
	    // Favs
	    //

	    // fav10: tp >> 3
	    function fav10_onTp(player, round, parsedAction, action) {
	        if (!player.fav10) {
	            return null;
	        }

	        var points = (parsedAction.tp ? parsedAction.tp.length : 0) * 3;

	        if (points > 0) {
	            return {
	                simple: { fav: points },
	                detailed: { fav10: points }
	            };
	        }

	        return null;
	    }

	    // fav11: d >> 2
	    function fav11_onD(player, round, parsedAction, action) {
	        if (!player.fav11) {
	            return null;
	        }

	        var points = (parsedAction.d ? parsedAction.d.length : 0) * 2;

	        if (points > 0) {
	            return {
	                simple: { fav: points },
	                detailed: { fav11: points }
	            };
	        }

	        return null;
	    }

	    // fav12: pass: 1tp >> 2, 2/3tp >> 3, 4 tp >> 4
	    function fav12_onPassTp(player, round, parsedAction, action) {
	        if (parsedAction.pass == undefined || !player.fav12) {
	            return null;
	        }

	        var points = 0;
	        if (player.tp == 1) {
	            points = 2;
	        }
	        if (player.tp == 2 || player.tp == 3) {
	            points = 3;
	        }
	        if (player.tp == 4) {
	            points = 4;
	        }

	        if (points > 0) {
	            return {
	                simple: { fav: points },
	                detailed: { fav12: points }
	            };
	        }

	        return null;
	    }

	    //
	    // advances
	    //
	    function advanceDig(player, round, parsedAction, action) {
	        if (parsedAction.advanceDig == undefined) {
	            return null;
	        }

	        var points = 6 * parsedAction.advanceDig;
	        if (points > 0) {
	            return {
	                simple: { advance: points },
	                detailed: { advanceDig: points }
	            };
	        }

	        return null;
	    }

	    function advanceShip(player, round, parsedAction, action) {
	        if (parsedAction.advanceShip == undefined) {
	            return null;
	        }

	        var next = player.shipLevel + 1;
	        var nextLevel = player.shipLevels[next];

	        if (nextLevel != undefined) {
	            player.shipLevel = next;
	            return {
	                simple: { advance: nextLevel.points },
	                detailed: { advanceShip: nextLevel.points }
	            };
	        }

	        return null;
	    }

	    //
	    // Endgame points
	    //
	    function endGameCult(player, round, parsedAction, action) {
	        if (parsedAction.endGame == undefined) {
	            return null;
	        }

	        var points = parsedAction.endGame.points;
	        if (points > 0) {
	            if (parsedAction.endGame.source.toUpperCase() == "FIRE") {
	                return {
	                    simple: { endGameCult: points },
	                    detailed: { endGameFire: points }
	                };
	            }
	            if (parsedAction.endGame.source.toUpperCase() == "WATER") {
	                return {
	                    simple: { endGameCult: points },
	                    detailed: { endGameWater: points }
	                };
	            }
	            if (parsedAction.endGame.source.toUpperCase() == "EARTH") {
	                return {
	                    simple: { endGameCult: points },
	                    detailed: { endGameEarth: points }
	                };
	            }
	            if (parsedAction.endGame.source.toUpperCase() == "AIR") {
	                return {
	                    simple: { endGameCult: points },
	                    detailed: { endGameAir: points }
	                };
	            }
	        }
	        return null;
	    }

	    function endGameNetwork(player, round, parsedAction, action) {
	        if (parsedAction.endGame == undefined || parsedAction.endGame.source.toUpperCase() != "NETWORK") {
	            return null;
	        }

	        var points = parsedAction.endGame.points;
	        if (points > 0) {
	            return {
	                simple: { endGameNetwork: points },
	                detailed: { endGameNetwork: points }
	            };
	        }

	        return null;
	    }

	    function endGameResources(player, round, parsedAction, action) {
	        if (parsedAction.endGame == undefined || parsedAction.endGame.source.toUpperCase() != "RESOURCES") {
	            return null;
	        }

	        var points = action.VP.delta;
	        if (points > 0) {
	            return {
	                simple: { endGameResources: points },
	                detailed: { endGameResources: points }
	            };
	        }
	    }

	    function endGameBonus(player, round, parsedAction, action) {
	        if (parsedAction.endGame == undefined) {
	            return null;
	        }

	        var points = parsedAction.endGame.points;
	        if (points > 0) {
	            var obj = { simple: { endGameBonus: points } };

	            if (parsedAction.endGame.source.toUpperCase() == "CONNECTED-DISTANCE") {
	                obj.detailed = { endGameConnectedDistance: points };
	            } else if (parsedAction.endGame.source.toUpperCase() == "CONNECTED-SA-SH-DISTANCE") {
	                obj.detailed = { endGameConnectedSaShDistance: points };
	            } else if (parsedAction.endGame.source.toUpperCase() == "CONNECTED-CLUSTERS") {
	                obj.detailed = { endGameConnectedClusters: points };
	            } else if (parsedAction.endGame.source.toUpperCase() == "BUILDING-ON-EDGE") {
	                obj.detailed = { endGameBuildingOnEdge: points };
	            } else {
	                return null;
	            }
	            return obj;
	        }
	    }

	    function onConvertToVp(player, round, parsedAction, action) {
	        // I assume this is only being used endGame by people who manually convert
	        // into points

	        // if you're alchemists, use their faction specific rule
	        if (player.faction.toUpperCase() == "ALCHEMISTS" || parsedAction.vp == undefined) {
	            return null;
	        }

	        var points = parsedAction.vp;
	        if (points != 0) {
	            return {
	                simple: { endGameResources: points },
	                detailed: { endGameResources: points }
	            };
	        }

	        return null;
	    }
	    /// END RULES
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(8);

	AnalyzeGameCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'd3', 'format', 'rulesengine', 'parser'];
	module.exports = AnalyzeGameCtrl;

	function AnalyzeGameCtrl($scope, $http, $location, $routeParams, d3, format, rulesengine, parser) {
	    // text box on top of screen
	    $scope.analyzeGame = function (game) {
	        var path = "/analyze/game/" + game;
	        $location.path(path);
	    };

	    $scope.loading = false;
	    $scope.loaded = false;

	    if ($routeParams.game) {
	        $scope.loaded = false;
	        $scope.loading = true;
	        $scope.gamestats = null;
	        $scope.format = null;
	        $scope.gamename = $routeParams.game;

	        //TODO refactor this to a service?
	        $http({ method: 'GET', url: '/data/game/' + $routeParams.game }).then(function (response) {
	            if (response.data) {
	                $scope.loaded = true;
	                $scope.gamestats = parseGame(response.data, rulesengine, parser);
	                $scope.format = format.buildFormatForAnalyzeGame($scope.gamestats);
	                $scope.gameIncomplete = !$scope.gamestats.gameComplete;
	            } else {
	                $scope.loadError = true;
	            }
	            $scope.loading = false;
	        });
	    }
	}

	var parseGame = function parseGame(gamelog, rulesengine, parser) {
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
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('wd.parse', []).factory('parser', __webpack_require__(11));

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Parse.$inject = [];
	module.exports = Parse;

	function Parse() { 
	    var parser = buildParser();

	    return { 
	        parseLog: parseLog
	    };

	    /// START PUBLIC
	    function parseLog(log) { 
	        var parsed = [];

	        for(var i = 0; i < log.length; i++) { 
	            var action = log[i];
	            var parsedAction = "";
	            try { 
	                // start of round lines are an example of comment lines
	                if(action.commands != undefined) {
	                    parsedAction = parser.parse(action.commands);
	                } else if(action.comment != undefined) { 
	                    parsedAction = parser.parse(action.comment);
	                }
	            }
	            catch(err) { 
	                parsedAction = {
	                    "err": err,
	                    "action": action
	                }
	            }
	            parsed.push(parsedAction);

	        }

	        return parsed;
	    }
	    /// END PUBLIC



	    /// START GENERATED BY PEGJS (with a few small tweaks, see: parser_README)
	    function buildParser() {
	      "use strict";

	      /*
	       * Generated by PEG.js 0.9.0.
	       *
	       * http://pegjs.org/
	       */

	      function peg$subclass(child, parent) {
	        function ctor() { this.constructor = child; }
	        ctor.prototype = parent.prototype;
	        child.prototype = new ctor();
	      }

	      function peg$SyntaxError(message, expected, found, location) {
	        this.message  = message;
	        this.expected = expected;
	        this.found    = found;
	        this.location = location;
	        this.name     = "SyntaxError";

	        if (typeof Error.captureStackTrace === "function") {
	          Error.captureStackTrace(this, peg$SyntaxError);
	        }
	      }

	      peg$subclass(peg$SyntaxError, Error);

	      function peg$parse(input) {
	        var options = arguments.length > 1 ? arguments[1] : {},
	            parser  = this,

	            peg$FAILED = {},

	            peg$startRuleFunctions = { Turn: peg$parseTurn },
	            peg$startRuleFunction  = peg$parseTurn,

	            peg$c0 = function(actions) { return makeAction(actions); },
	            peg$c1 = "send",
	            peg$c2 = { type: "literal", value: "send", description: "\"send\"" },
	            peg$c3 = "p",
	            peg$c4 = { type: "literal", value: "p", description: "\"p\"" },
	            peg$c5 = "to",
	            peg$c6 = { type: "literal", value: "to", description: "\"to\"" },
	            peg$c7 = ".",
	            peg$c8 = { type: "literal", value: ".", description: "\".\"" },
	            peg$c9 = function(cult, amount) { return priestToCult(cult, amount) },
	            peg$c10 = "for",
	            peg$c11 = { type: "literal", value: "for", description: "\"for\"" },
	            peg$c12 = function(amount) { return amount; },
	            peg$c13 = function() { return 2 },
	            peg$c14 = "build",
	            peg$c15 = { type: "literal", value: "build", description: "\"build\"" },
	            peg$c16 = function(space) { return build(space) },
	            peg$c17 = "upgrade",
	            peg$c18 = { type: "literal", value: "upgrade", description: "\"upgrade\"" },
	            peg$c19 = function(space, building) { return upgrade(building, space) },
	            peg$c20 = "pass",
	            peg$c21 = { type: "literal", value: "pass", description: "\"pass\"" },
	            peg$c22 = function(bonus) { return pass(bonus) },
	            peg$c23 = function() { return pass("end") },
	            peg$c24 = "action",
	            peg$c25 = { type: "literal", value: "action", description: "\"action\"" },
	            peg$c26 = function(act) { return action(act); },
	            peg$c27 = "leech",
	            peg$c28 = { type: "literal", value: "leech", description: "\"leech\"" },
	            peg$c29 = "from",
	            peg$c30 = { type: "literal", value: "from", description: "\"from\"" },
	            peg$c31 = function(amount, faction) { return leech(true, amount, faction) },
	            peg$c32 = "decline",
	            peg$c33 = { type: "literal", value: "decline", description: "\"decline\"" },
	            peg$c34 = function(amount, faction) { return leech(false, amount, faction) },
	            peg$c35 = function(amount) { return leech(true, amount); },
	            peg$c36 = function(amount) { return leech(false, amount); },
	            peg$c37 = "advance",
	            peg$c38 = { type: "literal", value: "advance", description: "\"advance\"" },
	            peg$c39 = function(track) { return advance(track); },
	            peg$c40 = "wait",
	            peg$c41 = { type: "literal", value: "wait", description: "\"wait\"" },
	            peg$c42 = function() { return wait(); },
	            peg$c43 = "done",
	            peg$c44 = { type: "literal", value: "done", description: "\"done\"" },
	            peg$c45 = function() {return done(); },
	            peg$c46 = "setup",
	            peg$c47 = { type: "literal", value: "setup", description: "\"setup\"" },
	            peg$c48 = function() { return factionSetup() },
	            peg$c49 = "default game options",
	            peg$c50 = { type: "literal", value: "default game options", description: "\"default game options\"" },
	            peg$c51 = function() { return gameStart(); },
	            peg$c52 = "option",
	            peg$c53 = { type: "literal", value: "option", description: "\"option\"" },
	            peg$c54 = function(opt) { return optionSetup(opt); },
	            peg$c55 = "round",
	            peg$c56 = { type: "literal", value: "round", description: "\"round\"" },
	            peg$c57 = "scoring:",
	            peg$c58 = { type: "literal", value: "scoring:", description: "\"scoring:\"" },
	            peg$c59 = ",",
	            peg$c60 = { type: "literal", value: ",", description: "\",\"" },
	            peg$c61 = ">>",
	            peg$c62 = { type: "literal", value: ">>", description: "\">>\"" },
	            peg$c63 = function(roundNum, roundTile, goal, points) { return roundSetup(roundNum, roundTile, goal, points); },
	            peg$c64 = "removing tile ",
	            peg$c65 = { type: "literal", value: "removing tile ", description: "\"removing tile \"" },
	            peg$c66 = function(bonusTile) { return bonusSetup(bonusTile); },
	            peg$c67 = "player ",
	            peg$c68 = { type: "literal", value: "Player ", description: "\"Player \"" },
	            peg$c69 = ": ",
	            peg$c70 = { type: "literal", value: ": ", description: "\": \"" },
	            peg$c71 = function(playerNum, playerName) { return playerSetup(playerName, playerNum); },
	            peg$c72 = "added final scoring tile: ",
	            peg$c73 = { type: "literal", value: "added final scoring tile: ", description: "\"added final scoring tile: \"" },
	            peg$c74 = function(scoringTile) { return additionalScoringSetup(scoringTile); },
	            peg$c75 = "round ",
	            peg$c76 = { type: "literal", value: "Round ", description: "\"Round \"" },
	            peg$c77 = " income",
	            peg$c78 = { type: "literal", value: " income", description: "\" income\"" },
	            peg$c79 = function(roundNum) { return roundStart(roundNum) },
	            peg$c80 = "other_income_for_faction",
	            peg$c81 = { type: "literal", value: "other_income_for_faction", description: "\"other_income_for_faction\"" },
	            peg$c82 = function() { return income("base"); },
	            peg$c83 = "cult_income_for_faction",
	            peg$c84 = { type: "literal", value: "cult_income_for_faction", description: "\"cult_income_for_faction\"" },
	            peg$c85 = function() { return income("cult"); },
	            peg$c86 = "+",
	            peg$c87 = { type: "literal", value: "+", description: "\"+\"" },
	            peg$c88 = "vp for ",
	            peg$c89 = { type: "literal", value: "vp for ", description: "\"vp for \"" },
	            peg$c90 = function(points, source) { return endGamePoints(source, points); },
	            peg$c91 = "score_resources",
	            peg$c92 = { type: "literal", value: "score_resources", description: "\"score_resources\"" },
	            peg$c93 = function() { return endGamePoints("resources", 0); },
	            peg$c94 = "convert",
	            peg$c95 = { type: "literal", value: "convert", description: "\"convert\"" },
	            peg$c96 = function(from, to) { return convert(from, to) },
	            peg$c97 = function(quantity, res) { return resource(res, quantity) },
	            peg$c98 = function(res) { return resource(res, 1) },
	            peg$c99 = "+tw",
	            peg$c100 = { type: "literal", value: "+tw", description: "\"+tw\"" },
	            peg$c101 = function(num) { return town(num, 1) },
	            peg$c102 = "tw",
	            peg$c103 = { type: "literal", value: "tw", description: "\"tw\"" },
	            peg$c104 = function(count, num) { return town(num, count); },
	            peg$c105 = "+fav",
	            peg$c106 = { type: "literal", value: "+fav", description: "\"+fav\"" },
	            peg$c107 = function(num) { return favor(num) },
	            peg$c108 = "dig",
	            peg$c109 = { type: "literal", value: "dig", description: "\"dig\"" },
	            peg$c110 = function(amount) { return dig(amount); },
	            peg$c111 = "+fire",
	            peg$c112 = { type: "literal", value: "+fire", description: "\"+fire\"" },
	            peg$c113 = function() { return cult("fire", 1); },
	            peg$c114 = "+water",
	            peg$c115 = { type: "literal", value: "+water", description: "\"+water\"" },
	            peg$c116 = function() { return cult("water", 1); },
	            peg$c117 = "+earth",
	            peg$c118 = { type: "literal", value: "+earth", description: "\"+earth\"" },
	            peg$c119 = function() { return cult("earth", 1); },
	            peg$c120 = "+air",
	            peg$c121 = { type: "literal", value: "+air", description: "\"+air\"" },
	            peg$c122 = function() { return cult("air", 1); },
	            peg$c123 = "fire",
	            peg$c124 = { type: "literal", value: "fire", description: "\"fire\"" },
	            peg$c125 = function(amount) { return cult("fire", amount); },
	            peg$c126 = "water",
	            peg$c127 = { type: "literal", value: "water", description: "\"water\"" },
	            peg$c128 = function(amount) { return cult("water", amount); },
	            peg$c129 = "earth",
	            peg$c130 = { type: "literal", value: "earth", description: "\"earth\"" },
	            peg$c131 = function(amount) { return cult("earth", amount); },
	            peg$c132 = "air",
	            peg$c133 = { type: "literal", value: "air", description: "\"air\"" },
	            peg$c134 = function(amount) { return cult("air", amount); },
	            peg$c135 = "-fire",
	            peg$c136 = { type: "literal", value: "-fire", description: "\"-fire\"" },
	            peg$c137 = function() { return cult("fire", -1); },
	            peg$c138 = "-water",
	            peg$c139 = { type: "literal", value: "-water", description: "\"-water\"" },
	            peg$c140 = function() { return cult("water", -1); },
	            peg$c141 = "-earth",
	            peg$c142 = { type: "literal", value: "-earth", description: "\"-earth\"" },
	            peg$c143 = function() { return cult("earth", -1); },
	            peg$c144 = "-air",
	            peg$c145 = { type: "literal", value: "-air", description: "\"-air\"" },
	            peg$c146 = function() { return cult("air", -1); },
	            peg$c147 = "-",
	            peg$c148 = { type: "literal", value: "-", description: "\"-\"" },
	            peg$c149 = function(amount) { return cult("fire", -1 * amount); },
	            peg$c150 = function(amount) { return cult("water", -1 * amount); },
	            peg$c151 = function(amount) { return cult("earth", -1 * amount); },
	            peg$c152 = function(amount) { return cult("air", -1 * amount); },
	            peg$c153 = "transform",
	            peg$c154 = { type: "literal", value: "transform", description: "\"transform\"" },
	            peg$c155 = function(space, color) { return transform(space, color); },
	            peg$c156 = function(space) { return transform(space); },
	            peg$c157 = "burn",
	            peg$c158 = { type: "literal", value: "burn", description: "\"burn\"" },
	            peg$c159 = function(amount) { return burn(amount); },
	            peg$c160 = "connect",
	            peg$c161 = { type: "literal", value: "connect", description: "\"connect\"" },
	            peg$c162 = function(tiles) { return mermaidConnect(tiles); },
	            peg$c163 = "bridge",
	            peg$c164 = { type: "literal", value: "bridge", description: "\"bridge\"" },
	            peg$c165 = ":",
	            peg$c166 = { type: "literal", value: ":", description: "\":\"" },
	            peg$c167 = function(tile1, tile2, tile3) { return bridge(tile1, tile2, tile3) },
	            peg$c168 = function(tile1, tile2) { return bridge(tile1, tile2) },
	            peg$c169 = "[opponent accepted power]",
	            peg$c170 = { type: "literal", value: "[opponent accepted power]", description: "\"[opponent accepted power]\"" },
	            peg$c171 = function() { return leechOption(true); },
	            peg$c172 = "[all opponents declined power]",
	            peg$c173 = { type: "literal", value: "[all opponents declined power]", description: "\"[all opponents declined power]\"" },
	            peg$c174 = function() { return leechOption(false); },
	            peg$c175 = "gain p3 for vp",
	            peg$c176 = { type: "literal", value: "gain P3 for VP", description: "\"gain P3 for VP\"" },
	            peg$c177 = function() { return ssGainPowerToken(true); },
	            peg$c178 = "-gain_p3_for_vp",
	            peg$c179 = { type: "literal", value: "-GAIN_P3_FOR_VP", description: "\"-GAIN_P3_FOR_VP\"" },
	            peg$c180 = function() { return ssGainPowerToken(false); },
	            peg$c181 = "unlock-terrain",
	            peg$c182 = { type: "literal", value: "unlock-terrain", description: "\"unlock-terrain\"" },
	            peg$c183 = "gain-priest",
	            peg$c184 = { type: "literal", value: "gain-priest", description: "\"gain-priest\"" },
	            peg$c185 = function() { return rwUnlockTerrain("gain-priest"); },
	            peg$c186 = function(terrain) { return rwUnlockTerrain(terrain); },
	            peg$c187 = "pick-color ",
	            peg$c188 = { type: "literal", value: "pick-color ", description: "\"pick-color \"" },
	            peg$c189 = function(color) { return pickColor(color); },
	            peg$c190 = /^[a-z0-9]/i,
	            peg$c191 = { type: "class", value: "[a-z0-9]i", description: "[a-z0-9]i" },
	            peg$c192 = function(characters) { return a2s(characters); },
	            peg$c193 = /^[a-z0-9\-\/.:]/i,
	            peg$c194 = { type: "class", value: "[a-z0-9-/.:]i", description: "[a-z0-9-/.:]i" },
	            peg$c195 = { type: "any", description: "any character" },
	            peg$c196 = /^[0-9]/,
	            peg$c197 = { type: "class", value: "[0-9]", description: "[0-9]" },
	            peg$c198 = function(digits) { return parseInt(a2s(digits),10); },
	            peg$c199 = { type: "other", description: "whitespace" },
	            peg$c200 = /^[ \t\n\r]/,
	            peg$c201 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },

	            peg$currPos          = 0,
	            peg$savedPos         = 0,
	            peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
	            peg$maxFailPos       = 0,
	            peg$maxFailExpected  = [],
	            peg$silentFails      = 0,

	            peg$result;

	        if ("startRule" in options) {
	          if (!(options.startRule in peg$startRuleFunctions)) {
	            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	          }

	          peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
	        }

	        function text() {
	          return input.substring(peg$savedPos, peg$currPos);
	        }

	        function location() {
	          return peg$computeLocation(peg$savedPos, peg$currPos);
	        }

	        function expected(description) {
	          throw peg$buildException(
	            null,
	            [{ type: "other", description: description }],
	            input.substring(peg$savedPos, peg$currPos),
	            peg$computeLocation(peg$savedPos, peg$currPos)
	          );
	        }

	        function error(message) {
	          throw peg$buildException(
	            message,
	            null,
	            input.substring(peg$savedPos, peg$currPos),
	            peg$computeLocation(peg$savedPos, peg$currPos)
	          );
	        }

	        function peg$computePosDetails(pos) {
	          var details = peg$posDetailsCache[pos],
	              p, ch;

	          if (details) {
	            return details;
	          } else {
	            p = pos - 1;
	            while (!peg$posDetailsCache[p]) {
	              p--;
	            }

	            details = peg$posDetailsCache[p];
	            details = {
	              line:   details.line,
	              column: details.column,
	              seenCR: details.seenCR
	            };

	            while (p < pos) {
	              ch = input.charAt(p);
	              if (ch === "\n") {
	                if (!details.seenCR) { details.line++; }
	                details.column = 1;
	                details.seenCR = false;
	              } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	                details.line++;
	                details.column = 1;
	                details.seenCR = true;
	              } else {
	                details.column++;
	                details.seenCR = false;
	              }

	              p++;
	            }

	            peg$posDetailsCache[pos] = details;
	            return details;
	          }
	        }

	        function peg$computeLocation(startPos, endPos) {
	          var startPosDetails = peg$computePosDetails(startPos),
	              endPosDetails   = peg$computePosDetails(endPos);

	          return {
	            start: {
	              offset: startPos,
	              line:   startPosDetails.line,
	              column: startPosDetails.column
	            },
	            end: {
	              offset: endPos,
	              line:   endPosDetails.line,
	              column: endPosDetails.column
	            }
	          };
	        }

	        function peg$fail(expected) {
	          if (peg$currPos < peg$maxFailPos) { return; }

	          if (peg$currPos > peg$maxFailPos) {
	            peg$maxFailPos = peg$currPos;
	            peg$maxFailExpected = [];
	          }

	          peg$maxFailExpected.push(expected);
	        }

	        function peg$buildException(message, expected, found, location) {
	          function cleanupExpected(expected) {
	            var i = 1;

	            expected.sort(function(a, b) {
	              if (a.description < b.description) {
	                return -1;
	              } else if (a.description > b.description) {
	                return 1;
	              } else {
	                return 0;
	              }
	            });

	            while (i < expected.length) {
	              if (expected[i - 1] === expected[i]) {
	                expected.splice(i, 1);
	              } else {
	                i++;
	              }
	            }
	          }

	          function buildMessage(expected, found) {
	            function stringEscape(s) {
	              function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

	              return s
	                .replace(/\\/g,   '\\\\')
	                .replace(/"/g,    '\\"')
	                .replace(/\x08/g, '\\b')
	                .replace(/\t/g,   '\\t')
	                .replace(/\n/g,   '\\n')
	                .replace(/\f/g,   '\\f')
	                .replace(/\r/g,   '\\r')
	                .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
	                .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
	                .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
	                .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
	            }

	            var expectedDescs = new Array(expected.length),
	                expectedDesc, foundDesc, i;

	            for (i = 0; i < expected.length; i++) {
	              expectedDescs[i] = expected[i].description;
	            }

	            expectedDesc = expected.length > 1
	              ? expectedDescs.slice(0, -1).join(", ")
	                  + " or "
	                  + expectedDescs[expected.length - 1]
	              : expectedDescs[0];

	            foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

	            return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	          }

	          if (expected !== null) {
	            cleanupExpected(expected);
	          }

	          return new peg$SyntaxError(
	            message !== null ? message : buildMessage(expected, found),
	            expected,
	            found,
	            location
	          );
	        }

	        function peg$parseTurn() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          s1 = [];
	          s2 = peg$parseAction();
	          while (s2 !== peg$FAILED) {
	            s1.push(s2);
	            s2 = peg$parseAction();
	          }
	          if (s1 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c0(s1);
	          }
	          s0 = s1;

	          return s0;
	        }

	        function peg$parseAction() {
	          var s0;

	          s0 = peg$parsePriestToCult();
	          if (s0 === peg$FAILED) {
	            s0 = peg$parseBuild();
	            if (s0 === peg$FAILED) {
	              s0 = peg$parseUpgrade();
	              if (s0 === peg$FAILED) {
	                s0 = peg$parsePass();
	                if (s0 === peg$FAILED) {
	                  s0 = peg$parseOctagonalAction();
	                  if (s0 === peg$FAILED) {
	                    s0 = peg$parseLeech();
	                    if (s0 === peg$FAILED) {
	                      s0 = peg$parseAdvance();
	                      if (s0 === peg$FAILED) {
	                        s0 = peg$parseTransform();
	                        if (s0 === peg$FAILED) {
	                          s0 = peg$parseDone();
	                          if (s0 === peg$FAILED) {
	                            s0 = peg$parseWait();
	                            if (s0 === peg$FAILED) {
	                              s0 = peg$parseFactionSetup();
	                              if (s0 === peg$FAILED) {
	                                s0 = peg$parseGameSetup();
	                                if (s0 === peg$FAILED) {
	                                  s0 = peg$parseOptionSetup();
	                                  if (s0 === peg$FAILED) {
	                                    s0 = peg$parseRoundSetup();
	                                    if (s0 === peg$FAILED) {
	                                      s0 = peg$parseBonusSetup();
	                                      if (s0 === peg$FAILED) {
	                                        s0 = peg$parsePlayerSetup();
	                                        if (s0 === peg$FAILED) {
	                                          s0 = peg$parseAdditionalScoringSetup();
	                                          if (s0 === peg$FAILED) {
	                                            s0 = peg$parseRoundStart();
	                                            if (s0 === peg$FAILED) {
	                                              s0 = peg$parseBaseIncome();
	                                              if (s0 === peg$FAILED) {
	                                                s0 = peg$parseCultIncome();
	                                                if (s0 === peg$FAILED) {
	                                                  s0 = peg$parseEndGamePoints();
	                                                  if (s0 === peg$FAILED) {
	                                                    s0 = peg$parseConvert();
	                                                    if (s0 === peg$FAILED) {
	                                                      s0 = peg$parseTown();
	                                                      if (s0 === peg$FAILED) {
	                                                        s0 = peg$parseFavor();
	                                                        if (s0 === peg$FAILED) {
	                                                          s0 = peg$parseDig();
	                                                          if (s0 === peg$FAILED) {
	                                                            s0 = peg$parseCult();
	                                                            if (s0 === peg$FAILED) {
	                                                              s0 = peg$parseBurn();
	                                                              if (s0 === peg$FAILED) {
	                                                                s0 = peg$parseMermaidConnect();
	                                                                if (s0 === peg$FAILED) {
	                                                                  s0 = peg$parseBridge();
	                                                                  if (s0 === peg$FAILED) {
	                                                                    s0 = peg$parseTransform();
	                                                                    if (s0 === peg$FAILED) {
	                                                                      s0 = peg$parseLeechOption();
	                                                                      if (s0 === peg$FAILED) {
	                                                                        s0 = peg$parseRiverwalkersUnlockTerrain();
	                                                                        if (s0 === peg$FAILED) {
	                                                                          s0 = peg$parseShapeshifterGainPowerToken();
	                                                                          if (s0 === peg$FAILED) {
	                                                                            s0 = peg$parsePickColor();
	                                                                          }
	                                                                        }
	                                                                      }
	                                                                    }
	                                                                  }
	                                                                }
	                                                              }
	                                                            }
	                                                          }
	                                                        }
	                                                      }
	                                                    }
	                                                  }
	                                                }
	                                              }
	                                            }
	                                          }
	                                        }
	                                      }
	                                    }
	                                  }
	                                }
	                              }
	                            }
	                          }
	                        }
	                      }
	                    }
	                  }
	                }
	              }
	            }
	          }

	          return s0;
	        }

	        function peg$parsePriestToCult() {
	          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c1) {
	            s1 = input.substr(peg$currPos, 4);
	            peg$currPos += 4;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c2); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              if (input.substr(peg$currPos, 1).toLowerCase() === peg$c3) {
	                s3 = input.charAt(peg$currPos);
	                peg$currPos++;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c4); }
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.substr(peg$currPos, 2).toLowerCase() === peg$c5) {
	                    s5 = input.substr(peg$currPos, 2);
	                    peg$currPos += 2;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c6); }
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      s7 = peg$parseString();
	                      if (s7 !== peg$FAILED) {
	                        s8 = peg$parse_();
	                        if (s8 !== peg$FAILED) {
	                          s9 = peg$parsePriestToCultFor();
	                          if (s9 !== peg$FAILED) {
	                            s10 = peg$parse_();
	                            if (s10 !== peg$FAILED) {
	                              if (input.charCodeAt(peg$currPos) === 46) {
	                                s11 = peg$c7;
	                                peg$currPos++;
	                              } else {
	                                s11 = peg$FAILED;
	                                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                              }
	                              if (s11 === peg$FAILED) {
	                                s11 = null;
	                              }
	                              if (s11 !== peg$FAILED) {
	                                s12 = peg$parse_();
	                                if (s12 !== peg$FAILED) {
	                                  peg$savedPos = s0;
	                                  s1 = peg$c9(s7, s9);
	                                  s0 = s1;
	                                } else {
	                                  peg$currPos = s0;
	                                  s0 = peg$FAILED;
	                                }
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parsePriestToCultFor() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c10) {
	            s1 = input.substr(peg$currPos, 3);
	            peg$currPos += 3;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c11); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseNumber();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c12(s3);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c13();
	            }
	            s0 = s1;
	          }

	          return s0;
	        }

	        function peg$parseBuild() {
	          var s0, s1, s2, s3, s4, s5, s6;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c14) {
	            s1 = input.substr(peg$currPos, 5);
	            peg$currPos += 5;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c15); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 46) {
	                    s5 = peg$c7;
	                    peg$currPos++;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                  }
	                  if (s5 === peg$FAILED) {
	                    s5 = null;
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c16(s3);
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseUpgrade() {
	          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 7).toLowerCase() === peg$c17) {
	            s1 = input.substr(peg$currPos, 7);
	            peg$currPos += 7;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c18); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.substr(peg$currPos, 2) === peg$c5) {
	                    s5 = peg$c5;
	                    peg$currPos += 2;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c6); }
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      s7 = peg$parseString();
	                      if (s7 !== peg$FAILED) {
	                        s8 = peg$parse_();
	                        if (s8 !== peg$FAILED) {
	                          if (input.charCodeAt(peg$currPos) === 46) {
	                            s9 = peg$c7;
	                            peg$currPos++;
	                          } else {
	                            s9 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                          }
	                          if (s9 === peg$FAILED) {
	                            s9 = null;
	                          }
	                          if (s9 !== peg$FAILED) {
	                            s10 = peg$parse_();
	                            if (s10 !== peg$FAILED) {
	                              peg$savedPos = s0;
	                              s1 = peg$c19(s3, s7);
	                              s0 = s1;
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parsePass() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c20) {
	            s1 = input.substr(peg$currPos, 4);
	            peg$currPos += 4;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c21); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c22(s3);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 4).toLowerCase() === peg$c20) {
	              s1 = input.substr(peg$currPos, 4);
	              peg$currPos += 4;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c21); }
	            }
	            if (s1 !== peg$FAILED) {
	              s2 = peg$parse_();
	              if (s2 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c23();
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          }

	          return s0;
	        }

	        function peg$parseOctagonalAction() {
	          var s0, s1, s2, s3, s4, s5, s6;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c24) {
	            s1 = input.substr(peg$currPos, 6);
	            peg$currPos += 6;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c25); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 46) {
	                    s5 = peg$c7;
	                    peg$currPos++;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                  }
	                  if (s5 === peg$FAILED) {
	                    s5 = null;
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c26(s3);
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseLeech() {
	          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c27) {
	            s1 = input.substr(peg$currPos, 5);
	            peg$currPos += 5;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c28); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseNumber();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.substr(peg$currPos, 4).toLowerCase() === peg$c29) {
	                    s5 = input.substr(peg$currPos, 4);
	                    peg$currPos += 4;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c30); }
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      s7 = peg$parseString();
	                      if (s7 !== peg$FAILED) {
	                        s8 = peg$parse_();
	                        if (s8 !== peg$FAILED) {
	                          if (input.charCodeAt(peg$currPos) === 46) {
	                            s9 = peg$c7;
	                            peg$currPos++;
	                          } else {
	                            s9 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                          }
	                          if (s9 === peg$FAILED) {
	                            s9 = null;
	                          }
	                          if (s9 !== peg$FAILED) {
	                            s10 = peg$parse_();
	                            if (s10 !== peg$FAILED) {
	                              peg$savedPos = s0;
	                              s1 = peg$c31(s3, s7);
	                              s0 = s1;
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 7).toLowerCase() === peg$c32) {
	              s1 = input.substr(peg$currPos, 7);
	              peg$currPos += 7;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c33); }
	            }
	            if (s1 !== peg$FAILED) {
	              s2 = peg$parse_();
	              if (s2 !== peg$FAILED) {
	                s3 = peg$parseNumber();
	                if (s3 !== peg$FAILED) {
	                  s4 = peg$parse_();
	                  if (s4 !== peg$FAILED) {
	                    if (input.substr(peg$currPos, 4).toLowerCase() === peg$c29) {
	                      s5 = input.substr(peg$currPos, 4);
	                      peg$currPos += 4;
	                    } else {
	                      s5 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c30); }
	                    }
	                    if (s5 !== peg$FAILED) {
	                      s6 = peg$parse_();
	                      if (s6 !== peg$FAILED) {
	                        s7 = peg$parseString();
	                        if (s7 !== peg$FAILED) {
	                          s8 = peg$parse_();
	                          if (s8 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 46) {
	                              s9 = peg$c7;
	                              peg$currPos++;
	                            } else {
	                              s9 = peg$FAILED;
	                              if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                            }
	                            if (s9 === peg$FAILED) {
	                              s9 = null;
	                            }
	                            if (s9 !== peg$FAILED) {
	                              s10 = peg$parse_();
	                              if (s10 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c34(s3, s7);
	                                s0 = s1;
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	              s0 = peg$currPos;
	              if (input.substr(peg$currPos, 5).toLowerCase() === peg$c27) {
	                s1 = input.substr(peg$currPos, 5);
	                peg$currPos += 5;
	              } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c28); }
	              }
	              if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                  s3 = peg$parseNumber();
	                  if (s3 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c35(s3);
	                    s0 = s1;
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	              if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.substr(peg$currPos, 7).toLowerCase() === peg$c32) {
	                  s1 = input.substr(peg$currPos, 7);
	                  peg$currPos += 7;
	                } else {
	                  s1 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c33); }
	                }
	                if (s1 !== peg$FAILED) {
	                  s2 = peg$parse_();
	                  if (s2 !== peg$FAILED) {
	                    s3 = peg$parseNumber();
	                    if (s3 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c36(s3);
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              }
	            }
	          }

	          return s0;
	        }

	        function peg$parseAdvance() {
	          var s0, s1, s2, s3, s4, s5, s6;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 7).toLowerCase() === peg$c37) {
	            s1 = input.substr(peg$currPos, 7);
	            peg$currPos += 7;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c38); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 46) {
	                    s5 = peg$c7;
	                    peg$currPos++;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                  }
	                  if (s5 === peg$FAILED) {
	                    s5 = null;
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c39(s3);
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseWait() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c40) {
	            s1 = input.substr(peg$currPos, 4);
	            peg$currPos += 4;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c41); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              if (input.charCodeAt(peg$currPos) === 46) {
	                s3 = peg$c7;
	                peg$currPos++;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	              }
	              if (s3 === peg$FAILED) {
	                s3 = null;
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c42();
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseDone() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c43) {
	            s1 = input.substr(peg$currPos, 4);
	            peg$currPos += 4;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c44); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              if (input.charCodeAt(peg$currPos) === 46) {
	                s3 = peg$c7;
	                peg$currPos++;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	              }
	              if (s3 === peg$FAILED) {
	                s3 = null;
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c45();
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseFactionSetup() {
	          var s0, s1;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c46) {
	            s1 = input.substr(peg$currPos, 5);
	            peg$currPos += 5;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c47); }
	          }
	          if (s1 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c48();
	          }
	          s0 = s1;

	          return s0;
	        }

	        function peg$parseGameSetup() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 20).toLowerCase() === peg$c49) {
	            s1 = input.substr(peg$currPos, 20);
	            peg$currPos += 20;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c50); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c51();
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseOptionSetup() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c52) {
	            s1 = input.substr(peg$currPos, 6);
	            peg$currPos += 6;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c53); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseOptionString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c54(s3);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseRoundSetup() {
	          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c55) {
	            s1 = input.substr(peg$currPos, 5);
	            peg$currPos += 5;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c56); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseNumber();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.substr(peg$currPos, 8).toLowerCase() === peg$c57) {
	                    s5 = input.substr(peg$currPos, 8);
	                    peg$currPos += 8;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c58); }
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      s7 = peg$parseString();
	                      if (s7 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 44) {
	                          s8 = peg$c59;
	                          peg$currPos++;
	                        } else {
	                          s8 = peg$FAILED;
	                          if (peg$silentFails === 0) { peg$fail(peg$c60); }
	                        }
	                        if (s8 !== peg$FAILED) {
	                          s9 = peg$parse_();
	                          if (s9 !== peg$FAILED) {
	                            s10 = peg$parseOptionString();
	                            if (s10 !== peg$FAILED) {
	                              s11 = peg$parse_();
	                              if (s11 !== peg$FAILED) {
	                                if (input.substr(peg$currPos, 2) === peg$c61) {
	                                  s12 = peg$c61;
	                                  peg$currPos += 2;
	                                } else {
	                                  s12 = peg$FAILED;
	                                  if (peg$silentFails === 0) { peg$fail(peg$c62); }
	                                }
	                                if (s12 !== peg$FAILED) {
	                                  s13 = peg$parse_();
	                                  if (s13 !== peg$FAILED) {
	                                    s14 = peg$parseNumber();
	                                    if (s14 !== peg$FAILED) {
	                                      s15 = peg$parse_();
	                                      if (s15 !== peg$FAILED) {
	                                        peg$savedPos = s0;
	                                        s1 = peg$c63(s3, s7, s10, s14);
	                                        s0 = s1;
	                                      } else {
	                                        peg$currPos = s0;
	                                        s0 = peg$FAILED;
	                                      }
	                                    } else {
	                                      peg$currPos = s0;
	                                      s0 = peg$FAILED;
	                                    }
	                                  } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                  }
	                                } else {
	                                  peg$currPos = s0;
	                                  s0 = peg$FAILED;
	                                }
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseBonusSetup() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 14).toLowerCase() === peg$c64) {
	            s1 = input.substr(peg$currPos, 14);
	            peg$currPos += 14;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c65); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseString();
	            if (s2 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c66(s2);
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parsePlayerSetup() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 7).toLowerCase() === peg$c67) {
	            s1 = input.substr(peg$currPos, 7);
	            peg$currPos += 7;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c68); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseNumber();
	            if (s2 !== peg$FAILED) {
	              if (input.substr(peg$currPos, 2) === peg$c69) {
	                s3 = peg$c69;
	                peg$currPos += 2;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c70); }
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parseNameString();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c71(s2, s4);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseAdditionalScoringSetup() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 26).toLowerCase() === peg$c72) {
	            s1 = input.substr(peg$currPos, 26);
	            peg$currPos += 26;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c73); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseOptionString();
	            if (s2 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c74(s2);
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseRoundStart() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c75) {
	            s1 = input.substr(peg$currPos, 6);
	            peg$currPos += 6;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c76); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseNumber();
	            if (s2 !== peg$FAILED) {
	              if (input.substr(peg$currPos, 7).toLowerCase() === peg$c77) {
	                s3 = input.substr(peg$currPos, 7);
	                peg$currPos += 7;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c78); }
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c79(s2);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseBaseIncome() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 24) === peg$c80) {
	            s1 = peg$c80;
	            peg$currPos += 24;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c81); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c82();
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseCultIncome() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 23) === peg$c83) {
	            s1 = peg$c83;
	            peg$currPos += 23;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c84); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c85();
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseEndGamePoints() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.charCodeAt(peg$currPos) === 43) {
	            s1 = peg$c86;
	            peg$currPos++;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c87); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseNumber();
	            if (s2 !== peg$FAILED) {
	              if (input.substr(peg$currPos, 7) === peg$c88) {
	                s3 = peg$c88;
	                peg$currPos += 7;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c89); }
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parseOptionString();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c90(s2, s4);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 15) === peg$c91) {
	              s1 = peg$c91;
	              peg$currPos += 15;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c92); }
	            }
	            if (s1 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c93();
	            }
	            s0 = s1;
	          }

	          return s0;
	        }

	        function peg$parseConvert() {
	          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 7).toLowerCase() === peg$c94) {
	            s1 = input.substr(peg$currPos, 7);
	            peg$currPos += 7;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c95); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseResourceAmount();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.substr(peg$currPos, 2).toLowerCase() === peg$c5) {
	                    s5 = input.substr(peg$currPos, 2);
	                    peg$currPos += 2;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c6); }
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      s7 = peg$parseResourceAmount();
	                      if (s7 !== peg$FAILED) {
	                        s8 = peg$parse_();
	                        if (s8 !== peg$FAILED) {
	                          if (input.charCodeAt(peg$currPos) === 46) {
	                            s9 = peg$c7;
	                            peg$currPos++;
	                          } else {
	                            s9 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                          }
	                          if (s9 === peg$FAILED) {
	                            s9 = null;
	                          }
	                          if (s9 !== peg$FAILED) {
	                            s10 = peg$parse_();
	                            if (s10 !== peg$FAILED) {
	                              peg$savedPos = s0;
	                              s1 = peg$c96(s3, s7);
	                              s0 = s1;
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseResourceAmount() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          s1 = peg$parseNumber();
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseString();
	            if (s2 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c97(s1, s2);
	              s0 = s1;
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            s1 = peg$parseString();
	            if (s1 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c98(s1);
	            }
	            s0 = s1;
	          }

	          return s0;
	        }

	        function peg$parseTown() {
	          var s0, s1, s2, s3, s4, s5, s6;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c99) {
	            s1 = input.substr(peg$currPos, 3);
	            peg$currPos += 3;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c100); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseNumber();
	            if (s2 !== peg$FAILED) {
	              if (input.charCodeAt(peg$currPos) === 46) {
	                s3 = peg$c7;
	                peg$currPos++;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	              }
	              if (s3 === peg$FAILED) {
	                s3 = null;
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c101(s2);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            s1 = [];
	            if (input.charCodeAt(peg$currPos) === 43) {
	              s2 = peg$c86;
	              peg$currPos++;
	            } else {
	              s2 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c87); }
	            }
	            if (s2 !== peg$FAILED) {
	              while (s2 !== peg$FAILED) {
	                s1.push(s2);
	                if (input.charCodeAt(peg$currPos) === 43) {
	                  s2 = peg$c86;
	                  peg$currPos++;
	                } else {
	                  s2 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c87); }
	                }
	              }
	            } else {
	              s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	              s2 = [];
	              s3 = peg$parseNumber();
	              if (s3 !== peg$FAILED) {
	                while (s3 !== peg$FAILED) {
	                  s2.push(s3);
	                  s3 = peg$parseNumber();
	                }
	              } else {
	                s2 = peg$FAILED;
	              }
	              if (s2 !== peg$FAILED) {
	                s3 = [];
	                if (input.substr(peg$currPos, 2).toLowerCase() === peg$c102) {
	                  s4 = input.substr(peg$currPos, 2);
	                  peg$currPos += 2;
	                } else {
	                  s4 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c103); }
	                }
	                if (s4 !== peg$FAILED) {
	                  while (s4 !== peg$FAILED) {
	                    s3.push(s4);
	                    if (input.substr(peg$currPos, 2).toLowerCase() === peg$c102) {
	                      s4 = input.substr(peg$currPos, 2);
	                      peg$currPos += 2;
	                    } else {
	                      s4 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c103); }
	                    }
	                  }
	                } else {
	                  s3 = peg$FAILED;
	                }
	                if (s3 !== peg$FAILED) {
	                  s4 = peg$parseNumber();
	                  if (s4 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 46) {
	                      s5 = peg$c7;
	                      peg$currPos++;
	                    } else {
	                      s5 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                    }
	                    if (s5 === peg$FAILED) {
	                      s5 = null;
	                    }
	                    if (s5 !== peg$FAILED) {
	                      s6 = peg$parse_();
	                      if (s6 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c104(s2, s4);
	                        s0 = s1;
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          }

	          return s0;
	        }

	        function peg$parseFavor() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c105) {
	            s1 = input.substr(peg$currPos, 4);
	            peg$currPos += 4;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c106); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseNumber();
	            if (s2 !== peg$FAILED) {
	              if (input.charCodeAt(peg$currPos) === 46) {
	                s3 = peg$c7;
	                peg$currPos++;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	              }
	              if (s3 === peg$FAILED) {
	                s3 = null;
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c107(s2);
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseDig() {
	          var s0, s1, s2, s3, s4, s5;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 3).toLowerCase() === peg$c108) {
	            s1 = input.substr(peg$currPos, 3);
	            peg$currPos += 3;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c109); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseNumber();
	              if (s3 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 46) {
	                  s4 = peg$c7;
	                  peg$currPos++;
	                } else {
	                  s4 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                }
	                if (s4 === peg$FAILED) {
	                  s4 = null;
	                }
	                if (s4 !== peg$FAILED) {
	                  s5 = peg$parse_();
	                  if (s5 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c110(s3);
	                    s0 = s1;
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseCult() {
	          var s0, s1, s2, s3, s4, s5;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c111) {
	            s1 = input.substr(peg$currPos, 5);
	            peg$currPos += 5;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c112); }
	          }
	          if (s1 !== peg$FAILED) {
	            if (input.charCodeAt(peg$currPos) === 46) {
	              s2 = peg$c7;
	              peg$currPos++;
	            } else {
	              s2 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c8); }
	            }
	            if (s2 === peg$FAILED) {
	              s2 = null;
	            }
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parse_();
	              if (s3 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c113();
	                s0 = s1;
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 6).toLowerCase() === peg$c114) {
	              s1 = input.substr(peg$currPos, 6);
	              peg$currPos += 6;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c115); }
	            }
	            if (s1 !== peg$FAILED) {
	              if (input.charCodeAt(peg$currPos) === 46) {
	                s2 = peg$c7;
	                peg$currPos++;
	              } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	              }
	              if (s2 === peg$FAILED) {
	                s2 = null;
	              }
	              if (s2 !== peg$FAILED) {
	                s3 = peg$parse_();
	                if (s3 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c116();
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	              s0 = peg$currPos;
	              if (input.substr(peg$currPos, 6).toLowerCase() === peg$c117) {
	                s1 = input.substr(peg$currPos, 6);
	                peg$currPos += 6;
	              } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c118); }
	              }
	              if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 46) {
	                  s2 = peg$c7;
	                  peg$currPos++;
	                } else {
	                  s2 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                }
	                if (s2 === peg$FAILED) {
	                  s2 = null;
	                }
	                if (s2 !== peg$FAILED) {
	                  s3 = peg$parse_();
	                  if (s3 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c119();
	                    s0 = s1;
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	              if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.substr(peg$currPos, 4).toLowerCase() === peg$c120) {
	                  s1 = input.substr(peg$currPos, 4);
	                  peg$currPos += 4;
	                } else {
	                  s1 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c121); }
	                }
	                if (s1 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 46) {
	                    s2 = peg$c7;
	                    peg$currPos++;
	                  } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                  }
	                  if (s2 === peg$FAILED) {
	                    s2 = null;
	                  }
	                  if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c122();
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	                if (s0 === peg$FAILED) {
	                  s0 = peg$currPos;
	                  if (input.charCodeAt(peg$currPos) === 43) {
	                    s1 = peg$c86;
	                    peg$currPos++;
	                  } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c87); }
	                  }
	                  if (s1 !== peg$FAILED) {
	                    s2 = peg$parseNumber();
	                    if (s2 !== peg$FAILED) {
	                      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c123) {
	                        s3 = input.substr(peg$currPos, 4);
	                        peg$currPos += 4;
	                      } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) { peg$fail(peg$c124); }
	                      }
	                      if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 46) {
	                          s4 = peg$c7;
	                          peg$currPos++;
	                        } else {
	                          s4 = peg$FAILED;
	                          if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                        }
	                        if (s4 === peg$FAILED) {
	                          s4 = null;
	                        }
	                        if (s4 !== peg$FAILED) {
	                          s5 = peg$parse_();
	                          if (s5 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c125(s2);
	                            s0 = s1;
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                  if (s0 === peg$FAILED) {
	                    s0 = peg$currPos;
	                    if (input.charCodeAt(peg$currPos) === 43) {
	                      s1 = peg$c86;
	                      peg$currPos++;
	                    } else {
	                      s1 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c87); }
	                    }
	                    if (s1 !== peg$FAILED) {
	                      s2 = peg$parseNumber();
	                      if (s2 !== peg$FAILED) {
	                        if (input.substr(peg$currPos, 5).toLowerCase() === peg$c126) {
	                          s3 = input.substr(peg$currPos, 5);
	                          peg$currPos += 5;
	                        } else {
	                          s3 = peg$FAILED;
	                          if (peg$silentFails === 0) { peg$fail(peg$c127); }
	                        }
	                        if (s3 !== peg$FAILED) {
	                          if (input.charCodeAt(peg$currPos) === 46) {
	                            s4 = peg$c7;
	                            peg$currPos++;
	                          } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                          }
	                          if (s4 === peg$FAILED) {
	                            s4 = null;
	                          }
	                          if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                              peg$savedPos = s0;
	                              s1 = peg$c128(s2);
	                              s0 = s1;
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                    if (s0 === peg$FAILED) {
	                      s0 = peg$currPos;
	                      if (input.charCodeAt(peg$currPos) === 43) {
	                        s1 = peg$c86;
	                        peg$currPos++;
	                      } else {
	                        s1 = peg$FAILED;
	                        if (peg$silentFails === 0) { peg$fail(peg$c87); }
	                      }
	                      if (s1 !== peg$FAILED) {
	                        s2 = peg$parseNumber();
	                        if (s2 !== peg$FAILED) {
	                          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c129) {
	                            s3 = input.substr(peg$currPos, 5);
	                            peg$currPos += 5;
	                          } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c130); }
	                          }
	                          if (s3 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 46) {
	                              s4 = peg$c7;
	                              peg$currPos++;
	                            } else {
	                              s4 = peg$FAILED;
	                              if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                            }
	                            if (s4 === peg$FAILED) {
	                              s4 = null;
	                            }
	                            if (s4 !== peg$FAILED) {
	                              s5 = peg$parse_();
	                              if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c131(s2);
	                                s0 = s1;
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                      if (s0 === peg$FAILED) {
	                        s0 = peg$currPos;
	                        if (input.charCodeAt(peg$currPos) === 43) {
	                          s1 = peg$c86;
	                          peg$currPos++;
	                        } else {
	                          s1 = peg$FAILED;
	                          if (peg$silentFails === 0) { peg$fail(peg$c87); }
	                        }
	                        if (s1 !== peg$FAILED) {
	                          s2 = peg$parseNumber();
	                          if (s2 !== peg$FAILED) {
	                            if (input.substr(peg$currPos, 3).toLowerCase() === peg$c132) {
	                              s3 = input.substr(peg$currPos, 3);
	                              peg$currPos += 3;
	                            } else {
	                              s3 = peg$FAILED;
	                              if (peg$silentFails === 0) { peg$fail(peg$c133); }
	                            }
	                            if (s3 !== peg$FAILED) {
	                              if (input.charCodeAt(peg$currPos) === 46) {
	                                s4 = peg$c7;
	                                peg$currPos++;
	                              } else {
	                                s4 = peg$FAILED;
	                                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                              }
	                              if (s4 === peg$FAILED) {
	                                s4 = null;
	                              }
	                              if (s4 !== peg$FAILED) {
	                                s5 = peg$parse_();
	                                if (s5 !== peg$FAILED) {
	                                  peg$savedPos = s0;
	                                  s1 = peg$c134(s2);
	                                  s0 = s1;
	                                } else {
	                                  peg$currPos = s0;
	                                  s0 = peg$FAILED;
	                                }
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                        if (s0 === peg$FAILED) {
	                          s0 = peg$currPos;
	                          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c135) {
	                            s1 = input.substr(peg$currPos, 5);
	                            peg$currPos += 5;
	                          } else {
	                            s1 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c136); }
	                          }
	                          if (s1 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 46) {
	                              s2 = peg$c7;
	                              peg$currPos++;
	                            } else {
	                              s2 = peg$FAILED;
	                              if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                            }
	                            if (s2 === peg$FAILED) {
	                              s2 = null;
	                            }
	                            if (s2 !== peg$FAILED) {
	                              s3 = peg$parse_();
	                              if (s3 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c137();
	                                s0 = s1;
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                          if (s0 === peg$FAILED) {
	                            s0 = peg$currPos;
	                            if (input.substr(peg$currPos, 6).toLowerCase() === peg$c138) {
	                              s1 = input.substr(peg$currPos, 6);
	                              peg$currPos += 6;
	                            } else {
	                              s1 = peg$FAILED;
	                              if (peg$silentFails === 0) { peg$fail(peg$c139); }
	                            }
	                            if (s1 !== peg$FAILED) {
	                              if (input.charCodeAt(peg$currPos) === 46) {
	                                s2 = peg$c7;
	                                peg$currPos++;
	                              } else {
	                                s2 = peg$FAILED;
	                                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                              }
	                              if (s2 === peg$FAILED) {
	                                s2 = null;
	                              }
	                              if (s2 !== peg$FAILED) {
	                                s3 = peg$parse_();
	                                if (s3 !== peg$FAILED) {
	                                  peg$savedPos = s0;
	                                  s1 = peg$c140();
	                                  s0 = s1;
	                                } else {
	                                  peg$currPos = s0;
	                                  s0 = peg$FAILED;
	                                }
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                            if (s0 === peg$FAILED) {
	                              s0 = peg$currPos;
	                              if (input.substr(peg$currPos, 6).toLowerCase() === peg$c141) {
	                                s1 = input.substr(peg$currPos, 6);
	                                peg$currPos += 6;
	                              } else {
	                                s1 = peg$FAILED;
	                                if (peg$silentFails === 0) { peg$fail(peg$c142); }
	                              }
	                              if (s1 !== peg$FAILED) {
	                                if (input.charCodeAt(peg$currPos) === 46) {
	                                  s2 = peg$c7;
	                                  peg$currPos++;
	                                } else {
	                                  s2 = peg$FAILED;
	                                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                                }
	                                if (s2 === peg$FAILED) {
	                                  s2 = null;
	                                }
	                                if (s2 !== peg$FAILED) {
	                                  s3 = peg$parse_();
	                                  if (s3 !== peg$FAILED) {
	                                    peg$savedPos = s0;
	                                    s1 = peg$c143();
	                                    s0 = s1;
	                                  } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                  }
	                                } else {
	                                  peg$currPos = s0;
	                                  s0 = peg$FAILED;
	                                }
	                              } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                              }
	                              if (s0 === peg$FAILED) {
	                                s0 = peg$currPos;
	                                if (input.substr(peg$currPos, 4).toLowerCase() === peg$c144) {
	                                  s1 = input.substr(peg$currPos, 4);
	                                  peg$currPos += 4;
	                                } else {
	                                  s1 = peg$FAILED;
	                                  if (peg$silentFails === 0) { peg$fail(peg$c145); }
	                                }
	                                if (s1 !== peg$FAILED) {
	                                  if (input.charCodeAt(peg$currPos) === 46) {
	                                    s2 = peg$c7;
	                                    peg$currPos++;
	                                  } else {
	                                    s2 = peg$FAILED;
	                                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                                  }
	                                  if (s2 === peg$FAILED) {
	                                    s2 = null;
	                                  }
	                                  if (s2 !== peg$FAILED) {
	                                    s3 = peg$parse_();
	                                    if (s3 !== peg$FAILED) {
	                                      peg$savedPos = s0;
	                                      s1 = peg$c146();
	                                      s0 = s1;
	                                    } else {
	                                      peg$currPos = s0;
	                                      s0 = peg$FAILED;
	                                    }
	                                  } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                  }
	                                } else {
	                                  peg$currPos = s0;
	                                  s0 = peg$FAILED;
	                                }
	                                if (s0 === peg$FAILED) {
	                                  s0 = peg$currPos;
	                                  if (input.charCodeAt(peg$currPos) === 45) {
	                                    s1 = peg$c147;
	                                    peg$currPos++;
	                                  } else {
	                                    s1 = peg$FAILED;
	                                    if (peg$silentFails === 0) { peg$fail(peg$c148); }
	                                  }
	                                  if (s1 !== peg$FAILED) {
	                                    s2 = peg$parseNumber();
	                                    if (s2 !== peg$FAILED) {
	                                      if (input.substr(peg$currPos, 4).toLowerCase() === peg$c123) {
	                                        s3 = input.substr(peg$currPos, 4);
	                                        peg$currPos += 4;
	                                      } else {
	                                        s3 = peg$FAILED;
	                                        if (peg$silentFails === 0) { peg$fail(peg$c124); }
	                                      }
	                                      if (s3 !== peg$FAILED) {
	                                        if (input.charCodeAt(peg$currPos) === 46) {
	                                          s4 = peg$c7;
	                                          peg$currPos++;
	                                        } else {
	                                          s4 = peg$FAILED;
	                                          if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                                        }
	                                        if (s4 === peg$FAILED) {
	                                          s4 = null;
	                                        }
	                                        if (s4 !== peg$FAILED) {
	                                          s5 = peg$parse_();
	                                          if (s5 !== peg$FAILED) {
	                                            peg$savedPos = s0;
	                                            s1 = peg$c149(s2);
	                                            s0 = s1;
	                                          } else {
	                                            peg$currPos = s0;
	                                            s0 = peg$FAILED;
	                                          }
	                                        } else {
	                                          peg$currPos = s0;
	                                          s0 = peg$FAILED;
	                                        }
	                                      } else {
	                                        peg$currPos = s0;
	                                        s0 = peg$FAILED;
	                                      }
	                                    } else {
	                                      peg$currPos = s0;
	                                      s0 = peg$FAILED;
	                                    }
	                                  } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                  }
	                                  if (s0 === peg$FAILED) {
	                                    s0 = peg$currPos;
	                                    if (input.charCodeAt(peg$currPos) === 45) {
	                                      s1 = peg$c147;
	                                      peg$currPos++;
	                                    } else {
	                                      s1 = peg$FAILED;
	                                      if (peg$silentFails === 0) { peg$fail(peg$c148); }
	                                    }
	                                    if (s1 !== peg$FAILED) {
	                                      s2 = peg$parseNumber();
	                                      if (s2 !== peg$FAILED) {
	                                        if (input.substr(peg$currPos, 5).toLowerCase() === peg$c126) {
	                                          s3 = input.substr(peg$currPos, 5);
	                                          peg$currPos += 5;
	                                        } else {
	                                          s3 = peg$FAILED;
	                                          if (peg$silentFails === 0) { peg$fail(peg$c127); }
	                                        }
	                                        if (s3 !== peg$FAILED) {
	                                          if (input.charCodeAt(peg$currPos) === 46) {
	                                            s4 = peg$c7;
	                                            peg$currPos++;
	                                          } else {
	                                            s4 = peg$FAILED;
	                                            if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                                          }
	                                          if (s4 === peg$FAILED) {
	                                            s4 = null;
	                                          }
	                                          if (s4 !== peg$FAILED) {
	                                            s5 = peg$parse_();
	                                            if (s5 !== peg$FAILED) {
	                                              peg$savedPos = s0;
	                                              s1 = peg$c150(s2);
	                                              s0 = s1;
	                                            } else {
	                                              peg$currPos = s0;
	                                              s0 = peg$FAILED;
	                                            }
	                                          } else {
	                                            peg$currPos = s0;
	                                            s0 = peg$FAILED;
	                                          }
	                                        } else {
	                                          peg$currPos = s0;
	                                          s0 = peg$FAILED;
	                                        }
	                                      } else {
	                                        peg$currPos = s0;
	                                        s0 = peg$FAILED;
	                                      }
	                                    } else {
	                                      peg$currPos = s0;
	                                      s0 = peg$FAILED;
	                                    }
	                                    if (s0 === peg$FAILED) {
	                                      s0 = peg$currPos;
	                                      if (input.charCodeAt(peg$currPos) === 45) {
	                                        s1 = peg$c147;
	                                        peg$currPos++;
	                                      } else {
	                                        s1 = peg$FAILED;
	                                        if (peg$silentFails === 0) { peg$fail(peg$c148); }
	                                      }
	                                      if (s1 !== peg$FAILED) {
	                                        s2 = peg$parseNumber();
	                                        if (s2 !== peg$FAILED) {
	                                          if (input.substr(peg$currPos, 5).toLowerCase() === peg$c129) {
	                                            s3 = input.substr(peg$currPos, 5);
	                                            peg$currPos += 5;
	                                          } else {
	                                            s3 = peg$FAILED;
	                                            if (peg$silentFails === 0) { peg$fail(peg$c130); }
	                                          }
	                                          if (s3 !== peg$FAILED) {
	                                            if (input.charCodeAt(peg$currPos) === 46) {
	                                              s4 = peg$c7;
	                                              peg$currPos++;
	                                            } else {
	                                              s4 = peg$FAILED;
	                                              if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                                            }
	                                            if (s4 === peg$FAILED) {
	                                              s4 = null;
	                                            }
	                                            if (s4 !== peg$FAILED) {
	                                              s5 = peg$parse_();
	                                              if (s5 !== peg$FAILED) {
	                                                peg$savedPos = s0;
	                                                s1 = peg$c151(s2);
	                                                s0 = s1;
	                                              } else {
	                                                peg$currPos = s0;
	                                                s0 = peg$FAILED;
	                                              }
	                                            } else {
	                                              peg$currPos = s0;
	                                              s0 = peg$FAILED;
	                                            }
	                                          } else {
	                                            peg$currPos = s0;
	                                            s0 = peg$FAILED;
	                                          }
	                                        } else {
	                                          peg$currPos = s0;
	                                          s0 = peg$FAILED;
	                                        }
	                                      } else {
	                                        peg$currPos = s0;
	                                        s0 = peg$FAILED;
	                                      }
	                                      if (s0 === peg$FAILED) {
	                                        s0 = peg$currPos;
	                                        if (input.charCodeAt(peg$currPos) === 45) {
	                                          s1 = peg$c147;
	                                          peg$currPos++;
	                                        } else {
	                                          s1 = peg$FAILED;
	                                          if (peg$silentFails === 0) { peg$fail(peg$c148); }
	                                        }
	                                        if (s1 !== peg$FAILED) {
	                                          s2 = peg$parseNumber();
	                                          if (s2 !== peg$FAILED) {
	                                            if (input.substr(peg$currPos, 3).toLowerCase() === peg$c132) {
	                                              s3 = input.substr(peg$currPos, 3);
	                                              peg$currPos += 3;
	                                            } else {
	                                              s3 = peg$FAILED;
	                                              if (peg$silentFails === 0) { peg$fail(peg$c133); }
	                                            }
	                                            if (s3 !== peg$FAILED) {
	                                              if (input.charCodeAt(peg$currPos) === 46) {
	                                                s4 = peg$c7;
	                                                peg$currPos++;
	                                              } else {
	                                                s4 = peg$FAILED;
	                                                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                                              }
	                                              if (s4 === peg$FAILED) {
	                                                s4 = null;
	                                              }
	                                              if (s4 !== peg$FAILED) {
	                                                s5 = peg$parse_();
	                                                if (s5 !== peg$FAILED) {
	                                                  peg$savedPos = s0;
	                                                  s1 = peg$c152(s2);
	                                                  s0 = s1;
	                                                } else {
	                                                  peg$currPos = s0;
	                                                  s0 = peg$FAILED;
	                                                }
	                                              } else {
	                                                peg$currPos = s0;
	                                                s0 = peg$FAILED;
	                                              }
	                                            } else {
	                                              peg$currPos = s0;
	                                              s0 = peg$FAILED;
	                                            }
	                                          } else {
	                                            peg$currPos = s0;
	                                            s0 = peg$FAILED;
	                                          }
	                                        } else {
	                                          peg$currPos = s0;
	                                          s0 = peg$FAILED;
	                                        }
	                                      }
	                                    }
	                                  }
	                                }
	                              }
	                            }
	                          }
	                        }
	                      }
	                    }
	                  }
	                }
	              }
	            }
	          }

	          return s0;
	        }

	        function peg$parseTransform() {
	          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 9).toLowerCase() === peg$c153) {
	            s1 = input.substr(peg$currPos, 9);
	            peg$currPos += 9;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c154); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.substr(peg$currPos, 2).toLowerCase() === peg$c5) {
	                    s5 = input.substr(peg$currPos, 2);
	                    peg$currPos += 2;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c6); }
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      s7 = peg$parseString();
	                      if (s7 !== peg$FAILED) {
	                        s8 = peg$parse_();
	                        if (s8 !== peg$FAILED) {
	                          if (input.charCodeAt(peg$currPos) === 46) {
	                            s9 = peg$c7;
	                            peg$currPos++;
	                          } else {
	                            s9 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                          }
	                          if (s9 === peg$FAILED) {
	                            s9 = null;
	                          }
	                          if (s9 !== peg$FAILED) {
	                            s10 = peg$parse_();
	                            if (s10 !== peg$FAILED) {
	                              peg$savedPos = s0;
	                              s1 = peg$c155(s3, s7);
	                              s0 = s1;
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 9).toLowerCase() === peg$c153) {
	              s1 = input.substr(peg$currPos, 9);
	              peg$currPos += 9;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c154); }
	            }
	            if (s1 !== peg$FAILED) {
	              s2 = peg$parse_();
	              if (s2 !== peg$FAILED) {
	                s3 = peg$parseString();
	                if (s3 !== peg$FAILED) {
	                  s4 = peg$parse_();
	                  if (s4 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 46) {
	                      s5 = peg$c7;
	                      peg$currPos++;
	                    } else {
	                      s5 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                    }
	                    if (s5 === peg$FAILED) {
	                      s5 = null;
	                    }
	                    if (s5 !== peg$FAILED) {
	                      s6 = peg$parse_();
	                      if (s6 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c156(s3);
	                        s0 = s1;
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          }

	          return s0;
	        }

	        function peg$parseBurn() {
	          var s0, s1, s2, s3, s4, s5, s6;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 4).toLowerCase() === peg$c157) {
	            s1 = input.substr(peg$currPos, 4);
	            peg$currPos += 4;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c158); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseNumber();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 46) {
	                    s5 = peg$c7;
	                    peg$currPos++;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                  }
	                  if (s5 === peg$FAILED) {
	                    s5 = null;
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c159(s3);
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseMermaidConnect() {
	          var s0, s1, s2, s3, s4, s5, s6;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 7).toLowerCase() === peg$c160) {
	            s1 = input.substr(peg$currPos, 7);
	            peg$currPos += 7;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c161); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseOptionString();
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 46) {
	                    s5 = peg$c7;
	                    peg$currPos++;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                  }
	                  if (s5 === peg$FAILED) {
	                    s5 = null;
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c162(s3);
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseBridge() {
	          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 6).toLowerCase() === peg$c163) {
	            s1 = input.substr(peg$currPos, 6);
	            peg$currPos += 6;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c164); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parseString();
	              if (s3 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 58) {
	                  s4 = peg$c165;
	                  peg$currPos++;
	                } else {
	                  s4 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c166); }
	                }
	                if (s4 !== peg$FAILED) {
	                  s5 = peg$parseString();
	                  if (s5 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 58) {
	                      s6 = peg$c165;
	                      peg$currPos++;
	                    } else {
	                      s6 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c166); }
	                    }
	                    if (s6 !== peg$FAILED) {
	                      s7 = peg$parseString();
	                      if (s7 !== peg$FAILED) {
	                        s8 = peg$parse_();
	                        if (s8 !== peg$FAILED) {
	                          if (input.charCodeAt(peg$currPos) === 46) {
	                            s9 = peg$c7;
	                            peg$currPos++;
	                          } else {
	                            s9 = peg$FAILED;
	                            if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                          }
	                          if (s9 === peg$FAILED) {
	                            s9 = null;
	                          }
	                          if (s9 !== peg$FAILED) {
	                            s10 = peg$parse_();
	                            if (s10 !== peg$FAILED) {
	                              peg$savedPos = s0;
	                              s1 = peg$c167(s3, s5, s7);
	                              s0 = s1;
	                            } else {
	                              peg$currPos = s0;
	                              s0 = peg$FAILED;
	                            }
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 6).toLowerCase() === peg$c163) {
	              s1 = input.substr(peg$currPos, 6);
	              peg$currPos += 6;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c164); }
	            }
	            if (s1 !== peg$FAILED) {
	              s2 = peg$parse_();
	              if (s2 !== peg$FAILED) {
	                s3 = peg$parseString();
	                if (s3 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 58) {
	                    s4 = peg$c165;
	                    peg$currPos++;
	                  } else {
	                    s4 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c166); }
	                  }
	                  if (s4 !== peg$FAILED) {
	                    s5 = peg$parseString();
	                    if (s5 !== peg$FAILED) {
	                      s6 = peg$parse_();
	                      if (s6 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 46) {
	                          s7 = peg$c7;
	                          peg$currPos++;
	                        } else {
	                          s7 = peg$FAILED;
	                          if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                        }
	                        if (s7 === peg$FAILED) {
	                          s7 = null;
	                        }
	                        if (s7 !== peg$FAILED) {
	                          s8 = peg$parse_();
	                          if (s8 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c168(s3, s5);
	                            s0 = s1;
	                          } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                          }
	                        } else {
	                          peg$currPos = s0;
	                          s0 = peg$FAILED;
	                        }
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          }

	          return s0;
	        }

	        function peg$parseLeechOption() {
	          var s0, s1;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 25).toLowerCase() === peg$c169) {
	            s1 = input.substr(peg$currPos, 25);
	            peg$currPos += 25;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c170); }
	          }
	          if (s1 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c171();
	          }
	          s0 = s1;
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 30).toLowerCase() === peg$c172) {
	              s1 = input.substr(peg$currPos, 30);
	              peg$currPos += 30;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c173); }
	            }
	            if (s1 !== peg$FAILED) {
	              peg$savedPos = s0;
	              s1 = peg$c174();
	            }
	            s0 = s1;
	          }

	          return s0;
	        }

	        function peg$parseShapeshifterGainPowerToken() {
	          var s0, s1, s2, s3, s4;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 14).toLowerCase() === peg$c175) {
	            s1 = input.substr(peg$currPos, 14);
	            peg$currPos += 14;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c176); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              if (input.charCodeAt(peg$currPos) === 46) {
	                s3 = peg$c7;
	                peg$currPos++;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c8); }
	              }
	              if (s3 === peg$FAILED) {
	                s3 = null;
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  peg$savedPos = s0;
	                  s1 = peg$c177();
	                  s0 = s1;
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 15).toLowerCase() === peg$c178) {
	              s1 = input.substr(peg$currPos, 15);
	              peg$currPos += 15;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c179); }
	            }
	            if (s1 !== peg$FAILED) {
	              s2 = peg$parse_();
	              if (s2 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 46) {
	                  s3 = peg$c7;
	                  peg$currPos++;
	                } else {
	                  s3 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                }
	                if (s3 === peg$FAILED) {
	                  s3 = null;
	                }
	                if (s3 !== peg$FAILED) {
	                  s4 = peg$parse_();
	                  if (s4 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c180();
	                    s0 = s1;
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          }

	          return s0;
	        }

	        function peg$parseRiverwalkersUnlockTerrain() {
	          var s0, s1, s2, s3, s4, s5, s6;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 14).toLowerCase() === peg$c181) {
	            s1 = input.substr(peg$currPos, 14);
	            peg$currPos += 14;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c182); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parse_();
	            if (s2 !== peg$FAILED) {
	              if (input.substr(peg$currPos, 11).toLowerCase() === peg$c183) {
	                s3 = input.substr(peg$currPos, 11);
	                peg$currPos += 11;
	              } else {
	                s3 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c184); }
	              }
	              if (s3 !== peg$FAILED) {
	                s4 = peg$parse_();
	                if (s4 !== peg$FAILED) {
	                  if (input.charCodeAt(peg$currPos) === 46) {
	                    s5 = peg$c7;
	                    peg$currPos++;
	                  } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                  }
	                  if (s5 === peg$FAILED) {
	                    s5 = null;
	                  }
	                  if (s5 !== peg$FAILED) {
	                    s6 = peg$parse_();
	                    if (s6 !== peg$FAILED) {
	                      peg$savedPos = s0;
	                      s1 = peg$c185();
	                      s0 = s1;
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }
	          if (s0 === peg$FAILED) {
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 14).toLowerCase() === peg$c181) {
	              s1 = input.substr(peg$currPos, 14);
	              peg$currPos += 14;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c182); }
	            }
	            if (s1 !== peg$FAILED) {
	              s2 = peg$parse_();
	              if (s2 !== peg$FAILED) {
	                s3 = peg$parseString();
	                if (s3 !== peg$FAILED) {
	                  s4 = peg$parse_();
	                  if (s4 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 46) {
	                      s5 = peg$c7;
	                      peg$currPos++;
	                    } else {
	                      s5 = peg$FAILED;
	                      if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                    }
	                    if (s5 === peg$FAILED) {
	                      s5 = null;
	                    }
	                    if (s5 !== peg$FAILED) {
	                      s6 = peg$parse_();
	                      if (s6 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c186(s3);
	                        s0 = s1;
	                      } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                      }
	                    } else {
	                      peg$currPos = s0;
	                      s0 = peg$FAILED;
	                    }
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          }

	          return s0;
	        }

	        function peg$parsePickColor() {
	          var s0, s1, s2, s3, s4, s5;

	          s0 = peg$currPos;
	          if (input.substr(peg$currPos, 11).toLowerCase() === peg$c187) {
	            s1 = input.substr(peg$currPos, 11);
	            peg$currPos += 11;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c188); }
	          }
	          if (s1 !== peg$FAILED) {
	            s2 = peg$parseString();
	            if (s2 !== peg$FAILED) {
	              s3 = peg$parse_();
	              if (s3 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 46) {
	                  s4 = peg$c7;
	                  peg$currPos++;
	                } else {
	                  s4 = peg$FAILED;
	                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
	                }
	                if (s4 === peg$FAILED) {
	                  s4 = null;
	                }
	                if (s4 !== peg$FAILED) {
	                  s5 = peg$parse_();
	                  if (s5 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c189(s2);
	                    s0 = s1;
	                  } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                  }
	                } else {
	                  peg$currPos = s0;
	                  s0 = peg$FAILED;
	                }
	              } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	              }
	            } else {
	              peg$currPos = s0;
	              s0 = peg$FAILED;
	            }
	          } else {
	            peg$currPos = s0;
	            s0 = peg$FAILED;
	          }

	          return s0;
	        }

	        function peg$parseString() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          s1 = [];
	          if (peg$c190.test(input.charAt(peg$currPos))) {
	            s2 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s2 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c191); }
	          }
	          if (s2 !== peg$FAILED) {
	            while (s2 !== peg$FAILED) {
	              s1.push(s2);
	              if (peg$c190.test(input.charAt(peg$currPos))) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	              } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c191); }
	              }
	            }
	          } else {
	            s1 = peg$FAILED;
	          }
	          if (s1 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c192(s1);
	          }
	          s0 = s1;

	          return s0;
	        }

	        function peg$parseOptionString() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          s1 = [];
	          if (peg$c193.test(input.charAt(peg$currPos))) {
	            s2 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s2 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c194); }
	          }
	          if (s2 !== peg$FAILED) {
	            while (s2 !== peg$FAILED) {
	              s1.push(s2);
	              if (peg$c193.test(input.charAt(peg$currPos))) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	              } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c194); }
	              }
	            }
	          } else {
	            s1 = peg$FAILED;
	          }
	          if (s1 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c192(s1);
	          }
	          s0 = s1;

	          return s0;
	        }

	        function peg$parseNameString() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          s1 = [];
	          if (input.length > peg$currPos) {
	            s2 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s2 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c195); }
	          }
	          if (s2 !== peg$FAILED) {
	            while (s2 !== peg$FAILED) {
	              s1.push(s2);
	              if (input.length > peg$currPos) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	              } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c195); }
	              }
	            }
	          } else {
	            s1 = peg$FAILED;
	          }
	          if (s1 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c192(s1);
	          }
	          s0 = s1;

	          return s0;
	        }

	        function peg$parseNumber() {
	          var s0, s1, s2;

	          s0 = peg$currPos;
	          s1 = [];
	          if (peg$c196.test(input.charAt(peg$currPos))) {
	            s2 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s2 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c197); }
	          }
	          if (s2 !== peg$FAILED) {
	            while (s2 !== peg$FAILED) {
	              s1.push(s2);
	              if (peg$c196.test(input.charAt(peg$currPos))) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	              } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) { peg$fail(peg$c197); }
	              }
	            }
	          } else {
	            s1 = peg$FAILED;
	          }
	          if (s1 !== peg$FAILED) {
	            peg$savedPos = s0;
	            s1 = peg$c198(s1);
	          }
	          s0 = s1;

	          return s0;
	        }

	        function peg$parse_() {
	          var s0, s1;

	          peg$silentFails++;
	          s0 = [];
	          if (peg$c200.test(input.charAt(peg$currPos))) {
	            s1 = input.charAt(peg$currPos);
	            peg$currPos++;
	          } else {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c201); }
	          }
	          while (s1 !== peg$FAILED) {
	            s0.push(s1);
	            if (peg$c200.test(input.charAt(peg$currPos))) {
	              s1 = input.charAt(peg$currPos);
	              peg$currPos++;
	            } else {
	              s1 = peg$FAILED;
	              if (peg$silentFails === 0) { peg$fail(peg$c201); }
	            }
	          }
	          peg$silentFails--;
	          if (s0 === peg$FAILED) {
	            s1 = peg$FAILED;
	            if (peg$silentFails === 0) { peg$fail(peg$c199); }
	          }

	          return s0;
	        }


	          function a2s(a) { 
	            return a.join("");
	          }

	          function pass(bonus) { 
	            return { pass:bonus };
	          }

	          function priestToCult(cult, amount) { 
	            if(amount < 0 || amount > 3) {
	              return "[failure] can only send a priest for 1, 2, or 3"
	            }

	            if(cult.toUpperCase() == "FIRE") {
	              return { fire: amount };
	            }
	            if(cult.toUpperCase() == "WATER") {
	              return { water: amount };
	            }
	            if(cult.toUpperCase() == "EARTH") {
	              return { earth: amount };
	            }
	            if(cult.toUpperCase() == "AIR") {
	              return { air: amount };
	            }

	            return "[failure]: " + cult + " is not recognized";
	          }

	          function build(space) {
	            return { d: space };
	          }

	          function upgrade(building, space) {
	            if(building.toUpperCase() == "SH") { 
	              return { sh: space }
	            }
	            if(building.toUpperCase() == "TE") { 
	              return { te: space }
	            }
	            if(building.toUpperCase() == "TP") { 
	              return { tp: space }
	            }
	            if(building.toUpperCase() == "SA") { 
	              return { sa: space }
	            }

	            return "[failure]: " + building + " is not recognized";
	          }

	          function r2s(res) { 
	            if(res.pw !== undefined) { 
	              return res.pw + "pw";
	            }
	            if(res.c !== undefined) { 
	              return res.c + "c";
	            }
	            if(res.w !== undefined) { 
	              return res.w + "w";
	            }
	            if(res.vp !== undefined) { 
	              return res.vp + "vp";
	            }

	            return "[failure] could not find a valid resource";
	          }

	          function convert(from, to) {
	            var conv = {};

	            if(from.pw !== undefined) { 
	              conv.pw = -from.pw;
	            }
	            if(from.c !== undefined) { 
	              conv.c = -from.c;
	            }
	            if(from.w !== undefined) { 
	              conv.w = -from.w;
	            }
	            if(from.p !== undefined) { 
	              conv.p = -from.p;
	            }
	            if(from.vp !== undefined) { 
	              conv.vp = -from.vp;
	            }

	            if(to.pw !== undefined) { 
	              conv.pw = to.pw;
	            }
	            if(to.c !== undefined) { 
	              conv.c = to.c;
	            }
	            if(to.w !== undefined) { 
	              conv.w = to.w;
	            }
	            if(to.p !== undefined) { 
	              conv.p = to.p;
	            }
	            if(to.vp !== undefined) { 
	              conv.vp = to.vp;
	            }

	            return conv;
	          }

	          function resource(res, quantity) { 
	            if(quantity < 0) { 
	              return "[failure] quantity must be > 0";
	            }

	            if(res.toUpperCase() == "PW") { 
	              return { pw: quantity };
	            }
	            if(res.toUpperCase() == "W") { 
	              return { w: quantity };
	            }
	            if(res.toUpperCase() == "C") { 
	              return { c: quantity };
	            }
	            if(res.toUpperCase() == "P") { 
	              return { p: quantity };
	            }
	            if(res.toUpperCase() == "VP") { 
	              return { vp: quantity };
	            }

	            return "[failure] " + res + " is not recognized";
	          }

	          function town(num, count) { 
	            if(num == 7) {
	              return { tw: 7, advanceShip: 1, townCount: count }
	            }
	            return { tw: num, townCount: count };
	          }

	          function favor(num) { 
	            return { fav: num };
	          }
	          
	          function leechOption(accepted) { 
	            return { leechAccepted: accepted };
	          }
	          
	          function rwUnlockTerrain(terrain) { 
	            return { unlockTerrain: terrain };
	          }
	          
	          function ssGainPowerToken(accepted) { 
	            return { gainPowerToken: accepted }
	          }

	          function action(act) { 
	            var result = { action: act };

	            if(act.toUpperCase() == "ACT1") { 
	              // do what?
	            }
	            if(act.toUpperCase() == "ACT2") { 
	              result.p = 1;
	            }
	            if(act.toUpperCase() == "ACT3") { 
	              result.w = 2;
	            }
	            if(act.toUpperCase() == "ACT4") { 
	              result.c = 7;
	            }
	            if(act.toUpperCase() == "ACT5") { 
	              result.spd = 1;
	            }
	            if(act.toUpperCase() == "ACT6") { 
	              result.spd = 2;
	            }
	            
	            if(act.toUpperCase() == "BON1") { 
	              result.spd = 1;
	            }
	            
	            if(act.toUpperCase() == "ACTG") { 
	              result.spd = 2;
	            }

	            return result;
	          }

	          function transform(space, color) { 
	            return { transform: { space: space, color: color } }
	          }

	          function burn(amount) { 
	            return { burn: amount }
	          }

	          function mermaidConnect(tiles) { 
	            return { mermaidConnect: tiles }
	          }

	          function leech(accept, amount, faction) { 
	            return { leech: { accept: accept, amount: amount, faction: faction } };
	          }

	          function dig(amount) { 
	            return { dig: amount, spd: amount }
	          }

	          function advance(track) { 
	            if(track.toUpperCase() == "SHIP") { 
	              return { advanceShip: 1 };
	            }
	            else if(track.toUpperCase() == "DIG") { 
	              return { advanceDig: 1 };
	            }
	          }
	          
	          function cult(cult, amount) { 
	            if(cult.toUpperCase() == "FIRE") {
	              return { fire: amount };
	            }
	            if(cult.toUpperCase() == "WATER") {
	              return { water: amount };
	            }
	            if(cult.toUpperCase() == "EARTH") {
	              return { earth: amount };
	            }
	            if(cult.toUpperCase() == "AIR") {
	              return { air: amount };
	            }
	          }

	          function wait() { 
	            return { wait:"wait" };
	          }

	          function done() { 
	            return { done: "done" };
	          }

	          function factionSetup() { 
	              return { setup: { factionSelection: true } };
	          }

	          function gameStart() { 
	            return { setup: { gameStart: true } };
	          }

	          function optionSetup(option) { 
	            return { setup: { option: option } };
	          }
	          
	          function endGamePoints(source, points) { 
	            return { endGame: { source: source, points: points } };
	          }
	          
	          function bridge(tile1, tile2, tile3) { 
	            var tiles = [tile1, tile2];
	            if(tile3 != undefined) { 
	              tiles.push(tile3);
	            }
	            return { bridge: tiles };
	          }

	          function roundSetup(roundNum, roundTile, goal, points) { 
	            return { 
	              setup: { 
	                round: roundNum, 
	                tile: roundTile, 
	                goal: goal, 
	                points: points 
	              } 
	            };
	          }

	          function bonusSetup(bonusTile) { 
	            return { setup: { bonus: bonusTile } };
	          }

	          function playerSetup(playerName, playerNum) { 
	            return { setup: { player: { num: playerNum, name: playerName } } };
	          } 

	          function additionalScoringSetup(scoringTile) { 
	            return { setup: { additionalScoring: scoringTile } };
	          }

	          function roundStart(roundNum) { 
	            return { round: roundNum };
	          }

	          function income(incomeType) { 
	            return { income: incomeType };
	          }
	          
	          function pickColor(color) { 
	            return { pickColor: color };
	          }

	          function processActions(result, actions) { 
	            for(var i = 0; i < actions.length; i++) {
	              var a = actions[i];
	              processAction(result, a);
	            }
	          }

	          function processAction(result, action) { 
	            
	            // sub or main action effects
	            if(action.pw != undefined) { 
	              if(result.pw == undefined) { 
	                result.pw = 0;
	              }
	              result.pw += action.pw;
	            }
	            if(action.c != undefined) { 
	              if(result.c == undefined) { 
	                result.c = 0;
	              }
	              result.c += action.c;
	            }
	            if(action.w != undefined) { 
	              if(result.w == undefined) { 
	                result.w = 0;
	              }
	              result.w += action.w;
	            }
	            if(action.p != undefined) { 
	              if(result.p == undefined) { 
	                result.p = 0;
	              }
	              result.p += action.p;
	            }
	            if(action.vp != undefined) { 
	              if(result.vp == undefined) { 
	                result.vp = 0;
	              }
	              result.vp += action.vp;
	            }
	            if(action.spd != undefined) { 
	              if(result.spd == undefined) { 
	                result.spd = 0;
	              }
	              result.spd += action.spd;
	            }
	            if(action.dig != undefined) { 
	              if(result.dig == undefined) { 
	                result.dig = 0;
	              }
	              result.dig += action.dig;
	            }
	            if(action.fire != undefined) { 
	              if(result.fire == undefined) { 
	                result.fire = 0;
	              }
	              result.fire += action.fire;
	            }
	            if(action.water != undefined) { 
	              if(result.water == undefined) { 
	                result.water = 0;
	              }
	              result.water += action.water;
	            }
	            if(action.earth != undefined) { 
	              if(result.earth == undefined) { 
	                result.earth = 0;
	              }
	              result.earth += action.earth ;
	            }
	            if(action.air != undefined) { 
	              if(result.air == undefined) { 
	                result.air = 0;
	              }
	              result.air += action.air ;
	            }
	            if(action.tw !== undefined) { 
	              if(result.tw == undefined) { 
	                result.tw = [];
	              }
	              for(var i = 0; i < action.townCount; i++) {
	                result.tw.push(action.tw);
	              }
	            }
	            if(action.fav != undefined) { 
	              if(result.fav == undefined) { 
	                result.fav = [];
	              }
	              result.fav.push(action.fav);
	            }
	            if(action.transform != undefined) { 
	              if(result.transform == undefined) { 
	                result.transform = [];
	              }
	              result.transform.push(action.transform);
	            }
	            if(action.burn !== undefined) { 
	              if(result.burn == undefined) { 
	                result.burn = 0;
	              }
	              result.burn += action.burn;
	            }
	            if(action.mermaidConnect != undefined) { 
	              result.mermaidConnect = action.mermaidConnect;
	            }
	            if(action.bridge != undefined) { 
	              result.bridge = action.bridge;
	            }


	            if(action.action != undefined) { 
	              result.action = action.action;
	            }
	            if(action.d != undefined) { 
	              if(result.d == undefined) { 
	                result.d = [];
	              }
	              result.d.push(action.d);
	            }
	            if(action.tp != undefined) { 
	              if(result.tp == undefined) { 
	                result.tp = [];
	              }
	              result.tp.push(action.tp);
	            }
	            if(action.te != undefined) { 
	              if(result.te == undefined) { 
	                result.te = [];
	              }
	              result.te.push(action.te);
	            }
	            if(action.sh != undefined) { 
	              if(result.sh == undefined) { 
	                result.sh = 0;
	              }
	              result.sh = action.sh;
	            }
	            if(action.sa != undefined) { 
	              if(result.sa == undefined) { 
	                result.sa = 0;
	              }
	              result.sa = action.sa;
	            }
	            if(action.leech !== undefined) { 
	              result.leech = action.leech;
	            }
	            if(action.advanceShip !== undefined) { 
	              if(result.advanceShip == undefined) { 
	                result.advanceShip = 0;
	              }
	              result.advanceShip += action.advanceShip;
	            }
	            if(action.advanceDig !== undefined) { 
	              if(result.advanceDig == undefined) { 
	                result.advanceDig = 0;
	              }
	              result.advanceDig += action.advanceDig;
	            }
	            if(action.done != undefined) { 
	              result.done = action.done;
	            }
	            if(action.wait != undefined) { 
	              result.wait = action.wait;
	            }
	            if(action.setup != undefined) { 
	              result.setup = action.setup;
	            }    
	            if(action.pass) { 
	              result.pass = action.pass;
	            }
	            // build/upgrade
	            if(action.space) { 
	              result.space = action.space;
	            }
	            if(action.round) { 
	              result.round = action.round; 
	            }
	            if(action.income) { 
	              result.income = action.income; 
	            }
	            
	            if(action.endGame) { 
	              result.endGame = action.endGame;
	            }
	            
	            if(action.leechAccepted != undefined) { 
	              result.leechAccepted = action.leechAccepted;
	            }
	            
	            if(action.unlockTerrain != undefined) { 
	              result.unlockTerrain = action.unlockTerrain;
	            }
	            
	            if(action.gainPowerToken != undefined) { 
	              result.gainPowerToken = action.gainPowerToken;
	            }
	            
	            if(action.pickColor != undefined) { 
	              result.pickColor = action.pickColor;
	            }
	          }

	          function makeAction(actions) {
	            var result = {};    
	            processActions(result, actions);
	            return result;
	          }


	        peg$result = peg$startRuleFunction();

	        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	          return peg$result;
	        } else {
	          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	            peg$fail({ type: "end", description: "end of input" });
	          }

	          throw peg$buildException(
	            null,
	            peg$maxFailExpected,
	            peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
	            peg$maxFailPos < input.length
	              ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
	              : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
	          );
	        }
	      }

	      return {
	        SyntaxError: peg$SyntaxError,
	        parse:       peg$parse
	      };
	    };
	    /// END GENERATED BY PEGJS
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);
	var faction = __webpack_require__(13);

	angular.module('wd.analyze.faction', ['ngRoute', 'wd.shared']).controller('AnalyzeFactionCtrl', faction.faction).controller('AnalyzeAllCtrl', faction.all)
	// from faction.js
	.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when('/analyze/faction/all', {
	        templateUrl: '/analyze/faction/all.html',
	        controller: 'AnalyzeAllCtrl'
	    });
	    $routeProvider.when('/analyze/faction/:faction?', {
	        templateUrl: '/analyze/faction/faction.html',
	        controller: 'AnalyzeFactionCtrl'
	    });
	}]);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(8);

	AnalyzeAllCtrl.$inject = ['$scope', '$http', '$location', 'd3', 'format'];
	AnalyzeFactionCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'd3', 'format'];
	module.exports = {
	    faction: AnalyzeFactionCtrl,
	    all: AnalyzeAllCtrl
	};

	function AnalyzeAllCtrl($scope, $http, $location, d3, format) {
	    $scope.format = format.buildFormat();
	    $scope.faction = { imgUrl: "/img/all.png", name: "all" };

	    $http({ method: 'GET', url: '/data/faction/' + $scope.faction.name }).then(function (response) {
	        if (response.data) {
	            $scope.factionData = response.data;
	            buildAndSaveHeatmap($scope, $scope.factionData.results);
	        }
	    });

	    loadTooltips();

	    function buildAndSaveHeatmap($scope, results) {
	        var factions = _.map(results, function (x) {
	            return x.faction;
	        });

	        var data = new Array(factions.length);
	        for (var i = 0; i < factions.length; i++) {
	            data[i] = new Array(factions.length);
	        }

	        for (var i = 0; i < data.length; i++) {
	            for (var j = 0; j < data[i].length; j++) {
	                if (Math.floor(i / 2) == Math.floor(j / 2)) {
	                    // same color
	                    data[i][j] = "";
	                } else {
	                    var denom = results[i][factions[j]].win + results[i][factions[j]].loss;
	                    var percent = denom == 0 ? "-" : Math.round(results[i][factions[j]].win / denom * 100);
	                    data[i][j] = percent;
	                }
	            }
	        }

	        $scope.factions = factions;
	        $scope.heatmap = data;
	    }

	    function loadTooltips() {
	        $(".explanation").tooltip({ tooltipClass: "explanation-tooltip" });
	    }
	}

	function AnalyzeFactionCtrl($scope, $http, $location, $routeParams, d3, format) {
	    $scope.format = format.buildFormat();
	    $scope.faction = getFactionSettings($routeParams.faction);

	    if ($scope.faction) {
	        $http({ method: 'GET', url: '/data/faction/' + $scope.faction.name }).then(function (response) {
	            if (response.data) {
	                $scope.factionData = response.data;
	            }
	        });
	    }

	    loadTooltips();

	    function getFactionSettings(faction) {
	        if (!faction) {
	            return null;
	        }

	        var imgUrlPrefix = "http://www.terra-mystica-spiel.de/img/";

	        if (faction.toUpperCase() == "DWARVES") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_7_300.jpg",
	                name: "dwarves"
	            };
	        } else if (faction.toUpperCase() == "ENGINEERS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_8_300.jpg",
	                name: "engineers"
	            };
	        } else if (faction.toUpperCase() == "CHAOSMAGICIANS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_3_300.jpg",
	                name: "chaosmagicians"
	            };
	        } else if (faction.toUpperCase() == "GIANTS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_4_300.jpg",
	                name: "giants"
	            };
	        } else if (faction.toUpperCase() == "FAKIRS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_1_300.jpg",
	                name: "fakirs"
	            };
	        } else if (faction.toUpperCase() == "NOMADS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_2_300.jpg",
	                name: "nomads"
	            };
	        } else if (faction.toUpperCase() == "HALFLINGS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_9_300.jpg",
	                name: "halflings"
	            };
	        } else if (faction.toUpperCase() == "CULTISTS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_10_300.jpg",
	                name: "cultists"
	            };
	        } else if (faction.toUpperCase() == "ALCHEMISTS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_11_300.jpg",
	                name: "alchemists"
	            };
	        } else if (faction.toUpperCase() == "DARKLINGS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_12_300.jpg",
	                name: "darklings"
	            };
	        } else if (faction.toUpperCase() == "SWARMLINGS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_5_300.jpg",
	                name: "swarmlings"
	            };
	        } else if (faction.toUpperCase() == "MERMAIDS") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_6_300.jpg",
	                name: "mermaids"
	            };
	        } else if (faction.toUpperCase() == "AUREN") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_13_300.jpg",
	                name: "auren"
	            };
	        } else if (faction.toUpperCase() == "WITCHES") {
	            return {
	                imgUrl: imgUrlPrefix + "volk_14_300.jpg",
	                name: "witches"
	            };
	        } else {
	            return null;
	        }
	    }

	    function loadTooltips() {
	        $(".explanation").tooltip();
	    }
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('d3', []).factory('d3', __webpack_require__(15)).directive('d3Heatmap', __webpack_require__(16)).directive('d3Histogram', __webpack_require__(17)).directive('d3Scoregraph', __webpack_require__(18));

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	d3Source.$inject = [];
	module.exports = d3Source;

	function d3Source() {
	    var d3;
	    // d3 version 3 from http://d3js.org/d3.v3.min.js
	    d3=function(){function n(n){return null!=n&&!isNaN(n)}function t(n){return n.length}function e(n){for(var t=1;n*t%1;)t*=10;return t}function r(n,t){try{for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}catch(r){n.prototype=t}}function u(){}function i(){}function o(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function a(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.substring(1);for(var e=0,r=Do.length;r>e;++e){var u=Do[e]+t;if(u in n)return u}}function c(){}function l(){}function s(n){function t(){for(var t,r=e,u=-1,i=r.length;++u<i;)(t=r[u].on)&&t.apply(this,arguments);return n}var e=[],r=new u;return t.on=function(t,u){var i,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,i=e.indexOf(o)).concat(e.slice(i+1)),r.remove(t)),u&&e.push(r.set(t,{on:u})),n)},t}function f(){mo.event.preventDefault()}function h(){for(var n,t=mo.event;n=t.sourceEvent;)t=n;return t}function g(n){for(var t=new l,e=0,r=arguments.length;++e<r;)t[arguments[e]]=s(t);return t.of=function(e,r){return function(u){try{var i=u.sourceEvent=mo.event;u.target=n,mo.event=u,t[u.type].apply(e,r)}finally{mo.event=i}}},t}function p(n){return Lo(n,Ro),n}function d(n){return"function"==typeof n?n:function(){return Ho(n,this)}}function v(n){return"function"==typeof n?n:function(){return Fo(n,this)}}function m(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function u(){this.setAttribute(n,t)}function i(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=mo.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?i:u}function y(n){return n.trim().replace(/\s+/g," ")}function M(n){return new RegExp("(?:^|\\s+)"+mo.requote(n)+"(?:\\s+|$)","g")}function x(n,t){function e(){for(var e=-1;++e<u;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<u;)n[e](this,r)}n=n.trim().split(/\s+/).map(b);var u=n.length;return"function"==typeof t?r:e}function b(n){var t=M(n);return function(e,r){if(u=e.classList)return r?u.add(n):u.remove(n);var u=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(u)||e.setAttribute("class",y(u+" "+n))):e.setAttribute("class",y(u.replace(t," ")))}}function _(n,t,e){function r(){this.style.removeProperty(n)}function u(){this.style.setProperty(n,t,e)}function i(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?i:u}function w(n,t){function e(){delete this[n]}function r(){this[n]=t}function u(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?u:r}function S(n){return"function"==typeof n?n:(n=mo.ns.qualify(n)).local?function(){return xo.createElementNS(n.space,n.local)}:function(){return xo.createElementNS(this.namespaceURI,n)}}function E(n){return{__data__:n}}function k(n){return function(){return Oo(this,n)}}function A(n){return arguments.length||(n=mo.ascending),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function N(n,t){for(var e=0,r=n.length;r>e;e++)for(var u,i=n[e],o=0,a=i.length;a>o;o++)(u=i[o])&&t(u,o,e);return n}function T(n){return Lo(n,Io),n}function q(n){var t,e;return function(r,u,i){var o,a=n[i].update,c=a.length;for(i!=e&&(e=i,t=0),u>=t&&(t=u+1);!(o=a[t])&&++t<c;);return o}}function z(){var n=this.__transition__;n&&++n.active}function C(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function u(){var u=l(t,Mo(arguments));r.call(this),this.addEventListener(n,this[o]=u,u.$=e),u._=t}function i(){var t,e=new RegExp("^__on([^.]+)"+mo.requote(n)+"$");for(var r in this)if(t=r.match(e)){var u=this[r];this.removeEventListener(t[1],u,u.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),l=D;a>0&&(n=n.substring(0,a));var s=Zo.get(n);return s&&(n=s,l=j),a?t?u:r:t?c:i}function D(n,t){return function(e){var r=mo.event;mo.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{mo.event=r}}}function j(n,t){var e=D(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function L(){var n=".dragsuppress-"+ ++Xo,t="touchmove"+n,e="selectstart"+n,r="dragstart"+n,u="click"+n,i=mo.select(_o).on(t,f).on(e,f).on(r,f),o=bo.style,a=o[Vo];return o[Vo]="none",function(t){function e(){i.on(u,null)}i.on(n,null),o[Vo]=a,t&&(i.on(u,function(){f(),e()},!0),setTimeout(e,0))}}function H(n,t){t.changedTouches&&(t=t.changedTouches[0]);var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();if(0>$o&&(_o.scrollX||_o.scrollY)){e=mo.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var u=e[0][0].getScreenCTM();$o=!(u.f||u.e),e.remove()}return $o?(r.x=t.pageX,r.y=t.pageY):(r.x=t.clientX,r.y=t.clientY),r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}function F(n){return n>0?1:0>n?-1:0}function P(n){return n>1?0:-1>n?Bo:Math.acos(n)}function O(n){return n>1?Bo/2:-1>n?-Bo/2:Math.asin(n)}function R(n){return(Math.exp(n)-Math.exp(-n))/2}function Y(n){return(Math.exp(n)+Math.exp(-n))/2}function I(n){return R(n)/Y(n)}function U(n){return(n=Math.sin(n/2))*n}function Z(){}function V(n,t,e){return new X(n,t,e)}function X(n,t,e){this.h=n,this.s=t,this.l=e}function $(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?i+(o-i)*n/60:180>n?o:240>n?i+(o-i)*(240-n)/60:i}function u(n){return Math.round(255*r(n))}var i,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,i=2*e-o,ot(u(n+120),u(n),u(n-120))}function B(n,t,e){return new W(n,t,e)}function W(n,t,e){this.h=n,this.c=t,this.l=e}function J(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),G(e,Math.cos(n*=Go)*t,Math.sin(n)*t)}function G(n,t,e){return new K(n,t,e)}function K(n,t,e){this.l=n,this.a=t,this.b=e}function Q(n,t,e){var r=(n+16)/116,u=r+t/500,i=r-e/200;return u=tt(u)*ca,r=tt(r)*la,i=tt(i)*sa,ot(rt(3.2404542*u-1.5371385*r-.4985314*i),rt(-.969266*u+1.8760108*r+.041556*i),rt(.0556434*u-.2040259*r+1.0572252*i))}function nt(n,t,e){return n>0?B(Math.atan2(e,t)*Ko,Math.sqrt(t*t+e*e),n):B(0/0,0/0,n)}function tt(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function et(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function rt(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function ut(n){return ot(n>>16,255&n>>8,255&n)}function it(n){return ut(n)+""}function ot(n,t,e){return new at(n,t,e)}function at(n,t,e){this.r=n,this.g=t,this.b=e}function ct(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function lt(n,t,e){var r,u,i,o=0,a=0,c=0;if(r=/([a-z]+)\((.*)\)/i.exec(n))switch(u=r[2].split(","),r[1]){case"hsl":return e(parseFloat(u[0]),parseFloat(u[1])/100,parseFloat(u[2])/100);case"rgb":return t(gt(u[0]),gt(u[1]),gt(u[2]))}return(i=ga.get(n))?t(i.r,i.g,i.b):(null!=n&&"#"===n.charAt(0)&&(4===n.length?(o=n.charAt(1),o+=o,a=n.charAt(2),a+=a,c=n.charAt(3),c+=c):7===n.length&&(o=n.substring(1,3),a=n.substring(3,5),c=n.substring(5,7)),o=parseInt(o,16),a=parseInt(a,16),c=parseInt(c,16)),t(o,a,c))}function st(n,t,e){var r,u,i=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-i,c=(o+i)/2;return a?(u=.5>c?a/(o+i):a/(2-o-i),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=0/0,u=c>0&&1>c?0:r),V(r,u,c)}function ft(n,t,e){n=ht(n),t=ht(t),e=ht(e);var r=et((.4124564*n+.3575761*t+.1804375*e)/ca),u=et((.2126729*n+.7151522*t+.072175*e)/la),i=et((.0193339*n+.119192*t+.9503041*e)/sa);return G(116*u-16,500*(r-u),200*(u-i))}function ht(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function gt(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function pt(n){return"function"==typeof n?n:function(){return n}}function dt(n){return n}function vt(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),mt(t,e,n,r)}}function mt(n,t,e,r){function u(){var n,t=c.status;if(!t&&c.responseText||t>=200&&300>t||304===t){try{n=e.call(i,c)}catch(r){return o.error.call(i,r),void 0}o.load.call(i,n)}else o.error.call(i,c)}var i={},o=mo.dispatch("beforesend","progress","load","error"),a={},c=new XMLHttpRequest,l=null;return!_o.XDomainRequest||"withCredentials"in c||!/^(http(s)?:)?\/\//.test(n)||(c=new XDomainRequest),"onload"in c?c.onload=c.onerror=u:c.onreadystatechange=function(){c.readyState>3&&u()},c.onprogress=function(n){var t=mo.event;mo.event=n;try{o.progress.call(i,c)}finally{mo.event=t}},i.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",i)},i.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",i):t},i.responseType=function(n){return arguments.length?(l=n,i):l},i.response=function(n){return e=n,i},["get","post"].forEach(function(n){i[n]=function(){return i.send.apply(i,[n].concat(Mo(arguments)))}}),i.send=function(e,r,u){if(2===arguments.length&&"function"==typeof r&&(u=r,r=null),c.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),c.setRequestHeader)for(var s in a)c.setRequestHeader(s,a[s]);return null!=t&&c.overrideMimeType&&c.overrideMimeType(t),null!=l&&(c.responseType=l),null!=u&&i.on("error",u).on("load",function(n){u(null,n)}),o.beforesend.call(i,c),c.send(null==r?null:r),i},i.abort=function(){return c.abort(),i},mo.rebind(i,o,"on"),null==r?i:i.get(yt(r))}function yt(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Mt(){var n=bt(),t=_t()-n;t>24?(isFinite(t)&&(clearTimeout(ma),ma=setTimeout(Mt,t)),va=0):(va=1,Ma(Mt))}function xt(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now()),ya.callback=n,ya.time=e+t}function bt(){var n=Date.now();for(ya=pa;ya;)n>=ya.time&&(ya.flush=ya.callback(n-ya.time)),ya=ya.next;return n}function _t(){for(var n,t=pa,e=1/0;t;)t.flush?t=n?n.next=t.next:pa=t.next:(t.time<e&&(e=t.time),t=(n=t).next);return da=n,e}function wt(n,t){var e=Math.pow(10,3*Math.abs(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function St(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Et(n){return n+""}function kt(){}function At(n,t,e){var r=e.s=n+t,u=r-n,i=r-u;e.t=n-i+(t-u)}function Nt(n,t){n&&za.hasOwnProperty(n.type)&&za[n.type](n,t)}function Tt(n,t,e){var r,u=-1,i=n.length-e;for(t.lineStart();++u<i;)r=n[u],t.point(r[0],r[1],r[2]);t.lineEnd()}function qt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)Tt(n[e],t,1);t.polygonEnd()}function zt(){function n(n,t){n*=Go,t=t*Go/2+Bo/4;var e=n-r,o=Math.cos(t),a=Math.sin(t),c=i*a,l=u*o+c*Math.cos(e),s=c*Math.sin(e);Da.add(Math.atan2(s,l)),r=n,u=o,i=a}var t,e,r,u,i;ja.point=function(o,a){ja.point=n,r=(t=o)*Go,u=Math.cos(a=(e=a)*Go/2+Bo/4),i=Math.sin(a)},ja.lineEnd=function(){n(t,e)}}function Ct(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function Dt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function jt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Lt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function Ht(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Ft(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Pt(n){return[Math.atan2(n[1],n[0]),O(n[2])]}function Ot(n,t){return Math.abs(n[0]-t[0])<Wo&&Math.abs(n[1]-t[1])<Wo}function Rt(n,t){n*=Go;var e=Math.cos(t*=Go);Yt(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function Yt(n,t,e){++La,Fa+=(n-Fa)/La,Pa+=(t-Pa)/La,Oa+=(e-Oa)/La}function It(){function n(n,u){n*=Go;var i=Math.cos(u*=Go),o=i*Math.cos(n),a=i*Math.sin(n),c=Math.sin(u),l=Math.atan2(Math.sqrt((l=e*c-r*a)*l+(l=r*o-t*c)*l+(l=t*a-e*o)*l),t*o+e*a+r*c);Ha+=l,Ra+=l*(t+(t=o)),Ya+=l*(e+(e=a)),Ia+=l*(r+(r=c)),Yt(t,e,r)}var t,e,r;Xa.point=function(u,i){u*=Go;var o=Math.cos(i*=Go);t=o*Math.cos(u),e=o*Math.sin(u),r=Math.sin(i),Xa.point=n,Yt(t,e,r)}}function Ut(){Xa.point=Rt}function Zt(){function n(n,t){n*=Go;var e=Math.cos(t*=Go),o=e*Math.cos(n),a=e*Math.sin(n),c=Math.sin(t),l=u*c-i*a,s=i*o-r*c,f=r*a-u*o,h=Math.sqrt(l*l+s*s+f*f),g=r*o+u*a+i*c,p=h&&-P(g)/h,d=Math.atan2(h,g);Ua+=p*l,Za+=p*s,Va+=p*f,Ha+=d,Ra+=d*(r+(r=o)),Ya+=d*(u+(u=a)),Ia+=d*(i+(i=c)),Yt(r,u,i)}var t,e,r,u,i;Xa.point=function(o,a){t=o,e=a,Xa.point=n,o*=Go;var c=Math.cos(a*=Go);r=c*Math.cos(o),u=c*Math.sin(o),i=Math.sin(a),Yt(r,u,i)},Xa.lineEnd=function(){n(t,e),Xa.lineEnd=Ut,Xa.point=Rt}}function Vt(){return!0}function Xt(n,t,e,r,u){var i=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(Ot(e,r)){u.lineStart();for(var a=0;t>a;++a)u.point((e=n[a])[0],e[1]);return u.lineEnd(),void 0}var c={point:e,points:n,other:null,visited:!1,entry:!0,subject:!0},l={point:e,points:[e],other:c,visited:!1,entry:!1,subject:!1};c.other=l,i.push(c),o.push(l),c={point:r,points:[r],other:null,visited:!1,entry:!1,subject:!0},l={point:r,points:[r],other:c,visited:!1,entry:!0,subject:!1},c.other=l,i.push(c),o.push(l)}}),o.sort(t),$t(i),$t(o),i.length){if(e)for(var a=1,c=!e(o[0].point),l=o.length;l>a;++a)o[a].entry=c=!c;for(var s,f,h,g=i[0];;){for(s=g;s.visited;)if((s=s.next)===g)return;f=s.points,u.lineStart();do{if(s.visited=s.other.visited=!0,s.entry){if(s.subject)for(var a=0;a<f.length;a++)u.point((h=f[a])[0],h[1]);else r(s.point,s.next.point,1,u);s=s.next}else{if(s.subject){f=s.prev.points;for(var a=f.length;--a>=0;)u.point((h=f[a])[0],h[1])}else r(s.point,s.prev.point,-1,u);s=s.prev}s=s.other,f=s.points}while(!s.visited);u.lineEnd()}}}function $t(n){if(t=n.length){for(var t,e,r=0,u=n[0];++r<t;)u.next=e=n[r],e.prev=u,u=e;u.next=e=n[0],e.prev=u}}function Bt(n,t,e,r){return function(u){function i(t,e){n(t,e)&&u.point(t,e)}function o(n,t){d.point(n,t)}function a(){v.point=o,d.lineStart()}function c(){v.point=i,d.lineEnd()}function l(n,t){y.point(n,t),p.push([n,t])}function s(){y.lineStart(),p=[]}function f(){l(p[0][0],p[0][1]),y.lineEnd();var n,t=y.clean(),e=m.buffer(),r=e.length;if(p.pop(),g.push(p),p=null,r){if(1&t){n=e[0];var i,r=n.length-1,o=-1;for(u.lineStart();++o<r;)u.point((i=n[o])[0],i[1]);return u.lineEnd(),void 0}r>1&&2&t&&e.push(e.pop().concat(e.shift())),h.push(e.filter(Wt))}}var h,g,p,d=t(u),v={point:i,lineStart:a,lineEnd:c,polygonStart:function(){v.point=l,v.lineStart=s,v.lineEnd=f,h=[],g=[],u.polygonStart()},polygonEnd:function(){v.point=i,v.lineStart=a,v.lineEnd=c,h=mo.merge(h),h.length?Xt(h,Gt,null,e,u):r(g)&&(u.lineStart(),e(null,null,1,u),u.lineEnd()),u.polygonEnd(),h=g=null},sphere:function(){u.polygonStart(),u.lineStart(),e(null,null,1,u),u.lineEnd(),u.polygonEnd()}},m=Jt(),y=t(m);return v}}function Wt(n){return n.length>1}function Jt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:c,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Gt(n,t){return((n=n.point)[0]<0?n[1]-Bo/2-Wo:Bo/2-n[1])-((t=t.point)[0]<0?t[1]-Bo/2-Wo:Bo/2-t[1])}function Kt(n,t){var e=n[0],r=n[1],u=[Math.sin(e),-Math.cos(e),0],i=0,o=!1,a=!1,c=0;Da.reset();for(var l=0,s=t.length;s>l;++l){var f=t[l],h=f.length;if(h){for(var g=f[0],p=g[0],d=g[1]/2+Bo/4,v=Math.sin(d),m=Math.cos(d),y=1;;){y===h&&(y=0),n=f[y];var M=n[0],x=n[1]/2+Bo/4,b=Math.sin(x),_=Math.cos(x),w=M-p,S=Math.abs(w)>Bo,E=v*b;if(Da.add(Math.atan2(E*Math.sin(w),m*_+E*Math.cos(w))),Math.abs(x)<Wo&&(a=!0),i+=S?w+(w>=0?2:-2)*Bo:w,S^p>=e^M>=e){var k=jt(Ct(g),Ct(n));Ft(k);var A=jt(u,k);Ft(A);var N=(S^w>=0?-1:1)*O(A[2]);r>N&&(c+=S^w>=0?1:-1)}if(!y++)break;p=M,v=b,m=_,g=n}Math.abs(i)>Wo&&(o=!0)}}return(!a&&!o&&0>Da||-Wo>i)^1&c}function Qt(n){var t,e=0/0,r=0/0,u=0/0;return{lineStart:function(){n.lineStart(),t=1},point:function(i,o){var a=i>0?Bo:-Bo,c=Math.abs(i-e);Math.abs(c-Bo)<Wo?(n.point(e,r=(r+o)/2>0?Bo/2:-Bo/2),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(i,r),t=0):u!==a&&c>=Bo&&(Math.abs(e-u)<Wo&&(e-=u*Wo),Math.abs(i-a)<Wo&&(i-=a*Wo),r=ne(e,r,i,o),n.point(u,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=i,r=o),u=a},lineEnd:function(){n.lineEnd(),e=r=0/0},clean:function(){return 2-t}}}function ne(n,t,e,r){var u,i,o=Math.sin(n-e);return Math.abs(o)>Wo?Math.atan((Math.sin(t)*(i=Math.cos(r))*Math.sin(e)-Math.sin(r)*(u=Math.cos(t))*Math.sin(n))/(u*i*o)):(t+r)/2}function te(n,t,e,r){var u;if(null==n)u=e*Bo/2,r.point(-Bo,u),r.point(0,u),r.point(Bo,u),r.point(Bo,0),r.point(Bo,-u),r.point(0,-u),r.point(-Bo,-u),r.point(-Bo,0),r.point(-Bo,u);else if(Math.abs(n[0]-t[0])>Wo){var i=(n[0]<t[0]?1:-1)*Bo;u=e*i/2,r.point(-i,u),r.point(0,u),r.point(i,u)}else r.point(t[0],t[1])}function ee(n){return Kt(Ba,n)}function re(n){function t(n,t){return Math.cos(n)*Math.cos(t)>o}function e(n){var e,i,o,c,s;return{lineStart:function(){c=o=!1,s=1},point:function(f,h){var g,p=[f,h],d=t(f,h),v=a?d?0:u(f,h):d?u(f+(0>f?Bo:-Bo),h):0;if(!e&&(c=o=d)&&n.lineStart(),d!==o&&(g=r(e,p),(Ot(e,g)||Ot(p,g))&&(p[0]+=Wo,p[1]+=Wo,d=t(p[0],p[1]))),d!==o)s=0,d?(n.lineStart(),g=r(p,e),n.point(g[0],g[1])):(g=r(e,p),n.point(g[0],g[1]),n.lineEnd()),e=g;else if(l&&e&&a^d){var m;v&i||!(m=r(p,e,!0))||(s=0,a?(n.lineStart(),n.point(m[0][0],m[0][1]),n.point(m[1][0],m[1][1]),n.lineEnd()):(n.point(m[1][0],m[1][1]),n.lineEnd(),n.lineStart(),n.point(m[0][0],m[0][1])))}!d||e&&Ot(e,p)||n.point(p[0],p[1]),e=p,o=d,i=v},lineEnd:function(){o&&n.lineEnd(),e=null},clean:function(){return s|(c&&o)<<1}}}function r(n,t,e){var r=Ct(n),u=Ct(t),i=[1,0,0],a=jt(r,u),c=Dt(a,a),l=a[0],s=c-l*l;if(!s)return!e&&n;var f=o*c/s,h=-o*l/s,g=jt(i,a),p=Ht(i,f),d=Ht(a,h);Lt(p,d);var v=g,m=Dt(p,v),y=Dt(v,v),M=m*m-y*(Dt(p,p)-1);if(!(0>M)){var x=Math.sqrt(M),b=Ht(v,(-m-x)/y);if(Lt(b,p),b=Pt(b),!e)return b;var _,w=n[0],S=t[0],E=n[1],k=t[1];w>S&&(_=w,w=S,S=_);var A=S-w,N=Math.abs(A-Bo)<Wo,T=N||Wo>A;if(!N&&E>k&&(_=E,E=k,k=_),T?N?E+k>0^b[1]<(Math.abs(b[0]-w)<Wo?E:k):E<=b[1]&&b[1]<=k:A>Bo^(w<=b[0]&&b[0]<=S)){var q=Ht(v,(-m+x)/y);return Lt(q,p),[b,Pt(q)]}}}function u(t,e){var r=a?n:Bo-n,u=0;return-r>t?u|=1:t>r&&(u|=2),-r>e?u|=4:e>r&&(u|=8),u}function i(n){return Kt(c,n)}var o=Math.cos(n),a=o>0,c=[n,0],l=Math.abs(o)>Wo,s=Te(n,6*Go);return Bt(t,e,s,i)}function ue(n,t,e,r){function u(r,u){return Math.abs(r[0]-n)<Wo?u>0?0:3:Math.abs(r[0]-e)<Wo?u>0?2:1:Math.abs(r[1]-t)<Wo?u>0?1:0:u>0?3:2}function i(n,t){return o(n.point,t.point)}function o(n,t){var e=u(n,1),r=u(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}function a(u,i){var o=i[0]-u[0],a=i[1]-u[1],c=[0,1];return Math.abs(o)<Wo&&Math.abs(a)<Wo?n<=u[0]&&u[0]<=e&&t<=u[1]&&u[1]<=r:ie(n-u[0],o,c)&&ie(u[0]-e,-o,c)&&ie(t-u[1],a,c)&&ie(u[1]-r,-a,c)?(c[1]<1&&(i[0]=u[0]+c[1]*o,i[1]=u[1]+c[1]*a),c[0]>0&&(u[0]+=c[0]*o,u[1]+=c[0]*a),!0):!1}return function(c){function l(i){var o=u(i,-1),a=s([0===o||3===o?n:e,o>1?r:t]);return a}function s(n){for(var t=0,e=M.length,r=n[1],u=0;e>u;++u)for(var i,o=1,a=M[u],c=a.length,l=a[0];c>o;++o)i=a[o],l[1]<=r?i[1]>r&&f(l,i,n)>0&&++t:i[1]<=r&&f(l,i,n)<0&&--t,l=i;return 0!==t}function f(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(e[0]-n[0])*(t[1]-n[1])}function h(i,a,c,l){var s=0,f=0;if(null==i||(s=u(i,c))!==(f=u(a,c))||o(i,a)<0^c>0){do l.point(0===s||3===s?n:e,s>1?r:t);while((s=(s+c+4)%4)!==f)}else l.point(a[0],a[1])}function g(u,i){return u>=n&&e>=u&&i>=t&&r>=i}function p(n,t){g(n,t)&&c.point(n,t)}function d(){q.point=m,M&&M.push(x=[]),A=!0,k=!1,S=E=0/0}function v(){y&&(m(b,_),w&&k&&T.rejoin(),y.push(T.buffer())),q.point=p,k&&c.lineEnd()}function m(n,t){n=Math.max(-Wa,Math.min(Wa,n)),t=Math.max(-Wa,Math.min(Wa,t));var e=g(n,t);if(M&&x.push([n,t]),A)b=n,_=t,w=e,A=!1,e&&(c.lineStart(),c.point(n,t));else if(e&&k)c.point(n,t);else{var r=[S,E],u=[n,t];a(r,u)?(k||(c.lineStart(),c.point(r[0],r[1])),c.point(u[0],u[1]),e||c.lineEnd()):e&&(c.lineStart(),c.point(n,t))}S=n,E=t,k=e}var y,M,x,b,_,w,S,E,k,A,N=c,T=Jt(),q={point:p,lineStart:d,lineEnd:v,polygonStart:function(){c=T,y=[],M=[]},polygonEnd:function(){c=N,(y=mo.merge(y)).length?(c.polygonStart(),Xt(y,i,l,h,c),c.polygonEnd()):s([n,t])&&(c.polygonStart(),c.lineStart(),h(null,null,1,c),c.lineEnd(),c.polygonEnd()),y=M=x=null}};return q}}function ie(n,t,e){if(Math.abs(t)<Wo)return 0>=n;var r=n/t;if(t>0){if(r>e[1])return!1;r>e[0]&&(e[0]=r)}else{if(r<e[0])return!1;r<e[1]&&(e[1]=r)}return!0}function oe(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function ae(n){var t=0,e=Bo/3,r=_e(n),u=r(t,e);return u.parallels=function(n){return arguments.length?r(t=n[0]*Bo/180,e=n[1]*Bo/180):[180*(t/Bo),180*(e/Bo)]},u}function ce(n,t){function e(n,t){var e=Math.sqrt(i-2*u*Math.sin(t))/u;return[e*Math.sin(n*=u),o-e*Math.cos(n)]}var r=Math.sin(n),u=(r+Math.sin(t))/2,i=1+r*(2*u-r),o=Math.sqrt(i)/u;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/u,O((i-(n*n+e*e)*u*u)/(2*u))]},e}function le(){function n(n,t){Ga+=u*n-r*t,r=n,u=t}var t,e,r,u;ec.point=function(i,o){ec.point=n,t=r=i,e=u=o},ec.lineEnd=function(){n(t,e)}}function se(n,t){Ka>n&&(Ka=n),n>nc&&(nc=n),Qa>t&&(Qa=t),t>tc&&(tc=t)}function fe(){function n(n,t){o.push("M",n,",",t,i)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function u(){o.push("Z")}var i=he(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return i=he(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function he(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function ge(n,t){Fa+=n,Pa+=t,++Oa}function pe(){function n(n,r){var u=n-t,i=r-e,o=Math.sqrt(u*u+i*i);Ra+=o*(t+n)/2,Ya+=o*(e+r)/2,Ia+=o,ge(t=n,e=r)}var t,e;uc.point=function(r,u){uc.point=n,ge(t=r,e=u)}}function de(){uc.point=ge}function ve(){function n(n,t){var e=n-r,i=t-u,o=Math.sqrt(e*e+i*i);Ra+=o*(r+n)/2,Ya+=o*(u+t)/2,Ia+=o,o=u*n-r*t,Ua+=o*(r+n),Za+=o*(u+t),Va+=3*o,ge(r=n,u=t)}var t,e,r,u;uc.point=function(i,o){uc.point=n,ge(t=r=i,e=u=o)},uc.lineEnd=function(){n(t,e)}}function me(n){function t(t,e){n.moveTo(t,e),n.arc(t,e,o,0,2*Bo)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function u(){a.point=t}function i(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:u,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=u,a.point=t},pointRadius:function(n){return o=n,a},result:c};return a}function ye(n){function t(t){function r(e,r){e=n(e,r),t.point(e[0],e[1])}function u(){M=0/0,S.point=o,t.lineStart()}function o(r,u){var o=Ct([r,u]),a=n(r,u);e(M,x,y,b,_,w,M=a[0],x=a[1],y=r,b=o[0],_=o[1],w=o[2],i,t),t.point(M,x)}function a(){S.point=r,t.lineEnd()}function c(){u(),S.point=l,S.lineEnd=s}function l(n,t){o(f=n,h=t),g=M,p=x,d=b,v=_,m=w,S.point=o}function s(){e(M,x,y,b,_,w,g,p,f,d,v,m,i,t),S.lineEnd=a,a()}var f,h,g,p,d,v,m,y,M,x,b,_,w,S={point:r,lineStart:u,lineEnd:a,polygonStart:function(){t.polygonStart(),S.lineStart=c},polygonEnd:function(){t.polygonEnd(),S.lineStart=u}};return S}function e(t,i,o,a,c,l,s,f,h,g,p,d,v,m){var y=s-t,M=f-i,x=y*y+M*M;if(x>4*r&&v--){var b=a+g,_=c+p,w=l+d,S=Math.sqrt(b*b+_*_+w*w),E=Math.asin(w/=S),k=Math.abs(Math.abs(w)-1)<Wo?(o+h)/2:Math.atan2(_,b),A=n(k,E),N=A[0],T=A[1],q=N-t,z=T-i,C=M*q-y*z;(C*C/x>r||Math.abs((y*q+M*z)/x-.5)>.3||u>a*g+c*p+l*d)&&(e(t,i,o,a,c,l,N,T,k,b/=S,_/=S,w,v,m),m.point(N,T),e(N,T,k,b,_,w,s,f,h,g,p,d,v,m))}}var r=.5,u=Math.cos(30*Go),i=16;return t.precision=function(n){return arguments.length?(i=(r=n*n)>0&&16,t):Math.sqrt(r)},t}function Me(n){this.stream=n}function xe(n){var t=ye(function(t,e){return n([t*Ko,e*Ko])});return function(n){var e=new Me(n=t(n));return e.point=function(t,e){n.point(t*Go,e*Go)},e}}function be(n){return _e(function(){return n})()}function _e(n){function t(n){return n=a(n[0]*Go,n[1]*Go),[n[0]*h+c,l-n[1]*h]}function e(n){return n=a.invert((n[0]-c)/h,(l-n[1])/h),n&&[n[0]*Ko,n[1]*Ko]}function r(){a=oe(o=Ee(m,y,M),i);var n=i(d,v);return c=g-n[0]*h,l=p+n[1]*h,u()}function u(){return s&&(s.valid=!1,s=null),t}var i,o,a,c,l,s,f=ye(function(n,t){return n=i(n,t),[n[0]*h+c,l-n[1]*h]}),h=150,g=480,p=250,d=0,v=0,m=0,y=0,M=0,x=$a,b=dt,_=null,w=null;return t.stream=function(n){return s&&(s.valid=!1),s=we(o,x(f(b(n)))),s.valid=!0,s},t.clipAngle=function(n){return arguments.length?(x=null==n?(_=n,$a):re((_=+n)*Go),u()):_},t.clipExtent=function(n){return arguments.length?(w=n,b=n?ue(n[0][0],n[0][1],n[1][0],n[1][1]):dt,u()):w},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(g=+n[0],p=+n[1],r()):[g,p]},t.center=function(n){return arguments.length?(d=n[0]%360*Go,v=n[1]%360*Go,r()):[d*Ko,v*Ko]},t.rotate=function(n){return arguments.length?(m=n[0]%360*Go,y=n[1]%360*Go,M=n.length>2?n[2]%360*Go:0,r()):[m*Ko,y*Ko,M*Ko]},mo.rebind(t,f,"precision"),function(){return i=n.apply(this,arguments),t.invert=i.invert&&e,r()}}function we(n,t){var e=new Me(t);return e.point=function(e,r){r=n(e*Go,r*Go),e=r[0],t.point(e>Bo?e-2*Bo:-Bo>e?e+2*Bo:e,r[1])},e}function Se(n,t){return[n,t]}function Ee(n,t,e){return n?t||e?oe(Ae(n),Ne(t,e)):Ae(n):t||e?Ne(t,e):Se}function ke(n){return function(t,e){return t+=n,[t>Bo?t-2*Bo:-Bo>t?t+2*Bo:t,e]}}function Ae(n){var t=ke(n);return t.invert=ke(-n),t}function Ne(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),s=l*r+a*u;return[Math.atan2(c*i-s*o,a*r-l*u),O(s*i+c*o)]}var r=Math.cos(n),u=Math.sin(n),i=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,c=Math.sin(n)*e,l=Math.sin(t),s=l*i-c*o;return[Math.atan2(c*i+l*o,a*r+s*u),O(s*r-a*u)]},e}function Te(n,t){var e=Math.cos(n),r=Math.sin(n);return function(u,i,o,a){var c=o*t;null!=u?(u=qe(e,u),i=qe(e,i),(o>0?i>u:u>i)&&(u+=2*o*Bo)):(u=n+2*o*Bo,i=n-.5*c);for(var l,s=u;o>0?s>i:i>s;s-=c)a.point((l=Pt([e,-r*Math.cos(s),-r*Math.sin(s)]))[0],l[1])}}function qe(n,t){var e=Ct(t);e[0]-=n,Ft(e);var r=P(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Wo)%(2*Math.PI)}function ze(n,t,e){var r=mo.range(n,t-Wo,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function Ce(n,t,e){var r=mo.range(n,t-Wo,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function De(n){return n.source}function je(n){return n.target}function Le(n,t,e,r){var u=Math.cos(t),i=Math.sin(t),o=Math.cos(r),a=Math.sin(r),c=u*Math.cos(n),l=u*Math.sin(n),s=o*Math.cos(e),f=o*Math.sin(e),h=2*Math.asin(Math.sqrt(U(r-t)+u*o*U(e-n))),g=1/Math.sin(h),p=h?function(n){var t=Math.sin(n*=h)*g,e=Math.sin(h-n)*g,r=e*c+t*s,u=e*l+t*f,o=e*i+t*a;return[Math.atan2(u,r)*Ko,Math.atan2(o,Math.sqrt(r*r+u*u))*Ko]}:function(){return[n*Ko,t*Ko]};return p.distance=h,p}function He(){function n(n,u){var i=Math.sin(u*=Go),o=Math.cos(u),a=Math.abs((n*=Go)-t),c=Math.cos(a);ic+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*i-e*o*c)*a),e*i+r*o*c),t=n,e=i,r=o}var t,e,r;oc.point=function(u,i){t=u*Go,e=Math.sin(i*=Go),r=Math.cos(i),oc.point=n},oc.lineEnd=function(){oc.point=oc.lineEnd=c}}function Fe(n,t){function e(t,e){var r=Math.cos(t),u=Math.cos(e),i=n(r*u);return[i*u*Math.sin(t),i*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),u=t(r),i=Math.sin(u),o=Math.cos(u);return[Math.atan2(n*i,r*o),Math.asin(r&&e*i/r)]},e}function Pe(n,t){function e(n,t){var e=Math.abs(Math.abs(t)-Bo/2)<Wo?0:o/Math.pow(u(t),i);return[e*Math.sin(i*n),o-e*Math.cos(i*n)]}var r=Math.cos(n),u=function(n){return Math.tan(Bo/4+n/2)},i=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(u(t)/u(n)),o=r*Math.pow(u(n),i)/i;return i?(e.invert=function(n,t){var e=o-t,r=F(i)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/i,2*Math.atan(Math.pow(o/r,1/i))-Bo/2]},e):Re}function Oe(n,t){function e(n,t){var e=i-t;return[e*Math.sin(u*n),i-e*Math.cos(u*n)]}var r=Math.cos(n),u=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),i=r/u+n;return Math.abs(u)<Wo?Se:(e.invert=function(n,t){var e=i-t;return[Math.atan2(n,e)/u,i-F(u)*Math.sqrt(n*n+e*e)]},e)}function Re(n,t){return[n,Math.log(Math.tan(Bo/4+t/2))]}function Ye(n){var t,e=be(n),r=e.scale,u=e.translate,i=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=u.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=i.apply(e,arguments);if(o===e){if(t=null==n){var a=Bo*r(),c=u();i([[c[0]-a,c[1]-a],[c[0]+a,c[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ie(n,t){var e=Math.cos(t)*Math.sin(n);return[Math.log((1+e)/(1-e))/2,Math.atan2(Math.tan(t),Math.cos(n))]}function Ue(n){function t(t){function o(){l.push("M",i(n(s),a))}for(var c,l=[],s=[],f=-1,h=t.length,g=pt(e),p=pt(r);++f<h;)u.call(this,c=t[f],f)?s.push([+g.call(this,c,f),+p.call(this,c,f)]):s.length&&(o(),s=[]);return s.length&&o(),l.length?l.join(""):null}var e=Ze,r=Ve,u=Vt,i=Xe,o=i.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(u=n,t):u},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?i=n:(i=hc.get(n)||Xe).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function Ze(n){return n[0]}function Ve(n){return n[1]}function Xe(n){return n.join("L")}function $e(n){return Xe(n)+"Z"}function Be(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&u.push("H",r[0]),u.join("")}function We(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("V",(r=n[t])[1],"H",r[0]);return u.join("")}function Je(n){for(var t=0,e=n.length,r=n[0],u=[r[0],",",r[1]];++t<e;)u.push("H",(r=n[t])[0],"V",r[1]);return u.join("")}function Ge(n,t){return n.length<4?Xe(n):n[1]+nr(n.slice(1,n.length-1),tr(n,t))}function Ke(n,t){return n.length<3?Xe(n):n[0]+nr((n.push(n[0]),n),tr([n[n.length-2]].concat(n,[n[1]]),t))}function Qe(n,t){return n.length<3?Xe(n):n[0]+nr(n,tr(n,t))}function nr(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return Xe(n);var e=n.length!=t.length,r="",u=n[0],i=n[1],o=t[0],a=o,c=1;if(e&&(r+="Q"+(i[0]-2*o[0]/3)+","+(i[1]-2*o[1]/3)+","+i[0]+","+i[1],u=n[1],c=2),t.length>1){a=t[1],i=n[c],c++,r+="C"+(u[0]+o[0])+","+(u[1]+o[1])+","+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1];for(var l=2;l<t.length;l++,c++)i=n[c],a=t[l],r+="S"+(i[0]-a[0])+","+(i[1]-a[1])+","+i[0]+","+i[1]}if(e){var s=n[c];r+="Q"+(i[0]+2*a[0]/3)+","+(i[1]+2*a[1]/3)+","+s[0]+","+s[1]}return r}function tr(n,t){for(var e,r=[],u=(1-t)/2,i=n[0],o=n[1],a=1,c=n.length;++a<c;)e=i,i=o,o=n[a],r.push([u*(o[0]-e[0]),u*(o[1]-e[1])]);return r}function er(n){if(n.length<3)return Xe(n);var t=1,e=n.length,r=n[0],u=r[0],i=r[1],o=[u,u,u,(r=n[1])[0]],a=[i,i,i,r[1]],c=[u,",",i,"L",or(dc,o),",",or(dc,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),ar(c,o,a);return n.pop(),c.push("L",r),c.join("")}function rr(n){if(n.length<4)return Xe(n);for(var t,e=[],r=-1,u=n.length,i=[0],o=[0];++r<3;)t=n[r],i.push(t[0]),o.push(t[1]);for(e.push(or(dc,i)+","+or(dc,o)),--r;++r<u;)t=n[r],i.shift(),i.push(t[0]),o.shift(),o.push(t[1]),ar(e,i,o);return e.join("")}function ur(n){for(var t,e,r=-1,u=n.length,i=u+4,o=[],a=[];++r<4;)e=n[r%u],o.push(e[0]),a.push(e[1]);for(t=[or(dc,o),",",or(dc,a)],--r;++r<i;)e=n[r%u],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),ar(t,o,a);return t.join("")}function ir(n,t){var e=n.length-1;if(e)for(var r,u,i=n[0][0],o=n[0][1],a=n[e][0]-i,c=n[e][1]-o,l=-1;++l<=e;)r=n[l],u=l/e,r[0]=t*r[0]+(1-t)*(i+u*a),r[1]=t*r[1]+(1-t)*(o+u*c);return er(n)}function or(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function ar(n,t,e){n.push("C",or(gc,t),",",or(gc,e),",",or(pc,t),",",or(pc,e),",",or(dc,t),",",or(dc,e))}function cr(n,t){return(t[1]-n[1])/(t[0]-n[0])}function lr(n){for(var t=0,e=n.length-1,r=[],u=n[0],i=n[1],o=r[0]=cr(u,i);++t<e;)r[t]=(o+(o=cr(u=i,i=n[t+1])))/2;
	    return r[t]=o,r}function sr(n){for(var t,e,r,u,i=[],o=lr(n),a=-1,c=n.length-1;++a<c;)t=cr(n[a],n[a+1]),Math.abs(t)<1e-6?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,u=e*e+r*r,u>9&&(u=3*t/Math.sqrt(u),o[a]=u*e,o[a+1]=u*r));for(a=-1;++a<=c;)u=(n[Math.min(c,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),i.push([u||0,o[a]*u||0]);return i}function fr(n){return n.length<3?Xe(n):n[0]+nr(n,sr(n))}function hr(n,t,e,r){var u,i,o,a,c,l,s;return u=r[n],i=u[0],o=u[1],u=r[t],a=u[0],c=u[1],u=r[e],l=u[0],s=u[1],(s-o)*(a-i)-(c-o)*(l-i)>0}function gr(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function pr(n,t,e,r){var u=n[0],i=e[0],o=t[0]-u,a=r[0]-i,c=n[1],l=e[1],s=t[1]-c,f=r[1]-l,h=(a*(c-l)-f*(u-i))/(f*o-a*s);return[u+h*o,c+h*s]}function dr(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function vr(n,t){var e={list:n.map(function(n,t){return{index:t,x:n[0],y:n[1]}}).sort(function(n,t){return n.y<t.y?-1:n.y>t.y?1:n.x<t.x?-1:n.x>t.x?1:0}),bottomSite:null},r={list:[],leftEnd:null,rightEnd:null,init:function(){r.leftEnd=r.createHalfEdge(null,"l"),r.rightEnd=r.createHalfEdge(null,"l"),r.leftEnd.r=r.rightEnd,r.rightEnd.l=r.leftEnd,r.list.unshift(r.leftEnd,r.rightEnd)},createHalfEdge:function(n,t){return{edge:n,side:t,vertex:null,l:null,r:null}},insert:function(n,t){t.l=n,t.r=n.r,n.r.l=t,n.r=t},leftBound:function(n){var t=r.leftEnd;do t=t.r;while(t!=r.rightEnd&&u.rightOf(t,n));return t=t.l},del:function(n){n.l.r=n.r,n.r.l=n.l,n.edge=null},right:function(n){return n.r},left:function(n){return n.l},leftRegion:function(n){return null==n.edge?e.bottomSite:n.edge.region[n.side]},rightRegion:function(n){return null==n.edge?e.bottomSite:n.edge.region[mc[n.side]]}},u={bisect:function(n,t){var e={region:{l:n,r:t},ep:{l:null,r:null}},r=t.x-n.x,u=t.y-n.y,i=r>0?r:-r,o=u>0?u:-u;return e.c=n.x*r+n.y*u+.5*(r*r+u*u),i>o?(e.a=1,e.b=u/r,e.c/=r):(e.b=1,e.a=r/u,e.c/=u),e},intersect:function(n,t){var e=n.edge,r=t.edge;if(!e||!r||e.region.r==r.region.r)return null;var u=e.a*r.b-e.b*r.a;if(Math.abs(u)<1e-10)return null;var i,o,a=(e.c*r.b-r.c*e.b)/u,c=(r.c*e.a-e.c*r.a)/u,l=e.region.r,s=r.region.r;l.y<s.y||l.y==s.y&&l.x<s.x?(i=n,o=e):(i=t,o=r);var f=a>=o.region.r.x;return f&&"l"===i.side||!f&&"r"===i.side?null:{x:a,y:c}},rightOf:function(n,t){var e=n.edge,r=e.region.r,u=t.x>r.x;if(u&&"l"===n.side)return 1;if(!u&&"r"===n.side)return 0;if(1===e.a){var i=t.y-r.y,o=t.x-r.x,a=0,c=0;if(!u&&e.b<0||u&&e.b>=0?c=a=i>=e.b*o:(c=t.x+t.y*e.b>e.c,e.b<0&&(c=!c),c||(a=1)),!a){var l=r.x-e.region.l.x;c=e.b*(o*o-i*i)<l*i*(1+2*o/l+e.b*e.b),e.b<0&&(c=!c)}}else{var s=e.c-e.a*t.x,f=t.y-s,h=t.x-r.x,g=s-r.y;c=f*f>h*h+g*g}return"l"===n.side?c:!c},endPoint:function(n,e,r){n.ep[e]=r,n.ep[mc[e]]&&t(n)},distance:function(n,t){var e=n.x-t.x,r=n.y-t.y;return Math.sqrt(e*e+r*r)}},i={list:[],insert:function(n,t,e){n.vertex=t,n.ystar=t.y+e;for(var r=0,u=i.list,o=u.length;o>r;r++){var a=u[r];if(!(n.ystar>a.ystar||n.ystar==a.ystar&&t.x>a.vertex.x))break}u.splice(r,0,n)},del:function(n){for(var t=0,e=i.list,r=e.length;r>t&&e[t]!=n;++t);e.splice(t,1)},empty:function(){return 0===i.list.length},nextEvent:function(n){for(var t=0,e=i.list,r=e.length;r>t;++t)if(e[t]==n)return e[t+1];return null},min:function(){var n=i.list[0];return{x:n.vertex.x,y:n.ystar}},extractMin:function(){return i.list.shift()}};r.init(),e.bottomSite=e.list.shift();for(var o,a,c,l,s,f,h,g,p,d,v,m,y,M=e.list.shift();;)if(i.empty()||(o=i.min()),M&&(i.empty()||M.y<o.y||M.y==o.y&&M.x<o.x))a=r.leftBound(M),c=r.right(a),h=r.rightRegion(a),m=u.bisect(h,M),f=r.createHalfEdge(m,"l"),r.insert(a,f),d=u.intersect(a,f),d&&(i.del(a),i.insert(a,d,u.distance(d,M))),a=f,f=r.createHalfEdge(m,"r"),r.insert(a,f),d=u.intersect(f,c),d&&i.insert(f,d,u.distance(d,M)),M=e.list.shift();else{if(i.empty())break;a=i.extractMin(),l=r.left(a),c=r.right(a),s=r.right(c),h=r.leftRegion(a),g=r.rightRegion(c),v=a.vertex,u.endPoint(a.edge,a.side,v),u.endPoint(c.edge,c.side,v),r.del(a),i.del(c),r.del(c),y="l",h.y>g.y&&(p=h,h=g,g=p,y="r"),m=u.bisect(h,g),f=r.createHalfEdge(m,y),r.insert(l,f),u.endPoint(m,mc[y],v),d=u.intersect(l,f),d&&(i.del(l),i.insert(l,d,u.distance(d,h))),d=u.intersect(f,s),d&&i.insert(f,d,u.distance(d,h))}for(a=r.right(r.leftEnd);a!=r.rightEnd;a=r.right(a))t(a.edge)}function mr(n){return n.x}function yr(n){return n.y}function Mr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function xr(n,t,e,r,u,i){if(!n(t,e,r,u,i)){var o=.5*(e+u),a=.5*(r+i),c=t.nodes;c[0]&&xr(n,c[0],e,r,o,a),c[1]&&xr(n,c[1],o,r,u,a),c[2]&&xr(n,c[2],e,a,o,i),c[3]&&xr(n,c[3],o,a,u,i)}}function br(n,t){n=mo.rgb(n),t=mo.rgb(t);var e=n.r,r=n.g,u=n.b,i=t.r-e,o=t.g-r,a=t.b-u;return function(n){return"#"+ct(Math.round(e+i*n))+ct(Math.round(r+o*n))+ct(Math.round(u+a*n))}}function _r(n,t){var e,r={},u={};for(e in n)e in t?r[e]=Er(n[e],t[e]):u[e]=n[e];for(e in t)e in n||(u[e]=t[e]);return function(n){for(e in r)u[e]=r[e](n);return u}}function wr(n,t){return t-=n=+n,function(e){return n+t*e}}function Sr(n,t){var e,r,u,i,o,a=0,c=0,l=[],s=[];for(n+="",t+="",yc.lastIndex=0,r=0;e=yc.exec(t);++r)e.index&&l.push(t.substring(a,c=e.index)),s.push({i:l.length,x:e[0]}),l.push(null),a=yc.lastIndex;for(a<t.length&&l.push(t.substring(a)),r=0,i=s.length;(e=yc.exec(n))&&i>r;++r)if(o=s[r],o.x==e[0]){if(o.i)if(null==l[o.i+1])for(l[o.i-1]+=o.x,l.splice(o.i,1),u=r+1;i>u;++u)s[u].i--;else for(l[o.i-1]+=o.x+l[o.i+1],l.splice(o.i,2),u=r+1;i>u;++u)s[u].i-=2;else if(null==l[o.i+1])l[o.i]=o.x;else for(l[o.i]=o.x+l[o.i+1],l.splice(o.i+1,1),u=r+1;i>u;++u)s[u].i--;s.splice(r,1),i--,r--}else o.x=wr(parseFloat(e[0]),parseFloat(o.x));for(;i>r;)o=s.pop(),null==l[o.i+1]?l[o.i]=o.x:(l[o.i]=o.x+l[o.i+1],l.splice(o.i+1,1)),i--;return 1===l.length?null==l[0]?(o=s[0].x,function(n){return o(n)+""}):function(){return t}:function(n){for(r=0;i>r;++r)l[(o=s[r]).i]=o.x(n);return l.join("")}}function Er(n,t){for(var e,r=mo.interpolators.length;--r>=0&&!(e=mo.interpolators[r](n,t)););return e}function kr(n,t){var e,r=[],u=[],i=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(Er(n[e],t[e]));for(;i>e;++e)u[e]=n[e];for(;o>e;++e)u[e]=t[e];return function(n){for(e=0;a>e;++e)u[e]=r[e](n);return u}}function Ar(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function Nr(n){return function(t){return 1-n(1-t)}}function Tr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function qr(n){return n*n}function zr(n){return n*n*n}function Cr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Dr(n){return function(t){return Math.pow(t,n)}}function jr(n){return 1-Math.cos(n*Bo/2)}function Lr(n){return Math.pow(2,10*(n-1))}function Hr(n){return 1-Math.sqrt(1-n*n)}function Fr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/(2*Bo)*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,10*-r)*Math.sin(2*(r-e)*Bo/t)}}function Pr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Or(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Rr(n,t){n=mo.hcl(n),t=mo.hcl(t);var e=n.h,r=n.c,u=n.l,i=t.h-e,o=t.c-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return J(e+i*n,r+o*n,u+a*n)+""}}function Yr(n,t){n=mo.hsl(n),t=mo.hsl(t);var e=n.h,r=n.s,u=n.l,i=t.h-e,o=t.s-r,a=t.l-u;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(i)?(i=0,e=isNaN(e)?t.h:e):i>180?i-=360:-180>i&&(i+=360),function(n){return $(e+i*n,r+o*n,u+a*n)+""}}function Ir(n,t){n=mo.lab(n),t=mo.lab(t);var e=n.l,r=n.a,u=n.b,i=t.l-e,o=t.a-r,a=t.b-u;return function(n){return Q(e+i*n,r+o*n,u+a*n)+""}}function Ur(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function Zr(n){var t=[n.a,n.b],e=[n.c,n.d],r=Xr(t),u=Vr(t,e),i=Xr($r(e,t,-u))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,u*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Ko,this.translate=[n.e,n.f],this.scale=[r,i],this.skew=i?Math.atan2(u,i)*Ko:0}function Vr(n,t){return n[0]*t[0]+n[1]*t[1]}function Xr(n){var t=Math.sqrt(Vr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function $r(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function Br(n,t){var e,r=[],u=[],i=mo.transform(n),o=mo.transform(t),a=i.translate,c=o.translate,l=i.rotate,s=o.rotate,f=i.skew,h=o.skew,g=i.scale,p=o.scale;return a[0]!=c[0]||a[1]!=c[1]?(r.push("translate(",null,",",null,")"),u.push({i:1,x:wr(a[0],c[0])},{i:3,x:wr(a[1],c[1])})):c[0]||c[1]?r.push("translate("+c+")"):r.push(""),l!=s?(l-s>180?s+=360:s-l>180&&(l+=360),u.push({i:r.push(r.pop()+"rotate(",null,")")-2,x:wr(l,s)})):s&&r.push(r.pop()+"rotate("+s+")"),f!=h?u.push({i:r.push(r.pop()+"skewX(",null,")")-2,x:wr(f,h)}):h&&r.push(r.pop()+"skewX("+h+")"),g[0]!=p[0]||g[1]!=p[1]?(e=r.push(r.pop()+"scale(",null,",",null,")"),u.push({i:e-4,x:wr(g[0],p[0])},{i:e-2,x:wr(g[1],p[1])})):(1!=p[0]||1!=p[1])&&r.push(r.pop()+"scale("+p+")"),e=u.length,function(n){for(var t,i=-1;++i<e;)r[(t=u[i]).i]=t.x(n);return r.join("")}}function Wr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return(e-n)*t}}function Jr(n,t){return t=t-(n=+n)?1/(t-n):0,function(e){return Math.max(0,Math.min(1,(e-n)*t))}}function Gr(n){for(var t=n.source,e=n.target,r=Qr(t,e),u=[t];t!==r;)t=t.parent,u.push(t);for(var i=u.length;e!==r;)u.splice(i,0,e),e=e.parent;return u}function Kr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Qr(n,t){if(n===t)return n;for(var e=Kr(n),r=Kr(t),u=e.pop(),i=r.pop(),o=null;u===i;)o=u,u=e.pop(),i=r.pop();return o}function nu(n){n.fixed|=2}function tu(n){n.fixed&=-7}function eu(n){n.fixed|=4,n.px=n.x,n.py=n.y}function ru(n){n.fixed&=-5}function uu(n,t,e){var r=0,u=0;if(n.charge=0,!n.leaf)for(var i,o=n.nodes,a=o.length,c=-1;++c<a;)i=o[c],null!=i&&(uu(i,t,e),n.charge+=i.charge,r+=i.charge*i.cx,u+=i.charge*i.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var l=t*e[n.point.index];n.charge+=n.pointCharge=l,r+=l*n.point.x,u+=l*n.point.y}n.cx=r/n.charge,n.cy=u/n.charge}function iu(n,t){return mo.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=lu,n}function ou(n){return n.children}function au(n){return n.value}function cu(n,t){return t.value-n.value}function lu(n){return mo.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function su(n){return n.x}function fu(n){return n.y}function hu(n,t,e){n.y0=t,n.y=e}function gu(n){return mo.range(n.length)}function pu(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function du(n){for(var t,e=1,r=0,u=n[0][1],i=n.length;i>e;++e)(t=n[e][1])>u&&(r=e,u=t);return r}function vu(n){return n.reduce(mu,0)}function mu(n,t){return n+t[1]}function yu(n,t){return Mu(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function Mu(n,t){for(var e=-1,r=+n[0],u=(n[1]-r)/t,i=[];++e<=t;)i[e]=u*e+r;return i}function xu(n){return[mo.min(n),mo.max(n)]}function bu(n,t){return n.parent==t.parent?1:2}function _u(n){var t=n.children;return t&&t.length?t[0]:n._tree.thread}function wu(n){var t,e=n.children;return e&&(t=e.length)?e[t-1]:n._tree.thread}function Su(n,t){var e=n.children;if(e&&(u=e.length))for(var r,u,i=-1;++i<u;)t(r=Su(e[i],t),n)>0&&(n=r);return n}function Eu(n,t){return n.x-t.x}function ku(n,t){return t.x-n.x}function Au(n,t){return n.depth-t.depth}function Nu(n,t){function e(n,r){var u=n.children;if(u&&(o=u.length))for(var i,o,a=null,c=-1;++c<o;)i=u[c],e(i,a),a=i;t(n,r)}e(n,null)}function Tu(n){for(var t,e=0,r=0,u=n.children,i=u.length;--i>=0;)t=u[i]._tree,t.prelim+=e,t.mod+=e,e+=t.shift+(r+=t.change)}function qu(n,t,e){n=n._tree,t=t._tree;var r=e/(t.number-n.number);n.change+=r,t.change-=r,t.shift+=e,t.prelim+=e,t.mod+=e}function zu(n,t,e){return n._tree.ancestor.parent==t.parent?n._tree.ancestor:e}function Cu(n,t){return n.value-t.value}function Du(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function ju(n,t){n._pack_next=t,t._pack_prev=n}function Lu(n,t){var e=t.x-n.x,r=t.y-n.y,u=n.r+t.r;return.999*u*u>e*e+r*r}function Hu(n){function t(n){s=Math.min(n.x-n.r,s),f=Math.max(n.x+n.r,f),h=Math.min(n.y-n.r,h),g=Math.max(n.y+n.r,g)}if((e=n.children)&&(l=e.length)){var e,r,u,i,o,a,c,l,s=1/0,f=-1/0,h=1/0,g=-1/0;if(e.forEach(Fu),r=e[0],r.x=-r.r,r.y=0,t(r),l>1&&(u=e[1],u.x=u.r,u.y=0,t(u),l>2))for(i=e[2],Ru(r,u,i),t(i),Du(r,i),r._pack_prev=i,Du(i,u),u=r._pack_next,o=3;l>o;o++){Ru(r,u,i=e[o]);var p=0,d=1,v=1;for(a=u._pack_next;a!==u;a=a._pack_next,d++)if(Lu(a,i)){p=1;break}if(1==p)for(c=r._pack_prev;c!==a._pack_prev&&!Lu(c,i);c=c._pack_prev,v++);p?(v>d||d==v&&u.r<r.r?ju(r,u=a):ju(r=c,u),o--):(Du(r,i),u=i,t(i))}var m=(s+f)/2,y=(h+g)/2,M=0;for(o=0;l>o;o++)i=e[o],i.x-=m,i.y-=y,M=Math.max(M,i.r+Math.sqrt(i.x*i.x+i.y*i.y));n.r=M,e.forEach(Pu)}}function Fu(n){n._pack_next=n._pack_prev=n}function Pu(n){delete n._pack_next,delete n._pack_prev}function Ou(n,t,e,r){var u=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,u)for(var i=-1,o=u.length;++i<o;)Ou(u[i],t,e,r)}function Ru(n,t,e){var r=n.r+e.r,u=t.x-n.x,i=t.y-n.y;if(r&&(u||i)){var o=t.r+e.r,a=u*u+i*i;o*=o,r*=r;var c=.5+(r-o)/(2*a),l=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+c*u+l*i,e.y=n.y+c*i-l*u}else e.x=n.x+r,e.y=n.y}function Yu(n){return 1+mo.max(n,function(n){return n.y})}function Iu(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Uu(n){var t=n.children;return t&&t.length?Uu(t[0]):n}function Zu(n){var t,e=n.children;return e&&(t=e.length)?Zu(e[t-1]):n}function Vu(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Xu(n,t){var e=n.x+t[3],r=n.y+t[0],u=n.dx-t[1]-t[3],i=n.dy-t[0]-t[2];return 0>u&&(e+=u/2,u=0),0>i&&(r+=i/2,i=0),{x:e,y:r,dx:u,dy:i}}function $u(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Bu(n){return n.rangeExtent?n.rangeExtent():$u(n.range())}function Wu(n,t,e,r){var u=e(n[0],n[1]),i=r(t[0],t[1]);return function(n){return i(u(n))}}function Ju(n,t){var e,r=0,u=n.length-1,i=n[r],o=n[u];return i>o&&(e=r,r=u,u=e,e=i,i=o,o=e),n[r]=t.floor(i),n[u]=t.ceil(o),n}function Gu(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:Nc}function Ku(n,t,e,r){var u=[],i=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)u.push(e(n[o-1],n[o])),i.push(r(t[o-1],t[o]));return function(t){var e=mo.bisect(n,t,1,a)-1;return i[e](u[e](t))}}function Qu(n,t,e,r){function u(){var u=Math.min(n.length,t.length)>2?Ku:Wu,c=r?Jr:Wr;return o=u(n,t,c,e),a=u(t,n,c,Er),i}function i(n){return o(n)}var o,a;return i.invert=function(n){return a(n)},i.domain=function(t){return arguments.length?(n=t.map(Number),u()):n},i.range=function(n){return arguments.length?(t=n,u()):t},i.rangeRound=function(n){return i.range(n).interpolate(Ur)},i.clamp=function(n){return arguments.length?(r=n,u()):r},i.interpolate=function(n){return arguments.length?(e=n,u()):e},i.ticks=function(t){return ri(n,t)},i.tickFormat=function(t,e){return ui(n,t,e)},i.nice=function(t){return ti(n,t),u()},i.copy=function(){return Qu(n,t,e,r)},u()}function ni(n,t){return mo.rebind(n,t,"range","rangeRound","interpolate","clamp")}function ti(n,t){return Ju(n,Gu(ei(n,t)[2]))}function ei(n,t){null==t&&(t=10);var e=$u(n),r=e[1]-e[0],u=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),i=t/r*u;return.15>=i?u*=10:.35>=i?u*=5:.75>=i&&(u*=2),e[0]=Math.ceil(e[0]/u)*u,e[1]=Math.floor(e[1]/u)*u+.5*u,e[2]=u,e}function ri(n,t){return mo.range.apply(mo,ei(n,t))}function ui(n,t,e){var r=-Math.floor(Math.log(ei(n,t)[2])/Math.LN10+.01);return mo.format(e?e.replace(Ea,function(n,t,e,u,i,o,a,c,l,s){return[t,e,u,i,o,a,c,l||"."+(r-2*("%"===s)),s].join("")}):",."+r+"f")}function ii(n,t,e,r){function u(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function i(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(u(t))}return o.invert=function(t){return i(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(u)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(u)),o):t},o.nice=function(){var t=Ju(r.map(u),e?Math:qc);return n.domain(t),r=t.map(i),o},o.ticks=function(){var n=$u(r),o=[],a=n[0],c=n[1],l=Math.floor(u(a)),s=Math.ceil(u(c)),f=t%1?2:t;if(isFinite(s-l)){if(e){for(;s>l;l++)for(var h=1;f>h;h++)o.push(i(l)*h);o.push(i(l))}else for(o.push(i(l));l++<s;)for(var h=f-1;h>0;h--)o.push(i(l)*h);for(l=0;o[l]<a;l++);for(s=o.length;o[s-1]>c;s--);o=o.slice(l,s)}return o},o.tickFormat=function(n,t){if(!arguments.length)return Tc;arguments.length<2?t=Tc:"function"!=typeof t&&(t=mo.format(t));var r,a=Math.max(.1,n/o.ticks().length),c=e?(r=1e-12,Math.ceil):(r=-1e-12,Math.floor);return function(n){return n/i(c(u(n)+r))<=a?t(n):""}},o.copy=function(){return ii(n.copy(),t,e,r)},ni(o,n)}function oi(n,t,e){function r(t){return n(u(t))}var u=ai(t),i=ai(1/t);return r.invert=function(t){return i(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(u)),r):e},r.ticks=function(n){return ri(e,n)},r.tickFormat=function(n,t){return ui(e,n,t)},r.nice=function(n){return r.domain(ti(e,n))},r.exponent=function(o){return arguments.length?(u=ai(t=o),i=ai(1/t),n.domain(e.map(u)),r):t},r.copy=function(){return oi(n.copy(),t,e)},ni(r,n)}function ai(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function ci(n,t){function e(t){return o[((i.get(t)||i.set(t,n.push(t)))-1)%o.length]}function r(t,e){return mo.range(n.length).map(function(n){return t+e*n})}var i,o,a;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new u;for(var o,a=-1,c=r.length;++a<c;)i.has(o=r[a])||i.set(o,n.push(o));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(o=n,a=0,t={t:"range",a:arguments},e):o},e.rangePoints=function(u,i){arguments.length<2&&(i=0);var c=u[0],l=u[1],s=(l-c)/(Math.max(1,n.length-1)+i);return o=r(n.length<2?(c+l)/2:c+s*i/2,s),a=0,t={t:"rangePoints",a:arguments},e},e.rangeBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var l=u[1]<u[0],s=u[l-0],f=u[1-l],h=(f-s)/(n.length-i+2*c);return o=r(s+h*c,h),l&&o.reverse(),a=h*(1-i),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(u,i,c){arguments.length<2&&(i=0),arguments.length<3&&(c=i);var l=u[1]<u[0],s=u[l-0],f=u[1-l],h=Math.floor((f-s)/(n.length-i+2*c)),g=f-s-(n.length-i)*h;return o=r(s+Math.round(g/2),h),l&&o.reverse(),a=Math.round(h*(1-i)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return a},e.rangeExtent=function(){return $u(t.a[0])},e.copy=function(){return ci(n,t)},e.domain(n)}function li(n,t){function e(){var e=0,i=t.length;for(u=[];++e<i;)u[e-1]=mo.quantile(n,e/i);return r}function r(n){return isNaN(n=+n)?void 0:t[mo.bisect(u,n)]}var u;return r.domain=function(t){return arguments.length?(n=t.filter(function(n){return!isNaN(n)}).sort(mo.ascending),e()):n},r.range=function(n){return arguments.length?(t=n,e()):t},r.quantiles=function(){return u},r.invertExtent=function(e){return e=t.indexOf(e),0>e?[0/0,0/0]:[e>0?u[e-1]:n[0],e<u.length?u[e]:n[n.length-1]]},r.copy=function(){return li(n,t)},e()}function si(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(i*(t-n))))]}function u(){return i=e.length/(t-n),o=e.length-1,r}var i,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],u()):[n,t]},r.range=function(n){return arguments.length?(e=n,u()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?0/0:t/i+n,[t,t+1/i]},r.copy=function(){return si(n,t,e)},u()}function fi(n,t){function e(e){return e>=e?t[mo.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return fi(n,t)},e}function hi(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return ri(n,t)},t.tickFormat=function(t,e){return ui(n,t,e)},t.copy=function(){return hi(n)},t}function gi(n){return n.innerRadius}function pi(n){return n.outerRadius}function di(n){return n.startAngle}function vi(n){return n.endAngle}function mi(n){for(var t,e,r,u=-1,i=n.length;++u<i;)t=n[u],e=t[0],r=t[1]+Lc,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function yi(n){function t(t){function c(){d.push("M",a(n(m),f),s,l(n(v.reverse()),f),"Z")}for(var h,g,p,d=[],v=[],m=[],y=-1,M=t.length,x=pt(e),b=pt(u),_=e===r?function(){return g}:pt(r),w=u===i?function(){return p}:pt(i);++y<M;)o.call(this,h=t[y],y)?(v.push([g=+x.call(this,h,y),p=+b.call(this,h,y)]),m.push([+_.call(this,h,y),+w.call(this,h,y)])):v.length&&(c(),v=[],m=[]);return v.length&&c(),d.length?d.join(""):null}var e=Ze,r=Ze,u=0,i=Ve,o=Vt,a=Xe,c=a.key,l=a,s="L",f=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(u=i=n,t):i},t.y0=function(n){return arguments.length?(u=n,t):u},t.y1=function(n){return arguments.length?(i=n,t):i},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(c="function"==typeof n?a=n:(a=hc.get(n)||Xe).key,l=a.reverse||a,s=a.closed?"M":"L",t):c},t.tension=function(n){return arguments.length?(f=n,t):f},t}function Mi(n){return n.radius}function xi(n){return[n.x,n.y]}function bi(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]+Lc;return[e*Math.cos(r),e*Math.sin(r)]}}function _i(){return 64}function wi(){return"circle"}function Si(n){var t=Math.sqrt(n/Bo);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Ei(n,t){return Lo(n,Ic),n.id=t,n}function ki(n,t,e,r){var u=n.id;return N(n,"function"==typeof e?function(n,i,o){n.__transition__[u].tween.set(t,r(e.call(n,n.__data__,i,o)))}:(e=r(e),function(n){n.__transition__[u].tween.set(t,e)}))}function Ai(n){return null==n&&(n=""),function(){this.textContent=n}}function Ni(n,t,e,r){var i=n.__transition__||(n.__transition__={active:0,count:0}),o=i[e];if(!o){var a=r.time;o=i[e]={tween:new u,time:a,ease:r.ease,delay:r.delay,duration:r.duration},++i.count,mo.timer(function(r){function u(r){return i.active>e?l():(i.active=e,o.event&&o.event.start.call(n,s,t),o.tween.forEach(function(e,r){(r=r.call(n,s,t))&&p.push(r)}),c(r)?1:(xt(c,0,a),void 0))}function c(r){if(i.active!==e)return l();for(var u=(r-h)/g,a=f(u),c=p.length;c>0;)p[--c].call(n,a);return u>=1?(o.event&&o.event.end.call(n,s,t),l()):void 0}function l(){return--i.count?delete i[e]:delete n.__transition__,1}var s=n.__data__,f=o.ease,h=o.delay,g=o.duration,p=[];return r>=h?u(r):(xt(u,h,a),void 0)},0,a)}}function Ti(n,t){n.attr("transform",function(n){return"translate("+t(n)+",0)"})}function qi(n,t){n.attr("transform",function(n){return"translate(0,"+t(n)+")"})}function zi(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function Ci(n,t,e){function r(t){var e=n(t),r=i(e,1);return r-t>t-e?e:r}function u(e){return t(e=n(new Wc(e-1)),1),e}function i(n,e){return t(n=new Wc(+n),e),n}function o(n,r,i){var o=u(n),a=[];if(i>1)for(;r>o;)e(o)%i||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{Wc=zi;var r=new zi;return r._=n,o(r,t,e)}finally{Wc=Date}}n.floor=n,n.round=r,n.ceil=u,n.offset=i,n.range=o;var c=n.utc=Di(n);return c.floor=c,c.round=Di(r),c.ceil=Di(u),c.offset=Di(i),c.range=a,n}function Di(n){return function(t,e){try{Wc=zi;var r=new zi;return r._=t,n(r,e)._}finally{Wc=Date}}}function ji(n){function t(t){for(var r,u,i,o=[],a=-1,c=0;++a<e;)37===n.charCodeAt(a)&&(o.push(n.substring(c,a)),null!=(u=pl[r=n.charAt(++a)])&&(r=n.charAt(++a)),(i=dl[r])&&(r=i(t,null==u?"e"===r?" ":"0":u)),o.push(r),c=a+1);return o.push(n.substring(c,a)),o.join("")}var e=n.length;return t.parse=function(t){var e={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},r=Li(e,n,t,0);if(r!=t.length)return null;"p"in e&&(e.H=e.H%12+12*e.p);var u=null!=e.Z&&Wc!==zi,i=new(u?zi:Wc);return"j"in e?i.setFullYear(e.y,0,e.j):"w"in e&&("W"in e||"U"in e)?(i.setFullYear(e.y,0,1),i.setFullYear(e.y,0,"W"in e?(e.w+6)%7+7*e.W-(i.getDay()+5)%7:e.w+7*e.U-(i.getDay()+6)%7)):i.setFullYear(e.y,e.m,e.d),i.setHours(e.H+Math.floor(e.Z/100),e.M+e.Z%100,e.S,e.L),u?i._:i},t.toString=function(){return n},t}function Li(n,t,e,r){for(var u,i,o,a=0,c=t.length,l=e.length;c>a;){if(r>=l)return-1;if(u=t.charCodeAt(a++),37===u){if(o=t.charAt(a++),i=vl[o in pl?t.charAt(a++):o],!i||(r=i(n,e,r))<0)return-1}else if(u!=e.charCodeAt(r++))return-1}return r}function Hi(n){return new RegExp("^(?:"+n.map(mo.requote).join("|")+")","i")}function Fi(n){for(var t=new u,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function Pi(n,t,e){var r=0>n?"-":"",u=(r?-n:n)+"",i=u.length;return r+(e>i?new Array(e-i+1).join(t)+u:u)}function Oi(n,t,e){al.lastIndex=0;var r=al.exec(t.substring(e));return r?(n.w=cl.get(r[0].toLowerCase()),e+r[0].length):-1}function Ri(n,t,e){il.lastIndex=0;var r=il.exec(t.substring(e));return r?(n.w=ol.get(r[0].toLowerCase()),e+r[0].length):-1}function Yi(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Ii(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e));return r?(n.U=+r[0],e+r[0].length):-1}function Ui(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e));return r?(n.W=+r[0],e+r[0].length):-1}function Zi(n,t,e){fl.lastIndex=0;var r=fl.exec(t.substring(e));return r?(n.m=hl.get(r[0].toLowerCase()),e+r[0].length):-1}function Vi(n,t,e){ll.lastIndex=0;var r=ll.exec(t.substring(e));return r?(n.m=sl.get(r[0].toLowerCase()),e+r[0].length):-1}function Xi(n,t,e){return Li(n,dl.c.toString(),t,e)}function $i(n,t,e){return Li(n,dl.x.toString(),t,e)}function Bi(n,t,e){return Li(n,dl.X.toString(),t,e)}function Wi(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Ji(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+2));return r?(n.y=Ki(+r[0]),e+r[0].length):-1}function Gi(n,t,e){return/^[+-]\d{4}$/.test(t=t.substring(e,e+5))?(n.Z=+t,e+5):-1}function Ki(n){return n+(n>68?1900:2e3)}function Qi(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function no(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function to(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function eo(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function ro(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function uo(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function io(n,t,e){ml.lastIndex=0;var r=ml.exec(t.substring(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function oo(n,t,e){var r=yl.get(t.substring(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}function ao(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=~~(Math.abs(t)/60),u=Math.abs(t)%60;return e+Pi(r,"0",2)+Pi(u,"0",2)}function co(n,t,e){gl.lastIndex=0;var r=gl.exec(t.substring(e,e+1));return r?e+r[0].length:-1}function lo(n){function t(n){try{Wc=zi;var t=new Wc;return t._=n,e(t)}finally{Wc=Date}}var e=ji(n);return t.parse=function(n){try{Wc=zi;var t=e.parse(n);return t&&t._}finally{Wc=Date}},t.toString=e.toString,t}function so(n){return n.toISOString()}function fo(n,t,e){function r(t){return n(t)}function u(n,e){var r=n[1]-n[0],u=r/e,i=mo.bisect(xl,u);return i==xl.length?[t.year,ei(n.map(function(n){return n/31536e6}),e)[2]]:i?t[u/xl[i-1]<xl[i]/u?i-1:i]:[Sl,ei(n,e)[2]]}return r.invert=function(t){return ho(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(ho)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,ho(+e+1),t).length}var i=r.domain(),o=$u(i),a=null==n?u(o,10):"number"==typeof n&&u(o,n);return a&&(n=a[0],t=a[1]),r.domain(Ju(i,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=ho(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=ho(+t+1);return t}}:n))},r.ticks=function(n,t){var e=$u(r.domain()),i=null==n?u(e,10):"number"==typeof n?u(e,n):!n.range&&[{range:n},t];return i&&(n=i[0],t=i[1]),n.range(e[0],ho(+e[1]+1),t)},r.tickFormat=function(){return e},r.copy=function(){return fo(n.copy(),t,e)},ni(r,n)}function ho(n){return new Date(n)}function go(n){return function(t){for(var e=n.length-1,r=n[e];!r[1](t);)r=n[--e];return r[0](t)}}function po(n){return JSON.parse(n.responseText)}function vo(n){var t=xo.createRange();return t.selectNode(xo.body),t.createContextualFragment(n.responseText)}var mo={version:"3.3.3"};Date.now||(Date.now=function(){return+new Date});var yo=[].slice,Mo=function(n){return yo.call(n)},xo=document,bo=xo.documentElement,_o=window;try{Mo(bo.childNodes)[0].nodeType}catch(wo){Mo=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}try{xo.createElement("div").style.setProperty("opacity",0,"")}catch(So){var Eo=_o.Element.prototype,ko=Eo.setAttribute,Ao=Eo.setAttributeNS,No=_o.CSSStyleDeclaration.prototype,To=No.setProperty;Eo.setAttribute=function(n,t){ko.call(this,n,t+"")},Eo.setAttributeNS=function(n,t,e){Ao.call(this,n,t,e+"")},No.setProperty=function(n,t,e){To.call(this,n,t+"",e)}}mo.ascending=function(n,t){return t>n?-1:n>t?1:n>=t?0:0/0},mo.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:0/0},mo.min=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&e>r&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&e>r&&(e=r)}return e},mo.max=function(n,t){var e,r,u=-1,i=n.length;if(1===arguments.length){for(;++u<i&&!(null!=(e=n[u])&&e>=e);)e=void 0;for(;++u<i;)null!=(r=n[u])&&r>e&&(e=r)}else{for(;++u<i&&!(null!=(e=t.call(n,n[u],u))&&e>=e);)e=void 0;for(;++u<i;)null!=(r=t.call(n,n[u],u))&&r>e&&(e=r)}return e},mo.extent=function(n,t){var e,r,u,i=-1,o=n.length;if(1===arguments.length){for(;++i<o&&!(null!=(e=u=n[i])&&e>=e);)e=u=void 0;for(;++i<o;)null!=(r=n[i])&&(e>r&&(e=r),r>u&&(u=r))}else{for(;++i<o&&!(null!=(e=u=t.call(n,n[i],i))&&e>=e);)e=void 0;for(;++i<o;)null!=(r=t.call(n,n[i],i))&&(e>r&&(e=r),r>u&&(u=r))}return[e,u]},mo.sum=function(n,t){var e,r=0,u=n.length,i=-1;if(1===arguments.length)for(;++i<u;)isNaN(e=+n[i])||(r+=e);else for(;++i<u;)isNaN(e=+t.call(n,n[i],i))||(r+=e);return r},mo.mean=function(t,e){var r,u=t.length,i=0,o=-1,a=0;if(1===arguments.length)for(;++o<u;)n(r=t[o])&&(i+=(r-i)/++a);else for(;++o<u;)n(r=e.call(t,t[o],o))&&(i+=(r-i)/++a);return a?i:void 0},mo.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),u=+n[r-1],i=e-r;return i?u+i*(n[r]-u):u},mo.median=function(t,e){return arguments.length>1&&(t=t.map(e)),t=t.filter(n),t.length?mo.quantile(t.sort(mo.ascending),.5):void 0},mo.bisector=function(n){return{left:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;n.call(t,t[i],i)<e?r=i+1:u=i}return r},right:function(t,e,r,u){for(arguments.length<3&&(r=0),arguments.length<4&&(u=t.length);u>r;){var i=r+u>>>1;e<n.call(t,t[i],i)?u=i:r=i+1}return r}}};var qo=mo.bisector(function(n){return n});mo.bisectLeft=qo.left,mo.bisect=mo.bisectRight=qo.right,mo.shuffle=function(n){for(var t,e,r=n.length;r;)e=0|Math.random()*r--,t=n[r],n[r]=n[e],n[e]=t;return n},mo.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},mo.pairs=function(n){for(var t,e=0,r=n.length-1,u=n[0],i=new Array(0>r?0:r);r>e;)i[e]=[t=u,u=n[++e]];return i},mo.zip=function(){if(!(u=arguments.length))return[];for(var n=-1,e=mo.min(arguments,t),r=new Array(e);++n<e;)for(var u,i=-1,o=r[n]=new Array(u);++i<u;)o[i]=arguments[i][n];return r},mo.transpose=function(n){return mo.zip.apply(mo,n)},mo.keys=function(n){var t=[];for(var e in n)t.push(e);return t},mo.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},mo.entries=function(n){var t=[];
	    for(var e in n)t.push({key:e,value:n[e]});return t},mo.merge=function(n){return Array.prototype.concat.apply([],n)},mo.range=function(n,t,r){if(arguments.length<3&&(r=1,arguments.length<2&&(t=n,n=0)),1/0===(t-n)/r)throw new Error("infinite range");var u,i=[],o=e(Math.abs(r)),a=-1;if(n*=o,t*=o,r*=o,0>r)for(;(u=n+r*++a)>t;)i.push(u/o);else for(;(u=n+r*++a)<t;)i.push(u/o);return i},mo.map=function(n){var t=new u;if(n instanceof u)n.forEach(function(n,e){t.set(n,e)});else for(var e in n)t.set(e,n[e]);return t},r(u,{has:function(n){return zo+n in this},get:function(n){return this[zo+n]},set:function(n,t){return this[zo+n]=t},remove:function(n){return n=zo+n,n in this&&delete this[n]},keys:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},values:function(){var n=[];return this.forEach(function(t,e){n.push(e)}),n},entries:function(){var n=[];return this.forEach(function(t,e){n.push({key:t,value:e})}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===Co&&n.call(this,t.substring(1),this[t])}});var zo="\0",Co=zo.charCodeAt(0);mo.nest=function(){function n(t,a,c){if(c>=o.length)return r?r.call(i,a):e?a.sort(e):a;for(var l,s,f,h,g=-1,p=a.length,d=o[c++],v=new u;++g<p;)(h=v.get(l=d(s=a[g])))?h.push(s):v.set(l,[s]);return t?(s=t(),f=function(e,r){s.set(e,n(t,r,c))}):(s={},f=function(e,r){s[e]=n(t,r,c)}),v.forEach(f),s}function t(n,e){if(e>=o.length)return n;var r=[],u=a[e++];return n.forEach(function(n,u){r.push({key:n,values:t(u,e)})}),u?r.sort(function(n,t){return u(n.key,t.key)}):r}var e,r,i={},o=[],a=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(mo.map,e,0),0)},i.key=function(n){return o.push(n),i},i.sortKeys=function(n){return a[o.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},mo.set=function(n){var t=new i;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},r(i,{has:function(n){return zo+n in this},add:function(n){return this[zo+n]=!0,n},remove:function(n){return n=zo+n,n in this&&delete this[n]},values:function(){var n=[];return this.forEach(function(t){n.push(t)}),n},forEach:function(n){for(var t in this)t.charCodeAt(0)===Co&&n.call(this,t.substring(1))}}),mo.behavior={},mo.rebind=function(n,t){for(var e,r=1,u=arguments.length;++r<u;)n[e=arguments[r]]=o(n,t,t[e]);return n};var Do=["webkit","ms","moz","Moz","o","O"];mo.dispatch=function(){for(var n=new l,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=s(n);return n},l.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.substring(e+1),n=n.substring(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},mo.event=null,mo.requote=function(n){return n.replace(jo,"\\$&")};var jo=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,Lo={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},Ho=function(n,t){return t.querySelector(n)},Fo=function(n,t){return t.querySelectorAll(n)},Po=bo[a(bo,"matchesSelector")],Oo=function(n,t){return Po.call(n,t)};"function"==typeof Sizzle&&(Ho=function(n,t){return Sizzle(n,t)[0]||null},Fo=function(n,t){return Sizzle.uniqueSort(Sizzle(n,t))},Oo=Sizzle.matchesSelector),mo.selection=function(){return Uo};var Ro=mo.selection.prototype=[];Ro.select=function(n){var t,e,r,u,i=[];n=d(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var c=-1,l=r.length;++c<l;)(u=r[c])?(t.push(e=n.call(u,u.__data__,c,o)),e&&"__data__"in u&&(e.__data__=u.__data__)):t.push(null)}return p(i)},Ro.selectAll=function(n){var t,e,r=[];n=v(n);for(var u=-1,i=this.length;++u<i;)for(var o=this[u],a=-1,c=o.length;++a<c;)(e=o[a])&&(r.push(t=Mo(n.call(e,e.__data__,a,u))),t.parentNode=e);return p(r)};var Yo={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};mo.ns={prefix:Yo,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&(e=n.substring(0,t),n=n.substring(t+1)),Yo.hasOwnProperty(e)?{space:Yo[e],local:n}:n}},Ro.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=mo.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(m(t,n[t]));return this}return this.each(m(n,t))},Ro.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=n.trim().split(/^|\s+/g)).length,u=-1;if(t=e.classList){for(;++u<r;)if(!t.contains(n[u]))return!1}else for(t=e.getAttribute("class");++u<r;)if(!M(n[u]).test(t))return!1;return!0}for(t in n)this.each(x(t,n[t]));return this}return this.each(x(n,t))},Ro.style=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t="");for(e in n)this.each(_(e,n[e],t));return this}if(2>r)return _o.getComputedStyle(this.node(),null).getPropertyValue(n);e=""}return this.each(_(n,t,e))},Ro.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(w(t,n[t]));return this}return this.each(w(n,t))},Ro.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},Ro.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},Ro.append=function(n){return n=S(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},Ro.insert=function(n,t){return n=S(n),t=d(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments))})},Ro.remove=function(){return this.each(function(){var n=this.parentNode;n&&n.removeChild(this)})},Ro.data=function(n,t){function e(n,e){var r,i,o,a=n.length,f=e.length,h=Math.min(a,f),g=new Array(f),p=new Array(f),d=new Array(a);if(t){var v,m=new u,y=new u,M=[];for(r=-1;++r<a;)v=t.call(i=n[r],i.__data__,r),m.has(v)?d[r]=i:m.set(v,i),M.push(v);for(r=-1;++r<f;)v=t.call(e,o=e[r],r),(i=m.get(v))?(g[r]=i,i.__data__=o):y.has(v)||(p[r]=E(o)),y.set(v,o),m.remove(v);for(r=-1;++r<a;)m.has(M[r])&&(d[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],o=e[r],i?(i.__data__=o,g[r]=i):p[r]=E(o);for(;f>r;++r)p[r]=E(e[r]);for(;a>r;++r)d[r]=n[r]}p.update=g,p.parentNode=g.parentNode=d.parentNode=n.parentNode,c.push(p),l.push(g),s.push(d)}var r,i,o=-1,a=this.length;if(!arguments.length){for(n=new Array(a=(r=this[0]).length);++o<a;)(i=r[o])&&(n[o]=i.__data__);return n}var c=T([]),l=p([]),s=p([]);if("function"==typeof n)for(;++o<a;)e(r=this[o],n.call(r,r.parentNode.__data__,o));else for(;++o<a;)e(r=this[o],n);return l.enter=function(){return c},l.exit=function(){return s},l},Ro.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},Ro.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=k(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]),t.parentNode=(e=this[i]).parentNode;for(var a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a)&&t.push(r)}return p(u)},Ro.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],u=r.length-1,i=r[u];--u>=0;)(e=r[u])&&(i&&i!==e.nextSibling&&i.parentNode.insertBefore(e,i),i=e);return this},Ro.sort=function(n){n=A.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},Ro.each=function(n){return N(this,function(t,e,r){n.call(t,t.__data__,e,r)})},Ro.call=function(n){var t=Mo(arguments);return n.apply(t[0]=this,t),this},Ro.empty=function(){return!this.node()},Ro.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,u=e.length;u>r;r++){var i=e[r];if(i)return i}return null},Ro.size=function(){var n=0;return this.each(function(){++n}),n};var Io=[];mo.selection.enter=T,mo.selection.enter.prototype=Io,Io.append=Ro.append,Io.empty=Ro.empty,Io.node=Ro.node,Io.call=Ro.call,Io.size=Ro.size,Io.select=function(n){for(var t,e,r,u,i,o=[],a=-1,c=this.length;++a<c;){r=(u=this[a]).update,o.push(t=[]),t.parentNode=u.parentNode;for(var l=-1,s=u.length;++l<s;)(i=u[l])?(t.push(r[l]=e=n.call(u.parentNode,i.__data__,l,a)),e.__data__=i.__data__):t.push(null)}return p(o)},Io.insert=function(n,t){return arguments.length<2&&(t=q(this)),Ro.insert.call(this,n,t)},Ro.transition=function(){for(var n,t,e=Pc||++Uc,r=[],u=Oc||{time:Date.now(),ease:Cr,delay:0,duration:250},i=-1,o=this.length;++i<o;){r.push(n=[]);for(var a=this[i],c=-1,l=a.length;++c<l;)(t=a[c])&&Ni(t,c,e,u),n.push(t)}return Ei(r,e)},Ro.interrupt=function(){return this.each(z)},mo.select=function(n){var t=["string"==typeof n?Ho(n,xo):n];return t.parentNode=bo,p([t])},mo.selectAll=function(n){var t=Mo("string"==typeof n?Fo(n,xo):n);return t.parentNode=bo,p([t])};var Uo=mo.select(bo);Ro.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(C(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(C(n,t,e))};var Zo=mo.map({mouseenter:"mouseover",mouseleave:"mouseout"});Zo.forEach(function(n){"on"+n in xo&&Zo.remove(n)});var Vo=a(bo.style,"userSelect"),Xo=0;mo.mouse=function(n){return H(n,h())};var $o=/WebKit/.test(_o.navigator.userAgent)?-1:0;mo.touches=function(n,t){return arguments.length<2&&(t=h().touches),t?Mo(t).map(function(t){var e=H(n,t);return e.identifier=t.identifier,e}):[]},mo.behavior.drag=function(){function n(){this.on("mousedown.drag",o).on("touchstart.drag",a)}function t(){return mo.event.changedTouches[0].identifier}function e(n,t){return mo.touches(n).filter(function(n){return n.identifier===t})[0]}function r(n,t,e,r){return function(){function o(){if(!s)return a();var n=t(s,g),e=n[0]-d[0],r=n[1]-d[1];v|=e|r,d=n,f({type:"drag",x:n[0]+c[0],y:n[1]+c[1],dx:e,dy:r})}function a(){m.on(e+"."+p,null).on(r+"."+p,null),y(v&&mo.event.target===h),f({type:"dragend"})}var c,l=this,s=l.parentNode,f=u.of(l,arguments),h=mo.event.target,g=n(),p=null==g?"drag":"drag-"+g,d=t(s,g),v=0,m=mo.select(_o).on(e+"."+p,o).on(r+"."+p,a),y=L();i?(c=i.apply(l,arguments),c=[c.x-d[0],c.y-d[1]]):c=[0,0],f({type:"dragstart"})}}var u=g(n,"drag","dragstart","dragend"),i=null,o=r(c,mo.mouse,"mousemove","mouseup"),a=r(t,e,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},mo.rebind(n,u,"on")};var Bo=Math.PI,Wo=1e-6,Jo=Wo*Wo,Go=Bo/180,Ko=180/Bo,Qo=Math.SQRT2,na=2,ta=4;mo.interpolateZoom=function(n,t){function e(n){var t=n*y;if(m){var e=Y(d),o=i/(na*h)*(e*I(Qo*t+d)-R(d));return[r+o*l,u+o*s,i*e/Y(Qo*t+d)]}return[r+n*l,u+n*s,i*Math.exp(Qo*t)]}var r=n[0],u=n[1],i=n[2],o=t[0],a=t[1],c=t[2],l=o-r,s=a-u,f=l*l+s*s,h=Math.sqrt(f),g=(c*c-i*i+ta*f)/(2*i*na*h),p=(c*c-i*i-ta*f)/(2*c*na*h),d=Math.log(Math.sqrt(g*g+1)-g),v=Math.log(Math.sqrt(p*p+1)-p),m=v-d,y=(m||Math.log(c/i))/Qo;return e.duration=1e3*y,e},mo.behavior.zoom=function(){function n(n){n.on(A,l).on(ua+".zoom",h).on(N,p).on("dblclick.zoom",d).on(q,s)}function t(n){return[(n[0]-S.x)/S.k,(n[1]-S.y)/S.k]}function e(n){return[n[0]*S.k+S.x,n[1]*S.k+S.y]}function r(n){S.k=Math.max(k[0],Math.min(k[1],n))}function u(n,t){t=e(t),S.x+=n[0]-t[0],S.y+=n[1]-t[1]}function i(){b&&b.domain(x.range().map(function(n){return(n-S.x)/S.k}).map(x.invert)),w&&w.domain(_.range().map(function(n){return(n-S.y)/S.k}).map(_.invert))}function o(n){n({type:"zoomstart"})}function a(n){i(),n({type:"zoom",scale:S.k,translate:[S.x,S.y]})}function c(n){n({type:"zoomend"})}function l(){function n(){s=1,u(mo.mouse(r),h),a(i)}function e(){f.on(N,_o===r?p:null).on(T,null),g(s&&mo.event.target===l),c(i)}var r=this,i=C.of(r,arguments),l=mo.event.target,s=0,f=mo.select(_o).on(N,n).on(T,e),h=t(mo.mouse(r)),g=L();z.call(r),o(i)}function s(){function n(){var n=mo.touches(p);return g=S.k,n.forEach(function(n){n.identifier in v&&(v[n.identifier]=t(n))}),n}function e(){for(var t=mo.event.changedTouches,e=0,i=t.length;i>e;++e)v[t[e].identifier]=null;var o=n(),c=Date.now();if(1===o.length){if(500>c-M){var l=o[0],s=v[l.identifier];r(2*S.k),u(l,s),f(),a(d)}M=c}else if(o.length>1){var l=o[0],h=o[1],g=l[0]-h[0],p=l[1]-h[1];m=g*g+p*p}}function i(){for(var n,t,e,i,o=mo.touches(p),c=0,l=o.length;l>c;++c,i=null)if(e=o[c],i=v[e.identifier]){if(t)break;n=e,t=i}if(i){var s=(s=e[0]-n[0])*s+(s=e[1]-n[1])*s,f=m&&Math.sqrt(s/m);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+i[0])/2,(t[1]+i[1])/2],r(f*g)}M=null,u(n,t),a(d)}function h(){if(mo.event.touches.length){for(var t=mo.event.changedTouches,e=0,r=t.length;r>e;++e)delete v[t[e].identifier];for(var u in v)return void n()}_.on(x,null).on(b,null),w.on(A,l).on(q,s),E(),c(d)}var g,p=this,d=C.of(p,arguments),v={},m=0,y=mo.event.changedTouches[0].identifier,x="touchmove.zoom-"+y,b="touchend.zoom-"+y,_=mo.select(_o).on(x,i).on(b,h),w=mo.select(p).on(A,null).on(q,e),E=L();z.call(p),e(),o(d)}function h(){var n=C.of(this,arguments);y?clearTimeout(y):(z.call(this),o(n)),y=setTimeout(function(){y=null,c(n)},50),f();var e=m||mo.mouse(this);v||(v=t(e)),r(Math.pow(2,.002*ea())*S.k),u(e,v),a(n)}function p(){v=null}function d(){var n=C.of(this,arguments),e=mo.mouse(this),i=t(e),l=Math.log(S.k)/Math.LN2;o(n),r(Math.pow(2,mo.event.shiftKey?Math.ceil(l)-1:Math.floor(l)+1)),u(e,i),a(n),c(n)}var v,m,y,M,x,b,_,w,S={x:0,y:0,k:1},E=[960,500],k=ra,A="mousedown.zoom",N="mousemove.zoom",T="mouseup.zoom",q="touchstart.zoom",C=g(n,"zoomstart","zoom","zoomend");return n.event=function(n){n.each(function(){var n=C.of(this,arguments),t=S;Pc?mo.select(this).transition().each("start.zoom",function(){S=this.__chart__||{x:0,y:0,k:1},o(n)}).tween("zoom:zoom",function(){var e=E[0],r=E[1],u=e/2,i=r/2,o=mo.interpolateZoom([(u-S.x)/S.k,(i-S.y)/S.k,e/S.k],[(u-t.x)/t.k,(i-t.y)/t.k,e/t.k]);return function(t){var r=o(t),c=e/r[2];this.__chart__=S={x:u-r[0]*c,y:i-r[1]*c,k:c},a(n)}}).each("end.zoom",function(){c(n)}):(this.__chart__=S,o(n),a(n),c(n))})},n.translate=function(t){return arguments.length?(S={x:+t[0],y:+t[1],k:S.k},i(),n):[S.x,S.y]},n.scale=function(t){return arguments.length?(S={x:S.x,y:S.y,k:+t},i(),n):S.k},n.scaleExtent=function(t){return arguments.length?(k=null==t?ra:[+t[0],+t[1]],n):k},n.center=function(t){return arguments.length?(m=t&&[+t[0],+t[1]],n):m},n.size=function(t){return arguments.length?(E=t&&[+t[0],+t[1]],n):E},n.x=function(t){return arguments.length?(b=t,x=t.copy(),S={x:0,y:0,k:1},n):b},n.y=function(t){return arguments.length?(w=t,_=t.copy(),S={x:0,y:0,k:1},n):w},mo.rebind(n,C,"on")};var ea,ra=[0,1/0],ua="onwheel"in xo?(ea=function(){return-mo.event.deltaY*(mo.event.deltaMode?120:1)},"wheel"):"onmousewheel"in xo?(ea=function(){return mo.event.wheelDelta},"mousewheel"):(ea=function(){return-mo.event.detail},"MozMousePixelScroll");Z.prototype.toString=function(){return this.rgb()+""},mo.hsl=function(n,t,e){return 1===arguments.length?n instanceof X?V(n.h,n.s,n.l):lt(""+n,st,V):V(+n,+t,+e)};var ia=X.prototype=new Z;ia.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),V(this.h,this.s,this.l/n)},ia.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),V(this.h,this.s,n*this.l)},ia.rgb=function(){return $(this.h,this.s,this.l)},mo.hcl=function(n,t,e){return 1===arguments.length?n instanceof W?B(n.h,n.c,n.l):n instanceof K?nt(n.l,n.a,n.b):nt((n=ft((n=mo.rgb(n)).r,n.g,n.b)).l,n.a,n.b):B(+n,+t,+e)};var oa=W.prototype=new Z;oa.brighter=function(n){return B(this.h,this.c,Math.min(100,this.l+aa*(arguments.length?n:1)))},oa.darker=function(n){return B(this.h,this.c,Math.max(0,this.l-aa*(arguments.length?n:1)))},oa.rgb=function(){return J(this.h,this.c,this.l).rgb()},mo.lab=function(n,t,e){return 1===arguments.length?n instanceof K?G(n.l,n.a,n.b):n instanceof W?J(n.l,n.c,n.h):ft((n=mo.rgb(n)).r,n.g,n.b):G(+n,+t,+e)};var aa=18,ca=.95047,la=1,sa=1.08883,fa=K.prototype=new Z;fa.brighter=function(n){return G(Math.min(100,this.l+aa*(arguments.length?n:1)),this.a,this.b)},fa.darker=function(n){return G(Math.max(0,this.l-aa*(arguments.length?n:1)),this.a,this.b)},fa.rgb=function(){return Q(this.l,this.a,this.b)},mo.rgb=function(n,t,e){return 1===arguments.length?n instanceof at?ot(n.r,n.g,n.b):lt(""+n,ot,$):ot(~~n,~~t,~~e)};var ha=at.prototype=new Z;ha.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,u=30;return t||e||r?(t&&u>t&&(t=u),e&&u>e&&(e=u),r&&u>r&&(r=u),ot(Math.min(255,~~(t/n)),Math.min(255,~~(e/n)),Math.min(255,~~(r/n)))):ot(u,u,u)},ha.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),ot(~~(n*this.r),~~(n*this.g),~~(n*this.b))},ha.hsl=function(){return st(this.r,this.g,this.b)},ha.toString=function(){return"#"+ct(this.r)+ct(this.g)+ct(this.b)};var ga=mo.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});ga.forEach(function(n,t){ga.set(n,ut(t))}),mo.functor=pt,mo.xhr=vt(dt),mo.dsv=function(n,t){function e(n,e,i){arguments.length<3&&(i=e,e=null);var o=mo.xhr(n,t,i);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:u(n)):e},o.row(e)}function r(n){return e.parse(n.responseText)}function u(n){return function(t){return e.parse(t.responseText,n)}}function o(t){return t.map(a).join(n)}function a(n){return c.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var c=new RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var u=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(u(n),e)}:u})},e.parseRows=function(n,t){function e(){if(s>=c)return o;if(u)return u=!1,i;var t=s;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}s=e+2;var r=n.charCodeAt(e+1);return 13===r?(u=!0,10===n.charCodeAt(e+2)&&++s):10===r&&(u=!0),n.substring(t+1,e).replace(/""/g,'"')}for(;c>s;){var r=n.charCodeAt(s++),a=1;if(10===r)u=!0;else if(13===r)u=!0,10===n.charCodeAt(s)&&(++s,++a);else if(r!==l)continue;return n.substring(t,s-a)}return n.substring(t)}for(var r,u,i={},o={},a=[],c=n.length,s=0,f=0;(r=e())!==o;){for(var h=[];r!==i&&r!==o;)h.push(r),r=e();(!t||(h=t(h,f++)))&&a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new i,u=[];return t.forEach(function(n){for(var t in n)r.has(t)||u.push(r.add(t))}),[u.map(a).join(n)].concat(t.map(function(t){return u.map(function(n){return a(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(o).join("\n")},e},mo.csv=mo.dsv(",","text/csv"),mo.tsv=mo.dsv(" ","text/tab-separated-values");var pa,da,va,ma,ya,Ma=_o[a(_o,"requestAnimationFrame")]||function(n){setTimeout(n,17)};mo.timer=function(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var u=e+t,i={callback:n,time:u,next:null};da?da.next=i:pa=i,da=i,va||(ma=clearTimeout(ma),va=1,Ma(Mt))},mo.timer.flush=function(){bt(),_t()};var xa=".",ba=",",_a=[3,3],wa="$",Sa=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(wt);mo.formatPrefix=function(n,t){var e=0;return n&&(0>n&&(n*=-1),t&&(n=mo.round(n,St(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((0>=e?e+1:e-1)/3)))),Sa[8+e/3]},mo.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)},mo.format=function(n){var t=Ea.exec(n),e=t[1]||" ",r=t[2]||">",u=t[3]||"",i=t[4]||"",o=t[5],a=+t[6],c=t[7],l=t[8],s=t[9],f=1,h="",g=!1;switch(l&&(l=+l.substring(1)),(o||"0"===e&&"="===r)&&(o=e="0",r="=",c&&(a-=Math.floor((a-1)/4))),s){case"n":c=!0,s="g";break;case"%":f=100,h="%",s="f";break;case"p":f=100,h="%",s="r";break;case"b":case"o":case"x":case"X":"#"===i&&(i="0"+s.toLowerCase());case"c":case"d":g=!0,l=0;break;case"s":f=-1,s="r"}"#"===i?i="":"$"===i&&(i=wa),"r"!=s||l||(s="g"),null!=l&&("g"==s?l=Math.max(1,Math.min(21,l)):("e"==s||"f"==s)&&(l=Math.max(0,Math.min(20,l)))),s=ka.get(s)||Et;var p=o&&c;return function(n){if(g&&n%1)return"";var t=0>n||0===n&&0>1/n?(n=-n,"-"):u;if(0>f){var d=mo.formatPrefix(n,l);n=d.scale(n),h=d.symbol}else n*=f;n=s(n,l);var v=n.lastIndexOf("."),m=0>v?n:n.substring(0,v),y=0>v?"":xa+n.substring(v+1);!o&&c&&(m=Aa(m));var M=i.length+m.length+y.length+(p?0:t.length),x=a>M?new Array(M=a-M+1).join(e):"";return p&&(m=Aa(x+m)),t+=i,n=m+y,("<"===r?t+n+x:">"===r?x+t+n:"^"===r?x.substring(0,M>>=1)+t+n+x.substring(M):t+(p?n:x+n))+h}};var Ea=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,ka=mo.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=mo.round(n,St(n,t))).toFixed(Math.max(0,Math.min(20,St(n*(1+1e-15),t))))}}),Aa=dt;if(_a){var Na=_a.length;Aa=function(n){for(var t=n.length,e=[],r=0,u=_a[0];t>0&&u>0;)e.push(n.substring(t-=u,t+u)),u=_a[r=(r+1)%Na];return e.reverse().join(ba)}}mo.geo={},kt.prototype={s:0,t:0,add:function(n){At(n,this.t,Ta),At(Ta.s,this.s,this),this.s?this.t+=Ta.t:this.s=Ta.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var Ta=new kt;mo.geo.stream=function(n,t){n&&qa.hasOwnProperty(n.type)?qa[n.type](n,t):Nt(n,t)};var qa={Feature:function(n,t){Nt(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,u=e.length;++r<u;)Nt(e[r].geometry,t)}},za={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){Tt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)Tt(e[r],t,0)},Polygon:function(n,t){qt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,u=e.length;++r<u;)qt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,u=e.length;++r<u;)Nt(e[r],t)}};mo.geo.area=function(n){return Ca=0,mo.geo.stream(n,ja),Ca};var Ca,Da=new kt,ja={sphere:function(){Ca+=4*Bo},point:c,lineStart:c,lineEnd:c,polygonStart:function(){Da.reset(),ja.lineStart=zt},polygonEnd:function(){var n=2*Da;Ca+=0>n?4*Bo+n:n,ja.lineStart=ja.lineEnd=ja.point=c}};mo.geo.bounds=function(){function n(n,t){M.push(x=[s=n,h=n]),f>t&&(f=t),t>g&&(g=t)}function t(t,e){var r=Ct([t*Go,e*Go]);if(m){var u=jt(m,r),i=[u[1],-u[0],0],o=jt(i,u);Ft(o),o=Pt(o);var c=t-p,l=c>0?1:-1,d=o[0]*Ko*l,v=Math.abs(c)>180;if(v^(d>l*p&&l*t>d)){var y=o[1]*Ko;y>g&&(g=y)}else if(d=(d+360)%360-180,v^(d>l*p&&l*t>d)){var y=-o[1]*Ko;f>y&&(f=y)}else f>e&&(f=e),e>g&&(g=e);v?p>t?a(s,t)>a(s,h)&&(h=t):a(t,h)>a(s,h)&&(s=t):h>=s?(s>t&&(s=t),t>h&&(h=t)):t>p?a(s,t)>a(s,h)&&(h=t):a(t,h)>a(s,h)&&(s=t)}else n(t,e);m=r,p=t}function e(){b.point=t}function r(){x[0]=s,x[1]=h,b.point=n,m=null}function u(n,e){if(m){var r=n-p;y+=Math.abs(r)>180?r+(r>0?360:-360):r}else d=n,v=e;ja.point(n,e),t(n,e)}function i(){ja.lineStart()}function o(){u(d,v),ja.lineEnd(),Math.abs(y)>Wo&&(s=-(h=180)),x[0]=s,x[1]=h,m=null}function a(n,t){return(t-=n)<0?t+360:t}function c(n,t){return n[0]-t[0]}function l(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var s,f,h,g,p,d,v,m,y,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=u,b.lineStart=i,b.lineEnd=o,y=0,ja.polygonStart()},polygonEnd:function(){ja.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>Da?(s=-(h=180),f=-(g=90)):y>Wo?g=90:-Wo>y&&(f=-90),x[0]=s,x[1]=h}};return function(n){g=h=-(s=f=1/0),M=[],mo.geo.stream(n,b);var t=M.length;if(t){M.sort(c);for(var e,r=1,u=M[0],i=[u];t>r;++r)e=M[r],l(e[0],u)||l(e[1],u)?(a(u[0],e[1])>a(u[0],u[1])&&(u[1]=e[1]),a(e[0],u[1])>a(u[0],u[1])&&(u[0]=e[0])):i.push(u=e);for(var o,e,p=-1/0,t=i.length-1,r=0,u=i[t];t>=r;u=e,++r)e=i[r],(o=a(u[1],e[0]))>p&&(p=o,s=e[0],h=u[1])}return M=x=null,1/0===s||1/0===f?[[0/0,0/0],[0/0,0/0]]:[[s,f],[h,g]]}}(),mo.geo.centroid=function(n){La=Ha=Fa=Pa=Oa=Ra=Ya=Ia=Ua=Za=Va=0,mo.geo.stream(n,Xa);var t=Ua,e=Za,r=Va,u=t*t+e*e+r*r;return Jo>u&&(t=Ra,e=Ya,r=Ia,Wo>Ha&&(t=Fa,e=Pa,r=Oa),u=t*t+e*e+r*r,Jo>u)?[0/0,0/0]:[Math.atan2(e,t)*Ko,O(r/Math.sqrt(u))*Ko]};var La,Ha,Fa,Pa,Oa,Ra,Ya,Ia,Ua,Za,Va,Xa={sphere:c,point:Rt,lineStart:It,lineEnd:Ut,polygonStart:function(){Xa.lineStart=Zt},polygonEnd:function(){Xa.lineStart=It}},$a=Bt(Vt,Qt,te,ee),Ba=[-Bo,0],Wa=1e9;mo.geo.clipExtent=function(){var n,t,e,r,u,i,o={stream:function(n){return u&&(u.valid=!1),u=i(n),u.valid=!0,u},extent:function(a){return arguments.length?(i=ue(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),u&&(u.valid=!1,u=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(mo.geo.conicEqualArea=function(){return ae(ce)}).raw=ce,mo.geo.albers=function(){return mo.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},mo.geo.albersUsa=function(){function n(n){var i=n[0],o=n[1];return t=null,e(i,o),t||(r(i,o),t)||u(i,o),t}var t,e,r,u,i=mo.geo.albers(),o=mo.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=mo.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),c={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=i.scale(),e=i.translate(),r=(n[0]-e[0])/t,u=(n[1]-e[1])/t;return(u>=.12&&.234>u&&r>=-.425&&-.214>r?o:u>=.166&&.234>u&&r>=-.214&&-.115>r?a:i).invert(n)},n.stream=function(n){var t=i.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,u){t.point(n,u),e.point(n,u),r.point(n,u)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(i.precision(t),o.precision(t),a.precision(t),n):i.precision()},n.scale=function(t){return arguments.length?(i.scale(t),o.scale(.35*t),a.scale(t),n.translate(i.translate())):i.scale()},n.translate=function(t){if(!arguments.length)return i.translate();var l=i.scale(),s=+t[0],f=+t[1];return e=i.translate(t).clipExtent([[s-.455*l,f-.238*l],[s+.455*l,f+.238*l]]).stream(c).point,r=o.translate([s-.307*l,f+.201*l]).clipExtent([[s-.425*l+Wo,f+.12*l+Wo],[s-.214*l-Wo,f+.234*l-Wo]]).stream(c).point,u=a.translate([s-.205*l,f+.212*l]).clipExtent([[s-.214*l+Wo,f+.166*l+Wo],[s-.115*l-Wo,f+.234*l-Wo]]).stream(c).point,n},n.scale(1070)};var Ja,Ga,Ka,Qa,nc,tc,ec={point:c,lineStart:c,lineEnd:c,polygonStart:function(){Ga=0,ec.lineStart=le},polygonEnd:function(){ec.lineStart=ec.lineEnd=ec.point=c,Ja+=Math.abs(Ga/2)}},rc={point:se,lineStart:c,lineEnd:c,polygonStart:c,polygonEnd:c},uc={point:ge,lineStart:pe,lineEnd:de,polygonStart:function(){uc.lineStart=ve},polygonEnd:function(){uc.point=ge,uc.lineStart=pe,uc.lineEnd=de}};mo.geo.transform=function(n){return{stream:function(t){var e=new Me(t);for(var r in n)e[r]=n[r];return e}}},Me.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},mo.geo.path=function(){function n(n){return n&&("function"==typeof a&&i.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=u(i)),mo.geo.stream(n,o)),i.result()}function t(){return o=null,n}var e,r,u,i,o,a=4.5;return n.area=function(n){return Ja=0,mo.geo.stream(n,u(ec)),Ja},n.centroid=function(n){return Fa=Pa=Oa=Ra=Ya=Ia=Ua=Za=Va=0,mo.geo.stream(n,u(uc)),Va?[Ua/Va,Za/Va]:Ia?[Ra/Ia,Ya/Ia]:Oa?[Fa/Oa,Pa/Oa]:[0/0,0/0]},n.bounds=function(n){return nc=tc=-(Ka=Qa=1/0),mo.geo.stream(n,u(rc)),[[Ka,Qa],[nc,tc]]},n.projection=function(n){return arguments.length?(u=(e=n)?n.stream||xe(n):dt,t()):e},n.context=function(n){return arguments.length?(i=null==(r=n)?new fe:new me(n),"function"!=typeof a&&i.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(i.pointRadius(+t),+t),n):a},n.projection(mo.geo.albersUsa()).context(null)},mo.geo.projection=be,mo.geo.projectionMutator=_e,(mo.geo.equirectangular=function(){return be(Se)}).raw=Se.invert=Se,mo.geo.rotation=function(n){function t(t){return t=n(t[0]*Go,t[1]*Go),t[0]*=Ko,t[1]*=Ko,t}return n=Ee(n[0]%360*Go,n[1]*Go,n.length>2?n[2]*Go:0),t.invert=function(t){return t=n.invert(t[0]*Go,t[1]*Go),t[0]*=Ko,t[1]*=Ko,t},t},mo.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=Ee(-n[0]*Go,-n[1]*Go,0).invert,u=[];return e(null,null,1,{point:function(n,e){u.push(n=t(n,e)),n[0]*=Ko,n[1]*=Ko}}),{type:"Polygon",coordinates:[u]}}var t,e,r=[0,0],u=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=Te((t=+r)*Go,u*Go),n):t},n.precision=function(r){return arguments.length?(e=Te(t*Go,(u=+r)*Go),n):u},n.angle(90)},mo.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Go,u=n[1]*Go,i=t[1]*Go,o=Math.sin(r),a=Math.cos(r),c=Math.sin(u),l=Math.cos(u),s=Math.sin(i),f=Math.cos(i);return Math.atan2(Math.sqrt((e=f*o)*e+(e=l*s-c*f*a)*e),c*s+l*f*a)},mo.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return mo.range(Math.ceil(i/v)*v,u,v).map(h).concat(mo.range(Math.ceil(l/m)*m,c,m).map(g)).concat(mo.range(Math.ceil(r/p)*p,e,p).filter(function(n){return Math.abs(n%v)>Wo
	    }).map(s)).concat(mo.range(Math.ceil(a/d)*d,o,d).filter(function(n){return Math.abs(n%m)>Wo}).map(f))}var e,r,u,i,o,a,c,l,s,f,h,g,p=10,d=p,v=90,m=360,y=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(i).concat(g(c).slice(1),h(u).reverse().slice(1),g(l).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(i=+t[0][0],u=+t[1][0],l=+t[0][1],c=+t[1][1],i>u&&(t=i,i=u,u=t),l>c&&(t=l,l=c,c=t),n.precision(y)):[[i,l],[u,c]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(y)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(v=+t[0],m=+t[1],n):[v,m]},n.minorStep=function(t){return arguments.length?(p=+t[0],d=+t[1],n):[p,d]},n.precision=function(t){return arguments.length?(y=+t,s=ze(a,o,90),f=Ce(r,e,y),h=ze(l,c,90),g=Ce(i,u,y),n):y},n.majorExtent([[-180,-90+Wo],[180,90-Wo]]).minorExtent([[-180,-80-Wo],[180,80+Wo]])},mo.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||u.apply(this,arguments)]}}var t,e,r=De,u=je;return n.distance=function(){return mo.geo.distance(t||r.apply(this,arguments),e||u.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(u=t,e="function"==typeof t?null:t,n):u},n.precision=function(){return arguments.length?n:0},n},mo.geo.interpolate=function(n,t){return Le(n[0]*Go,n[1]*Go,t[0]*Go,t[1]*Go)},mo.geo.length=function(n){return ic=0,mo.geo.stream(n,oc),ic};var ic,oc={sphere:c,point:c,lineStart:He,lineEnd:c,polygonStart:c,polygonEnd:c},ac=Fe(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(mo.geo.azimuthalEqualArea=function(){return be(ac)}).raw=ac;var cc=Fe(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},dt);(mo.geo.azimuthalEquidistant=function(){return be(cc)}).raw=cc,(mo.geo.conicConformal=function(){return ae(Pe)}).raw=Pe,(mo.geo.conicEquidistant=function(){return ae(Oe)}).raw=Oe;var lc=Fe(function(n){return 1/n},Math.atan);(mo.geo.gnomonic=function(){return be(lc)}).raw=lc,Re.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Bo/2]},(mo.geo.mercator=function(){return Ye(Re)}).raw=Re;var sc=Fe(function(){return 1},Math.asin);(mo.geo.orthographic=function(){return be(sc)}).raw=sc;var fc=Fe(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(mo.geo.stereographic=function(){return be(fc)}).raw=fc,Ie.invert=function(n,t){return[Math.atan2(R(n),Math.cos(t)),O(Math.sin(t)/Y(n))]},(mo.geo.transverseMercator=function(){return Ye(Ie)}).raw=Ie,mo.geom={},mo.svg={},mo.svg.line=function(){return Ue(dt)};var hc=mo.map({linear:Xe,"linear-closed":$e,step:Be,"step-before":We,"step-after":Je,basis:er,"basis-open":rr,"basis-closed":ur,bundle:ir,cardinal:Qe,"cardinal-open":Ge,"cardinal-closed":Ke,monotone:fr});hc.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var gc=[0,2/3,1/3,0],pc=[0,1/3,2/3,0],dc=[0,1/6,2/3,1/6];mo.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,u,i,o,a,c,l,s,f,h,g,p,d=pt(e),v=pt(r),m=n.length,y=m-1,M=[],x=[],b=0;if(d===Ze&&r===Ve)t=n;else for(i=0,t=[];m>i;++i)t.push([+d.call(this,u=n[i],i),+v.call(this,u,i)]);for(i=1;m>i;++i)(t[i][1]<t[b][1]||t[i][1]==t[b][1]&&t[i][0]<t[b][0])&&(b=i);for(i=0;m>i;++i)i!==b&&(c=t[i][1]-t[b][1],a=t[i][0]-t[b][0],M.push({angle:Math.atan2(c,a),index:i}));for(M.sort(function(n,t){return n.angle-t.angle}),g=M[0].angle,h=M[0].index,f=0,i=1;y>i;++i){if(o=M[i].index,g==M[i].angle){if(a=t[h][0]-t[b][0],c=t[h][1]-t[b][1],l=t[o][0]-t[b][0],s=t[o][1]-t[b][1],a*a+c*c>=l*l+s*s){M[i].index=-1;continue}M[f].index=-1}g=M[i].angle,f=i,h=o}for(x.push(b),i=0,o=0;2>i;++o)M[o].index>-1&&(x.push(M[o].index),i++);for(p=x.length;y>o;++o)if(!(M[o].index<0)){for(;!hr(x[p-2],x[p-1],M[o].index,t);)--p;x[p++]=M[o].index}var _=[];for(i=p-1;i>=0;--i)_.push(n[x[i]]);return _}var e=Ze,r=Ve;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},mo.geom.polygon=function(n){return Lo(n,vc),n};var vc=mo.geom.polygon.prototype=[];vc.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],u=0;++t<e;)n=r,r=this[t],u+=n[1]*r[0]-n[0]*r[1];return.5*u},vc.centroid=function(n){var t,e,r=-1,u=this.length,i=0,o=0,a=this[u-1];for(arguments.length||(n=-1/(6*this.area()));++r<u;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],i+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[i*n,o*n]},vc.clip=function(n){for(var t,e,r,u,i,o,a=dr(n),c=-1,l=this.length-dr(this),s=this[l-1];++c<l;){for(t=n.slice(),n.length=0,u=this[c],i=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],gr(o,s,u)?(gr(i,s,u)||n.push(pr(i,o,s,u)),n.push(o)):gr(i,s,u)&&n.push(pr(i,o,s,u)),i=o;a&&n.push(n[0]),s=u}return n},mo.geom.delaunay=function(n){var t=n.map(function(){return[]}),e=[];return vr(n,function(e){t[e.region.l.index].push(n[e.region.r.index])}),t.forEach(function(t,r){var u=n[r],i=u[0],o=u[1];t.forEach(function(n){n.angle=Math.atan2(n[0]-i,n[1]-o)}),t.sort(function(n,t){return n.angle-t.angle});for(var a=0,c=t.length-1;c>a;a++)e.push([u,t[a],t[a+1]])}),e},mo.geom.voronoi=function(n){function t(n){var t,i,o,a=n.map(function(){return[]}),c=pt(e),l=pt(r),s=n.length,f=1e6;if(c===Ze&&l===Ve)t=n;else for(t=new Array(s),o=0;s>o;++o)t[o]=[+c.call(this,i=n[o],o),+l.call(this,i,o)];if(vr(t,function(n){var t,e,r,u,i,o;1===n.a&&n.b>=0?(t=n.ep.r,e=n.ep.l):(t=n.ep.l,e=n.ep.r),1===n.a?(i=t?t.y:-f,r=n.c-n.b*i,o=e?e.y:f,u=n.c-n.b*o):(r=t?t.x:-f,i=n.c-n.a*r,u=e?e.x:f,o=n.c-n.a*u);var c=[r,i],l=[u,o];a[n.region.l.index].push(c,l),a[n.region.r.index].push(c,l)}),a=a.map(function(n,e){var r=t[e][0],u=t[e][1],i=n.map(function(n){return Math.atan2(n[0]-r,n[1]-u)}),o=mo.range(n.length).sort(function(n,t){return i[n]-i[t]});return o.filter(function(n,t){return!t||i[n]-i[o[t-1]]>Wo}).map(function(t){return n[t]})}),a.forEach(function(n,e){var r=n.length;if(!r)return n.push([-f,-f],[-f,f],[f,f],[f,-f]);if(!(r>2)){var u=t[e],i=n[0],o=n[1],a=u[0],c=u[1],l=i[0],s=i[1],h=o[0],g=o[1],p=Math.abs(h-l),d=g-s;if(Math.abs(d)<Wo){var v=s>c?-f:f;n.push([-f,v],[f,v])}else if(Wo>p){var m=l>a?-f:f;n.push([m,-f],[m,f])}else{var v=(l-a)*(g-s)>(h-l)*(s-c)?f:-f,y=Math.abs(d)-p;Math.abs(y)<Wo?n.push([0>d?v:-v,v]):(y>0&&(v*=-1),n.push([-f,v],[f,v]))}}}),u)for(o=0;s>o;++o)u.clip(a[o]);for(o=0;s>o;++o)a[o].point=n[o];return a}var e=Ze,r=Ve,u=null;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.clipExtent=function(n){if(!arguments.length)return u&&[u[0],u[2]];if(null==n)u=null;else{var e=+n[0][0],r=+n[0][1],i=+n[1][0],o=+n[1][1];u=mo.geom.polygon([[e,r],[e,o],[i,o],[i,r]])}return t},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):u&&u[2]},t.links=function(n){var t,u,i,o=n.map(function(){return[]}),a=[],c=pt(e),l=pt(r),s=n.length;if(c===Ze&&l===Ve)t=n;else for(t=new Array(s),i=0;s>i;++i)t[i]=[+c.call(this,u=n[i],i),+l.call(this,u,i)];return vr(t,function(t){var e=t.region.l.index,r=t.region.r.index;o[e][r]||(o[e][r]=o[r][e]=!0,a.push({source:n[e],target:n[r]}))}),a},t.triangles=function(n){if(e===Ze&&r===Ve)return mo.geom.delaunay(n);for(var t,u=new Array(c),i=pt(e),o=pt(r),a=-1,c=n.length;++a<c;)(u[a]=[+i.call(this,t=n[a],a),+o.call(this,t,a)]).data=t;return mo.geom.delaunay(u).map(function(n){return n.map(function(n){return n.data})})},t)};var mc={l:"r",r:"l"};mo.geom.quadtree=function(n,t,e,r,u){function i(n){function i(n,t,e,r,u,i,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var c=n.x,s=n.y;if(null!=c)if(Math.abs(c-e)+Math.abs(s-r)<.01)l(n,t,e,r,u,i,o,a);else{var f=n.point;n.x=n.y=n.point=null,l(n,f,c,s,u,i,o,a),l(n,t,e,r,u,i,o,a)}else n.x=e,n.y=r,n.point=t}else l(n,t,e,r,u,i,o,a)}function l(n,t,e,r,u,o,a,c){var l=.5*(u+a),s=.5*(o+c),f=e>=l,h=r>=s,g=(h<<1)+f;n.leaf=!1,n=n.nodes[g]||(n.nodes[g]=Mr()),f?u=l:a=l,h?o=s:c=s,i(n,t,e,r,u,o,a,c)}var s,f,h,g,p,d,v,m,y,M=pt(a),x=pt(c);if(null!=t)d=t,v=e,m=r,y=u;else if(m=y=-(d=v=1/0),f=[],h=[],p=n.length,o)for(g=0;p>g;++g)s=n[g],s.x<d&&(d=s.x),s.y<v&&(v=s.y),s.x>m&&(m=s.x),s.y>y&&(y=s.y),f.push(s.x),h.push(s.y);else for(g=0;p>g;++g){var b=+M(s=n[g],g),_=+x(s,g);d>b&&(d=b),v>_&&(v=_),b>m&&(m=b),_>y&&(y=_),f.push(b),h.push(_)}var w=m-d,S=y-v;w>S?y=v+w:m=d+S;var E=Mr();if(E.add=function(n){i(E,n,+M(n,++g),+x(n,g),d,v,m,y)},E.visit=function(n){xr(n,E,d,v,m,y)},g=-1,null==t){for(;++g<p;)i(E,n[g],f[g],h[g],d,v,m,y);--g}else n.forEach(E.add);return f=h=n=s=null,E}var o,a=Ze,c=Ve;return(o=arguments.length)?(a=mr,c=yr,3===o&&(u=e,r=t,e=t=0),i(n)):(i.x=function(n){return arguments.length?(a=n,i):a},i.y=function(n){return arguments.length?(c=n,i):c},i.extent=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],u=+n[1][1]),i):null==t?null:[[t,e],[r,u]]},i.size=function(n){return arguments.length?(null==n?t=e=r=u=null:(t=e=0,r=+n[0],u=+n[1]),i):null==t?null:[r-t,u-e]},i)},mo.interpolateRgb=br,mo.interpolateObject=_r,mo.interpolateNumber=wr,mo.interpolateString=Sr;var yc=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;mo.interpolate=Er,mo.interpolators=[function(n,t){var e=typeof t;return("string"===e?ga.has(t)||/^(#|rgb\(|hsl\()/.test(t)?br:Sr:t instanceof Z?br:"object"===e?Array.isArray(t)?kr:_r:wr)(n,t)}],mo.interpolateArray=kr;var Mc=function(){return dt},xc=mo.map({linear:Mc,poly:Dr,quad:function(){return qr},cubic:function(){return zr},sin:function(){return jr},exp:function(){return Lr},circle:function(){return Hr},elastic:Fr,back:Pr,bounce:function(){return Or}}),bc=mo.map({"in":dt,out:Nr,"in-out":Tr,"out-in":function(n){return Tr(Nr(n))}});mo.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.substring(0,t):n,r=t>=0?n.substring(t+1):"in";return e=xc.get(e)||Mc,r=bc.get(r)||dt,Ar(r(e.apply(null,Array.prototype.slice.call(arguments,1))))},mo.interpolateHcl=Rr,mo.interpolateHsl=Yr,mo.interpolateLab=Ir,mo.interpolateRound=Ur,mo.transform=function(n){var t=xo.createElementNS(mo.ns.prefix.svg,"g");return(mo.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new Zr(e?e.matrix:_c)})(n)},Zr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var _c={a:1,b:0,c:0,d:1,e:0,f:0};mo.interpolateTransform=Br,mo.layout={},mo.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Gr(n[e]));return t}},mo.layout.chord=function(){function n(){var n,l,f,h,g,p={},d=[],v=mo.range(i),m=[];for(e=[],r=[],n=0,h=-1;++h<i;){for(l=0,g=-1;++g<i;)l+=u[h][g];d.push(l),m.push(mo.range(i)),n+=l}for(o&&v.sort(function(n,t){return o(d[n],d[t])}),a&&m.forEach(function(n,t){n.sort(function(n,e){return a(u[t][n],u[t][e])})}),n=(2*Bo-s*i)/n,l=0,h=-1;++h<i;){for(f=l,g=-1;++g<i;){var y=v[h],M=m[y][g],x=u[y][M],b=l,_=l+=x*n;p[y+"-"+M]={index:y,subindex:M,startAngle:b,endAngle:_,value:x}}r[y]={index:y,startAngle:f,endAngle:l,value:(l-f)/n},l+=s}for(h=-1;++h<i;)for(g=h-1;++g<i;){var w=p[h+"-"+g],S=p[g+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}c&&t()}function t(){e.sort(function(n,t){return c((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,u,i,o,a,c,l={},s=0;return l.matrix=function(n){return arguments.length?(i=(u=n)&&u.length,e=r=null,l):u},l.padding=function(n){return arguments.length?(s=n,e=r=null,l):s},l.sortGroups=function(n){return arguments.length?(o=n,e=r=null,l):o},l.sortSubgroups=function(n){return arguments.length?(a=n,e=null,l):a},l.sortChords=function(n){return arguments.length?(c=n,e&&t(),l):c},l.chords=function(){return e||n(),e},l.groups=function(){return r||n(),r},l},mo.layout.force=function(){function n(n){return function(t,e,r,u){if(t.point!==n){var i=t.cx-n.x,o=t.cy-n.y,a=1/Math.sqrt(i*i+o*o);if(d>(u-e)*a){var c=t.charge*a*a;return n.px-=i*c,n.py-=o*c,!0}if(t.point&&isFinite(a)){var c=t.pointCharge*a*a;n.px-=i*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=mo.event.x,n.py=mo.event.y,a.resume()}var e,r,u,i,o,a={},c=mo.dispatch("start","tick","end"),l=[1,1],s=.9,f=wc,h=Sc,g=-30,p=.1,d=.8,v=[],m=[];return a.tick=function(){if((r*=.99)<.005)return c.end({type:"end",alpha:r=0}),!0;var t,e,a,f,h,d,y,M,x,b=v.length,_=m.length;for(e=0;_>e;++e)a=m[e],f=a.source,h=a.target,M=h.x-f.x,x=h.y-f.y,(d=M*M+x*x)&&(d=r*i[e]*((d=Math.sqrt(d))-u[e])/d,M*=d,x*=d,h.x-=M*(y=f.weight/(h.weight+f.weight)),h.y-=x*y,f.x+=M*(y=1-y),f.y+=x*y);if((y=r*p)&&(M=l[0]/2,x=l[1]/2,e=-1,y))for(;++e<b;)a=v[e],a.x+=(M-a.x)*y,a.y+=(x-a.y)*y;if(g)for(uu(t=mo.geom.quadtree(v),r,o),e=-1;++e<b;)(a=v[e]).fixed||t.visit(n(a));for(e=-1;++e<b;)a=v[e],a.fixed?(a.x=a.px,a.y=a.py):(a.x-=(a.px-(a.px=a.x))*s,a.y-=(a.py-(a.py=a.y))*s);c.tick({type:"tick",alpha:r})},a.nodes=function(n){return arguments.length?(v=n,a):v},a.links=function(n){return arguments.length?(m=n,a):m},a.size=function(n){return arguments.length?(l=n,a):l},a.linkDistance=function(n){return arguments.length?(f="function"==typeof n?n:+n,a):f},a.distance=a.linkDistance,a.linkStrength=function(n){return arguments.length?(h="function"==typeof n?n:+n,a):h},a.friction=function(n){return arguments.length?(s=+n,a):s},a.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,a):g},a.gravity=function(n){return arguments.length?(p=+n,a):p},a.theta=function(n){return arguments.length?(d=+n,a):d},a.alpha=function(n){return arguments.length?(n=+n,r?r=n>0?n:0:n>0&&(c.start({type:"start",alpha:r=n}),mo.timer(a.tick)),a):r},a.start=function(){function n(n,r){for(var u,i=t(e),o=-1,a=i.length;++o<a;)if(!isNaN(u=i[o][n]))return u;return Math.random()*r}function t(){if(!c){for(c=[],r=0;p>r;++r)c[r]=[];for(r=0;d>r;++r){var n=m[r];c[n.source.index].push(n.target),c[n.target.index].push(n.source)}}return c[e]}var e,r,c,s,p=v.length,d=m.length,y=l[0],M=l[1];for(e=0;p>e;++e)(s=v[e]).index=e,s.weight=0;for(e=0;d>e;++e)s=m[e],"number"==typeof s.source&&(s.source=v[s.source]),"number"==typeof s.target&&(s.target=v[s.target]),++s.source.weight,++s.target.weight;for(e=0;p>e;++e)s=v[e],isNaN(s.x)&&(s.x=n("x",y)),isNaN(s.y)&&(s.y=n("y",M)),isNaN(s.px)&&(s.px=s.x),isNaN(s.py)&&(s.py=s.y);if(u=[],"function"==typeof f)for(e=0;d>e;++e)u[e]=+f.call(this,m[e],e);else for(e=0;d>e;++e)u[e]=f;if(i=[],"function"==typeof h)for(e=0;d>e;++e)i[e]=+h.call(this,m[e],e);else for(e=0;d>e;++e)i[e]=h;if(o=[],"function"==typeof g)for(e=0;p>e;++e)o[e]=+g.call(this,v[e],e);else for(e=0;p>e;++e)o[e]=g;return a.resume()},a.resume=function(){return a.alpha(.1)},a.stop=function(){return a.alpha(0)},a.drag=function(){return e||(e=mo.behavior.drag().origin(dt).on("dragstart.force",nu).on("drag.force",t).on("dragend.force",tu)),arguments.length?(this.on("mouseover.force",eu).on("mouseout.force",ru).call(e),void 0):e},mo.rebind(a,c,"on")};var wc=20,Sc=1;mo.layout.hierarchy=function(){function n(t,o,a){var c=u.call(e,t,o);if(t.depth=o,a.push(t),c&&(l=c.length)){for(var l,s,f=-1,h=t.children=[],g=0,p=o+1;++f<l;)s=n(c[f],p,a),s.parent=t,h.push(s),g+=s.value;r&&h.sort(r),i&&(t.value=g)}else i&&(t.value=+i.call(e,t,o)||0);return t}function t(n,r){var u=n.children,o=0;if(u&&(a=u.length))for(var a,c=-1,l=r+1;++c<a;)o+=t(u[c],l);else i&&(o=+i.call(e,n,r)||0);return i&&(n.value=o),o}function e(t){var e=[];return n(t,0,e),e}var r=cu,u=ou,i=au;return e.sort=function(n){return arguments.length?(r=n,e):r},e.children=function(n){return arguments.length?(u=n,e):u},e.value=function(n){return arguments.length?(i=n,e):i},e.revalue=function(n){return t(n,0),n},e},mo.layout.partition=function(){function n(t,e,r,u){var i=t.children;if(t.x=e,t.y=t.depth*u,t.dx=r,t.dy=u,i&&(o=i.length)){var o,a,c,l=-1;for(r=t.value?r/t.value:0;++l<o;)n(a=i[l],e,c=a.value*r,u),e+=c}}function t(n){var e=n.children,r=0;if(e&&(u=e.length))for(var u,i=-1;++i<u;)r=Math.max(r,t(e[i]));return 1+r}function e(e,i){var o=r.call(this,e,i);return n(o[0],0,u[0],u[1]/t(o[0])),o}var r=mo.layout.hierarchy(),u=[1,1];return e.size=function(n){return arguments.length?(u=n,e):u},iu(e,r)},mo.layout.pie=function(){function n(i){var o=i.map(function(e,r){return+t.call(n,e,r)}),a=+("function"==typeof r?r.apply(this,arguments):r),c=(("function"==typeof u?u.apply(this,arguments):u)-a)/mo.sum(o),l=mo.range(i.length);null!=e&&l.sort(e===Ec?function(n,t){return o[t]-o[n]}:function(n,t){return e(i[n],i[t])});var s=[];return l.forEach(function(n){var t;s[n]={data:i[n],value:t=o[n],startAngle:a,endAngle:a+=t*c}}),s}var t=Number,e=Ec,r=0,u=2*Bo;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(u=t,n):u},n};var Ec={};mo.layout.stack=function(){function n(a,c){var l=a.map(function(e,r){return t.call(n,e,r)}),s=l.map(function(t){return t.map(function(t,e){return[i.call(n,t,e),o.call(n,t,e)]})}),f=e.call(n,s,c);l=mo.permute(l,f),s=mo.permute(s,f);var h,g,p,d=r.call(n,s,c),v=l.length,m=l[0].length;for(g=0;m>g;++g)for(u.call(n,l[0][g],p=d[g],s[0][g][1]),h=1;v>h;++h)u.call(n,l[h][g],p+=s[h-1][g][1],s[h][g][1]);return a}var t=dt,e=gu,r=pu,u=hu,i=su,o=fu;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:kc.get(t)||gu,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:Ac.get(t)||pu,n):r},n.x=function(t){return arguments.length?(i=t,n):i},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(u=t,n):u},n};var kc=mo.map({"inside-out":function(n){var t,e,r=n.length,u=n.map(du),i=n.map(vu),o=mo.range(r).sort(function(n,t){return u[n]-u[t]}),a=0,c=0,l=[],s=[];for(t=0;r>t;++t)e=o[t],c>a?(a+=i[e],l.push(e)):(c+=i[e],s.push(e));return s.reverse().concat(l)},reverse:function(n){return mo.range(n.length).reverse()},"default":gu}),Ac=mo.map({silhouette:function(n){var t,e,r,u=n.length,i=n[0].length,o=[],a=0,c=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;i>e;++e)c[e]=(a-o[e])/2;return c},wiggle:function(n){var t,e,r,u,i,o,a,c,l,s=n.length,f=n[0],h=f.length,g=[];for(g[0]=c=l=0,e=1;h>e;++e){for(t=0,u=0;s>t;++t)u+=n[t][e][1];for(t=0,i=0,a=f[e][0]-f[e-1][0];s>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;i+=o*n[t][e][1]}g[e]=c-=u?i/u*a:0,l>c&&(l=c)}for(e=0;h>e;++e)g[e]-=l;return g},expand:function(n){var t,e,r,u=n.length,i=n[0].length,o=1/u,a=[];for(e=0;i>e;++e){for(t=0,r=0;u>t;t++)r+=n[t][e][1];if(r)for(t=0;u>t;t++)n[t][e][1]/=r;else for(t=0;u>t;t++)n[t][e][1]=o}for(e=0;i>e;++e)a[e]=0;return a},zero:pu});mo.layout.histogram=function(){function n(n,i){for(var o,a,c=[],l=n.map(e,this),s=r.call(this,l,i),f=u.call(this,s,l,i),i=-1,h=l.length,g=f.length-1,p=t?1:1/h;++i<g;)o=c[i]=[],o.dx=f[i+1]-(o.x=f[i]),o.y=0;if(g>0)for(i=-1;++i<h;)a=l[i],a>=s[0]&&a<=s[1]&&(o=c[mo.bisect(f,a,1,g)-1],o.y+=p,o.push(n[i]));return c}var t=!0,e=Number,r=xu,u=yu;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=pt(t),n):r},n.bins=function(t){return arguments.length?(u="number"==typeof t?function(n){return Mu(n,t)}:pt(t),n):u},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},mo.layout.tree=function(){function n(n,i){function o(n,t){var r=n.children,u=n._tree;if(r&&(i=r.length)){for(var i,a,l,s=r[0],f=s,h=-1;++h<i;)l=r[h],o(l,a),f=c(l,a,f),a=l;Tu(n);var g=.5*(s._tree.prelim+l._tree.prelim);t?(u.prelim=t._tree.prelim+e(n,t),u.mod=u.prelim-g):u.prelim=g}else t&&(u.prelim=t._tree.prelim+e(n,t))}function a(n,t){n.x=n._tree.prelim+t;var e=n.children;if(e&&(r=e.length)){var r,u=-1;for(t+=n._tree.mod;++u<r;)a(e[u],t)}}function c(n,t,r){if(t){for(var u,i=n,o=n,a=t,c=n.parent.children[0],l=i._tree.mod,s=o._tree.mod,f=a._tree.mod,h=c._tree.mod;a=wu(a),i=_u(i),a&&i;)c=_u(c),o=wu(o),o._tree.ancestor=n,u=a._tree.prelim+f-i._tree.prelim-l+e(a,i),u>0&&(qu(zu(a,n,r),n,u),l+=u,s+=u),f+=a._tree.mod,l+=i._tree.mod,h+=c._tree.mod,s+=o._tree.mod;a&&!wu(o)&&(o._tree.thread=a,o._tree.mod+=f-s),i&&!_u(c)&&(c._tree.thread=i,c._tree.mod+=l-h,r=n)}return r}var l=t.call(this,n,i),s=l[0];Nu(s,function(n,t){n._tree={ancestor:n,prelim:0,mod:0,change:0,shift:0,number:t?t._tree.number+1:0}}),o(s),a(s,-s._tree.prelim);var f=Su(s,ku),h=Su(s,Eu),g=Su(s,Au),p=f.x-e(f,h)/2,d=h.x+e(h,f)/2,v=g.depth||1;return Nu(s,u?function(n){n.x*=r[0],n.y=n.depth*r[1],delete n._tree}:function(n){n.x=(n.x-p)/(d-p)*r[0],n.y=n.depth/v*r[1],delete n._tree}),l}var t=mo.layout.hierarchy().sort(null).value(null),e=bu,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},iu(n,t)},mo.layout.pack=function(){function n(n,i){var o=e.call(this,n,i),a=o[0],c=u[0],l=u[1],s=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,Nu(a,function(n){n.r=+s(n.value)}),Nu(a,Hu),r){var f=r*(t?1:Math.max(2*a.r/c,2*a.r/l))/2;Nu(a,function(n){n.r+=f}),Nu(a,Hu),Nu(a,function(n){n.r-=f})}return Ou(a,c/2,l/2,t?1:1/Math.max(2*a.r/c,2*a.r/l)),o}var t,e=mo.layout.hierarchy().sort(Cu),r=0,u=[1,1];return n.size=function(t){return arguments.length?(u=t,n):u},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},iu(n,e)},mo.layout.cluster=function(){function n(n,i){var o,a=t.call(this,n,i),c=a[0],l=0;Nu(c,function(n){var t=n.children;t&&t.length?(n.x=Iu(t),n.y=Yu(t)):(n.x=o?l+=e(n,o):0,n.y=0,o=n)});var s=Uu(c),f=Zu(c),h=s.x-e(s,f)/2,g=f.x+e(f,s)/2;return Nu(c,u?function(n){n.x=(n.x-c.x)*r[0],n.y=(c.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(g-h)*r[0],n.y=(1-(c.y?n.y/c.y:1))*r[1]}),a}var t=mo.layout.hierarchy().sort(null).value(null),e=bu,r=[1,1],u=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(u=null==(r=t),n):u?null:r},n.nodeSize=function(t){return arguments.length?(u=null!=(r=t),n):u?r:null},iu(n,t)},mo.layout.treemap=function(){function n(n,t){for(var e,r,u=-1,i=n.length;++u<i;)r=(e=n[u]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var i=e.children;if(i&&i.length){var o,a,c,l=f(e),s=[],h=i.slice(),p=1/0,d="slice"===g?l.dx:"dice"===g?l.dy:"slice-dice"===g?1&e.depth?l.dy:l.dx:Math.min(l.dx,l.dy);for(n(h,l.dx*l.dy/e.value),s.area=0;(c=h.length)>0;)s.push(o=h[c-1]),s.area+=o.area,"squarify"!==g||(a=r(s,d))<=p?(h.pop(),p=a):(s.area-=s.pop().area,u(s,d,l,!1),d=Math.min(l.dx,l.dy),s.length=s.area=0,p=1/0);s.length&&(u(s,d,l,!0),s.length=s.area=0),i.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var i,o=f(t),a=r.slice(),c=[];for(n(a,o.dx*o.dy/t.value),c.area=0;i=a.pop();)c.push(i),c.area+=i.area,null!=i.z&&(u(c,i.z?o.dx:o.dy,o,!a.length),c.length=c.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,u=0,i=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(i>e&&(i=e),e>u&&(u=e));return r*=r,t*=t,r?Math.max(t*u*p/r,r/(t*i*p)):1/0}function u(n,t,e,r){var u,i=-1,o=n.length,a=e.x,l=e.y,s=t?c(n.area/t):0;if(t==e.dx){for((r||s>e.dy)&&(s=e.dy);++i<o;)u=n[i],u.x=a,u.y=l,u.dy=s,a+=u.dx=Math.min(e.x+e.dx-a,s?c(u.area/s):0);u.z=!0,u.dx+=e.x+e.dx-a,e.y+=s,e.dy-=s}else{for((r||s>e.dx)&&(s=e.dx);++i<o;)u=n[i],u.x=a,u.y=l,u.dx=s,l+=u.dy=Math.min(e.y+e.dy-l,s?c(u.area/s):0);u.z=!1,u.dy+=e.y+e.dy-l,e.x+=s,e.dx-=s}}function i(r){var u=o||a(r),i=u[0];return i.x=0,i.y=0,i.dx=l[0],i.dy=l[1],o&&a.revalue(i),n([i],i.dx*i.dy/i.value),(o?e:t)(i),h&&(o=u),u}var o,a=mo.layout.hierarchy(),c=Math.round,l=[1,1],s=null,f=Vu,h=!1,g="squarify",p=.5*(1+Math.sqrt(5));return i.size=function(n){return arguments.length?(l=n,i):l},i.padding=function(n){function t(t){var e=n.call(i,t,t.depth);return null==e?Vu(t):Xu(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Xu(t,n)}if(!arguments.length)return s;var r;return f=null==(s=n)?Vu:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,i},i.round=function(n){return arguments.length?(c=n?Math.round:Number,i):c!=Number},i.sticky=function(n){return arguments.length?(h=n,o=null,i):h},i.ratio=function(n){return arguments.length?(p=n,i):p},i.mode=function(n){return arguments.length?(g=n+"",i):g},iu(i,a)},mo.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,u;do e=2*Math.random()-1,r=2*Math.random()-1,u=e*e+r*r;while(!u||u>1);return n+t*e*Math.sqrt(-2*Math.log(u)/u)}},logNormal:function(){var n=mo.random.normal.apply(mo,arguments);return function(){return Math.exp(n())}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t/n}}},mo.scale={};var Nc={floor:dt,ceil:dt};mo.scale.linear=function(){return Qu([0,1],[0,1],Er,!1)},mo.scale.log=function(){return ii(mo.scale.linear().domain([0,1]),10,!0,[1,10])};var Tc=mo.format(".0e"),qc={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};mo.scale.pow=function(){return oi(mo.scale.linear(),1,[0,1])},mo.scale.sqrt=function(){return mo.scale.pow().exponent(.5)},mo.scale.ordinal=function(){return ci([],{t:"range",a:[[]]})},mo.scale.category10=function(){return mo.scale.ordinal().range(zc)},mo.scale.category20=function(){return mo.scale.ordinal().range(Cc)},mo.scale.category20b=function(){return mo.scale.ordinal().range(Dc)},mo.scale.category20c=function(){return mo.scale.ordinal().range(jc)};var zc=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(it),Cc=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(it),Dc=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(it),jc=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(it);mo.scale.quantile=function(){return li([],[])},mo.scale.quantize=function(){return si(0,1,[0,1])},mo.scale.threshold=function(){return fi([.5],[0,1])},mo.scale.identity=function(){return hi([0,1])},mo.svg.arc=function(){function n(){var n=t.apply(this,arguments),i=e.apply(this,arguments),o=r.apply(this,arguments)+Lc,a=u.apply(this,arguments)+Lc,c=(o>a&&(c=o,o=a,a=c),a-o),l=Bo>c?"0":"1",s=Math.cos(o),f=Math.sin(o),h=Math.cos(a),g=Math.sin(a);return c>=Hc?n?"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"M0,"+n+"A"+n+","+n+" 0 1,0 0,"+-n+"A"+n+","+n+" 0 1,0 0,"+n+"Z":"M0,"+i+"A"+i+","+i+" 0 1,1 0,"+-i+"A"+i+","+i+" 0 1,1 0,"+i+"Z":n?"M"+i*s+","+i*f+"A"+i+","+i+" 0 "+l+",1 "+i*h+","+i*g+"L"+n*h+","+n*g+"A"+n+","+n+" 0 "+l+",0 "+n*s+","+n*f+"Z":"M"+i*s+","+i*f+"A"+i+","+i+" 0 "+l+",1 "+i*h+","+i*g+"L0,0"+"Z"}var t=gi,e=pi,r=di,u=vi;return n.innerRadius=function(e){return arguments.length?(t=pt(e),n):t},n.outerRadius=function(t){return arguments.length?(e=pt(t),n):e},n.startAngle=function(t){return arguments.length?(r=pt(t),n):r},n.endAngle=function(t){return arguments.length?(u=pt(t),n):u},n.centroid=function(){var n=(t.apply(this,arguments)+e.apply(this,arguments))/2,i=(r.apply(this,arguments)+u.apply(this,arguments))/2+Lc;return[Math.cos(i)*n,Math.sin(i)*n]},n};var Lc=-Bo/2,Hc=2*Bo-1e-6;mo.svg.line.radial=function(){var n=Ue(mi);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},We.reverse=Je,Je.reverse=We,mo.svg.area=function(){return yi(dt)},mo.svg.area.radial=function(){var n=yi(mi);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},mo.svg.chord=function(){function n(n,a){var c=t(this,i,n,a),l=t(this,o,n,a);return"M"+c.p0+r(c.r,c.p1,c.a1-c.a0)+(e(c,l)?u(c.r,c.p1,c.r,c.p0):u(c.r,c.p1,l.r,l.p0)+r(l.r,l.p1,l.a1-l.a0)+u(l.r,l.p1,c.r,c.p0))+"Z"}function t(n,t,e,r){var u=t.call(n,e,r),i=a.call(n,u,r),o=c.call(n,u,r)+Lc,s=l.call(n,u,r)+Lc;return{r:i,a0:o,a1:s,p0:[i*Math.cos(o),i*Math.sin(o)],p1:[i*Math.cos(s),i*Math.sin(s)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Bo)+",1 "+t}function u(n,t,e,r){return"Q 0,0 "+r}var i=De,o=je,a=Mi,c=di,l=vi;return n.radius=function(t){return arguments.length?(a=pt(t),n):a},n.source=function(t){return arguments.length?(i=pt(t),n):i},n.target=function(t){return arguments.length?(o=pt(t),n):o},n.startAngle=function(t){return arguments.length?(c=pt(t),n):c},n.endAngle=function(t){return arguments.length?(l=pt(t),n):l},n},mo.svg.diagonal=function(){function n(n,u){var i=t.call(this,n,u),o=e.call(this,n,u),a=(i.y+o.y)/2,c=[i,{x:i.x,y:a},{x:o.x,y:a},o];return c=c.map(r),"M"+c[0]+"C"+c[1]+" "+c[2]+" "+c[3]}var t=De,e=je,r=xi;return n.source=function(e){return arguments.length?(t=pt(e),n):t},n.target=function(t){return arguments.length?(e=pt(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},mo.svg.diagonal.radial=function(){var n=mo.svg.diagonal(),t=xi,e=n.projection;return n.projection=function(n){return arguments.length?e(bi(t=n)):t},n},mo.svg.symbol=function(){function n(n,r){return(Fc.get(t.call(this,n,r))||Si)(e.call(this,n,r))}var t=wi,e=_i;return n.type=function(e){return arguments.length?(t=pt(e),n):t},n.size=function(t){return arguments.length?(e=pt(t),n):e},n};var Fc=mo.map({circle:Si,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Yc)),e=t*Yc;return"M0,"+-t+"L"+e+",0"+" 0,"+t+" "+-e+",0"+"Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/Rc),e=t*Rc/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/Rc),e=t*Rc/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});mo.svg.symbolTypes=Fc.keys();var Pc,Oc,Rc=Math.sqrt(3),Yc=Math.tan(30*Go),Ic=[],Uc=0;Ic.call=Ro.call,Ic.empty=Ro.empty,Ic.node=Ro.node,Ic.size=Ro.size,mo.transition=function(n){return arguments.length?Pc?n.transition():n:Uo.transition()},mo.transition.prototype=Ic,Ic.select=function(n){var t,e,r,u=this.id,i=[];n=d(n);for(var o=-1,a=this.length;++o<a;){i.push(t=[]);for(var c=this[o],l=-1,s=c.length;++l<s;)(r=c[l])&&(e=n.call(r,r.__data__,l,o))?("__data__"in r&&(e.__data__=r.__data__),Ni(e,l,u,r.__transition__[u]),t.push(e)):t.push(null)}return Ei(i,u)},Ic.selectAll=function(n){var t,e,r,u,i,o=this.id,a=[];n=v(n);for(var c=-1,l=this.length;++c<l;)for(var s=this[c],f=-1,h=s.length;++f<h;)if(r=s[f]){i=r.__transition__[o],e=n.call(r,r.__data__,f,c),a.push(t=[]);for(var g=-1,p=e.length;++g<p;)(u=e[g])&&Ni(u,g,o,i),t.push(u)}return Ei(a,o)},Ic.filter=function(n){var t,e,r,u=[];"function"!=typeof n&&(n=k(n));for(var i=0,o=this.length;o>i;i++){u.push(t=[]);for(var e=this[i],a=0,c=e.length;c>a;a++)(r=e[a])&&n.call(r,r.__data__,a)&&t.push(r)}return Ei(u,this.id)},Ic.tween=function(n,t){var e=this.id;return arguments.length<2?this.node().__transition__[e].tween.get(n):N(this,null==t?function(t){t.__transition__[e].tween.remove(n)}:function(r){r.__transition__[e].tween.set(n,t)})},Ic.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function u(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function i(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))
	    })})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?Br:Er,a=mo.ns.qualify(n);return ki(this,"attr."+n,t,a.local?i:u)},Ic.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(u));return r&&function(n){this.setAttribute(u,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(u.space,u.local));return r&&function(n){this.setAttributeNS(u.space,u.local,r(n))}}var u=mo.ns.qualify(n);return this.tween("attr."+n,u.local?r:e)},Ic.style=function(n,t,e){function r(){this.style.removeProperty(n)}function u(t){return null==t?r:(t+="",function(){var r,u=_o.getComputedStyle(this,null).getPropertyValue(n);return u!==t&&(r=Er(u,t),function(t){this.style.setProperty(n,r(t),e)})})}var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(t="");for(e in n)this.style(e,n[e],t);return this}e=""}return ki(this,"style."+n,t,u)},Ic.styleTween=function(n,t,e){function r(r,u){var i=t.call(this,r,u,_o.getComputedStyle(this,null).getPropertyValue(n));return i&&function(t){this.style.setProperty(n,i(t),e)}}return arguments.length<3&&(e=""),this.tween("style."+n,r)},Ic.text=function(n){return ki(this,"text",n,Ai)},Ic.remove=function(){return this.each("end.transition",function(){var n;this.__transition__.count<2&&(n=this.parentNode)&&n.removeChild(this)})},Ic.ease=function(n){var t=this.id;return arguments.length<1?this.node().__transition__[t].ease:("function"!=typeof n&&(n=mo.ease.apply(mo,arguments)),N(this,function(e){e.__transition__[t].ease=n}))},Ic.delay=function(n){var t=this.id;return N(this,"function"==typeof n?function(e,r,u){e.__transition__[t].delay=+n.call(e,e.__data__,r,u)}:(n=+n,function(e){e.__transition__[t].delay=n}))},Ic.duration=function(n){var t=this.id;return N(this,"function"==typeof n?function(e,r,u){e.__transition__[t].duration=Math.max(1,n.call(e,e.__data__,r,u))}:(n=Math.max(1,n),function(e){e.__transition__[t].duration=n}))},Ic.each=function(n,t){var e=this.id;if(arguments.length<2){var r=Oc,u=Pc;Pc=e,N(this,function(t,r,u){Oc=t.__transition__[e],n.call(t,t.__data__,r,u)}),Oc=r,Pc=u}else N(this,function(r){var u=r.__transition__[e];(u.event||(u.event=mo.dispatch("start","end"))).on(n,t)});return this},Ic.transition=function(){for(var n,t,e,r,u=this.id,i=++Uc,o=[],a=0,c=this.length;c>a;a++){o.push(n=[]);for(var t=this[a],l=0,s=t.length;s>l;l++)(e=t[l])&&(r=Object.create(e.__transition__[u]),r.delay+=r.duration,Ni(e,l,i,r)),n.push(e)}return Ei(o,i)},mo.svg.axis=function(){function n(n){n.each(function(){var n,l=mo.select(this),s=null==c?e.ticks?e.ticks.apply(e,a):e.domain():c,f=null==t?e.tickFormat?e.tickFormat.apply(e,a):dt:t,h=l.selectAll(".tick").data(s,dt),g=h.enter().insert("g",".domain").attr("class","tick").style("opacity",1e-6),p=mo.transition(h.exit()).style("opacity",1e-6).remove(),d=mo.transition(h).style("opacity",1),v=Bu(e),m=l.selectAll(".domain").data([0]),y=(m.enter().append("path").attr("class","domain"),mo.transition(m)),M=e.copy(),x=this.__chart__||M;this.__chart__=M,g.append("line"),g.append("text");var b=g.select("line"),_=d.select("line"),w=h.select("text").text(f),S=g.select("text"),E=d.select("text");switch(r){case"bottom":n=Ti,b.attr("y2",u),S.attr("y",Math.max(u,0)+o),_.attr("x2",0).attr("y2",u),E.attr("x",0).attr("y",Math.max(u,0)+o),w.attr("dy",".71em").style("text-anchor","middle"),y.attr("d","M"+v[0]+","+i+"V0H"+v[1]+"V"+i);break;case"top":n=Ti,b.attr("y2",-u),S.attr("y",-(Math.max(u,0)+o)),_.attr("x2",0).attr("y2",-u),E.attr("x",0).attr("y",-(Math.max(u,0)+o)),w.attr("dy","0em").style("text-anchor","middle"),y.attr("d","M"+v[0]+","+-i+"V0H"+v[1]+"V"+-i);break;case"left":n=qi,b.attr("x2",-u),S.attr("x",-(Math.max(u,0)+o)),_.attr("x2",-u).attr("y2",0),E.attr("x",-(Math.max(u,0)+o)).attr("y",0),w.attr("dy",".32em").style("text-anchor","end"),y.attr("d","M"+-i+","+v[0]+"H0V"+v[1]+"H"+-i);break;case"right":n=qi,b.attr("x2",u),S.attr("x",Math.max(u,0)+o),_.attr("x2",u).attr("y2",0),E.attr("x",Math.max(u,0)+o).attr("y",0),w.attr("dy",".32em").style("text-anchor","start"),y.attr("d","M"+i+","+v[0]+"H0V"+v[1]+"H"+i)}if(e.rangeBand){var k=M.rangeBand()/2,A=function(n){return M(n)+k};g.call(n,A),d.call(n,A)}else g.call(n,x),d.call(n,M),p.call(n,M)})}var t,e=mo.scale.linear(),r=Zc,u=6,i=6,o=3,a=[10],c=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in Vc?t+"":Zc,n):r},n.ticks=function(){return arguments.length?(a=arguments,n):a},n.tickValues=function(t){return arguments.length?(c=t,n):c},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(u=+t,i=+arguments[e-1],n):u},n.innerTickSize=function(t){return arguments.length?(u=+t,n):u},n.outerTickSize=function(t){return arguments.length?(i=+t,n):i},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Zc="bottom",Vc={top:1,right:1,bottom:1,left:1};mo.svg.brush=function(){function n(i){i.each(function(){var i=mo.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=i.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),i.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=i.selectAll(".resize").data(v,dt);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return Xc[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var s,f=mo.transition(i),h=mo.transition(o);c&&(s=Bu(c),h.attr("x",s[0]).attr("width",s[1]-s[0]),e(f)),l&&(s=Bu(l),h.attr("y",s[0]).attr("height",s[1]-s[0]),r(f)),t(f)})}function t(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function e(n){n.select(".extent").attr("x",s[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1]-s[0])}function r(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==mo.event.keyCode&&(N||(M=null,q[0]-=s[1],q[1]-=h[1],N=2),f())}function g(){32==mo.event.keyCode&&2==N&&(q[0]+=s[1],q[1]+=h[1],N=0,f())}function v(){var n=mo.mouse(b),u=!1;x&&(n[0]+=x[0],n[1]+=x[1]),N||(mo.event.altKey?(M||(M=[(s[0]+s[1])/2,(h[0]+h[1])/2]),q[0]=s[+(n[0]<M[0])],q[1]=h[+(n[1]<M[1])]):M=null),k&&m(n,c,0)&&(e(S),u=!0),A&&m(n,l,1)&&(r(S),u=!0),u&&(t(S),w({type:"brush",mode:N?"move":"resize"}))}function m(n,t,e){var r,u,a=Bu(t),c=a[0],l=a[1],f=q[e],g=e?h:s,v=g[1]-g[0];return N&&(c-=f,l-=v+f),r=(e?d:p)?Math.max(c,Math.min(l,n[e])):n[e],N?u=(r+=f)+v:(M&&(f=Math.max(c,Math.min(l,2*M[e]-r))),r>f?(u=r,r=f):u=f),g[0]!=r||g[1]!=u?(e?o=null:i=null,g[0]=r,g[1]=u,!0):void 0}function y(){v(),S.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),mo.select("body").style("cursor",null),z.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),T(),w({type:"brushend"})}var M,x,b=this,_=mo.select(mo.event.target),w=a.of(b,arguments),S=mo.select(b),E=_.datum(),k=!/^(n|s)$/.test(E)&&c,A=!/^(e|w)$/.test(E)&&l,N=_.classed("extent"),T=L(),q=mo.mouse(b),z=mo.select(_o).on("keydown.brush",u).on("keyup.brush",g);if(mo.event.changedTouches?z.on("touchmove.brush",v).on("touchend.brush",y):z.on("mousemove.brush",v).on("mouseup.brush",y),S.interrupt().selectAll("*").interrupt(),N)q[0]=s[0]-q[0],q[1]=h[0]-q[1];else if(E){var C=+/w$/.test(E),D=+/^n/.test(E);x=[s[1-C]-q[0],h[1-D]-q[1]],q[0]=s[C],q[1]=h[D]}else mo.event.altKey&&(M=q.slice());S.style("pointer-events","none").selectAll(".resize").style("display",null),mo.select("body").style("cursor",_.style("cursor")),w({type:"brushstart"}),v()}var i,o,a=g(n,"brushstart","brush","brushend"),c=null,l=null,s=[0,0],h=[0,0],p=!0,d=!0,v=$c[0];return n.event=function(n){n.each(function(){var n=a.of(this,arguments),t={x:s,y:h,i:i,j:o},e=this.__chart__||t;this.__chart__=t,Pc?mo.select(this).transition().each("start.brush",function(){i=e.i,o=e.j,s=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=kr(s,t.x),r=kr(h,t.y);return i=o=null,function(u){s=t.x=e(u),h=t.y=r(u),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){i=t.i,o=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,v=$c[!c<<1|!l],n):c},n.y=function(t){return arguments.length?(l=t,v=$c[!c<<1|!l],n):l},n.clamp=function(t){return arguments.length?(c&&l?(p=!!t[0],d=!!t[1]):c?p=!!t:l&&(d=!!t),n):c&&l?[p,d]:c?p:l?d:null},n.extent=function(t){var e,r,u,a,f;return arguments.length?(c&&(e=t[0],r=t[1],l&&(e=e[0],r=r[0]),i=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(f=e,e=r,r=f),(e!=s[0]||r!=s[1])&&(s=[e,r])),l&&(u=t[0],a=t[1],c&&(u=u[1],a=a[1]),o=[u,a],l.invert&&(u=l(u),a=l(a)),u>a&&(f=u,u=a,a=f),(u!=h[0]||a!=h[1])&&(h=[u,a])),n):(c&&(i?(e=i[0],r=i[1]):(e=s[0],r=s[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(f=e,e=r,r=f))),l&&(o?(u=o[0],a=o[1]):(u=h[0],a=h[1],l.invert&&(u=l.invert(u),a=l.invert(a)),u>a&&(f=u,u=a,a=f))),c&&l?[[e,u],[r,a]]:c?[e,r]:l&&[u,a])},n.clear=function(){return n.empty()||(s=[0,0],h=[0,0],i=o=null),n},n.empty=function(){return!!c&&s[0]==s[1]||!!l&&h[0]==h[1]},mo.rebind(n,a,"on")};var Xc={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},$c=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Bc=mo.time={},Wc=Date,Jc=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];zi.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){Gc.setUTCDate.apply(this._,arguments)},setDay:function(){Gc.setUTCDay.apply(this._,arguments)},setFullYear:function(){Gc.setUTCFullYear.apply(this._,arguments)},setHours:function(){Gc.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){Gc.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){Gc.setUTCMinutes.apply(this._,arguments)},setMonth:function(){Gc.setUTCMonth.apply(this._,arguments)},setSeconds:function(){Gc.setUTCSeconds.apply(this._,arguments)},setTime:function(){Gc.setTime.apply(this._,arguments)}};var Gc=Date.prototype,Kc="%a %b %e %X %Y",Qc="%m/%d/%Y",nl="%H:%M:%S",tl=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],el=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],rl=["January","February","March","April","May","June","July","August","September","October","November","December"],ul=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Bc.year=Ci(function(n){return n=Bc.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),Bc.years=Bc.year.range,Bc.years.utc=Bc.year.utc.range,Bc.day=Ci(function(n){var t=new Wc(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),Bc.days=Bc.day.range,Bc.days.utc=Bc.day.utc.range,Bc.dayOfYear=function(n){var t=Bc.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},Jc.forEach(function(n,t){n=n.toLowerCase(),t=7-t;var e=Bc[n]=Ci(function(n){return(n=Bc.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=Bc.year(n).getDay();return Math.floor((Bc.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});Bc[n+"s"]=e.range,Bc[n+"s"].utc=e.utc.range,Bc[n+"OfYear"]=function(n){var e=Bc.year(n).getDay();return Math.floor((Bc.dayOfYear(n)+(e+t)%7)/7)}}),Bc.week=Bc.sunday,Bc.weeks=Bc.sunday.range,Bc.weeks.utc=Bc.sunday.utc.range,Bc.weekOfYear=Bc.sundayOfYear,Bc.format=ji;var il=Hi(tl),ol=Fi(tl),al=Hi(el),cl=Fi(el),ll=Hi(rl),sl=Fi(rl),fl=Hi(ul),hl=Fi(ul),gl=/^%/,pl={"-":"",_:" ",0:"0"},dl={a:function(n){return el[n.getDay()]},A:function(n){return tl[n.getDay()]},b:function(n){return ul[n.getMonth()]},B:function(n){return rl[n.getMonth()]},c:ji(Kc),d:function(n,t){return Pi(n.getDate(),t,2)},e:function(n,t){return Pi(n.getDate(),t,2)},H:function(n,t){return Pi(n.getHours(),t,2)},I:function(n,t){return Pi(n.getHours()%12||12,t,2)},j:function(n,t){return Pi(1+Bc.dayOfYear(n),t,3)},L:function(n,t){return Pi(n.getMilliseconds(),t,3)},m:function(n,t){return Pi(n.getMonth()+1,t,2)},M:function(n,t){return Pi(n.getMinutes(),t,2)},p:function(n){return n.getHours()>=12?"PM":"AM"},S:function(n,t){return Pi(n.getSeconds(),t,2)},U:function(n,t){return Pi(Bc.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Pi(Bc.mondayOfYear(n),t,2)},x:ji(Qc),X:ji(nl),y:function(n,t){return Pi(n.getFullYear()%100,t,2)},Y:function(n,t){return Pi(n.getFullYear()%1e4,t,4)},Z:ao,"%":function(){return"%"}},vl={a:Oi,A:Ri,b:Zi,B:Vi,c:Xi,d:no,e:no,H:eo,I:eo,j:to,L:io,m:Qi,M:ro,p:oo,S:uo,U:Ii,w:Yi,W:Ui,x:$i,X:Bi,y:Ji,Y:Wi,Z:Gi,"%":co},ml=/^\s*\d+/,yl=mo.map({am:0,pm:1});ji.utc=lo;var Ml=lo("%Y-%m-%dT%H:%M:%S.%LZ");ji.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?so:Ml,so.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},so.toString=Ml.toString,Bc.second=Ci(function(n){return new Wc(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),Bc.seconds=Bc.second.range,Bc.seconds.utc=Bc.second.utc.range,Bc.minute=Ci(function(n){return new Wc(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),Bc.minutes=Bc.minute.range,Bc.minutes.utc=Bc.minute.utc.range,Bc.hour=Ci(function(n){var t=n.getTimezoneOffset()/60;return new Wc(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),Bc.hours=Bc.hour.range,Bc.hours.utc=Bc.hour.utc.range,Bc.month=Ci(function(n){return n=Bc.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),Bc.months=Bc.month.range,Bc.months.utc=Bc.month.utc.range;var xl=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],bl=[[Bc.second,1],[Bc.second,5],[Bc.second,15],[Bc.second,30],[Bc.minute,1],[Bc.minute,5],[Bc.minute,15],[Bc.minute,30],[Bc.hour,1],[Bc.hour,3],[Bc.hour,6],[Bc.hour,12],[Bc.day,1],[Bc.day,2],[Bc.week,1],[Bc.month,1],[Bc.month,3],[Bc.year,1]],_l=[[ji("%Y"),Vt],[ji("%B"),function(n){return n.getMonth()}],[ji("%b %d"),function(n){return 1!=n.getDate()}],[ji("%a %d"),function(n){return n.getDay()&&1!=n.getDate()}],[ji("%I %p"),function(n){return n.getHours()}],[ji("%I:%M"),function(n){return n.getMinutes()}],[ji(":%S"),function(n){return n.getSeconds()}],[ji(".%L"),function(n){return n.getMilliseconds()}]],wl=go(_l);bl.year=Bc.year,Bc.scale=function(){return fo(mo.scale.linear(),bl,wl)};var Sl={range:function(n,t,e){return mo.range(+n,+t,e).map(ho)}},El=bl.map(function(n){return[n[0].utc,n[1]]}),kl=[[lo("%Y"),Vt],[lo("%B"),function(n){return n.getUTCMonth()}],[lo("%b %d"),function(n){return 1!=n.getUTCDate()}],[lo("%a %d"),function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],[lo("%I %p"),function(n){return n.getUTCHours()}],[lo("%I:%M"),function(n){return n.getUTCMinutes()}],[lo(":%S"),function(n){return n.getUTCSeconds()}],[lo(".%L"),function(n){return n.getUTCMilliseconds()}]],Al=go(kl);return El.year=Bc.year.utc,Bc.scale.utc=function(){return fo(mo.scale.linear(),El,Al)},mo.text=vt(function(n){return n.responseText}),mo.json=function(n,t){return mt(n,"application/json",po,t)},mo.html=function(n,t){return mt(n,"text/html",vo,t)},mo.xml=vt(function(n){return n.responseXML}),mo}();
	    // end d3 source
	    return d3;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(8);

	d3Heatmap.$inject = ['d3'];
	module.exports = d3Heatmap;

	function d3Heatmap(d3) {
	    return {
	        restrict: 'EA',
	        scope: {
	            data: '=', // binding to an angular object
	            width: '@', // static binding to a value
	            height: '@',
	            labels: '=',
	            factions: '='
	        },
	        link: function link(scope, iElement, iAttrs) {
	            var svg = d3.select(iElement[0]).append("svg");

	            // use auto scaling for width
	            if (scope.width == undefined) {
	                svg.style("width", "100%");
	            }

	            // on window resize, re-render d3 canvas
	            window.onresize = function () {
	                return scope.$apply();
	            };
	            scope.$watch(function () {
	                return angular.element(window)[0].innerWidth;
	            }, function () {
	                return scope.render();
	            });

	            // watch for data changes and re-render
	            scope.$watch('data', function (newVals, oldVals) {
	                return scope.render(newVals);
	            }, true);

	            // define render function
	            scope.render = function () {
	                drawHeatmap(d3, svg, scope, iElement, iAttrs);
	            };
	        }
	    };
	}

	var drawHeatmap = function drawHeatmap(d3, svg, scope, iElement, iAttrs) {
	    svg.selectAll("*").remove();

	    if (scope.data == undefined) {
	        return;
	    }

	    var height = scope.height,
	        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
	        translator = scope.labels,
	        factions = scope.factions,
	        dataset = _.sortBy(scope.data, function (x) {
	        return x.order;
	    });

	    svg.attr("width", width).attr("height", height);

	    var margin = { top: 100, bottom: 30, left: 110, right: 30 };

	    var labelPadding = 10,
	        yBottom = height - margin.bottom,
	        yTop = margin.top,
	        xLeft = margin.left,
	        xRight = width - margin.right,
	        chartHeight = yBottom - yTop,
	        chartWidth = xRight - xLeft;

	    var yScale = d3.scale.ordinal().domain(factions.map(function (x) {
	        return x;
	    })).rangeRoundBands([yTop, yBottom], .0);

	    var xScale = d3.scale.ordinal().domain(factions.map(function (x) {
	        return x;
	    })).rangeRoundBands([0, chartWidth], 0);

	    var rows = svg.selectAll("g").data(dataset).enter().append("g").attr("transform", function (d, i) {
	        var y = yScale(i);
	        return "translate(" + xLeft + "," + y + ")";
	    });

	    var cells = rows.selectAll("g").data(function (d) {
	        return d;
	    }).enter().append("g").attr("transform", function (d, i) {
	        var x = xScale(i);
	        return "translate(" + x + ",0)";
	    });

	    cells.append("rect").attr("width", xScale.rangeBand()).attr("height", yScale.rangeBand()).attr("class", function (d, i) {
	        if (d.length == 0) {
	            // when a color plays itself
	            if (factions[i] == "nomads" || factions[i] == "fakirs") {
	                return "yellow-cell";
	            } else if (factions[i] == "chaosmagicians" || factions[i] == "giants") {
	                return "red-cell";
	            } else if (factions[i] == "engineers" || factions[i] == "dwarves") {
	                return "gray-cell";
	            } else if (factions[i] == "swarmlings" || factions[i] == "mermaids") {
	                return "blue-cell";
	            } else if (factions[i] == "darklings" || factions[i] == "alchemists") {
	                return "black-cell";
	            } else if (factions[i] == "cultists" || factions[i] == "halflings") {
	                return "brown-cell";
	            } else if (factions[i] == "witches" || factions[i] == "auren") {
	                return "green-cell";
	            }
	        } else if (d == "-") {
	            return "neutral";
	        } else if (d > 50) {
	            return "positive-cell";
	        } else if (d < 50) {
	            return "negative-cell";
	        } else {
	            return "neutral";
	        }
	    }).attr("style", function (d) {
	        // if positive, the closer to 100, the darker (50 is white)
	        // if negative, the closer to 0, the darker (50 is white)
	        // we add .2 to move values close to 50 to either cooler faster,
	        // this also makes the darkest color happen at 80 or 20, which is okay
	        if (d > 50) {
	            return "fill-opacity: " + ((d - 50) / 50 + .2);
	        } else if (d < 50) {
	            return "fill-opacity: " + ((50 - d) / 50 + .2);
	        } else {
	            return "";
	        }
	    });

	    cells.append("text").text(function (d) {
	        return d;
	    }).attr("y", yScale.rangeBand() / 2 + 1) // +2 moves it down a bit
	    .attr("x", xScale.rangeBand() / 2).attr("class", "cell-text");

	    var dividers = svg.selectAll(".col-divider").data(factions).enter().append("line").attr("x1", function (d, i) {
	        if (i % 2 == 0) {
	            // left side
	            return xScale(i) + xLeft + 0;
	        } else {
	            // right side
	            return xScale(i) + xScale.rangeBand() + xLeft - 0;
	        }
	    }).attr("x2", function (d, i) {
	        if (i % 2 == 0) {
	            // left side
	            return xScale(i) + xLeft + 0;
	        } else {
	            // right side
	            return xScale(i) + xScale.rangeBand() + xLeft - 0;
	        }
	    }).attr("y1", yTop).attr("y2", yBottom).attr("class", "col-divider");

	    var dividers = svg.selectAll(".row-divider").data(factions).enter().append("line").attr("x1", xLeft).attr("x2", xRight).attr("y1", function (d, i) {
	        if (i % 2 == 0) {
	            // top
	            return yScale(i) + 0;
	        } else {
	            // right side
	            return yScale(i) + yScale.rangeBand() - 0;
	        }
	    }).attr("y2", function (d, i) {
	        if (i % 2 == 0) {
	            // top
	            return yScale(i) + 0;
	        } else {
	            // right side
	            return yScale(i) + yScale.rangeBand() - 0;
	        }
	    }).attr("class", "row-divider");

	    // labels
	    var leftLabels = svg.selectAll(".left-label").data(factions).enter().append("text").text(function (d) {
	        return translator(d);
	    }).attr('x', 0).attr('y', function (d) {
	        return yScale(d) + yScale.rangeBand() / 2 + 1;
	    }).attr("class", "row-header");

	    var topLabels = svg.selectAll(".top-label").data(factions).enter().append("g").attr("transform", function (d) {
	        var y = margin.top;
	        var x = xScale(d) + xScale.rangeBand() / 2 + margin.left;
	        return "translate(" + x + "," + y + ")";
	    }).attr("class", "top-label").append("text").text(function (d) {
	        return translator(d);
	    }).attr("class", "column-header").attr("transform", function (d) {
	        return "rotate(-70)";
	    });
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(8);

	d3Histogram.$inject = ['d3'];
	module.exports = d3Histogram;

	function d3Histogram(d3) {
	    return {
	        restrict: 'EA',
	        scope: {
	            data: '=', // binding to an angular object
	            width: '@', // static binding to a value
	            height: '@',
	            labels: '='
	        },
	        link: function link(scope, iElement, iAttrs) {
	            var svg = d3.select(iElement[0]).append("svg");

	            // use auto scaling for width
	            if (scope.width == undefined) {
	                svg.style("width", "100%");
	            }

	            // on window resize, re-render d3 canvas
	            window.onresize = function () {
	                return scope.$apply();
	            };
	            scope.$watch(function () {
	                return angular.element(window)[0].innerWidth;
	            }, function () {
	                return scope.render();
	            });

	            // watch for data changes and re-render
	            scope.$watch('data', function (newVals, oldVals) {
	                return scope.render(newVals);
	            }, true);

	            // define render function
	            scope.render = function () {
	                drawHistogram(d3, svg, scope, iElement, iAttrs);
	            };
	        }
	    };
	}

	var drawHistogram = function drawHistogram(d3, svg, scope, iElement, iAttrs) {
	    svg.selectAll("*").remove();

	    if (scope.data == undefined) {
	        return;
	    }

	    var height = scope.height,
	        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
	        translator = scope.labels,
	        dataset = _.sortBy(scope.data, function (x) {
	        return x.order;
	    });

	    svg.attr("width", width).attr("height", height);

	    var margin = { top: 30, bottom: 30, left: 30, right: 30 };

	    var labelPadding = 10,
	        yBottom = height - margin.bottom,
	        yTop = margin.top,
	        xLeft = margin.left,
	        xRight = width - margin.right,
	        chartHeight = yBottom - yTop;

	    // var bars = dataset.map(function(d) { return d.key; });

	    var xScale = d3.scale.ordinal().domain(dataset.map(function (x) {
	        return x.key;
	    })).rangeRoundBands([xLeft, xRight], .1);

	    var yScale = d3.scale.linear().domain([0, d3.max(dataset, function (d) {
	        return d.value;
	    })]).range([0, chartHeight]);

	    var barGroups = svg.selectAll("g").data(dataset).enter().append("g").attr("transform", function (d) {
	        var x = xScale(d.key);
	        return "translate(" + x + "," + yTop + ")";
	    });

	    barGroups.append("rect").attr("width", xScale.rangeBand()).attr("height", function (d) {
	        return yScale(d.value);
	    }).attr("y", function (d) {
	        return chartHeight - yScale(d.value);
	    }).attr("class", "bar");

	    barGroups.append("text").attr("x", xScale.rangeBand() / 2).attr("y", function (d) {
	        return chartHeight - yScale(d.value) - labelPadding;
	    }).text(function (d) {
	        return d.value;
	    }).attr("class", "bar-label");

	    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	    svg.append("g").attr("class", "axis").attr("transform", "translate(0," + yBottom + ")").call(xAxis).selectAll("text");
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ = __webpack_require__(8);

	d3Scoregraph.$inject = ['d3'];
	module.exports = d3Scoregraph;

	function d3Scoregraph(d3) {
	    return {
	        restrict: 'EA',
	        scope: {
	            data: '=', // binding to an angular object
	            width: '@', // static binding to a value
	            height: '@',
	            ordering: '=',
	            labels: '='
	        },
	        link: function link(scope, iElement, iAttrs) {
	            var svg = d3.select(iElement[0]).append("svg");

	            // use auto scaling for width
	            if (scope.width == undefined) {
	                svg.style("width", "100%");
	            }

	            // on window resize, re-render d3 canvas
	            window.onresize = function () {
	                return scope.$apply();
	            };
	            scope.$watch(function () {
	                return angular.element(window)[0].innerWidth;
	            }, function () {
	                return scope.render();
	            });

	            // watch for data changes and re-render
	            scope.$watch('data', function (newVals, oldVals) {
	                return scope.render(newVals);
	            }, true);

	            // define render function
	            scope.render = function () {
	                drawScoregraph(d3, svg, scope, iElement, iAttrs);
	            };
	        }
	    };
	}

	var drawScoregraph = function drawScoregraph(d3, svg, scope, iElement, iAttrs) {
	    svg.selectAll("*").remove();

	    if (scope.data == undefined) {
	        return;
	    }

	    var height = scope.height,
	        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
	        translator = scope.labels;

	    var barOrdering;
	    if (scope.ordering) {
	        barOrdering = scope.ordering.map(function (d) {
	            return translator(d);
	        });
	    } else {
	        barOrdering = dataset.map(function (d) {
	            return translator(d.key);
	        });
	    }

	    var factionNames = _.map(scope.data, function (f) {
	        return f.faction;
	    });

	    var dataset = [];
	    var scorecards = scope.data;
	    // build keys
	    var allKeys = {};
	    for (var i = 0; i < scorecards.length; i++) {
	        var keys = _.keys(scorecards[i].simple);
	        for (var j = 0; j < keys.length; j++) {
	            allKeys[keys[j]] = 0;
	        }
	    }
	    var cols = _.keys(allKeys);

	    for (var i = 0; i < cols.length; i++) {
	        var col = cols[i];
	        if (_.contains(scope.ordering, col)) {
	            var arr = [];
	            for (var j = 0; j < scorecards.length; j++) {
	                var sc = scorecards[j];
	                arr.push({ faction: sc.faction, points: sc.simple[col] || 0 });
	            }
	            dataset.push({ source: col, factions: arr });
	        }
	    }

	    svg.attr("width", width).attr("height", height);

	    var margin = { top: 30, bottom: 30, left: 100, right: 30 };

	    var barPadding = 5,
	        oneLetterWidth = 15,
	        // magic number, chosen from experience
	    shortBarWidth = oneLetterWidth + 2 * barPadding,
	        yBottom = height - margin.bottom,
	        yTop = margin.top,
	        xLeft = margin.left,
	        xRight = width - margin.right,
	        textPadding = 5;

	    // some numbers can be negative (e.g. leech). We'll take the absolute value
	    // of all numbers for building the graphs, and use color styling to mark
	    // these as negative

	    var yScale = d3.scale.ordinal().domain(barOrdering).rangeRoundBands([yTop, yBottom], .1);

	    var yScaleInner = d3.scale.ordinal().domain(factionNames).rangeRoundBands([0, yScale.rangeBand()], .1);

	    var largestValue = d3.max(dataset, function (f) {
	        return d3.max(f.factions, function (d) {
	            return Math.abs(d.points);
	        });
	    });

	    var xScale = d3.scale.linear().domain([0, largestValue]).range([0, xRight - xLeft]);

	    var barGroup = svg.selectAll("g").data(dataset).enter().append("g").attr("transform", function (d, i) {
	        var y = yScale(translator(d.source));
	        return "translate(" + xLeft + "," + y + ")";
	    })
	    // setting width/height on a group doesn't do anything as far as i can tell
	    .attr("height", yScale.rangeBand()).attr("width", xRight - xLeft);

	    var bars = barGroup.selectAll("g").data(function (d) {
	        return d.factions;
	    }).enter().append("g");

	    bars.append("rect").attr("width", function (d) {
	        return xScale(Math.abs(d.points));
	    }).attr("height", function (d) {
	        return yScaleInner.rangeBand();
	    }).attr("y", function (d) {
	        return yScaleInner(d.faction);
	    }).attr("class", function (d) {
	        if (d.faction.toUpperCase() == "CULTISTS" || d.faction.toUpperCase() == "HALFLINGS") {
	            if (d.points >= 0) {
	                return "bar-brown";
	            } else {
	                return "bar-brown-negative";
	            }
	        } else if (d.faction.toUpperCase() == "ENGINEERS" || d.faction.toUpperCase() == "DWARVES") {
	            if (d.points >= 0) {
	                return "bar-gray";
	            } else {
	                return "bar-gray-negative";
	            }
	        } else if (d.faction.toUpperCase() == "GIANTS" || d.faction.toUpperCase() == "CHAOSMAGICIANS") {
	            if (d.points >= 0) {
	                return "bar-red";
	            } else {
	                return "bar-red-negative";
	            }
	        } else if (d.faction.toUpperCase() == "MERMAIDS" || d.faction.toUpperCase() == "SWARMLINGS") {
	            if (d.points >= 0) {
	                return "bar-blue";
	            } else {
	                return "bar-blue-negative";
	            }
	        } else if (d.faction.toUpperCase() == "WITCHES" || d.faction.toUpperCase() == "AUREN") {
	            if (d.points >= 0) {
	                return "bar-green";
	            } else {
	                return "bar-green-negative";
	            }
	        } else if (d.faction.toUpperCase() == "NOMADS" || d.faction.toUpperCase() == "FAKIRS") {
	            if (d.points >= 0) {
	                return "bar-yellow";
	            } else {
	                return "bar-yellow-negative";
	            }
	        } else if (d.faction.toUpperCase() == "DARKLINGS" || d.faction.toUpperCase() == "ALCHEMISTS") {
	            if (d.points >= 0) {
	                return "bar-black";
	            } else {
	                return "bar-black-negative";
	            }
	        } else if (d.faction.toUpperCase() == "ICEMAIDENS" || d.faction.toUpperCase() == "YETIS") {
	            if (d.points >= 0) {
	                return "bar-ice";
	            } else {
	                return "bar-ice-negative";
	            }
	        } else if (d.faction.toUpperCase() == "ACOLYTES" || d.faction.toUpperCase() == "DRAGONLORDS") {
	            if (d.points >= 0) {
	                return "bar-volcano";
	            } else {
	                return "bar-volcano-negative";
	            }
	        } else if (d.faction.toUpperCase() == "SHAPESHIFTERS" || d.faction.toUpperCase() == "RIVERWALKERS") {
	            if (d.points >= 0) {
	                return "bar-variable";
	            } else {
	                return "bar-variable-negative";
	            }
	        }
	        // there shouldn't be another else
	    });

	    // score amount
	    bars.append("text").attr("x", function (d) {
	        return xScale(Math.abs(d.points)) + 5;
	    }).attr("y", function (d) {
	        // +1 to move it down a bit
	        return yScaleInner(d.faction) + yScaleInner.rangeBand() / 2 + 1;
	    }).text(function (d) {
	        return d.points;
	    }).attr("class", "bar-label");

	    // faction names
	    function clipText(d) {
	        var self = d3.select(this),
	            textLength = self.node().getComputedTextLength(),
	            text = self.text();
	        while (textLength > self.attr('width') && text.length > 0) {
	            text = text.slice(0, -1);
	            self.text(text);
	            textLength = self.node().getComputedTextLength();
	        }
	    }

	    // IF the bar is long enough to fit at least 1 letter, paint the faction name
	    // on top of the bar
	    // ELSE paint the faction name on the right side of the score label
	    bars.append("text").attr("x", function (d) {
	        var barWidth = xScale(Math.abs(d.points));
	        if (barWidth >= shortBarWidth) {
	            return barPadding;
	        } else {
	            // it's a short bar, paint beside the number
	            return barWidth + 22; // magic number
	        }
	    }).attr("y", function (d) {
	        // +1 to move it down a bit
	        return yScaleInner(d.faction) + yScaleInner.rangeBand() / 2 + 1;
	    }).attr("width", function (d) {
	        var barWidth = xScale(Math.abs(d.points));
	        if (barWidth >= shortBarWidth) {
	            return barWidth - 2 * barPadding;
	        } else {
	            return width; // paint all, it's on the right side of the number
	        }
	    }).text(function (d) {
	        return translator(d.faction);
	    }).attr("class", function (d) {
	        var barWidth = xScale(Math.abs(d.points));
	        // a long bar, that's black (>0 points and darklings/alchemists)
	        if (barWidth >= shortBarWidth && d.points > 0 && (d.faction.toUpperCase() == "DARKLINGS" || d.faction.toUpperCase() == "ALCHEMISTS")) {
	            return "bar-label-inverse";
	        } else {
	            return "bar-label";
	        }
	    }).each(clipText);

	    var yAxis = d3.svg.axis().scale(yScale).orient("left");

	    svg.append("g").attr("class", "axis").attr("transform", "translate(" + xLeft + ",0)").call(yAxis).selectAll("text");
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
	__webpack_require__(20)
	__webpack_require__(21)
	__webpack_require__(22)
	__webpack_require__(23)
	__webpack_require__(24)
	__webpack_require__(25)
	__webpack_require__(26)
	__webpack_require__(27)
	__webpack_require__(28)
	__webpack_require__(29)
	__webpack_require__(30)
	__webpack_require__(31)

/***/ },
/* 20 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: transition.js v3.3.6
	 * http://getbootstrap.com/javascript/#transitions
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
	  // ============================================================

	  function transitionEnd() {
	    var el = document.createElement('bootstrap')

	    var transEndEventNames = {
	      WebkitTransition : 'webkitTransitionEnd',
	      MozTransition    : 'transitionend',
	      OTransition      : 'oTransitionEnd otransitionend',
	      transition       : 'transitionend'
	    }

	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] }
	      }
	    }

	    return false // explicit for ie8 (  ._.)
	  }

	  // http://blog.alexmaccaw.com/css-transitions
	  $.fn.emulateTransitionEnd = function (duration) {
	    var called = false
	    var $el = this
	    $(this).one('bsTransitionEnd', function () { called = true })
	    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
	    setTimeout(callback, duration)
	    return this
	  }

	  $(function () {
	    $.support.transition = transitionEnd()

	    if (!$.support.transition) return

	    $.event.special.bsTransitionEnd = {
	      bindType: $.support.transition.end,
	      delegateType: $.support.transition.end,
	      handle: function (e) {
	        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
	      }
	    }
	  })

	}(jQuery);


/***/ },
/* 21 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: alert.js v3.3.6
	 * http://getbootstrap.com/javascript/#alerts
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // ALERT CLASS DEFINITION
	  // ======================

	  var dismiss = '[data-dismiss="alert"]'
	  var Alert   = function (el) {
	    $(el).on('click', dismiss, this.close)
	  }

	  Alert.VERSION = '3.3.6'

	  Alert.TRANSITION_DURATION = 150

	  Alert.prototype.close = function (e) {
	    var $this    = $(this)
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = $(selector)

	    if (e) e.preventDefault()

	    if (!$parent.length) {
	      $parent = $this.closest('.alert')
	    }

	    $parent.trigger(e = $.Event('close.bs.alert'))

	    if (e.isDefaultPrevented()) return

	    $parent.removeClass('in')

	    function removeElement() {
	      // detach from parent, fire event then clean up data
	      $parent.detach().trigger('closed.bs.alert').remove()
	    }

	    $.support.transition && $parent.hasClass('fade') ?
	      $parent
	        .one('bsTransitionEnd', removeElement)
	        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
	      removeElement()
	  }


	  // ALERT PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.alert')

	      if (!data) $this.data('bs.alert', (data = new Alert(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.alert

	  $.fn.alert             = Plugin
	  $.fn.alert.Constructor = Alert


	  // ALERT NO CONFLICT
	  // =================

	  $.fn.alert.noConflict = function () {
	    $.fn.alert = old
	    return this
	  }


	  // ALERT DATA-API
	  // ==============

	  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

	}(jQuery);


/***/ },
/* 22 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: button.js v3.3.6
	 * http://getbootstrap.com/javascript/#buttons
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // BUTTON PUBLIC CLASS DEFINITION
	  // ==============================

	  var Button = function (element, options) {
	    this.$element  = $(element)
	    this.options   = $.extend({}, Button.DEFAULTS, options)
	    this.isLoading = false
	  }

	  Button.VERSION  = '3.3.6'

	  Button.DEFAULTS = {
	    loadingText: 'loading...'
	  }

	  Button.prototype.setState = function (state) {
	    var d    = 'disabled'
	    var $el  = this.$element
	    var val  = $el.is('input') ? 'val' : 'html'
	    var data = $el.data()

	    state += 'Text'

	    if (data.resetText == null) $el.data('resetText', $el[val]())

	    // push to event loop to allow forms to submit
	    setTimeout($.proxy(function () {
	      $el[val](data[state] == null ? this.options[state] : data[state])

	      if (state == 'loadingText') {
	        this.isLoading = true
	        $el.addClass(d).attr(d, d)
	      } else if (this.isLoading) {
	        this.isLoading = false
	        $el.removeClass(d).removeAttr(d)
	      }
	    }, this), 0)
	  }

	  Button.prototype.toggle = function () {
	    var changed = true
	    var $parent = this.$element.closest('[data-toggle="buttons"]')

	    if ($parent.length) {
	      var $input = this.$element.find('input')
	      if ($input.prop('type') == 'radio') {
	        if ($input.prop('checked')) changed = false
	        $parent.find('.active').removeClass('active')
	        this.$element.addClass('active')
	      } else if ($input.prop('type') == 'checkbox') {
	        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
	        this.$element.toggleClass('active')
	      }
	      $input.prop('checked', this.$element.hasClass('active'))
	      if (changed) $input.trigger('change')
	    } else {
	      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
	      this.$element.toggleClass('active')
	    }
	  }


	  // BUTTON PLUGIN DEFINITION
	  // ========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.button')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.button', (data = new Button(this, options)))

	      if (option == 'toggle') data.toggle()
	      else if (option) data.setState(option)
	    })
	  }

	  var old = $.fn.button

	  $.fn.button             = Plugin
	  $.fn.button.Constructor = Button


	  // BUTTON NO CONFLICT
	  // ==================

	  $.fn.button.noConflict = function () {
	    $.fn.button = old
	    return this
	  }


	  // BUTTON DATA-API
	  // ===============

	  $(document)
	    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      var $btn = $(e.target)
	      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
	      Plugin.call($btn, 'toggle')
	      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
	    })
	    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
	      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
	    })

	}(jQuery);


/***/ },
/* 23 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: carousel.js v3.3.6
	 * http://getbootstrap.com/javascript/#carousel
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // CAROUSEL CLASS DEFINITION
	  // =========================

	  var Carousel = function (element, options) {
	    this.$element    = $(element)
	    this.$indicators = this.$element.find('.carousel-indicators')
	    this.options     = options
	    this.paused      = null
	    this.sliding     = null
	    this.interval    = null
	    this.$active     = null
	    this.$items      = null

	    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

	    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
	      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
	      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
	  }

	  Carousel.VERSION  = '3.3.6'

	  Carousel.TRANSITION_DURATION = 600

	  Carousel.DEFAULTS = {
	    interval: 5000,
	    pause: 'hover',
	    wrap: true,
	    keyboard: true
	  }

	  Carousel.prototype.keydown = function (e) {
	    if (/input|textarea/i.test(e.target.tagName)) return
	    switch (e.which) {
	      case 37: this.prev(); break
	      case 39: this.next(); break
	      default: return
	    }

	    e.preventDefault()
	  }

	  Carousel.prototype.cycle = function (e) {
	    e || (this.paused = false)

	    this.interval && clearInterval(this.interval)

	    this.options.interval
	      && !this.paused
	      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

	    return this
	  }

	  Carousel.prototype.getItemIndex = function (item) {
	    this.$items = item.parent().children('.item')
	    return this.$items.index(item || this.$active)
	  }

	  Carousel.prototype.getItemForDirection = function (direction, active) {
	    var activeIndex = this.getItemIndex(active)
	    var willWrap = (direction == 'prev' && activeIndex === 0)
	                || (direction == 'next' && activeIndex == (this.$items.length - 1))
	    if (willWrap && !this.options.wrap) return active
	    var delta = direction == 'prev' ? -1 : 1
	    var itemIndex = (activeIndex + delta) % this.$items.length
	    return this.$items.eq(itemIndex)
	  }

	  Carousel.prototype.to = function (pos) {
	    var that        = this
	    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

	    if (pos > (this.$items.length - 1) || pos < 0) return

	    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
	    if (activeIndex == pos) return this.pause().cycle()

	    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
	  }

	  Carousel.prototype.pause = function (e) {
	    e || (this.paused = true)

	    if (this.$element.find('.next, .prev').length && $.support.transition) {
	      this.$element.trigger($.support.transition.end)
	      this.cycle(true)
	    }

	    this.interval = clearInterval(this.interval)

	    return this
	  }

	  Carousel.prototype.next = function () {
	    if (this.sliding) return
	    return this.slide('next')
	  }

	  Carousel.prototype.prev = function () {
	    if (this.sliding) return
	    return this.slide('prev')
	  }

	  Carousel.prototype.slide = function (type, next) {
	    var $active   = this.$element.find('.item.active')
	    var $next     = next || this.getItemForDirection(type, $active)
	    var isCycling = this.interval
	    var direction = type == 'next' ? 'left' : 'right'
	    var that      = this

	    if ($next.hasClass('active')) return (this.sliding = false)

	    var relatedTarget = $next[0]
	    var slideEvent = $.Event('slide.bs.carousel', {
	      relatedTarget: relatedTarget,
	      direction: direction
	    })
	    this.$element.trigger(slideEvent)
	    if (slideEvent.isDefaultPrevented()) return

	    this.sliding = true

	    isCycling && this.pause()

	    if (this.$indicators.length) {
	      this.$indicators.find('.active').removeClass('active')
	      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
	      $nextIndicator && $nextIndicator.addClass('active')
	    }

	    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
	    if ($.support.transition && this.$element.hasClass('slide')) {
	      $next.addClass(type)
	      $next[0].offsetWidth // force reflow
	      $active.addClass(direction)
	      $next.addClass(direction)
	      $active
	        .one('bsTransitionEnd', function () {
	          $next.removeClass([type, direction].join(' ')).addClass('active')
	          $active.removeClass(['active', direction].join(' '))
	          that.sliding = false
	          setTimeout(function () {
	            that.$element.trigger(slidEvent)
	          }, 0)
	        })
	        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
	    } else {
	      $active.removeClass('active')
	      $next.addClass('active')
	      this.sliding = false
	      this.$element.trigger(slidEvent)
	    }

	    isCycling && this.cycle()

	    return this
	  }


	  // CAROUSEL PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.carousel')
	      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
	      var action  = typeof option == 'string' ? option : options.slide

	      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
	      if (typeof option == 'number') data.to(option)
	      else if (action) data[action]()
	      else if (options.interval) data.pause().cycle()
	    })
	  }

	  var old = $.fn.carousel

	  $.fn.carousel             = Plugin
	  $.fn.carousel.Constructor = Carousel


	  // CAROUSEL NO CONFLICT
	  // ====================

	  $.fn.carousel.noConflict = function () {
	    $.fn.carousel = old
	    return this
	  }


	  // CAROUSEL DATA-API
	  // =================

	  var clickHandler = function (e) {
	    var href
	    var $this   = $(this)
	    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
	    if (!$target.hasClass('carousel')) return
	    var options = $.extend({}, $target.data(), $this.data())
	    var slideIndex = $this.attr('data-slide-to')
	    if (slideIndex) options.interval = false

	    Plugin.call($target, options)

	    if (slideIndex) {
	      $target.data('bs.carousel').to(slideIndex)
	    }

	    e.preventDefault()
	  }

	  $(document)
	    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
	    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

	  $(window).on('load', function () {
	    $('[data-ride="carousel"]').each(function () {
	      var $carousel = $(this)
	      Plugin.call($carousel, $carousel.data())
	    })
	  })

	}(jQuery);


/***/ },
/* 24 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: collapse.js v3.3.6
	 * http://getbootstrap.com/javascript/#collapse
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // COLLAPSE PUBLIC CLASS DEFINITION
	  // ================================

	  var Collapse = function (element, options) {
	    this.$element      = $(element)
	    this.options       = $.extend({}, Collapse.DEFAULTS, options)
	    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
	                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
	    this.transitioning = null

	    if (this.options.parent) {
	      this.$parent = this.getParent()
	    } else {
	      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
	    }

	    if (this.options.toggle) this.toggle()
	  }

	  Collapse.VERSION  = '3.3.6'

	  Collapse.TRANSITION_DURATION = 350

	  Collapse.DEFAULTS = {
	    toggle: true
	  }

	  Collapse.prototype.dimension = function () {
	    var hasWidth = this.$element.hasClass('width')
	    return hasWidth ? 'width' : 'height'
	  }

	  Collapse.prototype.show = function () {
	    if (this.transitioning || this.$element.hasClass('in')) return

	    var activesData
	    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

	    if (actives && actives.length) {
	      activesData = actives.data('bs.collapse')
	      if (activesData && activesData.transitioning) return
	    }

	    var startEvent = $.Event('show.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    if (actives && actives.length) {
	      Plugin.call(actives, 'hide')
	      activesData || actives.data('bs.collapse', null)
	    }

	    var dimension = this.dimension()

	    this.$element
	      .removeClass('collapse')
	      .addClass('collapsing')[dimension](0)
	      .attr('aria-expanded', true)

	    this.$trigger
	      .removeClass('collapsed')
	      .attr('aria-expanded', true)

	    this.transitioning = 1

	    var complete = function () {
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse in')[dimension]('')
	      this.transitioning = 0
	      this.$element
	        .trigger('shown.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

	    this.$element
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
	  }

	  Collapse.prototype.hide = function () {
	    if (this.transitioning || !this.$element.hasClass('in')) return

	    var startEvent = $.Event('hide.bs.collapse')
	    this.$element.trigger(startEvent)
	    if (startEvent.isDefaultPrevented()) return

	    var dimension = this.dimension()

	    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

	    this.$element
	      .addClass('collapsing')
	      .removeClass('collapse in')
	      .attr('aria-expanded', false)

	    this.$trigger
	      .addClass('collapsed')
	      .attr('aria-expanded', false)

	    this.transitioning = 1

	    var complete = function () {
	      this.transitioning = 0
	      this.$element
	        .removeClass('collapsing')
	        .addClass('collapse')
	        .trigger('hidden.bs.collapse')
	    }

	    if (!$.support.transition) return complete.call(this)

	    this.$element
	      [dimension](0)
	      .one('bsTransitionEnd', $.proxy(complete, this))
	      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
	  }

	  Collapse.prototype.toggle = function () {
	    this[this.$element.hasClass('in') ? 'hide' : 'show']()
	  }

	  Collapse.prototype.getParent = function () {
	    return $(this.options.parent)
	      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
	      .each($.proxy(function (i, element) {
	        var $element = $(element)
	        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
	      }, this))
	      .end()
	  }

	  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
	    var isOpen = $element.hasClass('in')

	    $element.attr('aria-expanded', isOpen)
	    $trigger
	      .toggleClass('collapsed', !isOpen)
	      .attr('aria-expanded', isOpen)
	  }

	  function getTargetFromTrigger($trigger) {
	    var href
	    var target = $trigger.attr('data-target')
	      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

	    return $(target)
	  }


	  // COLLAPSE PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.collapse')
	      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
	      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.collapse

	  $.fn.collapse             = Plugin
	  $.fn.collapse.Constructor = Collapse


	  // COLLAPSE NO CONFLICT
	  // ====================

	  $.fn.collapse.noConflict = function () {
	    $.fn.collapse = old
	    return this
	  }


	  // COLLAPSE DATA-API
	  // =================

	  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
	    var $this   = $(this)

	    if (!$this.attr('data-target')) e.preventDefault()

	    var $target = getTargetFromTrigger($this)
	    var data    = $target.data('bs.collapse')
	    var option  = data ? 'toggle' : $this.data()

	    Plugin.call($target, option)
	  })

	}(jQuery);


/***/ },
/* 25 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: dropdown.js v3.3.6
	 * http://getbootstrap.com/javascript/#dropdowns
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // DROPDOWN CLASS DEFINITION
	  // =========================

	  var backdrop = '.dropdown-backdrop'
	  var toggle   = '[data-toggle="dropdown"]'
	  var Dropdown = function (element) {
	    $(element).on('click.bs.dropdown', this.toggle)
	  }

	  Dropdown.VERSION = '3.3.6'

	  function getParent($this) {
	    var selector = $this.attr('data-target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    var $parent = selector && $(selector)

	    return $parent && $parent.length ? $parent : $this.parent()
	  }

	  function clearMenus(e) {
	    if (e && e.which === 3) return
	    $(backdrop).remove()
	    $(toggle).each(function () {
	      var $this         = $(this)
	      var $parent       = getParent($this)
	      var relatedTarget = { relatedTarget: this }

	      if (!$parent.hasClass('open')) return

	      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

	      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this.attr('aria-expanded', 'false')
	      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
	    })
	  }

	  Dropdown.prototype.toggle = function (e) {
	    var $this = $(this)

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    clearMenus()

	    if (!isActive) {
	      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
	        // if mobile we use a backdrop because click events don't delegate
	        $(document.createElement('div'))
	          .addClass('dropdown-backdrop')
	          .insertAfter($(this))
	          .on('click', clearMenus)
	      }

	      var relatedTarget = { relatedTarget: this }
	      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

	      if (e.isDefaultPrevented()) return

	      $this
	        .trigger('focus')
	        .attr('aria-expanded', 'true')

	      $parent
	        .toggleClass('open')
	        .trigger($.Event('shown.bs.dropdown', relatedTarget))
	    }

	    return false
	  }

	  Dropdown.prototype.keydown = function (e) {
	    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

	    var $this = $(this)

	    e.preventDefault()
	    e.stopPropagation()

	    if ($this.is('.disabled, :disabled')) return

	    var $parent  = getParent($this)
	    var isActive = $parent.hasClass('open')

	    if (!isActive && e.which != 27 || isActive && e.which == 27) {
	      if (e.which == 27) $parent.find(toggle).trigger('focus')
	      return $this.trigger('click')
	    }

	    var desc = ' li:not(.disabled):visible a'
	    var $items = $parent.find('.dropdown-menu' + desc)

	    if (!$items.length) return

	    var index = $items.index(e.target)

	    if (e.which == 38 && index > 0)                 index--         // up
	    if (e.which == 40 && index < $items.length - 1) index++         // down
	    if (!~index)                                    index = 0

	    $items.eq(index).trigger('focus')
	  }


	  // DROPDOWN PLUGIN DEFINITION
	  // ==========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.dropdown')

	      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
	      if (typeof option == 'string') data[option].call($this)
	    })
	  }

	  var old = $.fn.dropdown

	  $.fn.dropdown             = Plugin
	  $.fn.dropdown.Constructor = Dropdown


	  // DROPDOWN NO CONFLICT
	  // ====================

	  $.fn.dropdown.noConflict = function () {
	    $.fn.dropdown = old
	    return this
	  }


	  // APPLY TO STANDARD DROPDOWN ELEMENTS
	  // ===================================

	  $(document)
	    .on('click.bs.dropdown.data-api', clearMenus)
	    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
	    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
	    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
	    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

	}(jQuery);


/***/ },
/* 26 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: modal.js v3.3.6
	 * http://getbootstrap.com/javascript/#modals
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // MODAL CLASS DEFINITION
	  // ======================

	  var Modal = function (element, options) {
	    this.options             = options
	    this.$body               = $(document.body)
	    this.$element            = $(element)
	    this.$dialog             = this.$element.find('.modal-dialog')
	    this.$backdrop           = null
	    this.isShown             = null
	    this.originalBodyPad     = null
	    this.scrollbarWidth      = 0
	    this.ignoreBackdropClick = false

	    if (this.options.remote) {
	      this.$element
	        .find('.modal-content')
	        .load(this.options.remote, $.proxy(function () {
	          this.$element.trigger('loaded.bs.modal')
	        }, this))
	    }
	  }

	  Modal.VERSION  = '3.3.6'

	  Modal.TRANSITION_DURATION = 300
	  Modal.BACKDROP_TRANSITION_DURATION = 150

	  Modal.DEFAULTS = {
	    backdrop: true,
	    keyboard: true,
	    show: true
	  }

	  Modal.prototype.toggle = function (_relatedTarget) {
	    return this.isShown ? this.hide() : this.show(_relatedTarget)
	  }

	  Modal.prototype.show = function (_relatedTarget) {
	    var that = this
	    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

	    this.$element.trigger(e)

	    if (this.isShown || e.isDefaultPrevented()) return

	    this.isShown = true

	    this.checkScrollbar()
	    this.setScrollbar()
	    this.$body.addClass('modal-open')

	    this.escape()
	    this.resize()

	    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

	    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
	      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
	        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
	      })
	    })

	    this.backdrop(function () {
	      var transition = $.support.transition && that.$element.hasClass('fade')

	      if (!that.$element.parent().length) {
	        that.$element.appendTo(that.$body) // don't move modals dom position
	      }

	      that.$element
	        .show()
	        .scrollTop(0)

	      that.adjustDialog()

	      if (transition) {
	        that.$element[0].offsetWidth // force reflow
	      }

	      that.$element.addClass('in')

	      that.enforceFocus()

	      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

	      transition ?
	        that.$dialog // wait for modal to slide in
	          .one('bsTransitionEnd', function () {
	            that.$element.trigger('focus').trigger(e)
	          })
	          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	        that.$element.trigger('focus').trigger(e)
	    })
	  }

	  Modal.prototype.hide = function (e) {
	    if (e) e.preventDefault()

	    e = $.Event('hide.bs.modal')

	    this.$element.trigger(e)

	    if (!this.isShown || e.isDefaultPrevented()) return

	    this.isShown = false

	    this.escape()
	    this.resize()

	    $(document).off('focusin.bs.modal')

	    this.$element
	      .removeClass('in')
	      .off('click.dismiss.bs.modal')
	      .off('mouseup.dismiss.bs.modal')

	    this.$dialog.off('mousedown.dismiss.bs.modal')

	    $.support.transition && this.$element.hasClass('fade') ?
	      this.$element
	        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
	        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
	      this.hideModal()
	  }

	  Modal.prototype.enforceFocus = function () {
	    $(document)
	      .off('focusin.bs.modal') // guard against infinite focus loop
	      .on('focusin.bs.modal', $.proxy(function (e) {
	        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
	          this.$element.trigger('focus')
	        }
	      }, this))
	  }

	  Modal.prototype.escape = function () {
	    if (this.isShown && this.options.keyboard) {
	      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
	        e.which == 27 && this.hide()
	      }, this))
	    } else if (!this.isShown) {
	      this.$element.off('keydown.dismiss.bs.modal')
	    }
	  }

	  Modal.prototype.resize = function () {
	    if (this.isShown) {
	      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
	    } else {
	      $(window).off('resize.bs.modal')
	    }
	  }

	  Modal.prototype.hideModal = function () {
	    var that = this
	    this.$element.hide()
	    this.backdrop(function () {
	      that.$body.removeClass('modal-open')
	      that.resetAdjustments()
	      that.resetScrollbar()
	      that.$element.trigger('hidden.bs.modal')
	    })
	  }

	  Modal.prototype.removeBackdrop = function () {
	    this.$backdrop && this.$backdrop.remove()
	    this.$backdrop = null
	  }

	  Modal.prototype.backdrop = function (callback) {
	    var that = this
	    var animate = this.$element.hasClass('fade') ? 'fade' : ''

	    if (this.isShown && this.options.backdrop) {
	      var doAnimate = $.support.transition && animate

	      this.$backdrop = $(document.createElement('div'))
	        .addClass('modal-backdrop ' + animate)
	        .appendTo(this.$body)

	      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
	        if (this.ignoreBackdropClick) {
	          this.ignoreBackdropClick = false
	          return
	        }
	        if (e.target !== e.currentTarget) return
	        this.options.backdrop == 'static'
	          ? this.$element[0].focus()
	          : this.hide()
	      }, this))

	      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

	      this.$backdrop.addClass('in')

	      if (!callback) return

	      doAnimate ?
	        this.$backdrop
	          .one('bsTransitionEnd', callback)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callback()

	    } else if (!this.isShown && this.$backdrop) {
	      this.$backdrop.removeClass('in')

	      var callbackRemove = function () {
	        that.removeBackdrop()
	        callback && callback()
	      }
	      $.support.transition && this.$element.hasClass('fade') ?
	        this.$backdrop
	          .one('bsTransitionEnd', callbackRemove)
	          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
	        callbackRemove()

	    } else if (callback) {
	      callback()
	    }
	  }

	  // these following methods are used to handle overflowing modals

	  Modal.prototype.handleUpdate = function () {
	    this.adjustDialog()
	  }

	  Modal.prototype.adjustDialog = function () {
	    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

	    this.$element.css({
	      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
	      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
	    })
	  }

	  Modal.prototype.resetAdjustments = function () {
	    this.$element.css({
	      paddingLeft: '',
	      paddingRight: ''
	    })
	  }

	  Modal.prototype.checkScrollbar = function () {
	    var fullWindowWidth = window.innerWidth
	    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
	      var documentElementRect = document.documentElement.getBoundingClientRect()
	      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	    }
	    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
	    this.scrollbarWidth = this.measureScrollbar()
	  }

	  Modal.prototype.setScrollbar = function () {
	    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
	    this.originalBodyPad = document.body.style.paddingRight || ''
	    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
	  }

	  Modal.prototype.resetScrollbar = function () {
	    this.$body.css('padding-right', this.originalBodyPad)
	  }

	  Modal.prototype.measureScrollbar = function () { // thx walsh
	    var scrollDiv = document.createElement('div')
	    scrollDiv.className = 'modal-scrollbar-measure'
	    this.$body.append(scrollDiv)
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	    this.$body[0].removeChild(scrollDiv)
	    return scrollbarWidth
	  }


	  // MODAL PLUGIN DEFINITION
	  // =======================

	  function Plugin(option, _relatedTarget) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.modal')
	      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

	      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option](_relatedTarget)
	      else if (options.show) data.show(_relatedTarget)
	    })
	  }

	  var old = $.fn.modal

	  $.fn.modal             = Plugin
	  $.fn.modal.Constructor = Modal


	  // MODAL NO CONFLICT
	  // =================

	  $.fn.modal.noConflict = function () {
	    $.fn.modal = old
	    return this
	  }


	  // MODAL DATA-API
	  // ==============

	  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
	    var $this   = $(this)
	    var href    = $this.attr('href')
	    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
	    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

	    if ($this.is('a')) e.preventDefault()

	    $target.one('show.bs.modal', function (showEvent) {
	      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
	      $target.one('hidden.bs.modal', function () {
	        $this.is(':visible') && $this.trigger('focus')
	      })
	    })
	    Plugin.call($target, option, this)
	  })

	}(jQuery);


/***/ },
/* 27 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: tooltip.js v3.3.6
	 * http://getbootstrap.com/javascript/#tooltip
	 * Inspired by the original jQuery.tipsy by Jason Frame
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TOOLTIP PUBLIC CLASS DEFINITION
	  // ===============================

	  var Tooltip = function (element, options) {
	    this.type       = null
	    this.options    = null
	    this.enabled    = null
	    this.timeout    = null
	    this.hoverState = null
	    this.$element   = null
	    this.inState    = null

	    this.init('tooltip', element, options)
	  }

	  Tooltip.VERSION  = '3.3.6'

	  Tooltip.TRANSITION_DURATION = 150

	  Tooltip.DEFAULTS = {
	    animation: true,
	    placement: 'top',
	    selector: false,
	    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    container: false,
	    viewport: {
	      selector: 'body',
	      padding: 0
	    }
	  }

	  Tooltip.prototype.init = function (type, element, options) {
	    this.enabled   = true
	    this.type      = type
	    this.$element  = $(element)
	    this.options   = this.getOptions(options)
	    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
	    this.inState   = { click: false, hover: false, focus: false }

	    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
	      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
	    }

	    var triggers = this.options.trigger.split(' ')

	    for (var i = triggers.length; i--;) {
	      var trigger = triggers[i]

	      if (trigger == 'click') {
	        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
	      } else if (trigger != 'manual') {
	        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
	        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

	        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
	        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
	      }
	    }

	    this.options.selector ?
	      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
	      this.fixTitle()
	  }

	  Tooltip.prototype.getDefaults = function () {
	    return Tooltip.DEFAULTS
	  }

	  Tooltip.prototype.getOptions = function (options) {
	    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

	    if (options.delay && typeof options.delay == 'number') {
	      options.delay = {
	        show: options.delay,
	        hide: options.delay
	      }
	    }

	    return options
	  }

	  Tooltip.prototype.getDelegateOptions = function () {
	    var options  = {}
	    var defaults = this.getDefaults()

	    this._options && $.each(this._options, function (key, value) {
	      if (defaults[key] != value) options[key] = value
	    })

	    return options
	  }

	  Tooltip.prototype.enter = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
	    }

	    if (self.tip().hasClass('in') || self.hoverState == 'in') {
	      self.hoverState = 'in'
	      return
	    }

	    clearTimeout(self.timeout)

	    self.hoverState = 'in'

	    if (!self.options.delay || !self.options.delay.show) return self.show()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'in') self.show()
	    }, self.options.delay.show)
	  }

	  Tooltip.prototype.isInStateTrue = function () {
	    for (var key in this.inState) {
	      if (this.inState[key]) return true
	    }

	    return false
	  }

	  Tooltip.prototype.leave = function (obj) {
	    var self = obj instanceof this.constructor ?
	      obj : $(obj.currentTarget).data('bs.' + this.type)

	    if (!self) {
	      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
	      $(obj.currentTarget).data('bs.' + this.type, self)
	    }

	    if (obj instanceof $.Event) {
	      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
	    }

	    if (self.isInStateTrue()) return

	    clearTimeout(self.timeout)

	    self.hoverState = 'out'

	    if (!self.options.delay || !self.options.delay.hide) return self.hide()

	    self.timeout = setTimeout(function () {
	      if (self.hoverState == 'out') self.hide()
	    }, self.options.delay.hide)
	  }

	  Tooltip.prototype.show = function () {
	    var e = $.Event('show.bs.' + this.type)

	    if (this.hasContent() && this.enabled) {
	      this.$element.trigger(e)

	      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
	      if (e.isDefaultPrevented() || !inDom) return
	      var that = this

	      var $tip = this.tip()

	      var tipId = this.getUID(this.type)

	      this.setContent()
	      $tip.attr('id', tipId)
	      this.$element.attr('aria-describedby', tipId)

	      if (this.options.animation) $tip.addClass('fade')

	      var placement = typeof this.options.placement == 'function' ?
	        this.options.placement.call(this, $tip[0], this.$element[0]) :
	        this.options.placement

	      var autoToken = /\s?auto?\s?/i
	      var autoPlace = autoToken.test(placement)
	      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

	      $tip
	        .detach()
	        .css({ top: 0, left: 0, display: 'block' })
	        .addClass(placement)
	        .data('bs.' + this.type, this)

	      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
	      this.$element.trigger('inserted.bs.' + this.type)

	      var pos          = this.getPosition()
	      var actualWidth  = $tip[0].offsetWidth
	      var actualHeight = $tip[0].offsetHeight

	      if (autoPlace) {
	        var orgPlacement = placement
	        var viewportDim = this.getPosition(this.$viewport)

	        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
	                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
	                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
	                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
	                    placement

	        $tip
	          .removeClass(orgPlacement)
	          .addClass(placement)
	      }

	      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

	      this.applyPlacement(calculatedOffset, placement)

	      var complete = function () {
	        var prevHoverState = that.hoverState
	        that.$element.trigger('shown.bs.' + that.type)
	        that.hoverState = null

	        if (prevHoverState == 'out') that.leave(that)
	      }

	      $.support.transition && this.$tip.hasClass('fade') ?
	        $tip
	          .one('bsTransitionEnd', complete)
	          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	        complete()
	    }
	  }

	  Tooltip.prototype.applyPlacement = function (offset, placement) {
	    var $tip   = this.tip()
	    var width  = $tip[0].offsetWidth
	    var height = $tip[0].offsetHeight

	    // manually read margins because getBoundingClientRect includes difference
	    var marginTop = parseInt($tip.css('margin-top'), 10)
	    var marginLeft = parseInt($tip.css('margin-left'), 10)

	    // we must check for NaN for ie 8/9
	    if (isNaN(marginTop))  marginTop  = 0
	    if (isNaN(marginLeft)) marginLeft = 0

	    offset.top  += marginTop
	    offset.left += marginLeft

	    // $.fn.offset doesn't round pixel values
	    // so we use setOffset directly with our own function B-0
	    $.offset.setOffset($tip[0], $.extend({
	      using: function (props) {
	        $tip.css({
	          top: Math.round(props.top),
	          left: Math.round(props.left)
	        })
	      }
	    }, offset), 0)

	    $tip.addClass('in')

	    // check to see if placing tip in new offset caused the tip to resize itself
	    var actualWidth  = $tip[0].offsetWidth
	    var actualHeight = $tip[0].offsetHeight

	    if (placement == 'top' && actualHeight != height) {
	      offset.top = offset.top + height - actualHeight
	    }

	    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

	    if (delta.left) offset.left += delta.left
	    else offset.top += delta.top

	    var isVertical          = /top|bottom/.test(placement)
	    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
	    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

	    $tip.offset(offset)
	    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
	  }

	  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
	    this.arrow()
	      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
	      .css(isVertical ? 'top' : 'left', '')
	  }

	  Tooltip.prototype.setContent = function () {
	    var $tip  = this.tip()
	    var title = this.getTitle()

	    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
	    $tip.removeClass('fade in top bottom left right')
	  }

	  Tooltip.prototype.hide = function (callback) {
	    var that = this
	    var $tip = $(this.$tip)
	    var e    = $.Event('hide.bs.' + this.type)

	    function complete() {
	      if (that.hoverState != 'in') $tip.detach()
	      that.$element
	        .removeAttr('aria-describedby')
	        .trigger('hidden.bs.' + that.type)
	      callback && callback()
	    }

	    this.$element.trigger(e)

	    if (e.isDefaultPrevented()) return

	    $tip.removeClass('in')

	    $.support.transition && $tip.hasClass('fade') ?
	      $tip
	        .one('bsTransitionEnd', complete)
	        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
	      complete()

	    this.hoverState = null

	    return this
	  }

	  Tooltip.prototype.fixTitle = function () {
	    var $e = this.$element
	    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
	      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
	    }
	  }

	  Tooltip.prototype.hasContent = function () {
	    return this.getTitle()
	  }

	  Tooltip.prototype.getPosition = function ($element) {
	    $element   = $element || this.$element

	    var el     = $element[0]
	    var isBody = el.tagName == 'BODY'

	    var elRect    = el.getBoundingClientRect()
	    if (elRect.width == null) {
	      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
	      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
	    }
	    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
	    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
	    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

	    return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }

	  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
	    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
	           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
	        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

	  }

	  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
	    var delta = { top: 0, left: 0 }
	    if (!this.$viewport) return delta

	    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
	    var viewportDimensions = this.getPosition(this.$viewport)

	    if (/right|left/.test(placement)) {
	      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
	      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
	      if (topEdgeOffset < viewportDimensions.top) { // top overflow
	        delta.top = viewportDimensions.top - topEdgeOffset
	      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
	        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
	      }
	    } else {
	      var leftEdgeOffset  = pos.left - viewportPadding
	      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
	      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
	        delta.left = viewportDimensions.left - leftEdgeOffset
	      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
	        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
	      }
	    }

	    return delta
	  }

	  Tooltip.prototype.getTitle = function () {
	    var title
	    var $e = this.$element
	    var o  = this.options

	    title = $e.attr('data-original-title')
	      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

	    return title
	  }

	  Tooltip.prototype.getUID = function (prefix) {
	    do prefix += ~~(Math.random() * 1000000)
	    while (document.getElementById(prefix))
	    return prefix
	  }

	  Tooltip.prototype.tip = function () {
	    if (!this.$tip) {
	      this.$tip = $(this.options.template)
	      if (this.$tip.length != 1) {
	        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
	      }
	    }
	    return this.$tip
	  }

	  Tooltip.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
	  }

	  Tooltip.prototype.enable = function () {
	    this.enabled = true
	  }

	  Tooltip.prototype.disable = function () {
	    this.enabled = false
	  }

	  Tooltip.prototype.toggleEnabled = function () {
	    this.enabled = !this.enabled
	  }

	  Tooltip.prototype.toggle = function (e) {
	    var self = this
	    if (e) {
	      self = $(e.currentTarget).data('bs.' + this.type)
	      if (!self) {
	        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
	        $(e.currentTarget).data('bs.' + this.type, self)
	      }
	    }

	    if (e) {
	      self.inState.click = !self.inState.click
	      if (self.isInStateTrue()) self.enter(self)
	      else self.leave(self)
	    } else {
	      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
	    }
	  }

	  Tooltip.prototype.destroy = function () {
	    var that = this
	    clearTimeout(this.timeout)
	    this.hide(function () {
	      that.$element.off('.' + that.type).removeData('bs.' + that.type)
	      if (that.$tip) {
	        that.$tip.detach()
	      }
	      that.$tip = null
	      that.$arrow = null
	      that.$viewport = null
	    })
	  }


	  // TOOLTIP PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.tooltip')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tooltip

	  $.fn.tooltip             = Plugin
	  $.fn.tooltip.Constructor = Tooltip


	  // TOOLTIP NO CONFLICT
	  // ===================

	  $.fn.tooltip.noConflict = function () {
	    $.fn.tooltip = old
	    return this
	  }

	}(jQuery);


/***/ },
/* 28 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: popover.js v3.3.6
	 * http://getbootstrap.com/javascript/#popovers
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // POPOVER PUBLIC CLASS DEFINITION
	  // ===============================

	  var Popover = function (element, options) {
	    this.init('popover', element, options)
	  }

	  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

	  Popover.VERSION  = '3.3.6'

	  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	  })


	  // NOTE: POPOVER EXTENDS tooltip.js
	  // ================================

	  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

	  Popover.prototype.constructor = Popover

	  Popover.prototype.getDefaults = function () {
	    return Popover.DEFAULTS
	  }

	  Popover.prototype.setContent = function () {
	    var $tip    = this.tip()
	    var title   = this.getTitle()
	    var content = this.getContent()

	    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
	    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
	      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
	    ](content)

	    $tip.removeClass('fade top bottom left right in')

	    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
	    // this manually by checking the contents.
	    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
	  }

	  Popover.prototype.hasContent = function () {
	    return this.getTitle() || this.getContent()
	  }

	  Popover.prototype.getContent = function () {
	    var $e = this.$element
	    var o  = this.options

	    return $e.attr('data-content')
	      || (typeof o.content == 'function' ?
	            o.content.call($e[0]) :
	            o.content)
	  }

	  Popover.prototype.arrow = function () {
	    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
	  }


	  // POPOVER PLUGIN DEFINITION
	  // =========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.popover')
	      var options = typeof option == 'object' && option

	      if (!data && /destroy|hide/.test(option)) return
	      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.popover

	  $.fn.popover             = Plugin
	  $.fn.popover.Constructor = Popover


	  // POPOVER NO CONFLICT
	  // ===================

	  $.fn.popover.noConflict = function () {
	    $.fn.popover = old
	    return this
	  }

	}(jQuery);


/***/ },
/* 29 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: scrollspy.js v3.3.6
	 * http://getbootstrap.com/javascript/#scrollspy
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // SCROLLSPY CLASS DEFINITION
	  // ==========================

	  function ScrollSpy(element, options) {
	    this.$body          = $(document.body)
	    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
	    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
	    this.selector       = (this.options.target || '') + ' .nav li > a'
	    this.offsets        = []
	    this.targets        = []
	    this.activeTarget   = null
	    this.scrollHeight   = 0

	    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
	    this.refresh()
	    this.process()
	  }

	  ScrollSpy.VERSION  = '3.3.6'

	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  }

	  ScrollSpy.prototype.getScrollHeight = function () {
	    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
	  }

	  ScrollSpy.prototype.refresh = function () {
	    var that          = this
	    var offsetMethod  = 'offset'
	    var offsetBase    = 0

	    this.offsets      = []
	    this.targets      = []
	    this.scrollHeight = this.getScrollHeight()

	    if (!$.isWindow(this.$scrollElement[0])) {
	      offsetMethod = 'position'
	      offsetBase   = this.$scrollElement.scrollTop()
	    }

	    this.$body
	      .find(this.selector)
	      .map(function () {
	        var $el   = $(this)
	        var href  = $el.data('target') || $el.attr('href')
	        var $href = /^#./.test(href) && $(href)

	        return ($href
	          && $href.length
	          && $href.is(':visible')
	          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
	      })
	      .sort(function (a, b) { return a[0] - b[0] })
	      .each(function () {
	        that.offsets.push(this[0])
	        that.targets.push(this[1])
	      })
	  }

	  ScrollSpy.prototype.process = function () {
	    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
	    var scrollHeight = this.getScrollHeight()
	    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
	    var offsets      = this.offsets
	    var targets      = this.targets
	    var activeTarget = this.activeTarget
	    var i

	    if (this.scrollHeight != scrollHeight) {
	      this.refresh()
	    }

	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
	    }

	    if (activeTarget && scrollTop < offsets[0]) {
	      this.activeTarget = null
	      return this.clear()
	    }

	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
	        && this.activate(targets[i])
	    }
	  }

	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target

	    this.clear()

	    var selector = this.selector +
	      '[data-target="' + target + '"],' +
	      this.selector + '[href="' + target + '"]'

	    var active = $(selector)
	      .parents('li')
	      .addClass('active')

	    if (active.parent('.dropdown-menu').length) {
	      active = active
	        .closest('li.dropdown')
	        .addClass('active')
	    }

	    active.trigger('activate.bs.scrollspy')
	  }

	  ScrollSpy.prototype.clear = function () {
	    $(this.selector)
	      .parentsUntil(this.options.target, '.active')
	      .removeClass('active')
	  }


	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.scrollspy')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.scrollspy

	  $.fn.scrollspy             = Plugin
	  $.fn.scrollspy.Constructor = ScrollSpy


	  // SCROLLSPY NO CONFLICT
	  // =====================

	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old
	    return this
	  }


	  // SCROLLSPY DATA-API
	  // ==================

	  $(window).on('load.bs.scrollspy.data-api', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this)
	      Plugin.call($spy, $spy.data())
	    })
	  })

	}(jQuery);


/***/ },
/* 30 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: tab.js v3.3.6
	 * http://getbootstrap.com/javascript/#tabs
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // TAB CLASS DEFINITION
	  // ====================

	  var Tab = function (element) {
	    // jscs:disable requireDollarBeforejQueryAssignment
	    this.element = $(element)
	    // jscs:enable requireDollarBeforejQueryAssignment
	  }

	  Tab.VERSION = '3.3.6'

	  Tab.TRANSITION_DURATION = 150

	  Tab.prototype.show = function () {
	    var $this    = this.element
	    var $ul      = $this.closest('ul:not(.dropdown-menu)')
	    var selector = $this.data('target')

	    if (!selector) {
	      selector = $this.attr('href')
	      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
	    }

	    if ($this.parent('li').hasClass('active')) return

	    var $previous = $ul.find('.active:last a')
	    var hideEvent = $.Event('hide.bs.tab', {
	      relatedTarget: $this[0]
	    })
	    var showEvent = $.Event('show.bs.tab', {
	      relatedTarget: $previous[0]
	    })

	    $previous.trigger(hideEvent)
	    $this.trigger(showEvent)

	    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

	    var $target = $(selector)

	    this.activate($this.closest('li'), $ul)
	    this.activate($target, $target.parent(), function () {
	      $previous.trigger({
	        type: 'hidden.bs.tab',
	        relatedTarget: $this[0]
	      })
	      $this.trigger({
	        type: 'shown.bs.tab',
	        relatedTarget: $previous[0]
	      })
	    })
	  }

	  Tab.prototype.activate = function (element, container, callback) {
	    var $active    = container.find('> .active')
	    var transition = callback
	      && $.support.transition
	      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

	    function next() {
	      $active
	        .removeClass('active')
	        .find('> .dropdown-menu > .active')
	          .removeClass('active')
	        .end()
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', false)

	      element
	        .addClass('active')
	        .find('[data-toggle="tab"]')
	          .attr('aria-expanded', true)

	      if (transition) {
	        element[0].offsetWidth // reflow for transition
	        element.addClass('in')
	      } else {
	        element.removeClass('fade')
	      }

	      if (element.parent('.dropdown-menu').length) {
	        element
	          .closest('li.dropdown')
	            .addClass('active')
	          .end()
	          .find('[data-toggle="tab"]')
	            .attr('aria-expanded', true)
	      }

	      callback && callback()
	    }

	    $active.length && transition ?
	      $active
	        .one('bsTransitionEnd', next)
	        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
	      next()

	    $active.removeClass('in')
	  }


	  // TAB PLUGIN DEFINITION
	  // =====================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this = $(this)
	      var data  = $this.data('bs.tab')

	      if (!data) $this.data('bs.tab', (data = new Tab(this)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.tab

	  $.fn.tab             = Plugin
	  $.fn.tab.Constructor = Tab


	  // TAB NO CONFLICT
	  // ===============

	  $.fn.tab.noConflict = function () {
	    $.fn.tab = old
	    return this
	  }


	  // TAB DATA-API
	  // ============

	  var clickHandler = function (e) {
	    e.preventDefault()
	    Plugin.call($(this), 'show')
	  }

	  $(document)
	    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
	    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

	}(jQuery);


/***/ },
/* 31 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: affix.js v3.3.6
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // AFFIX CLASS DEFINITION
	  // ======================

	  var Affix = function (element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options)

	    this.$target = $(this.options.target)
	      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
	      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

	    this.$element     = $(element)
	    this.affixed      = null
	    this.unpin        = null
	    this.pinnedOffset = null

	    this.checkPosition()
	  }

	  Affix.VERSION  = '3.3.6'

	  Affix.RESET    = 'affix affix-top affix-bottom'

	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  }

	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop    = this.$target.scrollTop()
	    var position     = this.$element.offset()
	    var targetHeight = this.$target.height()

	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
	      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
	    }

	    var initializing   = this.affixed == null
	    var colliderTop    = initializing ? scrollTop : position.top
	    var colliderHeight = initializing ? targetHeight : height

	    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
	    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

	    return false
	  }

	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset
	    this.$element.removeClass(Affix.RESET).addClass('affix')
	    var scrollTop = this.$target.scrollTop()
	    var position  = this.$element.offset()
	    return (this.pinnedOffset = position.top - scrollTop)
	  }

	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1)
	  }

	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return

	    var height       = this.$element.height()
	    var offset       = this.options.offset
	    var offsetTop    = offset.top
	    var offsetBottom = offset.bottom
	    var scrollHeight = Math.max($(document).height(), $(document.body).height())

	    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
	    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '')

	      var affixType = 'affix' + (affix ? '-' + affix : '')
	      var e         = $.Event(affixType + '.bs.affix')

	      this.$element.trigger(e)

	      if (e.isDefaultPrevented()) return

	      this.affixed = affix
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

	      this.$element
	        .removeClass(Affix.RESET)
	        .addClass(affixType)
	        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
	    }

	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      })
	    }
	  }


	  // AFFIX PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.affix')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.affix

	  $.fn.affix             = Plugin
	  $.fn.affix.Constructor = Affix


	  // AFFIX NO CONFLICT
	  // =================

	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old
	    return this
	  }


	  // AFFIX DATA-API
	  // ==============

	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this)
	      var data = $spy.data()

	      data.offset = data.offset || {}

	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
	      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

	      Plugin.call($spy, data)
	    })
	  })

	}(jQuery);


/***/ }
]);