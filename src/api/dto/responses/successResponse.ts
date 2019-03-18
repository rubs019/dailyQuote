import * as constants from '../../../constants'
import { IMetadata, IResponse } from './definition'

const date = new Date()

export const send = (quote = null, from): IResponse => {
    return {
        data: quote,
        date,
        from,
        message: 'success',
        metaData: buildMetadata(quote),
        statusCode: constants.httpStatus.SUCCESS
    }
}

const buildMetadata = (quote): IMetadata => ({
    nbData: countData(quote)
})

const countData = (data): number => {
    const defaultLength = 1
    if (!Array.isArray(data) && typeof data === 'object') return defaultLength
    return data.length
}
