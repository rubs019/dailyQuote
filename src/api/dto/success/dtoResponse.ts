import { response } from '../definition'

const date = new Date()

export const sendQuote = (quote = null): response => {
    return {
        statusCode: 200,
        date,
        message: 'success',
        data: quote
    }
}