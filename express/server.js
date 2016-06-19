var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    app = express();

app.use(morgan('dev'));

var angularPath = path.join(__dirname + "/../app");
console.log("angular static path: " + angularPath);
app.use(express.static(angularPath));

var routesPath = path.join(__dirname, '/routes.js');
console.log("routes path: " + routesPath);
require(routesPath)(app, angularPath, process.env.HOST, process.env.MASTERKEY);

var faviconPath = path.join(__dirname, "favicon.png");
console.log("favicon path: " + faviconPath);
app.use(favicon(faviconPath));

var port = process.env.PORT || 3001;

app.listen(port);

console.log('Listening on port ' + port + '...');
