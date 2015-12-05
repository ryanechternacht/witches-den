var express = require('express'),
    // path = require('path'),
    morgan = require('morgan'),
    app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname + '/../app'));

require('./routes.js')(app);


// app.get('/', function(req, res) { 
//     res.sendFile(__dirname + '/../app/analyze/game/game.html');
// });

// app.use("/js", express.static(__dirname + "/app/js"));
// app.use("/img", express.static(__dirname + "/app/img"));
// app.use("/css", express.static(__dirname + "/app/css"));
app.all("/*", function(req, res, next) {
        res.sendFile("index.html", { root: __dirname + "/../app" });
});

var port = process.env.PORT || 3001;

app.listen(port);



console.log('Listening on port ' + port + '...');
