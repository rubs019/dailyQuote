import * as redis from 'redis'
import { INTERNAL_ERROR, RESOURCE_NOT_FOUND } from '../api/dto/definition'
import { QuoteModel } from '../models/Quote'
const client = redis.createClient()
import { promisify } from 'util'

client.on("error", function (err) {
    console.log(err)
})

client.on("connect", function (err) {
    console.log('--- You are connected to Redis Server ---')
})

export const saveQuote = (quote: QuoteModel) => {
    console.log('--- saveQuote ---', typeof(quote) === 'object')
    if (typeof(quote) === 'object') {
        client.set('quote', JSON.stringify(quote))
        console.log('--- Success ---', quote)
        return Promise.resolve()
    } else {
        console.log('--- err2 ---', 'Parameters must be an object')
        return Promise.reject('Parameters must be an object')
    }
}

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
    const getAsyncQuote = promisify(client.get).bind(client)

    return getAsyncQuote('quote')
        .then((quote) => {
            console.log('--- quote ---', quote)

            if (!quote) return Promise.reject({msg: RESOURCE_NOT_FOUND, status: 206})

            return JSON.parse(quote)
        })
        .catch(err => err)
}