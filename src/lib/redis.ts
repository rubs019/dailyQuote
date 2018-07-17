import * as redis from 'redis'
import { RESOURCE_NOT_FOUND } from '../api/dto/definition'
import { QuoteModel } from '../models/Quote'
import { promisify } from 'util'



export default class Redis {

    client = redis.createClient()

    constructor() {
        this.client.on("error", function (err) {
            console.log(err)
        })

        this.client.on("connect", function (err) {
            console.log('--- You are connected to Redis Server ---')
        })

    }
    public getQuote(): Promise<QuoteModel> | any {
        const getAsyncQuote = promisify(this.client.get).bind(this.client)

        return getAsyncQuote('quote')
            .then((quote) => {
                console.log('--- quote ---', quote)

                if (!quote) return Promise.reject({msg: RESOURCE_NOT_FOUND, status: 206})

                return JSON.parse(quote)
            })
            .catch(err => err)
    }

    public saveQuote(quote: QuoteModel) {
        console.log('--- saveQuote ---', typeof(quote) === 'object')
        if (typeof(quote) === 'object') {
            this.client.set('quote', JSON.stringify(quote))
            console.log('--- Success ---', quote)
            return Promise.resolve()
        } else {
            return Promise.reject({msg: 'Parameters must be an object', status: 502})
        }
    }
}