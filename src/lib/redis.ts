import * as redis from 'redis'
import { promisify } from 'util'
import * as constants from '../constants'
import { Logger } from '../helpers/logHelpers'
import { QuoteModel } from '../models/Quote'

export default class Redis {
    private client = redis.createClient()

    constructor() {
        this.client.on('error', err => {
            Logger.error(err)
        })

        this.client.on('connect', () => {
            Logger.info('--- You are connected to Redis Server ---')
        })
    }
    public getQuote(): Promise<QuoteModel> | any {
        const getAsyncQuote = promisify(this.client.get).bind(this.client)

        return getAsyncQuote('quote')
            .then(quote => {
                Logger.info('--- quote ---', quote)

                if (!quote) {
                    return {
                        msg: constants.errorMsg.NOT_FOUND,
                        status: constants.errorStatus.NOT_FOUND
                    }
                }

                return JSON.parse(quote)
            })
            .catch(err => err)
    }

    public saveQuote(quote: QuoteModel) {
        Logger.info('--- saveQuote ---', typeof quote === 'object')
        if (typeof quote === 'object') {
            this.client.set('quote', JSON.stringify(quote))
            Logger.info('--- Success ---', quote)
            return Promise.resolve()
        } else {
            return Promise.reject({
                msg: 'Parameters must be an object',
                status: constants.errorStatus.INTERNAL_SERVER_ERROR
            })
        }
    }
}
