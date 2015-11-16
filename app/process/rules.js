// demo rules
function demo_onD(player, round, parsedAction, actino) { 
    var points = parsedAction.d * 1;

    if(points > 0) { 
        return { 
            simple: { demo: points },
            detailed: { demo_onD: points}
        }
    }
}



// Round scoring 

//SCORE 1: spd >> 2; 1earth -> 1c
function score1_onSpd(player, round, parsedAction, action) { 
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE1") { 
        return null;
    }    

    var points = parsedAction.spd * 2;

    if(points > 0) { 
        return { 
            simple: { round: points },
            detailed: { 
                round: { 
                    roundNum: round.roundNum, 
                    scoreTile: round.scoreTile, 
                    points: points 
                }
            }
        }
    }
    
    return null;
}

// SCORE5: d >> 2; 4fire -> 4pw
function score5_d_onBuild(player, round, parsedAction, action) {
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE5") { 
        return null;
    } 

    var points = parsedAction.d * 2;

    if(points > 0) { 
        return { 
            simple: { round: points },
            detailed: { roundNum: round.roundNum, scoreTile: round.scoreTile }
        }
    }
    
    return null;
}




function witches_onTw(player, round, parsedAction, action) { 
    if(player.faction.toUpperCase() != "WITCHES" || parsedAction.tw == undefined) { 
        return null;
    }

    var points = parsedAction.tw.length * 5;
    if(points > 0) { 
        return { 
            simple: { faction: points },
            detailed: { faction: points }
        }
    }
    
    return null;
}



// bon7: vp*2
function bon7_tp_onPass(player, round, parsedAction, action) { 
    if(parsedAction.pass == undefined 
        || player.pass == undefined 
        || player.pass.toUpperCase() != "BON7") {
        return null;
    }

    var points = player.tp * 2;
    if(points > 0) {
        return { 
            simple: { bonus: points },
            detailed: { bonus7: points }
        }
    }

    return null;
}