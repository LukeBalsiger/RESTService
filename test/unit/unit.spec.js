var assert = require('assert'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    should = require('chai').should();

chai.use(chaiAsPromised);
chai.should();

describe('Card Controller Unit Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty name on post', function(){

            var Card = function(card){this.save = function(){}};

            var req = {body: {id: 'base1-44'}}

            var res = {status: sinon.spy(), send: sinon.spy()}

            var cardController = require('../../src/controllers/cardController')(Card);

            cardController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Request ' + res.status.args[0][0]);
            res.send.calledWith('Card Name and Id are required').should.equal(true);
            
        })
        it('should not allow an empty id on post', function(){
            var Card = function(card){this.save = function(){}};

            var req = {body: {name: 'Bulbasaur'}}

            var res = {status: sinon.spy(), send: sinon.spy()}

            var cardController = require('../../src/controllers/cardController')(Card);

            cardController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Request ' + res.status.args[0][0]);
            res.send.calledWith('Card Name and Id are required').should.equal(true);
        })
        it('should be happy if name and id are supplied', function(){
            var Card = function(card){this.save = function(){}};

            var req = {body: {name: 'Bulbasaur', id: 'base1-44'}}

            var res = {status: sinon.spy(), send: sinon.spy()}

            var cardController = require('../../src/controllers/cardController')(Card);

            cardController.post(req,res);

            res.status.calledWith(201).should.equal(true, 'Created ' + res.status.args[0][0]);
            res.send.calledOnce.should.equal(true);
        })
    })
    describe('Get', function(){
        it('should return a 500 and message if an error occurrs', function(){
            var Card = function(){};

            Card.find = function(){
                res.status(500);
                res.send('An error occurred');
            };

            var req = {query: {}};

            var res = {status: sinon.spy(), send: sinon.spy(), json: sinon.spy()};

            var cardController = require('../../src/controllers/cardController')(Card);

            cardController.get(req,res);

            res.status.calledWith(500).should.equal(true, 'An error occured');
            res.send.calledWith('An error occurred').should.equal(true);
        })
        it('should return a 200 and results if at least one card is found', function(){
            var Card = function(){};

            Card.find = function(){
                res.status(200);
                res.json({cards: {name: 'test'}});
            };

            var req = {query: {}};

            var res = {status: sinon.spy(), send: sinon.spy(), json: sinon.spy()};

            var cardController = require('../../src/controllers/cardController')(Card);

            cardController.get(req,res);

            res.status.calledWith(200).should.equal(true, 'An error occured');
            res.json.calledWith({cards: {name: 'test'}}).should.equal(true)
        })
        it('should return a 204 (empty) if no cards are found', function(){
            var Card = function(){};

            Card.find = function(){
                res.status(204);
                res.send('Empty');
            };
            
            var req = {query: {}};

            var res = {status: sinon.spy(), send: sinon.spy(), json: sinon.spy()};

            var cardController = require('../../src/controllers/cardController')(Card);

            cardController.get(req,res);

            res.status.calledWith(204).should.equal(true, 'Empty');
            res.send.calledWith('Empty').should.equal(true);

        })
    })
});