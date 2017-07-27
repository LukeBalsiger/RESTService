var express = require('express');


var app = express();

var port = process.env.port || 3000;

app.get('/', function(req, res){
    req.send('welcome to my API')
});

app.listen(port, function(){
    console.log('Running on port: ' + port)
})