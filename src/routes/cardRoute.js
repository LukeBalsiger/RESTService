var express = require('express');

var routes = function(Card){
    var cardRouter = express.Router();

    var cardController = require('../controllers/cardController')(Card)
    cardRouter.route('/')
        .post(cardController.post)
        .get(cardController.get);
        
    return cardRouter;
};

module.exports = routes;