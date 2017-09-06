var express = require('express'),
<<<<<<< HEAD
    pokemon = require('pokemontcgsdk');

var routes = function(pokemon){
    var updateRouter = express.Router();

    var updateController = require('../controllers/updateController')(pokemon)

    updateRouter.route('/')
        .post(updateController.post)

=======
    http = require('http');

var routes = function(){
    var updateRouter = express.Router();

    updateRouter.route('/test')
        .post(function(req, res){
            var tempObj;
            callback = function(response) {
                var str = '';
                response.on('data', function (chunk) {
                    str += chunk;
                });
                response.on('end', function () {
                    console.log(str);
                    res.send(str);
                    tempObj = new Temp(JSON.parse(str));
                    console.log(tempObj);
                });
            };

            http.request(`http://freegeoip.net/json/${req.body.path}`, callback).end();
        })
        .get(function(req, res){
            res.send('Welcome to the update route!');
        });
>>>>>>> 1c22d8d07e13105d7a68e8cdfbc06da04916b093
    return updateRouter;
};

module.exports = routes;