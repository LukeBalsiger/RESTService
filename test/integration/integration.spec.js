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
    it('should get the correct single card when passed an id to search on', function(done){
        var testCard1 = new Card();
        testCard1.name = 'Lugia';
        testCard1.id = 'LugiaId';

        var testCard2 = new Card();
        testCard2.name = 'Pikachu';
        testCard2.id = 'PikachuId';

        testCard1.save(function(err, result){
            if(err) console.log(err);
            else{
                var firstCardId = result._id;
                testCard2.save(function(err, card){
                    if(err) console.log(err);
                    else 
                    {
                        var secondCardId = card._id;
                        agent.get(`/api/pokemon/cards/${firstCardId}`)
                        .end(function(err,results){
                            results.body.name.should.equal('Lugia');
                            results.body.id.should.equal('LugiaId');
                            done();
                        })
                    }
                })
            }
        })
    })

    it('should filter by request query', function(done){
        var testCard1 = new Card();
        testCard1.name = 'Lugia';
        testCard1.id = 'LugiaId';

        var testCard2 = new Card();
        testCard2.name = 'Pikachu';
        testCard2.id = 'PikachuId';

        testCard1.save(function(err, result){
            if(err) console.log(err);
            else{
                testCard2.save(function(err, card){
                    if(err) console.log(err);
                    else 
                    {
                        agent.get(`/api/pokemon/cards?name=${testCard1.name}`)
                        .end(function(err,results){
                            results.body[0].name.should.equal('Lugia');
                            results.body[0].id.should.equal('LugiaId');
                            done();
                        })
                    }
                })
            }
        })
    })

    it('should put a new card in place of an old card', function(done){
        var testCard1 = new Card();
        testCard1.name = 'Lugia';
        testCard1.id = 'LugiaId';

        testCard1.save(function(err, result){
            if(err) console.log(err);
            else{
                var firstCardId = result._id;
                var cardPut = {__v: 0, id: 'PikachuId', name: 'Pikachu', _id: `${firstCardId}`, owned: false}
                agent.put(`/api/pokemon/cards/${firstCardId}`)
                .send(cardPut)
                .end(function(err,results){
                    results.body.name.should.equal('Pikachu');
                    results.body.id.should.equal('PikachuId');
                    results.body._id.should.equal(`${firstCardId}`);
                    done();
                })
            }
        })
    })

    it('should get multiple cards back if multiple cards exists', function(done){
    var testCard1 = new Card();
        testCard1.name = 'Lugia';
        testCard1.id = 'LugiaId';

        var testCard2 = new Card();
        testCard2.name = 'Pikachu';
        testCard2.id = 'PikachuId';

        testCard1.save(function(err, result){
            if(err) console.log(err);
            else{
                testCard2.save(function(err, card){
                    if(err) console.log(err);
                    else 
                    {
                        agent.get(`/api/pokemon/cards`)
                        .end(function(err,results){
                            results.body[0].name.should.equal('Lugia');
                            results.body[0].id.should.equal('LugiaId');
                            results.body[1].name.should.equal('Pikachu');
                            results.body[1].id.should.equal('PikachuId');
                            done();
                        })
                    }
                })
            }
        })
    })
    it('should not patch an existing _id', function(){
        var testCard = new Card();
        testCard.name = 'Charizard';
        testCard.id = 'newId';
        testCard.nationalPokedexNumber = 6;

        testCard.save(function(err, card){
            if(err) console.log(err);
            else 
            {
                var dBId = card._id;
                var cardPatch = {_id: 'haha'};

                agent.patch(`/api/pokemon/cards/${dBId}`)
                .send(cardPatch)
                .end(function(err,results){
                    results.body.name.should.equal('Charizard');
                    results.body._id.should.not.equal('haha');
                    results.body._id.should.equal(dBId);
                    done();
                })
            }
        });
    })

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
    it('should get card and 200 status if card exists', function(done){

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
    Card.remove().exec().then(done());
});
