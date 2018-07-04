const express = require('express');
const router = express.Router();
const { getQuote, saveQuote } = require('../lib/redis')

/* GET home page. */
router.get('/', function(req, res) {
  const quote = {
      message: 'C - Is both...',
      author: 'Chapman',
      isValid: false
  }

  saveQuote(quote)
      .then(() => getQuote())
      .then((response) => {
        console.log(response)
          return res
              .status(response.statusCode)
              .render('index', { title: response.quote.message})
      })
      .catch((error) => {
          console.log()
          return res
              .status(error.statusCode)
              .render('index', { title: error.message })
      })
});

module.exports = router;
