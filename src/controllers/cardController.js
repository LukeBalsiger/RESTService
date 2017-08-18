var cardController = function(Card){
    
    var post = function(req, res){
            var card = new Card(req.body);
            
            if(!req.body.name || !req.body.id){
                res.status(400);
                res.send('Card Name and Id are required');
            }
            else{
                card.save();
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
        
        Card.find(query, function(err,cards){
            if(err){
                res.status(500);
                res.send('An error occurred: ' + err);
            }
            else if(cards[0] != null){
                res.status(200);
                res.json(cards);
            }
            else{
                res.status(204);
                res.send('This is where the cards will be!');
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = cardController;