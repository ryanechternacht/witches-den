'use strict';

// I could use this for localization
var buildPrettyStrings = function (rounds) { 
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

var buildSimpleOrdering = function() { 
    var a = new Array();
    
    // simple
    a.push("bonus");
    a.push("endGameCult"); // cult track
    a.push("faction");
    a.push("fav");
    a.push("leech");
    a.push("endGameNetwork"); // network
    a.push("endGameBonus")
    a.push("round");
    a.push("starting");
    a.push("town");
    a.push("advance");
    a.push("endGameResources"); // unused resources

    return a;
}

var buildDetailedOrdering = function() { 
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
    a.push("SCORE1"); // TODO redo these to leverage round ordering
    a.push("SCORE2");
    a.push("SCORE3");
    a.push("SCORE4");
    a.push("SCORE5");
    a.push("SCORE6");
    a.push("SCORE7");
    a.push("SCORE8");
    a.push("SCORE9");
    a.push("starting");
    a.push("town");
    a.push("endGameResources"); // unused resources

    return a;
}

angular.module('wd.shared', [])
.factory('shared', function() { 
    var shared = {};

    shared.buildPrettyStrings = buildPrettyStrings;
    shared.buildSimpleOrdering = buildSimpleOrdering;
    shared.buildDetailedOrdering = buildDetailedOrdering;

    return shared;
})