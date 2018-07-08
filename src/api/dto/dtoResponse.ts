export const sendQuote = (quote) => {
    return {
        statusCode: 200,
        date: new Date(), // Make a function for date
        data: [quote]
    }
}