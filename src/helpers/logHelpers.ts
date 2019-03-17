import winston from 'winston'

export let Logger

export const turnOnTheLogs = (req, res, next) => {
    Logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple()
        ),
        level: 'error',
        transports: [new winston.transports.Console()]
    })

    if (process.env.NODE_ENV === 'dev') Logger.level = 'info'
    return next()
}
