var express = require('express'),
    pokemon = require('pokemontcgsdk');

var routes = function(pokemon){
    var updateRouter = express.Router();

    var updateController = require('../controllers/updateController')(pokemon)

    updateRouter.route('/')
        .post(updateController.post)

    return updateRouter;
};

module.exports = routes;