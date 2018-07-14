export class QuoteModel {

    constructor(msg, name = '', date = null) {
        this.name = name
        this.msg = msg
        this.date = date
    }

    name?: string
    msg: string
    date?: Date | null
}