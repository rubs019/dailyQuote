exports.errorNotFound = (message) => {
    return {
        statusCode: 204,
        message: 'Not found'
    }
}

exports.errorServer = (message = 'Fatal error') => {
    return {
        statusCode: 500,
        message
    }
}