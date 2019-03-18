import 'dotenv/config'

import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import { DTO } from './api/dto'
import * as constants from './constants'
import { Logger } from './helpers/logHelpers'
import { loadSequelize } from './lib/sequelize'

import indexRouter from './api'

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    Logger.info(`The current environment is : ${process.env.NODE_ENV}`)
    next()
})

app.use(loadSequelize)

app.use('/', indexRouter)

// catch 404
app.use((req, res) => {
    return res
        .status(constants.httpStatus.NOT_FOUND)
        .json(
            DTO.error.errorServer(
                constants.httpMsg.PAGE_NOT_FOUND,
                constants.httpStatus.NOT_FOUND
            )
        )
})

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || constants.httpStatus.INTERNAL_SERVER_ERROR).json(
        DTO.error.errorServer()
    )
})
