function parseLog(parser, log) { 
    var parsed = [];

    for(var i = 0; i < log.length; i++) { 
        var action = log[i];
        var parsedAction = "";
        try { 
            // start of round lines are an example of comment lines
            if(action.commands != undefined) {
                parsedAction = parser.parse(action.commands);
            } else if(action.comment != undefined) { 
                parsedAction = parser.parse(action.comment);
            }
        }
        catch(err) { 
            parsedAction = {
                "err": err,
                "action": action
            }
        }
        parsed.push(parsedAction);

    }

    return parsed;
}