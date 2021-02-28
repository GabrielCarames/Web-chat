const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')

router.get('/:chatid', userController.isAuthenticated, function(req, res, next) {
  const cuenta = req.user
  res.render('chat', cuenta)
});

router.get('/search/:friendId', chatController.verifyPrivateChat, function(req, res) {
  const chatId = req.chatId
  // obtiene el chatid que se creo en verifyPrivateChat y lo redirecciona a la ruta de arriba
  res.redirect('/chat/' + chatId)
});

module.exports = router;
