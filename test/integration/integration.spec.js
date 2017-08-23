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
mongoose.Promise = require('bluebird');

beforeEach(function(done){
    done();
});

describe('Card API Integration Tests', function(){
    it('should get the correct single card when passed an id to serach on')

    it('should put a new card in place of an old card')

    it('should not patch an existing _id')

    it('should post a card and be returned an _id and data', function(done){
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

    it('should patch a property of a card and return the same _id and new data', function(done){

        var testCard = new Card();
        testCard.name = 'Charizard';
        testCard.id = 'newId';
        testCard.nationalPokedexNumber = 6;

        testCard.save(function(err, card){
            if(err) console.log(err);
            else 
            {
                var dBId = card._id;
                var cardPatch = {name: 'Charmander'};

                agent.patch(`/api/pokemon/cards/${dBId}`)
                .send(cardPatch)
                .end(function(err,results){
                    results.body.name.should.equal('Charmander');
                    results.body.id.should.equal('newId');
                    results.body.nationalPokedexNumber.should.equal(6);
                    done();
                })
            }
        });
    })

    it('should get 204 when database is empty', function(done){

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

        testCard.save(function(err, card){
            if(err) console.log(err);
            else 
            {
                agent.get('/api/pokemon/cards')
                .end(function(err,results){
                    results.status.should.equal(200);
                    results.body[0].name.should.equal('testCardName');
                    results.body[0].id.should.equal('testCardId');
                    done();
                })
            }
        });
    })
});

afterEach(function(done){
    Card.remove().exec();
    done();
});
