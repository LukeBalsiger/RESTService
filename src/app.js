var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./config/db.js'),
    mongoose = require('mongoose'),
    cardData = require('./models/cardData')
    port = process.env.PORT || 4000


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.Promise = require('bluebird')
mongoose.connect(db.url, { useMongoClient: true })

cardRouter = require('./routes/cardRoute')(cardData);

app.use('/api/cards',cardRouter);

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