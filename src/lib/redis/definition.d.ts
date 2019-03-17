import { QuoteModel } from '../../models/Quote'

interface IError {
    status: number
    code: string
}

interface IData {
    quotes?: QuoteModel
    error?: IError
}
