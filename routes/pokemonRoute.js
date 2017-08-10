var express = require('express');

var routes = function(){
    var pokemonRouter = express.Router();

    pokemonRouter.route('/')
        .post(function(req, res){
        })
        .get(function(req, res){
            res.send('Welcome to the pokemon route!');
        });
    return pokemonRouter;
};

module.exports = routes;