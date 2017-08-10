var assert = require('assert'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    should = require('chai').should();
chai.use(chaiAsPromised);
chai.should();

describe('Integration Test', function(){
    it('should not throw errors', function(){
        true.should.be.true;
    })
});