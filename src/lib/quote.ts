const quotes = [{
    message: 'A - Is a message',
    author: 'Someone',
    isValid: false
}, {
    message: 'B - Is not a message',
    author: 'Tracy',
    isValid: false
},{
    message: 'C - Is both...',
    author: 'Chapman',
    isValid: false
}]

function getRandomIndex(quotesArray) {
    return Math.floor(Math.random() * quotesArray.length)
}

function pushToQuotesConsumedArray(quotesConsumed, selectedQuote, index) {
    if (quotesConsumed.has(index)){
        return
    }
    quotesConsumed.add(index)
    selectedQuote.isValid = true
    return
}

function showDay(day, selectedQuote) {
    console.log(`Citation du jours (${day.getDate()}/${day.getMonth()}/${day.getFullYear()}): ${selectedQuote.message} - ${selectedQuote.author}`)
}

module.exports = function getQuote(){

}