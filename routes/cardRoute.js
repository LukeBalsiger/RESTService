var express = require('express');

var routes = function(Card){
    var cardRouter = express.Router();

    cardRouter.route('/')
        .post(function(req, res){
            var card = new Card(req.body);
            card.save();
            console.log(`${card.name} was put into the cardAPI database in the cards collection`);
            res.status(201).send(card);
        })
        .get(function(req, res){
            Card.find(function(err, cards){
                if(err)
                    console.log(err);
                else if(cards[0] != null)
                    res.json(cards);
                else
                    res.send("This is where the cards will be!");
            });
        });
    return cardRouter;
};

module.exports = routes;