var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/cardAPI');
var Card = require('./models/cardModel');
var app = express();
var apiRouter = express.Router();



var port = process.env.PORT || 3000;

apiRouter.route('/pokemon/cards')
    .post(function(req, res){
        var card = new Card(req.body);
        console.log("new card put in db");
        card.save();
        res.status(201).send(card);
    })
    .get(function(req, res){
        Card.find(function(err, cards){
            if(err)
                console.log(err);
            else if(cards[0] != null)
                res.json(cards);
            else
                res.send("This is where the cards will be!");
        })
    });

app.use('/api', apiRouter);
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api', function(req, res){
    res.send('welcome to my API');
});

app.get('/', function(req, res){
    res.send('welcome to my website!');
});

app.listen(port, function(){
    console.log('Running on port: ' + port);
});