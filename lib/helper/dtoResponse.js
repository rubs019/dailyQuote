exports.sendQuote = (quote) => {
    return {
        statusCode: 200,
        date: new Date(),
        quote
    }
}

exports.success = (msg) => {
    return {
        statusCode: 200,
        date: new Date(),
        success: msg
    }
}