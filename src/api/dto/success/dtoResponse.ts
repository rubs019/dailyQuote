import { Response } from '../definition'

const date = new Date()

export const send = (quote = null): Response => {
    return {
        statusCode: 200,
        date,
        message: 'success',
        data: quote
    }
}