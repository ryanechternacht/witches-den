// Round scoring 

//SCORE 1: spd >> 2; 1earth -> 1c
function score1_onSpd(player, round, parsedAction, action) { 
    if(round.tile.toUpper() != "SCORE1") { 
        return;
    }    

    var points = parsedAction.spd * 2;

    if(points > 0) { 
        if(player.simplePoints.round == undefined) { 
            player.simplePoints.round = 0;
        }
        player.simplePoints.round += points;

        var roundNum = round.num;
        if(player.detailedPoints[roundNum] == undefined) { 
            player.detailedPoints[roundNum] = 0;
        }
        player.detailedPoints[roundNum] += points;
    }
}

// SCORE5: d >> 2; 4fire -> 4pw
function score5_d_onBuild(player, round, parsedAction, action) {
    if(round.tile.toUpper() != "SCORE5") { 
        return;
    } 

    var points = parsedAction.d * 2;

    if(points > 0) { 
        if(player.simplePoints.round == undefined) { 
            player.simplePoints.round = 0;
        }
        player.simplePoints.round += points;

        var roundNum = round.num;
        if(player.detailedPoints[roundNum] == undefined) { 
            player.detailedPoints[roundNum] = 0;
        }
        player.detailedPoints[roundNum] += points;
    }
}




function witches_onTw(player, round, parsedAction, action) { 
    if(player.faction.toUpper() != "WITCHES" || parsedAction.tw.length == 0) { 
        return;
    }

    var points = parsedAction.tw.length * 5;
    if(points > 0) { 
        if(player.simplePoints.faction == undefined) { 
            player.simplePoints.faction = 0;
        }
        player.simplePoints.faction += points;

        if(player.detailedPoints.faction == undefined) { 
            player.detailedPoints.faction = 0;
        }
        player.detailedPoints.faction += points;
    }
}



// bon7: vp*2
function bon7_tp_onPass(player, round, parsedAction, action) { 
    if(parsedAction.pass != undefined || player.pass.toUpper() != "BON7") {
        return;
    }

    if(player.simplePoints.bonus == undefined) { 
        player.simplePoints.bonus = 0;
    }
    player.simplePoints.bonus += player.tp * 2;

    if(player.detailedPoints.bonus7 == undefined) { 
        player.detailedPoints.bonus7 = 0;
    }
    player.detailedPoints.bonus7 += player.tp * 2;
}