var express = require('express');
var router = express.Router();

router.get('/', function(_req, res, _next) {
  res.render('web');
});

module.exports = router;
