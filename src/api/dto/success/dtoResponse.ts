import { response } from '../definition'

const date = new Date()

export const send = (quote = null): response => {
    return {
        statusCode: 200,
        date,
        message: 'success',
        data: quote
    }
}