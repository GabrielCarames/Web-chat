var express = require('express');
var router = express.Router();
const passport = require('passport');
const Notification = require('../models/notification')
const userController = require("../controllers/userController");
const { exists } = require('../models/notification');

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

router.get('/notifications', userController.isAuthenticated, async function (req, res, next){
  const userId = req.user._id
  const notificationsQuantity = await userController.getNotificationsQuantity(userId)

  //si no tiene notificaciones
  if(notificationsQuantity == 0) return res.send('nada');
  else{
    var notifications = await userController.getNotifications(userId);
    res.send(notifications)
  }
})

router.get('/acceptfriendrequest/:userid', async function(req, res, next){
  const executorId = req.user._id // id del usuario que acepta la solicitud
  const senderId = req.params.userid  // id del usuario que envio la solicitud y que se le aceptara

  await userController.acceptFriendRequest(executorId, senderId)
  res.send("hola")
});

router.get('/refusefriendrequest/:userid', async function(req, res, next){
  const executorId = req.user._id // id del usuario que acepta la solicitud
  const senderId = req.params.userid
  await userController.removeFriendRequest(executorId, senderId)
  res.send("sosmalvado")
});

router.post('/sendfriendrequest', async function(req, res, next) {
  const executorId = req.user._id    // ejecutor de la notificacion
  const type = 'friendRequest'
  const friendUsername = req.body.addfriend // username del destinatario
  const fromUser = await userController.findById(executorId)
  console.log("SOSO")
  console.log(fromUser)
  const friend = await userController.findByUsername(friendUsername)  // encuentra al objeto destinatario

  if(friend){
    const friendId = friend.id

    // si ya ha enviado una notificacion de amistad al mismo destinatario
    const repeated = await userController.existNotification(friendId, executorId, type)
    
    if(friend.id == executorId){
      req.flash('messageFailure', 'No puedes enviarte una solicitud de amistad vos mismo.')
      res.redirect(req.get('referer'));
    }

    if(repeated){
      req.flash('messageFailure', 'Ya has enviado una notificacion a ese usuario')
      res.redirect(req.get('referer'));
    }else{
      
      // crea la nueva notificacion con su tipo y id del ejecutor
      const newNotification = new Notification({
        notificationType: type,
        from: fromUser
      })
      console.log("ahora si mos")
      console.log(newNotification)
      console.log(newNotification.from)
      
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
