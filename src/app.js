var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Card = require('./models/cardModel.js'),
    port = process.env.PORT || 3000;

var db;
if(process.env.ENV == 'Test') 
    db = mongoose.connect('mongodb://localhost/cardAPI_test', {useMongoClient: true});
else{
    db = mongoose.connect('mongodb://localhost/cardAPI', {useMongoClient: true});
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

cardRouter = require('./routes/cardRoute')(Card);
pokemonRouter = require('./routes/pokemonRoute')();

app.use('/api/pokemon/cards',cardRouter);
app.use('/api/pokemon',pokemonRouter);

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