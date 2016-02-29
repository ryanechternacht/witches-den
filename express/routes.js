module.exports = function(app, angularPath) { 
    var game = require('./controllers/game');
    app.get('/data/game/:name', game.findByName); 
    app.get('/data/test', game.test);
    app.get('/data/faction/:faction', game.getFactionData);

    app.get("*", function(req, res) {
        res.sendfile("index.html", { root: angularPath });
    });
}