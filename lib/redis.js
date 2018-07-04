const redis = require('redis')
const client = redis.createClient()

client.on("error", function (err) {
    console.log(err)
});

client.on("connect", function (err) {
    console.log('--- You are connected to Redis Server ---')
});

exports.test = (quotes) => {
    client.set('quotes', quotes)
}