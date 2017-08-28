var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Card = require('./models/cardModel.js'),
    port = process.env.PORT || 4000;

var db;
if(process.env.ENV == 'Test') 
    db = mongoose.connect('mongodb://localhost/cardAPI_test', {useMongoClient: true});
else{
    db = mongoose.connect('mongodb://localhost/cardAPI', {useMongoClient: true});
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

updateRouter = require('./routes/updateRoute')();

app.use('/update',updateRouter);

app.get('/', function(req, res){
    res.send('welcome to my update module!');
});

app.listen(port, function(){
    console.log('Running on port: ' + port);
});

module.exports = app;