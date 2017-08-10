var assert = require('assert'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    should = require('chai').should();
chai.use(chaiAsPromised);
chai.should();

describe('Unit Test', function(){
    it('should not throw errors', function(){
        expect(true).to.be.true;
    })
});