export class QuoteModel {

    constructor(msg, name = '', date = null, isAlreadyShow) {
        this.name = name
        this.msg = msg
        this.isAlreadyShow = isAlreadyShow
    }

    name?: string
    msg: string
    isAlreadyShow: boolean
    born?: string
    died?: string
    nationality?: string
    job?: string
}