var updateController = function(pokemon, Card, http){

    var post = function(req, res){
        //add filtering for req.body
        pokemon.card.where(req.body)
        .then(result => {
            console.log(result);
            for(var i=0; i < result.length; i++){
                var obj = result[i];
                var interim = JSON.stringify(obj);
                interim = interim.replace("\"set\":", "\"setName\":");
                obj = JSON.parse(interim);
                console.log(obj);
                var post_options = {
                    host: 'localhost',
                    port: 8000,
                    path: '/api/pokemon/cards',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }

                var post_req = http.request(post_options, function(res){
                    var response = '';
                    res.on('data', function(body){
                        response += body;
                    });
                    res.on('end', function(){
                        //console.log(response);
                    })
                });

                post_req.write(JSON.stringify(obj));
                post_req.end();
            }
            res.status(201);
            res.send('Cards updated!')
        })
    }

    return {
        post: post
    }
}

module.exports = updateController;