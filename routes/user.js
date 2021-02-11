var express = require('express');
var router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('user/login');
});

router.get('/register', function(req, res, next) {
  res.render('user/register');
});

router.get('/profile', userController.isAuthenticated, function (req, res, next){
  const cuenta = req.user
  console.log(cuenta)
  res.render('user/profile', cuenta)
})

router.post('/login', passport.authenticate('login', 
    {
        successRedirect: '/',
        failureRedirect: '/user/login',
        passReqToCallback: true
    }
));

router.post('/register', passport.authenticate('register', 
    {
        successRedirect: '/user/login',
        failureRedirect: '/user/register',
        failureFlash: true,
        passReqToCallback: true
    }
));

router.get('/addfriend', async function(req, res, next) {
  var friendusername = req.body
  const friend = await userController.findByUsername(friendusername)
    //const newMessage = new User(friend)
    //await newMessage.save();
  res.send(req.user);
});

router.get('/userlogged', function(req, res, next) {
  res.send(req.user);
});

router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/')
});

module.exports = router;
