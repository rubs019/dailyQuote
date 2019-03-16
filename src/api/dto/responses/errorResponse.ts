import { IResponse } from './definition'
const date = new Date()

export const errorServer = (
    message: string = 'Fatal error',
    statusCode: number = 500
): IResponse => {
    return {
        data: null,
        date,
        message,
        statusCode
    }
}
