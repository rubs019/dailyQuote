const redis = require('redis')
const client = redis.createClient()
const { errorNotFound, errorServer } = require('./helper/dtoError')
const { sendQuote, success }  = require('./helper/dtoResponse')

client.on("error", function (err) {
    console.log(err)
});

client.on("connect", function (err) {
    console.log('--- You are connected to Redis Server ---')
});

exports.saveQuote = (quote) => {
    return new Promise(((resolve, reject) => {
        let tempQuote = quote
        if (typeof(quote) === 'object' && !quote.length) {
            client.set('quote', JSON.stringify(tempQuote))
            console.log(`--- A new quote has been created - ${new Date()} ---`)
            return resolve()
        } else {
            return reject(errorServer('Parameters must be an object'))
        }
    }))
}

exports.getQuote = () => {
    return new Promise((resolve, reject) =>  {
        client.get('quote', (err, quote) => {
            if (err) reject(errorServer())

            if (!quote) reject(errorNotFound())

            resolve(sendQuote(JSON.parse(quote)))
        })
    })
}

exports.deleteQuote = () => {
    return new Promise(((resolve, reject) => {
        client.del('quote', (err, response) => {
            if (err) reject(errorServer(err))

            if (response === 0) reject(errorNotFound('Quote has been not found', 404))

            console.log(`--- Quote has been deleted - ${new Date()} ---`)
            resolve(success(response))
        })
    }))
}