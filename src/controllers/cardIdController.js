var cardIdController = function(Card) {

    var post = function(req, res){
        
    }

    var get = function(req,res){
            res.json(req.card);
        }

    var put = function(req,res){
            req.card.name = req.body.name;
            req.card.nationalPokedexNumber = req.body.nationalPokedexNumber;
            req.card.imageUrl = req.body.imageUrl;
            req.card.imageUrlHiRes = req.body.imageUrlHiRes;
            req.card.types = req.body.types;
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
            req.card.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.card);
                }
            });
        }

    var patch = function(req, res){
            if(req.body._id)
                delete req.body._id;
            for(var p in req.body)
            {
                req.card[p] = req.body[p];
            }

            req.card.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.card);
                }
            });
        }

    var destroy = function(req,res){ 
        req.card.remove(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.status(204).send('Removed')
            }
        });
    }

    return {
        post: post,
        get: get,
        put: put,
        patch: patch,
        delete: destroy
    }
}

module.exports = cardIdController;