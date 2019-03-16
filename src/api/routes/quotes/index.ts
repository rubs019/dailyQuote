import * as express from 'express'
import * as constants from '../../../constants'
import Redis from '../../../lib/redis'
import { DTO } from '../../dto'

const router = express.Router()

router.post('/save', (req, res) => {
    const args = {
        date: req.body.date,
        msg: req.body.msg || undefined,
        name: req.body.name || undefined
    }

    if (!args.msg || !args.name) {
        return res.json(
            DTO.error.errorServer(
                'Message / Name cannot be empty',
                constants.errorStatus.INTERNAL_SERVER_ERROR
            )
        )
    }
})

router.get('/', (req, res) => {
    const redis = new Redis()

    return redis
        .getQuote()
        .then(quote => {
            if (
                quote.code === 'ERR' ||
                quote.status === constants.errorStatus.NOT_FOUND
            ) {
                return res
                    .status(constants.errorStatus.NOT_FOUND)
                    .json(
                        DTO.error.errorServer(
                            constants.customErrorMsg.CONTENTS_NOT_FOUND,
                            constants.errorStatus.NOT_FOUND
                        )
                    )
            }

            return res.json(DTO.success.send(quote))
        })
        .catch(err => {
            if (constants.RangeError.includes(err.status)) {
                return res
                    .status(err.status)
                    .json(DTO.error.errorServer(err.msg, err.status))
            } else {
                return res
                    .status(constants.errorStatus.INTERNAL_SERVER_ERROR)
                    .json(DTO.error.errorServer)
            }
        })
})

export default router
