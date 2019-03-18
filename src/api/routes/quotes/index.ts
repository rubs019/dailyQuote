import express from 'express'
import * as constants from '../../../constants'
import { Logger } from '../../../helpers/logHelpers'
import { Redis } from '../../../lib/redis/CRedis'
import { IData } from '../../../lib/redis/definition'
import { sequelize } from '../../../lib/sequelize'
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
                constants.httpStatus.INTERNAL_SERVER_ERROR
            )
        )
    }
})

router.get('/', async (req, res) => {
    let quote: IData
    try {
        quote = await Redis.getQuote()
        if (quote.error.status !== constants.httpStatus.NOT_FOUND) {
            return res.json(
                DTO.success.send(quote, constants.dataEnvironment.cache)
            )
        }
        Logger.info('No contents was found in Redis')
        // Search in DBB
        const quotesModel = sequelize.model('quotes')
        quote = await quotesModel.findAll()
        if (quote) {
            return res.json(
                DTO.success.send(quote, constants.dataEnvironment.ddb)
            )
        }

        return res
            .status(constants.httpStatus.NOT_FOUND)
            .json(
                DTO.error.errorServer(
                    constants.customHttpMsg.CONTENTS_NOT_FOUND,
                    constants.httpStatus.NOT_FOUND
                )
            )
    } catch (err) {
        if (constants.RangeError.includes(err.status)) {
            return res
                .status(err.status)
                .json(DTO.error.errorServer(err.msg, err.status))
        } else {
            return res
                .status(constants.httpStatus.INTERNAL_SERVER_ERROR)
                .json(DTO.error.errorServer)
        }
    }
})

router.get('/id/:id', async (req, res) => {
    const quotesModel = sequelize.model('quotes')
    const quote = await quotesModel.findOne({
        where: {
            id: req.params.id
        }
    })
    if (quote) {
        return res.json(DTO.success.send(quote, constants.dataEnvironment.ddb))
    }

    return res
        .status(constants.httpStatus.NOT_FOUND)
        .json(
            DTO.error.errorServer(
                constants.customHttpMsg.CONTENTS_NOT_FOUND,
                constants.httpStatus.NOT_FOUND
            )
        )
})

export default router
