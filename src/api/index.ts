import * as express from 'express'
import quotes from './routes/quotes'

const router = express.Router()

router.use('/quotes', quotes)

export default router