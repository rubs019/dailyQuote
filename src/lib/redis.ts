import * as redis from 'redis'
import { RESOURCE_NOT_FOUND } from '../api/dto/definition'
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
        return Promise.reject({msg: 'Parameters must be an object', status: 502})
    }
}
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