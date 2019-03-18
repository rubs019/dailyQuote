import redis from 'redis'
import { promisify } from 'util'
import * as constants from '../../constants'
import { Logger } from '../../helpers/logHelpers'
import { QuoteModel } from '../../models/Quote'
import { IData } from './definition'

class CRedis {
    private client

    constructor() {
        this.client = redis.createClient()
        this.client.on('error', err => {
            Logger.error(err)
        })

        this.client.on('connect', () => {
            Logger.info('--- You are connected to Redis Server ---')
        })
    }
    public getQuote(): Promise<IData> {
        const getAsyncQuote = promisify(this.client.get).bind(this.client)

        return getAsyncQuote('quote').then(quote => {
            Logger.info('--- quote ---', quote)

            if (!quote) {
                return {
                    error: {
                        msg: constants.httpMsg.NO_CONTENTS,
                        status: constants.httpStatus.NOT_FOUND
                    }
                }
            }
            return {
                quotes: JSON.parse(quote)
            }
        })
    }

    public saveQuote(quote: QuoteModel): Promise<IData> {
        Logger.info('--- saveQuote ---', typeof quote === 'object')
        if (typeof quote === 'object') {
            this.client.set('quote', JSON.stringify(quote))
            Logger.info('--- Success ---', quote)
            return Promise.resolve({})
        } else {
            return Promise.reject({
                error: {
                    msg: 'Parameters must be an object',
                    status: constants.httpStatus.INTERNAL_SERVER_ERROR
                }
            })
        }
    }
}

export const Redis = new CRedis()
