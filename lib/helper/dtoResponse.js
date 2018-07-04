exports.sendQuote = (quote) => {
    return {
        statusCode: 200,
        date: new Date(),
        quote
    }
}