import 'dotenv/config'

import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as logger from 'morgan'
import * as path from 'path'
import { DTO } from './api/dto'
import * as constants from './constants'

export const app = express()

import indexRouter from './api'
import { Logger, turnOnTheLogs } from './helpers/logHelpers'

app.use(turnOnTheLogs)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    Logger.info(`The current environment is : ${process.env.NODE_ENV}`)
    next()
})

// catch 404
app.use((req, res, next) => {
    return res
        .status(constants.errorStatus.NOT_FOUND)
        .json(
            DTO.error.errorServer(
                constants.errorMsg.NOT_FOUND,
                constants.errorStatus.NOT_FOUND
            )
        )
})

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || constants.errorStatus.INTERNAL_SERVER_ERROR).json(
        DTO.error.errorServer()
    )
})

app.use('/', indexRouter)
