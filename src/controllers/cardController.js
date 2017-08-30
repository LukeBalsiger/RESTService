var cardController = function(Card){
    
    var post = function(req, res){
            var card = new Card(req.body);
                  
            if(!req.body.name || !req.body.id){
                res.status(400);
                res.send('Card Name and Id are required');
            }
            else{
                Card.find({id: `${card.id}`}, function(err, cards){
                    if(err) console.log(err);
                    else{
                        if(cards[0] != null)
                        {
                            console.log(cards);
                            res.status(403);
                            res.send('A card with that Id already exists, no card was created.')
                        }
                        else{
                            card.save();
                            res.status(201);
                            res.send(card);
                        }
                    }
                })
            }
        }

    var get = function(req, res){
        
        var query = {};

        if(req.query.name) query.name = req.query.name;
        if(req.query.id) query.id = req.query.id;
        if(req.query.nationalPokedexNumber) query.nationalPokedexNumber = req.query.nationalPokedexNumber;
        if(req.query.imageUrl) query.imageUrl = req.query.imageUrl;
        if(req.query.imageUrlHiRes) query.imageUrlHiRes = req.query.imageUrlHiRes;
        if(req.query.types) query.types = req.query.types;
        if(req.query.supertype) query.supertype = req.query.supertype;
        if(req.query.subtype) query.subtype = req.query.subtype;
        if(req.query.hp) query.hp = req.query.hp;
        if(req.query.retreatCost) query.retreatCost = req.query.retreatCost;
        if(req.query.number) query.number = req.query.number;
        if(req.query.artist) query.artist = req.query.artist;
        if(req.query.rarity) query.rarity = req.query.rarity;
        if(req.query.setName) query.setName = req.query.setName;
        if(req.query.setCode) query.setCode = req.query.setCode;
        if(req.query.attacks) query.attacks = req.query.attacks;
        if(req.query.weaknesses) query.weaknesses = req.query.weaknesses;
        if(req.query.owned) query.owned = req.query.owned;

        
        Card.find(query, function(err,cards){
            if(err){
                res.status(500);
                res.send('An error occurred: ' + err);
            }
            else if(cards[0] != null){
                res.json(cards);
                res.status(200);
            }
            else{
                res.status(204);
                res.send('There are no cards yet!');
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = cardController;