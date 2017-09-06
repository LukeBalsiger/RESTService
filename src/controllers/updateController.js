var updateController = function(pokemon, Card, http){

    var post = function(req, res){
        //add filtering for req.body
        pokemon.card.where(req.body)
        .then(result => {
            var goodList = [];
            var badList = [];
            for(var i=0; i < result.length; i++){
                var obj = result[i];
                var temp = new Card(obj);
            }
            res.status(201);
            res.send('These cards were created: ' + goodList);
        })
    }

    return {
        post: post
    }
}

module.exports = updateController;