var express = require('express');

var routes = function(cardData){
    var cardRouter = express.Router();

    var cardController = require('../controllers/cardController')(cardData)

    cardRouter.route('/')
        .get(cardController.get)  
        .post(cardController.post)
        .patch(cardController.patch)
        .delete(cardController.delete)

    return cardRouter;
};

module.exports = routes;