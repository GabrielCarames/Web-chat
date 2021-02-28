var express = require('express');
var router = express.Router();
const passport = require('passport');

const Notification = require('../models/notification')
const userController = require("../controllers/userController");
var notifications = []


router.get('/login', function (req, res) {
  res.render('user/login');
});

router.get('/register', function (req, res) {
  res.render('user/register');
});

router.get('/profile', userController.isAuthenticated, function (req, res) {
  const cuenta = req.user
  res.render('user/profile', cuenta)
})

router.get('/friends', userController.isAuthenticated, function (req, res) {
  res.render('user/friends')
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

router.get('/getfriends', userController.isAuthenticated, async function (req, res) {
  const userId = req.user._id
  const friends = await userController.getFriends(userId)
  console.log("holas")
  console.log(friends)
  if(friends.length){
    res.send({status: true, friends})
  }else{
    res.send({status: false, message: 'No tienes amigos disponibles.'})
  }
})

router.get('/notifications', userController.isAuthenticated, async function (req, res) {
  const userId = req.user._id
  const notificationsQuantity = await userController.getNotificationsQuantity(userId)

  if (notificationsQuantity == 0) return res.send({status: false, message: 'No tienes notificaciones'});
  else {
    const notifications = await userController.getNotifications(userId);
    res.send({status: true, notifications})
  }
})

router.get('/acceptFriendRequest/:notificationid/:senderid', async function (req, res) {
  const senderId = req.params.senderid
  const executorId = req.user._id
  const notificationId = req.params.notificationid
  await userController.acceptFriendRequest(executorId, senderId, notificationId)
  req.flash('messageSuccess', 'La solicitud se ha aceptado correctamente')
  res.redirect(req.get('referer'));
});

router.get('/refuseFriendrequest/:notificationid', async function (req, res) {
  const executorId = req.user._id
  const notificationId = req.params.notificationid
  await userController.removeNotification(executorId, notificationId)
  req.flash('messageSuccess', 'La solicitud se ha eliminado correctamente')
  res.redirect(req.get('referer'));
});

router.post('/sendfriendrequest', async function (req, res) {
  const type = 'friendRequest'
  const executorId = req.user.id    // ejecutor de la notificacion
  const friendUsername = req.body.addfriend // username del destinatario
  const friend = await userController.findByUsername(friendUsername)  // encuentra al objeto destinatario

  if (friend) {
    const friendId = friend.id

    const isFriend = await userController.getOneFriendByUsername(executorId, friendUsername)

    // si ya es su amigo
    if(isFriend){
      req.flash('messageFailure', 'Ese usuario ya es tu amigo.')
      return res.redirect(req.get('referer'));
    }

    // si ya ha enviado una notificacion de amistad al mismo destinatario
    const repeated = await userController.existNotification(friendId, executorId, type)

    if (friend.id == executorId) {
      req.flash('messageFailure', 'No puedes enviarte una solicitud de amistad vos mismo.')
      return res.redirect(req.get('referer'));
    }

    if (repeated) {
      req.flash('messageFailure', 'Ya has enviado una notificacion a ese usuario')
      return res.redirect(req.get('referer'));
    } else {

      // crea la nueva notificacion con su tipo y id del ejecutor
      const newNotification = new Notification({
        notificationType: type,
        from: executorId
      })

      // guarda la notificacion
      newNotification.save()

      // agrega la id de la nueva notificacion al destinatario
      userController.addNotification(friendId, newNotification)
      req.flash('messageSuccess', 'La solicitud se ha enviado correctamente')
      res.redirect(req.get('referer'));
    }
  }
  else {
    req.flash('messageFailure', 'No existe un usuario con ese nombre.')
    res.redirect(req.get('referer'));
  }
});

router.get('/userlogged', function (req, res) {
  res.send(req.user);
});

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
});

module.exports = router;
