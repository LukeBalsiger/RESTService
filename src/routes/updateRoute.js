var express = require('express'),
    pokemon = require('pokemontcgsdk'),
    http = require('http');

var routes = function(pokemon, Card){
    var updateRouter = express.Router();

    var updateController = require('../controllers/updateController')(pokemon, Card, http)

    updateRouter.route('/')
        .post(updateController.post)

    return updateRouter;
};

module.exports = routes;