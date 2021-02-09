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
  res.render('user/profile')
})

router.post('/login', passport.authenticate('login', 
    {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        passReqToCallback: true
    }
));

router.post('/register', passport.authenticate('register', 
    {
        successRedirect: '/user/login',
        failureRedirect: '/user/register',
        passReqToCallback: true
    }
));

module.exports = router;
