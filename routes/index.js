var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var user = req.user
  console.log("SOS RE PELOTUDO AMIGO")
  console.log(user)
  res.render('index', user);
});


module.exports = router;
