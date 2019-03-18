export interface IResponse {
    statusCode: number
    from: string
    date: Date
    message: string
    data?: object
    metaData: IMetadata
}

export interface IMetadata {
    nbData: number
}
