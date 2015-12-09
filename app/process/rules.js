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



//
// Round scoring 
//

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

//SCORE2: town >> 5; 4earth -> 1spd
function score2_onTw(player, round, parsedAction, action) { 
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE2" 
        || parsedAction.tw == undefined) { 
        return null;
    }

    var points = parsedAction.tw.length * 5;

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
}

//SCORE3: d >> 2; 4water -> 1p
function score3_onD(player, round, parsedAction, action) { 
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE3") { 
        return null;
    }

    var points = parsedAction.d * 2;

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
}

//SCORE4: sh/sa >> 5; 2fire -> 1w
function score4_onShsa(player, round, parsedAction, action) { 
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE4") { 
        return null;
    }

    var points = 0;
    if(parsedAction.sh) { 
        points += 5;
    }
    if(parsedAction.sa) {
        points += 5;
    }

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
}

// SCORE5: d >> 2; 4fire -> 4pw
function score5_onD(player, round, parsedAction, action) {
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE5") { 
        return null;
    } 

    var points = parsedAction.d * 2;

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

// SCORE6: tp >> 3; 4water -> 1spd
function score6_onTp(player, round, parsedAction, action) {
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE6") { 
        return null;
    } 

    var points = parsedAction.tp * 3;

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

// SCORE7: SHSA >> 3; 4water -> 1spd
function score7_onShsa(player, round, parsedAction, action) {
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE7") { 
        return null;
    } 

    var points = 0;
    if(parsedAction.sh) { 
        points += 5;
    }
    if(parsedAction.sa) {
        points += 5;
    }

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

// SCORE8: tp >> 3; 4air -> 1spd
function score8_onTp(player, round, parsedAction, action) {
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE8") { 
        return null;
    } 

    var points = parsedAction.tp * 3;

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

// SCORE9: te >> 4; 1cult_p -> 2c
function score9_onTe(player, round, parsedAction, action) {
    if(round == undefined || round.scoreTile.toUpperCase() != "SCORE9") { 
        return null;
    } 

    var points = parsedAction.te * 4;

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



//
// Faction Bonuses
//

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

function alchemists_onConvert(player, round, parsedAction, action) { 
    if(player.faction.toUpperCase() != "ALCHEMISTS" || parsedAction.vp == undefined) { 
        return null;
    }

    var points = parsedAction.vp;
    if(points != 0) { 
        return { 
            simple: { faction: points },
            detailed: {faction: points }
        }
    }

    return null;
}

function cultists_onSh(player, round, parsedAction, action) { 
    if(player.faction.toUpperCase() != "CULTISTS" || parsedAction.sh == undefined) { 
        return null;
    }

    var points = parsedAction.sh * 7;
    if(points != 0) { 
        return { 
            simple: { faction: points },
            detailed: {faction: points }
        }
    }
}

function halflings_onSpd(player, round, parsedAction, action) { 
    if(player.faction.toUpperCase() != "HALFLINGS" || parsedAction.spd == undefined) { 
        return null;
    }

    var points = parsedAction.spd * 1;
    if(points != 0) { 
        return { 
            simple: { faction: points },
            detailed: {faction: points }
        }
    } 
}

function darklings_onDig(player, round, parsedAction, action) { 
    if(player.faction.toUpperCase() != "DARKLINGS" || parsedAction.dig == undefined) { 
        return null;
    }

    var points = parsedAction.dig * 2;
    if(points != 0) { 
        return { 
            simple: { faction: points },
            detailed: {faction: points }
        }
    } 
}



// 
// Pass Bonuses
//

// bon6: sh/sa * 4
function bon6_onPassShsa(player, round, parsedAction, action) { 
    if(parsedAction.pass == undefined
        || player.pass == undefined
        || player.pass.toUpperCase() != "BON6") { 
        return null;
    }

    var points = (player.sh + player.sa) * 4;
    if(points > 0) { 
        return { 
            simple: { bonus: points },
            detailed: { bon6: points }
        }
    }
}

// bon7: tp*2
function bon7_onPassTp(player, round, parsedAction, action) { 
    if(parsedAction.pass == undefined 
        || player.pass == undefined 
        || player.pass.toUpperCase() != "BON7") {
        return null;
    }

    var points = player.tp * 2;
    if(points > 0) {
        return { 
            simple: { bonus: points },
            detailed: { bon7: points }
        }
    }

    return null;
}

// bon9: d*1
function bon9_onPassD(player, round, parsedAction, action) { 
    if(parsedAction.pass == undefined 
        || player.pass == undefined 
        || player.pass.toUpperCase() != "BON9") {
        return null;
    }

    var points = player.d * 1;
    if(points > 0) {
        return { 
            simple: { bonus: points },
            detailed: { bon9: points }
        }
    }

    return null;
}

// bon10: ship*3
function bon10_onPassShip(player, round, parsedAction, action) { 
    if(parsedAction.pass == undefined 
        || player.pass == undefined 
        || player.pass.toUpperCase() != "BON10") {
        return null;
    }

    var points = player.shipLevel * 3;
    if(points > 0) {
        return { 
            simple: { bonus: points },
            detailed: { bon10: points }
        }
    }

    return null;
}



//
// Leech
//
function onLeech(player, round, parsedAction, action) { 
    if(parsedAction.leech == undefined || !parsedAction.leech.accept) { 
        return null;
    }

    var points = action.VP.delta;
    if(points != 0) { 
        return { 
            simple: { leech: points },
            detailed: { leech: points }
        }
    }
}



//
// Town
//
function onTw(player, round, parsedAction, action) {
    if(parsedAction.tw == undefined) { 
        return null;
    }

    var points = 0;
    for(var i = 0; i < parsedAction.tw.length; i++) {
        var tw = parsedAction.tw[i];

        if(tw == 1) { 
            points += 5;
        }
        else if(tw == 2) { 
            points += 7;
        }
        else if(tw == 3) { 
            points += 9;
        }
        else if(tw == 4) { 
            points += 6;
        }
        else if(tw == 5) { 
            points += 8;
        }
        else if(tw == 6) { 
            points += 2;
        }
        else if(tw == 7) { 
            points += 4;
        }
        else if(tw == 8) { 
            points += 11;
        }
    }

    return { 
        simple: { town: points },
        detailed: { town: points }
    }
}



//
// Favs
//

// fav10: tp >> 3
function fav10_onTp(player, round, parsedAction, action) { 
    if(!player.fav10) { 
        return null;
    } 

    var points = parsedAction.tp * 3;

    if(points > 0) { 
        return { 
            simple: { fav: points },
            detailed: { fav10: points }
        }
    }
    
    return null;
}

// fav11: d >> 2
function fav11_onD(player, round, parsedAction, action) { 
    if(!player.fav11) { 
        return null;
    } 

    var points = parsedAction.d * 2;

    if(points > 0) { 
        return { 
            simple: { fav: points },
            detailed: { fav11: points }
        }
    }
    
    return null;
}

// fav12: pass: 1tp >> 2, 2/3tp >> 3, 4 tp >> 4
function fav12_onPassTp(player, round, parsedAction, action) { 
    if(parsedAction.pass == undefined 
        || !player.fav12) {
        return null;
    }

    var points = 0;
    if(player.tp == 1) { 
        points = 2;
    }
    if(player.tp == 2 || player.tp == 3) { 
        points = 3;
    }
    if(player.tp == 4) { 
        points = 4;
    }

    if(points > 0) {
        return { 
            simple: { fav: points },
            detailed: { fav12: points }
        }
    }

    return null;
}




//
// advances
//
function advanceDig(player, round, parsedAction, action) {
    if(parsedAction.advanceDig == undefined) {
        return null;
    }

    var points = 6 * parsedAction.advanceDig;
    if(points > 0) {
        return { 
            simple: { advance: points },
            detailed: { advanceDig: points }
        }
    }

    return null;
}

function advanceShip(player, round, parsedAction, action) { 
    if(parsedAction.advanceShip == undefined) {
        return null;
    }

    var next = player.shipLevel + 1;
    var nextLevel = player.shipLevels[next];

    if(nextLevel != undefined) {
        player.shipLevel = next;
        return { 
            simple: { advance: nextLevel.points },
            detailed: { advanceShip: nextLevel.points }
        }
    }

    return null;
}


//
// Endgame points
//
function endGameCult(player, round, parsedAction, action) { 
    if(parsedAction.endGame == undefined ) {
        return null;
    }

    var points = parsedAction.endGame.points;
    if(points > 0) {
        if(parsedAction.endGame.source.toUpperCase() == "FIRE") {
            return { 
                simple: { endGameCult: points },
                detailed: { endGameFire: points }
            }
        }
        if(parsedAction.endGame.source.toUpperCase() == "WATER") {
            return { 
                simple: { endGameCult: points },
                detailed: { endGameWater: points }
            }
        }
        if(parsedAction.endGame.source.toUpperCase() == "EARTH") {
            return { 
                simple: { endGameCult: points },
                detailed: { endGameEarth: points }
            }
        }
        if(parsedAction.endGame.source.toUpperCase() == "AIR") {
            return { 
                simple: { endGameCult: points },
                detailed: { endGameAir: points }
            }
        }
    }
    return null;
}

function endGameNetwork(player, round, parsedAction, action) {
    if(parsedAction.endGame == undefined 
        || parsedAction.endGame.source.toUpperCase() != "NETWORK") {
        return null;
    }

    var points = parsedAction.endGame.points;
    if(points > 0) {
        return { 
            simple: { endGameNetwork: points },
            detailed: { endGameNetwork: points }
        }
    }

    return null;
}

function endGameResources(player, round, parsedAction, action) { 
    if(parsedAction.endGame == undefined 
        || parsedAction.endGame.source.toUpperCase() != "RESOURCES") {
        return null;
    }

    var points = action.VP.delta;
    if(points > 0) { 
        return { 
            simple: { endGameResources: points },
            detailed: { endGameResources: points }
        }
    }
}

function onConvertToVp(player, round, parsedAction, action) { 
    // I assume this is only being used endGame by people who manually convert
    // into points

    // if you're alchemists, use their faction specific rule
    if(player.faction.toUpperCase() == "ALCHEMISTS" || parsedAction.vp == undefined) { 
        return null;
    }

    var points = parsedAction.vp;
    if(points != 0) { 
        return { 
            simple: { endGameResources: points },
            detailed: {endGameResources: points }
        }
    }

    return null;
}




