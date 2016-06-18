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
        format.detailedStats = buildDetailedStats(format.detailedOrdering, 
            format.labels, gameInfo.factions);
        format.simpleOrdering = buildSimpleOrdering(gameInfo.fireAndIceBonus);

        return format;
    }

    function buildFormat() { 
        return { labels: buildLabelFunction() }
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
        a["fav12"] = "Favor 12 (pass TP [0,2,3,3,4])"

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

        if(rounds) { 
            // rounds (built from round info)
            for(var i = 0; i < rounds.length; i++) { 
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
        if(fireAndIceBonus) { 
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
        for(var i = 0; i < rounds.length; i++) { 
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

        return function(item) { 
            return labels[item] || item;
        }
    }


    function buildDetailedStats(ordering, labels, scoreCards) {
        var obj = {};

        for(var i = 0; i < ordering.length; i++) { 
            var key = ordering[i];
            var players = [];
            for(var j = 0; j < scoreCards.length; j++) { 
                var sc = scoreCards[j];
                players.push(sc.detailed[key]);
            }
            obj[labels[key] || key] = players;
        }

        return obj;
    }
    /// END PRIVATE
}


function AboutCtrl($scope) {    
        
}


function ChangeLogCtrl($scope) {

}