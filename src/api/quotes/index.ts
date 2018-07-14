import * as express from 'express'
import { DTO } from '../dto'
import { QuoteModel } from "../../models/Quote";
import * as redis from '../../lib/redis'

const router = express.Router()
const rangeError: number[] = [500, 204, 206]


router.get('/save', (req, res) => {
    const quoteToSave = new QuoteModel('Ruben', 'On connait toutes les techniques')
    redis.saveQuote(quoteToSave)
        .then(() => {
            res.json(DTO.success.sendQuote())
        })
        .catch((err) => {
            res.status(502).send('KO')
        })
})

router.get('/', (req, res) => {
    const queryParams = {
        get: req.query.get
    }

    return redis.getQuote()
        .then((quote) => {

            if (quote.code === 'ERR' || quote.status === 206) throw quote

            return res.json(DTO.success.sendQuote(quote))
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