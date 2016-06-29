module.exports = function(env) { 
    
    var http = require('http'),
        fs = require('fs'),
        DocumentClient = require('documentdb').DocumentClient,
        collLink = 'dbs/dev/colls/factions';

    if(env.NODE_ENV === "PROD") {
        collLink = 'dbs/prod/colls/factions';
    }

    return {
        test: test,
        findByName: findByName,
        getFactionData: getFactionData
    };


    function readJsonFileSync(filepath, encoding){
        if (typeof (encoding) == 'undefined'){
            encoding = 'utf8';
        }
        var file = fs.readFileSync(filepath, encoding);
        return JSON.parse(file);
    }

    function test(req, res) { 
        // relative to root of project
        var filePath = 'express/controllers/testgame.json';
        res.send(readJsonFileSync(filePath));
    }

    function findByName(req, res) { 
        console.log("/data/game/" + req.params.name);

        var options = {
            host: 'terra.snellman.net',
            port: 80,
            path: '/app/view-game/?game=' + req.params.name,
            method: 'GET'
        };

        var request = http.request(options);

        request.on('response', function(response) {
            var data = "";

            response.on('data', function(chunk) { 
                // console.log("chunk");
                data += chunk;
            });

            response.on('end', function() { 
                // console.log("end");
                var state = JSON.parse(data);
                res.send(state.ledger);
            });
        });

        request.end();
    };

    function getFactionData(req, res) {
        var faction = req.params.faction;
        console.log("/data/faction/" + faction);

        var client = new DocumentClient(env.HOST, {masterKey: env.MASTER_KEY});

        var q = "select * from c where c.id = '" + faction + "'";
        client.queryDocuments(collLink, q).toArray(function(err, results) { 
            if(err) { res.send(err); }
            else { res.send(results[0]); }
        });
    }
}









