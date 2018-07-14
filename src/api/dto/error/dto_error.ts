import { response } from '../definition'
const date = new Date()

export const errorServer = (message: string = 'Fatal error', statusCode: number = 500): response => {
    return {
        statusCode,
        date,
        message,
        data: null
    }
}