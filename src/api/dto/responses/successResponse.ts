import { IResponse } from './definition'

const date = new Date()

export const send = (quote = null): IResponse => {
    return {
        data: quote,
        date,
        message: 'success',
        statusCode: 200
    }
}
