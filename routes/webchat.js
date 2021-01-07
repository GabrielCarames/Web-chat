var express = require('express');
var router = express.Router();

router.get('/', function(_req, res, _next) {
  res.render('webchat');
});

module.exports = router;
