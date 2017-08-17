var assert = require('assert'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    should = require('chai').should();

chai.use(chaiAsPromised);
chai.should();

describe('Card Controller Tests', function(){
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
});