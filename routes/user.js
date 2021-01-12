var express = require('express');
var router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.get('/register', function(req, res, next) {
  res.render('user/register');
});

router.post('/register', async function(req, res, next) {
  const { username, password, email, country, gender } = req.body
  const newuser = new User({
    username, password, email, country, gender
  })

  await newuser.save()
  res.send({ status : true });
});

module.exports = router;
