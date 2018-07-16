import * as express from 'express'
import { DTO } from '../../dto/index'
import { QuoteModel } from "../../../models/Quote";
import * as redis from '../../../lib/redis'
import {read, update} from '../../../sdk/sheetsu'

const router = express.Router()
const rangeError: number[] = [204, 206, 500, 502]


router.post('/save', (req, res) => {

    const args = {
        msg: req.body.msg || undefined,
        name: req.body.name || undefined,
        date: req.body.date,
    }

    if (!args.msg || !args.name) {
        return res.json(DTO.error.errorServer('Message / Name cannot be empty', 502))
    }

    const quoteToSave = new QuoteModel(args.msg, args.name, args.date, false)

    redis.saveQuote(quoteToSave)
        .then(() => {
            return res.json(DTO.success.send())
        })
        .catch((err) => {
            return res
                .status(err.status)
                .json(DTO.error.errorServer(err.msg, err.status))
        })
})

router.get('/', (req, res) => {

    /*read()
        .then((response) => {
            console.log('--- sheetSu ---', JSON.parse(response)[2].id)
            return update('id', '20')
        })
        .then((res) => console.log(res))
        .catch((err) => err)*/

    return redis.getQuote()
        .then((quote) => {

            if (quote.code === 'ERR' || quote.status === 206) throw quote

            return res.json(DTO.success.send(quote))
        })
        .catch((err) => {

            if (rangeError.includes(err.status)) {
                return res
                    .status(err.status)
                    .json(DTO.error.errorServer(err.msg, err.status))
            } else {
                return res
                    .status(500)
                    .json(DTO.error.errorServer)
            }
        })
})

export default router