export class QuoteModel {

    constructor(msg, name = '', date = null, isAlreadyShow) {
        this.name = name
        this.msg = msg
        this.date = date
        this.isAlreadyShow = isAlreadyShow
    }

    name?: string
    msg: string
    date?: Date | null
    isAlreadyShow: boolean
}