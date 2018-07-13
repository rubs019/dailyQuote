import * as express from 'express'
import dto from '../dto'
import * as redis from '../../lib/redis'

const router = express.Router()
const rangeError: number[] = [500, 204, 206]

router.get('/', (req, res) => {
    const queryParams = {
        get: req.query.get
    }

    return redis.getQuote()
        .then((quote) => {

            if (quote.code === 'ERR') throw {msg: 'NO CONTENT', status: 206}

            return res.json(dto.success.sendQuote(quote))
        })
        .catch((err) => {

            // Improve this shit
            if (rangeError.includes(err.status)) {
                return res
                    .status(err.status)
                    .json(dto.error.errorServer(err.msg, err.status))
            } else {
                return res
                    .status(500)
                    .json(dto.error.errorServer)
            }
        })
})

export default router