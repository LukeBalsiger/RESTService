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
        it('should not allow empty name on post', function(){

            var Card = function(card){this.save = function(){}};

            var req = {
                body: {
                    setName: 'LOL'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var cardController = require('../../src/controllers/cardController')(Card);

            cardController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Card Name is required').should.equal(true);
            
        })
    })
});