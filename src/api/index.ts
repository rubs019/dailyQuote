import * as express from 'express'
import quotes from './quotes'
import healthcheck from "./healthcheck";

const router = express.Router()

router.use('/quotes', quotes)
router.use('/healthcheck', healthcheck)

export default router
