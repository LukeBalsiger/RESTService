var assert = require('assert'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    should = require('chai').should(),
    expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../src/app.js'),
    mongoose = require('mongoose'),
    Card = mongoose.model('Card'),
    agent = request.agent(app),
    db = mongoose.connect('mongodb://localhost/cardAPI_test', {useMongoClient: true});

chai.use(chaiAsPromised);
chai.should();

describe('Card CRUD Test', function(){
    /*it('should post a card and be returned an _id and data', function(done){
        var cardPost = {name:'Charizard', id: 'newId', nationalPokedexNumber:6};

        agent.post('/api/pokemon/cards')
            .send(cardPost)
            .end(function(err,results){
                results.status.should.equal(201);
                results.body.name.should.equal('Charizard');
                results.body.nationalPokedexNumber.should.equal(6);
                results.body.should.have.property('_id');
                done();
            })
    })
*/
    it('should patch a property of a card and return the same _id and new data', function(done){

        /*var cardObject = Card.find({}, function(err, cards){
            if(err)
                console.log('error: ' + err);
            else {
                console.log(cards[0].name);
                return cards;
            }
        });
        done();*/

        var testCard = new Card();
        testCard.name = 'Charizard';
        testCard.id = 'newId';
        testCard.nationalPokedexNumber = 6;
        var cardPatch = {name: 'Charmander'};
        var dBId;


        testCard.save(function(err){
            if(err) console.log('error: ' + err);
        }).then(
            Card.find({}, function(err, cards){
                if(err)
                    console.log('error: ' + err);
                else {
                    console.log('cards: ' + cards[0]._id);
                    dBId = cards[0]._id;
                }
            })).then(
                agent.patch(`/api/pokemon/cards/${dBId}`)
                    .send(cardPatch)
                    .end(function(err,results){
                        //console.log(results);
                        results.body.name.should.equal('Charmander');
                        results.body.id.should.equal('newId');
                        results.body.nationalPokedexNumber.should.equal(6);
                        done();
                    })
                )  
    });
    /*it('should get 204 when database is empty', function(done){

        agent.get('/api/pokemon/cards')
            .end(function(err,results){
                results.status.should.equal(204);
                done();
            })
    })
    it('should get json object and 200 status if card exists', function(done){

        var testCard = new Card();
        testCard.name = 'testCardName';
        testCard.id = 'testCardId';
        testCard.save();

        agent.get('/api/pokemon/cards')
            .end(function(err,results){
                results.status.should.equal(200);
                results.body[0].name.should.equal('testCardName');
                results.body[0].id.should.equal('testCardId');
                done();
            })
    })*/

    afterEach(function(done){
        Card.remove().exec();
        done();
    })
});