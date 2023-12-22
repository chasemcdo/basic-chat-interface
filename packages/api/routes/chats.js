var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.send({
    message: 'Message Sent Successfully!'
  });
});

module.exports = router;
