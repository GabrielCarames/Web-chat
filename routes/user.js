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
        // tipo de notificacion
  const executorId = req.user._id    // ejecutor de la notificacion
  const type = 'friendRequest'
  const friendUsername = req.body.addfriend // username del destinatario
  console.log(friendUsername, 'sos un re pelotudo')
  const friend = await userController.findByUsername(friendUsername)  // encuentra al objeto destinatario
  if(friend){
    const friendId = friend.id
    console.log(friendId)
    // si ya ha enviado una notificacion de amistad al mismo destinatario
    const repeated = await userController.existNotification(executorId, friendId, type)
    console.log(repeated)
    
    if(friend.id == executorId){
      req.flash('messageFailure', 'No puedes enviarte una solicitud de amistad vos mismo.')
      res.redirect(req.get('referer'));
    }
    if(repeated.notifications){
      req.flash('messageFailure', 'Ya has enviado una notificacion a ese usuario')
      res.redirect(req.get('referer'));
    }
    else{
        // crea la nueva notificacion con su tipo y id del ejecutor
      const newNotification = new Notification({
        notificationType: type,
        from: executorId
      })
      
      // agrega la nueva notificacion al destinatario
      userController.addNotification(friendId, newNotification)
      req.flash('messageSuccess', 'La solicitud se ha enviado correctamente')
      res.redirect(req.get('referer'));
    }
  }
  else{
    req.flash('messageFailure', 'No existe un usuario con ese nombre.')
    res.redirect(req.get('referer'));
  }
});

router.get('/userlogged', function(req, res, next) {
  res.send(req.user);
});

router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/')
});

module.exports = router;
