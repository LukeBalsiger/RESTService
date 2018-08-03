var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    pokemon = require('pokemontcgsdk'),
    port = process.env.PORT || 4000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

cardRouter = require('./routes/cardRoute')(pokemon);

app.use('/api/pokemon/cards',cardRouter);

app.get('/api', function(req, res){
    res.send('welcome to my API');
});

app.get('/', function(req, res){
    res.send('welcome to my website!');
});

app.listen(port, function(){
    console.log('Running on port: ' + port);
});

module.exports = app;