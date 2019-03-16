export const INTERNAL_ERROR = 'internal_error'
export const RESOURCE_NOT_FOUND = 'resource_not_found'

export interface Response {
    statusCode: number,
    date: Date,
    message: string,
    data?: object
}
