var express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    app = express();

var env;
if(!process.env.NODE_ENV) {
    env = require('dotenv').load();
} else {
    env = process.env;
}

app.use(morgan('dev'));

var angularPath = path.join(__dirname + "/../app");
console.log("angular static path: " + angularPath);
app.use(express.static(angularPath));

var routesPath = path.join(__dirname, '/routes.js');
console.log("routes path: " + routesPath);
require(routesPath)(app, angularPath, env);

var faviconPath = path.join(__dirname, "favicon.png");
console.log("favicon path: " + faviconPath);
app.use(favicon(faviconPath));

var port = env.PORT || 3001;

app.listen(port);

console.log('Listening on port ' + port + '...');
