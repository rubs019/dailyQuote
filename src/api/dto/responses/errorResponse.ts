import { IResponse } from './definition'

export const errorServer = (
    message: string = 'Fatal error',
    statusCode: number = 500
): IResponse => {
    return {
        data: null,
        date: new Date(),
        message,
        statusCode
    }
}
