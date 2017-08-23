var express = require('express');

var routes = function(Card){
    var cardRouter = express.Router();

    var cardController = require('../controllers/cardController')(Card)

    cardRouter.route('/')
        .post(cardController.post)
        .get(cardController.get)

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

    cardRouter.route('/:cardId')
    .get(function(req,res){
        res.json(req.book);
    })
    .put(function(req,res){
        req.card.id = req.body.id;
        req.card.name = req.body.name;
        req.card.nationalPokedexNumber = req.body.nationalPokedexNumber;
        req.card.imageUrl = req.body.imageUrl;
        req.card.imageUrlHiRes = req.body.imageUrlHiRes;
        req.req.card.types = req.body.types;
        req.card.supertype = req.body.supertype;
        req.card.subtype = req.body.subtype;
        req.card.retreatCost = req.body.retreatCost;            
        req.card.number = req.body.number;
        req.card.artist = req.body.artist;
        req.card.rarity = req.body.rarity;
        req.card.setName = req.body.setName;
        req.card.setCode = req.body.setCode;            
        req.card.attacks = req.body.attacks;
        req.card.weaknesses = req.body.weaknesses;
        req.card.owned  = req.body.owned;

        card.save(function(err){
            if(err)
                 res.status(500).send(err);
            else{
                res.json(req.card)
            }
        });
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;
        for(var p in req.body){
            req.card[p] = req.body[p];
        }

        req.card.save(function(err){
            if(err)
                 res.status(500).send(err);
            else{
                res.json(req.card)
            }
        });
    });

    return cardRouter;
};

module.exports = routes;