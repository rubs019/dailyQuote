const { Given, When, Then } = require('cucumber')
const assert = require('assert')


let nb = 0
let nb2 = 0
let result = 0
const calcul = (int, int2) => int+int2

Given('the numbers {int} and {int}', function (int, int2) {
    // Write code here that turns the phrase above into concrete actions
    nb = int
    nb2 = int2
    return true
});

When('they are added together', function () {
    // Write code here that turns the phrase above into concrete actions
    result = calcul(nb, nb2)
    return true
});

Then('should the result be {int}', function (int) {
    // Write code here that turns the phrase above into concrete actions
    assert.equal(result, int)
});