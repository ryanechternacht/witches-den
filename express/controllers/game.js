var http = require('http'),
    prototype = require('prototype'),
    fs = require('fs');

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

exports.test = function(req, res) { 
    // relative to root of project
    var filePath = 'express/controllers/testgame.json';
    res.send(readJsonFileSync(filePath));
}

exports.findByName = function(req, res) { 
    console.log("/data/game/" + req.params.name);

    var options = {
        host: 'terra.snellman.net',
        port: 80,
        path: '/app/view-game/?game=' + req.params.name,
        method: 'GET'
    };

    var state;

    // var request = http.request(options, function(terra_res) { });
    var request = http.request(options);

    request.on('response', function(response) {
        var data = "";

        response.on('data', function(chunk) { 
            // console.log("got a chunk");
            data += chunk;
        });

        response.on('end', function() { 
            // console.log("i see the end");
            state = data.evalJSON();
            res.send(state.ledger);
        });
    });

    request.end();
};

