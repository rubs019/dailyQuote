import * as redis from 'redis'
import { INTERNAL_ERROR, RESOURCE_NOT_FOUND } from './error_definition'
const client = redis.createClient()
import { promisify } from 'util'
const getAsync = promisify(client.get).bind(client)

client.on("error", function (err) {
    console.log(err)
})

client.on("connect", function (err) {
    console.log('--- You are connected to Redis Server ---')
})

/*exports.saveQuote = (quote) => {
    // TODO: Use promisify
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
}*/

/*export const getQuote = () => {
    // TODO: Use promisify
    return new Promise((resolve, reject) =>  {
        client.get('quote', (err, quote) => {
            if (err) reject(errorServer())

            if (!quote) reject(errorNotFound())

            resolve(sendQuote(JSON.parse(quote)))
        })
    })
}*/

/*
exports.deleteQuote = () => {
    // TODO: Use promisify
    return new Promise(((resolve, reject) => {
        client.del('quote', (err, response) => {
            if (err) reject(errorServer(err))

            if (response === 0) reject(errorNotFound('Quote has been not found', 404))

            console.log(`--- Quote has been deleted - ${new Date()} ---`)
            resolve(success(response))
        })
    }))
}*/

export const getQuote = () => {
    return getAsync()
        .then((quote) => {
            console.log('--- quote ---', quote)

            if (!quote) throw {msg: RESOURCE_NOT_FOUND, status: 206}

            return JSON.parse(quote)
        })
        .catch(err => err)
}