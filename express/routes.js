module.exports = function(app) { 
    var game = require('./controllers/game');
    app.get('/data/game/:name', game.findByName); 
}