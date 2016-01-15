/*
 * Terra Mystica (Snellman) Grammar
 * ==========================
 *
 * Parses Snellman's online implementation of Terra Mystica
 * 
 * NOTE: We don't currently support negative numbers - I think
 *       there is a peg function for optional characters, but
 *       I still need to implement this
 * 
 * NOTE: Naming around action is a little too ambigious 
 *       - power actions
 *       - player actions
 *       - sub player actions (convert, town, favor)
 */

{
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

  function town(num) { 
    if(num == 7) {
      return { tw: 7, advanceShip: 1 }
    }
    return { tw: num };
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
      result.tw.push(action.tw);
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
}

Turn
  = actions:Action* { return makeAction(actions); }


Action
  = PriestToCult
  / Build
  / Upgrade
  / Pass
  / OctagonalAction
  / Leech
  / Advance
  / Transform
  / Done
  / Wait
  / FactionSetup
  / GameSetup
  / OptionSetup
  / RoundSetup
  / BonusSetup
  / PlayerSetup
  / AdditionalScoringSetup
  / RoundStart
  / BaseIncome
  / CultIncome
  / EndGamePoints
  / Convert
  / Town
  / Favor
  / Dig
  / Cult
  / Burn
  / MermaidConnect
  / Bridge
  / Transform
  / LeechOption
  / RiverwalkersUnlockTerrain
  / ShapeshifterGainPowerToken
  / PickColor
  

PriestToCult
  = "send"i _ "p"i _ "to"i _ cult:String _ amount:PriestToCultFor _ "."? _ { return priestToCult(cult, amount) }
PriestToCultFor
  = "for"i _ amount:Number _ { return amount; }
  / _ { return 2 }

Build 
  = "build"i _ space:String _ "."? _ { return build(space) }

Upgrade
  = "upgrade"i _ space:String _ "to" _ building:String _ "."? _ { return upgrade(building, space) }

Pass
  = "pass"i _ bonus:String _ { return pass(bonus) }
  / "pass"i _ { return pass("end") }

OctagonalAction
  = "action"i _ act:String _ "."? _ { return action(act); }

Leech
  = "leech"i _ amount:Number _ "from"i _ faction:String _ "."? _ { return leech(true, amount, faction) }
  / "decline"i _ amount:Number _ "from"i _ faction:String _ "."? _ { return leech(false, amount, faction) }

Advance
  = "advance"i _ track:String _ "."? _ { return advance(track); } 

Wait
  = "wait"i _ "."? _ { return wait(); }

Done
  = "done"i _ "."? _ {return done(); }

FactionSetup
  = "setup"i { return factionSetup() }

GameSetup
  = "default game options"i _ { return gameStart(); }

OptionSetup
  = "option"i _ opt:OptionString _ { return optionSetup(opt); }

RoundSetup
  = "round"i _ roundNum:Number _ "scoring:"i _ roundTile:String "," _ goal:OptionString _ ">>" _ points:Number _ { return roundSetup(roundNum, roundTile, goal, points); }

BonusSetup
  = "removing tile "i  bonusTile:String { return bonusSetup(bonusTile); }

PlayerSetup
  = "Player "i playerNum:Number ": " playerName:OptionString { return playerSetup(playerName, playerNum); }

AdditionalScoringSetup
  = "added final scoring tile: "i scoringTile:OptionString { return additionalScoringSetup(scoringTile); }

RoundStart
  = "Round "i roundNum:Number " income"i _ { return roundStart(roundNum) }

BaseIncome
  = "other_income_for_faction" _ { return income("base"); }

CultIncome
  = "cult_income_for_faction" _ { return income("cult"); }

EndGamePoints
  = "+" points:Number "vp for " source:OptionString { return endGamePoints(source, points); }
  / "score_resources" { return endGamePoints("resources", 0); }


Convert
  = "convert"i _ from:ResourceAmount _ "to"i _ to:ResourceAmount _ "."? _ { return convert(from, to) }
ResourceAmount
  = quantity:Number res:String { return resource(res, quantity) }
  / res:String { return resource(res, 1) }

Town
  = "+tw"i num:Number "."? _ { return town(num) }

Favor
  = "+fav"i num:Number "."? _ { return favor(num) }

Dig 
  = "dig"i _ amount:Number "."? _ { return dig(amount); }

Cult
  = "+fire"i "."? _ { return cult("fire", 1); }
  / "+water"i "."? _ { return cult("water", 1); }
  / "+earth"i "."? _ { return cult("earth", 1); }
  / "+air"i "."? _ { return cult("air", 1); }

  / "+" amount:Number "fire"i "."? _ { return cult("fire", amount); }
  / "+" amount:Number "water"i "."? _ { return cult("water", amount); }
  / "+" amount:Number "earth"i "."? _ { return cult("earth", amount); }
  / "+" amount:Number "air"i "."? _ { return cult("air", amount); }
  
  / "-fire"i "."? _ { return cult("fire", -1); }
  / "-water"i "."? _ { return cult("water", -1); }
  / "-earth"i "."? _ { return cult("earth", -1); }
  / "-air"i "."? _ { return cult("air", -1); }
  
  / "-" amount:Number "fire"i "."? _ { return cult("fire", -1 * amount); }
  / "-" amount:Number "water"i "."? _ { return cult("water", -1 * amount); }
  / "-" amount:Number "earth"i "."? _ { return cult("earth", -1 * amount); }
  / "-" amount:Number "air"i "."? _ { return cult("air", -1 * amount); }

Transform
  = "transform"i _ space:String _ "to"i _ color:String _ "."? _ { return transform(space, color); }
  / "transform"i _ space:String _ "."? _ { return transform(space); }
Burn
  = "burn"i _ amount:Number _ "."? _ { return burn(amount); }

MermaidConnect
  = "connect"i _ tiles:OptionString _ "."? _ { return mermaidConnect(tiles); }

Bridge
  = "bridge"i _ tile1:String ":" tile2:String ":" tile3:String _ "."? _ { return bridge(tile1, tile2, tile3) }
  / "bridge"i _ tile1:String ":" tile2:String _ "."? _ { return bridge(tile1, tile2) }

LeechOption
  = "[opponent accepted power]"i { return leechOption(true); }
  / "[all opponents declined power]"i { return leechOption(false); }

ShapeshifterGainPowerToken
  = "gain P3 for VP"i _ "."? _ { return ssGainPowerToken(true); }
  / "-GAIN_P3_FOR_VP"i _ "."? _ { return ssGainPowerToken(false); }

RiverwalkersUnlockTerrain
  = "unlock-terrain"i _ "gain-priest"i _ "."? _ { return rwUnlockTerrain("gain-priest"); }
  / "unlock-terrain"i _ terrain:String _ "."? _ { return rwUnlockTerrain(terrain); }

PickColor
  = "pick-color "i color:String _ "."? _ { return pickColor(color); }

String
  = characters:[a-z0-9]i+ { return a2s(characters); }

OptionString
  = characters:[a-z0-9-/.:]i+ { return a2s(characters); }

Number
  = digits:[0-9]+ { return parseInt(a2s(digits),10); }

_ "whitespace"
  = [ \t\n\r]*