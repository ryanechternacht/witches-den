module.exports = function(app, angularPath, env) { 
    var game = require('./controllers/game')(env);
    app.get('/data/game/:name', game.findByName); 
    app.get('/data/test', game.test);
    app.get('/data/faction/:faction', game.getFactionData);

    app.get("*", function(req, res) {
        res.sendfile("index.html", { root: angularPath });
    });
}