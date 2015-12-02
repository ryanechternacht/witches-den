var http = require('http'),
    prototype = require('prototype');

exports.getSeattle = function(req, res) { 
    console.log("root");

    res.send("Hello, Seattle\n");
}

exports.findByName = function(req, res) { 
    console.log("/game/" + req.params.name);

    var options = {
        host: 'terra.snellman.net',
        port: 80,
        path: '/app/view-game/?game=' + req.params.name,
        method: 'GET'
    };

    var state;

    var request = http.request(options, function(terra_res) {
        // console.log('STATUS: ' + terra_res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(terra_res.headers));
    });

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

