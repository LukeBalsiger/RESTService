var express = require('express');

var routes = function(){
    var updateRouter = express.Router();

    updateRouter.route('/')
        .post(function(req, res){
            
        })
        .get(function(req, res){
            res.send('Welcome to the update route!');
        });
    return updateRouter;
};

module.exports = routes;