export class QuoteModel {
    public name?: string
    public message: string
    public isAlreadyShow: boolean
    public born?: string
    public died?: string
    public nationality?: string
    public job?: string

    constructor({
        message,
        name,
        isAlreadyShow,
        born,
        died,
        nationality,
        job
    }) {
        this.name = name
        this.message = message
        this.isAlreadyShow = isAlreadyShow
        this.born = born
        this.died = died
        this.nationality = nationality
        this.job = job
    }
}
