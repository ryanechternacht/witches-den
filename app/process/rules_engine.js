//TODO refactor all of this into the js object format


function makePlayer(name) {
    var shipStart,
        shipLevels;

    if(name.toUpperCase() == "NOMADS"
        || name.toUpperCase() == "CHAOSMAGICIANS"
        || name.toUpperCase() == "GIANTS"
        || name.toUpperCase() == "SWARMLINGS"
        || name.toUpperCase() == "ENGINEERS"
        || name.toUpperCase() == "HALFLINGS"
        || name.toUpperCase() == "CULTISTS"
        || name.toUpperCase() == "ALCHEMISTS"
        || name.toUpperCase() == "DARKLINGS"
        || name.toUpperCase() == "AUREN"
        || name.toUpperCase() == "WITCHES") {
        shipStart = 0;
        shipLevels = {
            "1": { points: 2 },
            "2": { points: 3 },
            "3": { points: 4 }
        };
    }
    else if(name.toUpperCase() == "FAKIRS"
        || name.toUpperCase() == "DWARVES") { 
        shipStart = 0;
        shipLevels = {};
    }
    else if(name.toUpperCase() == "MERMAIDS") {
        shipStart = 1;
        shipLevels = {
            "2": { points: 2 },
            "3": { points: 3 },
            "4": { points: 4 },
            "5": { points: 5 }
        };
    }
    else {
        throw "We don't support Fire and Ice Factions yet. Sorry"
    }

    return {
        faction: name,
        d: 0,
        tp: 0,
        te: 0,
        sh: 0,
        sa: 0,
        fav10: false,
        fav11: false,
        fav12: false,
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


function setupEngine(parsedLog, log) { 
    // setup rounds
    // setup players
    // f&i endgame
    // other options?

    return {
        rounds: [],
        players: [], 
        options: [],
    };
}


function addTurnToScorecard(player, effects) { 
    

    for(var i = 0; i < effects.length; i++) { 
        var effect = effects[i];

        // DEMO
        if(effect.simple.demo != undefined) { 
            if(player.simple.demo == undefined) { 
                player.simple.demo = 0;
            }
            player.simple.demo += effect.simple.demo;
        }
        if(effect.detailed.demo_onD != undefined) { 
            if(player.detailed.demo_onD == undefined) { 
                player.detailed.demo_onD = 0;
            }
            player.detailed.demo_onD += effect.detailed.demo_onD;
        }
        //END DEMO


        // simple
        if(effect.simple.round != undefined) { 
            if(player.simple.round == undefined) { 
                player.simple.round = 0;
            }
            player.simple.round += effect.simple.round;
        }
        if(effect.simple.faction != undefined) { 
            if(player.simple.faction == undefined) { 
                player.simple.faction = 0;
            }
            player.simple.faction += effect.simple.faction;
        }
        if(effect.simple.bonus != undefined) { 
            if(player.simple.bonus == undefined) { 
                player.simple.bonus = 0;
            }
            player.simple.bonus += effect.simple.bonus;
        }
        if(effect.simple.town != undefined) { 
            if(player.simple.town == undefined) { 
                player.simple.town = 0;
            }
            player.simple.town += effect.simple.town;
        }
        if(effect.simple.advance != undefined) { 
            if(player.simple.advance == undefined) { 
                player.simple.advance = 0;
            }
            player.simple.advance += effect.simple.advance;
        }
        if(effect.simple.fav != undefined) { 
            if(player.simple.fav == undefined) { 
                player.simple.fav = 0;
            }
            player.simple.fav += effect.simple.fav;
        }
        if(effect.simple.endGameCult != undefined) { 
            if(player.simple.endGameCult == undefined) { 
                player.simple.endGameCult = 0;
            }
            player.simple.endGameCult += effect.simple.endGameCult;
        }
        if(effect.simple.endGameNetwork != undefined) { 
            if(player.simple.endGameNetwork == undefined) { 
                player.simple.endGameNetwork = 0;
            }
            player.simple.endGameNetwork += effect.simple.endGameNetwork;
        }
        if(effect.simple.endGameResources != undefined) { 
            if(player.simple.endGameResources == undefined) { 
                player.simple.endGameResources = 0;
            }
            player.simple.endGameResources += effect.simple.endGameResources;
        }
        if(effect.simple.leech != undefined) { 
            if(player.simple.leech == undefined) { 
                player.simple.leech = 0;
            }
            player.simple.leech += effect.simple.leech;
        }
        if(effect.simple.unknown != undefined) { 
            if(player.simple.unknown == undefined) { 
                player.simple.unknown = 0;
            }
            player.simple.unknown += effect.simple.unknown;
        }


        // detailed
        if(effect.detailed.round != undefined) { 
            var round = effect.detailed.round;
            if(player.detailed.round == undefined) { 
                player.detailed.round = {};
            }
            if(player.detailed.round[round.roundNum] == undefined) { 
                player.detailed.round[round.roundNum] = 0;
            }
            player.detailed.round[round.roundNum] += round.points;
        }
        if(effect.detailed.faction != undefined) { 
            if(player.detailed.faction == undefined) { 
                player.detailed.faction = 0;
            }
            player.detailed.faction += effect.detailed.faction;
        }
        if(effect.detailed.bon6 != undefined) { 
            if(player.detailed.bon6 == undefined) { 
                player.detailed.bon6 = 0;
            }
            player.detailed.bon6 += effect.detailed.bon6;
        }
        if(effect.detailed.bon7 != undefined) { 
            if(player.detailed.bon7 == undefined) { 
                player.detailed.bon7 = 0;
            }
            player.detailed.bon7 += effect.detailed.bon7;
        }
        if(effect.detailed.bon9 != undefined) { 
            if(player.detailed.bon9 == undefined) { 
                player.detailed.bon9 = 0;
            }
            player.detailed.bon9 += effect.detailed.bon9;
        }
        if(effect.detailed.bon10 != undefined) { 
            if(player.detailed.bon10 == undefined) { 
                player.detailed.bon10 = 0;
            }
            player.detailed.bon10 += effect.detailed.bon10;
        }
        if(effect.detailed.town != undefined) { 
            if(player.detailed.town == undefined) { 
                player.detailed.town = 0;
            }
            player.detailed.town += effect.detailed.town;
        }
        if(effect.detailed.advanceShip != undefined) { 
            if(player.detailed.advanceShip == undefined) { 
                player.detailed.advanceShip = 0;
            }
            player.detailed.advanceShip += effect.detailed.advanceShip;
        }
        if(effect.detailed.advanceDig != undefined) { 
            if(player.detailed.advanceDig == undefined) { 
                player.detailed.advanceDig = 0;
            }
            player.detailed.advanceDig += effect.detailed.advanceDig;
        }
        if(effect.detailed.fav10 != undefined) { 
            if(player.detailed.fav10 == undefined) { 
                player.detailed.fav10 = 0;
            }
            player.detailed.fav10 += effect.detailed.fav10;
        }
        if(effect.detailed.fav11 != undefined) { 
            if(player.detailed.fav11 == undefined) { 
                player.detailed.fav11 = 0;
            }
            player.detailed.fav11 += effect.detailed.fav11;
        }
        if(effect.detailed.fav12 != undefined) { 
            if(player.detailed.fav12 == undefined) { 
                player.detailed.fav12 = 0;
            }
            player.detailed.fav12 += effect.detailed.fav12;
        }
        if(effect.detailed.endGameFire != undefined) { 
            if(player.detailed.endGameFire == undefined) { 
                player.detailed.endGameFire = 0;
            }
            player.detailed.endGameFire += effect.detailed.endGameFire;
        }
        if(effect.detailed.endGameWater != undefined) { 
            if(player.detailed.endGameWater == undefined) { 
                player.detailed.endGameWater = 0;
            }
            player.detailed.endGameWater += effect.detailed.endGameWater;
        }
        if(effect.detailed.endGameEarth != undefined) { 
            if(player.detailed.endGameEarth == undefined) { 
                player.detailed.endGameEarth = 0;
            }
            player.detailed.endGameEarth += effect.detailed.endGameEarth;
        }
        if(effect.detailed.endGameAir != undefined) { 
            if(player.detailed.endGameAir == undefined) { 
                player.detailed.endGameAir = 0;
            }
            player.detailed.endGameAir += effect.detailed.endGameAir;
        }
        if(effect.detailed.endGameNetwork != undefined) { 
            if(player.detailed.endGameNetwork == undefined) { 
                player.detailed.endGameNetwork = 0;
            }
            player.detailed.endGameNetwork += effect.detailed.endGameNetwork;
        }
        if(effect.detailed.endGameResources != undefined) { 
            if(player.detailed.endGameResources == undefined) { 
                player.detailed.endGameResources = 0;
            }
            player.detailed.endGameResources += effect.detailed.endGameResources;
        }
        if(effect.detailed.leech != undefined) { 
            if(player.detailed.leech == undefined) { 
                player.detailed.leech = 0;
            }
            player.detailed.leech += effect.detailed.leech;
        }
        if(effect.detailed.unknown != undefined) { 
            if(player.detailed.unknown == undefined) { 
                player.detailed.unknown = [];
            }
            player.detailed.unknown.push(effect.detailed);
        }
    }
}


function processCommand(rules, player, round, parsedAction, action) { 
    var effects = [];

    if(parsedAction.round != undefined) { 
        return { round: parsedAction.round }
    }

    if(parsedAction.d != undefined) { 
        player.d += parsedAction.d;
    }
    if(parsedAction.tp != undefined) { 
        player.tp += parsedAction.tp;
    }
    if(parsedAction.te != undefined) { 
        player.te += parsedAction.te;
    }
    if(parsedAction.sh != undefined) { 
        player.sh += parsedAction.sh;
    }
    if(parsedAction.sa != undefined) { 
        player.sa += parsedAction.sa;
    }
    if(parsedAction.fav != undefined) { 
        for(var i = 0; i < parsedAction.fav.length; i++) { 
            var f = parsedAction.fav[i];
            if(f == 10) { 
                player.fav10 = true;
            }
            else if(f == 11) { 
                player.fav11 = true;
            }
            else if(f == 12) { 
                player.fav12 = true;
            }
        }
    }


    for(var i = 0; i < rules.length; i++) { 
        var rule = rules[i];

        var effect = rule(player, round, parsedAction, action);

        if(effect != null) { 
            effects.push(effect);
        }
    }

    handleHardPoints(player, effects, action);

    markUnmappedPoints(player, effects, action);

    addTurnToScorecard(player, effects)

    if(parsedAction.pass != undefined) { 
        player.pass = parsedAction.pass;
    }

    return;
}

function handleHardPoints(player, effects, action) { 
    // sum points
    // check against factions (below)
    // if we need to add, add points to effects

    // if(result.points != action.vp.delta) { 
    //     if(p.faction == "engineers") { 
    //         // if a multiple of 3 and sh built, assume faction
    //     }
    //     else if(p.faction == "fakirs") { 
    //         // if = 4, assume faction
    //     }
    //     else if(p.faction == "dwarves") { 
    //         // if = 4, assume faction
    //     }
    // }
}

function markUnmappedPoints(player, effects, action) {
    var points = 0;

    for(var i = 0; i < effects.length; i++){ 
        var effect = effects[i];

        if(effect.simple.round != undefined) { 
            points += effect.simple.round;
        }
        if(effect.simple.faction != undefined) { 
            points += effect.simple.faction;
        }
        if(effect.simple.bonus != undefined) { 
            points += effect.simple.bonus;
        }
        if(effect.simple.town != undefined) { 
            points += effect.simple.town;
        }
        if(effect.simple.advance != undefined) { 
            points += effect.simple.advance;
        }
        if(effect.simple.fav != undefined) { 
            points += effect.simple.fav;
        }
        if(effect.simple.endGameCult != undefined) { 
            points += effect.simple.endGameCult;
        }
        if(effect.simple.endGameNetwork != undefined) { 
            points += effect.simple.endGameNetwork;
        }
        if(effect.simple.endGameResources != undefined) {
            points += effect.simple.endGameResources;
        }
        if(effect.simple.leech != undefined) { 
            points += effect.simple.leech;
        }
    }

    if(action.VP.delta != points) { 
        var diff = action.VP.delta - points
        effects.push({
            simple: { unknown: diff }, 
            detailed: { unknown: diff, action: action.commands } 
        });
    }
}

function processCommands(engineSetup, rules, parsedLog, log) { 
    var players = engineSetup.players;
        rounds = engineSetup.rounds,
        round = null;
        

    for(var i = 0; i < parsedLog.length; i++) { 
        if(i == 61) {
            console.log("oh yeah");
        }

        var parsedAction = parsedLog[i];
        var action = log[i];

        var p = players[action.faction];
        // for now, skip non player actions -- we mave do this differnetly 
        // in the future
        if(p != undefined) { 
            var result = processCommand(rules, p, round, parsedAction, action);
        }

        if(parsedAction.round != undefined) {
            round = rounds[parsedAction.round];
        }
    }

    return players;
}

function makeRulesEngine() { 
    // hook up rules
    var rules = [
        // demo_onD,

        score1_onSpd,
        score2_onTw,
        score3_onD,
        score4_onShsa,
        score5_onD,
        score6_onTp,
        score7_onShsa,
        score8_onTp,
        score9_onTe,

        witches_onTw,
        darklings_onDig,
        alchemists_onConvert,
        halflings_onSpd,
        cultists_onSh,

        bon6_onPassShsa,
        bon7_onPassTp,
        bon9_onPassD,
        bon10_onPassShip,

        onLeech,

        onTw,

        fav10_onTp,
        fav11_onD,
        fav12_onPassTp,

        advanceDig,
        advanceShip,

        endGameCult,
        endGameNetwork,
        endGameResources
    ];

    return { 
        setupEngine: setupEngine,
        rules: rules
    }
}









