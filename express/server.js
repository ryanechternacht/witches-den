var express = require('express'),
    morgan = require('morgan'),
    routes = require('./routes.js'),
    app = express();


app.use(morgan('dev'));
app.use(express.static(__dirname + '/../app'));

routes(app);

var port = process.env.PORT || 3001;

app.listen(port);

console.log('Listening on port ' + port + '...');
