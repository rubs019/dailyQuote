export const errorNotFound = (message = 'Quote was\'nt found', statusCode = 204) => {
    return {
        statusCode,
        message
    }
}

export const errorServer = (message = 'Fatal error', statusCode = 500) => {
    return {
        statusCode,
        message
    }
}

export const pageNotFound = (message = 'Page not found', statusCode = 404) => {
    return {
        statusCode,
        message
    }
}