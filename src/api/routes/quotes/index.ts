import express from 'express'
import * as constants from '../../../constants'
import { IData } from '../../../lib/redis/definition'
import Redis from '../../../lib/redis/redis'
import { DTO } from '../../dto'
import { Firebase } from '../../../lib/firebase/firebase'

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

router.get('/', async (req, res) => {
    const cache: Redis = new Redis()
    const t = Firebase.db

    try {
        const quote: IData = await cache.getQuote()
        if (
            quote.error.status !== constants.errorStatus.NOT_FOUND
        ) {
            return res.json(DTO.success.send(quote))
        }

        return res
            .status(constants.errorStatus.NOT_FOUND)
            .json(
                DTO.error.errorServer(
                    constants.customErrorMsg.CONTENTS_NOT_FOUND,
                    constants.errorStatus.NOT_FOUND
                )
            )
    } catch (err) {
        if (constants.RangeError.includes(err.status)) {
            return res
                .status(err.status)
                .json(DTO.error.errorServer(err.msg, err.status))
        } else {
            return res
                .status(constants.errorStatus.INTERNAL_SERVER_ERROR)
                .json(DTO.error.errorServer)
        }
    }
})

export default router
