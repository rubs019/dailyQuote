exports.errorNotFound = (message, statusCode = 204) => {
    return {
        statusCode,
        message
    }
}

exports.errorServer = (message = 'Fatal error', statusCode = 500) => {
    return {
        statusCode,
        message
    }
}