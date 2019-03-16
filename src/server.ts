/**
 * Module dependencies.
 */

import * as http from 'http'
import { app } from './app'
import { Logger } from './helpers/logHelpers'

/**
 * Get port from environment and store in Express.
 */

const Port = normalizePort(process.env.PORT || '8000')
app.set('port', Port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10)
    const minimumPortValue = 0

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= minimumPortValue) {
        // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof Port === 'string' ? 'Pipe ' + Port : 'Port ' + Port
    const codeError = 1

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            Logger.error(bind + ' requires elevated privileges')
            process.exit(codeError)
            break
        case 'EADDRINUSE':
            Logger.error(bind + ' is already in use')
            process.exit(codeError)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr: any = server.address()

    const ipAdrress: string = addr.address === '::' ? '127.0.0.1' : addr.address

    // tslint:disable-next-line
    console.log(`Listening on ${ipAdrress}:${addr.port}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */

server
    .listen(Port)
    .on('error', onError)
    .on('listening', onListening)
