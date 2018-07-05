const express = require('express');
const router = express.Router();
const { getQuote, saveQuote, deleteQuote } = require('../lib/redis')

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
              .json(error)
      })
});

router.get('/delete', function(req, res) {
    deleteQuote()
        .then((response) => {
            return res
                .status(response.statusCode)
                .json(response)
        })
        .catch((error) => {
            console.log()
            return res
                .status(error.statusCode)
                .json(error)
        })
});

module.exports = router;
