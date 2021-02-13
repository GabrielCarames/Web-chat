var express = require('express');
var router = express.Router();
const passport = require('passport');
const Notification = require('../models/notification')
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

router.post('/addfriend', async function(req, res, next) {
  
  const type = 'friendRequest'       // tipo de notificacion
  const executorId = req.user._id    // ejecutor de la notificacion

  const friendUsername = req.body.addfriend // username del destinatario
  const friend = await userController.findByUsername(friendUsername)  // encuentra al objeto destinatario
  const friendId = friend.id

  // si ya ha enviado una notificacion de amistad al mismo destinatario
  const repeated = await userController.existNotification(friendId, executorId, type)

  if(repeated){
    req.flash('messageFailure', 'Ya has enviado una notificacion a ese usuario')
    res.redirect(req.get('referer'));
  }

  // crea la nueva notificacion con su tipo y id del ejecutor
  const newNotification = new Notification({
    notificationType: type,
    from: executorId
  })
  
  // agrega la nueva notificacion al destinatario
  userController.addNotification(friendId, newNotification)
  res.redirect('/');
});

router.get('/userlogged', function(req, res, next) {
  res.send(req.user);
});

router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/')
});

module.exports = router;
