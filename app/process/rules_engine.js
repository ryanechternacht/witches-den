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
        detailedPoints: {
            starting: 20
        },
        simplePoints: { 
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





function processCommand(player, round, parsedAction, action) { 

}

function addTurnToScorecard(player, turn) { 

}

function handleHardPoints(player, result, action) { 
    // sum points
    // check against factions (below)

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

function processCommands(engineSetup, parsedLog, log) { 
    var players = engineSetup.players;
    var rounds = engineSetup.rounds;
    var round = rounds[0];



    for(var i = 0; i < parsedLog.length; i++) { 
        var parsedAction = parsedLog[i];
        var action = log[i];

        if(parsedAction.round != undefined) { 
            // update round
        }

        var p = players[action.faction];
        var result = processCommand(p, round, parsedAction, action);

        handleHardPoints(p, result, action);

        if(parsedAction.pass != undefined) { 
            p.pass =  parsedAction.pass;
        }

        addTurnToScorecard(p, result);
    }

    return parsedLog;
}

function makeRulesEngine() { 
    // hook up rules
    var rules = [
        score1_onSpd,
        score5_d_onBuild,
        witches_onTw,
        bon7_tp_onPass
    ];

    return { 
        setupEngine: setupEngine,
        processCommands: processCommands,
        rules: rules
    }
}









