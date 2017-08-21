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