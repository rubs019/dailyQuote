const redis = require('redis')
const client = redis.createClient()
const { errorNotFound, errorServer } = require('./helper/dtoError')

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
            return resolve()
        } else {
            console.log('ok1')
            return reject(errorServer('Parameters must be an object'))
        }
    }))
}

exports.getQuote = () => {
    return new Promise((resolve, reject) =>  {
        client.get('quote', (err, quote) => {
            console.log('quote', quote)
            if (err) reject(errorServer())

            if (!quote) reject(errorNotFound())

            resolve({statusCode: 200, quote: JSON.parse(quote)})
        })
    })
}