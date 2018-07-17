export class QuoteModel {

    constructor({message, name = '', isAlreadyShow, born, died, nationality, job}) {
        this.name = name
        this.message = message
        this.isAlreadyShow = isAlreadyShow
        this.born = born
        this.died = died
        this.nationality = nationality
        this.job = job
    }

    name?: string
    message: string
    isAlreadyShow: boolean
    born: string
    died: string
    nationality: string
    job: string
}