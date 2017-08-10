var assert = require('assert'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    should = require('chai').should(),
    selenium = require("selenium-webdriver"),
    test = require('selenium-webdriver/testing');

chai.use(chaiAsPromised);
chai.should();

test.describe('Google Search', function() {
    this.timeout(15000);
    test.it('should work', function() {
        var driver = new selenium.Builder()
        .usingServer()
        .withCapabilities({'browserName': 'chrome'})
        .build();

        driver.get('http://www.google.com');
        var searchBox = driver.findElement(selenium.By.name('q'));
        searchBox.sendKeys('simple programmer');
        searchBox.getAttribute('value').then(function(value) {
            assert.equal(value, 'simple programmer');
        });
        driver.quit();
    });

     test.it('should work again', function() {
        var driver = new selenium.Builder()
        .usingServer()
        .withCapabilities({'browserName': 'chrome'})
        .build();

        driver.get('http://www.google.com');
        var searchBox = driver.findElement(selenium.By.name('q'));
        searchBox.sendKeys('simple programmer');
        searchBox.getAttribute('value').then(function(value) {
            assert.equal(value, 'simple programmer');
        });
        driver.quit();
    });
});