var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Card = require('./models/cardModel.js'),
<<<<<<< HEAD
    pokemon = require('pokemontcgsdk'),
    port = process.env.PORT || 3000;
=======
    port = process.env.PORT || 4000;
>>>>>>> 1c22d8d07e13105d7a68e8cdfbc06da04916b093

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
<<<<<<< HEAD
updateRouter = require('./routes/updateRoute')(pokemon);

app.use('/api/pokemon/cards',cardRouter);
app.use('/api/pokemon',pokemonRouter);
app.use('/api/update',updateRouter);
=======
updateRouter = require('./routes/updateRoute')();

app.use('/api/pokemon/cards',cardRouter);
app.use('/api/pokemon',pokemonRouter);
app.use('/update',updateRouter);
>>>>>>> 1c22d8d07e13105d7a68e8cdfbc06da04916b093

app.get('/api', function(req, res){
    res.send('welcome to my API');
});

app.get('/', function(req, res){
    res.send('welcome to my website!');
});

app.get('/update', function(req, res){
    res.send('welcome to my update module!');
});

app.listen(port, function(){
    console.log('Running on port: ' + port);
});

module.exports = app;//