<<<<<<< HEAD
var express = require('express'),
    http = require('http');

var routes = function(Temp){
=======
var express = require('express');

var routes = function(){
>>>>>>> 517b43e70bfc5f6594881f9b5366b5f6e1f85e0e
    var updateRouter = express.Router();

    updateRouter.route('/')
        .post(function(req, res){
<<<<<<< HEAD
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

=======
            
        })
>>>>>>> 517b43e70bfc5f6594881f9b5366b5f6e1f85e0e
        .get(function(req, res){
            res.send('Welcome to the update route!');
        });
    return updateRouter;
};

module.exports = routes;