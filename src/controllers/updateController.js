var updateController = function(pokemon){
    

    var post = function(req, res){
        //add filtering for req.body
        pokemon.card.where(req.body)
        .then(result => {
            var list = [];
            for(var i=0; i < result.length; i++){
                var obj = result[i];
                list.push(obj.name);
            }
            res.send(list);
        })
    }

    return {
        post: post
    }
}

module.exports = updateController;