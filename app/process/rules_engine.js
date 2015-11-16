//TODO refactor all of this into the js object format


function makePlayer(name) {
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
        if(effect.simple.bonus == undefined) { 
            if(player.simple.bonus == undefined) { 
                player.simple.bonus = 0;
            }
            player.simple.bonus += effect.simple.bonus;
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
        if(effect.detailed.bonus7 != undefined) { 
            if(player.detailed.bonus7 == undefined) { 
                player.detailed.bonus7 = 0;
            }
            player.detailed.bonus7 += effect.detailed.bonus7;
        }
    }
}


function processCommand(rules, player, round, parsedAction, action) { 
    var effects = [];

    if(parsedAction.round != undefined) { 
        return { round: parsedAction.round }
    }

    for(var i = 0; i < rules.length; i++) { 
        var rule = rules[i];
        var effect = rule(player, round, parsedAction, action);

        if(effect != null) { 
            effects.push(effect);
        }
    }

    handleHardPoints(player, effects, action);

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

function processCommands(engineSetup, rules, parsedLog, log) { 
    var players = engineSetup.players;
        rounds = engineSetup.rounds,
        round = null;
        

    for(var i = 0; i < parsedLog.length; i++) { 
        var parsedAction = parsedLog[i];
        var action = log[i];

        var p = players[action.faction];
        var result = processCommand(rules, p, round, parsedAction, action);

        if(result != undefined) {
            if(result.round != undefined) { 
                round = rounds[result.round];
            }
        }
    }

    return players;
}

function makeRulesEngine() { 
    // hook up rules
    var rules = [
        score1_onSpd,
        score5_d_onBuild,
        witches_onTw,
        bon7_tp_onPass,
        demo_onD
    ];

    return { 
        setupEngine: setupEngine,
        rules: rules
    }
}









