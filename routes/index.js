var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var user = req.user
  res.render('index', user);
});

module.exports = router;
