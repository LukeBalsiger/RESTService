var express = require('express');

var routes = function(Card){
    var cardRouter = express.Router();
     cardRouter.use('/:cardId', function(req,res,next){
        Card.findById(req.params.cardId, function(err,card){
            if(err)
                 res.status(500).send(err);
            else if(card)
            {
                req.card = card;
                next();
            }
            else{
                res.status(404);
                res.send('no card found');
            }
        });
    });

    var cardController = require('../controllers/cardController')(Card)

    cardRouter.route('/')
        .post(cardController.post)
        .get(cardController.get)

    return cardRouter;
};

module.exports = routes;