module.exports = function(app) { 
    var game = require('./controllers/game');
    app.get('/data/game/:name', game.findByName); 
    app.get('/data/test', game.test)
}