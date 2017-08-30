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



describe('Card API Integration Tests', function(){

    beforeEach(function (done) {
        setTimeout(function(){
            done();
        }, 100);
    });

    describe('Get', function(){

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
                            .timeout({response: 10000, deadline: 10000})
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
                            .timeout({response: 10000, deadline: 10000})
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

        it('should get 204 when database is empty', function(done){

            agent.get('/api/pokemon/cards')
                .timeout({response: 10000, deadline: 10000})
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
                    .timeout({response: 1000, deadline: 1000})
                    .end(function(err,results){
                        results.status.should.equal(200);
                        results.body[0].name.should.equal('testCardName');
                        results.body[0].id.should.equal('testCardId');
                        done();
                    })
                }
            });
        })

        describe('Filtering', function(){

            it('should get cards filtered by name', function(done){
                
                var testCard1 = new Card();
                testCard1.name = 'Lugia';
                testCard1.id = 'LugiaId';

                var testCard2 = new Card();
                testCard2.name = 'Pikachu';
                testCard2.id = 'PikachuId';

                var testCard3 = new Card();
                testCard3.name = 'Lugia';
                testCard3.id = 'LugiaId2';

                testCard1.save(function(err, result){
                    if(err) console.log(err);
                    else{
                        testCard3.save(function(err, result){
                            if(err) console.log(err);
                            else{
                                testCard2.save(function(err, card){
                                    if(err) console.log(err);
                                    else 
                                    {
                                        agent.get(`/api/pokemon/cards?name=${testCard1.name}`)
                                        .timeout({response: 10000, deadline: 10000})
                                        .end(function(err,results){
                                            results.body[0].name.should.equal('Lugia');
                                            results.body[0].id.should.equal('LugiaId');
                                            results.body[1].name.should.equal('Lugia');
                                            results.body[1].id.should.equal('LugiaId2');
                                            should.not.exist(results.body[2]);
                                            done();
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })

            it('should get cards filtered by id', function(done){
                
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
                                agent.get(`/api/pokemon/cards?id=${testCard1.id}`)
                                .timeout({response: 10000, deadline: 10000})
                                .end(function(err,results){
                                    results.body[0].name.should.equal('Lugia');
                                    results.body[0].id.should.equal('LugiaId');
                                    should.not.exist(results.body[1]);
                                    done();
                                })
                            }
                        })
                    }
                })
            })

            it('should get cards filtered by nationalPokedexNumber', function(done){
                
                var testCard1 = new Card();
                testCard1.name = 'Lugia';
                testCard1.id = 'LugiaId';
                testCard1.nationalPokedexNumber = 249;

                var testCard2 = new Card();
                testCard2.name = 'Pikachu';
                testCard2.id = 'PikachuId';
                testCard2.nationalPokedexNumber = 26;

                testCard1.save(function(err, result){
                    if(err) console.log(err);
                    else{
                        testCard2.save(function(err, card){
                            if(err) console.log(err);
                            else 
                            {
                                agent.get(`/api/pokemon/cards?nationalPokedexNumber=${testCard1.nationalPokedexNumber}`)
                                .timeout({response: 10000, deadline: 10000})
                                .end(function(err,results){
                                    results.body[0].name.should.equal('Lugia');
                                    results.body[0].id.should.equal('LugiaId');
                                    should.not.exist(results.body[1]);
                                    done();
                                })
                            }
                        })
                    }
                })
            })

            it('should get cards filtered by types', function(done){
                
                var testCard1 = new Card();
                testCard1.name = 'Lugia';
                testCard1.id = 'LugiaId';
                testCard1.types = ['Psychic', 'Flying'];

                var testCard2 = new Card();
                testCard2.name = 'Pikachu';
                testCard2.id = 'PikachuId';
                testCard2.types = ['Electric'];

                testCard1.save(function(err, result){
                    if(err) console.log(err);
                    else{
                        testCard2.save(function(err, card){
                            if(err) console.log(err);
                            else 
                            {
                                agent.get(`/api/pokemon/cards?types=${testCard1.types[0]}`)
                                .timeout({response: 10000, deadline: 10000})
                                .end(function(err,results){
                                    results.body[0].name.should.equal('Lugia');
                                    results.body[0].id.should.equal('LugiaId');
                                    should.not.exist(results.body[1]);
                                    done();
                                })
                            }
                        })
                    }
                })
            })

            it('should get cards filtered by supertype', function(done){
                
                var testCard1 = new Card();
                testCard1.name = 'Lugia';
                testCard1.id = 'LugiaId';
                testCard1.supertype = 'Pokemon';

                var testCard2 = new Card();
                testCard2.name = 'Pikachu';
                testCard2.id = 'PikachuId';
                testCard2.supertype = 'Pokemon2';

                testCard1.save(function(err, result){
                    if(err) console.log(err);
                    else{
                        testCard2.save(function(err, card){
                            if(err) console.log(err);
                            else 
                            {
                                agent.get(`/api/pokemon/cards?supertype=${testCard1.supertype}`)
                                .timeout({response: 10000, deadline: 10000})
                                .end(function(err,results){
                                    results.body[0].name.should.equal('Lugia');
                                    results.body[0].id.should.equal('LugiaId');
                                    should.not.exist(results.body[1]);
                                    done();
                                })
                            }
                        })
                    }
                })
            })

            it('should get cards filtered by subtype', function(done){
                var testCard1 = new Card();
                testCard1.name = 'Lugia';
                testCard1.id = 'LugiaId';
                testCard1.subtype = 'Legendary';

                var testCard2 = new Card();
                testCard2.name = 'Pikachu';
                testCard2.id = 'PikachuId';
                testCard2.subtype = 'Basic';

                testCard1.save(function(err, result){
                    if(err) console.log(err);
                    else{
                        testCard2.save(function(err, card){
                            if(err) console.log(err);
                            else 
                            {
                                agent.get(`/api/pokemon/cards?subtype=${testCard1.subtype}`)
                                .timeout({response: 10000, deadline: 10000})
                                .end(function(err,results){
                                    results.body[0].name.should.equal('Lugia');
                                    results.body[0].id.should.equal('LugiaId');
                                    should.not.exist(results.body[1]);
                                    done();
                                })
                            }
                        })
                    }
                })
            })
            it('should get cards filtered by hp')
            it('should get cards filtered by retreatCost')
            it('should get cards filtered by number')
            it('should get cards filtered by artist')
            it('should get cards filtered by rarity')
            it('should get cards filtered by setName')
            it('should get cards filtered by setCode')
            it('should get cards filtered by attacks')
            it('should get cards filtered by weaknesses')
            it('should get cards filtered by owned')

        })
    })

    describe('Put', function(){

        it('should put a new card in place of an old card', function(done){
            
            var testCard1 = new Card();
            testCard1.name = 'Lugia';
            testCard1.id = 'LugiaId';
            var cardPut;
            var firstCardId;

            testCard1.save(function(err, result){
                if(err) console.log(err);
                else{
                    firstCardId = result._id;
                    cardPut = {__v: 0, id: 'PikachuId', name: 'Pikachu', _id: `${firstCardId}`, owned: false}
                    agent.put(`/api/pokemon/cards/${firstCardId}`)
                    .send(cardPut)
                    .timeout({response: 10000, deadline: 10000})
                    .end(function(err,results){
                        results.body.name.should.equal('Pikachu');
                        results.body.id.should.equal('PikachuId');
                        results.body._id.should.equal(`${firstCardId}`);
                        done();
                    })
                }
            })
        })
    })

    describe('Post', function(){
    
        it('should post a card and be returned an _id and data', function(done){
        
            var cardPost = {name:'Charizard', id: 'newId', nationalPokedexNumber:6};

            agent.post('/api/pokemon/cards')
                .send(cardPost)
                .timeout({response: 10000, deadline: 10000})
                .end(function(err,results){
                    results.status.should.equal(201);
                    results.body.name.should.equal('Charizard');
                    results.body.nationalPokedexNumber.should.equal(6);
                    results.body.should.have.property('_id');
                    done();
                })
        })
    })

    describe('Patch', function(){

        it('should patch a property of a card and return the same _id and new data', function(done){

            var cardPatch = {name: 'Charmander'};
            var testCard = new Card();
            testCard.name = 'Charizard';
            testCard.id = 'newId';
            testCard.nationalPokedexNumber = 6;

            testCard.save(function(err, card){
                if(err) console.log(err);
                else 
                {
                    var dBId = card._id;

                    agent.patch(`/api/pokemon/cards/${dBId}`)
                    .send(cardPatch)
                    .timeout({response: 10000, deadline: 10000})
                    .end(function(err,results){
                        results.body.name.should.equal('Charmander');
                        results.body.id.should.equal('newId');
                        results.body.nationalPokedexNumber.should.equal(6);
                        done();
                    })
                }
            });
        })

        it('should not patch an existing _id', function(done){
            
            var cardPatch = {_id: 'haha'};
            var testCard = new Card();
            testCard.name = 'Charizard';
            testCard.id = 'newId';
            testCard.nationalPokedexNumber = 6;

            testCard.save(function(err, card){
                if(err) console.log(err);
                else 
                {
                    var dBId = card._id;

                    agent.patch(`/api/pokemon/cards/${dBId}`)
                    .send(cardPatch)
                    .timeout({response: 10000, deadline: 10000})
                    .end(function(err,results){
                        results.body.name.should.equal('Charizard');
                        results.body._id.should.not.equal('haha');
                        results.body._id.should.equal(`${dBId}`);
                        done();
                    })
                }
            });
        })
    })

});

afterEach(function(done){
    Card.remove().exec().then(done());
});
