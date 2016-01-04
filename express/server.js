var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    app = express();


app.use(morgan('dev'));

var angularPath = path.join(__dirname + "/../app");
console.log("angular static path: " + angularPath);
// app.use(express.static(__dirname + '/../app'));
app.use(express.static(angularPath));

var routesPath = path.join(__dirname, '/routes.js');
console.log("routes path: " + routesPath);
require(routesPath)(app);

var faviconPath = path.join(__dirname, "favicon.png");
console.log("favicon path: " + faviconPath);
app.use(favicon(faviconPath));

// app.get('/', function(req, res) { 
//     res.sendFile(__dirname + '/../app/analyze/game/game.html');
// });

// app.use("/js", express.static(__dirname + "/app/js"));
// app.use("/img", express.static(__dirname + "/app/img"));
// app.use("/css", express.static(__dirname + "/app/css"));
app.all("/*", function(req, res, next) {
    console.log(req);
    console.log(res);
    console.log(next);
    res.sendFile("index.html", { root: __dirname + "/../app" });
});

var port = process.env.PORT || 3001;

app.listen(port);



console.log('Listening on port ' + port + '...');
