var express = require('express'),
    http = require('http');

var routes = function(Temp){
    var updateRouter = express.Router();

    updateRouter.route('/')
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
    return updateRouter;
};

module.exports = routes;