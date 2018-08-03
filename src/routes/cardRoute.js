var express = require('express');

var routes = function(pokemon){
    var cardRouter = express.Router();

    var cardController = require('../controllers/cardController')(pokemon)

    cardRouter.route('/')
        .get(cardController.get)   

    return cardRouter;
};

module.exports = routes;