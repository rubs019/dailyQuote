import { Author } from './Author';

export interface Quote {
    name: string
    message: string
    isAlreadyShow: boolean
    author: Author
}