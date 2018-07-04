const express = require('express');
const router = express.Router();
const { getQuote, saveQuote } = require('../lib/redis')

/* GET home page. */
router.get('/', function(req, res) {
  const quote = {
      message: 'C - Is both...',
      author: 'Chapman',
      isAlreadySend: false
  }

  saveQuote(quote)
      .then(() => getQuote())
      .then((response) => {
          return res
              .status(response.statusCode)
              .json(response)
      })
      .catch((error) => {
          console.log()
          return res
              .status(error.statusCode)
              .json(error.message)
      })
});

module.exports = router;
