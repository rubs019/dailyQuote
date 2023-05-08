import * as express from 'express'
import * as constants from '../../../constants'
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
    /* TODO */ 
})

export default router
