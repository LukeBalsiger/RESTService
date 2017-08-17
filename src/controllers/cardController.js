var cardController = function(Card) {
    
    var post = function(req, res){
            var card = new Card(req.body);
            
            if(!req.body.name){
                res.status(400);
                res.send('Card Name is required');
            }
            else{
                card.save();
                console.log(`${card.name} was put into the cardAPI database in the cards collection`);
                res.status(201);
                res.send(card);
            }
        }

    var get = function(req, res){
        
        var query = {};

        if(req.query.name)
        {
            query.name = req.query.name;
        }

        Card.find(function(err, cards){
            if(err)
                console.log(err);
            else if(cards[0] != null)
                res.json(cards);
            else
                res.send("This is where the cards will be!");
        });
    }

    var put = function(req, res){
        
    }

    var patch = function(req, res){
        
    }

    return {
        post: post,
        get: get,
        put: put,
        patch: patch
    }
}

module.exports = cardController;