var makePlayer = function(name) {
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
        passBonus: "",
        detailedPoints: {
            starting: 20
        }
        simplePoints { 
            starting: 20
        }
    };
}





function witches_onTw(player, round, command, action) { 
    if(!command.tw || player.faction.toUpper() != "WITCHES") { 
        return;
    }

    if(player.simplePoints.faction == undefined) { 
        player.simplePoints.faction = 0;
    }
    player.simplePoints.faction += command.tw.length * 5;

    if(player.detailedPoints.faction == undefined) { 
        player.detailedPoints.faction = 0;
    }
    player.detailedPoints.faction += command.tw.length * 5;
}

// round5: d >> 2; 4fire -> 4pw
function round5_d_onBuild(player, round, command, action) {
    if(!command.build || round,toUpper() != "ROUND5") { 
        return;
    } 

    if(player.simplePoints.round == undefined) { 
        player.simplePoints.round = 0;
    }
    player.simplePoints.round += command.d * 2;

    if(player.detailedPoints.round5 == undefined) { 
        player.detailedPoints.round5 = 0;
    }
    player.detailedPoints.round5 += command.d * 2;
}

// bon7: vp*2
function bon7_tp_onPass(player, round, command, action) { 
    if(!command.pass || player.pass.toUpper() != "BON7") {
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


function processCommand(action, round) { 
    var command = parser.parse(action.commands);
    var faction = action.faction;


}

var makeRulesEngine = function() { 

}









